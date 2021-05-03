import React, {FunctionComponent, PropsWithChildren} from "react"
import {RouteComponentProps} from "react-router-dom"
import {connect} from 'react-redux'
import actions from '@/store/actions/user'
import {RootState, ProfileState} from '@/store/reducers'
import NavBar from "@/components/NavBar"
import {Form, Input, Button, message} from "antd"
import {LoginPayload} from "@/typings/user"
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import styles from './index.module.less'

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions
type Props = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps
const Login: FunctionComponent = (props: Props) => {
  const onFinish = (data: LoginPayload) => {
    props.login(data)
  }
  const onFinishFailed = (error: any) => {
    message.error('登录失败')
  }
  return (
    <>
      <NavBar>登录</NavBar>
      <Form
        className={styles.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout={'vertical'}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{required: true, message: '请输入用户名'}]}
        >
          <Input
            prefix={<UserOutlined/>}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{required: true, message: '请输入密码'}]}
        >
          <Input.Password
            prefix={<LockOutlined/>}
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >登录</Button>
        </Form.Item>
      </Form>
    </>
  )
}
const mapStateToProps = (state: RootState): ProfileState => state.profile
export default connect(mapStateToProps, actions)(Login)