import axios from 'axios'

export const loginQuery  = async (username:string, password:string) => {

  await axios
    .post('http://localhost:8080/auth/login', { username, password }, { withCredentials: true })
    .then((res) => {
      if (res.data) localStorage.setItem('token',res.data)
    })
    .catch(() => {
      localStorage.removeItem('token')
      console.log('Error al iniciar sesion')
    })
}


export const destroyToken = () => {
  
  try{
    localStorage.removeItem('token')
  }catch{
    console.log('Error al eliminar el token')
  }
  
  window.location.reload()

}