import { gql } from '@apollo/client'

export const TASKS_LIST_FIELDS = gql`
  fragment TaskListFields on TaskDto {
    id
    title
    description
    checked
    date
    academicCourse {
      id
      name
      color
    }
    subject {
      id
      name
      color
    }
  }
`
