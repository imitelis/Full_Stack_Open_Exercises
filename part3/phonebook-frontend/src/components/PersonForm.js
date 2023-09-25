import { useState } from 'react'

import personService from '../services/persons'

const PersonForm = ({persons, setPersons, setGreenMessage, setRedMessage}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const validatePerson = (name, number) => {
    if (name.length < 3) {
      setRedMessage(`person validation failed: path "name" ("${name}") is shorter than the minimum allowed length (3)`)
      setTimeout(() => {
        setRedMessage(null)
      }, 3000)
      return false
    }
  
    if (number.length < 8) {
      setRedMessage(`person validation failed: path "number" ("${number}") is shorter than the minimum allowed length (8)`)
      setTimeout(() => {
        setRedMessage(null)
      }, 3000)
      return false
    }
  
    if (number.length > 14) {
      setRedMessage(`person validation failed: path "number" ("${number}") is larger than maximum allowed length (14)`)
      setTimeout(() => {
        setRedMessage(null)
      }, 3000)
      return false
    }
  
    if (!number.match(/^(\d{2}-\d{5,11}|\d{3}-\d{4,10}|\d{8,14})$/)) {
      setRedMessage(`person validation failed: path "number" ("${number}") is of invalid form (Must be like the following; 12345678 to 12345678901234, 12-34567 to 12-34567890123 or 123-4567 to 123-4567890123)`)
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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

    return(
      <>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
          <div>name: <input value={newName} onChange={handleNameChange} required/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} required/></div>
          <div><button type="submit">add</button></div>
      </form>
      </>
    )
  }

  export default PersonForm