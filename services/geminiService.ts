
import { GoogleGenAI } from "@google/genai";
import { ResearchType } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async runResearch(type: ResearchType, query: string, webContext: string = ""): Promise<string> {
    const model = 'gemini-3-pro-preview';
    
    const basePrompts = {
      [ResearchType.PRODUCT]: "Perform an in-depth product research.",
      [ResearchType.MARKET]: "Analyze market intelligence and trends.",
      [ResearchType.SENTIMENT]: "Analyze user sentiment distribution.",
      [ResearchType.COMPETITIVE]: "Conduct competitive intelligence analysis.",
      [ResearchType.PRICING]: "Research pricing intelligence and tiers.",
    };

    const contextInstruction = webContext 
      ? `Below is live data crawled from the web to help you answer with the most up-to-date information:\n\n${webContext}\n\n`
      : "Rely on your internal knowledge base.";

    const prompt = `
      Task: ${basePrompts[type] || "Research task"} for "${query}".
      
      ${contextInstruction}

      Requirements:
      1. Provide an Executive Summary.
      2. Analyze Signal vs Noise.
      3. List Key Features/Insights.
      4. Compare with competitors/alternatives if applicable.
      5. Format as clear Markdown with headers.
      6. If web data was provided, cite the sources used.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 0.95,
        }
      });

      return response.text || "No insights generated.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to connect to AI engine.");
    }
  }

  async getDashboardStatsSuggestions(): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Give me one insightful market research tip for a professional dashboard in 1 sentence.",
      });
      return response.text || "Keep data fresh for better decisions.";
    } catch {
      return "Always cross-reference AI data with primary sources.";
    }
  }
}

export const gemini = new GeminiService();
