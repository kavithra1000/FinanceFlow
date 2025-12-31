'use client'

import React, { useState } from 'react'
import { RiFileExcel2Fill } from 'react-icons/ri'
import UploadCard from './UploadCard'
import FileListCard from './FileListCard'
import ErrorMessage from './ErrorMessage'

interface FileUploadProps {
  setSelectedFiles: (files: File[]) => void
  selectedFiles: File[]
}

const MAX_FILES = 10

const FileUpload: React.FC<FileUploadProps> = ({ setSelectedFiles, selectedFiles }) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const addFiles = (files: File[]) => {

    if (loading) return

    if (selectedFiles.length + files.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`)
      return
    }
    setError('')
    setSelectedFiles([...selectedFiles, ...files])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files))
  }

  const handleRemoveFile = (file: File) => {
    setSelectedFiles(selectedFiles.filter(f => f !== file))
    setError('')
  }

  const isMaxReached = selectedFiles.length >= MAX_FILES

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      setError('Please upload at least one PDF file.')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      selectedFiles.forEach(file => formData.append('files', file))

      const response = await fetch('/api/convert', { method: 'POST', body: formData })
      if (!response.ok) throw new Error('Failed to convert files.')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'statements.xlsx'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center p-5 lg:pt-10 px-6 gap-10">

      {/* Title */}
      {selectedFiles.length == 0 && (
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-10">
          PDF Bank Statement Converter
        </h1>
      )}

      {error && <ErrorMessage message={error} />}


      <div className={`flex flex-col ${selectedFiles.length == 0 ? 'w-full ' : 'lg:flex-row-reverse lg:h-[75vh] gap-4 xl:gap-8 w-full justify-center'}   `}>
        {/* Uploader + Button */}
        <div className={`md:p-5 ${selectedFiles.length > 0 ? '' : ''} `}>
          <UploadCard loading={loading} fileCount={selectedFiles.length} onFilesAdded={addFiles} isMaxReached={isMaxReached} />
          {selectedFiles.length > 0 && (
            <button
              onClick={handleConvert}
              disabled={loading}
              className={`justify-center
            mt-6 px-8 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2
            hover:bg-green-700 active:scale-[0.98] transition-all shadow-md w-full
            ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          `}
            >
              <RiFileExcel2Fill className='size-6' />
              {loading ? 'Converting...' : 'Convert to Excel'}

            </button>
          )}
        </div>

        {/* Line */}
        {selectedFiles.length > 0 && (
          <div className='border border-gray-300' />
        )}

        {/* Files */}
        {selectedFiles.length > 0 && (
          <FileListCard files={selectedFiles} onRemoveFile={handleRemoveFile} />
        )}
      </div>


      <input
        id="fileInput"
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default FileUpload
