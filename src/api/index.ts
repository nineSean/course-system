import axios, {Canceler} from 'axios'

export const baseURL =  process.env.NODE_ENV === 'production' ? 'http://8.130.24.49/api' : 'http://localhost:8000'
axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

export const cancelTokens: Canceler[] = []
const CancelToken = axios.CancelToken

axios.interceptors.request.use(config => {
  config.cancelToken = new CancelToken(cancel => {
    cancelTokens.push(cancel)
  })
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}, error => Promise.reject(error))

axios.interceptors.response.use(response => {
  return response.data
} ,error => {
  if (error.response?.data) {
    const data = error.response.data
    data.message = `${error.response.status}: ${data.message}`
    return Promise.reject(data)
  }
  return Promise.reject(error)
})

export default axios
