import { create } from 'zustand'

interface IContentDetailsStore {
  contentDetail: any
  setContentDetail: any
}

export const useContentDetailStore = create<IContentDetailsStore>((set) => ({
  contentDetail: {},
  setContentDetail: (contentDetail: any) => set({ contentDetail }),
}))
