import {AnyAction} from 'redux'
import * as types from '../action-types'
import {ISlide} from '@/typings/slide'
import {ICourse} from "@/typings"

export interface Courses {
  loading: boolean
  list: ICourse[]
  hasMore: boolean
  offset: number
  limit: number
}

export interface HomeState {
  currentCategory: string
  slides: ISlide[]
  course: Courses
}

const initialState: HomeState = {
  currentCategory: 'all',
  slides: [],
  course: {
    loading: false,
    list: [],
    hasMore: true,
    offset: 0,
    limit: 5,
  },
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
  case types.SET_COURSES:
    return {
      ...state,
      course: {
        ...state.course,
        loading: false,
        hasMore: action.payload.hasMore,
        list: [...state.course.list, ...action.payload.list],
        offset: state.course.offset + action.payload.list.length
      }
    }
  case types.SET_COURSES_LOADING:
    return {
      ...state,
      course: {
        ...state.course,
        loading: action.payload
      }
    }
  case types.REFRESH_COURSE:
    return {
      ...state,
      course: {
        ...state.course,
        loading: false,
        hasMore: action.payload.hasMore,
        list: action.payload.list,
        offset: action.payload.list.length
      }
    }
  default:
    return state
  }
}
export default reducer
