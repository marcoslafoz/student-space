import React, { useState } from 'react'
import { isAuthenticated } from '../../../common/api/endpoints/authContext'
import { loginQuery } from '../../../common/api/endpoints/login'
export const LoginScene: React.FC = () => {
  const [username, setUsername] = useState('marcos')
  const [password, setPassword] = useState('marcos')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await loginQuery(username, password)

    const authenticated = await isAuthenticated()

    if (authenticated) window.location.reload()

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' >Login</button>
      </form>
    </div>
  )
}
