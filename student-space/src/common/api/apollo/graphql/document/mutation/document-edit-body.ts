import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const EDIT_DOCUMENT_BODY = gql`
  mutation documentEditBody($documentId: ID, $body: String) {
    documentEditBody(documentId: $documentId, body: $body)
  }
`

interface DocumentEditBodyData {
  documentEditBody: boolean
}

interface DocumentEditBodyVars {
  documentId: number
  body: string
}

export const useLazyMutationDocumentEditBody = (
  options?: MutationHookOptions<DocumentEditBodyData, DocumentEditBodyVars>
) => {
  return useMutation<DocumentEditBodyData, DocumentEditBodyVars>(
    EDIT_DOCUMENT_BODY,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
