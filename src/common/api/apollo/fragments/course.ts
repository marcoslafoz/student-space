import { gql } from '@apollo/client'

export const COURSE_FIELDS = gql`
  fragment CourseFields on CourseDto {
    id
    name
    color
    subjects {
      id
      name
      color
    }
  }
`
