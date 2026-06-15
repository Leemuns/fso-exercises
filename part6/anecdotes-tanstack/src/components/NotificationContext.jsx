import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

let notificationTimeout

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)

  const displayNotification = (message) => {
    clearTimeout(notificationTimeout)
    setNotification(message)
    notificationTimeout = setTimeout(() => setNotification(null), 5000)
  }
  
  return (
    <NotificationContext.Provider value={{ notification, displayNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}