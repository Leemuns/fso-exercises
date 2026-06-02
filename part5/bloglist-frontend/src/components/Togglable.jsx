import { useState } from 'react'

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const togglevisibility =() => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={togglevisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={togglevisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable