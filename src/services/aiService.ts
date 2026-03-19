const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || (import.meta as any).env?.VITE_OPENROUTER_API_KEY;

const FREE_MODELS = [
  "google/gemini-2.0-flash-lite-preview-02-05:free",
  "google/gemini-2.0-pro-exp-02-05:free",
  "deepseek/deepseek-chat:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "meta-llama/llama-3.1-8b-instruct:free"
];

export const generateCaption = async (
  text: string,
  mode: string,
  intensity: string,
  style: string
) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API Key is missing. Please add OPENROUTER_API_KEY in Settings > Secrets.");
  }

  const systemInstruction = `
    You are CaptionMoji AI, a high-performance caption and emoji generator.
    Your goal is to convert user text into 3 different viral, engaging caption variations.
    
    RULES:
    1. Understand emotion and context.
    2. Support Hindi, Hinglish, and English.
    3. Improve the sentence slightly for better flow and impact.
    4. Emoji Intensity: ${intensity} (low: 1-2 emojis, medium: 3-5 emojis, high: 6+ emojis).
    5. Style: ${style} (aesthetic: soft/pretty emojis, fire: hype/energetic emojis, dark: moody/minimal emojis, minimal: very few emojis).
    6. Provide 3 variations:
       - Variation 1: 🔥 Viral (High energy, trending feel)
       - Variation 2: 😂 Funny (Witty, humorous)
       - Variation 3: ❤️ Emotional (Heartfelt, deep, or romantic)
    7. Do not overuse emojis unless intensity is high.
    8. Provide a natural, human-like result.
    9. Return ONLY a JSON object with a "variations" key which is an array of objects. Each object has "type", "caption", and "explanation".
  `;

  for (const model of FREE_MODELS) {
    try {
      console.log(`Trying OpenRouter model: ${model}`);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "CaptionMoji AI",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: `Text: ${text}\nIntensity: ${intensity}\nStyle: ${style}` }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0].message.content;
        return JSON.parse(content);
      } else {
        const errorData = await response.json();
        console.warn(`Model ${model} failed:`, errorData.error?.message);
        continue; // Try next model
      }
    } catch (err) {
      console.error(`Error with model ${model}:`, err);
      continue; // Try next model
    }
  }

  throw new Error("AI generation failed on all OpenRouter models. Please try again later.");
};
