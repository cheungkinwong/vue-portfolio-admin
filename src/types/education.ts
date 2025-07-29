export interface Education {
  id: number
  sectionId: number
  school: string
  course: string
  startDate: string
  endDate?: string | null
}
