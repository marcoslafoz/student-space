import axios from 'axios'

export const isAuthenticated = async (): Promise<boolean> => {
  
  const token = localStorage.getItem('token')?.toString()

  if(!token) return false

  try {
    const response = (await axios.post(`${import.meta.env.VITE_PROXY}/auth/context`, null, { params: { token } }))
    return response.data.authenticated
  } catch (error) {
    return false
  }
}

