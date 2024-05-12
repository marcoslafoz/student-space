import { RouterProvider } from 'react-router'
import { router } from '../common/router'

export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
