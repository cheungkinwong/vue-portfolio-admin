export interface WorkExperience {
  id: number
  sectionId: number
  company: string
  startDate: string
  endDate?: string | null
  position?: string | null
}
