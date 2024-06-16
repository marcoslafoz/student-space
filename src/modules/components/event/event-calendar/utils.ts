import moment from 'moment-timezone'

export function formatEventDate(start: Date | null, end: Date | null, allDay: boolean) {
  if (!start || !end) {
    return ''
  }

  const startDate = moment(start, moment.tz.guess())
  const endDate = moment(end, moment.tz.guess())
  const endDateAllDay = moment(end, moment.tz.guess())

  if (allDay) {
    const startDateString = startDate.format('D')
    const endDateString = endDate.format('D')
    const startMonth = startDate.format('MMMM')
    const startYear = startDate.format('YYYY')

    const fix = endDateAllDay.subtract(1, 'days').format('D')

    if (endDate.diff(startDate, 'days') > 1) {
      return `${startDateString} a ${fix} de ${startMonth} de ${startYear}`
    } else if (endDate.diff(startDate, 'days') === 1) {
      return `${startDateString} de ${startMonth} de ${startYear}`
    } else {
      return `${endDateString} de ${startMonth} de ${startYear}`
    }
  } else {
    const startDay = startDate.format('D')
    const endDay = endDate.format('D')
    const startMonth = startDate.format('MMMM')
    const startYear = startDate.format('YYYY')
    const startHour = startDate.format('HH')
    const startMinute = startDate.format('mm')
    const endHour = endDate.format('HH')
    const endMinute = endDate.format('mm')

    if (startDay === endDay) {
      return `${startDay} de ${startMonth} de ${startYear}, ${startHour}:${startMinute} a ${endHour}:${endMinute}`
    } else {
      const endMonth = endDate.format('MMMM')
      const endYear = endDate.format('YYYY')
      return `${startDay} de ${startMonth} de ${startYear}, ${startHour}:${startMinute} a ${endDay} de ${endMonth} de ${endYear}, ${endHour}:${endMinute}`
    }
  }
}
