import BreadCrumb from '@/components/Breadcrumb'
import ListTrack from '@/components/ListTrack'
import ContentImage from '@/components/VoiceDetail/ContentImage'
import ContentInfo from '@/components/VoiceDetail/ContentInfo'
import ShowMore from '@/components/VoiceDetail/ShowMore'
import TrackList from '@/components/VoiceDetail/TrackList'
import useMyLibrabry from '@/hooks/useMyLibrary'
import { usePlayingTrackStore } from '@/store/zustand/usePlayingTrackStore'
import React from 'react'
type Props = {
  id: string

  handleDownload: any
  handleOpenModalDownload: any
}
function MyLibraryDetail({ id, handleDownload, handleOpenModalDownload }: Props) {
  const { contentDetail, loading } = useMyLibrabry(id, {})
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
      </div>
    </div>
  )
}

export default MyLibraryDetail
