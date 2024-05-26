import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const EDIT_DOCUMENT_BODY = gql`
  mutation editDocumentBody($documentId: ID, $body: String) {
    editDocumentBody(documentId: $documentId, body: $body)
  }
`

interface EditDocumentBodyData {
  editDocumentBody: boolean
}

interface EditDocumentBodyVars {
  documentId: number
  body: string
}

export const useLazyMutationEditDocumentBody = (
  options?: MutationHookOptions<EditDocumentBodyData, EditDocumentBodyVars>
) => {
  return useMutation<EditDocumentBodyData, EditDocumentBodyVars>(
    EDIT_DOCUMENT_BODY,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
