import FieldInput from './FieldInput'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <FieldInput name='username' value={username} setValue={setUsername} />
      <FieldInput name='password' value={password} setValue={setPassword} />

      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm