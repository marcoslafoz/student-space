import React from 'react'
import { EventView } from '../../components/event'
import { EventProvider, UserContext } from '../../../common/context'

export const EventsScene: React.FC = () => {
  const { userId } = React.useContext(UserContext)

  if (!userId) return <></>

  return (
    <EventProvider userId={userId}>
      <EventView />
    </EventProvider>
  )
}
