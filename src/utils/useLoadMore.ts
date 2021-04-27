import {RefObject, useEffect} from "react"
import {upLoadMore} from "@/utils/index"

export function useLoadMore(callback: Function, ref: RefObject<HTMLElement>){
  useEffect(() => {
    const element = ref.current
    const onScroll = upLoadMore(callback, element, 50)
    return () => {
      element.removeEventListener('scroll', onScroll)
    }
  }, [])
}
