import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`  

  useEffect(() => {
    axios.get(baseUrl)
    .then(response => {
      setCountry(response)
    })
    .catch(err => {
      setCountry([])
    })
  }, [name, setCountry])
  console.log(country)

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.data) {
    return (
      <div>
        <em>not found...</em>
      </div>
    )
  }

  return (
    <div>
      <h2>{country.data.name.common} </h2>
      <div>Capital: {country.data.capital}</div>
      <div>Population: {country.data.population} people</div>
      <div>Area: {country.data.area} Km^2</div>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.data.languages).map((language, index) => (
        <li key={index}>{country.data.languages[language]}</li>
        ))}
      </ul>
      <img src={country.data.flags.png} alt={`flag of ${country.data.name.common}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <h1>Country</h1>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App