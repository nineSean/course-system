import * as types from '../action-types'
import {AnyAction} from 'redux'

export default {
  setCurrentCategory(payload: string): AnyAction{
    return {
      type: types.SET_CURRENT_CATEGORY,
      payload
    }
  }
}

