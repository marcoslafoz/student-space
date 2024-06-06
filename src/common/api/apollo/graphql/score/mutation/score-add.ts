import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Score } from '../../../../../types'

const SCORE_ADD = gql`
  mutation scoreAdd($userId: ID, $score: InputScoreDto) {
    scoreAdd(userId: $userId, score: $score)
  }
`

interface ScoreAddData {
  scoreAdd: boolean
}

interface AddScoreVars {
  userId: number
  score: Score
}

export const useLazyMutationScoreAdd = (options?: MutationHookOptions<ScoreAddData, AddScoreVars>) => {
  return useMutation<ScoreAddData, AddScoreVars>(
    SCORE_ADD,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
