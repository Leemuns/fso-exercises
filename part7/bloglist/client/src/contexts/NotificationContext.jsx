import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

let notificationTimeout

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)

  const displayMessage = (message, type = 'success') => {
    setNotification({ message, type })
    clearTimeout(notificationTimeout)
    notificationTimeout = setTimeout(() => setNotification(null), 3000)
  }

  return (
    <NotificationContext.Provider value={{ notification, displayMessage }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
