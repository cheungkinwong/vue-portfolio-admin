
import type { WorkExperience } from '@/types/workExperience'
import type { Education } from '@/types/education'
import type { TechnicalSkill } from '@/types/technicalSkill'
import type { SoftSkill } from '@/types/softSkill'
import type { Hobby } from '@/types/hobby'

export interface Section {
  id: number
  title: string
  description?: string | null
  image?: string | null
  altText?: string | null
  workExperiences?: WorkExperience[]
  educations?: Education[]
  technicalSkills?: TechnicalSkill[]
  softSkills?: SoftSkill[]
  hobbies?: Hobby[]
}
