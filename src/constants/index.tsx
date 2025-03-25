export const APP_PROVIDER = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
  TWITTER: 'twitter',
  APPLE: 'apple',
  LINE: 'line',
}
export const APP_TYPE = {
  [APP_PROVIDER.GOOGLE]: 2,
  [APP_PROVIDER.TWITTER]: 3,
}
export const ORDERS = {
  ASC: 'ASC',
  DESC: 'DESC',
  FIELD: 'field',
  ORDER: 'order',
}
export const APP_URL = {
  NOT_FOUND: '/not-found',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  MY_LIBRARY: '/profile/my-library',
  VOICE: '/voice',
  PERSONALIZED: '/personalized',
  CONTENT_DETAIL: 'voice/detail',
  SITE_INFORMATION_URL: (tab: string) => `site-information?tabs=${tab}`,

  VOICE_SEARCH: (keyword: string) =>
    keyword
      ? `/voice?keyword=${keyword}&sortField=createdAt&sortType=${ORDERS.DESC}&page=1`
      : `/voice?sortField=createdAt&sortType=${ORDERS.DESC}&page=1`,
  HOME: '/',
  SHOPING_CART: '/shopping-cart',
  CHECKOUT: '/checkout',
  SITE_INFORMATION: '/site-information',
  FAQ_AND_GUIDELINE: '/faqs-and-guideline',
}

export const SORT_TYPE = {
  NEW: '1',
  OLD: '2',
  HIGH_PRICE: '3',
  LOW_PRICE: '4',
  TOP_SALES: '5',
}
export const SORT_TYPE_FILTER = {
  [SORT_TYPE.NEW]: {
    sortField: 'createdAt',
    sortType: 'DESC',
  },
  [SORT_TYPE.OLD]: {
    sortField: 'createdAt',
    sortType: 'ASC',
  },
  [SORT_TYPE.HIGH_PRICE]: {
    sortField: 'unitPrice',
    sortType: 'DESC',
  },
  [SORT_TYPE.LOW_PRICE]: {
    sortField: 'unitPrice',
    sortType: 'ASC',
  },

  [SORT_TYPE.TOP_SALES]: {
    sortField: 'totalPurchase',
    sortType: 'DESC',
  },
}
export const FORMAT_DATE_PICKER = 'YYYY/MM/DD'
export const STATUS_CONTENT = {
  OFF_SALE: 'off-sale',
  ON_SALE: 'on-sale',
}
