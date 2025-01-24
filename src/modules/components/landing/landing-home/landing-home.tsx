import React from 'react'
import { Link } from 'react-router-dom'
import './landing-home.scss'
import StudentGirl from '/assets/images/webp/girl-student.webp'
import { ScrollDownArrow } from '../../base/scroll-down-arrow'

export const LandingHome: React.FC = () => {
  return (
    <>
      <div className='landing-home w-full flex flex-col flex-nowrap'>
        <div className='flex flex-row h-full justify-center lg:gap-10'>
          <div className='items-center justify-end h-full flex'>
            <div className='break-keep flex flex-col flex-nowrap gap-9 p-10 max-w-2xl'>
              <h1 className='text-5xl montserrat-font-extrabold tracking-tight'>
                ORGANIZA TU VIDA,
                <br /> SIMPLIFICA TU ESTUDIO
              </h1>
              <p>
                Digitaliza tu agenda y gestiona tareas, eventos, notas y documentos en un solo lugar. Regístrate gratis
                y lleva tu estudio al siguiente nivel.
              </p>
              <Link to={'/register'}>
                <button className='font-bold rounded-full w-fit px-6 py-3 custom-bg-color-primary text-white hover:opacity-90'>
                  <h2>Pruebalo</h2>
                </button>
              </Link>
            </div>
          </div>

          <div className='items-end flex'>
            <figure
              className='w-80 h-5/6 bg-no-repeat bg-center bg-cover hidden lg:block transform scale-x-[-1] object-contain'
              style={{ backgroundImage: `url(${StudentGirl})` }}
            ></figure>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div className='landing-home-arrow-lg hidden md:block sm:hidden'>
            <ScrollDownArrow />
          </div>
          <div className='landing-home-arrow-sm block sm:block md:hidden'>
            <ScrollDownArrow />
          </div>
        </div>
      </div>
    </>
  )
}
