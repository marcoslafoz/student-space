import { Course } from './course.vm'
import { SelectItem } from './object-type.vm'
import { Subject } from './subject.vm'

export interface Score {
  id: number
  name: string
  score: number
  date?: string
  status?: number
  subject: Subject
  course: Course
}

export enum ScoreStatusEnum {
  PASSED = 1,
  FAILED = 2,
}

export const scoreSelectOptions: SelectItem[] = [
  { label: 'Aprobado', value: 1 },
  { label: 'Suspenso', value: 2 },
]
