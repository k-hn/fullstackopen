import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (blogPayload) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blogPayload, config)
  return response.data
}

export default {
  getAll,
  setToken,
  create,
  getToken
}
