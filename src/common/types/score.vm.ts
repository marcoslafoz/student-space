import { Subject } from './subject.vm'

export interface Score {
  id: number
  name: string
  score?: number
  date?: string
  status: number
  subject: Subject
}

export enum ScoreStatusEnum {
  PASSED = 1,
  FAILED = 2,
}
