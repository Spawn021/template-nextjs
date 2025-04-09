import { useShowMessage } from '@/components/Message'
import { getFileStreamingAudio } from '@/lib/api/profile'
import { ERROR_CODE } from '@/types/Content'
import { create } from 'zustand'

interface IPlayingTrackStore {
  url: string
  setUrl: (url: string) => void
  currentContent: {
    id: string
    imageUrl: string
    title: string
  }
  setCurrentContent: (currentContent: ICurrentContent) => void
  currentTrack: {
    id: number | null
    name: string
  }
  setCurrentTrack: any
  listPlayingTrack: any[]
  setListPlayingTrack: (list: any[]) => void
  playerControl: {
    played: number
    playedSeconds: string
    playing: boolean
    volume: number
    duration: string
    muted: boolean
    durationSeconds: number
  }
  setPlayerControl: (playerControl: {
    played?: number
    playedSeconds?: string
    playing?: boolean
    volume?: number
    duration?: string
    muted?: boolean
    durationSeconds?: number
  }) => void
  isLoading: boolean
  reset: () => void
  endOfContent: boolean
  setEndOfContent: (endofContent: boolean) => void
  isFullScreen: boolean
  setIsFullScreen: (isFullScreen: boolean) => void
  error: {
    nameTrack: string
    idTrack: number
    code: string
  } | null
}
interface ICurrentContent {
  id: string
  imageUrl: string
  title: string
}

interface ICurrentTrack {
  id: number | null
  name: string
}
export const usePlayingTrackStore = create<IPlayingTrackStore>((set, get) => ({
  url: '',
  setUrl: (url: string) => set({ url }),
  currentContent: {
    id: '',
    imageUrl: '',
    title: '',
  },
  setCurrentContent: (currentContent: ICurrentContent) => set({ currentContent }),
  currentTrack: {
    id: null,
    name: '',
  },
  setCurrentTrack: async (content: ICurrentContent, track: ICurrentTrack) => {
    console.log('track', track)
    console.log('content', content)
    const isSafari =
      typeof window !== 'undefined' &&
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (!track.id) {
      set({
        currentTrack: { id: null, name: '' },
        url: '',
      })
    } else {
      set({ isLoading: true })
      const params = {
        mediaId: track.id,
      }
      const response = await getFileStreamingAudio(content.id, params)
      console.log('response', response)
      if (response.data.meta.code === ERROR_CODE.CAN_NOT_STREAM) {
        set({
          isLoading: false,
        })
        return
      }
      if (!response.data.data) {
        set({
          error: {
            nameTrack: track.name,
            idTrack: track.id,
            code: response.data.meta?.errorCode,
          },
          isLoading: false,
          url: '',
          currentTrack: track,
          currentContent: content,
          endOfContent: false,
          playerControl: {
            played: 0,
            playedSeconds: '00:00',
            playing: false,
            volume: get().playerControl.volume,
            duration: '00:00',
            muted: isSafari ? true : get().playerControl.muted,
            durationSeconds: 0,
          },
        })
        return
      }
      set({
        isLoading: false,
        url: response.data.data.presignUrl,
        currentTrack: track,
        currentContent: content,
        endOfContent: false,
        playerControl: {
          volume: get().playerControl.volume,
          playing: true,
          played: 0,
          playedSeconds: '00:00',
          duration: '00:00',
          muted: isSafari ? true : get().playerControl.muted,
          durationSeconds: 0,
        },
        error: null,
      })
    }
  },
  listPlayingTrack: [],
  setListPlayingTrack: (list: any[]) => set({ listPlayingTrack: list }),
  playerControl: {
    played: 0,
    playedSeconds: '00:00',
    playing: false,
    volume: 0.5,
    duration: '00:00',
    muted: false,
    durationSeconds: 0,
  },
  setPlayerControl: (playerControl: {
    played?: number
    playedSeconds?: string
    playing?: boolean
    volumn?: number
    duration?: string
    muted?: boolean
    durationSeconds?: number
  }) => set({ playerControl: { ...get().playerControl, ...playerControl } }),
  isLoading: false,
  reset: () =>
    set({
      url: '',
      currentContent: { id: '', imageUrl: '', title: '' },
      currentTrack: { id: null, name: '' },
      playerControl: {
        played: 0,
        playedSeconds: '00:00',
        playing: false,
        volume: 0.5,
        duration: '00:00',
        muted: false,
        durationSeconds: 0,
      },
      listPlayingTrack: [],
      isLoading: false,
    }),
  endOfContent: false,
  setEndOfContent: (endOfContent: boolean) => set({ endOfContent }),
  isFullScreen: false,
  setIsFullScreen: (isFullScreen: boolean) => set({ isFullScreen }),
  error: null,
}))
