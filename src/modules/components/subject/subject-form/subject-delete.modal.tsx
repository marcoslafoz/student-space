import React from 'react'
import { Subject } from '../../../../common/types'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useLazyMutationSubjectDelete } from '../../../../common/api/apollo/graphql/subject/mutation'
import { useNavigate } from 'react-router'

interface SubjectModalDeleteProps {
  data: Subject
  isOpen: boolean
  onClose: () => void
  refetchSubject: () => void
  courseId: number
}

export const SubjectModalDelete: React.FC<SubjectModalDeleteProps> = props => {
  const { data, isOpen, onClose, refetchSubject, courseId } = props

  const [removeSubjectMutation] = useLazyMutationSubjectDelete()
  const navigate = useNavigate()

  const handleRemoveSubject = React.useCallback(() => {
    removeSubjectMutation({
      variables: { subjectId: data?.id || 0 },
    }).then(() => {
      refetchSubject()
      navigate(`/courses/detail/${courseId}`)
    })
  }, [courseId, data?.id, navigate, refetchSubject, removeSubjectMutation])

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()} placement='center' backdrop='opaque'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>¿Eliminar definitivamente?</ModalHeader>

          <ModalBody>
            <p className='text-sm text-gray-500'>
              <span className='font-bold text-black'>{data.name}</span> se eliminará definitivamente y no podras
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
            <Button color='danger' size='sm' onClick={handleRemoveSubject}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
