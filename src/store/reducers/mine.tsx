import {AnyAction} from 'redux'

export interface MineState {
  title: string
}

const initialState: MineState = {
  title: '课程页'
}

const reducer = (state: MineState = initialState, action: AnyAction): MineState => {
  switch (action.type) {
  default:
    return state
  }
}

export default reducer
