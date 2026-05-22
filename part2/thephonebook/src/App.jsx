import { useState, useEffect } from 'react'
import axios from 'axios'

import personsServices from './services/persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonCardList from './components/PersonCardList.jsx'
import person from './services/persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personsServices
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
    
    const matchedPerson = persons.reduce((matchedPerson, person) => person.name === newPerson.name ? person : matchedPerson, null)
    console.log(matchedPerson);
    
    if (matchedPerson) {
      const confirmMsg = `${matchedPerson.name} is already added to the phonebook, replace the old number with a new one?`
      if (window.confirm(confirmMsg)) {
        personsServices
          .update(matchedPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          })
      }
      return
    }

    personsServices
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson({ name: '', number: '' })
      })
  }

  const removePerson = (personId) => {
    const matchedPerson = persons.reduce((matchedPerson, person) => person.id === personId ? person : matchedPerson, {})
    if (window.confirm(`Delete ${matchedPerson.name}`)) {
      personsServices
        .remove(personId)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={setNameFilter}/>

      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} newPerson={newPerson} setNewPerson={setNewPerson}/>

      <h2>Numbers</h2>
      <PersonCardList onClickRemove={removePerson} persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

export default App