import { RouterProvider } from 'react-router'
import { router } from '../common/router'

export const App: React.FC = () => {
  return (
    <main className='text-gray-800 dark:text-slate-300'>
      <RouterProvider router={router} />
    </main>
  )
}
