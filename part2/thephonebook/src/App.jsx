import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonCardList from './components/PersonCardList.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then( response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.reduce((isAdded, person) => isAdded || person.name === newPerson.name, false)) {
      alert(`${newPerson.name} is already added to the phonebook`)
      return
    }

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then( response => {
        setPersons(persons.concat(response.data))
        setNewPerson('')
      })

    // setPersons(persons.concat({
    //   name: newPerson.name,
    //   number: newPerson.number,
    //   id: String(persons.length + 1)
    // }));
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