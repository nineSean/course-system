import axios from './index'

export async function getSlides() {
  return axios.get('/slide')
}