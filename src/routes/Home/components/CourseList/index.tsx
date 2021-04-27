import React, {FC, RefObject, useEffect} from "react"
import {MenuOutlined} from '@ant-design/icons'
import styles from './index.module.less'
import {Alert, Button, Card, Skeleton} from "antd"
import {Courses} from "@/store/reducers/home"
import {Link} from "react-router-dom"
import {ICourse} from "@/typings"
import VirtualList from "@/components/VirtualList"
import {AnyAction} from "redux"

interface IProps {
  courses: Courses
  getCourses: any
  initCourses: () => AnyAction
  containerRef?: RefObject<HTMLElement>
}

const CourseList: FC<IProps> = (props: IProps) => {
  useEffect(() => {
    props.initCourses()
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
        <VirtualList
          itemHeight={650 / 75 * parseFloat(document.documentElement.style.fontSize)}
          list={props.courses.list}
          containerRef={props.containerRef}
          template={(course: ICourse, styles) => (
            <Link
              key={course.id}
              to={{
                pathname: `/detail/${course.id}`,
                state: course
              }}
              style={styles}
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
          )}
        />
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