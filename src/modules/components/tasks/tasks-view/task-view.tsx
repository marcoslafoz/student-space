import { Chip, Tooltip } from '@nextui-org/react'
import React from 'react'
import { PlusIcon } from '../../../../common/constants/icons'
import { TaskList } from '../task-list'
import { Task } from '../../../../common/types'
import { useLazyMutationTaskDeleteCheckedList } from '../../../../common/api/apollo/graphql/task'
import { UserContext } from '../../../../common/context'
import { TaskAddFormModal } from '../task-form'

interface TasksViewProps {
  data: Task[]
  refetch: () => void
}

export const TasksView: React.FC<TasksViewProps> = props => {
  const { data, refetch } = props

  const { userId } = React.useContext(UserContext)

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

  const checkedTasks: boolean = data.filter(t => t.checked).length > 0

  return (
    <>
      <div className='grid grid-cols-1'>
        <div className='pb-3 flex items-center gap-2 flex-wrap'>
          <span className='text-xl'>Tareas</span>
          <Tooltip closeDelay={0} content='Añadir tarea'>
            <button className='rounded-full' onClick={() => setShowAddTaskModal(true)}>
              <img src={PlusIcon} className='w-5' alt='Añadir tarea' />
            </button>
          </Tooltip>
          {checkedTasks && (
            <div className='flex whitespace-pre-wrap space-x-0 gap-3 '>
              <button className='rounded-xl' onClick={handleRemoveCheckedTasks}>
                <Chip variant='flat' color='warning' size='sm'>
                  Borrar tareas completadas
                </Chip>
              </button>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-6'>
          <div className='grid grid-cols-1 space-y-3 flex-grow'>
            <div className=' max-w-2xl'>
              <TaskList data={data} refetch={() => refetch()} />
            </div>
          </div>
        </div>
      </div>

      <TaskAddFormModal isOpen={showAddTaskModal} onClose={() => setShowAddTaskModal(false)} refetch={refetch} />
    </>
  )
}
