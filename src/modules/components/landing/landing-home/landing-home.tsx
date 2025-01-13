import React from 'react'
import { Link } from 'react-router-dom'
import './landing-home.scss'
import StudentGirl from '/assets/images/webp/girl-student.webp'
import { ScrollDownArrow } from '../../base/scroll-down-arrow'

export const LandingHome: React.FC = () => {
  return (
    <>
      <div className='landing-home w-full flex flex-col flex-nowrap '>
        <div className=' flex flex-row h-full  justify-center lg:gap-10'>
          <div className='items-center justify-end h-full flex  '>
            <div className=' break-keep flex flex-col flex-nowrap gap-9 p-10  max-w-2xl '>
              <div className='text-5xl montserrat-font-extrabold font-extrabold tracking-tight	'>
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

          <div className='items-end flex'>
            <div
              className='w-80 h-5/6 bg-no-repeat bg-center bg-cover hidden  lg:block transform scale-x-[-1] object-contain'
              style={{ backgroundImage: `url(${StudentGirl})` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
