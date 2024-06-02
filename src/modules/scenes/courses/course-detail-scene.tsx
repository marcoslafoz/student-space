import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../../common/context'
import { Layout } from '../../components/layout'
import { Helmet } from 'react-helmet'
import { htmlTitle } from '../../../common/utils'
import { CourseView } from '../../components/course'
import { useCourseReadLazyQuery } from '../../../common/api/apollo/graphql/course/query/course-read'

export const CourseDetailScene: React.FC = () => {
  const { courseId } = useParams()
  const { userId } = React.useContext(UserContext)

  const [courseRead, { loading, error, data, refetch }] = useCourseReadLazyQuery()

  React.useEffect(() => {
    if (userId) {
      courseRead({ variables: { userId: userId, courseId: Number(courseId) } })
    }
  }, [userId, courseRead, courseId])

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  if (error) return <Navigate to={'/courses'} />

  if (!data || loading || error) return <></>

  return (
    <>
      <Helmet>
        <title>{htmlTitle(data.courseRead.name)}</title>
      </Helmet>
      <Layout>
        <CourseView data={data.courseRead} refetch={refetch} />
      </Layout>
    </>
  )
}
