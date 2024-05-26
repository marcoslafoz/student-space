import { gql } from '@apollo/client'

export const DOCUMENT_LIST_FIELDS = gql`
  fragment DocumentListFields on DocumentDto {
    id
    title
    academicCourse {
      id
      name
      color
    }
    subject {
      id
      name
      color
    }
  }
`

export const DOCUMENT_FIELDS = gql`
  fragment DocumentFields on DocumentDto {
    id
    title
    body
    academicCourse {
      id
      name
      color
    }
    subject {
      id
      name
      color
    }
  }
`
