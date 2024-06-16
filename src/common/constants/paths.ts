import { SidebarPath } from '../../modules/components/layout/layout.vm'
import { DashboardIcon, CourseIcon, TaskIcon, DocumentsIcon, EventsIcon, SettingsIcon, AwardIcon } from './icons'

export const sidebarPaths: SidebarPath[] = [
  { title: 'Inicio', icon: DashboardIcon, path: '/dashboard', index: 0 },
  { title: 'Cursos', icon: CourseIcon, path: '/courses', index: 1 },
  { title: 'Tareas', icon: TaskIcon, path: '/tasks', index: 2 },
  { title: 'Documentos', icon: DocumentsIcon, path: '/documents', index: 3 },
  { title: 'Notas', icon: AwardIcon, path: '/scores', index: 4 },
  { title: 'Eventos', icon: EventsIcon, path: '/events', index: 5 },
  { title: 'Ajustes', icon: SettingsIcon, path: '/settings', index: 6 },
]
