import { useState } from 'react'

import Notification from './Notification'
import FieldInput from './FieldInput'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    loginUser({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <FieldInput name='username' value={username} setValue={setUsername} />
      <FieldInput name='password' value={password} setValue={setPassword} type='password'/>

      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm