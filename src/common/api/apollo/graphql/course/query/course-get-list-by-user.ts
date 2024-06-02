import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { Course } from '../../../../../types'
import { COURSE_LIST_FIELDS } from '../../../fragments'

const COURSE_GET_LIST_BY_USER = gql`
  ${COURSE_LIST_FIELDS}
  query courseGetListByUser($userId: ID!) {
    courseGetListByUser(userId: $userId) {
      ...CourseListFields
    }
  }
`

interface CourseGetListByUserData {
  courseGetListByUser: Course[]
}

interface CourseGetListByUserVars {
  userId: number
}

export const useCourseGetListByUserLazyQuery = (
  options?: LazyQueryHookOptions<CourseGetListByUserData, CourseGetListByUserVars>
) => {
  return useLazyQuery<CourseGetListByUserData, CourseGetListByUserVars>(COURSE_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useCourseGetListByUserQuery = (
  options?: QueryHookOptions<CourseGetListByUserData, CourseGetListByUserVars>
) => {
  return useQuery<CourseGetListByUserData, CourseGetListByUserVars>(COURSE_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
