'use client'

import React from 'react'
import { RiFileExcel2Fill } from 'react-icons/ri'
import UploadCard from './UploadCard'
import FileListCard from './FileListCard'
import ErrorMessage from './ErrorMessage'
import { usePdfStore } from '@/stores/usePdfStore'
import { useResultStore } from '@/stores/useResultStore'

const FileUpload = () => {
  // -------------------- PDF Store --------------------
  const selectedFiles = usePdfStore(state => state.selectedFiles)
  const error = usePdfStore(state => state.error)
  const loading = usePdfStore(state => state.loading)
  const addFiles = usePdfStore(state => state.addFiles)
  const setError = usePdfStore(state => state.setError)
  const setLoading = usePdfStore(state => state.setLoading)

  // -------------------- Result Store --------------------
  const setResult = useResultStore(state => state.setResult)

  // -------------------- Handlers --------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    addFiles(Array.from(e.target.files))
    e.target.value = '' // allow re-selecting the same file
  }

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      setError('Please upload at least one PDF.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      selectedFiles.forEach(file => formData.append('files', file))

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to convert files.')

      const blob = await response.blob()

      const successCount = Number(response.headers.get('X-Success-Count'))
      const failedCount = Number(response.headers.get('X-Failed-Count'))
      const failedFiles = JSON.parse(response.headers.get('X-Failed-Files') || '[]')

      setResult(
        {
          name: 'statements.xlsx',
          url: URL.createObjectURL(blob),
          size: blob.size,
          type: blob.type,
        },
        {
          successCount,
          failedCount,
          failedFiles,
        }
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  // -------------------- Render --------------------
  return (
    <div className="flex flex-col items-center p-5 lg:pt-10 px-6 gap-10">
      {selectedFiles.length === 0 && (
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-10">
          PDF Bank Statement Converter
        </h1>
      )}

      {error && <ErrorMessage message={error} />}

      <div
        className={`flex flex-col w-full justify-center ${
          selectedFiles.length > 0 ? 'lg:flex-row-reverse lg:h-[75vh] gap-4 xl:gap-8' : ''
        }`}
      >
        {/* Upload Card + Convert Button */}
        <div className="md:p-5">
          <UploadCard />

          {selectedFiles.length > 0 && (
            <button
              type="button"
              onClick={handleConvert}
              disabled={loading}
              className={`mt-6 px-8 py-3 rounded-xl bg-green-600 text-white font-semibold
                flex items-center justify-center gap-2 w-full shadow-md
                hover:bg-green-700 active:scale-[0.98] transition-all
                ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <RiFileExcel2Fill className="size-6" />
              {loading ? 'Converting…' : 'Convert to Excel'}
            </button>
          )}
        </div>

        {selectedFiles.length > 0 && <div className="border border-gray-300" />}

        {/* Selected Files List */}
        {selectedFiles.length > 0 && <FileListCard />}
      </div>

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default FileUpload
