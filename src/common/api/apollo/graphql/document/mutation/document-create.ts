import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const DOCUMENT_CREATE = gql`
  mutation documentCreate($userId: ID, $title: String, $courseId: ID, $subjectId: ID) {
    documentCreate(userId: $userId, title: $title, courseId: $courseId, subjectId: $subjectId)
  }
`

interface DocumentCreateData {
  documentCreate: boolean
}

interface DocumentCreateVars {
  userId: number
  title: string
  courseId: number
  subjectId: number
}

export const useLazyMutationDocumentCreate = (
  options?: MutationHookOptions<DocumentCreateData, DocumentCreateVars>
) => {
  return useMutation<DocumentCreateData, DocumentCreateVars>(
    DOCUMENT_CREATE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
