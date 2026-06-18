import { useContext } from 'react'
import userContext from '../contexts/UserContext'

const useUser = () => useContext(userContext)

export default useUser
