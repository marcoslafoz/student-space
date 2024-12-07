import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'

const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

interface LoginData {
  login: string
}

interface LoginVars {
  username: string
  password: string
}

export const useLoginLazyQuery = (options?: LazyQueryHookOptions<LoginData, LoginVars>) => {
  return useLazyQuery<LoginData, LoginVars>(LOGIN, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useLoginQuery = (options?: QueryHookOptions<LoginData, LoginVars>) => {
  return useQuery<LoginData, LoginVars>(LOGIN, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
