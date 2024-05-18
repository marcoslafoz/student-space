import { gql } from '@apollo/client'
import { ACADEMIC_COURSE_FIELDS } from './academic-course'

export const TASKS_LIST_FIELDS = gql`
    ${ACADEMIC_COURSE_FIELDS}
    fragment TaskListFields on TaskDto {
    id
    title
    description
    checked
    academicCourse {
    ...AcademicCourseFields
    }
  }
`