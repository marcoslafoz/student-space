import React, { useContext } from 'react'
import { CourseProvider, UserContext } from '../../../common/context'
import { ScoreView } from '../../components/score'
import { useScoreGetListByUserLazyQuery } from '../../../common/api/apollo/graphql/score'

export const ScoresScene: React.FC = () => {
  const { userId } = useContext(UserContext)

  const [scoreGetListByUser, { data: scoreData, refetch: refetchScores }] = useScoreGetListByUserLazyQuery()

  React.useEffect(() => {
    scoreGetListByUser({ variables: { userId: userId || 0 } })
  }, [scoreGetListByUser, userId])

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  return (
    <>
      <CourseProvider userId={userId || 0}>
        <ScoreView data={scoreData?.scoreGetListByUser || []} refetchScores={refetchScores} />
      </CourseProvider>
    </>
  )
}
