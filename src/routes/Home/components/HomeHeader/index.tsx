import React, {FunctionComponent,} from 'react'
import logo from '@/assets/images/logo.png'
import {BarsOutlined} from '@ant-design/icons'
import styles from './index.module.less'
import {Transition} from 'react-transition-group'

const duration = 500
const defaultStyles = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}
interface TransitionStyles {
  entering: React.CSSProperties,
  entered: React.CSSProperties,
  exiting: React.CSSProperties,
  exited: React.CSSProperties
}
const transitionStyles: TransitionStyles = {
  entering: {opacity: 1},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0}
}

interface Props {
  currentCategory: string
  setCurrentCategory: (currentCategory: string) => void
  isMenuVisible: boolean
  setMenuVisible: (visible: boolean) => void
  refresh?: () => void
  callback?: () => void
}

const HomeHeader: FunctionComponent<Props> = (props: Props) => {
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLUListElement
    const category = target.dataset['category']
    props.setMenuVisible(false)
    if (props.currentCategory === category) return
    props.callback?.()
    props.setCurrentCategory(category)
    props.refresh?.()
  }
  return (
    <div className={styles.homeHeader}>
      <img src={logo}
        alt="logo"
        className={styles.logo}
      />
      <BarsOutlined onClick={() => props.setMenuVisible(!props.isMenuVisible)}/>
      <Transition
        in={props.isMenuVisible}
        timeout={duration}
        unmountOnExit
      >
        {
          (stage: keyof TransitionStyles) => (
            <ul
              onClick={setCurrentCategory}
              className={styles.menu}
              style={{
                ...defaultStyles,
                ...transitionStyles[stage]
              }}
            >
              <li
                data-category="all"
                className={`${props.currentCategory === 'all' && styles.active} ${styles.item}`}
              >全部
              </li>
              <li
                data-category="react"
                className={`${props.currentCategory === 'react' && styles.active} ${styles.item}`}
              >React
              </li>
              <li
                data-category="vue"
                className={`${props.currentCategory === 'vue' && styles.active} ${styles.item}`}
              >Vue
              </li>
            </ul>
          )
        }
      </Transition>
    </div>
  )
}
export default HomeHeader