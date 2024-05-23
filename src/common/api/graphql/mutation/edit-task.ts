import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Task } from '../../../types'

const EDIT_TASK = gql`
  mutation EditTask($task: InputTaskDto) {
    editTask(task: $task)
  }
`

interface EditTaskData {
  editTask: boolean
}

interface EditTaskVars {
  task: Task
}

export const useLazyMutationEditTask = (
  options?: MutationHookOptions<EditTaskData, EditTaskVars>
) => {
  return useMutation<EditTaskData, EditTaskVars>(
    EDIT_TASK,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}