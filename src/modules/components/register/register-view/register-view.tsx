import React from 'react'
import { RegisterForm } from '../register-form'
import { Link } from 'react-router-dom'
import { TextLogo } from '../../base'
import { Helmet } from 'react-helmet'

export const RegisterView: React.FC = () => {
  return (
    <>
      <Helmet title={'StudentSpace - Registrarse'} />

      <Link to={'/'}>
        <div className='absolute top-7 left-7'>
          <TextLogo />
        </div>
      </Link>

      <div className='flex items-center justify-center h-screen'>
        <div className='flex items-center justify-center gap-40'>
          <div className='flex flex-col gap-9'>
            <RegisterForm />

            <div className='flex flex-col justify-center gap-8'>
              <div className='flex flex-row justify-center items-center gap-2'>
                <hr className='border-gray-200  px-16 w-10' />
                <span className='text-gray-300 text-xs'>o</span>
                <hr className='border-gray-200  px-16 w-10' />
              </div>
              <div className='text-center text-sm text-indigo-600 hover:text-indigo-400'>
                <Link to={'/login'}>Iniciar sesión</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
