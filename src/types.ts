export interface Experience {
  id: number
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id: number
  school: string
  degree: string
  startDate: string
  endDate: string
  description: string
}

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  linkedin: string
  website: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
}
