/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Checkbox, Tooltip } from '@nextui-org/react'
import { Task } from '../../../../common/types'
import clsx from 'clsx'
import 'moment'
import { TaskDate } from './task-date'
import { TaskEditFormModal } from '../task-form/task-edit-form.modal'
import {
  useLazyMutationTaskDelete,
  useLazyMutationTaskSetCheckedData,
} from '../../../../common/api/apollo/graphql/task'
import { DeleteIcon, EditIcon } from '../../base/nextui-icons'

export interface TaskItemProps {
  /** Task data */
  data: Task
  /** Refetch query */
  refetch: () => void
  /** Display description @default true */
  enableDescription?: boolean
}

/** Task item component */
export const TaskItem: React.FC<TaskItemProps> = props => {
  const { data, refetch, enableDescription = true } = props

  const { title, checked: defaultChecked, description, date, id } = data

  const [checked, setChecked] = React.useState<boolean>(defaultChecked)
  const [showEditTaskModal, setShowEditTaskModal] = React.useState<boolean>(false)

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
      <div className='group grid grid-cols-1 border rounded-lg p-4 gap-y-1 cursor-pointer ' style={style}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3 flex-wrap'>
            <Checkbox isSelected={checked} onValueChange={handleCheck} size='lg' />
            <span
              className={clsx('hover:text-gray-400 cursor-pointer', checked && 'line-through')}
              onClick={() => setShowEditTaskModal(true)}
            >
              {title}
            </span>

            <TaskDate date={date} />
          </div>
          <div className='flex flex-row flex-wrap gap-3'>
            <button className='hidden group-hover:block' onClick={() => setShowEditTaskModal(true)}>
              <Tooltip content='Editar tarea' closeDelay={0}>
                <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                  <EditIcon />
                </span>
              </Tooltip>
            </button>
            <button className='hidden group-hover:block' onClick={handleRemoveTask}>
              <Tooltip content='Eliminar tarea' color='danger' closeDelay={0}>
                <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                  <DeleteIcon />
                </span>
              </Tooltip>
            </button>
          </div>
        </div>

        {enableDescription && description && (
          <div className='flex items-center text-xs text-slate-500 pl-11 w-full break-words whitespace-normal'>
            {description}
          </div>
        )}
      </div>

      <TaskEditFormModal
        isOpen={showEditTaskModal}
        onClose={() => setShowEditTaskModal(false)}
        onRefetch={refetch}
        data={data}
      />
    </>
  )
}
