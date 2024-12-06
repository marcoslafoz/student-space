import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const TASK_DELETE = gql`
  mutation taskDelete($taskId: ID) {
    taskDelete(taskId: $taskId)
  }
`

interface TaskDeleteData {
  taskDelete: boolean
}

interface TaskDeleteVars {
  taskId: number
}

export const useLazyMutationTaskDelete = (options?: MutationHookOptions<TaskDeleteData, TaskDeleteVars>) => {
  return useMutation<TaskDeleteData, TaskDeleteVars>(
    TASK_DELETE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
