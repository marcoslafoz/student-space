import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Task } from '../../../../../types'

const TASK_ADD = gql`
  mutation taskAdd($userId: ID, $task: InputTaskDto) {
    taskAdd(userId: $userId, task: $task)
  }
`

interface TaskAddData {
  taskAdd: boolean
}

interface AddTaskVars {
  userId: number
  task: Task
}

export const useLazyMutationTaskAdd = (options?: MutationHookOptions<TaskAddData, AddTaskVars>) => {
  return useMutation<TaskAddData, AddTaskVars>(
    TASK_ADD,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
