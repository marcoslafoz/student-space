import { gql } from '@apollo/client'

export const EVENT_LIST_FIELDS = gql`
  fragment EventListFields on EventDto {
    id
    title
    description
    color
    allDay
    start
    end
    course {
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
