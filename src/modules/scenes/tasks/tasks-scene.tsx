import React, { useContext } from 'react'
import { UserContext } from '../../../common/context'
import { Layout } from '../../components/layout'
import { TaskList } from '../../components/tasks'
import {
  useLazyMutationTaskDeleteCheckedList,
  useTaskGetListByUserLazyQuery,
} from '../../../common/api/apollo/graphql/task'
import { CourseProvider } from '../../../common/context/course-context'
import { Chip, Tooltip } from '@nextui-org/react'
import { TaskAddFormModal } from '../../components/tasks/task-form'
import { PlusIcon } from '../../../common/constants/icons'

//TODO: Mover a task-view
export const TasksScene: React.FC = () => {
  const { userId } = useContext(UserContext)

  const [getTasks, { loading, error, data, refetch }] = useTaskGetListByUserLazyQuery()

  React.useEffect(() => {
    if (userId) {
      getTasks({ variables: { userId: userId } })
    }
  }, [userId, getTasks])

  const [showAddTaskModal, setShowAddTaskModal] = React.useState<boolean>(false)

  const [removeCheckedTasks] = useLazyMutationTaskDeleteCheckedList()

  const handleRemoveCheckedTasks = React.useCallback(() => {
    if (!userId) return

    removeCheckedTasks({
      variables: {
        userId: userId,
      },
    }).then(() => refetch())
  }, [refetch, removeCheckedTasks, userId])

  if (!data || loading || error) return <></>

  return (
    <CourseProvider userId={userId || 0}>
      <Layout>
        <div className='grid grid-cols-1'>
          <div className='pb-3 flex items-center gap-2 flex-wrap'>
            <span className='text-xl'>Tareas</span>
            <Tooltip closeDelay={0} content='Añadir tarea'>
              <button className='rounded-full' onClick={() => setShowAddTaskModal(true)}>
                <img src={PlusIcon} className='w-5' alt='Añadir tarea' />
              </button>
            </Tooltip>
          </div>

          <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-1 space-y-3 flex-grow'>
              <div className='flex whitespace-pre-wrap space-x-0 gap-3 '>
                <button className='rounded-xl' onClick={handleRemoveCheckedTasks}>
                  <Chip variant='flat' color='warning' size='sm'>
                    Borrar tareas completadas
                  </Chip>
                </button>
              </div>

              <div className=' max-w-2xl'>
                <TaskList data={data.taskGetListByUser || []} refetch={() => refetch()} />
              </div>
            </div>
          </div>
        </div>

        <TaskAddFormModal isOpen={showAddTaskModal} onClose={() => setShowAddTaskModal(false)} refetch={refetch} />
      </Layout>
    </CourseProvider>
  )
}
