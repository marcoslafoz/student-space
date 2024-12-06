import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { DOCUMENT_READ_FIELDS } from '../../../fragments'
import { Document } from '../../../../../types'

const DOCUMENT_READ = gql`
  ${DOCUMENT_READ_FIELDS}
  query documentRead($documentId: ID!, $userId: ID!) {
    documentRead(documentId: $documentId, userId: $userId) {
      ...DocumentReadFields
    }
  }
`

interface DocumentReadData {
  documentRead: Document
}

interface DocumentReadVars {
  documentId: number
  userId: number
}

export const useDocumentReadLazyQuery = (options?: LazyQueryHookOptions<DocumentReadData, DocumentReadVars>) => {
  return useLazyQuery<DocumentReadData, DocumentReadVars>(DOCUMENT_READ, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useDocumentReadQuery = (options?: QueryHookOptions<DocumentReadData, DocumentReadVars>) => {
  return useQuery<DocumentReadData, DocumentReadVars>(DOCUMENT_READ, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
