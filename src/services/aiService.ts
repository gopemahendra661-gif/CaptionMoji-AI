import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const generateCaption = async (
  text: string,
  mode: string,
  intensity: string,
  style: string
) => {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  
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

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
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
                  type: { type: Type.STRING, description: "The style of the variation (Viral, Funny, Emotional)." },
                  caption: { type: Type.STRING, description: "The generated caption with emojis." },
                  explanation: { type: Type.STRING, description: "A brief explanation of why this caption works." }
                },
                required: ["type", "caption", "explanation"]
              }
            }
          },
          required: ["variations"]
        }
      }
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(textResponse);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error("AI generation failed. Please try again in a few seconds.");
  }
};
