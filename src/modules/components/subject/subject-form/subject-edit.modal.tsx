import React from 'react'
import { ModalForm, Subject } from '../../../../common/types'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SubjectForm } from './subject-form.vm'
import { useLazyMutationSubjectEdit } from '../../../../common/api/apollo/graphql/subject/mutation'
import Circle from '@uiw/react-color-circle'
import { hexColors } from '../../../../common/constants/colors'

interface SubjectEditModalProps extends ModalForm {
  data?: Subject
}

export const SubjectEditModal: React.FC<SubjectEditModalProps> = props => {
  const { isOpen, onClose, data, onRefetch: refetchSubject } = props

  const [hexColor, setHexColor] = React.useState<string>(data?.color || '#9095a0')

  const [subjectEdit] = useLazyMutationSubjectEdit()

  const { handleSubmit, register, reset } = useForm<SubjectForm>({
    defaultValues: {
      name: data?.name,
    },
  })

  const onSuccessEditSubject: SubmitHandler<SubjectForm> = values => {
    subjectEdit({
      variables: {
        subject: {
          name: values.name,
          id: data?.id || 0,
          color: hexColor,
        },
      },
    })
      .then(() => {
        refetchSubject()
        onClose()
      })
      .catch(() => reset())
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
              <div className='mt-2'>
                <Circle colors={hexColors} color={hexColor} onChange={color => setHexColor(color.hex)} />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color='danger'
                variant='bordered'
                className='border-1'
                size='sm'
                onClick={() => {
                  onClose()
                  reset()
                }}
              >
                Cancelar
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
