import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Event } from '../../../../../types'

const EVENT_ADD = gql`
  mutation eventAdd($userId: ID, $event: InputEventDto) {
    eventAdd(userId: $userId, event: $event)
  }
`

interface EventAddData {
  eventAdd: boolean
}

interface AddEventVars {
  userId: number
  event: Event
}

export const useLazyMutationEventAdd = (options?: MutationHookOptions<EventAddData, AddEventVars>) => {
  return useMutation<EventAddData, AddEventVars>(
    EVENT_ADD,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
