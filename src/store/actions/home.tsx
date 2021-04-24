import * as types from '../action-types'
import {AnyAction} from 'redux'
import {getSlides} from "@/api/home"
import {message} from "antd"

export default {
  setCurrentCategory(payload: string): AnyAction {
    return {
      type: types.SET_CURRENT_CATEGORY,
      payload
    }
  },
  async getSlides(): Promise<AnyAction | void>{
    try {
      const data = await getSlides()
      return {
        type: types.GET_SLIDES,
        payload: data
      }
    } catch (error) {
      message.error(error.message)
      return {
        type: types.UNEXIST
      }
    }
  }
}

