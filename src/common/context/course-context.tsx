import React from 'react'
import { useCourseGetListByUserQuery } from '../api/apollo/graphql/course'
import { Course } from '../types'

interface CourseContextType {
  loading: boolean
  courseList: Course[]
  refetchCourses: () => void
}

interface CourseProviderProps {
  userId: number
  children: React.ReactNode
}

export const CourseContext = React.createContext<CourseContextType>({
  loading: true,
  courseList: [],
  refetchCourses: () => {},
})

export const CourseProvider: React.FC<CourseProviderProps> = ({ userId, children }) => {
  const { loading, data, refetch } = useCourseGetListByUserQuery({
    variables: { userId },
    skip: !userId,
  })

  const courseList = data?.courseGetListByUser || []

  const refetchCourses = React.useCallback(() => {
    if (refetch) {
      refetch()
    }
  }, [refetch])

  return (
    <CourseContext.Provider
      value={{
        loading,
        courseList,
        refetchCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
