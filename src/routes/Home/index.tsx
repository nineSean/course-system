import React, {FunctionComponent, PropsWithChildren} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {HomeState, RootState} from "@/store/reducers"
import styles from "./index.module.less"

type Props = PropsWithChildren<RouteComponentProps> & HomeState

const Home: FunctionComponent = (props: Props) => {

  return (
    <div className={styles.homeColor}>
      {props.title}
    </div>
  )
}

const mapStateToProps: (state: RootState) => HomeState = (state) => state.home

export default connect(mapStateToProps)(Home)
