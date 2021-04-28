export interface ICourse{
  id: string
  url: string
  price: string
  title: string
  video: string
  poster: string
  category: string
}

export interface ICourseResponse {
  success: boolean
  data: ICourse
  message?: string
}