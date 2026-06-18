import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import loginService from '../services/login'
import blogService from '../services/blogs'
import persistentUserService from '../services/persistentUser'
import useNotification from '../hooks/useNotification'

const UserContext = createContext()

export default UserContext

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const { displayNotification } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    const user = persistentUserService.getUser()
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginUser = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      persistentUserService.saveUser(user)
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
    } catch {
      displayNotification('Invalid username or password', 'error')
    }
  }

  const logoutUser = () => {
    setUser(null)
    persistentUserService.removeUser()
    navigate('/')
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
