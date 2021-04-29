import * as types from '../action-types'
import {ICourse} from "@/typings"
import {Dispatch} from "redux"
import {push} from "connected-react-router"

export default {
  addCartItem(item: ICourse){
    return {
      type: types.ADD_CART_ITEM,
      payload: item
    }
  },
  removeCartItem(id: string){
    return {
      type: types.REMOVE_CART_ITEM,
      payload: id
    }
  },
  changeCartItemAmount(id: string, amount: number){
    return {
      type: types.CHANGE_CART_ITEM_AMOUNT,
      payload: {
        id,
        amount
      }
    }
  },
  changeCartItemsChecked(checkedIds: string[]){
    return {
      type: types.CHANGE_CART_ITEMS_CHECKED,
      payload: checkedIds
    }
  },
  clearCart(){
    return (dispatch: Dispatch) => {
      dispatch({
        type: types.CLEAR_CART,
      })
      dispatch(push('/'))
    }
  },
  settle(){
    return (dispatch: Dispatch) => {
      dispatch({
        type: types.SETTLE
      })
    }
  }
}