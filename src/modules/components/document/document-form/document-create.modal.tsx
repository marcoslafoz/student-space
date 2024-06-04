import React from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLazyMutationDocumentCreate } from '../../../../common/api/apollo/graphql/document'
import { UserContext } from '../../../../common/context'

export interface DocumentCreateForm {
  title: string
}

interface DocumentCreateRenameProps {
  isOpen: boolean
  onClose: () => void
  refetchDocuments: () => void
}

export const DocumentModalCreate: React.FC<DocumentCreateRenameProps> = props => {
  const { isOpen, onClose, refetchDocuments } = props

  const { userId } = React.useContext(UserContext)

  const [documentRename] = useLazyMutationDocumentCreate()

  const { handleSubmit, register, reset } = useForm<DocumentCreateForm>()

  const onSuccessCreateTask: SubmitHandler<DocumentCreateForm> = values => {
    documentRename({
      variables: {
        title: values.title,
        courseId: 0,
        subjectId: 0,
        userId: userId || 0,
      },
    })
      .then(() => refetchDocuments())
      .finally(() => {
        onClose()
        reset()
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
          <ModalHeader className='flex flex-col gap-1'>Nuevo documento</ModalHeader>
          <form onSubmit={handleSubmit(onSuccessCreateTask)}>
            <ModalBody>
              <Input
                {...register('title', { required: true })}
                isRequired
                placeholder='Nombre del documento'
                size='sm'
              />
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
    </>
  )
}
