import countryService from './services/countries'
import { useState, useEffect } from 'react'
import Finder from './components/Finder'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    countryService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h1>Countries</h1>
      <Finder newSearch={newSearch} handleSearch={handleSearch}/>
      <Countries countries={countries} newSearch={newSearch}/>
    </div>
  );
}

export default App;
