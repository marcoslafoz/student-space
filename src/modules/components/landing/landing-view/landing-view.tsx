import React from 'react'

import { LandingHome } from '../landing-home'
import { LandingDemo } from '../landing-demo'
import { TextLogo } from '../../base'
import { Link } from 'react-router-dom'
import { LandingFooter } from '../landing-footer'

export const LandingView: React.FC = () => {
  return (
    <div className='w-full flex flex-nowrap flex-col '>
      <div className='flex flex-row flex-wrap justify-between items-center w-full px-7 pb-4 pt-5 gap-5 '>
        <TextLogo />
        <div className='inline-flex gap-9 items-center justify-between'>
          <Link to={'/login'}>
            <div className='font-bold'>Iniciar sesion</div>
          </Link>

          <Link to={'/register'}>
            <div className='font-bold rounded-full w-auto px-6 py-3 custom-bg-color-primary text-white '>
              Registrarse
            </div>
          </Link>
        </div>
      </div>

      <LandingHome />
      {/* <LandingDemo /> */}
      <LandingFooter />
    </div>
  )
}
