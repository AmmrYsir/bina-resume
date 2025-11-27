import { reactive, watch } from 'vue'
import type { ResumeData, ResumeTheme, CatalogueItem } from '../types'
import { initialResumeState } from '../types'

const STORAGE_KEY = 'bina_resume_data'
const CATALOGUE_KEY = 'bina_resume_catalogue'

export function useResume() {
  // Load initial state from local storage or use default
  const savedData = localStorage.getItem(STORAGE_KEY)
  const resume = reactive<ResumeData>(
    savedData ? JSON.parse(savedData) : JSON.parse(JSON.stringify(initialResumeState)),
  )

  // Watch for changes and save to local storage
  watch(
    resume,
    (newVal) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    },
    { deep: true },
  )

  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    resume.personal[field] = value
  }

  const updateSummary = (value: string) => {
    resume.summary = value
  }

  const addExperience = () => {
    resume.experience.push({
      id: crypto.randomUUID(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    })
  }

  const removeExperience = (id: string) => {
    resume.experience = resume.experience.filter((exp) => exp.id !== id)
  }

  const addEducation = () => {
    resume.education.push({
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
    })
  }

  const removeEducation = (id: string) => {
    resume.education = resume.education.filter((edu) => edu.id !== id)
  }

  const updateTheme = (updates: Partial<ResumeTheme>) => {
    Object.assign(resume.theme, updates)
  }

  const setResumeData = (data: ResumeData) => {
    Object.assign(resume, data)
  }

  const resetResume = () => {
    Object.assign(resume, JSON.parse(JSON.stringify(initialResumeState)))
  }

  const saveToCatalogue = (title: string, author: string) => {
    const item: CatalogueItem = {
      id: crypto.randomUUID(),
      title,
      author,
      data: JSON.parse(JSON.stringify(resume)),
      createdAt: new Date().toISOString(),
    }

    const catalogue = getCatalogue()
    catalogue.push(item)
    localStorage.setItem(CATALOGUE_KEY, JSON.stringify(catalogue))
    return item
  }

  const getCatalogue = (): CatalogueItem[] => {
    const saved = localStorage.getItem(CATALOGUE_KEY)
    return saved ? JSON.parse(saved) : []
  }

  const loadFromCatalogue = (item: CatalogueItem) => {
    setResumeData(item.data)
  }

  return {
    resume,
    updatePersonal,
    updateSummary,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
    updateTheme,
    setResumeData,
    resetResume,
    saveToCatalogue,
    getCatalogue,
    loadFromCatalogue,
  }
}
