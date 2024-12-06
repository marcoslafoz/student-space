import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const SCORE_DELETE = gql`
  mutation scoreDelete($scoreId: ID) {
    scoreDelete(scoreId: $scoreId)
  }
`

interface ScoreDeleteData {
  scoreDelete: boolean
}

interface ScoreDeleteVars {
  scoreId: number
}

export const useLazyMutationScoreDelete = (options?: MutationHookOptions<ScoreDeleteData, ScoreDeleteVars>) => {
  return useMutation<ScoreDeleteData, ScoreDeleteVars>(
    SCORE_DELETE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
