import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { ACADEMIC_COURSE_FIELDS } from '../fragments'
import { AcademicCourse } from '../../../types'

const GET_ACADEMIC_COURSE_LIST = gql`
  ${ACADEMIC_COURSE_FIELDS}
  query getAcademicCourseListByUserId($userId: ID!) {
    getAcademicCourseListByUserId(userId: $userId) {
      ...AcademicCourseFields
    }
  }
`

interface GetAcademicCourseListData {
  getAcademicCourseListByUserId: AcademicCourse[]
}

interface GetAcademicCourseListVars {
  userId: number
}

export const useGetAcademicCourseListLazyQuery = (options?: LazyQueryHookOptions<GetAcademicCourseListData, GetAcademicCourseListVars>) => {
  return useLazyQuery<GetAcademicCourseListData, GetAcademicCourseListVars>(GET_ACADEMIC_COURSE_LIST, {
    errorPolicy: 'all',
    ...options,
  })
}
export const useGetAcademicCourseListQuery = (options?: QueryHookOptions<GetAcademicCourseListData, GetAcademicCourseListVars>) => {
  return useQuery<GetAcademicCourseListData, GetAcademicCourseListVars>(GET_ACADEMIC_COURSE_LIST, {
    errorPolicy: 'all',
    ...options,
  })
}
