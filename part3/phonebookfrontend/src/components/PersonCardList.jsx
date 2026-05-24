const PersonCardList = ({onClickRemove, persons, nameFilter}) => {
  nameFilter = nameFilter.toLowerCase()
  return (
    <div>{
      persons.filter(person => person.name.toLowerCase().includes(nameFilter))
        .map(person => <Person key={person.id} onClick={onClickRemove} person={person}/>)
    }</div>
  )
}

const Person = ({onClick, person}) => <p>{person.name} {person.number} <button onClick={() => onClick(person.id)}>delete</button></p>

export default PersonCardList