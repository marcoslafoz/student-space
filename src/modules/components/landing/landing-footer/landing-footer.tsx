import React from 'react'
import { Logo } from '../../base/logo'
import { Link } from 'react-router-dom'
import './landing-footer.scss'

export const LandingFooter: React.FC = () => {
  return (
    <>
      <div className='landing-footer w-full'>
        <span className='text-gray-500'>Footer</span>
      </div>
    </>
  )
}
