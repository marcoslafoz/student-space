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
import { ModalForm, Task } from '../../../../common/types'
import {
  formatDate,
  formatLocalTimezoneToString,
  formatStringToLocalTimezone,
  formatTime,
} from '../../../../common/utils'
import moment from 'moment'
import { TaskForm } from './task-form.vm'
import { useLazyMutationTaskDelete, useLazyMutationTaskEdit } from '../../../../common/api/apollo/graphql/task'
import { ClockCircleLinearIcon } from '../../base/nextui-icons'
import { CourseSelector } from '../../base/form/course-selector'

interface TaskModalProps extends ModalForm {
  data: Task
}

export const TaskEditFormModal: React.FC<TaskModalProps> = props => {
  const { isOpen, onClose, onRefetch: refetchTasks, data } = props

  const [selectedCourseId, setSelectedCourseId] = React.useState<number | undefined>(data?.course?.id)
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<number | undefined>(data?.subject?.id)

  const [editTaskMutation] = useLazyMutationTaskEdit()
  const [removeTaskMutation] = useLazyMutationTaskDelete()

  const { handleSubmit, register, setValue, reset } = useForm<TaskForm>({
    defaultValues: {
      title: data?.title,
      description: data?.description,
    },
  })

  const handleRemoveTask = React.useCallback(() => {
    removeTaskMutation({
      variables: { taskId: data?.id || 0 },
    })
      .then(() => refetchTasks())
      .finally(() => onClose())
  }, [data?.id, onClose, refetchTasks, removeTaskMutation])

  const onSuccessEditTask: SubmitHandler<TaskForm> = values => {
    editTaskMutation({
      variables: {
        task: {
          id: data?.id || 0,
          title: values.title,
          date: formatStringToLocalTimezone(values.date, values.time),
          description: values.description,
          checked: false,
          course: { id: selectedCourseId || 0, name: '' },
          subject: { id: selectedSubjectId || 0, name: '' },
        },
      },
    })
      .then(() => refetchTasks())
      .catch(() => reset())
      .finally(() => onClose())
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
      placement='center'
      backdrop='opaque'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Editar tarea</ModalHeader>
        <form onSubmit={handleSubmit(onSuccessEditTask)}>
          <ModalBody>
            <Input {...register('title', { required: true })} isRequired placeholder='Nombre de la tarea' />

            <div className='grid grid-cols-2 gap-3'>
              <DatePicker
                onChange={e => setValue('date', e ? e.toString() : '')}
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
                endContent={
                  <span className='className="text-xl text-default-400 pointer-events-none flex-shrink-0"'>
                    <ClockCircleLinearIcon />
                  </span>
                }
              />
            </div>

            <Textarea
              {...register('description')}
              label='Description'
              placeholder='Enter your description'
              className=''
              size='sm'
            />

            <CourseSelector
              defaultCourseId={data.course?.id}
              defaultSubjectId={data.subject?.id}
              onCourseChange={setSelectedCourseId}
              onSubjectChange={setSelectedSubjectId}
            />
          </ModalBody>

          <ModalFooter>
            <Button color='danger' size='sm' onClick={handleRemoveTask}>
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
