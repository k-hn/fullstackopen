import axios from "axios"

const url = "/api/persons"

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

const updateContact = (personObject, id) => {
  const request = axios.put(`${url}/${id}`, personObject)
  return request.then(response => response.data)
}

export default {
  createContact,
  getAllContacts,
  deleteContact,
  updateContact
}