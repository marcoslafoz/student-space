import React from 'react'
import { Subject } from '../../../../common/types'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SubjectForm } from './subject-form.vm'
import {
  useLazyMutationSubjectDelete,
  useLazyMutationSubjectEdit,
} from '../../../../common/api/apollo/graphql/subject/mutation'
import { useNavigate } from 'react-router-dom'

interface SubjectEditModalProps {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  data?: Subject
  courseId: number
}

export const SubjectEditModal: React.FC<SubjectEditModalProps> = props => {
  const { isOpen, onClose, data, refetch, courseId } = props

  const [subjectEdit] = useLazyMutationSubjectEdit()
  const [removeSubjectMutation] = useLazyMutationSubjectDelete()

  const navigate = useNavigate()

  const { handleSubmit, register, reset } = useForm<SubjectForm>({
    defaultValues: {
      name: data?.name,
    },
  })

  const handleRemoveSubject = React.useCallback(() => {
    removeSubjectMutation({
      variables: { subjectId: data?.id || 0 },
    })
      .then(() => {
        refetch()
        navigate(`/courses/detail/${courseId}`)
      })
      .finally(() => onClose())
  }, [courseId, data?.id, navigate, onClose, refetch, removeSubjectMutation])

  const onSuccessEditSubject: SubmitHandler<SubjectForm> = values => {
    subjectEdit({
      variables: {
        subject: {
          name: values.name,
          id: data?.id || 0,
        },
      },
    }).then(() => {
      refetch()
      onClose()
    })
  }

  return (
    <>
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
          <ModalHeader className='flex flex-col gap-1'>Editar asignatura</ModalHeader>
          <form onSubmit={handleSubmit(onSuccessEditSubject)}>
            <ModalBody>
              <Input {...register('name', { required: true })} isRequired placeholder='Nombre del curso' size='sm' />
            </ModalBody>

            <ModalFooter>
              <Button color='danger' size='sm' onClick={handleRemoveSubject}>
                Eliminar
              </Button>
              <Button color='primary' size='sm' type='submit'>
                Editar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
