import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'

const LOGIN_FIND_USERNAME = gql`
  query loginFindUsername($username: String!) {
    loginFindUsername(username: $username)
  }
`

interface LoginFindUsernameData {
  loginFindUsername: boolean
}

interface LoginFindUsernameVars {
  username: string
}

export const useLoginFindUsernameLazyQuery = (options?: LazyQueryHookOptions<LoginFindUsernameData, LoginFindUsernameVars>) => {
  return useLazyQuery<LoginFindUsernameData, LoginFindUsernameVars>(LOGIN_FIND_USERNAME, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useLoginFindUsernameQuery = (options?: QueryHookOptions<LoginFindUsernameData, LoginFindUsernameVars>) => {
  return useQuery<LoginFindUsernameData, LoginFindUsernameVars>(LOGIN_FIND_USERNAME, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
