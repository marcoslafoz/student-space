import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardScene, ErrorScene, LoginScene } from '../../modules/scenes'
import { authLoader, loginLoader } from './loaders'

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
])
