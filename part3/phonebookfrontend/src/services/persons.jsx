import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
}

const remove = (personId) => {
  return axios
    .delete(`${baseUrl}/${personId}`)
    .then(response => response.data)
}

const update = (personId, newPerson) => {
  return axios
    .put(`${baseUrl}/${personId}`, newPerson)
    .then(response => response.data)
}

export default { getAll, create, remove, update }