import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const REMOVE_TASK_SUBJECT = gql`
  mutation RemoveTaskSubject($taskId: ID $subjectId: ID) {
    removeTaskSubject(taskId: $taskId subjectId: $subjectId)
  }
`

interface RemoveTaskSubjectData {
  removeTask: boolean
}

interface RemoveTaskSubjectVars {
  taskId: number
  subjectId: number
}

export const useLazyMutationRemoveTaskSubject = (
  options?: MutationHookOptions<RemoveTaskSubjectData, RemoveTaskSubjectVars>
) => {
  return useMutation<RemoveTaskSubjectData, RemoveTaskSubjectVars>(
    REMOVE_TASK_SUBJECT,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}