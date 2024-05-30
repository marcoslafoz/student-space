import { Subject } from './subject.vm'

export interface Course {
  id: number
  name: string
  color?: string
  subject?: Subject[]
}
