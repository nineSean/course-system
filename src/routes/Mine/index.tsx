import React, {FunctionComponent, PropsWithChildren} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {MineState, RootState} from '@/store/reducers'

type Props = PropsWithChildren<RouteComponentProps> & MineState

const Mine: FunctionComponent = (props: Props) => {

  return (
    <div>
      {props.title}
    </div>
  )
}

const mapStateToProps: (state: RootState) => MineState = (state) => state.mine

export default connect(mapStateToProps)(Mine)
