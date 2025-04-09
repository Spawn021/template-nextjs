import React, { useEffect, useMemo, useRef } from 'react'
import { usePlayingTrackStore } from '@/store/zustand/usePlayingTrackStore'
import moment from 'moment'

import ExpandExitIcon from '@/resources/svg/ExpandExitIcon'
import ExpandIcon from '@/resources/svg/ExpandIcon'
import ForwardIcon from '@/resources/svg/ForwardIcon'
import NextIcon from '@/resources/svg/NextIcon'
import NoSoundIcon from '@/resources/svg/NoSoundIcon'
import PauseIcon from '@/resources/svg/PauseIcon'
import PlayAgainIcon from '@/resources/svg/PlayAgainIcon'
import PlayIcon from '@/resources/svg/PlayIcon'
import PreIcon from '@/resources/svg/PreIcon'
import ReplayIcon from '@/resources/svg/ReplayIcon'
import SoundIcon from '@/resources/svg/SoundIcon'
import screenfull from 'screenfull'

interface IProps {
  handleSeekChange: (e: any) => void
  handlePre: () => void
  handleReplay: () => void
  handlePlay: () => void
  handleForward: () => void
  handleNext: () => void
  handlePlayAgain: () => void
}
function TimeLinePlayer({
  handleSeekChange,
  handlePre,
  handleReplay,
  handlePlay,
  handleForward,
  handleNext,
  handlePlayAgain,
}: IProps) {
  const {
    playerControl,
    setPlayerControl,
    currentContent,
    currentTrack,
    isFullScreen,
    endOfContent,
    setIsFullScreen,
    listPlayingTrack,
    setEndOfContent,
    setCurrentTrack,
  } = usePlayingTrackStore()

  const refSeek = useRef<HTMLInputElement>(null)
  const refVolume = useRef<HTMLInputElement>(null)
  const idxCurrentTrack = useMemo(
    () => listPlayingTrack.findIndex((el) => el.id === currentTrack.id),
    [currentTrack, listPlayingTrack],
  )

  const runningTime = useMemo(() => {
    const hours = moment
      .duration(playerControl.durationSeconds * playerControl.played, 'seconds')
      .hours()
    return (
      moment
        .utc(playerControl.durationSeconds * playerControl.played * 1000)
        .format(hours > 0 ? 'HH:mm:ss' : 'mm:ss') || '00:00'
    )
  }, [playerControl.played, playerControl.durationSeconds])
  useEffect(() => {
    refSeek.current?.style.setProperty(
      '--seek-before-width',
      `${playerControl.played * 100}%`,
    )
  }, [playerControl?.played])

  useEffect(() => {
    refVolume.current?.style.setProperty(
      '--volume-before-width',
      playerControl.muted ? '0%' : `${playerControl.volume * 100}%`,
    )
  }, [playerControl?.volume, playerControl.muted])

  const handleMuted = () => {
    setPlayerControl({
      muted: !playerControl.muted,
    })
  }
  const handleVolumeChange = (e: any) => {
    setPlayerControl({
      volume: +e.target.value,
      muted: !+e.target.value,
    })
  }
  const handleFullScreen = () => {
    setIsFullScreen(true)
    screenfull.isEnabled &&
      screenfull.request(document.querySelector('.player-media') || undefined)
  }
  const handleExitFullScreen = () => {
    setIsFullScreen(false)

    screenfull.isEnabled && screenfull.exit()
  }
  const handleMouseDown = () => {
    setPlayerControl({
      playing: false,
    })
  }

  const handleMouseUp = (e: any) => {
    const idxCurrentTrack = listPlayingTrack.findIndex((el) => el.id === currentTrack.id)
    if (+e.target.value === 1 && idxCurrentTrack === listPlayingTrack.length - 1) {
      setPlayerControl({
        playing: false,
        played: 1,
      })
      setEndOfContent(true)
      return
    }
    if (+e.target.value === 1) {
      setCurrentTrack(currentContent, listPlayingTrack[idxCurrentTrack + 1])
    }
    setPlayerControl({
      playing: true,
    })
  }
  return (
    <div className="flex items-center gap-20 flex-grow icon-disabled ">
      <div className="w-1/2">
        <div className="flex items-center justify-between gap-2 mb-6">
          <p className="text-white">{runningTime}</p>
          <input
            ref={refSeek}
            type="range"
            min={0}
            max={1}
            step="any"
            value={playerControl.played}
            onChange={handleSeekChange}
            className="flex-grow h-[6px] cursor-pointer player-media__timeline-seek"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          />
          <p className="text-white">{playerControl.duration}</p>
        </div>
        <div>
          {endOfContent ? (
            <div className="flex items-center justify-center gap-5">
              <div
                className={` ${idxCurrentTrack === 0 && 'cursor-auto disable'}`}
                onClick={handlePre}
              >
                <PreIcon />
              </div>
              <div className=" cursor-pointer" onClick={handlePlayAgain}>
                <PlayAgainIcon />
              </div>
              <div className="t cursor-auto disable" onClick={handleNext}>
                <NextIcon />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-5">
              <div
                className={`cursor-pointer ${idxCurrentTrack === 0 && 'cursor-auto disable'}`}
                onClick={handlePre}
              >
                <PreIcon />
              </div>
              <div className="cursor-pointer" onClick={handleReplay}>
                <ReplayIcon />
              </div>
              {playerControl.playing ? (
                <div className="play-icon cursor-pointer" onClick={handlePlay}>
                  <PauseIcon />
                </div>
              ) : (
                <div className="play-icon cursor-pointer" onClick={handlePlay}>
                  <PlayIcon />
                </div>
              )}
              <div className="cursor-pointer" onClick={handleForward}>
                <ForwardIcon />
              </div>
              <div
                className={`cursor-pointer ${idxCurrentTrack === listPlayingTrack.length - 1 && 'cursor-auto disable'}`}
                onClick={handleNext}
              >
                <NextIcon />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-end gap-5">
        <div className="player-media__controls-volume">
          <div className="icon-sound" onClick={handleMuted}>
            {playerControl.muted ? <NoSoundIcon /> : <SoundIcon />}
          </div>

          <div className="range-volume-wrapper">
            <input
              className="range-volume"
              type="range"
              min={0}
              max={1}
              step="any"
              value={playerControl.muted ? 0 : playerControl.volume}
              onChange={handleVolumeChange}
              ref={refVolume}
            />
          </div>
        </div>
        {!isFullScreen && (
          <div
            className="player-media__timeline-fullscreen p-[6px] flex items-center border rounded-md cursor-pointer"
            onClick={handleFullScreen}
          >
            <ExpandIcon />
          </div>
        )}

        {isFullScreen && (
          <div
            className="player-media__timeline-fullscreen p-[6px] flex items-center border rounded-md cursor-pointer"
            onClick={handleExitFullScreen}
          >
            <ExpandExitIcon />
          </div>
        )}
      </div>
    </div>
  )
}

export default TimeLinePlayer
