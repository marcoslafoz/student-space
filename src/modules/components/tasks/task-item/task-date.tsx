import React from 'react'
import moment from 'moment-timezone'
import { formatLocalTimezoneToString } from '../../../../common/utils'

interface TaskDateProps {
  date?: string
}

export const TaskDate: React.FC<TaskDateProps> = props => {
  const { date } = props

  if (!date) return <></>

  const momentDate = moment(formatLocalTimezoneToString(date))

  // Si es hoy y ha caducado
  if (momentDate.isSame(moment(), 'day') && momentDate.isBefore(moment()))
    return <span className='text-xs text-red-400'>{momentDate.format('HH:mm:ss') == '23:59:59' ? 'hoy' : 'hoy, ' + momentDate.format('HH:mm')}</span>

  // Si es hoy
  if (momentDate.isSame(moment(), 'day'))
    return <span className='text-xs text-gray-400'>{momentDate.format('HH:mm:ss') == '23:59:59' ? 'hoy' : 'hoy, ' + momentDate.format('HH:mm')}</span>

  // Si es ayer
  if (momentDate.isSame(moment().subtract(1, 'day'), 'day'))
    return <span className='text-xs text-red-400'>{momentDate.format('HH:mm:ss') == '23:59:59' ? 'ayer' : 'ayer, ' + momentDate.format('HH:mm')}</span>

  //Anterior
  if (momentDate.isBefore(moment(), 'day'))
    return <span className='text-xs text-red-400'>{momentDate.format('HH:mm:ss') == '23:59:59' ? momentDate.format('DD/MM/YY') : momentDate.format('DD/MM/YY, HH:mm')}</span>

  //Mañana
  if (momentDate.isSame(moment().add(1, 'day'), 'day'))
    return <span className='text-xs text-gray-400'>{momentDate.format('HH:mm:ss') == '23:59:59' ? 'mañana' : 'mañana, ' + momentDate.format('HH:mm')}</span>

  //Otro
  return <span className='text-xs text-gray-400'>{momentDate.format('HH:mm:ss') == '23:59:59' ? momentDate.format('DD/MM/YY') : momentDate.format('DD/MM/YY, HH:mm')}</span>
}
