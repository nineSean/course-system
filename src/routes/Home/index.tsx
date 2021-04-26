import React, {FunctionComponent, PropsWithChildren, useEffect,} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {HomeState, RootState} from "@/store/reducers"
import HomeHeader from './components/HomeHeader'
import actions from '@/store/actions/home'
import Slide from '@/components/Slide'
import styles from './index.module.less'
import CourseList from './components/CourseList'

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions
type Props = PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps

const Home: FunctionComponent = (props: Props) => {
  return (
    <>
      <HomeHeader setCurrentCategory={props.setCurrentCategory} currentCategory={props.currentCategory}/>
      <Slide className={styles.homeSlide} getSlides={props.getSlides} slides={props.slides}/>
      <CourseList
        courses={props.course}
        getCourses={props.getCourses}
      />
    </>
  )
}

const mapStateToProps: (state: RootState) => HomeState = (state) => state.home

export default connect(mapStateToProps, actions)(Home)
