import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Input, ModalFooter, Button } from '@nextui-org/react'

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
}

export const EditTaskModal: React.FC<EditTaskModalProps> = props => {

  const { isOpen, onClose } = props

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        backdrop='opaque'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar tarea</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Enter your email"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}