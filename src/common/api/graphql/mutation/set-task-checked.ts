import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const SET_TASK_CHECKED = gql`
  mutation setTaskChecked($taskId: ID $checked: Boolean) {
    setTaskChecked(taskId: $taskId checked: $checked)
  }
`

interface SetTaskCheckedData {
  setTaskChecked: boolean
}

interface SetTaskCheckedVars {
  taskId: number
  checked: boolean
}

export const useLazyMutationSetTaskCheckedData = (
  options?: MutationHookOptions<SetTaskCheckedData, SetTaskCheckedVars>
) => {
  return useMutation<SetTaskCheckedData, SetTaskCheckedVars>(
    SET_TASK_CHECKED,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
