import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const DOCUMENT_DELETE = gql`
  mutation documentDelete($documentId: ID) {
    documentDelete(documentId: $documentId)
  }
`

interface DocumentDeleteData {
  documentDelete: boolean
}

interface DocumentDeleteVars {
  documentId: number
}

export const useLazyMutationDocumentDelete = (
  options?: MutationHookOptions<DocumentDeleteData, DocumentDeleteVars>
) => {
  return useMutation<DocumentDeleteData, DocumentDeleteVars>(
    DOCUMENT_DELETE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
