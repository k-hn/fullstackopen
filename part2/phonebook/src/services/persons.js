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

const personsService = { getAll, create, deletePerson }
export default personsService