import ButtonDownLoad from '@/components/ListTrack/ButtonDownLoad'
import React, { useRef, useState } from 'react'
import ButtonPlay from '@/components/ListTrack/ButtonPlay'
import chevronDown from '@/resources/svg/chevron-down.svg'
import Image from 'next/image'
import Paragraph from 'antd/es/typography/Paragraph'
import moment from 'moment'
import { getTimeRunning } from '@/lib/utils'
import { FileMediaType } from '@/types/Content'
import mp3Type from '@/resources/svg/mp3-type.svg'
import wavType from '@/resources/svg/wav-type.svg'
import mp4Type from '@/resources/svg/mp4-type.svg'
import IconDownload from '@/resources/svg/icon-download.svg'
import { Button } from 'antd'
import ButtonPause from '@/components/ListTrack/ButtonPause'
import { usePlayingTrackStore } from '@/store/zustand/usePlayingTrackStore'
import { DownloadType } from '@/constants'

type Props = {
  contentDetail: any
  handlePlayAudio: () => void
  handleDownload: (id: string, params: any) => void
  handleOpenModalDownload: () => void
}
const initValue = {
  name: '',
  id: '',
  files: [],
  index: 0,
}

function ListTrack({
  contentDetail,
  handlePlayAudio,
  handleDownload,
  handleOpenModalDownload,
}: Props) {
  const { medias, canStream, canDownload, fileFormat } = contentDetail ?? {}
  const {
    playerControl,
    setCurrentTrack,
    currentTrack,
    setPlayerControl,
    setListPlayingTrack,
    endOfContent,
    error,
  } = usePlayingTrackStore()
  const [trackActive, setTrackActive] = useState(initValue)

  const handleChooseTrackFile = (info: any, i: number) => {
    const { name, files, id } = info || {}
    setTrackActive((prev) => ({
      name,
      files,
      id: prev?.id === id ? '' : id,
      index: i,
    }))
  }

  const handleImageSource = (type: string) => {
    switch (type) {
      case FileMediaType.MP3:
        return mp3Type
      case FileMediaType.WAV:
        return wavType
      case FileMediaType.FLAC:
        return mp4Type
    }
  }
  const handleClickPlay = (track: any) => {
    if (track.id === currentTrack.id) {
      if (endOfContent || error?.idTrack) {
        setCurrentTrack(contentDetail, track)
      } else {
        setPlayerControl({
          playing: true,
        })
      }
      return
    }
    setCurrentTrack(contentDetail, track)
    setListPlayingTrack(medias)
  }

  const handleClickPause = () => {
    setPlayerControl({
      playing: false,
    })
  }
  return (
    <div className="border-[1px] border-solid border-[#e1e3e7] mb-5 rounded-[12px] list-track">
      <div className=" p-4 border-b-[1px] ">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-[18px] font-semibold">トラックリスト</div>
          <div className="text-sm ">{`${medias?.length} トラック`}</div>
        </div>
        <div className="flex items-center justify-between gap-2 h-10">
          {canStream && <ButtonPlay title="Play All" handlePlayAudio={handlePlayAudio} />}
          {canDownload && (
            <ButtonDownLoad
              id={contentDetail?.id}
              handleDownload={handleOpenModalDownload}
              isShowIconContent={false}
              fileFormat={fileFormat}
              suffixIcon={
                <Image src={chevronDown} alt="icon chevron down" className="w-5 h-5" />
              }
            />
          )}
        </div>
      </div>
      <div className="pb-3 max-h-[400px] overflow-auto item-download">
        {medias &&
          medias
            ?.sort((a: any, b: any) => a.order - b.order)
            ?.map((item: any, i: number) => (
              <div
                className="py-3 px-4 border-b"
                key={i}
                onClick={() => handleChooseTrackFile(item, i)}
              >
                <div className="flex pb-3 gap-3 items-center cursor-pointer">
                  <div className="text-base text-[#9ca3af] font-semibold">
                    {i + 1 >= 10 ? i + 1 : `0${i + 1}`}
                  </div>

                  <div className="flex justify-between w-full items-center">
                    <Paragraph
                      className="text-base"
                      ellipsis={{ tooltip: item?.name, rows: 2 }}
                    >
                      {item?.name}
                    </Paragraph>
                    <div className="flex gap-3 items-center">
                      <div className="text-[#6b7280] text-base">
                        {moment.utc(item?.timeRunning * 1000).format('HH:mm:ss') ||
                          '00:00:00'}
                      </div>
                      {contentDetail.canStream &&
                        (playerControl.playing && currentTrack.id === item.id ? (
                          <ButtonPause
                            title="Pause"
                            handlePauseAudio={() => handleClickPause()}
                          />
                        ) : (
                          <ButtonPlay
                            title="Play"
                            handlePlayAudio={() => handleClickPlay(item)}
                            isPlayAll={false}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                {trackActive?.id === item?.id && (
                  <div className="mt-3 border-t-[1px] border-dashed ">
                    {item?.files?.map((item: any, i: number) => (
                      <div
                        className="flex justify-between py-3 pl-8 items-center"
                        key={i}
                      >
                        <div className="flex gap-2">
                          <Image
                            src={handleImageSource(item?.type)}
                            alt="file"
                            className="w-10 h-10"
                          />
                          <div>
                            <div className="text-base font-normal mb-1">
                              {item?.nameWithTrack}
                            </div>
                            <div className="text-[#9ca3af] font-normal">{item?.type}</div>
                          </div>
                        </div>
                        <div className="flex gap-3 items-center">
                          {item?.isUpdated && (
                            <div className="text-[#332e00] bg-[#f3de21] text-xs font-semibold py-[3px] px-[10px] rounded-lg text-center">
                              New
                            </div>
                          )}
                          <div className="text-base text-[#6b7280] font-normal">
                            {getTimeRunning(item?.timeRunning)}
                          </div>
                          {contentDetail?.canDownload && (
                            <Button
                              className="font-semibold py-[6px] px-[15px] flex gap-2 items-center min-w-[145px] "
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownload(contentDetail?.id, {
                                  type: DownloadType.NORMAL,
                                  mediaId: trackActive?.id,
                                  fileId: item?.id,
                                })
                              }}
                            >
                              <Image
                                src={IconDownload}
                                alt="icon download"
                                className="w-4 h-4"
                              />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
      </div>
    </div>
  )
}

export default ListTrack
