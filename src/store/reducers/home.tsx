import {AnyAction} from 'redux'
import * as types from '../action-types'
import {Slide} from '@/typings/slide'

export interface HomeState {
  currentCategory: string,
  slides: Slide[]
}

const initialState: HomeState = {
  currentCategory: 'all',
  slides: [],
}
const reducer = (state: HomeState = initialState, action: AnyAction): HomeState => {
  switch (action.type) {
  case types.SET_CURRENT_CATEGORY:
    return {
      ...state,
      currentCategory: action.payload
    }
  case types.GET_SLIDES:
    return {
      ...state,
      slides: action.payload.data
    }
  default:
    return state
  }
}
export default reducer
