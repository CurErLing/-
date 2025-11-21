import { GoogleGenAI, Type } from "@google/genai";
import { GameRecommendation, Language } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getGameRecommendations = async (mood: string, language: Language): Promise<GameRecommendation[]> => {
  if (!apiKey) {
    console.error("API Key is missing");
    return [];
  }

  const langInstruction = language === 'zh' 
    ? "Provide the 'title', 'description', 'genre', and 'vibe' values in Simplified Chinese (zh-CN). Keep keys in English." 
    : "Provide the values in English.";

  const prompt = `Recommend 4 unique, indie, or visually striking video games based on this mood/request: "${mood}". 
  Focus on aesthetically pleasing or avant-garde games. 
  For 'colorTheme', choose strictly one of: 'pink', 'blue', 'green', 'purple' that matches the game's cover art or vibe.
  ${langInstruction}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              genre: { type: Type.STRING },
              vibe: { type: Type.STRING },
              score: { type: Type.NUMBER, description: "A score out of 10" },
              year: { type: Type.NUMBER },
              colorTheme: { type: Type.STRING, enum: ['pink', 'blue', 'green', 'purple'] }
            },
            required: ['title', 'description', 'genre', 'score', 'year', 'colorTheme', 'vibe']
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GameRecommendation[];
    }
    return [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};