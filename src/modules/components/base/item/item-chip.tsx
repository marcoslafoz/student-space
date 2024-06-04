import { Chip } from '@nextui-org/react'
import React from 'react'
import { Course, Subject } from '../../../../common/types'
import { clsx } from 'clsx'
import { colorClasses } from '../../../../common/constants/colors'

interface ChipItemProps {
  data: Subject | Course
  onClose?: () => void
}

export const ItemChip: React.FC<ChipItemProps> = props => {
  const { data, onClose } = props
  const { name, color = '' } = data

  const [showChip, setShowChip] = React.useState<boolean>(true)

  const { bgLighter: bg, text } = colorClasses[color] || { bgLighter: 'bg-gray-200', text: 'text-gray-500' }

  const handleClose = () => {
    setShowChip(false)
    onClose && onClose()
  }

  return (
    <>
      {showChip && (
        <Chip
          size='sm'
          onClose={onClose && handleClose}
          classNames={{
            base: clsx(bg),
            content: clsx(text, 'px-1'),
            closeButton: clsx(text),
          }}
          variant='flat'
        >
          {name}
        </Chip>
      )}
    </>
  )
}
