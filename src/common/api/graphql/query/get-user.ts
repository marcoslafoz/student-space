import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { USER_FIELDS } from '../fragments'
import { User } from '../../../types'

const GET_USER = gql`
  ${USER_FIELDS}
  query getUserById($userId: ID!) {
    getUserById(id: $userId) {
      ...UserFields
    }
  }
`

interface GetUserData {
  getUserById: User
}

interface GetUserVars {
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
