/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Checkbox } from '@nextui-org/react'
import { Task } from '../../../../common/types'
import clsx from 'clsx'
import 'moment'
import { TaskDate } from './task-date'
import { TaskEditFormModal } from '../task-form/task-edit-form.modal'
import {
  useLazyMutationTaskDelete,
  useLazyMutationTaskSetCheckedData,
} from '../../../../common/api/apollo/graphql/task'
import { TrashIcon } from '../../../../common/constants/icons'

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
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const [setTaskCheckedData] = useLazyMutationTaskSetCheckedData()
  const [removeTaskMutation] = useLazyMutationTaskDelete()

  const handleCheck = React.useCallback(() => {
    setTaskCheckedData({ variables: { checked: !checked, taskId: id } })
      .then(() => {
        setChecked(prevChecked => !prevChecked)
      })
      .finally(() => refetch())
  }, [checked, id, refetch, setTaskCheckedData])

  const handleRemoveTask = React.useCallback(() => {
    removeTaskMutation({
      variables: { taskId: id },
    }).then(() => refetch())
  }, [id, refetch, removeTaskMutation])

  const style = {
    ...(checked ? { opacity: '50%' } : {}),
  }

  return (
    <>
      <div className='group grid grid-cols-1 border rounded-lg p-4 gap-y-3 cursor-pointer ' style={style}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3 flex-wrap'>
            <Checkbox isSelected={checked} onValueChange={handleCheck} size='lg' />
            <span
              className={clsx('hover:text-gray-400 cursor-pointer', checked && 'line-through')}
              onClick={() => setShowModal(true)}
            >
              {title}
            </span>

            <TaskDate date={date} />
          </div>
          <button className='hidden group-hover:block' onClick={handleRemoveTask}>
            <img src={TrashIcon} alt='delete'></img>
          </button>
        </div>

        {description && (
          <div className='flex items-center text-xs text-slate-500 pl-11 w-full break-words whitespace-normal'>
            {description}
          </div>
        )}
      </div>

      <TaskEditFormModal isOpen={showModal} onClose={() => setShowModal(false)} refetch={refetch} data={data} />
    </>
  )
}
