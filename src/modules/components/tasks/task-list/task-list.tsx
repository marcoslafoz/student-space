import React from 'react'
import { Task } from '../../../../common/types'
import { TaskItem } from '../task-item'

export interface TaskListProps {
  /** Task array data */
  data: Task[]
  /** Refetch query */
  refetch: () => void
}

/** Task list component */
export const TaskList: React.FC<TaskListProps> = props => {
  const { refetch, data } = props

  return (
    <>
      <div className='gap-2 flex flex-col'>
        {data.map(task => (
          <TaskItem data={task} refetch={refetch} key={task.id} />
        ))}
      </div>
    </>
  )
}
