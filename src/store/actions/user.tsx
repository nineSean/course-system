import * as types from '../action-types'
import {AnyAction, Dispatch} from 'redux'
import {register, login, validate} from "@/api/user"
import { push } from 'connected-react-router'
import {LoginPayload, LoginResponse, RegisterPayload, RegisterResponse} from '@/typings/user'
import {message} from "antd"

function saveTokenAndRedirect(token: string, dispatch: Dispatch){
  localStorage.setItem('token', token)
  dispatch(push('/profile'))
}

export default {
  validate(): AnyAction{
    return {
      type: types.VALIDATE,
      payload: validate()
    }
  },
  register(data: RegisterPayload){
    return async function(dispatch: Dispatch){
      try {
        const result = await register<RegisterResponse>(data)
        result.success ? dispatch(push('login')) : message.error(result.message)
      } catch (error) {
        message.error(error.message)
      }
    }
  },
  login(data: LoginPayload){
    return async function(dispatch: Dispatch) {
      try {
        const result = await login<LoginResponse>(data)
        result.success ? saveTokenAndRedirect(result.data.token, dispatch) : message.error(result.message)
      } catch (error) {
        message.error(error.message)
      }
    }
  },
  logout(){
    return function(dispatch: Dispatch){
      localStorage.removeItem('token')
      dispatch({type: types.LOGOUT})
      dispatch(push('login'))
    }
  },
  uploadAvatar(avatar: string){
    return {
      type: types.UPLOAD_AVATAR,
      payload: avatar
    }
  },
}

