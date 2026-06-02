import { useState, useImperativeHandle } from 'react'

const Notification = props => {
  const [notification, setNotification] = useState(null)

  useImperativeHandle(props.ref, () => {
    return { setNotification }
  })

  if (!notification) {
    return null
  }

  const { message, isError } = notification
  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return <div style={style}>{message}</div>
}

export default Notification