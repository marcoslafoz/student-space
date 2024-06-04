import React from 'react'
import { Course } from '../../../../common/types'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useLazyMutationCourseDelete } from '../../../../common/api/apollo/graphql/course/mutation'

export interface CourseDeleteForm {
  title: string
}

interface CourseModalDeleteProps {
  data: Course
  isOpen: boolean
  onClose: () => void
  refetchCourse: () => void
}

export const CourseModalDelete: React.FC<CourseModalDeleteProps> = props => {
  const { data, isOpen, onClose, refetchCourse } = props

  const [removeCourseMutation] = useLazyMutationCourseDelete()

  const handleRemoveCourse = React.useCallback(() => {
    removeCourseMutation({
      variables: { courseId: data?.id || 0 },
    })
      .then(() => refetchCourse())
      .finally(() => onClose())
  }, [data?.id, onClose, refetchCourse, removeCourseMutation])

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
            <Button color='danger' size='sm' onClick={handleRemoveCourse}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
