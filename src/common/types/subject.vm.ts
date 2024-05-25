import { AcademicCourse } from './academic-course.vm'

export interface Subject {
  id: number
  name: string
  color?: string
  academicCourse?: AcademicCourse
}
