import { createBrowserRouter, Navigate } from 'react-router-dom'
import {
  DashboardScene,
  DocumentDetailScene,
  DocumentsScene,
  ErrorScene,
  LoginScene,
  SubjectDetailScene,
  TasksScene,
} from '../../modules/scenes'
import { authLoader, loginLoader } from './loaders'
import { CoursesScene } from '../../modules/scenes/courses'
import { CourseDetailScene } from '../../modules/scenes/courses/course-detail-scene'

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
])
