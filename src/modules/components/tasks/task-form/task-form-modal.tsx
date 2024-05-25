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
import { useGetAcademicCourseListQuery, useGetSubjectListByUserQuery } from '../../../../common/api/graphql/query'
import { UserContext } from '../../../../common/context'
import {
  useLazyMutationAddTask,
  useLazyMutationEditTask,
  useLazyMutationRemoveTask,
} from '../../../../common/api/graphql/mutation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AcademicCourse, Subject, Task } from '../../../../common/types'
import {
  formatDate,
  formatLocalTimezoneToString,
  formatStringToLocalTimezone,
  formatTime,
} from '../../../../common/utils'
import { getLocalTimeZone, today } from '@internationalized/date'
import moment from 'moment'

interface TaskForm {
  title: string
  courseId: string
  description: string
  date: string
  time: string
  subjectId: string
}

interface TaskModalProps {
  formType?: 'edit' | 'add'
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  data?: Task
}

export const TaskFormModal: React.FC<TaskModalProps> = props => {
  const { isOpen, onClose, refetch, data, formType = 'add' } = props
  const { userID } = useContext(UserContext)

  const [addTaskMutation] = useLazyMutationAddTask()
  const [editTaskMutation] = useLazyMutationEditTask()
  const [removeTaskMutation] = useLazyMutationRemoveTask()

  const { handleSubmit, register, setValue, watch, reset } = useForm<TaskForm>({
    defaultValues: {
      title: data?.title || '',
      courseId: data?.academicCourse?.id?.toString() || '',
      description: data?.description || '',
    },
  })

  data && data.date && setValue('time', moment(formatLocalTimezoneToString(data.date)).format('HH:mm'))
  data && data.date && setValue('date', moment(formatLocalTimezoneToString(data.date)).format('YYYY-MM-DD'))

  const { data: courseListData } = useGetAcademicCourseListQuery({ variables: { userId: userID || 0 } })
  const { data: subjectListData } = useGetSubjectListByUserQuery({ variables: { userId: userID || 0 } })

  const courseOptions: AcademicCourse[] = courseListData?.getAcademicCourseListByUserId || []
  const [subjectFilteredOptions, setSubjectFilteredOptions] = React.useState<Subject[]>([])

  const handleRemoveTask = () => {
    removeTaskMutation({
      variables: { taskId: data?.id || 0 },
    })
      .then(() => refetch())
      .finally(() => onClose())
  }


  React.useMemo(() => {
    if (isOpen) {
      if (!subjectListData || subjectListData?.getSubjectListByUserId.length < 1) {
        setSubjectFilteredOptions([])
        return
      }
      setSubjectFilteredOptions(subjectListData.getSubjectListByUserId.filter(x => x.academicCourse?.id == Number(watch('courseId'))))

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('courseId'), isOpen])

  const handleAddTask: SubmitHandler<TaskForm> = async values => {
    if (!userID) return

    await addTaskMutation({
      variables: {
        userId: userID,
        task: {
          title: values.title,
          date: (values.date && values.time && formatStringToLocalTimezone(values.date, values.time)) || '',
          description: values.description,
          academicCourse: {
            id: Number(values.courseId),
            name: '',
          },
          subject: {
            id: Number(values.subjectId),
            name: ''
          },
          id: 0,
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

  const handleEditTask: SubmitHandler<TaskForm> = async values => {
    editTaskMutation({
      variables: {
        task: {
          id: data?.id || 0,
          title: values.title,
          date: (values.date && values.time && formatStringToLocalTimezone(values.date, values.time)) || '',
          academicCourse: {
            id: Number(values.courseId),
            name: '',
          },
          description: values.description,
          subject: {
            id: Number(values.subjectId),
            name: ''
          },
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        reset()
      }}
      placement='top-center' backdrop='opaque'>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'> {formType == 'edit' ? 'Editar tarea' : 'Añadir tarea'}</ModalHeader>
        <form onSubmit={formType == 'edit' ? handleSubmit(handleEditTask) : handleSubmit(handleAddTask)}>
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
                onChange={e => setValue('time', e.toString())}
                size='sm'
                label='Hora'
                hourCycle={24}
                defaultValue={formatTime(data?.date)}
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
                defaultSelectedKeys={[data?.academicCourse?.id || '']}
              >
                {courseOptions.map(a => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label='Asignatura'
                size='sm'
                isDisabled={

                  !(formType == 'edit' && data?.academicCourse?.id != undefined && !(subjectFilteredOptions.length < 1)) && (watch('courseId') == undefined || watch('courseId') == '' || subjectFilteredOptions.length < 1)

                }
                onChange={e => setValue('subjectId', e.target.value)}
                // TODO: REVISAR PROBLEMA 
                // defaultSelectedKeys={[data?.subject?.id || '']}
              >
                {subjectFilteredOptions.map(a => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </ModalBody>

          <ModalFooter>
            {formType == 'edit' && (
              <Button
                color='danger'
                className='bg-transparent border border-red-500 text-red-500'
                size='sm'
                onClick={handleRemoveTask}
              >
                Eliminar
              </Button>
            )}
            <Button color='primary' size='sm' type='submit'>
              {formType == 'edit' ? 'Editar' : 'Crear tarea'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
