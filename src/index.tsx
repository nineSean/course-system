import React, {FunctionComponent, lazy, Suspense,} from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {Redirect, Switch,} from 'react-router-dom'
import Route from './components/Route'
import {ConnectedRouter} from "connected-react-router"
import store from './store'
import history from './store/history'
import './assets/styles/common.less'
import './index.less'
import './utils/flexiable'
import zhCN from 'antd/lib/locale/zh_CN'
import {ConfigProvider, Spin} from "antd"
import Tabs from './components/Tabs'

const Mine = lazy(()=>import(/*webpackPrefetch:true*/'./routes/Mine'))
const Home = lazy(()=>import(/*webpackPrefetch:true*/'./routes/Home'))
const Profile = lazy(()=>import(/*webpackPrefetch:true*/'./routes/Profile'))
const Register = lazy(()=>import(/*webpackPrefetch:true*/'./routes/Register'))
const Login = lazy(()=>import(/*webpackPrefetch:true*/'./routes/Login'))
const Detail = lazy(()=>import(/*webpackPrefetch:true*/'./routes/Detail'))
const Cart = lazy(()=>import(/*webpackPrefetch:true*/'./routes/Cart'))

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConfigProvider locale={zhCN}>
          <Suspense
            fallback={<Spin style={{margin: '30px auto', width: '100%'}}/>}
          >
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
                <Route
                  path="/detail/:id"
                  component={Detail}
                />
                <Route
                  path="/cart"
                  component={Cart}
                />
                <Redirect to="/" />
              </Switch>
              <Tabs />
            </main>
          </Suspense>
        </ConfigProvider>
      </ConnectedRouter>
    </Provider>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))