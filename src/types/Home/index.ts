export interface IHomeBanner {
  redirectUrl?: string
  isDisplay?: boolean
  bannerRectangle?: string
  bannerSquare?: string
  order?: number | null
}
export interface IHomeSiteCustoms {
  id?: number
  url?: string
  isEnable?: boolean
  description?: string
}
export interface Image {
  createdAt: string
  updateAt: string
  id: string
  name: string
  type: string
  url: string
}
export interface Tag {
  id: string
  name: string
  count: number
}
export interface ProductItem {
  id: string
  actor: string
  images: Image[] | []
  title: string
  series: string
  totalPurchase: number
  description: string
  unitPrice: number
  isAddToCart: boolean
  isBought: boolean
  isPending: boolean
  category: {
    color: string
    colorBorder: string
    colorText: string
    name: string
  }
  tags: Tag[]
}
export interface Category {
  id: string | number
  name: string
  count: number
}
export interface Tag {
  id: string
  name: string
  count: number
}

export interface InfoPayment {
  contents: { id: string; unitPrice: number }[]
  currency: string
  paymentMethod?: string
}
