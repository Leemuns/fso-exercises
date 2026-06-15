import { useContext } from 'react'
import NotificationContext from '../components/NotificationContext'

export const useNotification = () => useContext(NotificationContext)

export default useNotification