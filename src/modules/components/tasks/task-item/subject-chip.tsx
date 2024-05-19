import { Chip } from '@nextui-org/react'
import React from 'react'
import { Subject } from '../../../../common/types'
import { clsx } from 'clsx'
import { colorClasses } from '../../../../common/constants/colors'

interface SubjectChipProps {
  data: Subject
}

export const SubjectChip: React.FC<SubjectChipProps> = props => {

  const { data } = props
  const { name, color = '' } = data

  const [showChip, setShowChip] = React.useState<boolean>(true)

  const { bg, text } = colorClasses[color] || { bg: 'bg-gray-200', text: 'text-black-500' }

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