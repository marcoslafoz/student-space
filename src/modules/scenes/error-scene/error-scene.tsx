import React from 'react'
import { Link } from 'react-router-dom'
import { useRouteError } from 'react-router'
import { Helmet } from 'react-helmet'
import { TextLogo } from '../../components/base'

export const ErrorScene: React.FC = () => {
  const error = useRouteError()
  console.error(error)

  React.useEffect(() => {
    return () => {
      document.title = 'StudentSpace'
    }
  }, [])

  return (
    <>
      <Helmet title={'Oops - StudentSpace'} />

      <Link to={'/'}>
        <div className='absolute top-7 left-7'>
          <TextLogo />
        </div>
      </Link>
      <div className='flex flex-col items-center justify-center h-screen w-screen gap-4  text-gray-800'>
        <h1 className='text-7xl studentspace-bold'>Oops</h1>
        <div className='flex flex-col gap-3'>
          <span className='text-lg'>Página no encontrada</span>
          <Link to={'dashboard'}><div className='text-indigo-600 hover:text-indigo-400 text-xs text-center'>Volver a la página principal</div></Link>
        </div>
      </div>
    </>
  )
}
