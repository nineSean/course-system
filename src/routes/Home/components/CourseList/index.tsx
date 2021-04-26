import React, {FC, useEffect} from "react"
import {MenuOutlined} from '@ant-design/icons'
import styles from './index.module.less'
import {Alert, Button, Card, Skeleton} from "antd"
import {Courses} from "@/store/reducers/home"
import {Link} from "react-router-dom"

interface IProps {
  courses: Courses
  getCourses: any
}

const CourseList: FC<IProps> = (props: IProps) => {
  useEffect(() => {
    props.getCourses()
  }, [])
  return (
    <section className={styles.courseList}>
      <h2>
        <MenuOutlined/> 全部课程
      </h2>
      <Skeleton
        loading={!props.courses.list.length && props.courses.loading}
        active
        paragraph={{rows: 8}}
      >
        {
          props.courses.list.map(course => (
            <Link
              key={course.id}
              to={{
                pathname: `/detail/${course.id}`,
                state: course
              }}
            >
              <Card
                hoverable
                style={{width: '100%'}}
                cover={<img
                  alt={course.title}
                  src={course.poster}
                />}
              >
                <Card.Meta
                  title={course.title}
                  description={`价格：${course.price}`}
                />
              </Card>
            </Link>
          ))
        }
        {
          props.courses.hasMore ? (
            <Button
              type={'primary'}
              onClick={props.getCourses}
              loading={props.courses.loading}
              block
            >
              {props.courses.loading ? '' : '加载更多'}
            </Button>
          ) : (
            <Alert
              type={'warning'}
              message={'到底了'}
              style={{textAlign: 'center'}}
            />
          )
        }
      </Skeleton>
    </section>
  )
}
export default CourseList