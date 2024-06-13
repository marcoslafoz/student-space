import { createBrowserRouter, Navigate } from 'react-router-dom'
import {
  CourseDetailScene,
  CoursesScene,
  DashboardScene,
  DocumentDetailScene,
  DocumentsScene,
  ErrorScene,
  LoginScene,
  ScoresScene,
  SubjectDetailScene,
  TasksScene,
  EventsScene,
  RegisterScene
} from '../../modules/scenes'
import { authLoader, loginLoader } from './loaders'
import { Layout } from '../../modules/components/layout'

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
    path: 'register',
    element: <RegisterScene />,
    loader: loginLoader,
  },
  {
    element: <Layout />,
    children: [
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
        path: 'courses/detail/:courseId',
        element: <CourseDetailScene />,
        loader: authLoader,
      },
      {
        path: 'courses/detail/:courseId/subject/:subjectId',
        element: <SubjectDetailScene />,
        loader: authLoader,
      },
      {
        path: 'tasks',
        element: <TasksScene />,
        loader: authLoader,
      },
      {
        path: 'documents',
        element: <DocumentsScene />,
        loader: authLoader,
      },
      {
        path: 'documents/detail/:documentId',
        element: <DocumentDetailScene />,
        loader: authLoader,
      },
      {
        path: 'scores',
        element: <ScoresScene />,
        loader: authLoader,
      },
      {
        path: 'events',
        element: <EventsScene />,
        loader: authLoader,
      },
    ],
  },
])
