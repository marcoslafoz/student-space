import React from 'react'
import { Course } from '../../../../common/types'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, PlusIcon } from '../../../../common/constants/icons'
import { CourseEditModal, CourseModalDelete } from '../course-form'
import { SubjectList } from '../../subject'
import { useTaskGetListByCourseLazyQuery } from '../../../../common/api/apollo/graphql/task'
import { TaskList } from '../../tasks'
import { TaskAddFormModal } from '../../tasks/task-form'
import { DeleteDocumentIcon, EditDocumentIcon, VerticalDotsIcon } from '../../base/nextui-icons'

interface CourseViewProps {
  data: Course
  refetchCourse: () => void
}

export const CourseView: React.FC<CourseViewProps> = props => {
  const { data, refetchCourse } = props
  const { name, subjects, id } = data

  const [showCourseEditModal, setShowCourseEditModal] = React.useState<boolean>(false)
  const [showAddTaskModal, setShowAddTaskModal] = React.useState<boolean>(false)

  const [getTasks, { data: taskData, refetch: refetchTasks }] = useTaskGetListByCourseLazyQuery()

  React.useEffect(() => {
    getTasks({ variables: { courseId: data.id } })
  }, [getTasks, data.id])

  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='pb-3 flex items-center gap-3 flex-wrap'>
          <Tooltip closeDelay={0} content='Cursos'>
            <Link to={'/courses'}>
              <img src={ArrowLeftIcon} alt='' />
            </Link>
          </Tooltip>
          <span className='text-xl'>{name}</span>
          <CourseDropdownOptions {...props} />
          {/* <Tooltip closeDelay={0} content='Editar'>
            <button onClick={() => setShowCourseEditModal(true)}>
              <img src={EditIcon} className='opacity-40 w-5' alt='Editar curso' />
            </button>
          </Tooltip> */}
        </div>
        <SubjectList data={subjects} courseId={id} refetch={refetchCourse} />

        <div className='my-3'>
          <div className='py-2 flex items-center gap-2 flex-wrap'>
            <span>Tareas</span>
            <Tooltip closeDelay={0} content='Añadir tarea'>
              <button onClick={() => setShowAddTaskModal(true)}>
                <img src={PlusIcon} className='w-5' alt='Añadir tarea' />
              </button>
            </Tooltip>
          </div>
          <div className='max-w-2xl'>
            <TaskList data={taskData?.taskGetListByCourse || []} refetch={() => refetchTasks()} />
          </div>
        </div>
      </div>
      <CourseEditModal
        isOpen={showCourseEditModal}
        onClose={() => setShowCourseEditModal(false)}
        data={data}
        onRefetch={refetchCourse}
      />
      <TaskAddFormModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onRefetch={refetchTasks}
        lockCourseId={data.id}
      />
    </>
  )
}

const CourseDropdownOptions: React.FC<CourseViewProps> = props => {
  const { data, refetchCourse } = props

  const [showCourseEditModal, setShowCourseEditModal] = React.useState<boolean>(false)
  const [showCourseDeleteModal, setShowCourseDeleteModal] = React.useState<boolean>(false)

  return (
    <>
      <div className='flex'>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size='sm' variant='light'>
              <VerticalDotsIcon className='text-default-300' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant='faded' aria-label='Dropdown menu with description'>
            <DropdownItem
              key='edit'
              showDivider
              description={<>Edita los detalles de {data.name}</>}
              onPress={() => setShowCourseEditModal(true)}
              startContent={
                <span className='text-xl text-default-500 pointer-events-none flex-shrink-0'>
                  <EditDocumentIcon />
                </span>
              }
            >
              Editar curso
            </DropdownItem>
            <DropdownItem
              onPress={() => setShowCourseDeleteModal(true)}
              key='delete'
              className='text-danger'
              color='danger'
              description='Elimina permanente este curso'
              startContent={
                <span className='text-xl pointer-events-none flex-shrink-0'>
                  <DeleteDocumentIcon />
                </span>
              }
            >
              Eliminar curso
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <CourseEditModal
        isOpen={showCourseEditModal}
        onClose={() => setShowCourseEditModal(false)}
        data={data}
        onRefetch={refetchCourse}
      />
      <CourseModalDelete
        data={data}
        isOpen={showCourseDeleteModal}
        onClose={() => setShowCourseDeleteModal(false)}
        refetchCourse={refetchCourse}
      />
    </>
  )
}
