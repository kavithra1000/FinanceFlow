// src/stores/useResultStore.ts
import { create } from 'zustand'

// -------------------- Types --------------------
export interface ResultFile {
  name: string
  url: string
  size: number
  type: string
}

// Each failed PDF file with its error
export interface FailedFile {
  fileName: string
  error: string
}

export interface ResultSummary {
  successCount: number
  failedCount: number
  failedFiles: FailedFile[]
}

interface ResultState {
  resultFile: ResultFile | null
  summary: ResultSummary | null
  setResult: (file: ResultFile, summary: ResultSummary) => void
  clearResult: () => void
}

// -------------------- Store --------------------
export const useResultStore = create<ResultState>((set) => ({
  resultFile: null,
  summary: null,

  // Set the Excel result file + summary (success/failure info)
  setResult: (file, summary) => set({ resultFile: file, summary }),

  // Clear all result data
  clearResult: () => set({ resultFile: null, summary: null }),
}))
