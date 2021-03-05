import React from "react"
import ReactDOM from "react-dom"
import 'lib-flexible'

interface Props {
}

const App: React.FunctionComponent = (props: Props) => {
  return (
    <div id="app">
      sean
    </div>
  )
}
ReactDOM.render(<App/>, document.getElementById('root'))