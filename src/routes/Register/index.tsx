import NavBar from "@/components/NavBar"
import {Button, Form, Input, message} from "antd"
import React, {FunctionComponent, PropsWithChildren} from "react"
import {RegisterPayload} from "@/typings/user"
import {Link, RouteComponentProps} from "react-router-dom"
import actions from '@/store/actions/user'
import {connect} from "react-redux"
import {ProfileState, RootState} from '@/store/reducers'
import styles from './index.module.less'
import {UserOutlined, LockOutlined, MailOutlined} from "@ant-design/icons"

type DispatchProps = typeof actions
type StateProps = ReturnType<typeof mapStateToProps>
type Props = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps
const Register: FunctionComponent = (props: Props) => {
  function onFinish(data: RegisterPayload) {
    props.register(data)
  }

  function onFinishFailed(error: any) {
    message.error('注册失败')
  }

  return (
    <>
      <NavBar>注册</NavBar>
      <Form
        className={styles.form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[{required: true, message: '请确认密码'}]}
        >
          <Input.Password
            prefix={<LockOutlined/>}
            placeholder="确认密码"
          />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{type: 'email'}]}
        >
          <Input
            prefix={<MailOutlined/>}
            placeholder="邮箱"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
          &nbsp;或者&nbsp;
          <Link to="/login">立即登录</Link>
        </Form.Item>
      </Form>
    </>
  )
}
const mapStateToProps = (state: RootState): ProfileState => state.profile
export default connect(mapStateToProps, actions)(Register)