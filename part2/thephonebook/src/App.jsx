import { useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonCardList from './components/PersonCardList.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [nameFilter, setNameFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.reduce((isAdded, person) => isAdded || person.name === newPerson.name, false)) {
      alert(`${newPerson.name} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat({
      name: newPerson.name,
      number: newPerson.number,
      id: String(persons.length + 1)
    }));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={setNameFilter}/>

      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} newPerson={newPerson} setNewPerson={setNewPerson}/>

      <h2>Numbers</h2>
      <PersonCardList persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

export default App