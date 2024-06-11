/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { EventClickArg } from '@fullcalendar/core'
import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react'
import { useLazyMutationEventDelete, useLazyMutationEventEdit } from '../../../../common/api/apollo/graphql/event'
import { formatEventDate } from '../event-calendar/utils'
import { EditIcon } from '@nextui-org/shared-icons'

interface EventCalendarPreviewProps {
  eventClick: EventClickArg | undefined
  isOpen: boolean
  onClose: () => void
}

export const EventCalendarPreview: React.FC<EventCalendarPreviewProps> = props => {
  const { isOpen, onClose, eventClick } = props
  const [enableEdit, setEnableEdit] = useState<boolean>(false)
  const [eventDelete] = useLazyMutationEventDelete()
  const [eventEdit] = useLazyMutationEventEdit()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    if (eventClick && eventClick.event && eventClick.event.extendedProps) {
      setTitle(eventClick.event.title)
      setDescription(eventClick.event.extendedProps.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
  }, [eventClick])

  const handleEventDelete = () => {
    if (!eventClick) return
    eventDelete({
      variables: {
        eventId: Number(eventClick.event.id),
      },
    }).finally(() => {
      eventClick.event.remove()
      onClose()
    })
  }

  const handleEventRename = () => {
    if (!eventClick) return
    eventEdit({
      variables: {
        event: {
          id: Number(eventClick.event.id),
          title: title,
          description: description,
          allDay: false,
          start:''
        }
      },
    }).finally(() => {
      eventClick.event.setProp('title', title)
      eventClick.event.setExtendedProp('description', description)
      onClose()
      setEnableEdit(false)
    })
  }

  if (!eventClick || !eventClick.event || !eventClick.event.extendedProps) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        setEnableEdit(false)
      }}
      placement='center'
      backdrop='opaque'
    >
      <ModalContent>
        <ModalHeader className='inline-flex gap-3 items-center'>
          {enableEdit ? <Input value={title} onChange={e => setTitle(e.target.value)} /> : title}
          <span
            className='text-lg text-default-400 cursor-pointer active:opacity-50 hover:opacity-50'
            onClick={() => setEnableEdit(!enableEdit)}
          >
            <EditIcon />
          </span>
        </ModalHeader>

        <ModalBody>
          <div className='grid grid-cols-1 gap-2'>
            <span>{formatEventDate(eventClick.event)}</span>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Descripción' />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color='danger' size='sm' onClick={handleEventDelete}>
            Eliminar
          </Button>
          <Button color='primary' size='sm' onClick={handleEventRename}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
