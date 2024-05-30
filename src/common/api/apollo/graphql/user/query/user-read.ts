import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { USER_READ_FIELDS } from '../../../fragments'
import { User } from '../../../../../types'

const GET_USER = gql`
  ${USER_READ_FIELDS}
  query userRead($userId: ID!) {
    userRead(id: $userId) {
      ...UserReadFields
    }
  }
`

interface UserReadData {
  getUserById: User
}

interface UserReadVars {
  userId: number
}

export const useUserReadLazyQuery = (options?: LazyQueryHookOptions<UserReadData, UserReadVars>) => {
  return useLazyQuery<UserReadData, UserReadVars>(GET_USER, {
    errorPolicy: 'all',
    ...options,
  })
}

export const useUserReadQuery = (options?: QueryHookOptions<UserReadData, UserReadVars>) => {
  return useQuery<UserReadData, UserReadVars>(GET_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
