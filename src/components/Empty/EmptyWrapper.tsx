import { useRouter } from '@/i18n/routing'

import { Button, Empty } from 'antd'
import NoDataIcon from '@/resources/svg/NoDataIcon'
import { APP_URL, ORDERS } from '@/constants'
import useDrawerCart from '@/hooks/useDrawerCart'

export default function EmptyWrapper({
  hasButton = true,
  message,
}: {
  hasButton?: boolean
  message: string
}) {
  const router = useRouter()
  const { onClose } = useDrawerCart()
  const handleRedirect = () => {
    const queryParams: any = { sortField: 'createdAt', sortType: ORDERS.DESC }
    onClose()
    router.push({
      pathname: APP_URL.VOICE,
      query: queryParams,
    })
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[250px] empty-wrapper">
      <Empty image={<NoDataIcon />} description={<span>{message}</span>}>
        {hasButton && (
          <button
            className="px-3 py-1 border bg-[#00aaf2] w-full rounded-[8px] text-base text-white hover:bg-[#fff] hover:text-[#00aaf2] hover:border-[#00aaf2]"
            onClick={handleRedirect}
          >
            今すぐ購入
          </button>
        )}
      </Empty>
    </div>
  )
}
