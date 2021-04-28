import React, {FunctionComponent, PropsWithChildren, useRef, useState,} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {HomeState, RootState} from "@/store/reducers"
import HomeHeader from './components/HomeHeader'
import actions from '@/store/actions/home'
import Slide from '@/components/Slide'
import styles from './index.module.less'
import CourseList from './components/CourseList'
import {useDownRefresh, useLoadMore} from "@/utils"

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions
type Props = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps
const Home: FunctionComponent = (props: Props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const mainContentRef = useRef(null)
  useDownRefresh(props.refreshCourses, mainContentRef)
  useLoadMore(props.getCourses, mainContentRef)

  return (
    <>
      <HomeHeader
        setCurrentCategory={props.setCurrentCategory}
        currentCategory={props.currentCategory}
        refresh={props.refreshCourses}
        callback={() => props.initCourses()}
        isMenuVisible={isMenuVisible}
        setMenuVisible={setIsMenuVisible}
      />
      <div
        className={styles.mainContent}
        ref={mainContentRef}
        onClick={() => isMenuVisible && setIsMenuVisible(false)}
      >
        <Slide
          className={styles.homeSlide}
          getSlides={props.getSlides}
          slides={props.slides}
        />
        <CourseList
          initCourses={props.initCourses}
          courses={props.course}
          getCourses={props.getCourses}
          containerRef={mainContentRef}
        />
      </div>
    </>
  )
}
const mapStateToProps: (state: RootState) => HomeState = (state) => state.home
export default connect(mapStateToProps, actions)(Home)
