import React, { createContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

interface UserContextType {
  userID: number | null
  authenticated: boolean
  loading: boolean
}

export const UserContext = createContext<UserContextType>({
  userID: null,
  authenticated: false,
  loading: true,
})

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userID, setUserID] = useState<number | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      const jwttoken = localStorage.getItem('jwttoken')?.toString()

      if (!jwttoken) {
        setLoading(false)
        return false
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_PROXY}/auth/context`, null, {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
          withCredentials: true,
        })
        setUserID(response.data.userID)
        setAuthenticated(response.data.authenticated)
      } catch (error) {
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    getUserData()
  }, [])

  if (loading) {
    return <></>
  }

  return <UserContext.Provider value={{ userID, loading, authenticated }}>{children}</UserContext.Provider>
}
