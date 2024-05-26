import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { DOCUMENT_FIELDS } from '../fragments'
import { Document } from '../../../types'

const GET_DOCUMENT = gql`
  ${DOCUMENT_FIELDS}
  query getDocument($documentId: ID!, $userId: ID!) {
    getDocument(documentId: $documentId, userId: $userId) {
      ...DocumentFields
    }
  }
`

interface GetDocumentData {
  getDocument: Document
}

interface GetDocumentVars {
  documentId: number
  userId: number
}

export const useGetDocumentLazyQuery = (options?: LazyQueryHookOptions<GetDocumentData, GetDocumentVars>) => {
  return useLazyQuery<GetDocumentData, GetDocumentVars>(GET_DOCUMENT, {
    errorPolicy: 'all',
    ...options,
  })
}
export const useGetDocumentQuery = (options?: QueryHookOptions<GetDocumentData, GetDocumentVars>) => {
  return useQuery<GetDocumentData, GetDocumentVars>(GET_DOCUMENT, {
    errorPolicy: 'all',
    ...options,
  })
}
