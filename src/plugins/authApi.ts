import axios from 'axios'

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH_BASE_URL,
  timeout: 5000,
})

export default authApi
