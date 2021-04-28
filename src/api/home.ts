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

export function getCourse<Data>(id: string) {
  return axios.get<Data, Data>(`/course/${id}`)
}

