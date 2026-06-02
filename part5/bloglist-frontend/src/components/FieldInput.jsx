const FieldInput = ({ name, value, setValue, type }) => {
  if (!type) {
    type = 'text'
  }

  return (
    <label style={{ display: 'block' }}>
      {name}
      <input type={type} value={value} onChange={event => setValue(event.target.value)} />
    </label>
  )
}

export default FieldInput