import React, {PropsWithChildren, FunctionComponent, useEffect} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {RootState, ProfileState} from '@/store/reducers'
import actions from '@/store/actions/user'
import NavBar from '@/components/NavBar'
import {AxiosError} from 'axios'
import {message, Descriptions, Alert, Button} from 'antd'
import LoginState from '@/typings/login-types'
import styles from './index.module.less'

type DispatchProps = typeof actions
type Props = PropsWithChildren<RouteComponentProps> & ProfileState & DispatchProps
const Profile: FunctionComponent = (props: Props) => {
  useEffect(() => {
    props.validate().catch((error: AxiosError) => message.error(error.message))
  }, [])
  let content
  if (props.loginState === LoginState.UNLOGINED) {
    content = (
      <>
        <Alert
          className={styles.alert}
          type="warning"
          message="请登录"
          description="亲爱的用户你好，你当前尚未登录，请你选择注册或者登录"
        />
        <section className={styles.buttons}>
          <Button
            className={styles.register}
            type='dashed'
            onClick={() => props.history.push('/register')}
          >注册</Button>
          <Button
            type='dashed'
            onClick={() => props.history.push('/login')}
          >登录</Button>
        </section>
      </>
    )
  } else if (props.loginState === LoginState.LOGINED) {
    content = (
      <section className={styles.userInfo}>
        <Descriptions title='用户信息'>
          <Descriptions.Item label='用户名'>{props.user.username}</Descriptions.Item>
          {props.user.email && <Descriptions.Item label='邮箱'>{props.user.email}</Descriptions.Item>}
        </Descriptions>
        <Button
          type='primary'
          onClick={() => props.logout()}
        >退出登录</Button>
      </section>
    )
  }
  return (
    <div>
      <NavBar>个人中心</NavBar>
      {content}
    </div>
  )
}
const mapStateToProps: (state: RootState) => ProfileState = (state) => state.profile
export default connect(mapStateToProps, actions)(Profile)
