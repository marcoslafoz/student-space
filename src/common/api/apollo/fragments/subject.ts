import { gql } from '@apollo/client'

export const SUBJECT_FIELDS = gql`
  fragment SubjectFields on SubjectDto {
    id
    name
    color
  }
`

export const SUBJECT_READ_FIELDS = gql`
  fragment SubjectReadFields on SubjectDto {
    id
    name
    color
  }
`
