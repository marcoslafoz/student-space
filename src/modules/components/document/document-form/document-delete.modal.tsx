import React from 'react'
import { Document } from '../../../../common/types'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useLazyMutationDocumentDelete } from '../../../../common/api/apollo/graphql/document'

export interface DocumentDeleteForm {
  title: string
}

interface DocumentModalDeleteProps {
  data: Document
  isOpen: boolean
  onClose: () => void
  refetchDocuments: () => void
}

export const DocumentModalDelete: React.FC<DocumentModalDeleteProps> = props => {
  const { data, isOpen, onClose, refetchDocuments } = props

  const [documentDelete] = useLazyMutationDocumentDelete()

  const handleRemoveDocument = React.useCallback(() => {
    documentDelete({
      variables: {
        documentId: data.id,
      },
    })
      .then(() => refetchDocuments())
      .finally(() => onClose())
  }, [data.id, documentDelete, onClose, refetchDocuments])

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()} placement='center' backdrop='opaque'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>¿Eliminar definitivamente?</ModalHeader>

          <ModalBody>
            <p className='text-sm text-gray-500'>
              <span className='font-bold text-black'>{data.title}</span> se eliminará definitivamente y no podras
              restaurarlo
            </p>
          </ModalBody>

          <ModalFooter>
            <Button
              color='danger'
              variant='bordered'
              className='bg-transparent border border-red-500 text-red-500'
              size='sm'
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
            <Button color='danger' size='sm' onClick={handleRemoveDocument}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
