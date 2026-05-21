const PersonForm = ({onSubmit, persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.reduce((isAdded, person) => isAdded || person.name === newName, false)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat({
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }));
  }

  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={event => setNewName(event.target.value)}/></div>
      <div>number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm