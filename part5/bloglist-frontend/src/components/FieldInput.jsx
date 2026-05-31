const FieldInput = ({ name, value, setValue }) => {
  return (
    <label style={{ display: 'block' }}>
      {name}
      <input value={value} onChange={event => setValue(event.target.value)} />
    </label>
  )
}

export default FieldInput