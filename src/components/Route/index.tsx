import React, {FC} from 'react'
import {Route as _Route} from 'react-router-dom'
import {cancelTokens} from '@/api'
import {RouteProps} from 'react-router'

type IProps = RouteProps

const Route: FC<IProps> = (props: IProps) => {
  cancelTokens.forEach(token => token())
  cancelTokens.length = 0
  return (
    <_Route {...props} />
  )
}

export default Route