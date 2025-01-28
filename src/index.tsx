import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import '../src/assets/scss/main.scss'
import { UserProvider } from './common/context/user-context.tsx'
import { ApolloProvider } from '@apollo/client'
import { client } from './common/api/apollo/config/client.ts'
import { App } from './modules/App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <UserProvider>
    <ApolloProvider client={client}>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </ApolloProvider>
  </UserProvider>
  // </React.StrictMode>
)
