const getOpenRouterKey = () => {
  try {
    // Vite's define will replace this string during build
    return process.env.OPENROUTER_API_KEY || (import.meta as any).env?.VITE_OPENROUTER_API_KEY || "";
  } catch (e) {
    return (import.meta as any).env?.VITE_OPENROUTER_API_KEY || "";
  }
};

const getGeminiKey = () => {
  try {
    return process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
  } catch (e) {
    return (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
  }
};

const OPENROUTER_API_KEY = getOpenRouterKey();
const GEMINI_API_KEY = getGeminiKey();

const FREE_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "google/gemini-2.0-flash-lite-preview-02-05:free",
  "google/gemini-2.0-pro-exp-02-05:free",
  "deepseek/deepseek-chat:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "google/gemini-flash-1.5-8b:free",
  "google/gemini-pro-1.5:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "meta-llama/llama-3.2-1b-instruct:free",
  "microsoft/phi-3-mini-128k-instruct:free",
  "openchat/openchat-7b:free"
];

const extractJSON = (text: string) => {
  try {
    // Try direct parse
    return JSON.parse(text);
  } catch (e) {
    // Try to find JSON block in markdown
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        // Clean up potential markdown artifacts
        let jsonStr = match[0];
        return JSON.parse(jsonStr);
      } catch (e2) {
        console.error("Failed to parse extracted JSON:", text);
        throw new Error("AI returned invalid JSON format. Please try again.");
      }
    }
    console.error("No JSON found in response:", text);
    throw new Error("AI did not return a valid JSON response. Please try again.");
  }
};

export const generateCaption = async (
  text: string,
  mode: string,
  intensity: string,
  style: string
) => {
  const keyToUse = OPENROUTER_API_KEY;

  if ((!keyToUse || keyToUse.trim() === "") && !GEMINI_API_KEY) {
    throw new Error("API Key is missing. Please add 'OPENROUTER_API_KEY' in Settings > Secrets (gear icon at top right).");
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

  let lastError = "";
  let attemptCount = 0;

  if (keyToUse && keyToUse.trim() !== "") {
    for (const model of FREE_MODELS) {
      attemptCount++;
      try {
        console.log(`Attempt ${attemptCount}: Trying OpenRouter model: ${model}`);
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${keyToUse}`,
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
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0].message.content;
          if (!content) throw new Error("Model returned empty content");
          return extractJSON(content);
        } else {
          const errorData = await response.json().catch(() => ({}));
          lastError = errorData.error?.message || response.statusText || `HTTP ${response.status}`;
          console.warn(`Model ${model} failed (${response.status}):`, lastError);
          
          if (response.status === 401) {
            console.error("Invalid OpenRouter API Key detected.");
            break; // Stop trying OpenRouter if key is invalid
          }
          
          continue; 
        }
      } catch (err: any) {
        lastError = err.message;
        console.error(`Error with model ${model}:`, err);
        continue; 
      }
    }
  }

  // Final fallback to Gemini SDK if provided and OpenRouter failed
  if (GEMINI_API_KEY) {
    try {
      console.log("Falling back to Gemini SDK...");
      const { GoogleGenAI, Type } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: `Text: ${text}\nIntensity: ${intensity}\nStyle: ${style}` }] }],
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              variations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING },
                    caption: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  },
                  required: ["type", "caption", "explanation"]
                }
              }
            },
            required: ["variations"]
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error: any) {
      console.error("Gemini SDK Fallback Error:", error);
      lastError = error.message;
    }
  }

  throw new Error(`AI generation failed. Last error: ${lastError}. Please check your API keys in Settings > Secrets.`);
};
