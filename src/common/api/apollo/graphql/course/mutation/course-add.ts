import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Course } from '../../../../../types'

const COURSE_ADD = gql`
  mutation courseAdd($userId: ID, $course: InputCourseDto) {
    courseAdd(userId: $userId, course: $course)
  }
`

interface CourseAddData {
  courseAdd: boolean
}

interface CourseAddVars {
  userId: number
  course: Course
}

export const useLazyMutationCourseAdd = (options?: MutationHookOptions<CourseAddData, CourseAddVars>) => {
  return useMutation<CourseAddData, CourseAddVars>(
    COURSE_ADD,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
