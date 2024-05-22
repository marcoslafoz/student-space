import moment from 'moment-timezone'

export const formatStringToLocalTimezone = (date: string, time: string): string => {

  return moment.tz(`${date} ${time}`, moment.tz.guess()).format()

}

export const formatLocalTimezoneToString = (date: string): string => {


  return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss')


}

