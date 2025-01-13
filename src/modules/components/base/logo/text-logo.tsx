import React from 'react'
import { Logo } from './logo'

/**
 * Text Logo Component
 * This component represents the application imagotype.
 */

export const TextLogo: React.FC = () => {
  return (
    <div className='inline-flex gap-3 items-center '>
      <span className='w-8 h-8'>
        <Logo />
      </span>
      <span className='custom-font-bold text-3xl'>StudentSpace</span>
    </div>
  )
}
