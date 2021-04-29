import * as types from '../action-types'
import {AnyAction} from 'redux'
import {ICartItem} from "@/typings"

export type CartState = ICartItem[]

const initialState: CartState = []
export default (state: CartState = initialState, action: AnyAction) => {
  switch (action.type) {
  case types.ADD_CART_ITEM: {
    const index = state.findIndex(({course: {id}}) => id === action.payload.id)
    if (index > -1) {
      state[index].amount += 1
    } else {
      state.push({
        checked: false,
        amount: 1,
        course: action.payload
      })
    }
    return [...state]
  }
  case types.REMOVE_CART_ITEM: {
    const newCourses = state.filter(({course: {id}}) => id !== action.payload)
    return [...newCourses]
  }
  case types.CHANGE_CART_ITEM_AMOUNT: {
    const {id, amount} = action.payload
    const index = state.findIndex(({course}) => course.id === id)
    state[index].amount = amount
    return [...state]
  }
  case types.CHANGE_CART_ITEMS_CHECKED: {
    const checkedIds = action.payload
    state.forEach((item) => {
      item.checked = checkedIds.includes(item.course.id)
    })
    return [...state]
  }
  case types.CLEAR_CART: {
    return []
  }
  case types.SETTLE: {
    state = state.filter(item => !item.checked)
    return [...state]
  }
  default:
    return state
  }
}