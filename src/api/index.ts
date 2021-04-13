import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

axios.interceptors.request.use(config => {
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
