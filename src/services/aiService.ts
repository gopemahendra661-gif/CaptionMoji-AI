const getOpenRouterKey = () => {
  try {
    // Vite's define will replace these strings during build
    return process.env.OPENROUTER_API_KEY || 
           (import.meta as any).env?.VITE_OPENROUTER_API_KEY || 
           (import.meta as any).env?.OPENROUTER_API_KEY || 
           "";
  } catch (e) {
    return (import.meta as any).env?.VITE_OPENROUTER_API_KEY || "";
  }
};

const getGeminiKey = () => {
  try {
    return process.env.GEMINI_API_KEY || 
           (import.meta as any).env?.VITE_GEMINI_API_KEY || 
           (import.meta as any).env?.GEMINI_API_KEY || 
           "";
  } catch (e) {
    return (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
  }
};

const OPENROUTER_API_KEY = getOpenRouterKey();
const GEMINI_API_KEY = getGeminiKey();

const MODELS = [
  "mistralai/mistral-7b-instruct",
  "google/gemma-7b-it",
  "meta-llama/llama-3.1-8b-instruct"
];

const extractJSON = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e2) {
        console.error("Failed to parse extracted JSON:", text);
        throw new Error("AI returned invalid JSON format.");
      }
    }
    throw new Error("AI did not return a valid JSON response.");
  }
};

export const generateCaption = async (
  text: string,
  mode: string,
  intensity: string,
  style: string
) => {
  if (!GEMINI_API_KEY && (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.trim() === "")) {
    throw new Error("API Key is missing. Please add 'GEMINI_API_KEY' or 'OPENROUTER_API_KEY' in Settings > Secrets.");
  }

  const systemInstruction = `
    You are CaptionMoji AI, an expert social media content creator and viral caption writer.
    Your task is to convert user text into highly engaging, scroll-stopping captions with smart emoji combinations.

    GOAL:
    Create captions that grab attention instantly (strong hook), feel natural/human-written, and are highly shareable on Instagram, WhatsApp, and Shorts.

    CORE RULES:
    1. Keep original meaning but enhance it.
    2. Add a strong hook in the first line.
    3. Add an emotional or relatable twist.
    4. Use smart emoji combinations (2–4 emojis max per sentence).
    5. Do NOT overuse emojis unless intensity is high.
    6. Make captions short, punchy, and impactful.
    7. Support Hindi, Hinglish, and English naturally.
    8. Add rhythm and flow like real social media captions.
    9. Emoji Intensity: ${intensity} (low: 1-2 emojis, medium: 3-5 emojis, high: 6+ emojis).
    10. Visual Style: ${style} (aesthetic: ✨🌸🌿💫, fire: 🔥💯⚡🚀, dark: 🖤🥀🌑, minimal: very limited emojis).

    MODE HANDLING:
    - Viral: High-energy, excitement, scroll-stopping hooks.
    - Funny: Humor, sarcasm, relatable jokes.
    - Romantic: Emotional depth, softness, connection.
    - Sad: Deep emotional tone, relatable and expressive.
    - Hook: Irresistible attention-grabbing first line.
    - Normal: Simple but enhanced and engaging.

    OUTPUT STRUCTURE:
    Provide 3 variations based on the requested mode (${mode}):
    - Variation 1: Primary (The best version for the chosen mode)
    - Variation 2: Alternative (A different take on the same mode)
    - Variation 3: Short/Punchy (A concise version)

    Return ONLY a JSON object with a "variations" key (array of objects). Each object must have "type", "caption", and "explanation".
  `;

  let lastError = "";

  // 1. Try Google Gemini API (Primary)
  if (GEMINI_API_KEY) {
    try {
      console.log("Trying Primary Model: Google Gemini...");
      const { GoogleGenAI, Type } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: `Text: ${text}\nIntensity: ${intensity}\nStyle: ${style}` }] }],
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 800,
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
      
      if (response.text) {
        console.log("Gemini generation successful.");
        return JSON.parse(response.text);
      }
    } catch (error: any) {
      console.error("Gemini API failed:", error.message);
      lastError = `Gemini Error: ${error.message}`;
    }
  }

  // 2. Fallback to OpenRouter Models
  if (OPENROUTER_API_KEY && OPENROUTER_API_KEY.trim() !== "") {
    console.log("Falling back to OpenRouter models...");
    for (const model of MODELS) {
      try {
        console.log("Trying OpenRouter model:", model);
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
            temperature: 0.7,
            max_tokens: 800,
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0]?.message?.content;
          if (content) {
            console.log(`OpenRouter model ${model} successful.`);
            return extractJSON(content);
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          lastError = errorData.error?.message || response.statusText || `HTTP ${response.status}`;
          console.warn(`Model ${model} failed:`, lastError);
          
          if (response.status === 401) {
            console.error("Invalid OpenRouter API Key.");
            break; 
          }
        }
      } catch (err: any) {
        lastError = err.message;
        console.error(`Error with model ${model}:`, err.message);
      }
    }
  }

  throw new Error(`AI generation failed. All models exhausted. Last error: ${lastError}`);
};
