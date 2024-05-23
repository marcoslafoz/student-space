import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const REMOVE_TASK = gql`
  mutation RemoveTask($taskId: ID) {
    removeTask(taskId: $taskId)
  }
`

interface RemoveTaskData {
  removeTask: boolean
}

interface RemoveTaskVars {
  taskId: number
}

export const useLazyMutationRemoveTask = (
  options?: MutationHookOptions<RemoveTaskData, RemoveTaskVars>
) => {
  return useMutation<RemoveTaskData, RemoveTaskVars>(
    REMOVE_TASK,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}