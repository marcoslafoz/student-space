/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Checkbox } from '@nextui-org/react'
import { Task } from '../../../../common/types'
import clsx from 'clsx'
import 'moment'
import { TaskDate } from './task-date'
import { TaskEditFormModal } from '../task-form/task-edit-form.modal'
import { useLazyMutationTaskSetCheckedData } from '../../../../common/api/apollo/graphql/task'

export interface TaskItemProps {
  /** Task data */
  data: Task
  /** Refetch query */
  refetch: () => void
}

/** Task item component */
export const TaskItem: React.FC<TaskItemProps> = props => {
  const { data, refetch } = props

  const { title, checked: defaultChecked, description, date, id } = data

  const [checked, setChecked] = React.useState<boolean>(defaultChecked)
  const [loading, setLoading] = React.useState(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const [setTaskCheckedData] = useLazyMutationTaskSetCheckedData()

  const handleCheck = async () => {
    try {
      setLoading(true)
      await setTaskCheckedData({ variables: { checked: !checked, taskId: id } })
      setChecked(prevChecked => !prevChecked)
      refetch()
    } finally {
      setLoading(false)
    }
  }

  const style = {
    ...(checked ? { opacity: '50%' } : {}),
  }

  if (loading) return <></>

  return (
    <>
      <div className='grid grid-cols-1 border rounded-lg p-4 gap-y-3 cursor-pointer ' style={style}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3 flex-wrap'>
            <span
              className={clsx('hover:text-gray-400 cursor-pointer', checked && 'line-through')}
              onClick={() => setShowModal(true)}
            >
              {title}
            </span>

            <TaskDate date={date} />
          </div>

          <div className='ml-2'>
            <Checkbox isSelected={checked} onValueChange={handleCheck} size='lg' />
          </div>
        </div>

        {description && <div className='flex items-center text-xs	text-slate-500 	'>{description}</div>}
      </div>

      <TaskEditFormModal isOpen={showModal} onClose={() => setShowModal(false)} refetch={refetch} data={data} />
    </>
  )
}
