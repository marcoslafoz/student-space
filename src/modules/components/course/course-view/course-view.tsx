import React from 'react'
import { Course } from '../../../../common/types'
import { Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, EditIcon, PlusIcon } from '../../../../common/constants/icons'
import { CourseEditModal } from '../course-form'
import { SubjectList } from '../../subject'
import { useTaskGetListByCourseLazyQuery } from '../../../../common/api/apollo/graphql/task'
import { TaskList } from '../../tasks'
import { TaskAddFormModal } from '../../tasks/task-form'

interface CourseViewProps {
  data: Course
  refetch: () => void
}

export const CourseView: React.FC<CourseViewProps> = props => {
  const { data, refetch } = props
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
          <Tooltip closeDelay={0} content='Editar'>
            <button onClick={() => setShowCourseEditModal(true)}>
              <img src={EditIcon} className='opacity-40 w-5' alt='Editar curso' />
            </button>
          </Tooltip>
        </div>
        <SubjectList data={subjects} courseId={id} refetch={refetch} />

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
        refetch={refetch}
      />
      <TaskAddFormModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        refetch={refetchTasks}
        lockCourseId={data.id}
      />
    </>
  )
}
