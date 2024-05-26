import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { DOCUMENT_LIST_FIELDS } from '../fragments'
import { Document } from '../../../types'

const GET_DOCUMENTS_BY_USER = gql`
  ${DOCUMENT_LIST_FIELDS}
  query getDocumentListByUserId($userId: ID!) {
    getDocumentListByUserId(userId: $userId) {
      ...DocumentListFields
    }
  }
`

interface GetDocumentsByUserData {
  getDocumentListByUserId: Document[]
}

interface GetDocumentsByUserVars {
  userId: number
}

export const useGetDocumentsByUserLazyQuery = (
  options?: LazyQueryHookOptions<GetDocumentsByUserData, GetDocumentsByUserVars>
) => {
  return useLazyQuery<GetDocumentsByUserData, GetDocumentsByUserVars>(GET_DOCUMENTS_BY_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
export const useGetDocumentsByUserQuery = (
  options?: QueryHookOptions<GetDocumentsByUserData, GetDocumentsByUserVars>
) => {
  return useQuery<GetDocumentsByUserData, GetDocumentsByUserVars>(GET_DOCUMENTS_BY_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
