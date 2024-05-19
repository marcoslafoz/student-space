import { gql } from '@apollo/client'
import { ACADEMIC_COURSE_FIELDS } from './academic-course'
import { SUBJECT_FIELDS } from './subject'

export const TASKS_LIST_FIELDS = gql`
    ${ACADEMIC_COURSE_FIELDS}
    ${SUBJECT_FIELDS}
    fragment TaskListFields on TaskDto {
    id
    title
    description
    checked
    date
    academicCourse {
      ...AcademicCourseFields
    }
    subject {
      ...SubjectFields
    }
  }
`