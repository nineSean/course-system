import React, {PropsWithChildren, FunctionComponent, useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {RootState, ProfileState} from '@/store/reducers'
import actions from '@/store/actions/user'
import NavBar from '@/components/NavBar'
import {message, Descriptions, Alert, Button, Upload} from 'antd'
import LoginState from '@/typings/login-types'
import styles from './index.module.less'
import {LoadingOutlined} from '@ant-design/icons'
import {UploadOutlined} from "@ant-design/icons/lib"
import {baseURL} from '@/api/index'
import {UploadChangeParam} from "antd/lib/upload"

type DispatchProps = typeof actions
type Props = PropsWithChildren<RouteComponentProps> & ProfileState & DispatchProps
const Profile: FunctionComponent = (props: Props) => {
  useEffect(() => {
    props.validate()
  }, [])
  const [loading, setLoading] = useState(false)
  const uploadButton = (
    <>
      {
        loading ? <LoadingOutlined/> : <UploadOutlined/>
      }
    </>
  )
  const onChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') setLoading(true)
    if (info.file.status === 'done') {
      const {success, data, message} = info.file.response
      if (success) {
        setLoading(false)
        props.uploadAvatar(data)
      } else {
        message.error(message)
      }
    }
  }
  let content
  if (props.loginState === LoginState.UNLOGINED) {
    content = (
      <>
        <Alert
          type="warning"
          message="请登录"
          description="亲爱的用户你好，你当前尚未登录，请你选择注册或者登录"
        />
        <section className={styles.buttons}>
          <Button
            className={styles.register}
            type="dashed"
            onClick={() => props.history.push('/register')}
          >注册</Button>
          <Button
            type="dashed"
            onClick={() => props.history.push('/login')}
          >登录</Button>
        </section>
      </>
    )
  } else if (props.loginState === LoginState.LOGINED) {
    content = (
      <section className={styles.userInfo}>
        <Descriptions title="用户信息">
          <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
          {props.user.email && <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>}
          <Descriptions.Item label={'头像'}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${baseURL}/user/avatar`}
              data={{userId: props.user.id}}
              beforeUpload={beforeUpload}
              onChange={onChange}
            >
              {
                props.user.avatar
                  ? <img
                    src={props.user.avatar}
                    alt="头像"
                    className={styles.avatarImg}
                  />
                  : uploadButton
              }
            </Upload>
          </Descriptions.Item>
        </Descriptions>
        <Button
          type="primary"
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
const beforeUpload = (file: File) => {
  const isPngOrJpg = file.type === 'image/png' || file.type === 'image/jpeg'
  if (!isPngOrJpg) {
    message.error('你只能上传JPG/PNG格式的图片')
  }
  const isLessThan2M = file.size / 1024 / 1024 < 2
  if (!isLessThan2M) {
    message.error('你只能上传小于2M的图片')
  }
  return isPngOrJpg && isLessThan2M
}
const mapStateToProps: (state: RootState) => ProfileState = (state) => state.profile
export default connect(mapStateToProps, actions)(Profile)
