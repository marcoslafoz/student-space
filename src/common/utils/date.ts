import moment from 'moment'

export const formatDate = (date: string): string => {
  const fecha = moment(date)
  return fecha.isSame(moment(), 'day') ? 'hoy, ' + fecha.format('HH:mm') : fecha.format('MM/DD/YY, HH:mm')
}