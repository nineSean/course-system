import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import logger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import history from '@/store/history'
import rootReducers from '@/store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducers, composeWithDevTools(
  applyMiddleware(routerMiddleware(history), thunk, promise, logger),
));

// const store = applyMiddleware(routerMiddleware(history), thunk, promise, logger)(createStore)(rootReducers)

export default store

