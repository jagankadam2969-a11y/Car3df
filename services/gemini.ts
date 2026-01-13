
import { GoogleGenAI, Type } from "@google/genai";
import { CarConfig, DesignReview } from "../types";

// Always initialize GoogleGenAI with a named parameter and direct process.env.API_KEY usage.
// As per guidelines, we create a new instance right before making an API call to ensure the latest key is used.

export const getDesignReview = async (config: CarConfig): Promise<DesignReview> => {
  // Directly initialize GoogleGenAI as required.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Review this custom car design:
    Brand: ${config.brandName}
    Model: ${config.modelName}
    Body Type: ${config.bodyType}
    Body Color: ${config.bodyColor}
    Rims: ${config.rimColor}
    Spoiler: ${config.spoiler ? 'Yes' : 'No'}
    Neon Underglow: ${config.neonUnderglow ? config.neonColor : 'None'}
    
    Provide a critique of its aesthetic appeal and marketability.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rating: { type: Type.NUMBER, description: "A score from 1-10" },
          critique: { type: Type.STRING },
          suggestedEnhancements: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          marketSegment: { type: Type.STRING }
        },
        required: ["rating", "critique", "suggestedEnhancements", "marketSegment"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Failed to receive a response from the AI designer.");
  }
  
  return JSON.parse(text.trim());
};

export const generateCarRender = async (config: CarConfig): Promise<string | null> => {
  // Create a new instance right before the call as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `A professional photorealistic 8k studio shot of a ${config.bodyType} car, 
    painted in high-gloss ${config.bodyColor}, with ${config.rimColor} custom wheels. 
    ${config.spoiler ? 'It has a racing rear wing.' : ''} 
    ${config.neonUnderglow ? `Intense ${config.neonColor} neon underglow lighting.` : ''}
    The brand is ${config.brandName} and the model is ${config.modelName}. 
    Cinematic lighting, dark luxury background, raytraced reflections.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    // Iterate through all parts to find the image part, do not assume it is the first part.
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed", error);
    return null;
  }
};
