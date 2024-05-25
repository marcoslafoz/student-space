import { gql } from '@apollo/client'

export const SUBJECT_FIELDS = gql`
  fragment SubjectFields on SubjectDto {
    id
    name
    color
    academicCourse {
      id
    }
  }
`
