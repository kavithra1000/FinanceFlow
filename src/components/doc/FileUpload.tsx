'use client'

import React, { useState } from 'react'
import { RiFileExcel2Fill } from 'react-icons/ri'
import UploadCard from './UploadCard'
import FileListCard from './FileListCard'
import ErrorMessage from './ErrorMessage'
import { useResultStore } from '@/stores/docStore'


interface FileUploadProps {
  selectedFiles: File[]
  setSelectedFiles: (files: File[]) => void
}

const MAX_FILES = 10
const MAX_FILE_SIZE_MB = 5

const FileUpload: React.FC<FileUploadProps> = ({
  selectedFiles,
  setSelectedFiles,
}) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /* -------------------- Helpers -------------------- */

  const validateFiles = (files: File[]) => {
    for (const file of files) {
      if (file.type !== 'application/pdf') {
        return 'Only PDF files are allowed.'
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return `Each file must be under ${MAX_FILE_SIZE_MB}MB.`
      }
    }
    return ''
  }

  const addFiles = (files: File[]) => {
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
  }

  /* -------------------- Handlers -------------------- */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    addFiles(Array.from(e.target.files))
    e.target.value = '' // allow re-selecting same file
  }

  const handleRemoveFile = (file: File) => {
    setSelectedFiles(selectedFiles.filter(f => f !== file))
    setError('')
  }

  const setResultFile = useResultStore(state => state.setResultFile)

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      setError('Please upload at least one PDF file.')
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

      if (!response.ok) {
        throw new Error('Failed to convert files.')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      setResultFile({
        name: 'statements.xlsx',
        url,
        size: blob.size,
        type: blob.type,
      })

    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
  }


  const isMaxReached = selectedFiles.length >= MAX_FILES

  /* -------------------- UI -------------------- */

  return (
    <div className="flex flex-col items-center p-5 lg:pt-10 px-6 gap-10">
      {selectedFiles.length === 0 && (
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-10">
          PDF Bank Statement Converter
        </h1>
      )}

      {error && <ErrorMessage message={error} />}

      <div
        className={`flex flex-col w-full justify-center ${selectedFiles.length > 0
          ? 'lg:flex-row-reverse lg:h-[75vh] gap-4 xl:gap-8'
          : ''
          }`}
      >
        {/* Upload + Convert */}
        <div className="md:p-5">
          <UploadCard
            loading={loading}
            fileCount={selectedFiles.length}
            onFilesAdded={addFiles}
            isMaxReached={isMaxReached}
          />

          {selectedFiles.length > 0 && (
            <button
              onClick={handleConvert}
              disabled={loading}
              className={`mt-6 px-8 py-3 rounded-xl bg-green-600 text-white font-semibold
                flex items-center justify-center gap-2 w-full shadow-md
                hover:bg-green-700 active:scale-[0.98] transition-all
                ${loading ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              <RiFileExcel2Fill className="size-6" />
              {loading ? 'Converting…' : 'Convert to Excel'}
            </button>
          )}
        </div>

        {selectedFiles.length > 0 && <div className="border border-gray-300" />}

        {selectedFiles.length > 0 && (
          <FileListCard
            files={selectedFiles}
            onRemoveFile={handleRemoveFile}
          />
        )}
      </div>

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
