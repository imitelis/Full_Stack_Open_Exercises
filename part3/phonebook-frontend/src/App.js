import { useState, useEffect } from 'react'

import personService from './services/persons'

import { NotificationGreen, NotificationRed } from './components/Notification'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [greenMessage, setGreenMessage] = useState(null)
  const [redMessage, setRedMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])

  // console.log('render', persons.length, 'persons')

  const personsToShow = newSearch === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <NotificationGreen message={greenMessage} />
      <NotificationRed message={redMessage} />
      <PersonForm persons={persons} setPersons={setPersons} setGreenMessage={setGreenMessage} setRedMessage={setRedMessage} />
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <PersonList persons={persons} setPersons={setPersons} personsToShow={personsToShow} setRedMessage={setRedMessage} />
    </div>
  )
}

export default App