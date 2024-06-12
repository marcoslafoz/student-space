import React from 'react'
import { Link } from 'react-router-dom'
import { StudentSpaceIcon } from '../../../common/constants/icons'
import { useRouteError } from 'react-router'
import { Helmet } from 'react-helmet'

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
      <Helmet title='Error - StudentSpace' />
      <div className='fixed'>
        <div
          style={{ backgroundImage: `url(${StudentSpaceIcon})` }}
          className='size-12 m-7  bg-no-repeat bg-center bg-cover'
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100 text-gray-800">
        <h1 className="text-7xl text-bold">Oops</h1>
        <div className='flex flex-col gap-2'>
          <span className="text-lg">Página no encontrada</span>
          <Link to={'dashboard'} >
            <div className="text-indigo-600 hover:text-indigo-400 text-xs font-semibold text-center">
              Volver a la página principal
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
