import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import logger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import history from '@/store/history'
import rootReducers from '@/store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

console.log('env', process.env.NODE_ENV)
const store = createStore(rootReducers, composeWithDevTools(
  applyMiddleware(...[routerMiddleware(history), thunk, promise, process.env.NODE_ENV === 'dev' && logger].filter(fn => typeof fn === 'function')),
));

export default store

