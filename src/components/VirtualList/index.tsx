import { debounce } from "@/utils"
import React, {CSSProperties, FC, RefObject, useEffect, useRef, useState} from "react"
import styles from './index.module.less'

interface IProps {
  itemHeight: number
  list: any[]
  template: (item: any, styles: CSSProperties) => JSX.Element
  containerRef: RefObject<HTMLElement>
}

const VirtualList: FC<IProps> = (props: IProps) => {
  const virtualListRef = useRef(null)
  const [list, setList] = useState(props.list.map((item, index) => ({...item, index})))
  const genStyles = (index: number): CSSProperties => (
    {
      position: 'absolute',
      left: 0,
      top: `${props.itemHeight * index}px`,
      width: '100%',
    }
  )
  let element: HTMLElement
  useEffect(() => {
    const onScroll = debounce(_onScroll)
    element = props.containerRef.current
    element.addEventListener('scroll', onScroll)

    setList(props.list.map((item, index) => ({...item, index})))
    return () => {
      element.removeEventListener('scroll', onScroll)
    }
  }, [props.list])

  function _onScroll(e: Event) {
    const offsetTop = virtualListRef.current.offsetTop
    const scrollTop = element.scrollTop
    const clientHeight = element.clientHeight
    const size = Math.ceil(clientHeight / props.itemHeight)
    const deltaY = (scrollTop - offsetTop) > 0 ? (scrollTop - offsetTop) : 0
    let start = Math.floor(deltaY / props.itemHeight)
    let end = start + size
    start = start - 1 > 0 ? (start - 1) : 0
    end = end + 1 > props.list.length ? props.list.length : end + 1
    setList(props.list.map((item, index) => ({...item, index})).slice(start, end))
  }

  return (
    <section ref={virtualListRef} className={styles.virtualList} style={{height: `${props.itemHeight * props.list.length}px`}}>
      {
        list.map((item) => props.template(item, genStyles(item.index)))
      }
    </section>
  )
}

export default VirtualList