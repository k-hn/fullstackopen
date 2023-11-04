import axios from "axios"
const baseUrl = "/api/notes"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const response = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true
  }
  return response.then(response => response.data.concat(nonExisting))
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = axios.post(baseUrl, newObject, config)
  // return response.data
  return response.then(response => response.data)

}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then(response => response.data)
}

export default {
  getAll, create, update, setToken
}
