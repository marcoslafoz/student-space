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
import { CourseContext } from '../../../../common/context'
import { ClockCircleLinearIcon } from '../../base/nextui-icons'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  refetchTasks: () => void
  data?: Task
}

export const TaskEditFormModal: React.FC<TaskModalProps> = props => {
  const { isOpen, onClose, refetchTasks, data } = props

  const [editTaskMutation] = useLazyMutationTaskEdit()
  const [removeTaskMutation] = useLazyMutationTaskDelete()

  const { courseList } = useContext(CourseContext)

  const { handleSubmit, register, setValue, reset } = useForm<TaskForm>({
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
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
          course: { id: Number(values.courseId), name: '' },
        },
      },
    })
      .then(() => refetchTasks())
      .finally(() => {
        onClose()
      })
  }

  // const [subjects, setSubjects] = React.useState<Subject[] | undefined>(courseList.find(c => c.id === defaultSelectedCourseId)?.subjects)

  // const defaultSelectedCourseId = Number(watch('courseId')) || data?.course?.id

  // useEffect(() => {
  //   const selectedCourse = courseList.find(c => c.id === defaultSelectedCourseId)
  //   console.log('AQUI BEFORE', defaultSelectedCourseId)

  //   setSubjects(selectedCourse?.subjects)
  // }, [courseList, defaultSelectedCourseId])

  // console.log('aqui',subjects)

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
                defaultSelectedKeys={[data?.course?.id || 0]}
              >
                {courseList.map(a => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </Select>

              {/* <Select
                label='Asignatura'
                size='sm'
                onChange={e => setValue('subjectId', e.target.value)}
                defaultSelectedKeys={[data?.subject?.id || 0]}
                isDisabled={defaultSelectedCourseId == undefined || defaultSelectedCourseId == null}
              >
                {(subjects || []).map(s => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </Select> */}
            </div>
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
