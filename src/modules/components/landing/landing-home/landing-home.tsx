import React from 'react'
import { Logo } from '../../base/logo'
import { Link } from 'react-router-dom'
import './landing-home.scss'
import StudentGirl from '/assets/images/webp/girl-student.webp'

export const LandingHome: React.FC = () => {
  return (
    <>
      <div className='landing-home w-full bg-white flex flex-col flex-nowrap '>
        
        {/* Header */}
        <div className='flex flex-row flex-wrap justify-between items-center w-full px-7 py-4 gap-5 '>
          {/*Logo*/}
          <div className='inline-flex gap-3 items-center '>
            <span className='w-8 h-8'>
              <Logo />
            </span>
            <span className='custom-font-bold '>StudentSpace</span>
          </div>

          {/* Login & register */}
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

        {/* Content */}
        <div className=' flex flex-row h-full bg-green-200X justify-center gap-56'>
          
          <div className='items-center justify-end h-full flex bg-red-400X '>

            <div className=' break-keep flex flex-col flex-nowrap gap-9 p-10 bg-blue-300X max-w-2xl '>
              <div className='text-5xl montserrat-font-extrabold font-extrabold'>
                ORGANIZA TU VIDA,
                <br /> SIMPLIFICA TU ESTUDIO
              </div>
              <div>
                Digitaliza tu agenda y gestiona tareas, eventos, notas y documentos en un solo lugar. Regístrate gratis
                y lleva tu estudio al siguiente nivel.
              </div>
              <Link to={'/register'}>
                <div className='font-bold rounded-full w-fit  px-6 py-3 custom-bg-color-primary text-white'>
                  Pruebalo
                </div>
              </Link>
            </div>
          </div>

          <div className='items-end flex bg-red-600X'>
            
            <div
              className='w-80 h-5/6 bg-no-repeat bg-center bg-cover hidden TODO: QUITAR HIDDEN  lg:block transform scale-x-[-1] object-contain'
              style={{ backgroundImage: `url(${StudentGirl})` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
