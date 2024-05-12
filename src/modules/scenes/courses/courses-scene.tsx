import React, { useContext } from 'react'
import { CourseInfo } from './course-info'
import { useGetAcademicCourseListQuery } from '../../../common/api/graphql/query'
import { UserContext } from '../../../common/context'

export const CoursesScene: React.FC = () => {
  
  const { userID } = useContext(UserContext)

  const { data, loading, error } = useGetAcademicCourseListQuery({ variables: { userId: userID || 0 } })

  if (!data || loading || error) return <></>

  return <CourseInfo data={data.getAcademicCourseListByUserId || []}/>
}