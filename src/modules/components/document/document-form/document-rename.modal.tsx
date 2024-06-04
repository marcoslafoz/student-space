import React from 'react'
import { Document } from '../../../../common/types'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLazyMutationDocumentRename } from '../../../../common/api/apollo/graphql/document'

export interface DocumentRenameForm {
  title: string
}

interface DocumentModalRenameProps {
  data: Document
  isOpen: boolean
  onClose: () => void
  refetchDocuments: () => void
}

export const DocumentModalRename: React.FC<DocumentModalRenameProps> = props => {
  const { data, isOpen, onClose, refetchDocuments } = props

  const [documentRename] = useLazyMutationDocumentRename()

  const { handleSubmit, register, reset } = useForm<DocumentRenameForm>({
    defaultValues: {
      title: data.title,
    },
  })

  const onSuccessAddTask: SubmitHandler<DocumentRenameForm> = values => {
    documentRename({
      variables: {
        documentId: data.id,
        title: values.title,
      },
    })
      .then(() => refetchDocuments())
      .catch(() => reset())
      .finally(() => onClose())
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
          <ModalHeader className='flex flex-col gap-1'>Renombrar documento</ModalHeader>
          <form onSubmit={handleSubmit(onSuccessAddTask)}>
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
