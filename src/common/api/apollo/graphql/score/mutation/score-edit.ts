import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Score } from '../../../../../types'

const SCORE_EDIT = gql`
  mutation scoreEdit($score: InputScoreDto) {
    scoreEdit(score: $score)
  }
`

interface ScoreEditData {
  scoreEdit: boolean
}

interface EditScoreVars {
  score: Score
}

export const useLazyMutationScoreEdit = (options?: MutationHookOptions<ScoreEditData, EditScoreVars>) => {
  return useMutation<ScoreEditData, EditScoreVars>(
    SCORE_EDIT,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
