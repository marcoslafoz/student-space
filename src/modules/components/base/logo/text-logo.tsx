import React from 'react'
import { Logo } from './logo'
import './logo.scss'

/**
 * Text Logo Component
 * This component represents the application imagotype.
 */
export const TextLogo: React.FC = () => {
  return (
    <div className='inline-flex gap-3 items-center bg-red-s500 '>
      <span className='w-8 h-8'>
        <Logo />
      </span>

      <span className='custom-font-bold text-3xl'>StudentSpace</span>

      <span className='text-[10px] opacity-80 uppercase font-semibold px-1.5 rounded-md text-white bg-beta'>Beta</span>
    </div>
  )
}
