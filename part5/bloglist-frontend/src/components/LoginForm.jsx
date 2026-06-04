import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Notification from './Notification'
import FieldInput from './FieldInput'

const LoginForm = ({ loginUser }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()

    loginUser({ username, password })
    setUsername('')
    setPassword('')

    navigate('/')
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>

      <FieldInput name='username' value={username} setValue={setUsername} />
      <FieldInput name='password' value={password} setValue={setPassword} type='password'/>

      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm