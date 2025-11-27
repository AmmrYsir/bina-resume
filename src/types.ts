export interface ResumeData {
  personal: {
    fullName: string
    email: string
    phone: string
    title: string
    location: string
    website: string
  }
  summary: string
  experience: Array<{
    id: string
    company: string
    role: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    startDate: string
    endDate: string
  }>
  skills: string[]
  theme: ResumeTheme
}

export interface ResumeTheme {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  fontFamily: string
  layout: 'modern' | 'classic' | 'minimal'
  borderRadius: string
}

export interface UserProfile {
  name: string
  apiKey: string
}

export interface CatalogueItem {
  id: string
  title: string
  author: string
  data: ResumeData
  createdAt: string
}

export const initialResumeState: ResumeData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    title: '',
    location: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  theme: {
    primaryColor: '#6366f1',
    secondaryColor: '#ec4899',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
    layout: 'modern',
    borderRadius: '8px',
  },
}
