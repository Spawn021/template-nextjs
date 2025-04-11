import BreadCrumb from '@/components/Breadcrumb'
import ListTrack from '@/components/ListTrack'
import ContentImage from '@/components/VoiceDetail/ContentImage'
import ContentInfo from '@/components/VoiceDetail/ContentInfo'
import ContentRecommend from '@/components/VoiceDetail/ContentRecommend'
import ShowMore from '@/components/VoiceDetail/ShowMore'
import { STATUS_CONTENT } from '@/constants'
import useCartList from '@/hooks/useCartList'
import useMyLibrabry from '@/hooks/useMyLibrary'
import { setContentRelevant } from '@/store/redux/slices/contentSlice'
import { RootState } from '@/store/redux/store'
import { usePlayingTrackStore } from '@/store/zustand/usePlayingTrackStore'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
type Props = {
  id: string

  handleDownload: any
  handleOpenModalDownload: any
}
function MyLibraryDetail({ id, handleDownload, handleOpenModalDownload }: Props) {
  const { contentDetail, loading } = useMyLibrabry(id, {})
  const dispatch = useDispatch()
  const { setCurrentTrack, setListPlayingTrack, setPlayerControl } =
    usePlayingTrackStore()
  const handlePlayAudio = () => {
    setPlayerControl({
      playing: true,
    })
    if (contentDetail?.medias) {
      setCurrentTrack(contentDetail, contentDetail?.medias[0])
      setListPlayingTrack(contentDetail?.medias)
    }
  }
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
        </div>
        <div className="flex gap-10">
          <div className="w-1/2">
            <ContentImage images={contentDetail?.images} />
            <ShowMore contentDetail={contentDetail} />
          </div>
          <div className="w-1/2">
            <ContentInfo contentDetail={contentDetail} render={false} />
            <ListTrack
              contentDetail={contentDetail}
              handlePlayAudio={handlePlayAudio}
              handleDownload={handleDownload}
              handleOpenModalDownload={handleOpenModalDownload}
            />
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

export default MyLibraryDetail
