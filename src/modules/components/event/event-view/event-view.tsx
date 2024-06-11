import React from 'react'
import { EventCalendar } from '../event-calendar'

export const EventView: React.FC = () => {
  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='pb-3 flex items-center gap-2 flex-wrap'>
          <span className='text-xl'>Eventos</span>
          {/* <Tooltip closeDelay={0} content='Añadir tarea'>
            <button className='rounded-full'>
              <img src={PlusIcon} className='w-5' alt='Añadir tarea' />
            </button>
          </Tooltip> */}
        </div>
        <EventCalendar />
      </div>
    </>
  )
}
