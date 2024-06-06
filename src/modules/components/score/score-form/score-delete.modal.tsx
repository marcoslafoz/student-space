import React from 'react'
import { Score } from '../../../../common/types'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useLazyMutationScoreDelete } from '../../../../common/api/apollo/graphql/score'

interface ScoreDeleteModalProps {
  data: Score
  isOpen: boolean
  onClose: () => void
  refetchScore: () => void
}

export const ScoreDeleteModal: React.FC<ScoreDeleteModalProps> = props => {
  const { isOpen, onClose, refetchScore, data } = props

  const [removeScoreMutation] = useLazyMutationScoreDelete()

  const handleRemoveScore = React.useCallback(() => {
    removeScoreMutation({
      variables: { scoreId: data.id },
    })
      .then(() => {
        refetchScore()
      })
      .finally(() => onClose())
  }, [data.id, onClose, refetchScore, removeScoreMutation])

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
            <Button color='danger' size='sm' onClick={handleRemoveScore}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
