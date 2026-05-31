const Notification = ({ notification }) => {
  const { message, isError } = notification

  if (!message) {
    return null
  }

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