import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { SCORE_LIST_FIELDS } from '../../../fragments'
import { Score } from '../../../../../types'

const SCORE_GET_LIST_BY_USER = gql`
  ${SCORE_LIST_FIELDS}
  query scoreGetListByUser($userId: ID!) {
    scoreGetListByUser(userId: $userId) {
      ...ScoreListFields
    }
  }
`

interface ScoreGetListByUserData {
  scoreGetListByUser: Score[]
}

interface ScoreGetListByUserVars {
  userId: number
}

export const useScoreGetListByUserLazyQuery = (
  options?: LazyQueryHookOptions<ScoreGetListByUserData, ScoreGetListByUserVars>
) => {
  return useLazyQuery<ScoreGetListByUserData, ScoreGetListByUserVars>(SCORE_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useScoreGetListByUserQuery = (
  options?: QueryHookOptions<ScoreGetListByUserData, ScoreGetListByUserVars>
) => {
  return useQuery<ScoreGetListByUserData, ScoreGetListByUserVars>(SCORE_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
