import React from 'react'
import { DateSelectArg, EventClickArg, EventContentArg, CalendarApi, EventChangeArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ArrowLeftIcon } from '@nextui-org/shared-icons'
import './event-calendar.style.scss'

import esLocale from '@fullcalendar/core/locales/es'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tab, Tabs } from '@nextui-org/react'
import { VerticalDotsIcon } from '../../base/nextui-icons'
import { EventContext } from '../../../../common/context'
import { mapEventsToEventInputs } from '../../../../common/types'
import { EventQuickCreateFormModal } from '../event-form'
import { useLazyMutationEventChange } from '../../../../common/api/apollo/graphql/event'
import { eventDate } from '../../../../common/utils'
import { EventCalendarPreview } from '../event-form/event-preview-form.modal'

export const EventCalendar: React.FC = () => {
  const { eventList, loading, refetchEvents } = React.useContext(EventContext)

  const [weekendsVisible, setWeekendsVisible] = React.useState(true)
  const [selectedView, setSelectedView] = React.useState<React.Key>(
    () => localStorage.getItem('calendarView') || 'dayGridMonth'
  )
  const [showQuickCreateModal, setShowQuickCreateModal] = React.useState<boolean>(false)
  const [showPreviewModal, setShowPreviewModal] = React.useState<boolean>(false)

  const calendarRef = React.useRef<FullCalendar>(null)
  const [title, setTitle] = React.useState<string | undefined>(undefined)

  const [selectedInfo, setSelectedInfo] = React.useState<DateSelectArg>()
  const [selectedPreview, setSelectedPreviw] = React.useState<EventClickArg>()
  const [selectedApi, setSelectedApi] = React.useState<CalendarApi>()

  React.useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      calendarApi.changeView(selectedView as string)
      setTitle(calendarApi.view.title)
    }
  }, [selectedView])

  React.useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      calendarApi.changeView(selectedView as string)
      setTitle(calendarApi.view.title)
    }
    localStorage.setItem('calendarView', selectedView as string)
  }, [selectedView])

  const mappedEvents = React.useMemo(() => mapEventsToEventInputs(eventList), [eventList])

  const [eventChange] = useLazyMutationEventChange()

  const handleEventCreate = (selectInfo: DateSelectArg) => {
    setSelectedApi(selectInfo.view.calendar)
    setSelectedInfo(selectInfo)
    setShowQuickCreateModal(true)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo && setSelectedPreviw(clickInfo)
    setShowPreviewModal(true)
  }

  const handleEventChange = (selectInfo: EventChangeArg) => {
    eventChange({
      variables: {
        event: {
          allDay: selectInfo.event.allDay,
          id: Number(selectInfo.event.id),
          start: eventDate(selectInfo.event.start),
          end: eventDate(selectInfo.event.end),
          title: '',
        },
      },
    })
  }

  selectedApi?.getEventById('1')?.title

  if (loading) return <></>

  return (
    <>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row flex-wrap justify-between items-center gap-3 '>
          <div className='inline-flex gap-3 items-center'>
            <div className='inline-flex items-center gap-3 justify-between bg-default-100 h-9 rounded-md text-default-500 px-3 text-small '>
              <button
                className='hover:text-default-400'
                onClick={() => {
                  const calendarApi = calendarRef.current?.getApi()
                  calendarApi?.prev()
                  setTitle(calendarApi?.view.title)
                }}
              >
                <ArrowLeftIcon />
              </button>
              <button
                className='hover:text-default-400'
                onClick={() => {
                  const calendarApi = calendarRef.current?.getApi()
                  calendarApi?.today()
                  setTitle(calendarApi?.view.title)
                }}
              >
                Hoy
              </button>
              <button
                className='rotate-180 hover:text-default-400'
                onClick={() => {
                  const calendarApi = calendarRef.current?.getApi()
                  calendarApi?.next()
                  setTitle(calendarApi?.view.title)
                }}
              >
                <ArrowLeftIcon />
              </button>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                  <VerticalDotsIcon className='text-default-300' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant='faded' aria-label='Dropdown menu with description'>
                <DropdownItem
                  description={<span> {weekendsVisible ? 'Ocultar ' : 'Mostrar '} las columnas de fin de semana</span>}
                  onPress={() => setWeekendsVisible(!weekendsVisible)}
                >
                  {weekendsVisible ? 'Ocultar fin de semana' : 'Mostrar fin de semana'}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className='uppercase'>{title}</div>

          <div className='inline-flex gap-3'>
            <Tabs
              aria-label='Options'
              defaultSelectedKey={selectedView as string}
              onSelectionChange={k => setSelectedView(k)}
            >
              <Tab key='dayGridMonth' title='Mes' />
              <Tab key='timeGridWeek' title='Semana' />
              <Tab key='timeGridDay' title='Día' />
            </Tabs>
          </div>
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={false}
          locale={esLocale}
          initialView={selectedView as string}
          editable={true}
          eventTimeFormat={{ timeStyle: 'short' }}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={mappedEvents}
          select={handleEventCreate}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
          datesSet={arg => setTitle(arg.view.title)}
        />
      </div>

      <EventQuickCreateFormModal
        calendarApi={selectedApi}
        data={selectedInfo || []}
        isOpen={showQuickCreateModal}
        onRefetch={refetchEvents}
        onClose={() => setShowQuickCreateModal(false)}
      />

      <EventCalendarPreview
        eventClick={selectedPreview}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />
    </>
  )
}

const renderEventContent = (eventContent: EventContentArg) => (
  <>
    <span className='flex gap-1'>
      <p className='font-bold'>{eventContent.timeText}</p>
      <p className='truncate ...'>{eventContent.event.title}</p>
    </span>
  </>
)
