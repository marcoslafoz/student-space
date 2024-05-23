import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { SUBJECT_FIELDS } from '../fragments'
import { Subject } from '../../../types'

const GET_SUBJECT_LIST_BY_USER = gql`
  ${SUBJECT_FIELDS}
  query getSubjectListByUserId($userId: ID!) {
    getSubjectListByUserId(userId: $userId) {
      ...SubjectFields
    }
  }
`

interface GetSubjectListByUserData {
  getSubjectListByUserId: Subject[]
}

interface GetSubjectListByUserVars {
  userId: number
}

export const useGetSubjectListByUserLazyQuery = (
  options?: LazyQueryHookOptions<GetSubjectListByUserData, GetSubjectListByUserVars>
) => {
  return useLazyQuery<GetSubjectListByUserData, GetSubjectListByUserVars>(GET_SUBJECT_LIST_BY_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
export const useGetSubjectListByUserQuery = (
  options?: QueryHookOptions<GetSubjectListByUserData, GetSubjectListByUserVars>
) => {
  return useQuery<GetSubjectListByUserData, GetSubjectListByUserVars>(GET_SUBJECT_LIST_BY_USER, {
    errorPolicy: 'all',
    ...options,
  })
}
