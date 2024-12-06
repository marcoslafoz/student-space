import React from 'react'
import { RegisterForm } from '../register-form'
import { StudentSpaceIcon } from '../../../../common/constants/icons'
import StudentGirl from '/assets/images/webp/girl-student.webp'
import { Link } from 'react-router-dom'

export const RegisterView: React.FC = () => {
  return (
    <>
      <div className='absolute'>
        <div
          style={{ backgroundImage: `url(${StudentSpaceIcon})` }}
          className='size-12 mx-7  bg-no-repeat bg-center bg-cover'
        />
      </div>

      <div className='flex items-center justify-center min-h-screen gap-40 m-6'>
        <div className='flex flex-col gap-6'>
          <RegisterForm />
          <div className='flex flex-col gap-6 mt-3'>
            <div className='flex flex-row justify-center items-center gap-2'>
              <hr className='border-gray-200 px-16  w-10' style={{ borderWidth: 'gray 0.1px' }} />
              <span className='text-gray-300 text-xs'>o</span>
              <hr className='border-gray-200 px-16  w-10' style={{ borderWidth: 'gray 0.1px' }} />
            </div>
            <div className='text-center text-sm text-indigo-600 hover:text-indigo-400'>
              <Link to='/login'>Inicio de sesion</Link>
            </div>
          </div>
        </div>
        <div
          className='fixed bottom-0 right-40 w-60 h-2/4 bg-no-repeat bg-center bg-cover hidden lg:block transform scale-x-[-1] object-contain'
          style={{ backgroundImage: `url(${StudentGirl})` }}
        ></div>
      </div>

      <div className='fixed  bottom-0 left-0 m-4'>
        <p className='text-xs text-gray-400'>Política de privacidad</p>
      </div>
    </>
  )
}
