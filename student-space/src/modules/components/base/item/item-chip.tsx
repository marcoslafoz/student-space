import { Chip } from '@nextui-org/react'
import React from 'react'
import { Course, Subject } from '../../../../common/types'
interface ChipItemProps {
  data: Subject | Course
  onClose?: () => void
}

export const ItemChip: React.FC<ChipItemProps> = props => {
  const { data, onClose } = props
  const { name, color } = data

  const [showChip, setShowChip] = React.useState<boolean>(true)

  const handleClose = () => {
    setShowChip(false)
    onClose && onClose()
  }

  return (
    <>
      {showChip && (
        <Chip
          style={{
            backgroundColor: color + '30' || '#9095a0',
            color: color || '#9095a0',
          }}
          size='sm'
          onClose={onClose && handleClose}
          classNames={{
            content: 'px-1',
          }}
          variant='flat'
        >
          {name}
        </Chip>
      )}
    </>
  )
}
