import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { Task } from '../../../../../types'
import { TASKS_LIST_FIELDS } from '../../../fragments'

const TASK_GET_LIST_BY_COURSE = gql`
  ${TASKS_LIST_FIELDS}
  query taskGetListByCourse($courseId: ID!) {
    taskGetListByCourse(courseId: $courseId) {
      ...TaskListFields
    }
  }
`

interface TaskGetListByCourseData {
  taskGetListByCourse: Task[]
}

interface TaskGetListByCourseVars {
  courseId: number
}

export const useTaskGetListByCourseLazyQuery = (
  options?: LazyQueryHookOptions<TaskGetListByCourseData, TaskGetListByCourseVars>
) => {
  return useLazyQuery<TaskGetListByCourseData, TaskGetListByCourseVars>(TASK_GET_LIST_BY_COURSE, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useTaskGetListByCourseQuery = (
  options?: QueryHookOptions<TaskGetListByCourseData, TaskGetListByCourseVars>
) => {
  return useQuery<TaskGetListByCourseData, TaskGetListByCourseVars>(TASK_GET_LIST_BY_COURSE, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
