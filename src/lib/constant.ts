export interface AuthSNS {
  accessToken: string
  tokenSecret?: string
  type: number
}
export interface filterVoice {
  keyword?: string
  files?: string
  categoryIds?: string
  series?: string
  sortField?: string
  tagIds?: string
  page?: string
  limit?: number
  sortType?: string
  fromPrice?: number
  toPrice?: number
}
export const FILE_FORMAT = [
  { label: 'WAV', value: 'audio/wav' },
  { label: 'MP3', value: 'audio/mpeg' },
]
export const FIELD_VALID = ['files', 'categoryIds', 'tagIds', 'series']
