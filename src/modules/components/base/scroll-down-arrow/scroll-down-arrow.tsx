import React from 'react'
import './scroll-down-arrow.scss'

/**
 * Scroll down component
 */
export const ScrollDownArrow: React.FC = () => {
  return (
    <div className='scroll-arrow-down inline-flex items-center justify-center '>
      <svg xmlns='http://www.w3.org/2000/svg' width={48} height={48}>
        <path
          stroke='#2e2e2e'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={4}
          d='M24 10v28m0 0 14-14M24 38 10 24'
        />
      </svg>
    </div>
  )
}
