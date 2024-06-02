import React from 'react'
import clsx from 'clsx'
import { Course, Subject } from '../../../common/types'
import { colorClasses } from '../../../common/constants/colors'

interface ItemCardProps {
  data: Course | Subject
}

export const ItemCard: React.FC<ItemCardProps> = props => {
  const { data } = props
  const { name, color = '' } = data

  const { bgDarker } = colorClasses[color] || {
    bgLighter: 'bg-gray-200',
    text: 'text-gray-500',
    bgDarker: 'bg-gray-500',
  }

  return (
    <>
      <div className={clsx('py-8 px-10 rounded-xl', bgDarker, 'hover:opacity-75')}>
        <div className='grid grid-cols-1 space-y-3 flex-grow'>
          <span className='text-white text-sm  text-center'>{name}</span>
        </div>
      </div>
    </>
  )
}
