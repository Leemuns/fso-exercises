import { useState, useImperativeHandle } from 'react'
import { Alert } from '@mui/material'

const Notification = (props) => {
  const [notification, setNotification] = useState(null)

  useImperativeHandle(props.ref, () => {
    return { setNotification }
  })

  if (!notification) {
    return null
  }

  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={notification.type}
    >
      {notification.message}
    </Alert>
  )
}

export default Notification
