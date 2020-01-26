import axios from 'axios'

const api = axios.create({
    baseURL: "https://devmappingapi.herokuapp.com"
})

export default api