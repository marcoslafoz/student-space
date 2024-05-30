import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { DOCUMENT_LIST_FIELDS } from '../../../fragments'
import { Document } from '../../../../../types'

const GET_DOCUMENTS_BY_USER = gql`
  ${DOCUMENT_LIST_FIELDS}
  query documentGetListByUser($userId: ID!) {
    documentGetListByUser(userId: $userId) {
      ...DocumentListFields
    }
  }
`

interface DocumentGetListByUserData {
  documentGetListByUser: Document[]
}

interface DocumentGetListByUserVars {
  userId: number
}

export const useDocumentGetListByUserLazyQuery = (
  options?: LazyQueryHookOptions<DocumentGetListByUserData, DocumentGetListByUserVars>
) => {
  return useLazyQuery<DocumentGetListByUserData, DocumentGetListByUserVars>(GET_DOCUMENTS_BY_USER, {
    errorPolicy: 'all',
    ...options,
  })
}

export const useDocumentGetListByUserQuery = (
  options?: QueryHookOptions<DocumentGetListByUserData, DocumentGetListByUserVars>
) => {
  return useQuery<DocumentGetListByUserData, DocumentGetListByUserVars>(GET_DOCUMENTS_BY_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
