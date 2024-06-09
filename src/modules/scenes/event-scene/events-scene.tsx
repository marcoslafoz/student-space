import React from 'react'
import { EventView } from '../../components/event'
import { EventProvider, UserContext } from '../../../common/context'
import { Helmet } from 'react-helmet'

export const EventsScene: React.FC = () => {
  const { userId } = React.useContext(UserContext)

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  if (!userId) return <></>

  return (
    <>
      <Helmet title='Eventos - StudentSpace'/>
      <EventProvider userId={userId}>
        <EventView />
      </EventProvider>
    </>
  )
}
