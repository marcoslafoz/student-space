import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  Textarea,
  DatePicker,
  TimeInput,
} from '@nextui-org/react'
import { Task } from '../../../../common/types'
import { getLocalTimeZone, today } from '@internationalized/date'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  formatDate,
  formatLocalTimezoneToString,
  formatStringToLocalTimezone,
  formatTime,
} from '../../../../common/utils'
import moment from 'moment-timezone'
import {
  useLazyMutationEditTask,
  useLazyMutationRemoveTask,
  useLazyMutationRemoveTaskSubject,
} from '../../../../common/api/graphql/mutation'

interface EditTaskForm {
  title: string
  courseId: string
  description: string
  date: string
  time: string
}

interface TaskEditModalProps {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  data: Task
}

export const TaskEditModal: React.FC<TaskEditModalProps> = props => {
  const { isOpen, onClose, data, refetch } = props

  const [removeTaskMutation] = useLazyMutationRemoveTask()
  const [editTaskMutation] = useLazyMutationEditTask()

  const handleRemoveTask = () => {
    removeTaskMutation({
      variables: { taskId: data.id },
    })
      .then(() => refetch())
      .finally(() => onClose())
  }

  const { handleSubmit, register, setValue } = useForm<EditTaskForm>({
    defaultValues: {
      title: data.title,
      courseId: data.academicCourse?.id?.toString(),
      description: data.description,
    },
  })

  const onSubmit: SubmitHandler<EditTaskForm> = async values => {
    console.log('AQUI', values)
    editTaskMutation({
      variables: {
        task: {
          id: data.id,
          title: values.title,
          date: (values.date && values.time && formatStringToLocalTimezone(values.date, values.time)) || '',
          academicCourse: { id: 0, name: '' },
          description: values.description,
          subject: { id: 0, name: '' },
          checked: false,
        },
      },
    })
      .then(() => refetch())
      .finally(() => onClose())
  }

  data.date && setValue('time', moment(formatLocalTimezoneToString(data.date)).format('HH:mm'))
  data.date && setValue('date', moment(formatLocalTimezoneToString(data.date)).format('YYYY-MM-DD'))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal isOpen={isOpen} onClose={onClose} placement='top-center' backdrop='opaque'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Editar tarea</ModalHeader>
          <ModalBody>
            <Input {...register('title', { required: true })} isRequired placeholder='Nombre de la tarea' size='sm' />

            <div className='grid grid-cols-2 gap-5'>
              <DatePicker
                onChange={e => setValue('date', e.toString())}
                size='sm'
                label='Fecha'
                minValue={today(getLocalTimeZone())}
                defaultValue={formatDate(data.date)}
              />
              <TimeInput
                onChange={e => setValue('time', e.toString())}
                size='sm'
                label='Hora'
                hourCycle={24}
                defaultValue={formatTime(data.date)}
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
            <Button color='primary' size='sm' type='submit' onClick={handleSubmit(onSubmit)}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  )
}
