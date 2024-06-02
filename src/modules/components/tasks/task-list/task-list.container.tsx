import React, { useContext } from 'react'
import { Task } from '../../../../common/types'
import { Chip } from '@nextui-org/react'
import { TaskAddFormModal } from '../task-form/task-add-form.modal'
import { UserContext } from '../../../../common/context'
import { TaskItem } from '../task-item'
import { useLazyMutationTaskDeleteCheckedList } from '../../../../common/api/apollo/graphql/task'

export interface TaskListProps {
  /** Task array data */
  data: Task[]
  /** Refetch query */
  refetch: () => void
}

/** Task list component */
export const TaskList: React.FC<TaskListProps> = props => {
  const { refetch, data } = props

  const { userId } = useContext(UserContext)
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const [removeCheckedTasks] = useLazyMutationTaskDeleteCheckedList()

  const handleRemoveCheckedTasks = React.useCallback(() => {
    if (!userId) return

    removeCheckedTasks({
      variables: {
        userId: userId,
      },
    }).then(() => refetch())
  }, [refetch, removeCheckedTasks, userId])

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='grid grid-cols-1 space-y-3 flex-grow'>
          <div className='flex whitespace-pre-wrap space-x-0 gap-3 '>
            <button className='rounded-xl' onClick={() => setShowModal(true)}>
              <Chip variant='flat' color='primary' classNames={{ content: 'px-1' }} size='sm' endContent={<></>}>
                Añadir tarea
              </Chip>
            </button>
            <button className='rounded-xl' onClick={handleRemoveCheckedTasks}>
              <Chip variant='flat' color='warning' size='sm'>
                Borrar tareas completadas
              </Chip>
            </button>
          </div>

          <div className='gap-2 flex flex-col'>
            {data.map(task => (
              <TaskItem data={task} refetch={refetch} key={task.id} />
            ))}
          </div>
        </div>
      </div>
      <TaskAddFormModal isOpen={showModal} onClose={() => setShowModal(false)} refetch={refetch} />
    </>
  )
}
