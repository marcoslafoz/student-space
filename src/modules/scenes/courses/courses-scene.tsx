import React from 'react'
import { Layout } from '../../components/layout'
import { CourseProvider, UserContext } from '../../../common/context'
import { CourseList } from '../../components/course'

export const CoursesScene: React.FC = () => {
  const { userId } = React.useContext(UserContext)

  return (
    <>
      <CourseProvider userId={userId || 0}>
        <Layout>
          <CourseList />
        </Layout>
      </CourseProvider>
    </>
  )
}
