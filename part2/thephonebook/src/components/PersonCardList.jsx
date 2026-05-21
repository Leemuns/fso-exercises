const PersonCardList = ({persons, nameFilter}) => {
  nameFilter = nameFilter.toLowerCase()
  return (
    <div>{
      persons.filter(person => person.name.includes(nameFilter))
        .map(person => <Person key={person.id} person={person}/>)
    }</div>
  )
}

const Person = ({person}) => <p>{person.name} {person.number}</p>

export default PersonCardList