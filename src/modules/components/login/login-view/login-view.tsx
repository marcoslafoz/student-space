import React from 'react'
import { LoginFormUsername } from '../login-form'
import { StudentSpaceIcon } from '../../../../common/constants/icons'

export const LoginView: React.FC = () => {
  return (
    <>
      <div className='fixed'>
        <div
          style={{ backgroundImage: `url(${StudentSpaceIcon})` }}
          className='size-12 mx-7  bg-no-repeat bg-center bg-cover'
        />
      </div>

      <div className='flex items-center justify-center min-h-screen gap-40 m-6'>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-3'>
            <p className='font-color-primary text-3xl text-bold max-w-sm'>Nos alegramos de volver a verte</p>
            <p className='text-gray-400 max-w-sm'>Introduce el nombre de usuario o email asociado a tu cuenta.</p>
          </div>
          <LoginFormUsername />
          <div className='flex flex-col justify-center gap-5'>
            <div className='flex flex-row justify-center items-center gap-2'>
              <hr className='border-gray-200 px-16  w-10' style={{ borderWidth: 'gray 0.1px' }} />
              <span className='text-gray-300 text-xs'>o</span>
              <hr className='border-gray-200 px-16  w-10' style={{ borderWidth: 'gray 0.1px' }} />
            </div>
            <div className='text-center text-sm text-indigo-600'>Crear cuenta</div>
          </div>
        </div>
        <div
          className='hidden lg:block w-48 h-48 bg-no-repeat bg-center bg-cover'
          style={{ backgroundImage: `url(${StudentSpaceIcon})` }}
        ></div>
      </div>

      <div className='fixed  bottom-0 left-0 m-4'>
        <p className='text-xs text-gray-400'>Política de privacidad</p>
      </div>
    </>
  )
}
