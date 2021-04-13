import React, {FunctionComponent, PropsWithChildren} from 'react'
import {LeftOutlined} from '@ant-design/icons'
import styles from './index.module.less'
import {withRouter, RouteComponentProps} from 'react-router-dom'

type Props = PropsWithChildren<RouteComponentProps>

const NavBar: FunctionComponent = (props: Props) => {
  return (
    <section className={styles.navBar}>
      <LeftOutlined className={styles.leftIcon} onClick={() => props.history.goBack()}/>
      {props.children}
    </section>
  )
}
export default withRouter(NavBar)

