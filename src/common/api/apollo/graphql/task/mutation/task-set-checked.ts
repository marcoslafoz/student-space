import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const TASK_SET_CHECKED = gql`
  mutation taskSetChecked($taskId: ID, $checked: Boolean) {
    taskSetChecked(taskId: $taskId, checked: $checked)
  }
`

interface TaskSetCheckedData {
  taskSetChecked: boolean
}

interface TaskSetCheckedVars {
  taskId: number
  checked: boolean
}

export const useLazyMutationTaskSetCheckedData = (
  options?: MutationHookOptions<TaskSetCheckedData, TaskSetCheckedVars>
) => {
  return useMutation<TaskSetCheckedData, TaskSetCheckedVars>(
    TASK_SET_CHECKED,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
