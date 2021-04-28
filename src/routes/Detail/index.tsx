import React, {FC, PropsWithChildren, useEffect, useState} from "react"
import {RouteComponentProps} from "react-router-dom"
import {StaticContext} from 'react-router'
import {connect} from "react-redux"
import {ICourse, ICourseResponse} from "@/typings"
import {getCourse} from '@/api/home'
import {Card, message } from "antd"
import NavBar from "@/components/NavBar"

interface IParams {
  id: string
}

type Props = PropsWithChildren<RouteComponentProps<IParams, StaticContext, ICourse>>

const CourseDetail: FC<Props> = (props: Props) => {
  const [course, setCourse] = useState<ICourse>({} as ICourse)
  console.log(props)
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
        cover={<video src={course.video} controls autoPlay={false}/>}
      >
        <Card.Meta
          title={course.title}
          description={<p>价格：{course.price}</p>}
        />
      </Card>
    </>
  )
}
export default connect()(CourseDetail)