import React, {FunctionComponent, PropsWithChildren, useEffect, useRef,} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {HomeState, RootState} from "@/store/reducers"
import HomeHeader from './components/HomeHeader'
import actions from '@/store/actions/home'
import Slide from '@/components/Slide'
import styles from './index.module.less'
import CourseList from './components/CourseList'
import {downRefresh} from "@/utils"

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions
type Props = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps
const Home: FunctionComponent = (props: Props) => {
  const mainContentRef = useRef(null)
  useEffect(() => {
    const onTouchstart = downRefresh(props.refreshCourses, mainContentRef.current)
    return () => {
      mainContentRef.current.removeEventListener('touchstart', onTouchstart)
    }
  }, [])

  return (
    <>
      <HomeHeader
        setCurrentCategory={props.setCurrentCategory}
        currentCategory={props.currentCategory}
      />
      <div
        className={styles.mainContent}
        ref={mainContentRef}
      >
        <Slide
          className={styles.homeSlide}
          getSlides={props.getSlides}
          slides={props.slides}
        />
        <CourseList
          courses={props.course}
          getCourses={props.getCourses}
        />
      </div>
    </>
  )
}
const mapStateToProps: (state: RootState) => HomeState = (state) => state.home
export default connect(mapStateToProps, actions)(Home)
