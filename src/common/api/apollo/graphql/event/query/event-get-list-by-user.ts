import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { Event } from '../../../../../types'
import { EVENT_LIST_FIELDS } from '../../../fragments'

const EVENT_GET_LIST_BY_USER = gql`
  ${EVENT_LIST_FIELDS}
  query eventGetListByUser($userId: ID!) {
    eventGetListByUser(userId: $userId) {
      ...EventListFields
    }
  }
`

interface EventGetListByUserData {
  eventGetListByUser: Event[]
}

interface EventGetListByUserVars {
  userId: number
}

export const useEventGetListByUserLazyQuery = (
  options?: LazyQueryHookOptions<EventGetListByUserData, EventGetListByUserVars>
) => {
  return useLazyQuery<EventGetListByUserData, EventGetListByUserVars>(EVENT_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useEventGetListByUserQuery = (
  options?: QueryHookOptions<EventGetListByUserData, EventGetListByUserVars>
) => {
  return useQuery<EventGetListByUserData, EventGetListByUserVars>(EVENT_GET_LIST_BY_USER, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}
