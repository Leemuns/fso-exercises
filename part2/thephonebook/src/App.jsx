import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: '1', name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.reduce((isAdded, person) => isAdded || person.name === newName, false)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    setPersons(persons.concat({
      id: String(persons.length + 1),
      name: newName,
    }));
    console.log(persons)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      
      <div>
        {persons.map(person => <p key={person.id}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App