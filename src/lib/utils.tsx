import {
  APP_TYPE,
  LIST_FILE_FORMAT,
  SORT_TYPE,
  SORT_TYPE_FILTER,
  TYPE_MODAL_CONTENT,
} from '@/constants'
import { Category, ProductItem, Tag } from '@/types/Home'
import BigNumber from 'bignumber.js'
import { Col, Row, Tooltip, Typography } from 'antd'
import { filterVoice } from '@/lib/constant'
const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key]
export const getTypeProvider = (provider: string) => {
  return getKeyValue(provider)(APP_TYPE)
}
export const parseItem = (item: ProductItem) => {
  if (!item)
    return {
      id: '',
      title: '',
      actor: '',
      description: '',
      series: '',
      isAddToCart: false,
      totalPurchase: 0,
      unitPrice: 0,
      images: [],
      isBought: false,
      isPending: false,
      category: {
        color: '',
        colorBorder: '',
        colorText: '',
        name: '',
      },
      tags: [],
    }
  if (item) {
    return {
      id: item.id,
      actor: item.actor,
      series: item.series,
      title: item.title,
      description: item.description,
      isAddToCart: item.isAddToCart,
      totalPurchase: item?.totalPurchase,
      unitPrice: item.unitPrice,
      images: item?.images,
      isBought: item?.isBought,
      isPending: item?.isPending,
      category: item?.category,
      tags: item?.tags,
    }
  }
}
export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength / 2) + '...' + text.slice(-maxLength / 2)
  }
  return text
}
export const parseSortBy = (sortType = SORT_TYPE.NEW) => {
  return SORT_TYPE_FILTER[sortType]
}
export const ParseOptionCategoryAndTag = (item: Category | Tag) => {
  const { Text } = Typography
  const name = (
    <Row className="flex justify-between">
      <Col span={16}>
        <Text ellipsis={{ tooltip: item?.name }}>{item?.name}</Text>
      </Col>
      <Col span={4}>{item.count}</Col>
    </Row>
  )

  return {
    label: name,
    value: item.id,
  }
}
export const convertArrayToString = (arr: any[]) => {
  if (Array.isArray(arr)) {
    let str = ''
    const arrCopy = arr.filter((f) => f)
    const finalArray = [...new Set(arrCopy)]
    if (finalArray && finalArray.length) {
      const length = finalArray.length - 1
      finalArray.map((item: string, index: number) => {
        if (length === index) {
          str += item
        } else {
          str += item + ','
        }
      })
      return str
    }
    return ''
  }
}
export const convertStringToArray = (value: string | number) => {
  if (value && String(value).includes(',')) {
    let split: any | number[] | string[] = String(value).split(',')
    split = split.map((item: string | number) => {
      return isNaN(Number(item)) ? item : Number(item)
    })
    return split
  }
  return [Number(value) ? Number(value) : value]
}
export const convertSizeToUnit = (size: number) => {
  const GB = 1024 * 1024 * 1024
  const MB = 1024 * 1024
  if (size) {
    if (Number(Number(size / MB).toFixed(2)) < 1024) {
      return Number(size / MB).toFixed(2) + 'MB'
    } else {
      return Number(size / GB).toFixed(2) + 'GB'
    }
  }
  return 0 + ' MB'
}
export const getTimeRunning = (duration: number) => {
  if (duration) {
    return new Date(duration * 1000).toISOString().slice(11, 19)
  }
  return '00:00:00'
}
export const compareTwoNumber = (valueOne: number, valueTwo: number) => {
  const result = new BigNumber(valueOne).gt(valueTwo)
  return result
}
export const CURRENCY_PAYMENT = 'jpy'
export const TYPE_MODAL_ERROR_CHECKOUT = {
  CHANGE_PRICE: 'CHANGE_PRICE',
  ITEM_UNAVAIBLE: 'ITEM_UNAVAIBLE',
}
export const TYPE_VIEW = {
  VIEW_DETAIL: 'VIEW_DETAIL',
  VIEW_MY_LIBRARY: 'VIEW_MY_LIBRARY',
}
export const getTotalSize = (value1: number, value2: number, value3: number) => {
  const total = new BigNumber(value1)
    .plus(new BigNumber(value2))
    .plus(new BigNumber(value3))
  return total
}
export const getFileFormat = (value: string) => {
  if (!value) return

  const arr = value.split(',')
  const listFile = LIST_FILE_FORMAT.filter((e: any) => arr.includes(e?.value))
  const result = listFile.map((e) => e?.label)

  return result.toString()
}
export const localeNumber = (value: string | number) => {
  if (value) {
    if (typeof value === 'string') {
      return Number(value).toLocaleString('en-us')
    }
    return value.toLocaleString('en-us')
  }
  return 0
}
export const parseDate = (date: string) => {
  if (date) {
    return date.replaceAll('&#x2F;', '/')
  }
  return ''
}
export const parseQueryParams = (params: any) => {
  let queryParams = ''
  const keys = Object.keys(params)

  const length = keys.length - 1
  keys.map((key: string, index) => {
    const value = getKeyValue(key)(params) ? getKeyValue(key)(params) : ''
    if (index !== length && value) {
      queryParams += `${key}=${Number(value) ? Number(value) : value}&`
    }
    if (index === length && value) {
      queryParams += `${key}=${Number(value) ? Number(value) : value}`
    }
  })

  return queryParams
}
export const capitalizeValue = (value: string) => {
  return value[0].toUpperCase() + value.substring(1)
}
export const getContentModal = ({ typeModal }: { typeModal: number }) => {
  const {
    title,
    subtitle,
    content,
  }: { title: string; subtitle: string; content: React.ReactNode } =
    TYPE_MODAL_CONTENT[typeModal] || {}

  if (title) {
    return {
      title,
      subtitle,
      content,
    }
  }
  return { title: '', subtitle: '', content: null }
}
