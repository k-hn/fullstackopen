import axios from "axios";
const baseURL = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = (personObj) => {
  const request = axios.post(baseURL, personObj)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`)
}

const updatePerson = (updatedPersonObj) => {
  const request = axios.put(`${baseURL}/${updatedPersonObj.id}`, updatedPersonObj)
  return request.then(response => response.data)
}

const personsService = { getAll, create, deletePerson, updatePerson }
export default personsService