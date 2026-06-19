import { Button } from '@mui/material'

import useCurrentUser from '../hooks/useCurrentUser'
import useField from '../hooks/useField'
import FieldInput from './FieldInput'

const LoginForm = () => {
  const { loginUser } = useCurrentUser()

  const username = useField({ label: 'username', styleType: 'login' })
  const password = useField({
    label: 'password',
    styleType: 'login',
    type: 'password',
  })

  const handleLogin = (event) => {
    event.preventDefault()

    const formData = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
    }
    loginUser(formData)
    username.clear()
    password.clear()
  }

  return (
    <form onSubmit={handleLogin}>
      <h2 style={{ marginBottom: '6px' }}>Log in to application</h2>

      <FieldInput {...username} />
      <FieldInput {...password} />

      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        login
      </Button>
    </form>
  )
}

export default LoginForm
