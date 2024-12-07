import React from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react'
import { UserContext } from '../../../../common/context'
import Circle from '@uiw/react-color-circle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ModalForm } from '../../../../common/types'
import { eventDate } from '../../../../common/utils'
import { EventForm } from './event-form.vm'
import { CalendarApi, EventInput } from '@fullcalendar/core'
import { createEventId } from '../event-calendar/events-utils'
import { useLazyMutationEventAdd } from '../../../../common/api/apollo/graphql/event'
import { hexColors } from '../../../../common/constants/colors'

interface EventQuickCreateModalCreateProps extends ModalForm {
  data: EventInput
  calendarApi: CalendarApi | undefined
}

export const EventQuickCreateFormModal: React.FC<EventQuickCreateModalCreateProps> = props => {
  const { isOpen, onClose, data, calendarApi } = props

  const { userId } = React.useContext(UserContext)

  const [hexColor, setHexColor] = React.useState<string>()

  const [eventAdd] = useLazyMutationEventAdd()

  const { handleSubmit, register, reset } = useForm<EventForm>({
    defaultValues: {},
  })

  const onSuccessEventCreate: SubmitHandler<EventForm> = values => {
    if (!calendarApi) return

    eventAdd({
      variables: {
        userId: userId || 0,
        event: {
          allDay: data.allDay != undefined ? data.allDay : true,
          id: 0,
          start: eventDate(data.startStr),
          end: eventDate(data.endStr),
          title: values.title,
          description: values.description,
          color: hexColor,
        },
      },
    })
      .then(() => {
        calendarApi.unselect()
        calendarApi.addEvent({
          id: createEventId(),
          title: values.title,
          start: data.start,
          end: data.end,
          allDay: data.allDay,
          color: hexColor,
        })
      })
      .finally(() => {
        onClose()
        reset()
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        reset()
      }}
      placement='center'
      backdrop='opaque'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Añadir evento</ModalHeader>
        <form onSubmit={handleSubmit(onSuccessEventCreate)}>
          <ModalBody>
            <div className='flex flex-row gap-3'>
              <Input {...register('title', { required: true })} isRequired placeholder='Título' />
            </div>
            <Textarea {...register('description')} placeholder='Descripción' className='' size='sm' />

            <div className='grid grid-cols-2 gap-3'>
              {/* <DatePicker onChange={e => setValue('start', e ? e.toString() : '')} size='sm' label='Fecha' /> */}
            </div>
            {/* <div className='grid grid-cols-2 gap-3'>
              <Select
                label='Curso'
                size='sm'
                onChange={e => setValue('courseId', e.target.value)}
                defaultSelectedKeys={[lockCourseId?.toString() || '']}
                isDisabled={lockCourseId != undefined && true}
              >
                {courseList.map(a => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </Select>
            </div> */}
            <div className='mt-2'>
              <Circle colors={hexColors} color={hexColor} onChange={color => setHexColor(color.hex)} />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color='danger'
              className='bg-transparent border border-red-500 text-red-500'
              size='sm'
              onClick={() => {
                onClose()
                reset()
              }}
            >
              Cancelar
            </Button>
            <Button color='primary' size='sm' type='submit'>
              Crear evento
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
