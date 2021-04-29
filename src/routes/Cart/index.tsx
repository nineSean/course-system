import NavBar from "@/components/NavBar"
import {Button, InputNumber, message, Popconfirm, Table, Row, Col, Badge} from "antd"
import React, {FC, PropsWithChildren} from "react"
import {RouteComponentProps} from "react-router-dom"
import {connect} from "react-redux"
import {CartState, RootState} from "@/store/reducers"
import actions from '@/store/actions/cart'
import {ICartItem, ICourse} from "@/typings"
import {extractNumber} from '@/utils'
import styles from './index.module.less'

type DispatchProps = typeof actions
type StateProps = ReturnType<typeof mapStateToProps>
type IProps = PropsWithChildren<RouteComponentProps> & DispatchProps & StateProps
const Cart: FC<IProps> = (props: IProps) => {
  const maxNumber = 999
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'course',
      render(course: ICourse) {
        return {
          children: (
            <>
              <p>{course.title}</p>
              <p>单价：{course.price}</p>
            </>
          ),
        }
      }
    },
    {
      title: '数量',
      dataIndex: 'amount',
      render(amount: number, row: ICartItem) {
        return {
          children: (<InputNumber
            size={'small'}
            type={'small'}
            min={1}
            max={maxNumber}
            value={amount}
            onChange={(n: number) => {
              if (typeof n !== 'number') {
                n = 1
              }
              if (n > maxNumber) n = maxNumber
              props.changeCartItemAmount(row.course.id, n)
            }}
          />),
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'course',
      render(_: never, row: ICartItem) {
        return {
          children: (
            <Popconfirm
              title="确认删除？"
              onConfirm={() => {
                props.removeCartItem(row.course.id)
                message.success('删除成功')
              }}
              onCancel={() => message.error('取消删除')}
              okText="是"
              cancelText="否"
            >
              <Button type={'primary'} size={'small'}>删除</Button>
            </Popconfirm>
          ),
        }
      }
    },
  ]
  const rowSelection = {
    selectedRowKeys: props.cart.filter(item => item.checked).map(item => item.course.id),
    onChange: (keys: string[]) => props.changeCartItemsChecked(keys),
  }
  const totalAmount = props.cart.reduce((total, currentItem) => {
    return currentItem.checked ? total + currentItem.amount : total
  }, 0)
  const totalPrice = props.cart.reduce((total, currentItem) => {
    return currentItem.checked ? total + currentItem.amount * extractNumber(currentItem.course.price) : total
  }, 0)
  return (
    <>
      <NavBar>购物车</NavBar>
      <Table
        dataSource={props.cart}
        rowKey={row => row.course.id}
        columns={columns}
        rowSelection={rowSelection}
        pagination={false}
      />
      {
        props.cart.length ?
          <Row justify={'space-around'} className={styles.summary}>
            <Col span={4}>
              <Popconfirm
                title="确认清空？"
                onConfirm={() => {
                  props.clearCart()
                  message.success('清空成功')
                }}
                onCancel={() => message.error('取消清空')}
                okText="是"
                cancelText="否"
              >
                <Button
                  type={'primary'}
                  danger
                  size={'middle'}
                >清空</Button>
              </Popconfirm>
            </Col>
            <Col span={8}>
              已选择<Badge
                count={totalAmount}
                overflowCount={99999}
                showZero
              />件商品
            </Col>
            <Col span={6}>
              总价¥{totalPrice}元
            </Col>
            <Col span={4}>
              <Button type={'primary'} size={'middle'} onClick={() => props.settle()}>结算</Button>
            </Col>
          </Row>
          : ''
      }
    </>
  )
}
const mapStateToProps = (state: RootState): { cart: CartState } => ({cart: state.cart})
export default connect(mapStateToProps, actions)(Cart)