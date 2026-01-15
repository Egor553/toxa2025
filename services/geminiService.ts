
import { GoogleGenAI, Type } from "@google/genai";
import { NDVIResult, ChatMessage } from "../types";

// Always initialize with the named parameter apiKey
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeEcologicalState = async (cityName: string): Promise<NDVIResult> => {
  const prompt = `Analyze the current ecological state of greenery in ${cityName}. Calculate a simulated NDVI value (normalized difference vegetation index) based on general satellite data trends for 2024-2025. Also generate a 5-point historical trend (NDVI values over last 5 years). Return JSON.`;

  // For complex text tasks like analysis and reasoning, use 'gemini-3-pro-preview'
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          city: { type: Type.STRING },
          ndviValue: { type: Type.NUMBER },
          percentage: { type: Type.NUMBER },
          healthStatus: { type: Type.STRING },
          timestamp: { type: Type.STRING },
          historicalTrend: { 
            type: Type.ARRAY, 
            items: { type: Type.NUMBER },
            description: "Last 5 years NDVI values"
          }
        },
        required: ["city", "ndviValue", "percentage", "healthStatus", "timestamp", "historicalTrend"]
      }
    }
  });

  // Extract text using the property .text
  const jsonStr = response.text?.trim();
  if (!jsonStr) throw new Error("Empty response");
  return JSON.parse(jsonStr) as NDVIResult;
};

export const getEnvironmentalAdvice = async (result: NDVIResult): Promise<string> => {
  const prompt = `City: ${result.city}. NDVI: ${result.ndviValue}. Health: ${result.healthStatus}. Give 3 actionable tips.`;
  // For basic text tasks like tips and summarization, use 'gemini-3-flash-preview'
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });
  // Use .text property
  return response.text || "No advice available.";
};

export const ecoAssistantChat = async (history: ChatMessage[], message: string): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are GreenAI, a professional environmental assistant. You help users understand satellite data, recycling rules, and ecological preservation. Keep answers concise and helpful."
    }
  });

  // chat.sendMessage only accepts the message parameter
  const response = await chat.sendMessage({ message });
  // Use .text property
  return response.text || "Error processing message.";
};
