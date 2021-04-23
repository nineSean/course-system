import {AnyAction} from 'redux'
import * as types from '../action-types'
import LoginState from "@/typings/login-types"
import {User} from "@/typings/user"

export interface ProfileState {
  title: string
  loginState: LoginState
  user: User
  error: string | null
}

const initialState: ProfileState = {
  title: '个人中心',
  loginState: LoginState.UNVALIDATED,
  user: null,
  error: null
}
const reducer = (state: ProfileState = initialState, action: AnyAction): ProfileState => {
  switch (action.type) {
  case types.VALIDATE:
    return action.payload.success
      ? {
        ...state,
        loginState: LoginState.LOGINED,
        user: action.payload.data
      }
      : {
        ...state,
        loginState: LoginState.UNLOGINED,
        error: action.payload.message
      }
  case types.LOGOUT:
    return {
      ...state,
      user: null,
      error: null,
      loginState: LoginState.UNLOGINED
    }
  case types.UPLOAD_AVATAR:
    return {
      ...state,
      user: {
        ...state.user,
        avatar: action.payload
      }
    }
  default:
    return state
  }
}
export default reducer
