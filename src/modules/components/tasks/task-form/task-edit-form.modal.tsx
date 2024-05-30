import React from 'react'
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  TimeInput,
} from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Task } from '../../../../common/types'
import {
  formatDate,
  formatLocalTimezoneToString,
  formatStringToLocalTimezone,
  formatTime,
} from '../../../../common/utils'
import moment from 'moment'
import { TaskForm } from './task-form.vm'
import { useLazyMutationTaskDelete, useLazyMutationTaskEdit } from '../../../../common/api/apollo/graphql/task'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  data?: Task
}

export const TaskEditFormModal: React.FC<TaskModalProps> = props => {
  const { isOpen, onClose, refetch, data } = props

  const [editTaskMutation] = useLazyMutationTaskEdit()
  const [removeTaskMutation] = useLazyMutationTaskDelete()

  const { handleSubmit, register, setValue, reset } = useForm<TaskForm>({
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
    },
  })

  const handleRemoveTask = React.useCallback(() => {
    removeTaskMutation({
      variables: { taskId: data?.id || 0 },
    }).then(() => refetch())
      .finally(() => {
        onClose()
        reset()
      })
  }, [data?.id, onClose, refetch, removeTaskMutation, reset])

  const onSuccessEditTask: SubmitHandler<TaskForm> = values => {
    editTaskMutation({
      variables: {
        task: {
          id: data?.id || 0,
          title: values.title,
          date: formatStringToLocalTimezone(values.date, values.time),
          description: values.description,
          checked: false,
        },
      },
    })
      .then(() => refetch())
      .finally(() => {
        onClose()
        reset()
      })
  }

  data && data.date && setValue('time', moment(formatLocalTimezoneToString(data.date)).format('HH:mm:ss'))
  data && data.date && setValue('date', moment(formatLocalTimezoneToString(data.date)).format('YYYY-MM-DD'))

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        reset()
      }}
      placement='top-center'
      backdrop='opaque'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Editar tarea</ModalHeader>
        <form onSubmit={handleSubmit(onSuccessEditTask)}>
          <ModalBody>
            <Input {...register('title', { required: true })} isRequired placeholder='Nombre de la tarea' size='sm' />

            <div className='grid grid-cols-2 gap-3'>
              <DatePicker
                onChange={e => setValue('date', e.toString())}
                size='sm'
                label='Fecha'
                defaultValue={formatDate(data?.date)}
              />

              <TimeInput
                onChange={e => setValue('time', e ? e.toString() : '23:59:59')}
                size='sm'
                label='Hora'
                hourCycle={24}
                defaultValue={formatTime(data?.date)?.toString() != '23:59:59' ? formatTime(data?.date) : undefined}
              />
            </div>

            <Textarea
              {...register('description')}
              label='Description'
              placeholder='Enter your description'
              className=''
              size='sm'
            />
          </ModalBody>

          <ModalFooter>
            <Button
              color='danger'
              className='bg-transparent border border-red-500 text-red-500'
              size='sm'
              onClick={handleRemoveTask}
            >
              Eliminar
            </Button>
            <Button color='primary' size='sm' type='submit'>
              Editar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
