import React, { useContext } from 'react'
import { Modal, ModalContent, ModalHeader } from '@nextui-org/react'
import { AddTaskForm } from './add-task-form'
import { useGetAcademicCourseListQuery, useGetSubjectListByUserQuery } from '../../../../common/api/graphql/query'
import { UserContext } from '../../../../common/context'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}

export const AddTaskModal: React.FC<AddTaskModalProps> = props => {
  const { isOpen, onClose } = props

  const { userID } = useContext(UserContext)

  const { data: courseList } = useGetAcademicCourseListQuery({ variables: { userId: userID || 0 } })
  const { data: subjectList } = useGetSubjectListByUserQuery({ variables: { userId: userID || 0 } })

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement='top-center' backdrop='opaque'>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Añadir tarea</ModalHeader>
        <AddTaskForm
          courseList={courseList?.getAcademicCourseListByUserId || []}
          subjectList={subjectList?.getSubjectListByUserId || []}
          {...props}
        />
      </ModalContent>
    </Modal>
  )
}
