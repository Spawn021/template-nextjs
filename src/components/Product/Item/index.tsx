/* eslint-disable @next/next/no-img-element */
import TagCategory from '@/components/Product/Item/TagCategory'
import TagProduct from '@/components/Product/Item/TagProduct'
import { ProductItem } from '@/types/Home'
import { Tag, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useRouter } from '@/i18n/routing'
import { APP_URL } from '@/constants'
import { TYPE_VIEW } from '@/lib/utils'
type props = {
  data?: ProductItem
  fromVoice?: boolean
  toggle?: boolean
}
const { Text } = Typography
export default function Item({ data, fromVoice }: props) {
  const router = useRouter()
  const handleView = (type: string) => {
    if (type === TYPE_VIEW.VIEW_MY_LIBRARY) {
      router.push({
        pathname: APP_URL.MY_LIBRARY,
        query: { page: 'detail', id: data?.id },
      })
    }

    if (type === TYPE_VIEW.VIEW_DETAIL) {
      router.push({
        pathname: APP_URL.VOICE + `/${data?.id}`,
      })
    }
  }
  useEffect(() => {
    if (!fromVoice) {
      sessionStorage.setItem('preFilter', '')
    }
  }, [fromVoice])
  const viewType = data?.isPending
    ? TYPE_VIEW.VIEW_DETAIL
    : data?.isBought
      ? TYPE_VIEW.VIEW_MY_LIBRARY
      : TYPE_VIEW.VIEW_DETAIL
  return (
    <div
      onClick={() => handleView(viewType)}
      className="cursor-pointer bg-white mb-5 max-w-[350px] flex flex-col justify-between gap-10"
    >
      <div className="mb-2">
        <div className="rounded-lg overflow-hidden bg-[#f3f4f6] flex items-center justify-center aspect-square mb-[8px] ">
          <img
            src={data?.images[0]?.url}
            alt={data?.title}
            className="w-full h-auto object-cover rounded-t-lg"
          />
        </div>
        <TagCategory
          backgroundColor={data?.category?.color}
          borderColor={data?.category?.colorBorder}
          textColor={data?.category?.colorText}
          title={data?.category?.name}
        />
        <TagProduct tags={data?.tags} />
        <Text
          className="text-[#030712] text-base overflow-ellipsis overflow-hidden w-full whitespace-nowrap"
          ellipsis={{ tooltip: data?.title }}
        >
          {data?.title}
        </Text>
        <Text
          className="text-[#030712] text-sm overflow-ellipsis overflow-hidden w-[70%] min-h-[22px] whitespace-nowrap"
          ellipsis={{ tooltip: data?.actor }}
        >
          {data?.actor}
        </Text>
      </div>
      <div>
        <div className="flex justify-between">
          {data?.unitPrice === 0 ? (
            <div className="text-[#52c41a] text-base">Free</div>
          ) : (
            <div className="text-[#030712] text-base">{`${data?.unitPrice} 円`}</div>
          )}

          {data?.isAddToCart && (
            <Tag className="text-[#4b5563] text-sm bg-[#e5e7eb] font-semibold">
              Added to cart
            </Tag>
          )}
          {data?.isBought && !data?.isPending && (
            <Tag className="text-[#4b5563] text-sm bg-[#e5e7eb] font-semibold">
              Bought
            </Tag>
          )}
          {data?.isPending && (
            <Tag className="text-[#4b5563] text-sm bg-[#e5e7eb] font-semibold">
              Pending
            </Tag>
          )}
        </div>
      </div>
    </div>
  )
}
