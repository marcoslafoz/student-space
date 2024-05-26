import { TimeInputValue } from '@nextui-org/react'
import moment from 'moment-timezone'
import { Time, DateValue, parseDate } from '@internationalized/date'

export const formatStringToLocalTimezone = (date: string, time: string): string => {  
  if (time == undefined) return moment.tz(`${date} 23:59:59`, moment.tz.guess()).format()
  return moment.tz(`${date} ${time}`, moment.tz.guess()).format()
}

export const formatLocalTimezoneToString = (date: string): string => {
  return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
}

export const formatTime = (isoString?: string): TimeInputValue | undefined | null => {
  if (isoString == null || isoString == undefined) return
  const date = new Date(isoString)
  return new Time(date.getHours(), date.getMinutes(), date.getSeconds())
}

export const formatDate = (date?: string): DateValue | undefined | null => {
  if (date == null || date == undefined) return
  return parseDate(moment(formatLocalTimezoneToString(date)).format('YYYY-MM-DD'))
}
