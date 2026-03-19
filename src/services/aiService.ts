const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export const generateCaption = async (
  text: string,
  mode: string,
  intensity: string,
  style: string
) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API Key is missing. Please add it to your secrets in Settings.");
  }

  const systemInstruction = `
    You are CaptionMoji AI, a high-performance caption and emoji generator.
    Your goal is to convert user text into viral, engaging captions with smart emoji placement.
    
    RULES:
    1. Understand emotion and context.
    2. Support Hindi, Hinglish, and English.
    3. Improve the sentence slightly for better flow and impact.
    4. Emoji Intensity: ${intensity} (low: 1-2 emojis, medium: 3-5 emojis, high: 6+ emojis).
    5. Style: ${style} (aesthetic: soft/pretty emojis, fire: hype/energetic emojis, dark: moody/minimal emojis, minimal: very few emojis).
    6. Mode: ${mode} (Viral 🔥, Funny 😂, Romantic ❤️, Sad 💔, Hook Mode 🎯, Normal).
    7. Do not overuse emojis unless intensity is high.
    8. Provide a natural, human-like result.
    9. For Hook Mode, focus on a strong opening line that grabs attention.
    10. Return ONLY a JSON object with "caption" and "explanation" keys.
  `;

  const models = ["mistralai/mixtral-8x7b", "openai/gpt-4o-mini", "google/gemini-2.0-flash-001"];
  
  for (const model of models) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "CaptionMoji AI",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: `Text: ${text}\nMode: ${mode}\nIntensity: ${intensity}\nStyle: ${style}` }
          ],
          // Some models might fail with strict json_object, so we'll handle it manually if needed
          response_format: { type: "json_object" }
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`Model ${model} failed with status ${response.status}:`, errorData);
        continue; 
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        return JSON.parse(content);
      } catch (e) {
        // Fallback: try to extract JSON from text if it's wrapped in triple backticks
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        // Last resort: return as a simple object
        return { caption: content, explanation: "" };
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.warn(`Model ${model} timed out`);
      } else {
        console.warn(`Error with model ${model}:`, error);
      }
      continue;
    }
  }

  throw new Error("All AI models are currently busy or unavailable. Please try again in a few seconds.");
};
