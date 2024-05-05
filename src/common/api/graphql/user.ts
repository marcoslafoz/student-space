import { gql } from 'graphql-tag'

export const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    getUserById(id: $userId) {
      username
      name
      surname
      email
    }
  }
`

export interface User {
  username: string;
  name: string;
  surname: string;
  email: string;
}

export interface UserData {
  getUserById: User;
}