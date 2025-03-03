import { APP_TYPE } from '@/constants'
const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key]
export const getTypeProvider = (provider: string) => {
  return getKeyValue(provider)(APP_TYPE)
}
