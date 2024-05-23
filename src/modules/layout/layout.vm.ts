import {
  DashboardIcon,
  AcademicCourseIcon,
  TaskIcon,
  DocumentsIcon,
  EventsIcon,
  SettingsIcon,
} from '../../common/constants/icons'

export interface SidebarRoute {
  title: string
  icon: string
  path: string
  index: number
}

export const sidebarRoutes: SidebarRoute[] = [
  { title: 'Inicio', icon: DashboardIcon, path: '/dashboard', index: 0 },
  { title: 'Cursos académicos', icon: AcademicCourseIcon, path: '/courses', index: 1 },
  { title: 'Tareas', icon: TaskIcon, path: '/tasks', index: 2 },
  { title: 'Documentos', icon: DocumentsIcon, path: '/', index: 3 },
  { title: 'Eventos', icon: EventsIcon, path: '/', index: 4 },
  { title: 'Ajustes', icon: SettingsIcon, path: '/', index: 5 },
]
