import { APP_TYPE, SORT_TYPE, SORT_TYPE_FILTER } from '@/constants'
import { Category, ProductItem, Tag } from '@/types/Home'
import { Col, Row, Tooltip, Typography } from 'antd'
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
