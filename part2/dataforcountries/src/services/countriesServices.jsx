import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return axios
    .get(`${baseUrl}/all`)
    .then(response => response.data)
}

const getFiltered = countryFilter => {
  return axios
    .get(`${baseUrl}/all`)
    .then(response => response.data.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase())))
}

export default { getAll, getFiltered }