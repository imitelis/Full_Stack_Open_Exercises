import axios from 'axios'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const getOne = ({capitalCity, countryTLD}) => {
  const formatedTLD = countryTLD.substring(1);
  const baseURL = (`https://api.openweathermap.org/data/2.5/weather?q=${capitalCity},${formatedTLD}&APPID=${API_KEY}`)
  const request = axios.get(baseURL)
    return request.then(response => {
      return response.data
    })
  }

export default {getOne}