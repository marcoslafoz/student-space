import axios from 'axios'

export const isAuthenticated = async (): Promise<boolean> => {
  const jwttoken = localStorage.getItem('jwttoken')

  if (!jwttoken) return false

  try {
    const response = await axios.post(`${import.meta.env.VITE_PROXY}/auth/context`, null, {
      headers: {
        Authorization: `Bearer ${jwttoken}`,
      },
      withCredentials: true,
    })
    return response.data.authenticated
  } catch (error) {
    return false
  }
}

export const destroyJwtToken = (): void => {
  try {
    localStorage.removeItem('jwttoken')
  } finally {
    window.location.reload()
  }
}
