import { GoogleGenAI } from '@google/genai'
import type { ResumeData } from '../types'

export interface AIService {
  generateResume(data: ResumeData, apiKey: string): Promise<string>
}

export class GeminiService implements AIService {
  async generateResume(data: ResumeData, apiKey: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey })

    const prompt = `
      You are an expert resume writer and designer.
      Create a professional, modern HTML resume based on the following data:
      ${JSON.stringify(data)}

      Requirements:
      - Use semantic HTML5.
      - Use inline CSS for styling to ensure it renders correctly in a preview.
      - Make it look premium and clean.
      - Do NOT include any markdown code blocks (like \`\`\`html). Just return the raw HTML.
      - Ensure the layout is responsive if possible, but prioritize print/pdf look.
    `

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    let text = response.text || ''

    // Clean up markdown code blocks if present
    text = text.replace(/```html/g, '').replace(/```/g, '')

    return text
  }
}
