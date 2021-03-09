import {AnyAction} from 'redux'
import * as types from '../action-types'

export interface HomeState {
  currentCategory: string
}

const initialState: HomeState = {
  currentCategory: 'all',
}
const reducer = (state: HomeState = initialState, action: AnyAction): HomeState => {
  switch (action.type) {
  case types.SET_CURRENT_CATEGORY:
    return {
      ...state,
      currentCategory: action.payload
    }
  default:
    return state
  }
}
export default reducer
