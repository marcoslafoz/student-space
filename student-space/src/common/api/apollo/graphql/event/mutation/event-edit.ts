import { MutationHookOptions, gql, useMutation } from '@apollo/client'
import { Event } from '../../../../../types'

const EVENT_EDIT = gql`
  mutation eventEdit($event: InputEventDto) {
    eventEdit(event: $event)
  }
`

interface EventEditData {
  eventEdit: boolean
}

interface EditEventVars {
  event: Event
}

export const useLazyMutationEventEdit = (options?: MutationHookOptions<EventEditData, EditEventVars>) => {
  return useMutation<EventEditData, EditEventVars>(
    EVENT_EDIT,
    options ?? {
      errorPolicy: 'ignore',
    }
  )
}
