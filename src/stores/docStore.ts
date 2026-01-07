import { create } from 'zustand'

interface ResultFile {
  name: string
  url: string
  size: number
  type: string
}

interface ResultState {
  resultFile: ResultFile | null
  setResultFile: (file: ResultFile) => void
  clearResultFile: () => void
}

export const useResultStore = create<ResultState>((set) => ({
  resultFile: null,

  setResultFile: (file) => set({ resultFile: file }),

  clearResultFile: () => set({ resultFile: null }),
}))
