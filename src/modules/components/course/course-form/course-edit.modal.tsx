import React from 'react'
import { Course } from '../../../../common/types'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CourseForm } from './course-form.vm'
import { useLazyMutationCourseDelete, useLazyMutationCourseEdit } from '../../../../common/api/apollo/graphql/course'

interface CourseEditModalProps {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  data?: Course
}

export const CourseEditModal: React.FC<CourseEditModalProps> = props => {
  const { isOpen, onClose, data, refetch } = props

  const [courseEdit] = useLazyMutationCourseEdit()
  const [removeCourseMutation] = useLazyMutationCourseDelete()

  const { handleSubmit, register, reset } = useForm<CourseForm>({
    defaultValues: {
      name: data?.name,
    },
  })

  const handleRemoveCourse = React.useCallback(() => {
    removeCourseMutation({
      variables: { courseId: data?.id || 0 },
    })
      .then(() => refetch())
      .finally(() => onClose())
  }, [data?.id, onClose, refetch, removeCourseMutation])

  const onSuccessEditCourse: SubmitHandler<CourseForm> = values => {
    courseEdit({
      variables: {
        course: {
          name: values.name,
          id: data?.id || 0,
        },
      },
    }).then(() => {
      refetch()
      onClose()
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
          <ModalHeader className='flex flex-col gap-1'>Editar curso</ModalHeader>
          <form onSubmit={handleSubmit(onSuccessEditCourse)}>
            <ModalBody>
              <Input {...register('name', { required: true })} isRequired placeholder='Nombre del curso' size='sm' />
            </ModalBody>

            <ModalFooter>
              <Button color='danger' size='sm' onClick={handleRemoveCourse}>
                Eliminar
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