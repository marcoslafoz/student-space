import React from 'react'
import clsx from 'clsx'
import { Course, Subject } from '../../../../common/types'

interface ItemCardProps {
  data: Course | Subject
}

export const ItemCard: React.FC<ItemCardProps> = props => {
  const { data } = props
  const { name, color } = data

  return (
    <>
      <div style={{ backgroundColor: color || '#9095a0' }} className={clsx('py-8 px-10 rounded-xl hover:opacity-75')}>
        <div className='grid grid-cols-1 space-y-3 flex-grow'>
          <span className='text-white text-sm  text-center'>{name}</span>
        </div>
      </div>
    </>
  )
}
