import React, {FunctionComponent,} from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {Redirect, Route, Switch,} from 'react-router-dom'
import {ConnectedRouter} from "connected-react-router"
import store from './store'
import history from './store/history'
import Mine from './routes/Mine'
import Home from './routes/Home'
import Profile from './routes/Profile'
import Tabs from './components/Tabs'
import './assets/styles/common.less'
import './index.less'
import 'lib-flexible'

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <main className='main'>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/mine' component={Mine}/>
            <Route path='/profile' component={Profile}/>
            <Redirect to='/'/>
          </Switch>
          <Tabs/>
        </main>
      </ConnectedRouter>
    </Provider>
  )
}
ReactDOM.render(<App/>, document.getElementById('root'))