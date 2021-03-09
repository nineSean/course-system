import React, {FunctionComponent, PropsWithChildren,} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {HomeState, RootState} from "@/store/reducers"
import HomeHeader from './components/HomeHeader'
import actions from '@/store/actions/home'

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions
type Props = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps

const Home: FunctionComponent = (props: Props) => {

  return (
    <>
      <HomeHeader setCurrentCategory={props.setCurrentCategory} currentCategory={props.currentCategory}/>
    </>
  )
}

const mapStateToProps: (state: RootState) => HomeState = (state) => state.home

export default connect(mapStateToProps, actions)(Home)
