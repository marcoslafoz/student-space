import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Task } from '../../../types'

const ADD_TASK = gql`
  mutation AddTask($userId: ID, $task: InputTaskDto) {
    addTask(userId: $userId, task: $task)
  }
`

interface AddTaskData {
  addTask: boolean
}

interface AddTaskVars {
  userId: number
  task: Task
}

export const useLazyMutationAddTask = (
  options?: MutationHookOptions<AddTaskData, AddTaskVars>
) => {
  return useMutation<AddTaskData, AddTaskVars>(
    ADD_TASK,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}