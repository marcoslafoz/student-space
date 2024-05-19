import { gql } from '@apollo/client'

export const ACADEMIC_COURSE_FIELDS = gql`
  fragment AcademicCourseFields on AcademicCourseDto {
    id
    name
    color
  }
`
