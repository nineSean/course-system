import {AnyAction} from 'redux'

export interface ProfileState {
  title: string
}

const initialState: ProfileState = {
  title: '个人中心'
}

const reducer = (state: ProfileState = initialState, action: AnyAction): ProfileState => {
  switch (action.type) {
  default:
    return state
  }
}

export default reducer
