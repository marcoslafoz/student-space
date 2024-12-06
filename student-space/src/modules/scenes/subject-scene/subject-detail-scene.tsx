import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { CourseProvider, UserContext } from '../../../common/context'
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
      <Helmet title={htmlTitle(data.subjectRead.name)} />
      <CourseProvider userId={userId || 0}>
        <SubjectView data={data.subjectRead} refetchSubject={refetch} courseId={Number(courseId)} />
      </CourseProvider>
    </>
  )
}
