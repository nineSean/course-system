import {ICourse} from "@/typings/course"

export interface ICartItem {
  checked: boolean
  amount: number
  course: ICourse
}