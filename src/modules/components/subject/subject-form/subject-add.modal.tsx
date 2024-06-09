import React from 'react'
import { ModalForm } from '../../../../common/types'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SubjectForm } from './subject-form.vm'
import { useLazyMutationSubjectAdd } from '../../../../common/api/apollo/graphql/subject/mutation'
import Circle from '@uiw/react-color-circle'
import { hexColors } from '../../../../common/constants/colors'

interface SubjectAddModalProps extends ModalForm {
  courseId: number
}

export const SubjectAddModal: React.FC<SubjectAddModalProps> = props => {
  const { isOpen, onClose, courseId, onRefetch: refetchSubject } = props

  const [hexColor, setHexColor] = React.useState<string>('#9095a0')

  const [subjectAdd] = useLazyMutationSubjectAdd()

  const { handleSubmit, register, reset } = useForm<SubjectForm>()

  const onSuccessAddSubject: SubmitHandler<SubjectForm> = values => {
    subjectAdd({
      variables: {
        subject: {
          name: values.name,
          id: 0,
          color: hexColor
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
              <div className='mt-2'>
                <Circle colors={hexColors} color={hexColor} onChange={color => setHexColor(color.hex)} />
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
                Añadir
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
