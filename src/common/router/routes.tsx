import { createBrowserRouter } from 'react-router-dom'
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
  RegisterScene,
  SettingsScene,
  LandingScene,
} from '../../modules/scenes'
import { authLoader, loginLoader } from './loaders'
import { Layout } from '../../modules/components/layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingScene />,
    errorElement: <ErrorScene />,
    loader: loginLoader,
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
    loader: authLoader,
    children: [
      {
        path: 'dashboard',
        element: <DashboardScene />,
      },
      {
        path: 'courses',
        element: <CoursesScene />,
      },
      {
        path: 'courses/detail/:courseId',
        element: <CourseDetailScene />,
      },
      {
        path: 'courses/detail/:courseId/subject/:subjectId',
        element: <SubjectDetailScene />,
      },
      {
        path: 'tasks',
        element: <TasksScene />,
      },
      {
        path: 'documents',
        element: <DocumentsScene />,
      },
      {
        path: 'documents/detail/:documentId',
        element: <DocumentDetailScene />,
      },
      {
        path: 'scores',
        element: <ScoresScene />,
      },
      {
        path: 'events',
        element: <EventsScene />,
      },
      {
        path: 'settings',
        element: <SettingsScene />,
      },
    ],
  },
])
