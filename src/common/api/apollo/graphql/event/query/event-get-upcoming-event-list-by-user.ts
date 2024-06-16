import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { Event } from '../../../../../types'
import { EVENT_LIST_FIELDS } from '../../../fragments'

const EVENT_GET_LIST_BY_USER = gql`
  ${EVENT_LIST_FIELDS}
  query eventGetUpcomingEventListByUser($userId: ID!, $total: Int!) {
    eventGetUpcomingEventListByUser(userId: $userId, total: $total) {
      ...EventListFields
    }
  }
`

interface EventGetListByUserData {
  eventGetUpcomingEventListByUser: Event[]
}

interface EventGetListByUserVars {
  userId: number
  total: number
}

export const useEventGetUpcomingEventListByUserLazyQuery = (
  options?: LazyQueryHookOptions<EventGetListByUserData, EventGetListByUserVars>
) => {
  return useLazyQuery<EventGetListByUserData, EventGetListByUserVars>(EVENT_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useEventGetUpcomingEventListByUserQuery = (
  options?: QueryHookOptions<EventGetListByUserData, EventGetListByUserVars>
) => {
  return useQuery<EventGetListByUserData, EventGetListByUserVars>(EVENT_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
