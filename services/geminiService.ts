import { GoogleGenAI, Type } from "@google/genai";
import { SearchIntent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSearchQuery = async (query: string): Promise<SearchIntent> => {
  if (!query || query.trim().length < 2) {
    return { interpretedIntent: '', keywords: [] };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Interpret the following user search query related to domestic helpers.
      Map the user's natural language to specific job skills or categories (e.g., "looking after grandma" -> "Elderly Care", "baby" -> "Child Care", "cooking" -> "Chef/Cooking").
      
      User Query: "${query}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interpretedIntent: {
              type: Type.STRING,
              description: "A short, professional category name for the user's search intent (e.g., 'Elderly Care', 'Cooking', 'Nursing').",
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of relevant keywords or tags to filter candidates by.",
            },
          },
          required: ["interpretedIntent", "keywords"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as SearchIntent;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    // Fallback for demo purposes if API fails or quota exceeded
    return { interpretedIntent: 'Search', keywords: [query] };
  }
};
