import { AcademicCourse } from './academic-course.vm'
import { Subject } from './subject.vm'

export interface Document {
  id: number
  title: string
  body: string
  academicCourse: AcademicCourse
  subject: Subject
}
