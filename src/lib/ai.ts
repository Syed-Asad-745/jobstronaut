import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateText(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: prompt,
  });
  return response.text ?? "";
}

export async function generateJson(prompt: string): Promise<unknown> {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });
  return JSON.parse(response.text ?? "{}");
}
