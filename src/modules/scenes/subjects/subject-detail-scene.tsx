import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../common/context'
import { Layout } from '../../components/layout'
import { Helmet } from 'react-helmet'
import { htmlTitle } from '../../../common/utils'

import { SubjectView } from '../../components/subject'
import { useSubjectReadLazyQuery } from '../../../common/api/apollo/graphql/subject/query'

export const SubjectDetailScene: React.FC = () => {
  const { subjectId, courseId } = useParams()
  const { userId } = React.useContext(UserContext)

  const [subjectRead, { loading, error, data, refetch }] = useSubjectReadLazyQuery()

  React.useEffect(() => {
    if (userId) {
      subjectRead({ variables: { userId: userId, subjectId: Number(subjectId) } })
    }
  }, [userId, subjectRead, subjectId])

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  if (error) return <Navigate to={`/courses/detail/${Number(courseId)}`} />

  if (!data || loading || error) return <></>

  return (
    <>
      <Helmet>
        <title>{htmlTitle(data.subjectRead.name)}</title>
      </Helmet>
      <Layout>
        <SubjectView data={data.subjectRead} refetch={refetch} courseId={Number(courseId)} />
      </Layout>
    </>
  )
}
