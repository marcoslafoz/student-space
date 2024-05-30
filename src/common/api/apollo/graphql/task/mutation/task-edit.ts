import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Task } from '../../../../../types'

const TASK_EDIT = gql`
  mutation taskEdit($task: InputTaskDto) {
    taskEdit(task: $task)
  }
`

interface TaskEditData {
  taskEdit: boolean
}

interface TaskEditVars {
  task: Task
}

export const useLazyMutationTaskEdit = (options?: MutationHookOptions<TaskEditData, TaskEditVars>) => {
  return useMutation<TaskEditData, TaskEditVars>(
    TASK_EDIT,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
