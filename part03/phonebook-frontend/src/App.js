import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import personService from './services/persons'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
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

  const NotificationGreen = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  const NotificationRed = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const validatePerson = (name, number) => {
    if (name.length < 3) {
      setRedMessage(`person validation failed: name: path "name" ("${name}") is shorter than the minimum allowed length (3)`)
      setTimeout(() => {
        setRedMessage(null)
      }, 3000)
      return false
    }
  
    if (number.length < 8) {
      setRedMessage(`person validation failed: number: path "number" ("${number}") is shorter than the minimum allowed length (8)`)
      setTimeout(() => {
        setRedMessage(null)
      }, 3000)
      return false
    }
  
    if (number.length > 14) {
      setRedMessage(`person validation failed: number: path "number" ("${number}") is larger than maximum allowed length (14)`)
      setTimeout(() => {
        setRedMessage(null)
      }, 3000)
      return false
    }
  
    if (!number.match(/^(\d{2}-\d{5,11}|\d{3}-\d{4,10}|\d{8,14})$/)) {
      setRedMessage(`person validation failed: number: path "number" ("${number}") is of invalid form (Must be like the following; 12345678 to 12345678901234, 12-34567 to 12-34567890123 or 123-4567 to 123-4567890123)`)
      setTimeout(() => {
        setRedMessage(null)
      }, 12000)
      return false
    }
  
    return true
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(String(newName) + ' is already added to phonebook, replace the old number with a new one?')) {
        if (validatePerson(newName, newNumber)) {
          const personToUpdate = persons.find(person => person.name === newName)
          const updatedPerson = { name: newName, number: newNumber, id: personToUpdate.id }
          personService.update(personToUpdate.id, updatedPerson)
            .then((personToUpdate) => {
              setPersons(persons.map(person => person.id === personToUpdate.id ? personToUpdate : person))
              setNewName('')
              setNewNumber('')
              setGreenMessage('changed ' + String(newName) + ' phone number')
              setTimeout(() => {
                setGreenMessage(null)
              }, 3000)
            })
            .catch(error => {
              setRedMessage('it was not posible to update ' + String(newName) + ' phone number')
              setTimeout(() => {
                setRedMessage(null)
              }, 3000)
            })
        }
      }
    } else {
      if (validatePerson(newName, newNumber)) {
        personService.create(personObject)
          .then(personObject => {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
            setGreenMessage('added ' + String(newName))
            setTimeout(() => {
              setGreenMessage(null)
            }, 3000)
          })
      }
    }
  }  

  const deletePerson = ({ person }) => {
    if (window.confirm("delete " + person.name + "?")) {
      personService.remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id))
          setRedMessage('information of ' + person.name + ' was removed')
          setTimeout(() => {
            setRedMessage(null)
          }, 3000)
        })
        .catch(error => {
          setRedMessage('information of ' + String(person.name) + ' has already been removed from the server')
          setTimeout(() => {
            setRedMessage(null)
          }, 3000)
          setPersons(persons.filter((p) => p.id !== person.id))
        })
    }
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = newSearch === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <NotificationGreen message={greenMessage} />
      <NotificationRed message={redMessage} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Filter name</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App