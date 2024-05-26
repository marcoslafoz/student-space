import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_PROXY}/graphql`,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwttoken')
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }
  return forward(operation)
})

const link = ApolloLink.from([authMiddleware, httpLink])

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})
