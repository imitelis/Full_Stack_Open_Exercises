import {useState, useEffect} from 'react'
import weatherService from '../services/weather'

const Countries = ({countries, newSearch}) => {
    
    const countriesToShow = newSearch === ''
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))

    const [showCountry, setShowCountry] = useState(Array(countriesToShow.length).fill(false))

    const handleShowCountry = (index) => {
        setShowCountry(showCountry => {
            const showedCountries = [...showCountry]
            showedCountries[index] = !showedCountries[index]
            console.log(showedCountries)
            return showedCountries
        })
      }
    
    const Country = ({country, countries}) => {
        const [weatherData, setWeatherData] = useState(null)
        
        const chosenCountry = countries.find(c => c.name.common === country)
        
        useEffect(() => {
            weatherService.getOne({capitalCity: chosenCountry.capital[0], countryTLD: chosenCountry.tld[0]})
            .then(response => {
                setWeatherData(response)
            })
          }, [chosenCountry])

        return(
            <>
            <h2>{chosenCountry.name.common}</h2>
            
            <p>Capital: {chosenCountry.capital[0]} <br/>
            Population: {chosenCountry.population} people <br/>
            Area: {chosenCountry.area} Km^2 <br/>
            Country code top-level domain: {chosenCountry.tld[0].substring(1)} </p>
            
            <b>Languages:</b>
            <ul>
                {Object.keys(chosenCountry.languages).map((language, index) => (
                <li key={index}>{chosenCountry.languages[language]}</li>
                ))}
            </ul>
            
            <img src={chosenCountry.flags.png} alt={chosenCountry.name.common}></img>

            {weatherData && (
                <>
                <h3>Weather in {chosenCountry.capital[0]}</h3>
                <p>Temperature: {(weatherData.main.temp -273).toFixed(2)} Celsius</p>
                <img src={"https://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png"}></img>
                <p>Wind speed: {weatherData.wind.speed} m/s</p>
                </>
            )}
            </>
        )

    }

    if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
        return(
            <>
            {countriesToShow.map((c,i) => <li key={c.name.common}>{c.name.common}
            <button onClick={() => {handleShowCountry(i)}}>{showCountry[i] ? 'hide' : 'show'}</button>
            {showCountry[i] && <Country country={c.name.common} countries={countries}/>}
            </li>
            )}
            </>
        )
    }

    if (newSearch.length === 0) {
        return(
            <>
            Please introduce a character in the search bar
            </>
        )
    }

    if (countriesToShow.length >= 10) {
        return(
            <>
            Too many matches, specify another filter
            </>
        )
    }

    if (countriesToShow.length == 1) {
        const choiceCountry = String(countriesToShow.map(c => c.name.common))
        return(
            <>
            <Country country={choiceCountry} countries={countries} />
            </>
        )
    }

    if (countriesToShow.length == 0) {
        const choiceCountry = String(countriesToShow.map(c => c.name.common))
        return(
            <>
            No country was found, please try again
            </>
        )
    }
    
  }
  
  export default Countries