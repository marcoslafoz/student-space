import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const DOCUMENT_RENAME = gql`
  mutation documentRename($documentId: ID, $title: String) {
    documentRename(documentId: $documentId, title: $title)
  }
`

interface DocumentRenameData {
  documentRename: boolean
}

interface DocumentRenameVars {
  documentId: number
  title: string
}

export const useLazyMutationDocumentRename = (
  options?: MutationHookOptions<DocumentRenameData, DocumentRenameVars>
) => {
  return useMutation<DocumentRenameData, DocumentRenameVars>(
    DOCUMENT_RENAME,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
