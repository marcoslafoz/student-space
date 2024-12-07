import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const COURSE_DELETE = gql`
  mutation courseDelete($courseId: ID) {
    courseDelete(courseId: $courseId)
  }
`

interface CourseDeleteData {
  courseDelete: boolean
}

interface CourseDeleteVars {
  courseId: number
}

export const useLazyMutationCourseDelete = (options?: MutationHookOptions<CourseDeleteData, CourseDeleteVars>) => {
  return useMutation<CourseDeleteData, CourseDeleteVars>(
    COURSE_DELETE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
