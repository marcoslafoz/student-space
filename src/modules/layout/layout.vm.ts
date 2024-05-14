import {
  DashboardIcon,
  AcademicCourseIcon,
  SubjectIcon,
  TaskIcon,
  DocumentsIcon,
  EventsIcon,
  SettingsIcon,
} from '../../common/utils/icons'

export interface SidebarRoute {
  title: string
  icon: string
  path: string
  index: number
}

export const sidebarRoutes: SidebarRoute[] = [
  { title: 'Inicio', icon: DashboardIcon, path: '/dashboard', index: 0 },
  { title: 'Cursos académicos', icon: AcademicCourseIcon, path: '/courses', index: 1 },
  { title: 'Asignaturas', icon: SubjectIcon, path: '/', index: 2 },
  { title: 'Tareas', icon: TaskIcon, path: '/', index: 3 },
  { title: 'Documentos', icon: DocumentsIcon, path: '/', index: 4 },
  { title: 'Eventos', icon: EventsIcon, path: '/', index: 5 },
  { title: 'Ajustes', icon: SettingsIcon, path: '/', index: 6 },
]
