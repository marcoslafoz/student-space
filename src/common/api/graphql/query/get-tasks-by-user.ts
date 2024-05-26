import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { TASKS_LIST_FIELDS } from '../fragments'
import { Task } from '../../../types'

const GET_TASKS_BY_USER = gql`
  ${TASKS_LIST_FIELDS}
  query getTasksByUserId($userId: ID!) {
    getTasksByUserId(userId: $userId) {
      ...TaskListFields
    }
  }
`

interface GetTasksByUserData {
  getTasksByUserId: Task[]
}

interface GetTasksByUserVars {
  userId: number
}

export const useGetTasksByUserLazyQuery = (options?: LazyQueryHookOptions<GetTasksByUserData, GetTasksByUserVars>) => {
  return useLazyQuery<GetTasksByUserData, GetTasksByUserVars>(GET_TASKS_BY_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
export const useGetTasksByUserQuery = (options?: QueryHookOptions<GetTasksByUserData, GetTasksByUserVars>) => {
  return useQuery<GetTasksByUserData, GetTasksByUserVars>(GET_TASKS_BY_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
