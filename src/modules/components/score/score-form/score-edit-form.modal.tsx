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
import { CourseContext } from '../../../../common/context'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ScoreForm } from './score-form.vm'
import { ModalForm, Score, scoreSelectOptions } from '../../../../common/types'
import { useLazyMutationScoreEdit } from '../../../../common/api/apollo/graphql/score'
import { formatDate, formatLocalTimezoneToString, formatStringToLocalTimezone } from '../../../../common/utils'
import moment from 'moment'

interface ScoreEditProps extends ModalForm {
  data: Score
}

export const ScoreEditFormModal: React.FC<ScoreEditProps> = props => {
  const { isOpen, onClose, onRefetch: refetchScores, lockCourseId, data } = props

  const { courseList } = useContext(CourseContext)
  const [scoreEdit] = useLazyMutationScoreEdit()

  const { handleSubmit, register, setValue, reset } = useForm<ScoreForm>({
    defaultValues: {
      name: data.name,
      score: data.score,
      status: data.status?.toString() || '',
    },
  })

  const onSuccessScoreCreate: SubmitHandler<ScoreForm> = values => {
    scoreEdit({
      variables: {
        score: {
          name: values.name,
          date: formatStringToLocalTimezone(values.date, '00:00:00'),
          id: data.id,
          score: Number(values.score),
          status: values.status ? Number(values.status) : undefined,
          course: { id: lockCourseId == undefined ? Number(values.courseId) : lockCourseId, name: '' },
          subject: { id: 7, name: '' },
        },
      },
    })
      .then(() => refetchScores())
      .catch(() => reset())
      .finally(() => onClose())
  }

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
        <ModalHeader className='flex flex-col gap-1'>Editar nota</ModalHeader>
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
              <Select
                label='Estado'
                size='sm'
                onChange={e => setValue('status', e.target.value)}
                defaultSelectedKeys={[data.status?.toString() || '']}
              >
                {scoreSelectOptions.map(a => (
                  <SelectItem key={a.value} value={a.value}>
                    {a.label}
                  </SelectItem>
                ))}
              </Select>
              <DatePicker
                onChange={e => setValue('date', e.toString())}
                size='sm'
                label='Fecha'
                defaultValue={formatDate(data?.date)}
              />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <Select
                label='Curso'
                size='sm'
                onChange={e => setValue('courseId', e.target.value)}
                defaultSelectedKeys={[data.course?.id || '']}
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
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
