import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Subject } from '../../../../../types'

const SUBJECT_ADD = gql`
  mutation subjectAdd($courseId: ID, $subject: InputSubjectDto) {
    subjectAdd(courseId: $courseId, subject: $subject)
  }
`

interface SubjectAddData {
  subjectAdd: boolean
}

interface SubjectAddVars {
  courseId: number
  subject: Subject
}

export const useLazyMutationSubjectAdd = (options?: MutationHookOptions<SubjectAddData, SubjectAddVars>) => {
  return useMutation<SubjectAddData, SubjectAddVars>(
    SUBJECT_ADD,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
