import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const localStorageData = window.localStorage.getItem('persist:root')
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData)
        const authData = JSON.parse(parsedData.auth)
        if (authData.user?.accessToken) {
          config.headers.Authorization = `Bearer ${authData.user.accessToken}`
        }
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)
api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return error.response
  },
)
export default api
