import { ref } from 'vue';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ResumeData } from '../types';
import { useResume } from './useResume';

export function useGemini() {
  const isGenerating = ref(false);
  const error = ref<string | null>(null);
  const { setResumeData } = useResume();

  const generateResume = async (apiKey: string, prompt: string) => {
    if (!apiKey) {
      error.value = 'API Key is required';
      return;
    }

    isGenerating.value = true;
    error.value = null;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemPrompt = `
        You are an expert resume builder and designer.
        Generate a JSON object representing a resume based on the user's description.
        The JSON MUST strictly follow this schema:
        {
          "personal": { "fullName": "", "email": "", "phone": "", "title": "", "location": "", "website": "" },
          "summary": "Professional summary...",
          "experience": [{ "id": "uuid", "company": "", "role": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "current": boolean, "description": "" }],
          "education": [{ "id": "uuid", "school": "", "degree": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM" }],
          "skills": ["Skill1", "Skill2"],
          "theme": {
            "primaryColor": "Hex Code (e.g. #6366f1)",
            "secondaryColor": "Hex Code",
            "backgroundColor": "Hex Code (usually white or very light)",
            "fontFamily": "Font Name (e.g. Inter, Roboto)",
            "layout": "modern" | "classic" | "minimal",
            "borderRadius": "8px"
          }
        }

        Ensure the content is professional and the theme colors are harmonious and match the vibe of the role.
        Return ONLY the JSON string, no markdown formatting.
      `;

      const result = await model.generateContent([systemPrompt, `User Description: ${prompt}`]);
      const response = result.response;
      const text = response.text();

      // Clean up potential markdown code blocks
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

      const data: ResumeData = JSON.parse(cleanJson);

      // Ensure IDs are present
      data.experience.forEach(exp => exp.id = exp.id || crypto.randomUUID());
      data.education.forEach(edu => edu.id = edu.id || crypto.randomUUID());

      setResumeData(data);
    } catch (e: any) {
      console.error('Gemini Generation Error:', e);
      error.value = e.message || 'Failed to generate resume';
    } finally {
      isGenerating.value = false;
    }
  };

  return {
    generateResume,
    isGenerating,
    error,
  };
}
