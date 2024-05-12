import { gql } from '@apollo/client'

export const USER_FIELDS = gql`
  fragment UserFields on UserDto {
    name
    username
    surname
    email
  }
`
