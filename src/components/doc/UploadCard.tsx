'use client'

import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'

interface UploadCardProps {
  onFilesAdded: (files: File[]) => void
  isMaxReached: boolean
  fileCount: number
  loading: boolean
}

const MAX_FILES = 10

const UploadCard: React.FC<UploadCardProps> = ({ onFilesAdded, isMaxReached, fileCount, loading }) => {

  const isDisabled: boolean = loading || isMaxReached
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    onFilesAdded(Array.from(e.dataTransfer.files))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  return (
    <div

      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      className={`
        flex flex-col items-center justify-center gap-4 
        p-6 rounded-xl border-2 border-dashed max-w-4xl mx-auto
        ${fileCount < 1 ? 'py-10' : ''}
        ${isDragging ? 'bg-green-50' : 'border-gray-300'}
        transition-all duration-300
        ${isDisabled
              ? 'opacity-50 cursor-not-allowed pointer-events-none'
              : 'cursor-pointer'}
      `}
      onDrop={isDisabled ? undefined : handleDrop}
      onDragOver={isDisabled ? undefined : handleDragOver}
      onDragLeave={isDisabled ? undefined : handleDragLeave}
      onClick={() => {
        if (isDisabled) return
        document.getElementById('fileInput')?.click()
      }}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
        <FaCloudUploadAlt size={28} />
      </div>
      <p className={`text-lg font-semibold text-gray-800 text-center`}>
        Drag & drop your PDFs or click to browse
      </p>
      <p className="text-sm text-gray-500 text-center">
        Bank statements only · Up to {MAX_FILES} files
      </p>
    </div>
  )
}

export default UploadCard
