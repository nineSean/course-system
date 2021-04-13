import axios from './index'
import {LoginPayload} from "@/typings/user"

export const validate = () =>  axios.get('/user')

export function register<Data>(data: LoginPayload) {
  return axios.post<Data, Data>('/user', data)
}

export function login<Data>(data: LoginPayload) {
  return axios.post<Data, Data>('/session', data)
}
