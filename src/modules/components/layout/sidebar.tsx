import React from 'react'
import { MoonIcon } from '../../../common/constants/icons'
import './layout.scss'
import { useLocation, useNavigate } from 'react-router'
import { clsx } from 'clsx'
import { SidebarRoute, sidebarRoutes } from './layout.vm'
import { Logo } from '../base/logo'

export const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <button
        data-drawer-target='logo-sidebar'
        data-drawer-toggle='logo-sidebar'
        aria-controls='logo-sidebar'
        type='button'
        className='inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-700 dark:focus:ring-gray-600'
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
        className='fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0'
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800'>
          <span className='inline-flex gap-3 items-center sidebar-logo pl-3'>
            <span className='w-8 h-8'>
              <Logo />
            </span>
            <span className='text-bold font-size-2'>StudentSpace</span>
          </span>
          <span className='space-y-3'>
            {sidebarRoutes.map(s => (
              <SidebarItem key={s.index} data={s} isActive={location.pathname === s.path} />
            ))}
            <DarkMode />
          </span>
        </div>
      </aside>
    </>
  )
}

interface SidebarItemProps {
  isActive?: boolean
  data: SidebarRoute
}

const SidebarItem: React.FC<SidebarItemProps> = props => {
  const { isActive = false, data } = props

  const navigate = useNavigate()

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <span
      role='button'
      tabIndex={data.index}
      aria-label={data.title}
      className={clsx(
        'sidebar-item flex p-3 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100 group',
        isActive && 'bg-gray-100 dark:bg-gray-700'
      )}
      onClick={() => navigate(data.path)}
    >
      <img src={data.icon} alt={data.title} />
      <span className='flex-1 ms-4 whitespace-nowrap font-color-secondary'>{data.title}</span>
    </span>
  )
}

const DarkMode: React.FC = () => {
  const [dark, setDark] = React.useState(false)

  const darkModeHandler = () => {
    setDark(!dark)
    document.body.classList.toggle('dark')
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <span
      className={clsx('sidebar-item flex p-3 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100 group')}
      onClick={() => darkModeHandler()}
    >
      <img src={MoonIcon} alt={'Toggle Darkmode'} />
      <span className='flex-1 ms-4 whitespace-nowrap font-color-secondary'>Darkmode</span>
    </span>
  )
}
