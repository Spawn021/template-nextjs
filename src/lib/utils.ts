import { APP_TYPE, SORT_TYPE, SORT_TYPE_FILTER } from '@/constants'
import { ProductItem } from '@/types/Home'
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
