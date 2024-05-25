import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const REMOVE_CHECKED_TASKS = gql`
  mutation RemoveCheckedTasks($userId: ID) {
    removeCheckedTasks(userId: $userId)
  }
`

interface RemoveCheckedTasksData {
  removeTask: boolean
}

interface RemoveCheckedTasksVars {
  userId: number
}

export const useLazyMutationRemoveCheckedTasks = (
  options?: MutationHookOptions<RemoveCheckedTasksData, RemoveCheckedTasksVars>
) => {
  return useMutation<RemoveCheckedTasksData, RemoveCheckedTasksVars>(
    REMOVE_CHECKED_TASKS,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
