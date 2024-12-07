import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Event } from '../../../../../types'

const EVENT_CHANGE = gql`
  mutation eventChange($event: InputEventDto) {
    eventChange(event: $event)
  }
`

interface EventChangeData {
  eventChange: boolean
}

interface ChangeEventVars {
  event: Event
}

export const useLazyMutationEventChange = (options?: MutationHookOptions<EventChangeData, ChangeEventVars>) => {
  return useMutation<EventChangeData, ChangeEventVars>(
    EVENT_CHANGE,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
