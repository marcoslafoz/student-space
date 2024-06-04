import React, { useContext } from 'react'
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
} from '@nextui-org/react'
import { CourseContext, UserContext } from '../../../../common/context'
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
import { useLazyMutationTaskAdd } from '../../../../common/api/apollo/graphql/task'
import { getLocalTimeZone, today } from '@internationalized/date'
import { ClockCircleLinearIcon } from '../../base/nextui-icons'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  data?: Task
  lockCourseId?: number
}

export const TaskAddFormModal: React.FC<TaskModalProps> = props => {
  const { isOpen, onClose, refetch, data, lockCourseId } = props
  const { userId } = useContext(UserContext)

  const { courseList } = useContext(CourseContext)

  const [addTaskMutation] = useLazyMutationTaskAdd()

  const { handleSubmit, register, setValue, reset } = useForm<TaskForm>({
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
    },
  })

  const onSuccessAddTask: SubmitHandler<TaskForm> = values => {
    if (!userId) return

    addTaskMutation({
      variables: {
        userId: userId,
        task: {
          title: values.title,
          date: formatStringToLocalTimezone(values.date, values.time),
          description: values.description,
          id: 0,
          checked: false,
          course: { id: lockCourseId == undefined ? Number(values.courseId) : lockCourseId, name: '' },
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
      placement='center'
      backdrop='opaque'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Añadir tarea</ModalHeader>
        <form onSubmit={handleSubmit(onSuccessAddTask)}>
          <ModalBody>
            <Input {...register('title', { required: true })} isRequired placeholder='Nombre de la tarea' size='sm' />

            <div className='grid grid-cols-2 gap-3'>
              <DatePicker
                onChange={e => setValue('date', e.toString())}
                size='sm'
                label='Fecha'
                minValue={today(getLocalTimeZone())}
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

            <div className='grid grid-cols-2 gap-3'>
              <Select
                label='Curso'
                size='sm'
                onChange={e => setValue('courseId', e.target.value)}
                defaultSelectedKeys={[lockCourseId || 0]}
                isDisabled={lockCourseId != undefined && true}
              >
                {courseList.map(a => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </Select>
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
              Crear tarea
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
