import axios from "axios"

const url = "http://localhost:3001/persons"

const createContact = (personObject) => {
  const request = axios.post(url, personObject)
  return request.then(response => response.data)
}

const getAllContacts = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const deleteContact = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request
}

export default {
  createContact,
  getAllContacts,
  deleteContact
}