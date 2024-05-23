import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const REMOVE_TASK_ACADEMIC_COURSE = gql`
  mutation RemoveTaskAcademicCourse($taskId: ID, $academicCourseId: ID) {
    removeTaskAcademicCourse(taskId: $taskId, academicCourseId: $academicCourseId)
  }
`

interface RemoveTaskAcademicCourseData {
  removeTask: boolean
}

interface RemoveTaskAcademicCourseVars {
  taskId: number
  academicCourseId: number
}

export const useLazyMutationRemoveTaskAcademicCourse = (
  options?: MutationHookOptions<RemoveTaskAcademicCourseData, RemoveTaskAcademicCourseVars>
) => {
  return useMutation<RemoveTaskAcademicCourseData, RemoveTaskAcademicCourseVars>(
    REMOVE_TASK_ACADEMIC_COURSE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
