
import { GoogleGenAI, Type } from "@google/genai";
import { NDVIResult, ChatMessage, RecyclingPoint } from "../types";

// Always initialize with the named parameter and process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes the ecological state of a city using the high-reasoning model.
 */
export const analyzeEcologicalState = async (cityName: string): Promise<NDVIResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze ecological state of ${cityName}. NDVI, health, history. JSON only.`,
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
          historicalTrend: { type: Type.ARRAY, items: { type: Type.NUMBER } }
        },
        required: ["city", "ndviValue", "percentage", "healthStatus", "timestamp"]
      }
    }
  });
  // Use the .text property getter to retrieve output
  return JSON.parse(response.text || "{}");
};

/**
 * Provides specific environmental recommendations based on ecological metrics.
 * Fixed: This function was missing and causing a compilation error in ModuleB.tsx.
 */
export const getEnvironmentalAdvice = async (data: NDVIResult): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the following ecological data for ${data.city}: 
    NDVI: ${data.ndviValue}, Greenery Percentage: ${data.percentage}%, Health Status: ${data.healthStatus}. 
    Provide 3-4 specific environmental recommendations for this city in Russian.`,
  });
  return response.text || "";
};

/**
 * Finds recycling points using Google Search grounding.
 * Extracts sources from groundingMetadata to display URLs on the web app.
 */
export const findRecyclingPointsGlobally = async (location: string, type: string = "все"): Promise<{ points: RecyclingPoint[], sources: { title: string, uri: string }[] }> => {
  const prompt = `Найди актуальные пункты приема вторсырья (${type}) в городе ${location}, Россия. 
  Для каждого пункта укажи: название, точный адрес, примерные координаты [lat, lng], часы работы и краткое описание.
  Верни ответ в формате JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          points: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['plastic', 'paper', 'batteries', 'glass'] },
                address: { type: Type.STRING },
                coords: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                hours: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["id", "name", "type", "address", "coords"]
            }
          }
        }
      }
    }
  });

  // Extract URLs from groundingChunks and list them as required by guidelines.
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || "Источник",
    uri: chunk.web?.uri || "#"
  })) || [];

  let data = { points: [] };
  try {
    const text = response.text || '{"points":[]}';
    // Extraction logic to handle cases where search results might include additional text or citations.
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanJson = jsonMatch ? jsonMatch[0] : text;
    data = JSON.parse(cleanJson);
  } catch (e) {
    console.warn("Parsing JSON from grounded response failed, using empty results", e);
  }
  
  return { 
    points: (data.points || []).map((p: any) => ({ 
      ...p, 
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400' 
    })), 
    sources 
  };
};

/**
 * Eco-assistant chat interface with history management.
 */
export const ecoAssistantChat = async (history: ChatMessage[], message: string): Promise<string> => {
  // Use create without history in args if not supported by current SDK definition, then set history property.
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: { systemInstruction: "You are a helpful Eco-assistant for users in Russia. Answer questions about recycling, NDVI, and environmental conservation." }
  });
  
  // Set the chat history from existing application state.
  chat.history = history.map(msg => ({ 
    role: msg.role, 
    parts: [{ text: msg.text }] 
  }));

  const response = await chat.sendMessage({ message });
  return response.text || "";
};
