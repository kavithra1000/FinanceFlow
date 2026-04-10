'use client'

import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { usePdfStore } from '@/stores/usePdfStore'

const UploadCard: React.FC = () => {
  // -------------------- PDF Store --------------------
  const selectedFiles = usePdfStore(state => state.selectedFiles)
  const loading = usePdfStore(state => state.loading)
  const MAX_FILES = usePdfStore(state => state.MAX_FILES)
  const handleDropFiles = usePdfStore(state => state.handleDropFiles)

  // -------------------- Local State --------------------
  const [isDragging, setIsDragging] = useState(false)

  // -------------------- Handlers --------------------
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleDropFiles(Array.from(e.dataTransfer.files))
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const isMaxReached = selectedFiles.length >= MAX_FILES
  const isDisabled = loading || isMaxReached

  // -------------------- Render --------------------
  return (
    <div
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      className={`
        relative flex flex-col items-center justify-center gap-6 
        p-12 rounded-[2.5rem] border-2 border-dashed
        bg-white/40 backdrop-blur-xl
        shadow-[0_20px_50px_rgba(0,0,0,0.05)]
        ${selectedFiles.length < 1 ? 'min-h-[400px]' : 'min-h-[250px]'}
        ${isDragging 
          ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01] shadow-emerald-100' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-white/60'}
        transition-all duration-500 ease-out
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
      <div className={`
        flex items-center justify-center w-20 h-20 rounded-3xl 
        bg-gradient-to-br from-emerald-500 to-green-600 
        text-white shadow-lg shadow-emerald-200
        transition-transform duration-500
        ${isDragging ? 'scale-110' : 'group-hover:scale-105'}
      `}>
        <FaCloudUploadAlt size={32} />
      </div>

      <div className="space-y-2 text-center pointer-events-none">
        <p className="text-xl font-bold text-gray-900">
          {isDragging ? 'Drop to Upload' : 'Upload Bank Statements'}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          Drag & drop your PDFs here or click to <span className="text-emerald-600 font-semibold underline decoration-emerald-200 underline-offset-4">browse files</span>
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100/50 border border-gray-100 text-[11px] font-medium text-gray-400 uppercase tracking-widest pointer-events-none">
        PDF Only • Max {MAX_FILES} Files
      </div>
    </div>
  )
}

export default UploadCard
