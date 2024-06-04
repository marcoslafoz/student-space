import { ScoreStatusEnum } from '../types'

export const scoreStatusCodeToString = (code: number): string => {
  switch (code) {
    case ScoreStatusEnum.PASSED:
      return 'Aprobado'
    case ScoreStatusEnum.FAILED:
      return 'Suspenso'

    default:
      return ''
  }
}
