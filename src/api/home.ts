import axios from './index'

export async function getSlides() {
  return axios.get('/slide')
}

export async function getCourses(category = 'all', offset: number, limit: number){
  return axios.get('/course', {
    params: {
      category,
      offset,
      limit
    }
  })
}

