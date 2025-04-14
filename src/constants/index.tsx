import ChangeEmailModal from '@/components/ModalCustom/ChangeEmailModal'
import ChangePasswordProfileModal from '@/components/ModalCustom/ChangePasswordProfileModal'
import VerifyEmailModal from '@/components/ModalCustom/VerifyEmailModal'

import { FilterTransaction } from '@/types/Profile'
import CardPayment from '@/components/Checkout/CardPayment'
import LoginHistoryModal from '@/components/ModalCustom/LoginHistoryModal'

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
export const PAYMENT_METHOD = {
  CREDIT_CART: 'credit-card',
  KONBINI: 'konbini',
}
export const MIN_PRICE_KONBINI = 120
export const MIN_PRICE_CREDIT_CARD = 50
export const MAX_PRICE_KONBINI = 300000
export const MAX_PRICE_CREDIT_CARD = 99999999
export const PROFILE_SECTION = {
  MY_PROFILE: 'my_profile',
  TRANSACTION_HISTORY: 'transaction_history',
  MY_LIBRARY: 'my_library',
  QR_CODE: 'qr_code',
  SIGN_OUT: 'sign_out',
}
export const initFilterMyLibrary: FilterTransaction = {
  page: 1,
  limit: 10,
}

export enum FileMediaType {
  WAV = 'audio/wav',
  MP3 = 'audio/mpeg',
  FLAC = 'audio/flac',
  JSON = 'application/json',
}
export const LIST_FILE_FORMAT = [
  // { label: 'FLAC', value: FileMediaType.FLAC },
  { label: 'MP3', value: FileMediaType.MP3 },
  { label: 'WAV', value: FileMediaType.WAV },
  // { label: 'JSON', value: FileMediaType.JSON },
]
export const PAYMENT_METHOD_OPTIONS = [
  {
    label: 'Credit card',
    value: 'credit-card',
  },
  {
    label: 'Konbini',
    value: 'konbini',
  },
]
export const STATUS_TRANSACTION = [
  {
    label: 'Successful',
    value: 'success',
  },
  { label: 'Failed', value: 'failed' },
  { label: 'Pending', value: 'pending' },
]
export const FORMAT_DATE = 'YYYY/MM/DD'
export const FORMAT_TIME = 'HH:mm:ss'
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]
export enum DownloadType {
  NORMAL = 'normal',
  PERSONALIZED = 'personalized',
}
export const initFilterTransaction: FilterTransaction = {
  page: 1,
  limit: 10,
}
export const FORMAT_DATETIME = 'YYYY/MM/DD HH:mm:ss'
export const STATUS_TRANSACTION_VALUE = {
  SUCCESS: 'success',
  FAILER: 'failed',
  PENDING: 'pending',
}
export const messageError = {
  E0: 'User exists.',
  E1: 'Data is Invalid',
  E2: 'Data not found',
  E3: 'Please enter a valid email',
  E4: 'This email is not authorized as admin email',
  E5: 'Field is required',
  E6: 'Email or password is not correct',
  E7: 'Password must contain at least 8 characters and includes at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
  E8: "Couldn't find your email",
  E9: 'Your account is banned',
  E10: 'Email is already registered',
  E11: 'Password does not match',
  E12: 'Please agree with Terms and Policy',
  E13: 'Verification code is not correct',
  E14: 'Current password is not correct',
  E15: 'New password cannot be the same as current password',
}
export const TYPE_MODAL = {
  FORGET_MODAL: 1,
  RESET_PASSWORD: 3,
  CHANGE_PASSWORD_SUCCESS: 4,
  VERIFY_REGISTER_MODAL: 5,
  VERIFY_REGISTER_SUCCESS_MODAL: 6,
  CHANGE_PASSWORD_PROFILE: 7,
  ADD_CARD_PAYMENT: 8,
  EDIT_CARD_PAYMENT: 15,
  LOGIN_HISTORY: 9,
  VERIFY_EMAIL_OLD: 11,
  CHANGE_EMAIL: 12,
  VERIFY_EMAIL_NEW: 13,
  CONFIRM_DELETE_CARD: 14,
  ADD_EMAIL: 16,
}
export const TYPE_MODAL_CONTENT = {
  [TYPE_MODAL.FORGET_MODAL]: {
    title: 'auth.reset_password',
    subtitle: '',
    content: '',
  },

  [TYPE_MODAL.RESET_PASSWORD]: {
    title: 'auth.reset_password',
    subtitle: '',
    content: '',
  },

  [TYPE_MODAL.VERIFY_REGISTER_MODAL]: {
    title: 'auth.verify_account',
    subtitle: 'auth.verify_code_subtitle',
    content: '',
  },

  [TYPE_MODAL.CHANGE_PASSWORD_SUCCESS]: {
    title: 'auth.reset_password',
    subtitle: '',
    content: '',
  },
  [TYPE_MODAL.VERIFY_REGISTER_SUCCESS_MODAL]: {
    title: 'auth.verify_account',
    subtitle: 'auth.account_verified',
    content: '',
  },

  [TYPE_MODAL.ADD_CARD_PAYMENT]: {
    title: 'Add Credit Card',
    subtitle: '',
    content: <CardPayment />,
  },

  [TYPE_MODAL.EDIT_CARD_PAYMENT]: {
    title: 'Edit Credit Card',
    subtitle: '',
    content: <CardPayment />,
  },

  [TYPE_MODAL.CHANGE_PASSWORD_PROFILE]: {
    title: 'Change password',
    subtitle: '',
    content: <ChangePasswordProfileModal />,
  },
  [TYPE_MODAL.LOGIN_HISTORY]: {
    title: 'Login history',
    subtitle: 'You can view your login history in the latest 30 days.',
    content: <LoginHistoryModal />,
  },

  [TYPE_MODAL.CHANGE_EMAIL]: {
    title: 'Edit Email Address',
    subtitle: '',
    content: <ChangeEmailModal />,
  },

  [TYPE_MODAL.ADD_EMAIL]: {
    title: 'profile.add_email_address',
    subtitle: 'profile.edit_email_description',
    content: '',
  },

  [TYPE_MODAL.VERIFY_EMAIL_OLD]: {
    title: 'Enter verification code',
    subtitle: '',
    content: <VerifyEmailModal />,
  },

  [TYPE_MODAL.VERIFY_EMAIL_NEW]: {
    title: 'Enter verification code',
    subtitle: 'auth.verify_code_subtitle',
    content: <VerifyEmailModal />,
  },

  [TYPE_MODAL.CONFIRM_DELETE_CARD]: {
    title: 'profile.remove_card_title',
    subtitle: 'profile.remove_card_description',
    content: '',
  },
}
export const regexStrongPassword = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$'
export const TIME_FORMAT_AM_PM = 'YYYY/MM/DD HH:mm:ss A'
