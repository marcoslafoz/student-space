import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Course } from '../../../../../types'

const COURSE_EDIT = gql`
  mutation courseEdit($course: InputCourseDto) {
    courseEdit(course: $course)
  }
`

interface CourseEditData {
  courseEdit: boolean
}

interface CourseEditVars {
  course: Course
}

export const useLazyMutationCourseEdit = (options?: MutationHookOptions<CourseEditData, CourseEditVars>) => {
  return useMutation<CourseEditData, CourseEditVars>(
    COURSE_EDIT,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
