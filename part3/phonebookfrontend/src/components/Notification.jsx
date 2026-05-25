const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  // this is not a good way of doing this haha but I cba to mess with how the msg type can be passed to the component without changing a bunch of things. Cant w8 to see how the modal answers do this.
  if (message.includes('Error!')) {
    return (
      <div className="notification error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
}

export default Notification