const Filter = ({nameFilter, onChange}) => {
  return (
    <div>
      filter shown with <input value={nameFilter} onChange={event => onChange(event.target.value)}/>
    </div>
  )
}

export default Filter