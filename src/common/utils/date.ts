import { TimeInputValue } from '@nextui-org/react'
import moment from 'moment-timezone'
import { Time, DateValue, parseDate } from '@internationalized/date'

export const formatStringToLocalTimezone = (date: string, time: string | undefined): string | undefined => {
  const validDate = date != undefined && moment.tz(date).isValid() ? date : undefined
  const validTime = time != undefined && moment.tz(`2004-04-16 ${time}`, moment.tz.guess()).isValid() ? time : undefined

  if (!validDate && !validTime) return undefined

  if (!validDate && validTime) {
    return moment.tz(`${moment().format('YYYY-MM-DD')} ${validTime}`, moment.tz.guess()).format()
  }

  if (validDate && !validTime) {
    return moment.tz(validDate, moment.tz.guess()).format()
  }

  return moment.tz(`${validDate} ${validTime}`, moment.tz.guess()).format()
}

// Convierte una fecha en string en UTC a una fecha en string en la zona horaria local.
export const formatLocalTimezoneToString = (date: string): string => {
  return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
}

// Convierte una cadena en formato ISO a un objeto TimeInputValue.
export const formatTime = (isoString?: string): TimeInputValue | undefined | null => {
  if (isoString == null || isoString == undefined) return
  const date = new Date(isoString)
  return new Time(date.getHours(), date.getMinutes(), date.getSeconds())
}

// Convierte una cadena en formato ISO a un objeto DateValue.
export const formatDate = (date?: string): DateValue | undefined | null => {
  if (!date) return null
  const localDateString = formatLocalTimezoneToString(date)
  return parseDate(localDateString.split(' ')[0])
}

export const eventDate = (date: Date | null): string => {
  if (date == null) return ''
  console.log('AQUI DATE', moment.tz(date, moment.tz.guess()).format())
  return moment.tz(date, moment.tz.guess()).format()
}
