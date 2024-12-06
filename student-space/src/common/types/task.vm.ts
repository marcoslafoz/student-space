import { Course } from './course.vm'
import { Subject } from './subject.vm'

export interface Task {
  id: number
  title: string
  date?: string
  description?: string
  checked: boolean
  course?: Course
  subject?: Subject
}
