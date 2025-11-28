import { GoogleGenerativeAI } from '@google/generative-ai'
import type { ResumeData } from '../types'

export interface AIService {
  generateResume(data: ResumeData, apiKey: string): Promise<string>
}

export class GeminiService implements AIService {
  async generateResume(data: ResumeData, apiKey: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()

    // Clean up markdown code blocks if present
    text = text.replace(/```html/g, '').replace(/```/g, '')

    return text
  }
}
