import React from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CourseForm } from './course-form.vm'
import { useLazyMutationCourseAdd } from '../../../../common/api/apollo/graphql/course'
import { CourseContext, UserContext } from '../../../../common/context'
import Circle from '@uiw/react-color-circle'
import { hexColors } from '../../../../common/constants/colors'

interface CourseAddModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CourseAddModal: React.FC<CourseAddModalProps> = props => {
  const { isOpen, onClose } = props
  const { refetchCourses } = React.useContext(CourseContext)
  const { userId } = React.useContext(UserContext)

  const [hexColor, setHexColor] = React.useState<string>('#9095a0')

  const [courseAdd] = useLazyMutationCourseAdd()

  const { handleSubmit, register, reset } = useForm<CourseForm>()

  const onSuccessAddCourse: SubmitHandler<CourseForm> = values => {
    courseAdd({
      variables: {
        course: {
          name: values.name,
          id: 0,
          color: hexColor
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
              <div className='mt-2'>
                <Circle colors={hexColors} color={hexColor} onChange={color => setHexColor(color.hex)} />
              </div>
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
