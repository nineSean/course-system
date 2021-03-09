import React, {PropsWithChildren, FunctionComponent} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {RootState, ProfileState} from '@/store/reducers'

type Props = PropsWithChildren<RouteComponentProps> & ProfileState

const Profile: FunctionComponent = (props: Props) => {

  return (
    <div>
      {props.title}
    </div>
  )
}

const mapStateToProps: (state: RootState) => ProfileState = (state) => state.profile

export default connect(mapStateToProps)(Profile)
