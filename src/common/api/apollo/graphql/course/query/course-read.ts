import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { COURSE_READ_FIELDS } from '../../../fragments'
import { Course } from '../../../../../types'

const COURSE_READ = gql`
  ${COURSE_READ_FIELDS}
  query courseRead($courseId: ID!, $userId: ID!) {
    courseRead(courseId: $courseId, userId: $userId) {
      ...CourseReadFields
    }
  }
`

interface CourseReadData {
  courseRead: Course
}

interface CourseReadVars {
  courseId: number
  userId: number
}

export const useCourseReadLazyQuery = (options?: LazyQueryHookOptions<CourseReadData, CourseReadVars>) => {
  return useLazyQuery<CourseReadData, CourseReadVars>(COURSE_READ, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useCourseReadQuery = (options?: QueryHookOptions<CourseReadData, CourseReadVars>) => {
  return useQuery<CourseReadData, CourseReadVars>(COURSE_READ, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
