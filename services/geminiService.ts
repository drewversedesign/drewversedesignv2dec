
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GroundingSource } from "../types";

const SYSTEM_INSTRUCTION = `
You are the DrewVerse AI Design Consultant and Research Assistant based in Kampala, Uganda.
Your primary tasks:
1. CONSULT: Help clients explore DrewVerse's services (Web, Mobile, UI/UX, Brand).
2. RESEARCH: Use Google Search to provide up-to-date digital marketing trends, technology news, and industry standards.
3. GEO-LOCATE: Use Google Maps to help users find our physical location or recommend local Ugandan business contexts.

Always be professional. DrewVerse started in 2023.
If you use research, cite your sources clearly using the provided tools.
Encourage project inquiries.
`;

export interface GeminiResponse {
  text: string;
  sources: GroundingSource[];
}

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  }

  async getChatResponse(message: string, useLocation: boolean = false): Promise<GeminiResponse> {
    try {
      const latLng = useLocation ? await this.getCurrentLocation() : { latitude: 0.3476, longitude: 32.5825 }; // Default to Kampala

      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: "gemini-2.5-flash", // Using 2.5 for both Search and Maps support
        contents: [{ role: "user", parts: [{ text: message }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }, { googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: latLng
            }
          }
        },
      });

      const text = response.text || "I'm sorry, I couldn't generate a response.";
      const sources: GroundingSource[] = [];

      // Extract Grounding Chunks (Search and Maps)
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        groundingChunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title });
          } else if (chunk.maps) {
            sources.push({ uri: chunk.maps.uri, title: chunk.maps.title });
          }
        });
      }

      return { text, sources };
    } catch (error) {
      console.error("Gemini Error:", error);
      return { 
        text: "There was an error connecting to the AI consultant. Please try again later.",
        sources: []
      };
    }
  }

  private async getCurrentLocation(): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ latitude: 0.3476, longitude: 32.5825 });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => resolve({ latitude: 0.3476, longitude: 32.5825 })
      );
    });
  }
}

export const geminiService = new GeminiService();
