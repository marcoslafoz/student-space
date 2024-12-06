import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Subject } from '../../../../../types'

const SUBJECT_EDIT = gql`
  mutation subjectEdit($subject: InputSubjectDto) {
    subjectEdit(subject: $subject)
  }
`

interface SubjectEditData {
  subjectEdit: boolean
}

interface SubjectEditVars {
  subject: Subject
}

export const useLazyMutationSubjectEdit = (options?: MutationHookOptions<SubjectEditData, SubjectEditVars>) => {
  return useMutation<SubjectEditData, SubjectEditVars>(
    SUBJECT_EDIT,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
