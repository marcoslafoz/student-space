import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardScene, ErrorScene, LoginScene, TasksScene } from '../../modules/scenes'
import { authLoader, loginLoader } from './loaders'
import { CoursesScene } from '../../modules/scenes/courses'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/dashboard' />,
    errorElement: <ErrorScene />,
    loader: authLoader,
  },
  {
    path: 'login',
    element: <LoginScene />,
    loader: loginLoader,
  },
  {
    path: 'dashboard',
    element: <DashboardScene />,
    loader: authLoader,
  },
  {
    path: 'courses',
    element: <CoursesScene />,
    loader: authLoader,
  },
  {
    path: 'tasks',
    element: <TasksScene/>,
    loader: authLoader,
  },
])
