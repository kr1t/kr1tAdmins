import axios from "axios"
import { useAuthStore } from "@/stores/auth"

axios.defaults.baseURL = "http://127.0.0.1:3333"
axios.interceptors.request.use((request) => {
  const { token } = useAuthStore()
  if (token) {
    request.headers.common.Authorization = `Bearer ${token}`
  }
  return request
})

export default axios
