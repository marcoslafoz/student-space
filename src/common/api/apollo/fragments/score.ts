import { gql } from '@apollo/client'

export const SCORE_LIST_FIELDS = gql`
  fragment ScoreListFields on ScoreDto {
    id
    name
    score
    date
  }
`
