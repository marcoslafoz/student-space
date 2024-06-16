import { gql } from '@apollo/client'

export const USER_READ_FIELDS = gql`
  fragment UserReadFields on UserDto {
    name
    username
    surname
    email
    birthday
    avatar {
      id
      title
      url
    }
  }
`
