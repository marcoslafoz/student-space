import React from 'react'
import { ModalForm, Subject } from '../../../../common/types'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SubjectForm } from './subject-form.vm'
import { useLazyMutationSubjectAdd } from '../../../../common/api/apollo/graphql/subject/mutation'

interface SubjectAddModalProps extends ModalForm {
  data?: Subject
  courseId: number
}

export const SubjectAddModal: React.FC<SubjectAddModalProps> = props => {
  const { isOpen, onClose, data, courseId, onRefetch: refetchSubject } = props

  const [subjectAdd] = useLazyMutationSubjectAdd()

  const { handleSubmit, register, reset } = useForm<SubjectForm>({
    defaultValues: {
      name: data?.name,
    },
  })

  const onSuccessAddSubject: SubmitHandler<SubjectForm> = values => {
    subjectAdd({
      variables: {
        subject: {
          name: values.name,
          id: data?.id || 0,
        },
        courseId: courseId,
      },
    })
      .then(() => {
        refetchSubject()
        onClose()
      })
      .finally(() => reset())
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
          <ModalHeader className='flex flex-col gap-1'>Añadir asignatura</ModalHeader>
          <form onSubmit={handleSubmit(onSuccessAddSubject)}>
            <ModalBody>
              <Input {...register('name', { required: true })} isRequired placeholder='Nombre del curso' size='sm' />
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
                Añadir
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
