import { GoogleGenAI, Type } from "@google/genai";
import { Hero } from '../types';

// API Key must be accessed directly from process.env.API_KEY per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuestLore = async (hero: Hero, difficulty: string): Promise<{ title: string, description: string, encounter: string }> => {
  if (!process.env.API_KEY) {
    return {
      title: "Simulation Mode Quest",
      description: "The neural link to the AI Core is down. Default mission parameters loaded.",
      encounter: "Standard patrol bot encounter."
    };
  }

  const model = 'gemini-2.5-flash';
  const prompt = `
    Generate a short, intense sci-fi mission briefing for a ${hero.rarity} ${hero.class} named ${hero.name} (Level ${hero.level}).
    Difficulty: ${difficulty}.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "The name of the mission" },
            description: { type: Type.STRING, description: "3-4 sentence briefing explaining the objective and threat." },
            encounter: { type: Type.STRING, description: "Description of the main enemy or hazard." }
          },
          required: ["title", "description", "encounter"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned");
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      title: "Emergency Protocol",
      description: "AI generation failed. Proceed with caution.",
      encounter: "Unknown anomaly."
    };
  }
};

export const generateNpcDialog = async (npcRole: string, playerAction: string): Promise<string> => {
   if (!process.env.API_KEY) return "Connection to AI Core lost. (API Key missing)";

   try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a single line of dialogue for a Sci-Fi ${npcRole} reacting to a player wanting to ${playerAction}. Keep it gritty and cyber-punk.`,
    });
    return response.text || "...";
   } catch (e) {
     return "System error.";
   }
};