import { RouterProvider } from 'react-router'
import { router } from '../common/router'

export const App: React.FC = () => {
  return (
    <main className='custom-color-primary'>
      <RouterProvider router={router} />
    </main>
  )
}
