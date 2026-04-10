// src/stores/useResultStore.ts
import { create } from 'zustand'

// -------------------- Types --------------------
export interface ResultFile {
  name: string
  url: string
  size: number
  type: string
}

export interface TransactionRow {
  id?: string
  date: string
  description: string
  debit?: number
  credit?: number
  balance?: number
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
  transactions: TransactionRow[]
  isExporting: boolean
  setResult: (file: ResultFile | null, summary: ResultSummary | null, transactions?: TransactionRow[]) => void
  setTransactions: (transactions: TransactionRow[]) => void
  updateTransaction: (index: number, updated: Partial<TransactionRow>) => void
  setIsExporting: (status: boolean) => void
  clearResult: () => void
}

// -------------------- Store --------------------
export const useResultStore = create<ResultState>((set) => ({
  resultFile: null,
  summary: null,
  transactions: [],
  isExporting: false,

  setResult: (file, summary, transactions = []) => set({ resultFile: file, summary, transactions }),

  setTransactions: (transactions) => set({ transactions }),

  updateTransaction: (index, updated) =>
    set((state) => ({
      transactions: state.transactions.map((tx, i) =>
        i === index ? { ...tx, ...updated } : tx
      ),
    })),

  setIsExporting: (status) => set({ isExporting: status }),

  clearResult: () => set({ resultFile: null, summary: null, transactions: [], isExporting: false }),
}))
