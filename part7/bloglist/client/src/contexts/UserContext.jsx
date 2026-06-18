import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import loginService from '../services/login'
import blogService from '../services/blogs'
import useNotification from '../hooks/useNotification'

const UserContext = createContext()

export default UserContext

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const { displayNotification } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginUser = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
    } catch {
      displayNotification('Invalid username or password', 'error')
    }
  }

  const logoutUser = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    navigate('/')
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
