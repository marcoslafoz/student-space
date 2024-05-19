import React from 'react'
import moment from 'moment'

interface TaskDateProps {
  date?: string
}


export const formatDate = (date: string): string => {
  const fecha = moment(date)
  return fecha.isSame(moment(), 'day') ? 'hoy, ' + fecha.format('HH:mm') : fecha.format('MM/DD/YY, HH:mm')
}

export const TaskDate: React.FC<TaskDateProps> = props => {

  const { date } = props

  if (!date) return <></>

  const momentDate = moment(date)

  // Si es hoy
  if (momentDate.isSame(moment(), 'day')) return <span className='text-xs text-gray-400'>{'hoy, ' + momentDate.format('HH:mm')}</span>

  // Si es ayer
  if (momentDate.isSame(moment().subtract(1, 'day'), 'day')) return <span className='text-xs text-red-400'>{'ayer, ' + momentDate.format('HH:mm')}</span>

  //Anterior
  if (momentDate.isBefore(moment(), 'day')) return <span className='text-xs text-red-400'>{momentDate.format('MM/DD/YY, HH:mm')}</span>

  //Mañana
  if (momentDate.isSame(moment().add(1, 'day'), 'day')) return <span className='text-xs text-gray-400'>{'mañana, ' + momentDate.format('HH:mm')}</span>

  //Otro
  return <span className='text-xs text-gray-400'>{momentDate.format('MM/DD/YY, HH:mm')}</span>
}