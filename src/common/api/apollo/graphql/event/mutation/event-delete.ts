import { MutationHookOptions, gql, useMutation } from '@apollo/client'

const EVENT_DELETE = gql`
  mutation eventDelete($eventId: ID) {
    eventDelete(eventId: $eventId)
  }
`

interface EventDeleteData {
  eventDelete: boolean
}

interface DeleteEventVars {
  eventId: number
}

export const useLazyMutationEventDelete = (options?: MutationHookOptions<EventDeleteData, DeleteEventVars>) => {
  return useMutation<EventDeleteData, DeleteEventVars>(
    EVENT_DELETE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
