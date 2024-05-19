import { Chip } from '@nextui-org/react'
import React from 'react'
import { AcademicCourse } from '../../../../common/types'
import { clsx } from 'clsx'
import { colorClasses } from '../../../../common/constants/colors'

interface CourseChipProps {
  data: AcademicCourse;
}

export const CourseChip: React.FC<CourseChipProps> = props => {
  const { data } = props
  const { name, color = '' } = data

  const [showChip, setShowChip] = React.useState<boolean>(true)

  const { bg, text } = colorClasses[color] || { bg: 'bg-gray-200', text: 'text-gray-500' }

  return (
    <>
      {
        showChip &&
        <Chip
          size='sm'
          onClose={() => setShowChip(false)}
          classNames={{
            base: clsx(bg),
            content: clsx(text, 'px-1'),
            closeButton: clsx(text)
          }}
          variant="flat">
          {name}
        </Chip>
      }
    </>
  )
}
