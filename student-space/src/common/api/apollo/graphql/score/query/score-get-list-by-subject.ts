import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { SCORE_LIST_FIELDS } from '../../../fragments'
import { Score } from '../../../../../types'

const SCORE_GET_LIST_BY_SUBJECT = gql`
  ${SCORE_LIST_FIELDS}
  query scoreGetListBySubject($subjectId: ID!) {
    scoreGetListBySubject(subjectId: $subjectId) {
      ...ScoreListFields
    }
  }
`

interface ScoreGetListBySubjectData {
  scoreGetListBySubject: Score[]
}

interface ScoreGetListBySubjectVars {
  subjectId: number
}

export const useScoreGetListBySubjectLazyQuery = (
  options?: LazyQueryHookOptions<ScoreGetListBySubjectData, ScoreGetListBySubjectVars>
) => {
  return useLazyQuery<ScoreGetListBySubjectData, ScoreGetListBySubjectVars>(SCORE_GET_LIST_BY_SUBJECT, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useScoreGetListBySubjectQuery = (
  options?: QueryHookOptions<ScoreGetListBySubjectData, ScoreGetListBySubjectVars>
) => {
  return useQuery<ScoreGetListBySubjectData, ScoreGetListBySubjectVars>(SCORE_GET_LIST_BY_SUBJECT, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
