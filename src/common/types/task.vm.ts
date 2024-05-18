import { AcademicCourse } from './academic-course.vm'

export interface Task {
  id: number
  title: string
  description?: string
  checked: boolean
  academicCourse? : AcademicCourse
}
