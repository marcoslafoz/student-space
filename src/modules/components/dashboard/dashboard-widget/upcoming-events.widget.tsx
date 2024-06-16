import React, { useContext } from 'react'
import { useEventGetUpcomingEventListByUserQuery } from '../../../../common/api/apollo/graphql/event'
import { UserContext } from '../../../../common/context'
import { Event } from '../../../../common/types'
import { formatEventDate } from '../../event/event-calendar/utils'

export const UpcomingEventsWidget: React.FC = () => {
  const { userId } = useContext(UserContext)

  const { data, loading, error } = useEventGetUpcomingEventListByUserQuery({
    variables: { userId: userId || 0, total: 5 },
  })

  if (!data || loading || error || data.eventGetUpcomingEventListByUser.length < 1) {
    return <div className='text-sm text-center text-gray-400 mt-24'>No tienes eventos próximos</div>
  }

  return (
    <>
      <div className='flex flex-col gap-1.5'>
        {data?.eventGetUpcomingEventListByUser.map(e => <EventCard data={e} key={e.id} />)}
        <div className='py-6'></div>
      </div>
    </>
  )
}

interface EventCardProps {
  data: Event
}

export const EventCard: React.FC<EventCardProps> = props => {
  const { data } = props

  const endDate: Date | null = data.end ? new Date(data.end) : null

  return (
    <>
      <div className='border rounded-lg  inline-flex justify-between px-3 py-2 items-center'>
        <div className='inline-flex items-center gap-3'>
          <div className='w-4 h-2 rounded-full' style={{ backgroundColor: data.color || '#3788d8' }}></div>
          {data.title}
        </div>
        <div className='text-xs'>{formatEventDate(new Date(data.start), endDate, data.allDay)}</div>
      </div>
    </>
  )
}
