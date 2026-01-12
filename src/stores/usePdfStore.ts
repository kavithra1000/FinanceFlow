import { create } from 'zustand'

interface PdfStore {
  selectedFiles: File[]
  error: string
  loading: boolean
  MAX_FILES: number
  MAX_FILE_SIZE_MB: number
  setError: (err: string) => void
  setLoading: (loading: boolean) => void
  setSelectedFiles: (files: File[]) => void
  addFiles: (files: File[]) => void
  removeFile: (file: File) => void
  validateFiles: (files: File[]) => string
  handleDropFiles: (files: File[]) => void
}

export const usePdfStore = create<PdfStore>((set, get) => ({
  selectedFiles: [],
  error: '',
  loading: false,
  MAX_FILES: 10,
  MAX_FILE_SIZE_MB: 10,

  setError: (err) => set({ error: err }),
  setLoading: (loading) => set({ loading }),
  setSelectedFiles: (files) => set({ selectedFiles: files }),

  validateFiles: (files) => {
    const { MAX_FILE_SIZE_MB } = get()
    for (const file of files) {
      if (file.type !== 'application/pdf') {
        return 'Only PDF files are allowed.'
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return `Each file must be under ${MAX_FILE_SIZE_MB}MB.`
      }
    }
    return ''
  },

  addFiles: (files) => {
    const { selectedFiles, MAX_FILES, setError, validateFiles, setSelectedFiles, loading } = get()
    if (loading) return

    if (selectedFiles.length + files.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`)
      return
    }

    const validationError = validateFiles(files)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setSelectedFiles([...selectedFiles, ...files])
  },

  removeFile: (file) => {
    const { selectedFiles, setSelectedFiles, setError } = get()
    setSelectedFiles(selectedFiles.filter(f => f !== file))
    setError('')
  },

  // -------------------- Drag & Drop Handler --------------------
  handleDropFiles: (files) => {
    const { addFiles } = get()
    addFiles(files)
  }
}))
