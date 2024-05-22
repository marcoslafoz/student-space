import React, { useContext } from 'react'
import { ModalBody, Input, ModalFooter, Button, Select, SelectItem, Textarea, TimeInput, DatePicker } from '@nextui-org/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AcademicCourse, Subject } from '../../../../common/types'
import { useLazyMutationAddTask } from '../../../../common/api/graphql/mutation'
import { UserContext } from '../../../../common/context'
import { formatStringToLocalTimezone } from '../../../../common/utils'
import { getLocalTimeZone, today } from '@internationalized/date'

interface AddTaskForm {
  title: string
  courseId: string
  description: string
  date: string
  time: string
}

interface AddTaskFormProps {
  courseList: AcademicCourse[]
  subjectList: Subject[]
  onClose: () => void
  refetch: () => void
}

export const AddTaskForm: React.FC<AddTaskFormProps> = props => {
  const { courseList, onClose, refetch } = props

  const { userID } = useContext(UserContext)

  const { handleSubmit, register, setValue } = useForm<AddTaskForm>()

  const [addTaskMutation] = useLazyMutationAddTask()

  const onSubmit: SubmitHandler<AddTaskForm> = async (values) => {

    if(!userID) return

    await addTaskMutation(
      {variables: {
        userId: userID,
        task: {
          title: values.title,
          date: (values.date && values.time) && formatStringToLocalTimezone(values.date, values.time) || '',
          description: values.description,
          academicCourse: {
            id: Number(values.courseId),
            name: ''
          },
          id: 0,
          checked: false
        }
      }}
    ).then(() => refetch())
      .finally(() => onClose())
  
  }



  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <Input {...register('title', { required: true })} isRequired placeholder='Nombre de la tarea' size='sm' />

        <div className='grid grid-cols-2 gap-5'>
          <DatePicker onChange={(e) => setValue('date', e.toString())} size='sm' label="Fecha" minValue={today(getLocalTimeZone())} />
          <TimeInput  onChange={(e) => setValue('time', e.toString())} size='sm' label="Hora" hourCycle={24} />
        </div>

        <Textarea
          {...register('description')}
          label="Description"
          placeholder="Enter your description"
          className=""
          size='sm'
        />

        <Select label="Curso" size='sm' onChange={(e) => setValue('courseId', e.target.value)} >
          {courseList.map((a) => (
            <SelectItem key={a.id} value={a.id}>
              {a.name}
            </SelectItem>
          ))}
        </Select>

      </ModalBody>

      <ModalFooter>
        <Button color='danger' className='bg-transparent border border-red-500 text-red-500'  size='sm' onClick={onClose}>Cancelar</Button>
        <Button color='primary' size='sm' type='submit' >Guardar</Button>
      </ModalFooter>
    </form>

  )
}
