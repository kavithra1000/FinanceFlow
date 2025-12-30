'use client'

import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5"
import { Item, ItemActions, ItemContent, ItemTitle } from '../ui/item'
import { FaFilePdf } from "react-icons/fa6"
import { FaCloudUploadAlt } from "react-icons/fa"
import { RiFileExcel2Fill } from "react-icons/ri"
import ErrorMessage from './ErrorMessage'

interface FileUploadProps {
  setSelectedFiles: (files: File[]) => void
  selectedFiles: File[]
}

const MAX_FILES = 10

const FileUpload: React.FC<FileUploadProps> = ({ setSelectedFiles, selectedFiles }) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const addFiles = (files: File[]) => {
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(Array.from(e.dataTransfer.files))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles(selectedFiles.filter(file => file !== fileToRemove))
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

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData
      })

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
      if (err instanceof Error) setError(err.message)
      else setError('Unknown error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center pt-30 px-10">
      <h1 className='mt-8 font-semibold text-4xl max-w-4xl text-center'>
        Upload your PDF bank statement
      </h1>

      {error && <ErrorMessage message={error} />}

      <div
        className={`
          w-full max-w-4xl mt-12 py-15
          flex flex-col items-center justify-center gap-4
          rounded-2xl border-2 border-dashed
          ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-linear-to-br from-green-50 to-green-100'}
          transition-all duration-300
          ${isMaxReached ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDrop={isMaxReached ? undefined : handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isMaxReached && document.getElementById('fileInput')?.click()}
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
          <FaCloudUploadAlt size={28} />
        </div>

        <div className="text-center space-y-1">
          <p className="text-lg font-semibold text-gray-800">
            Drag & drop your PDFs
          </p>
          <p className="text-sm text-gray-500">
            Bank statements only · Up to {MAX_FILES} files
          </p>
        </div>

        <div className="flex items-center w-full gap-3 px-20">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400 whitespace-nowrap">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          type="button"
          disabled={isMaxReached}
          className={`
            px-4 py-2
            rounded-md
            text-green-600 font-medium
            border-2 border-green-600 bg-white
            transition
            ${isMaxReached ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-200 cursor-pointer'}
          `}
        >
          {selectedFiles.length > 0 ? 'Add more files' : 'Browse files'}
        </button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="my-15 text-center">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {selectedFiles.map((file, index) => (
              <Item key={index} variant="outline" className='py-2 px-3 gap-2 shadow-lg rounded-full bg-linear-to-br from-green-50 to-green-100'>
                <ItemContent className='flex flex-row items-center justify-start gap-3 font-bold'>
                  <FaFilePdf className='text-red-500' />
                  <ItemTitle className='font-semibold max-w-45 text-start line-clamp-1'>{file.name}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold text-lg p-1 border rounded-full"
                    onClick={() => handleRemoveFile(file)}
                  >
                    <IoCloseSharp size={15} />
                  </button>
                </ItemActions>
              </Item>
            ))}
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleConvert}
            className={`
              mt-20 mx-auto
              px-8 py-3.5
              rounded-xl
              bg-linear-to-r from-green-600 to-green-700
              text-white font-semibold
              flex items-center gap-3
              shadow-lg shadow-green-500/30
              hover:from-green-700 hover:to-green-800
              hover:shadow-green-600/40
              active:scale-[0.98]
              transition-all duration-100 cursor-pointer
              ${loading ? 'opacity-60 cursor-not-allowed' : ''}
            `}
          >
            <RiFileExcel2Fill className="size-6" />
            {loading ? 'Converting...' : 'Convert to Excel'}
          </button>
        </div>
      )}

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
