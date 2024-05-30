import { gql } from '@apollo/client'

export const DOCUMENT_LIST_FIELDS = gql`
  fragment DocumentListFields on DocumentDto {
    id
    title
    course {
      id
      name
      color
      subjects {
        id
        name
        color
      }
    }
  }
`

export const DOCUMENT_READ_FIELDS = gql`
  fragment DocumentReadFields on DocumentDto {
    id
    title
    body
    course {
      id
      name
      color
      subjects {
        id
        name
        color
      }
    }
  }
`
