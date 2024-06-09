import { EventInput } from '@fullcalendar/core'
import { Course } from './course.vm'
import { Subject } from './subject.vm'

export interface Event {
  id: number
  title: string
  allDay: boolean
  description?: string
  color?: string
  start: string
  end?: string
  course?: Course
  subject?: Subject
}

export const mapEventsToEventInputs = (events: Event[]): EventInput[] => {
  return events.map(event => ({
    id: String(event.id),
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
    backgroundColor: event.color,
    borderColor: 'transparent',
    extendedProps: {
      description: event.description,
      course: event.course,
      subject: event.subject,
    },
  }))
}
