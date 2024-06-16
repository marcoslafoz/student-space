import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { Task } from '../../../../../types'
import { TASKS_LIST_FIELDS } from '../../../fragments'

const TASK_GET_LIST_BY_USER = gql`
  ${TASKS_LIST_FIELDS}
  query taskGetPendingListByUser($userId: ID!) {
    taskGetPendingListByUser(userId: $userId) {
      ...TaskListFields
    }
  }
`

interface TaskGetListByUserData {
  taskGetPendingListByUser: Task[]
}

interface TaskGetListByUserVars {
  userId: number
}

export const useTaskGetPendingListByUserLazyQuery = (
  options?: LazyQueryHookOptions<TaskGetListByUserData, TaskGetListByUserVars>
) => {
  return useLazyQuery<TaskGetListByUserData, TaskGetListByUserVars>(TASK_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useTaskGetPendingListByUserQuery = (
  options?: QueryHookOptions<TaskGetListByUserData, TaskGetListByUserVars>
) => {
  return useQuery<TaskGetListByUserData, TaskGetListByUserVars>(TASK_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
