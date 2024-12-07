import React from 'react'
import { CourseProvider, UserContext } from '../../../common/context'
import { CourseList } from '../../components/course'
import { Helmet } from 'react-helmet'

export const CoursesScene: React.FC = () => {
  const { userId } = React.useContext(UserContext)

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  return (
    <>
      <Helmet title='Cursos - StudentSpace' />
      <CourseProvider userId={userId || 0}>
        <CourseList />
      </CourseProvider>
    </>
  )
}
