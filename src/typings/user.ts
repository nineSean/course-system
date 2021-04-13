export interface RegisterPayload {
  username: string
  password: string
  confirmPassword: string
  email?: string
}

export interface LoginPayload {
  username: string
  password: string
}

interface BaseResponse {
  success: boolean
  data?: {
    token: string
  }
  message?: string
}

export type RegisterResponse = BaseResponse

export type LoginResponse = BaseResponse

export interface User {
  id: string
  username: string
  email?: string
  avatar?: string
}
