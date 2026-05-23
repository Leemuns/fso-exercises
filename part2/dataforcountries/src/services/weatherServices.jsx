import axios from 'axios'
const baseUrl = 'http://api.openweathermap.org'
const api_key = import.meta.env.VITE_WEATHER_KEY

// const getCapital = (capitalName) => {
//   axios
//     .get(`${baseUrl}/geo/1.0/direct?q=${capitalName}&appid=${api_key}`)
//     .then(response => {response.lat, response.lon})
// }

const getWeather = (capitalName) => {
  return axios
    .get(`${baseUrl}/geo/1.0/direct?q=${capitalName}&appid=${api_key}`)
    .then(response => {
      const {lat, lon} = response.data[0]
      return axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
    })
    .then(response => response.data)
    .catch(err => console.log(err))
}

export default { getWeather }