import React from 'react'
import { useRouter } from '@/i18n/routing'
import { RootState } from '@/store/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Button, Typography } from 'antd'

import TagCategory from '@/components/Product/Item/TagCategory'
import TagProduct from '@/components/Product/Item/TagProduct'

import { APP_URL, FORMAT_DATE_PICKER, ORDERS } from '@/constants'
import { convertSizeToUnit } from '@/lib/utils'
import { FIELD_VALID } from '@/lib/constant'
import { setContentRelevant, setListCheckout } from '@/store/redux/slices/contentSlice'
import useContentDetail from '@/hooks/useContentDetail'
import WaitIcon from '@/resources/svg/icon-wait.svg'
import Image from 'next/image'

const { Paragraph } = Typography
function ContentInfo({ contentDetail }: { contentDetail: any }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    title,
    category,
    series,
    writer,
    illustrator,
    actor,
    totalSizeMp3,
    totalSizeWav,
    totalSizeFlac,
    unitPrice,
    releasedAt,
    transactionStatus,
    images,
    id,
    isAddToCart: isAddToCartUser,
    isMyLibrary,
    isWaitPayment,
    isPending,
    contentTags,
  } = contentDetail ?? {}
  const { addToCart } = useContentDetail()
  const { series: seriesLocal, withoutContentIds: idsLocal } = useSelector(
    (state: RootState) => state.content.contentRelevant,
  )
  const { user } = useSelector((state: RootState) => state.auth)
  const { cart, listCheckout } = useSelector((state: RootState) => state.content)
  const { accessToken } = useSelector((state: RootState) => state.auth.user)
  const isAddedToCart = accessToken
    ? isAddToCartUser
    : cart.some((e: any) => e?.content?.id === id)
  const listInfoData = [
    {
      label: 'カテゴリー:',
      value: (
        <TagCategory
          backgroundColor={category?.color?.colorCode}
          borderColor={category?.color?.colorCodeBorder}
          textColor={category?.color?.colorCodeText}
          title={category?.name}
        />
      ),
    },
    {
      label: 'タグ:',
      value: contentTags?.length ? (
        <TagProduct tags={contentTags.map((item: any) => item.tag)} />
      ) : (
        '--'
      ),
    },
    {
      label: '声優:',
      value: actor ? (
        <Paragraph ellipsis={{ tooltip: actor, rows: 1 }}>{actor}</Paragraph>
      ) : (
        '--'
      ),
    },
    {
      label: 'シナリオ:',
      value: writer ? writer : '--',
    },
    {
      label: 'イラストレーター:',
      value: illustrator ? illustrator : '--',
    },
    {
      label: '発売日:',
      value: releasedAt ? moment(releasedAt).format(FORMAT_DATE_PICKER) : '--',
    },
  ]
  const handleAddToCart = (isShowMessage: boolean) => {
    if (id) {
      const seriesNew = [...seriesLocal]
      const idNew = [...idsLocal]
      if (idNew.indexOf(id) === -1) {
        idNew.push(id)
      }
      if (seriesNew.indexOf(series) === -1) {
        seriesNew.push(series)
      }
      dispatch(setContentRelevant({ series: seriesNew, withoutContentIds: idNew }))
    }
    dispatch(setListCheckout([...listCheckout, id]))
    addToCart(contentDetail, isShowMessage)
  }
  const handleBuyNow = () => {
    if (!isAddedToCart) handleAddToCart(false)

    dispatch(setListCheckout([id]))
    if (user.accessToken) {
      router.push(APP_URL.CHECKOUT)
    } else {
      router.push({
        pathname: APP_URL.LOGIN,
        query: { redirect: APP_URL.CHECKOUT },
      })
    }
  }
  const handleRedirect = (field: string, value: string) => {
    if (FIELD_VALID.indexOf(field) !== -1) {
      const queryParams = {
        sortType: ORDERS.DESC,
        sortField: 'createdAt',
        [field]: value,
      }

      router.push({
        pathname: APP_URL.VOICE,
        query: queryParams,
      })
    }
  }
  const renderButton = () => {
    switch (true) {
      case isMyLibrary:
        return <></>
      case isPending:
        return (
          <div className="border-[1px] border-solid border-[#e1e3e7] p-4 mb-5 rounded-[12px]">
            <div>Price</div>
            <div className="flex items-center">
              <div className="text-[28px] font-bold text-[#d92d20] mb-4">{`${unitPrice} 円  `}</div>
              <span className="ml-2 text-base leading-[26px]">(Tax including)</span>
            </div>
            <Button
              className="w-full h-[52px] border-[1px] border-solid border-[#dcdcdc] rounded-[8px] py-3 px-4 font-semibold text-xl text-[#1a1a1a] "
              disabled
            >
              <Image
                src={WaitIcon}
                alt="icon wait payment"
                className="btn-wait-payment"
              />
              Wait payment
            </Button>
          </div>
        )
      default:
        return (
          <>
            {isAddedToCart ? (
              <div className="border-[1px] border-solid border-[#e1e3e7] p-4 mb-5 rounded-[12px]">
                <div>Price</div>
                <div className="flex items-center">
                  <div className="text-[28px] font-bold text-[#d92d20] mb-4">{`${unitPrice} 円  `}</div>
                  <span className="ml-2 text-base leading-[26px]">(Tax including)</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="w-[49%] h-[52px] border-[1px] border-solid border-[#dcdcdc] rounded-[8px] py-3 px-4 font-semibold text-xl text-[#1a1a1a] "
                    disabled
                  >
                    Added To Cart
                  </Button>
                  <button
                    className="w-[49%] h-[52px] rounded-[8px] py-3 px-4 font-semibold text-xl border-[1px] border-solid border-[#dcdcdc] text-[#fff] bg-[#00aaf2]"
                    onClick={() => handleBuyNow()}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-[1px] border-solid border-[#e1e3e7] p-4 mb-5 rounded-[12px]">
                <div>Price</div>
                <div className="flex items-center">
                  <div className="text-[28px] font-bold text-[#d92d20] mb-4">{`${unitPrice} 円  `}</div>
                  <span className="ml-2 text-base leading-[26px]">(Tax including)</span>
                </div>
                <div className="flex gap-3">
                  <button
                    className="w-[49%] h-[52px] border-[1px] border-solid border-[#dcdcdc] rounded-[8px] py-3 px-4 font-semibold text-xl text-[#1a1a1a] "
                    onClick={() => handleAddToCart(true)}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="w-[49%] h-[52px] rounded-[8px] py-3 px-4 font-semibold text-xl border-[1px] border-solid border-[#dcdcdc] text-[#fff] bg-[#00aaf2]"
                    onClick={() => handleBuyNow()}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            )}
          </>
        )
    }
  }
  return (
    <>
      {renderButton()}
      <div className="border-[1px] border-solid border-[#e1e3e7] mb-5 rounded-[12px]">
        <div className="text-[18px] font-semibold px-4 py-2 border-b-[1px]">詳細</div>
        <div className="px-4 py-3">
          {listInfoData.map((item, index) => (
            <div key={index} className="flex items-center mb-2 gap-8">
              <div className="text-[#1a1a1a] min-w-[140px] text-sm font-normal">
                {item.label}
              </div>
              <div className="text-[#1a1a1a] max-w-content-detail text-sm">
                {item.value}
              </div>
            </div>
          ))}
          <div className="flex items-center mb-2 gap-8">
            <div className="text-[#1a1a1a] min-w-[140px] text-sm font-normal">
              ファイル形式:
            </div>
            <div className="max-w-content-detail text-base cursor-pointer flex gap-2">
              {totalSizeMp3 > 0 && (
                <div
                  className="text-[#efaa27] border-[1px] border-solid border-[#ffd591] bg-[#fff3d9] py-[2px] px-3 rounded-[6px] font-semibold"
                  onClick={() => handleRedirect('files', 'audio/mpeg')}
                >
                  MP3 ({convertSizeToUnit(totalSizeMp3)})
                </div>
              )}
              {totalSizeWav > 0 && (
                <div
                  className="text-[#efaa27] border-[1px] border-solid border-[#ffd591] bg-[#fff3d9] py-[2px] px-3 rounded-[6px] font-semibold"
                  onClick={() => handleRedirect('files', 'audio/wav')}
                >
                  WAV({convertSizeToUnit(totalSizeWav)})
                </div>
              )}
              {totalSizeFlac > 0 && (
                <div
                  className="text-[#efaa27] border-[1px] border-solid border-[#ffd591] bg-[#fff3d9] py-[2px] px-3 rounded-[6px] font-semibold"
                  onClick={() => handleRedirect('files', 'audio/flac')}
                >
                  Flac ({convertSizeToUnit(totalSizeFlac)})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContentInfo
