'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import useContentDetail from '@/hooks/useContentDetail'
import { RootState } from '@/store/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '@/components/Breadcrumb'
import IconShare from '@/resources/svg/icon-share.svg'
import FacebookIcon from '@/resources/svg/facebook.svg'
import TwitterIcon from '@/resources/svg/twitter.svg'
import LineIcon from '@/resources/svg/line-icon.svg'
import { Popover } from 'antd'
import { FacebookShareButton, LineShareButton, TwitterShareButton } from 'react-share'
import { usePathname } from '@/i18n/routing'
import CopyClipboard from '@/components/CopyClipboard'
import ContentImage from '@/components/VoiceDetail/ContentImage'
import ContentInfo from '@/components/VoiceDetail/ContentInfo'
import TrackList from '@/components/VoiceDetail/TrackList'
import ShowMore from '@/components/VoiceDetail/ShowMore'
import useCartList from '@/hooks/useCartList'
import { STATUS_CONTENT } from '@/constants'
import { setContentRelevant } from '@/store/redux/slices/contentSlice'
import ContentRecommend from '@/components/VoiceDetail/ContentRecommend'

function VoiceDetail() {
  const { id } = useParams()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { contentDetail } = useContentDetail(id)
  const { user } = useSelector((state: RootState) => state.auth)
  const { cart } = useSelector((state: RootState) => state.content)
  const { data } = useCartList(user?.accessToken)

  const listCart = user?.accessToken ? data : cart

  const { ids, series: arrSeries }: { ids: string[]; series: string[] } = useMemo(() => {
    if (listCart && listCart.length) {
      const sales = listCart.filter(
        (f: any) => f?.content?.status === STATUS_CONTENT.ON_SALE,
      )
      if (sales && sales.length) {
        const ids = sales.map((f: any) => f?.content?.id)
        const series = sales.map((f: any) => f?.content?.series)
        return { ids, series }
      }
      return { ids: [], series: [] }
    }
  }, [listCart]) ?? { ids: [], series: [] }

  useEffect(() => {
    if (listCart && !listCart.length) {
      dispatch(setContentRelevant({ series: [], withoutContentIds: [] }))
    } else {
      if (ids && arrSeries) {
        dispatch(
          setContentRelevant({
            series: [...new Set(arrSeries)],
            withoutContentIds: [...new Set(ids)],
          }),
        )
      }
    }
  }, [listCart, ids?.length, arrSeries?.length])
  const urlShare = `${process.env.NEXT_PUBLIC_APP_URL_SHARE}${pathname}`
  const content = (
    <div className="min-w-[200px]">
      <div className="my-[6px] ml-1 mr-[10px]">Share now:</div>
      <div className="flex gap-2 popover-share">
        <FacebookShareButton
          url={urlShare}
          className="w-10 h-10 rounded-[8px] flex items-center justify-center"
        >
          <Image src={FacebookIcon} alt="FacebookIcon" className="w-6 h-6 " />
        </FacebookShareButton>
        <TwitterShareButton
          url={urlShare}
          className="w-10 h-10 rounded-[8px] flex items-center justify-center"
        >
          <Image src={TwitterIcon} alt="Twitter" />
        </TwitterShareButton>
        <LineShareButton
          url={urlShare}
          className="w-10 h-10 rounded-[8px] flex items-center justify-center"
        >
          <Image src={LineIcon} alt="Line" />
        </LineShareButton>
        <CopyClipboard value={urlShare} />
      </div>
    </div>
  )
  return (
    <div>
      <BreadCrumb
        items={[
          {
            path: '/',
            name: 'Home',
          },
          {
            path: '#',
            name: 'Voice List',
          },
          {
            path: '#',
            name: contentDetail?.title,
          },
        ]}
      />
      <div className="px-8 py-[30px]">
        <div className="flex justify-between mb-3">
          <div className="text-2xl font-semibold leading-[34px] ">
            {contentDetail?.title}
          </div>
          <div className="text-gray-500 text-sm">
            <Popover
              content={content}
              trigger="click"
              placement="bottomRight"
              arrow={false}
            >
              <div className="flex gap-2 py-2 px-4 border-[1px] border-solid border-[#e5e7eb] rounded-[8px] cursor-pointer min-w-[110px] ">
                <Image src={IconShare} alt="icon share" />
                <span className="text-base font-semibold text-[#030712]">Share</span>
              </div>
            </Popover>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-1/2">
            <ContentImage images={contentDetail?.images} />
            <ShowMore contentDetail={contentDetail} />
          </div>
          <div className="w-1/2">
            <ContentInfo contentDetail={contentDetail} />
            <TrackList contentDetail={contentDetail} />
          </div>
        </div>
        <ContentRecommend
          id={String(id)}
          series={contentDetail?.series?.name ? contentDetail?.series?.name : ''}
        />
      </div>
    </div>
  )
}

export default VoiceDetail
