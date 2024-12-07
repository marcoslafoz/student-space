import { RouterProvider } from 'react-router'
import { router } from '../common/router'

export const App: React.FC = () => {
  return (
    <main className='font-color-primary dark:text-slate-300'>
      <RouterProvider router={router} />
    </main>
  )
}
