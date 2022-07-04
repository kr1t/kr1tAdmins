import axios from 'axios'
import { useAuthStore } from '~/store/auth'

const { getEnv } = useEnv()
const apiUrl = getEnv('VITE_API_URL')

axios.defaults.baseURL = apiUrl
axios.interceptors.request.use((request) => {
  const { token } = useAuthStore()

  if (token)
    request.headers.common.Authorization = `Bearer ${token}`

  return request
})

export default axios
