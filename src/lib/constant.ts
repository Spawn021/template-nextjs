export interface AuthSNS {
  accessToken: string
  tokenSecret?: string
  type: number
}
export interface filterVoice {
  keyword?: string
  files?: string
  categories?: string
  series?: string
  sortField?: string
  page?: string
  limit?: number
  sortType?: string
  fromPrice?: number
  toPrice?: number
}
