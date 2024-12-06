import React from 'react'
import { Course, ModalForm } from '../../../../common/types'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CourseForm } from './course-form.vm'
import { useLazyMutationCourseEdit } from '../../../../common/api/apollo/graphql/course'
import Circle from '@uiw/react-color-circle'
import { hexColors } from '../../../../common/constants/colors'

interface CourseEditModalProps extends ModalForm {
  data: Course
}

export const CourseEditModal: React.FC<CourseEditModalProps> = props => {
  const { isOpen, onClose, data, onRefetch: refetchCourse } = props

  const [hexColor, setHexColor] = React.useState<string>(data.color || '#9095a0')

  const [courseEdit] = useLazyMutationCourseEdit()

  const { handleSubmit, register, reset } = useForm<CourseForm>({
    defaultValues: {
      name: data?.name,
    },
  })

  const onSuccessEditCourse: SubmitHandler<CourseForm> = values => {
    courseEdit({
      variables: {
        course: {
          name: values.name,
          id: data?.id || 0,
          color: hexColor,
        },
      },
    }).then(() => {
      refetchCourse()
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
              <div className='mt-2'>
                <Circle colors={hexColors} color={hexColor} onChange={color => setHexColor(color.hex)} />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color='danger'
                variant='bordered'
                className='border-1'
                size='sm'
                onClick={() => {
                  onClose()
                  reset()
                }}
              >
                Cancelar
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
