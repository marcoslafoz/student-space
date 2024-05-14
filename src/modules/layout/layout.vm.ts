
import { DashboardIcon } from '../../common/utils/icons'

export interface SidebarRoute {
  title: string
  icon: string
  path: string
  index: number
}

export const sidebarRoutes: SidebarRoute[] = [
  { title: 'Dashboard', icon: DashboardIcon, path: '/dashboard', index: 0 },
  { title: 'Courses', icon: DashboardIcon, path: '/courses', index: 1 }
]