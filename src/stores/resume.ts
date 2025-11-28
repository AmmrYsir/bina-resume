import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ResumeData } from '../types'

export const useResumeStore = defineStore('resume', () => {
  const resumeData = ref<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      website: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
  })

  const generatedResumeHtml = ref('')
  const isGenerating = ref(false)

  return {
    resumeData,
    generatedResumeHtml,
    isGenerating,
  }
})
