import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import '../src/assets/scss/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider } from './common/context/user-context.tsx'
import { ApolloProvider } from '@apollo/client'
import { client } from './common/api/graphql/config.ts'
import { App } from './modules/App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <UserProvider>
    <ApolloProvider client={client}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </ApolloProvider>
  </UserProvider>
  // </React.StrictMode>
)


