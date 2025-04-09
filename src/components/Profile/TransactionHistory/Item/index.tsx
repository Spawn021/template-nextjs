'use client'
import { APP_URL, FORMAT_DATETIME, STATUS_TRANSACTION_VALUE } from '@/constants'
import { useRouter } from '@/i18n/routing'
import { localeNumber, parseDate } from '@/lib/utils'
import DoneIcon from '@/resources/svg/DoneIcon'
import WarningIcon from '@/resources/svg/WarningIcon'
import moment from 'moment'
import React, { useMemo } from 'react'
import { Typography } from 'antd'
import mp3Type from '@/resources/svg/mp3-type.svg'
import wavType from '@/resources/svg/wav-type.svg'
import mp4Type from '@/resources/svg/mp4-type.svg'
import Image from 'next/image'
type Props = {
  data: any
  show: any
  onShow: (item: string) => void
}
const { Text } = Typography
function Item({ data, show, onShow }: Props) {
  const router = useRouter()
  const getStatus = (status: string) => {
    switch (status) {
      case 'success':
        return 'successful'
      case 'pending':
        return 'pending'
      case 'failed':
        return 'failure'
      default:
        return ''
    }
  }
  const { purchaseTransactionContents } = data || []
  const dataMemo: any =
    useMemo(() => {
      const arr = purchaseTransactionContents ? [...purchaseTransactionContents] : []
      return show.indexOf(data?.paymentId) === -1 ? arr?.length && arr.slice(0, 2) : arr
    }, [show, purchaseTransactionContents]) ?? []
  const viewDetail = (id?: string) => {
    router.push(APP_URL.VOICE + `/${id}`)
  }
  return (
    <div className="border rounded-[10px]">
      <div className="flex gap-6 border-b py-2 px-4 bg-[#f3f4f6]">
        <div
          className={`capitalize min-w-[95px] max-w-[8%] px-3 py-2 h-9 flex items-center cursor-pointer rounded-md font-semibold text-base status-${getStatus(data?.status)}`}
        >
          {getStatus(data?.status)}
        </div>
        <div className="flex justify-between gap-6 items-center flex-grow">
          <div className="flex flex-col gap-[2px] w-1/3">
            <div className="text-[#9ca3af] text-xs">Purchased time:</div>
            <div className="text-sm ">
              {moment(data?.createdAt).format(FORMAT_DATETIME)}
            </div>
          </div>
          <div className="flex flex-col gap-[2px] w-1/3 ">
            <div className="text-[#9ca3af] text-xs ">Payment method: </div>
            <div className="text-sm ">
              {data?.totalUnitPrice
                ? data?.paymentMethod !== 'konbini'
                  ? 'Credit card'
                  : 'Konbini'
                : '--'}
            </div>
          </div>
          <div className="flex flex-col gap-[2px] w-1/3">
            <div className="text-[#9ca3af] text-xs text-end">Total: </div>
            <div className="text-sm font-semibold text-end">
              {localeNumber(data?.totalUnitPrice ? data?.totalUnitPrice : 0)} 円
            </div>
          </div>
        </div>
      </div>

      <>
        {data?.paymentMethod === 'konbini' && (
          <div className="px-3 py-2 bg-[#fef3f2] border-b">
            {data?.status &&
              [STATUS_TRANSACTION_VALUE.PENDING, STATUS_TRANSACTION_VALUE.FAILER].indexOf(
                data?.status,
              ) !== -1 && (
                <div className="flex gap-1">
                  <WarningIcon />
                  {data.status === STATUS_TRANSACTION_VALUE.PENDING ? (
                    <span className="text-xs text-[#e74c3c]">
                      {`Please complete your payment before, ${parseDate(moment(data?.createdAt).add(3, 'days').endOf('days').format(FORMAT_DATETIME))}`}
                    </span>
                  ) : (
                    <span className="text-xs text-[#F04438]">
                      The payment period has expired
                    </span>
                  )}
                </div>
              )}
            {data?.status &&
              [STATUS_TRANSACTION_VALUE.SUCCESS].indexOf(data?.status) !== -1 && (
                <div className="flex gap-1">
                  <DoneIcon />
                  <span className="text-[#00aaf2] text-xs">
                    {`The payment has been completed on, ${parseDate(moment(data?.completedAt).format(FORMAT_DATETIME))}`}
                  </span>
                </div>
              )}
          </div>
        )}
        <div className="flex flex-col relative">
          {purchaseTransactionContents?.length > 2 &&
          show.indexOf(data?.paymentId) === -1 ? (
            <span
              className="absolute bottom-1 right-1/2 border text-xs rounded-md bg-[#f3f4f6] py-1 px-2 cursor-pointer"
              onClick={() => onShow(String(data?.paymentId))}
            >
              {`View more ${localeNumber(
                purchaseTransactionContents && purchaseTransactionContents.length
                  ? purchaseTransactionContents.length - 2
                  : 0,
              )} (items)`}
            </span>
          ) : null}

          {show.indexOf(data?.paymentId) !== -1 ? (
            <span
              className="absolute bottom-1 right-1/2 border text-xs rounded-md bg-[#f3f4f6] py-1 px-2 cursor-pointer"
              onClick={() => onShow(String(data?.paymentId))}
            >
              View less
            </span>
          ) : null}
          {dataMemo?.length &&
            dataMemo.map((item: any, index: number) => (
              <div
                className="flex justify-between items-center cursor-pointer item-purchase p-3 border-b"
                key={index}
                onClick={() => viewDetail(item?.content?.id)}
              >
                <div className="flex gap-2 w-[80%]">
                  <div className="w-16 h-16 rounded-lg flex items-center flex-shrink-0">
                    <img
                      src={item?.content?.imageUrl}
                      alt="thumbnail"
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-grow-0 w-full ">
                    <Text
                      className="text-xs px-2 py-[2px] mb-1 rounded-[4px] font-semibold border flex-grow-0 w-fit"
                      ellipsis={{
                        tooltip: item?.content?.category?.name,
                      }}
                      style={{
                        color: item?.content?.category?.color?.colorCodeText,
                        background: item?.content?.category?.color?.colorCode,
                        borderColor: item?.content?.category?.color?.colorCodeBorder,
                      }}
                    >
                      {item?.content?.category?.name}
                    </Text>
                    <Text
                      className="mb-1 flex-grow-0 "
                      ellipsis={{
                        tooltip: item?.content?.title,
                      }}
                    >
                      {item?.content?.title}
                    </Text>
                    {item?.content?.actor && (
                      <p className="mb-1 opacity-50 ">{item?.content?.actor}</p>
                    )}
                    <div className="flex gap-1 items-center">
                      {item?.content?.totalSizeMp3 > 0 && (
                        <Image src={mp3Type} alt="mp3" />
                      )}
                      {item?.content?.totalSizeWav > 0 && (
                        <Image src={wavType} alt="wav" />
                      )}
                      {item?.content?.totalSizeFlac > 0 && (
                        <Image src={mp4Type} alt="mp4" />
                      )}
                    </div>
                  </div>
                </div>
                <span className="font-semibold">{localeNumber(item?.unitPrice)} 円</span>
              </div>
            ))}
        </div>
      </>
    </div>
  )
}

export default Item
