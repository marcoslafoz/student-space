import { initFlowbite } from 'flowbite'
import React, { PropsWithChildren } from 'react'
import { Sidebar } from './sidebar'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  React.useEffect(() => {
    initFlowbite()
  }, [])

  return (
    <div className='container-fluid dark:bg-gray-800'>
      <Sidebar />
      <div className='p-4 sm:ml-64 md:ml-80 layout-workspace'>
        <div className='p-4 '>
          {children}
        </div>
      </div>
    </div>
  )
}
