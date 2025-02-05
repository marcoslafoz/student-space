import { RouterProvider } from 'react-router'
import { router } from '../common/router'
import { Helmet } from 'react-helmet'

export const App: React.FC = () => {
  return (
    <main className='custom-color-primary'>
      <Helmet title={'StudentSpace'} />
      <RouterProvider router={router} />
    </main>
  )
}
