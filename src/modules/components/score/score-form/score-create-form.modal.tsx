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
  Select,
  SelectItem,
} from '@nextui-org/react'
import { CourseContext, UserContext } from '../../../../common/context'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ScoreForm } from './score-form.vm'
import { ModalForm, scoreSelectOptions } from '../../../../common/types'
import { useLazyMutationScoreAdd } from '../../../../common/api/apollo/graphql/score'
import { formatStringToLocalTimezone } from '../../../../common/utils'

interface ScoreCreateProps extends ModalForm {}

export const ScoreCreateFormModal: React.FC<ScoreCreateProps> = props => {
  const { isOpen, onClose, onRefetch: refetchScores, lockCourseId, lockSubjectId } = props
  const { userId } = React.useContext(UserContext)

  const { courseList } = React.useContext(CourseContext)
  const [scoreAdd] = useLazyMutationScoreAdd()

  const { handleSubmit, register, setValue, reset } = useForm<ScoreForm>({})

  const onSuccessScoreCreate: SubmitHandler<ScoreForm> = values => {
    if (!userId) return

    scoreAdd({
      variables: {
        userId: userId,
        score: {
          name: values.name,
          date: formatStringToLocalTimezone(values.date, undefined),
          id: 0,
          score: Number(values.score),
          status: values.status ? Number(values.status) : undefined,
          course: { id: lockCourseId == undefined ? Number(values.courseId) : lockCourseId, name: '' },
          subject: { id: lockSubjectId == undefined ? Number(values.subjectId) : lockSubjectId, name: '' },
        },
      },
    })
      .then(() => refetchScores())
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
        <ModalHeader className='flex flex-col gap-1'>Añadir nota</ModalHeader>
        <form onSubmit={handleSubmit(onSuccessScoreCreate)}>
          <ModalBody>
            <div className='flex flex-row gap-3'>
              <Input {...register('name', { required: true })} className='w-4/6' isRequired placeholder='Nombre' />
              <Input
                {...register('score', { required: true })}
                className='w-2/6'
                type={'number'}
                isRequired
                placeholder='Nota'
              />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <Select label='Estado' size='sm' onChange={e => setValue('status', e.target.value)}>
                {scoreSelectOptions.map(a => (
                  <SelectItem key={a.value} value={a.value}>
                    {a.label}
                  </SelectItem>
                ))}
              </Select>
              <DatePicker onChange={e => setValue('date', e ? e.toString() : '')} size='sm' label='Fecha' />
            </div>
            <div className='grid grid-cols-2 gap-3'>
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
