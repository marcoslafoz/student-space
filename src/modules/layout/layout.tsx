import { initFlowbite } from 'flowbite'
import React, { PropsWithChildren } from 'react'
import { Sidebar } from './sidebar'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {

  React.useEffect(() => {
    initFlowbite()
  }, [])

  return (
    <div className='container-fluid bg-gray-50'>
      <Sidebar />
      <div className="p-4 sm:ml-64 md:ml-80 bg-gray-50  ">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 " >
          {children}
        </div>
      </div>
    </div>
  )
} 