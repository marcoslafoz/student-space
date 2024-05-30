import axios from 'axios'

export const loginQuery = async (username: string, password: string) => {
  await axios
    .post(`${import.meta.env.VITE_PROXY}/auth/login`, { username, password }, { withCredentials: true })
    .then(res => {
      if (res.data) localStorage.setItem('jwttoken', res.data)
    })
    .catch(() => {
      localStorage.removeItem('jwttoken')
    })
}

export const destroyJwtToken = () => {
  try {
    localStorage.removeItem('jwttoken')
  } finally {
    window.location.reload()
  }
}
