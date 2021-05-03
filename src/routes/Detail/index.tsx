import React, {FC, PropsWithChildren, useEffect, useState} from "react"
import {RouteComponentProps} from "react-router-dom"
import {StaticContext} from 'react-router'
import {connect} from "react-redux"
import {ICourse, ICourseResponse} from "@/typings"
import {getCourse} from '@/api/home'
import {Button, Card, message} from "antd"
import NavBar from "@/components/NavBar"
import actions from '@/store/actions/cart'
import {ShoppingCartOutlined} from "@ant-design/icons/lib"
import styles from './index.module.less'

interface IParams {
  id: string
}

type Props = PropsWithChildren<RouteComponentProps<IParams, StaticContext, ICourse>> & typeof actions

const CourseDetail: FC<Props> = (props: Props) => {
  const [course, setCourse] = useState<ICourse>({} as ICourse)
  useEffect(() => {
    const course: ICourse = props.location.state
    if (course) return setCourse(course)
    const id = props.match.params.id
    getCourse<ICourseResponse>(id).then((result) => {
      if (result.success) {
        setCourse(result.data)
      } else {
        message.error(result.message)
      }
    }).catch(error => {
      message.error(error.message)
    })
  }, [])
  return (
    <>
      <NavBar>{course.title}</NavBar>
      <Card
        hoverable
        style={{width: '100%'}}
        cover={<video src={course.video} controls autoPlay={false} className={styles.video}/>}
      >
        <Card.Meta
          title={course.title}
          description={
            <>
              <p>价格：{course.price}</p>
              <Button className={styles.buyButton} icon={<ShoppingCartOutlined className={styles.buyIcon}/>} type={'primary'} onClick={() => {
                props.addCartItem(course)
              }}>加入购物车</Button>
            </>
          }
        />
      </Card>
    </>
  )
}

export default connect(null , actions)(CourseDetail)