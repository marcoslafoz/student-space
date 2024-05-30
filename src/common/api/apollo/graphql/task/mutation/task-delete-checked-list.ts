import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const TASK_DELETE_CHECKED_LIST = gql`
  mutation taskDeleteCheckedList($userId: ID) {
    taskDeleteCheckedList(userId: $userId)
  }
`

interface TaskDeleteCheckedListData {
  taskDeleteCheckedList: boolean
}

interface TaskDeleteCheckedListVars {
  userId: number
}

export const useLazyMutationTaskDeleteCheckedList = (
  options?: MutationHookOptions<TaskDeleteCheckedListData, TaskDeleteCheckedListVars>
) => {
  return useMutation<TaskDeleteCheckedListData, TaskDeleteCheckedListVars>(
    TASK_DELETE_CHECKED_LIST,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
