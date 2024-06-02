import React from 'react'
import { Course } from '../../../../common/types'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CourseForm } from './course-form.vm'
import { useLazyMutationCourseAdd } from '../../../../common/api/apollo/graphql/course'
import { CourseContext, UserContext } from '../../../../common/context'

interface CourseAddModalProps {
  isOpen: boolean
  onClose: () => void
  data?: Course
}

export const CourseAddModal: React.FC<CourseAddModalProps> = props => {
  const { isOpen, onClose, data } = props
  const { refetchCourses } = React.useContext(CourseContext)
  const { userId } = React.useContext(UserContext)

  const [courseAdd] = useLazyMutationCourseAdd()

  const { handleSubmit, register, reset } = useForm<CourseForm>({
    defaultValues: {
      name: data?.name,
    },
  })

  const onSuccessAddCourse: SubmitHandler<CourseForm> = values => {
    courseAdd({
      variables: {
        course: {
          name: values.name,
          id: data?.id || 0,
        },
        userId: userId || 0,
      },
    })
      .then(() => {
        refetchCourses()
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
          <ModalHeader className='flex flex-col gap-1'>Añadir curso</ModalHeader>
          <form onSubmit={handleSubmit(onSuccessAddCourse)}>
            <ModalBody>
              <Input {...register('name', { required: true })} isRequired placeholder='Nombre del curso' size='sm' />
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
