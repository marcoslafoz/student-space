import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { USER_FIELDS } from '../fragments'
import { User } from '../../../types'

export const GET_USER = gql`
  ${USER_FIELDS}
  query getUserById($userId: ID!) {
    getUserById(id: $userId) {
      ...UserFields
    }
  }
`

export interface GetUserData {
  getUserById: User
}

export interface GetUserVars {
  userId: number
}

export const useGetUserLazyQuery = (options?: LazyQueryHookOptions<GetUserData, GetUserVars>) => {
  return useLazyQuery<GetUserData, GetUserVars>(GET_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
export const useGetUserQuery = (options?: QueryHookOptions<GetUserData, GetUserVars>) => {
  return useQuery<GetUserData, GetUserVars>(GET_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
