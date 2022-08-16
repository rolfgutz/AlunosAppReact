import axios from 'axios';

const api = axios.create({
    baseURL:"https://localhost:44359",
})

export default api;