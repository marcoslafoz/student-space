import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const SUBJECT_DELETE = gql`
  mutation subjectDelete($subjectId: ID) {
    subjectDelete(subjectId: $subjectId)
  }
`

interface SubjectDeleteData {
  subjectDelete: boolean
}

interface SubjectDeleteVars {
  subjectId: number
}

export const useLazyMutationSubjectDelete = (options?: MutationHookOptions<SubjectDeleteData, SubjectDeleteVars>) => {
  return useMutation<SubjectDeleteData, SubjectDeleteVars>(
    SUBJECT_DELETE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
