import { useState } from 'react'
import PersonsCardList from './components/PersonsCardList.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={nameFilter} onChange={event => setNameFilter(event.target.value)}/>
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={event => setNewName(event.target.value)}/></div>
        <div>number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)}/></div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>
      
      <PersonsCardList persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

export default App