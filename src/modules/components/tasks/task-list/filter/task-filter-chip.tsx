import { Chip } from '@nextui-org/react'
import React from 'react'
import { AcademicCourse, Subject } from '../../../../../common/types'
import { clsx } from 'clsx'
import { colorClasses } from '../../../../../common/constants/colors'

interface TaskFilterChipProps {
  data: Subject | AcademicCourse
  onClick: () => void
  selected: boolean
}

export const TaskFilterChip: React.FC<TaskFilterChipProps> = props => {
  const { data, onClick, selected : defaultSelected } = props
  const { name, color = '' } = data
  const [selected, setSelected] = React.useState<boolean>(defaultSelected)
  const { bg, text } = colorClasses[color] || { bg: 'bg-gray-200', text: 'text-gray-500' }

  const handleClick = () => {
    setSelected(!selected)
    onClick()
  }

  return (
    <>
      <Chip
        style={{ cursor: 'pointer' }}
        size='sm'
        onClick={handleClick}
        classNames={{
          base: clsx(selected ? bg : 'bg-gray-100'),
          content: clsx(selected ? text : 'text-gray-400', 'px-1'),
          closeButton: clsx(selected ? text : 'text-gray-400'),
        }}
        variant='flat'
      >
        {name}
      </Chip>
    </>
  )
}
