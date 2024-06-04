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
} from '@nextui-org/react'
import { CourseContext, UserContext } from '../../../../common/context'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ScoreForm } from './score-form.vm'

interface ScoreCreateProps {
  isOpen: boolean
  onClose: () => void
  refetchScores: () => void
  lockCourseId?: number
}

export const ScoreCreateFormModal: React.FC<ScoreCreateProps> = props => {
  const { isOpen, onClose, refetchScores, lockCourseId } = props
  const { userId } = useContext(UserContext)

  const { courseList } = useContext(CourseContext)

  const { handleSubmit, register, setValue, reset } = useForm<ScoreForm>({})

  const onSuccessScoreCreate: SubmitHandler<ScoreForm> = values => {
    console.log('aqui courses', courseList)
    if (!userId) return

    console.log('AQUI VALUES', values)

    // addTaskMutation({
    //   variables: {
    //     userId: userId,
    //     task: {
    //       title: values.title,
    //       date: formatStringToLocalTimezone(values.date, ''),
    //       id: 0,
    //       checked: false,

    //     },
    //   },
    // }).then(() => refetch())
    //   .finally(() => {
    //     onClose()
    //     reset()
    //   })
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
        <ModalHeader className='flex flex-col gap-1'>Añadir nota</ModalHeader>
        <form onSubmit={handleSubmit(onSuccessScoreCreate)}>
          <ModalBody>
            <Input {...register('title', { required: true })} isRequired placeholder='Nombre' />
            <div className='grid grid-cols-2 gap-3'>
              <Input {...register('score', { required: true })} type={'number'} isRequired placeholder='Nota' />
              <DatePicker onChange={e => setValue('date', e.toString())} size='sm' label='Fecha' />
            </div>
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
              Crear nota
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
