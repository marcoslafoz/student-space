import React from 'react'
import { LoginFormUsername } from '../login-form'
import { StudentSpaceIcon } from '../../../../common/constants/icons'
import { Link } from 'react-router-dom'
import { TextLogo } from '../../base'
import { Helmet } from 'react-helmet'

export const LoginView: React.FC = () => {
  return (
    <>
      <Helmet title={'StudentSpace - Iniciar sesión'} />

      <Link to={'/'}>
        <div className='absolute top-7 left-7'>
          <TextLogo />
        </div>
      </Link>

      <div className='flex items-center justify-center h-screen'>
        <div className='flex items-center justify-center gap-40'>
          <div className='flex flex-col gap-9'>
            <div className='flex flex-col gap-4'>
              <p className='custom-color-primary text-3xl custom-font-bold max-w-sm'>
                Nos alegramos de <br />
                volver a verte
              </p>
              <p className='text-gray-400 max-w-xs text-sm'>
                Introduce el nombre de usuario o email asociado a tu cuenta.
              </p>
            </div>

            <LoginFormUsername />

            <div className='flex flex-col justify-center gap-8'>
              <div className='flex flex-row justify-center items-center gap-2'>
                <hr className='border-gray-200  px-16 w-10' />
                <span className='text-gray-300 text-xs'>o</span>
                <hr className='border-gray-200  px-16 w-10' />
              </div>
              <div className='text-center text-sm text-indigo-600 hover:text-indigo-400'>
                <Link to={'/register'}>Crear cuenta</Link>
              </div>
            </div>
          </div>

          <div
            className='hidden lg:block w-48 h-48 bg-no-repeat bg-center bg-cover'
            style={{ backgroundImage: `url(${StudentSpaceIcon})` }}
          />
        </div>
      </div>
    </>
  )
}
