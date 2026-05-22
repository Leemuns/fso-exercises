const Filter = ({text, value, onChange, onFind}) => {
  return (
    <form onSubmit={onFind}>
      {text} 
      <input value={value} onChange={() => onChange(event.target.value)}/>
      <button type="submit">search</button>
    </form>
  )
}

export default Filter