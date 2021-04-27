import {RefObject, useEffect} from "react"
import {downRefresh} from "@/utils/index"

export function useDownRefresh(callback: Function, ref: RefObject<HTMLElement>){
  useEffect(() => {
    const element = ref.current
    const onTouchstart = downRefresh(callback, element)
    return () => {
      element.removeEventListener('touchstart', onTouchstart)
    }
  }, [])
}
