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
    console.log('effect')
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })

  }, [])
  console.log('render', persons.length, 'persons')

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
      <div className='warning'>
        {message}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(String(newName) + ' is already added to phonebook, replace the old number with a new one?')) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = {name: newName, number: newNumber, id: personToUpdate.id }
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
    } else {
      personService.create(personObject)
      .then(personObject => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setGreenMessage('Added ' + String(newName))
        setTimeout(() => {
          setGreenMessage(null)
        }, 3000)        
      })
    }
  }

  const deletePerson = ({person}) => {
    if (window.confirm("Delete " + person.name + "?")) {
      personService.remove(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id))
        setRedMessage('Information of ' + person.name + ' was removed')
        setTimeout(() => {
          setRedMessage(null)
        }, 3000)
      })
      .catch(error => {
        setRedMessage('Information of ' + String(person.name) + ' has already been removed from the server')
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
      <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

