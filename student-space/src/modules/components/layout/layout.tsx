import { initFlowbite } from 'flowbite'
import React from 'react'
import { Sidebar } from './sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  React.useEffect(() => {
    initFlowbite()
  }, [])

  return (
    <div className='container-fluid dark:bg-gray-800'>
      <Sidebar />
      <div className='p-4 sm:ml-64 md:ml-80 layout-workspace'>
        <div className='p-4 '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
