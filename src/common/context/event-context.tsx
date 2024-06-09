import React from 'react'
import { useEventGetListByUserQuery } from '../api/apollo/graphql/event'
import { Event } from '../types'

interface EventContextType {
  loading: boolean
  eventList: Event[]
  refetchEvents: () => void
}

interface EventProviderProps {
  userId: number
  children: React.ReactNode
}

export const EventContext = React.createContext<EventContextType>({
  loading: true,
  eventList: [],
  refetchEvents: () => {},
})

export const EventProvider: React.FC<EventProviderProps> = ({ userId, children }) => {
  const { loading, data, refetch } = useEventGetListByUserQuery({
    variables: { userId },
    skip: !userId,
  })

  const eventList = data?.eventGetListByUser || []

  const refetchEvents = React.useCallback(() => {
    if (refetch) {
      refetch()
    }
  }, [refetch])

  return (
    <EventContext.Provider
      value={{
        loading,
        eventList,
        refetchEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
