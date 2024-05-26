/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Checkbox } from '@nextui-org/react'
import { Task } from '../../../../common/types'
import clsx from 'clsx'
import 'moment'
import {
  useLazyMutationSetTaskCheckedData,
} from '../../../../common/api/graphql/mutation'
import { TaskDate } from './task-date'
import { TaskFormModal } from '../task-form/task-form-modal'
import { AddCourseButton } from '../../add-course'

export interface TaskItemProps {
  data: Task
  refetch: () => void
}

export const TaskItem: React.FC<TaskItemProps> = props => {
  const { data, refetch } = props

  const { title, checked: defaultChecked, description, date, id } = data

  const [checked, setChecked] = React.useState<boolean>(defaultChecked)
  const [loading, setLoading] = React.useState(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const [setTaskCheckedData] = useLazyMutationSetTaskCheckedData()

  const handleCheck = async () => {
    try {
      setLoading(true)
      await setTaskCheckedData({ variables: { checked: !checked, taskId: id } })
      setChecked(prevChecked => !prevChecked)
      refetch()
    }finally {
      setLoading(false)
    }
  }

  const style = {
    ...(checked ? { opacity: '50%' } : {}),
    cursor: 'pointer',
  }

  if (loading) return <></>

  return (
    <>
      <div className='grid grid-cols-1 border rounded-lg p-4 gap-y-3' style={style}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3 flex-wrap'>
            <span
              className={clsx('hover:text-gray-400', checked && 'line-through')}
              style={{ cursor: 'pointer' }}
              onClick={() => setShowModal(true)}
            >
              {title}
            </span>

            <TaskDate date={date} />

            <AddCourseButton data={data} refetch={refetch}/>
          </div>

          <div className='ml-2'>
            <Checkbox isSelected={checked} onValueChange={handleCheck} size='lg' />
          </div>
        </div>

        {description && <div className='flex items-center text-xs	text-slate-500 	'>{description}</div>}
      </div>

      <TaskFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        refetch={refetch}
        data={data}
        formType='edit'
      ></TaskFormModal>
    </>
  )
}
