const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <label style={{ display: 'block' }}>
        username
        <input value={username} onChange={event => setUsername(event.target.value)} />
      </label>

      <label style={{ display: 'block' }}>
        password
        <input value={password} type="password" onChange={event => setPassword(event.target.value)} />
      </label>

      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm