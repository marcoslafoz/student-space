import React, { useState, useEffect, useRef } from 'react'
import './layout.scss'
import { useLocation, useNavigate } from 'react-router'
import { clsx } from 'clsx'
import { SidebarPath } from './layout.vm'
import { TextLogo } from '../base/logo'
import { sidebarPaths } from '../../../common/constants/paths'
import { Link } from 'react-router-dom'

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const closeSidebar = () => {
    setIsSidebarOpen(false)
    const backdrop = document.querySelector('[drawer-backdrop]')
    if (backdrop) {
      backdrop.remove()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen])

  useEffect(() => {
    const backdrop = document.querySelector('[drawer-backdrop]')
    if (isSidebarOpen && !backdrop) {
      const newBackdrop = document.createElement('div')
      newBackdrop.setAttribute('drawer-backdrop', '')
      newBackdrop.className = 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30'
      document.body.appendChild(newBackdrop)
    }
  }, [isSidebarOpen])

  return (
    <>
      <button
        data-drawer-target='logo-sidebar'
        data-drawer-toggle='logo-sidebar'
        aria-controls='logo-sidebar'
        type='button'
        className='inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg custom-sm-display-none hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        onClick={toggleSidebar}
      >
        <span className='sr-only'>Open sidebar</span>
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clipRule='evenodd'
            fillRule='evenodd'
            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
          ></path>
        </svg>
      </button>

      <aside
        id='logo-sidebar'
        ref={sidebarRef}
        className={clsx(
          'fixed top-0 left-0 z-40 h-screen transition-transform',
          {
            'translate-x-0': isSidebarOpen,
            '-translate-x-full': !isSidebarOpen,
          },
          'custom-sm-translate-x-0'
        )}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800'>
          <Link to={'dashboard'} onClick={closeSidebar}>
            <div className='m-2 ml-3 mb-12'>
              <TextLogo />
            </div>
          </Link>
          <span className='space-y-3'>
            {sidebarPaths.map(s => (
              <SidebarItem key={s.index} data={s} isActive={location.pathname === s.path} closeSidebar={closeSidebar} />
            ))}
          </span>
        </div>
      </aside>
    </>
  )
}

interface SidebarItemProps {
  isActive?: boolean
  data: SidebarPath
  closeSidebar: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = props => {
  const { isActive = false, data, closeSidebar } = props

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(data.path)
    closeSidebar()
  }

  return (
    <span
      role='button'
      tabIndex={data.index}
      aria-label={data.title}
      data-test-id={`sidebar${data.path}`}
      className={clsx(
        'sidebar-item flex p-3 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100 group',
        isActive && 'bg-gray-100 dark:bg-gray-700'
      )}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
    >
      <img src={data.icon} alt={data.title} />
      <span className='flex-1 ms-4 whitespace-nowrap font-color-secondary'>{data.title}</span>
    </span>
  )
}
