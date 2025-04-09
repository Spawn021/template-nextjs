'use client'
import { usePlayingTrackStore } from '@/store/zustand/usePlayingTrackStore'
import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import { CloseOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import TimeLinePlayer from '@/components/ListTrack/TimeLinePlayer'
import moment from 'moment'
import screenfull from 'screenfull'

const DEFAULT_HH = '00:'
const LENGTH_MMSS = 8
function Player() {
  const {
    playerControl,
    setPlayerControl,
    url,
    setCurrentTrack,
    listPlayingTrack,
    reset,
    currentTrack,
    currentContent,
    setEndOfContent,
    endOfContent,
    isFullScreen,
    setIsFullScreen,
    error,
  } = usePlayingTrackStore()
  const refPlayer = useRef(null)
  const handleProgress = (e: any) => {
    if (playerControl.played === 1) return
    const hours = moment.duration(e.playedSeconds, 'seconds').hours()

    setPlayerControl({
      played: e.played,
      playedSeconds:
        moment.utc(e.playedSeconds * 1000).format(hours > 0 ? 'HH:mm:ss' : 'mm:ss') ||
        '00:00',
    })
  }
  const handleDuration = (e: number) => {
    const hours = moment.duration(e, 'seconds').hours()
    setPlayerControl({
      duration: moment.utc(e * 1000).format(hours > 0 ? 'HH:mm:ss' : 'mm:ss') || '00:00',
      durationSeconds: e,
    })
  }
  const handleEnd = () => {
    const idxCurrentTrack = listPlayingTrack.findIndex((el) => el.id === currentTrack.id)
    if (idxCurrentTrack === listPlayingTrack.length - 1) {
      setPlayerControl({
        playing: false,
      })
      setEndOfContent(true)
      return
    }
    setCurrentTrack(currentContent, listPlayingTrack[idxCurrentTrack + 1])
  }

  const handlePlay = () => {
    if (error?.idTrack) return
    setPlayerControl({
      playing: !playerControl.playing,
    })
  }
  const handlePlayAgain = () => {
    if (!listPlayingTrack.length) return
    setCurrentTrack(currentContent, listPlayingTrack[0])
    setPlayerControl({
      playing: true,
    })
    setEndOfContent(false)
  }
  const handleReplay = () => {
    if (error?.idTrack) return
    const playedSeconds = moment
      .duration(
        playerControl.playedSeconds.length === LENGTH_MMSS
          ? playerControl.playedSeconds
          : `${DEFAULT_HH}${playerControl.playedSeconds}`,
      )
      .asSeconds()
    if (playedSeconds === 0) return
    ;(refPlayer.current as any).seekTo(Math.max(playedSeconds - 10, 0), 'seconds')
    if (Math.max(playedSeconds - 10, 0) === 0) {
      setPlayerControl({
        played: 0,
      })
    }
  }
  const handleSeekChange = (e: any) => {
    setPlayerControl({
      played: parseFloat(e.target.value),
    })
    ;(refPlayer.current as any).seekTo(parseFloat(e.target.value))
    if (endOfContent) {
      setEndOfContent(false)
      setPlayerControl({ playing: true })
    }
  }
  const handleNext = () => {
    const idxCurrentTrack = listPlayingTrack.findIndex((el) => el.id === currentTrack.id)
    if (idxCurrentTrack === listPlayingTrack.length - 1 || idxCurrentTrack === -1) return
    setCurrentTrack(currentContent, listPlayingTrack[idxCurrentTrack + 1])
  }

  const handlePre = () => {
    const idxCurrentTrack = listPlayingTrack.findIndex((el) => el.id === currentTrack.id)
    if (idxCurrentTrack === 0 || idxCurrentTrack === -1) return
    setCurrentTrack(currentContent, listPlayingTrack[idxCurrentTrack - 1])
  }
  const handleForward = () => {
    if (error?.idTrack) return
    const playedSeconds = moment
      .duration(
        playerControl.playedSeconds.length === LENGTH_MMSS
          ? playerControl.playedSeconds
          : `${DEFAULT_HH}${playerControl.playedSeconds}`,
      )
      .asSeconds()
    const durationSeconds = moment
      .duration(
        playerControl.duration.length === LENGTH_MMSS
          ? playerControl.duration
          : `${DEFAULT_HH}${playerControl.duration}`,
      )
      .asSeconds()
    if (playedSeconds === durationSeconds) return
    ;(refPlayer.current as any).seekTo(
      Math.min(playedSeconds + 10, durationSeconds),
      'seconds',
    )
    if (Math.min(playedSeconds + 10, durationSeconds) >= durationSeconds) {
      setPlayerControl({
        played: 0.999,
      })
    }
  }
  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        setIsFullScreen(screenfull.isFullscreen)
      })
    }
    return () => {
      reset()
    }
  }, [])
  const handleClose = () => {
    reset()
  }
  if (!currentTrack.id) return <></>
  return (
    <div
      className={`player-media fixed bottom-0 left-0 right-0 z-[999] bg-[#171717cc] backdrop-blur-[40px] transition-all duration-300 ${isFullScreen ? 'h-screen flex flex-col' : ''} `}
    >
      <CloseOutlined
        className={`absolute right-1 cursor-pointer border rounded-md p-[9px] ${isFullScreen ? 'top-3 right-3 bg-white' : ' -top-10 '}`}
        onClick={handleClose}
      />
      {isFullScreen && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${currentContent.imageUrl})`, zIndex: -1 }}
        />
      )}
      {isFullScreen && <div className="flex-grow"></div>}

      <ReactPlayer
        url={url}
        ref={refPlayer}
        height={0}
        width={0}
        controls={false}
        playing={playerControl.playing}
        volume={playerControl.volume}
        muted={playerControl.muted}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onEnded={handleEnd}
      />

      <div
        className={`px-10 pt-10 pb-14 ${isFullScreen ? 'w-full bg-[#171717cc]' : ''} `}
      >
        <div className="flex items-center justify-between gap-[60px]">
          <div className="w-[30%] flex gap-2 items-center flex-shrink-0">
            <div className="w-20 h-20 flex-shrink-0 ">
              {!error?.idTrack ? (
                <img
                  src={currentContent.imageUrl}
                  alt="thumbnail"
                  className=" w-full h-full object-cover rounded-tl-[8px] rounded-tr-[8px]"
                />
              ) : (
                <div className="error">
                  <p>{"ⓘ Can't not play this track. Please try again"}</p>
                </div>
              )}
            </div>

            <div className="text-white overflow-hidden ">
              <Typography.Paragraph
                ellipsis={{ rows: 1, tooltip: true }}
                className="text-white "
              >
                {currentTrack.name}
              </Typography.Paragraph>
              <Typography.Paragraph
                ellipsis={{ rows: 1, tooltip: true }}
                className="text-white  "
              >
                {currentContent.title}
              </Typography.Paragraph>
            </div>
          </div>

          <TimeLinePlayer
            handleSeekChange={handleSeekChange}
            handlePre={handlePre}
            handleReplay={handleReplay}
            handlePlay={handlePlay}
            handleForward={handleForward}
            handleNext={handleNext}
            handlePlayAgain={handlePlayAgain}
          />
        </div>
      </div>
    </div>
  )
}

export default Player
