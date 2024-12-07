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
import { UserContext } from '../../../../common/context'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ScoreForm } from './score-form.vm'
import { ModalForm, scoreSelectOptions } from '../../../../common/types'
import { useLazyMutationScoreAdd } from '../../../../common/api/apollo/graphql/score'
import { formatStringToLocalTimezone } from '../../../../common/utils'
import { CourseSelector } from '../../base/form'

interface ScoreCreateProps extends ModalForm {}

export const ScoreCreateFormModal: React.FC<ScoreCreateProps> = props => {
  const { isOpen, onClose, onRefetch: refetchScores } = props
  const { userId } = React.useContext(UserContext)

  const [scoreAdd] = useLazyMutationScoreAdd()

  const { handleSubmit, register, setValue, reset } = useForm<ScoreForm>({})

  const [selectedCourseId, setSelectedCourseId] = React.useState<number | undefined>()
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<number | undefined>()

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
          course: { id: selectedCourseId || 0, name: '' },
          subject: { id: selectedSubjectId || 0, name: '' },
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
            <CourseSelector onCourseChange={setSelectedCourseId} onSubjectChange={setSelectedSubjectId} />
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
