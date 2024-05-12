import React, { useState } from 'react'
import { isAuthenticated } from '../../../common/api/endpoints/auth-context'
import { loginQuery } from '../../../common/api/endpoints/login'
import { Button, Input } from '@nextui-org/react'
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
          <label htmlFor='username'>Username:</label>
          <Input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <Input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <Button type='submit'>Login</Button>
      </form>
    </div>
  )
}
