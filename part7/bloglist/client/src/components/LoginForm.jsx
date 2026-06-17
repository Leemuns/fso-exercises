import { useState } from 'react'
import { Button } from '@mui/material'

import LoginFieldInput from './LoginFieldInput'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    loginUser({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <h2 style={{ marginBottom: '6px' }}>Log in to application</h2>

      <LoginFieldInput
        label="username"
        value={username}
        setValue={setUsername}
      />
      <LoginFieldInput
        label="password"
        value={password}
        setValue={setPassword}
        type="password"
      />

      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        LOGIN
      </Button>
    </form>
  )
}

export default LoginForm
