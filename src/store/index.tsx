import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import logger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import history from '@/store/history'
import rootReducers from '@/store/reducers'

const store = applyMiddleware(routerMiddleware(history), thunk, promise, logger)(createStore)(rootReducers)

export default store

