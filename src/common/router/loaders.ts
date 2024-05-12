import { redirect } from 'react-router'
import { isAuthenticated } from '../api/endpoints/auth-context'

export async function loginLoader() {
  const authenticated = await isAuthenticated()

  if (authenticated) {
    return redirect('/')
  }

  return null
}

export async function authLoader() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return redirect('/login')
  }

  return null
}
