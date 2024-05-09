import axios from 'axios'

export const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem('token')

  if (!token) return false

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PROXY}/auth/context`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    )
    return response.data.authenticated
  } catch (error) {
    return false
  }
}
