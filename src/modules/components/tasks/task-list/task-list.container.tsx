import React from 'react'
import { Task } from '../../../../common/types'
import { TaskItem } from '../task-item'

export interface TaskListProps {
  data: Task[]
}

export const TaskList: React.FC<TaskListProps> = props => {
  const { data } = props

  return (
    <>
      <div className='grid grid-cols-1 gap-y-2'>
        {data.map((t) => (
          <TaskItem key={t.id} data={t} />
        ))}
      </div>
    </>
  )
}
