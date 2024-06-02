import { gql } from '@apollo/client'

export const COURSE_LIST_FIELDS = gql`
  fragment CourseListFields on CourseDto {
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

export const COURSE_READ_FIELDS = gql`
  fragment CourseReadFields on CourseDto {
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
