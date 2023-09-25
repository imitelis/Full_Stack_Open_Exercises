import personService from '../services/persons'

const PersonList = ({persons, setPersons, personsToShow, setRedMessage}) => {

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
  
  return(
      <>
      <h2>Numbers</h2>
      {personsToShow.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson({person})}>delete</button></p>)}
      </>
    )
  }

  export default PersonList