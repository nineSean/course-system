import * as types from '../action-types'
import {AnyAction, Dispatch, } from 'redux'
import {getCourses, getSlides} from "@/api/home"
import {message} from "antd"
import {RootState} from "@/store/reducers"

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
  },
  getCourses(){
    return async function(dispatch: Dispatch, getState: () => RootState){
      try {
        const {category, course: {hasMore, offset, limit, loading}} = getState().home
        if (hasMore && !loading) {
          dispatch({
            type: types.SET_COURSES_LOADING,
            payload: true
          })
          const response = await getCourses(category, offset, limit)
          dispatch({
            type: types.SET_COURSES,
            payload: response.data
          })
        }
      } catch (error) {
        message.error(error.message)
      }
    }
  },
  refreshCourses(){
    return async function(dispatch: Dispatch, getState: () => RootState){
      try {
        const {category, course: {limit}} = getState().home
        dispatch({
          type: types.SET_COURSES_LOADING,
          payload: true
        })
        const response = await getCourses(category, 0, limit)
        dispatch({
          type: types.REFRESH_COURSE,
          payload: response.data
        })
      } catch (error) {
        message.error(error.message)
      }
    }
  }
}

