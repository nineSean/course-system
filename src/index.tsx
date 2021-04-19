import React, {FunctionComponent,} from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {Redirect, Switch,} from 'react-router-dom'
import Route from './components/Route'
import {ConnectedRouter} from "connected-react-router"
import store from './store'
import history from './store/history'
import Mine from './routes/Mine'
import Home from './routes/Home'
import Profile from './routes/Profile'
import Register from './routes/Register'
import Login from './routes/Login'
import Tabs from './components/Tabs'
import './assets/styles/common.less'
import './index.less'
import 'lib-flexible'
import zhCN from 'antd/lib/locale/zh_CN'
import {ConfigProvider} from "antd"

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConfigProvider locale={zhCN}>
          <main className="main">
            <Switch>
              <Route
                path="/"
                exact
                component={Home}
              />
              <Route
                path="/mine"
                component={Mine}
              />
              <Route
                path="/profile"
                component={Profile}
              />
              <Route
                path="/register"
                component={Register}
              />
              <Route
                path="/login"
                component={Login}
              />
              <Redirect to="/" />
            </Switch>
            <Tabs />
          </main>
        </ConfigProvider>
      </ConnectedRouter>
    </Provider>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))