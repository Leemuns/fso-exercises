import { useState } from 'react'
import PersonsCardList from './components/PersonsCardList.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { id: '1', name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.reduce((isAdded, person) => isAdded || person.name === newName, false)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat({
      id: String(persons.length + 1),
      name: newName,
      number: newNumber
    }));
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      
      <PersonsCardList persons={persons}/>
    </div>
  )
}

export default App