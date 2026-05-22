import { useState, useEffect } from 'react'
import axios from 'axios'

import personsService from './services/persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonCardList from './components/PersonCardList.jsx'
import person from './services/persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (!newPerson.name || !newPerson.number) {
      alert(`New Person details cannot be empty.`)
      return
    }

    if (persons.reduce((isAdded, person) => isAdded || person.name === newPerson.name, false)) {
      alert(`${newPerson.name} is already added to the phonebook.`)
      return
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson({ name: '', number: '' })
      })
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