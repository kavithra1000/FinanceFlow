'use client'
import React, { DragEvent, ChangeEvent } from 'react'
import { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'

const Upload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      alert(`File "${files[0].name}" ready to upload!`)
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      alert(`File "${files[0].name}" ready to upload!`)
    }
  }

  return (
    <section className="relative mt-20 flex justify-center px-5">
      <div
        className={`w-full max-w-5xl py-15 flex flex-col items-center justify-center gap-4
          rounded-2xl border-2 border-dashed shadow-2xl drop-shadow-emerald-600
          ${isDragging ? 'border-green-500 bg-green-50' : 'border-slate-400 bg-linear-to-br from-green-50 to-green-100'}
          transition-all duration-300
          cursor-pointer
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-200 text-green-600 duration-500">
          <FaCloudUploadAlt size={28} />
        </div>

        <div className="text-center sm:space-y-2 space-y-1 sm:mt-4">
          <p className="text-lg sm:text-xl font-semibold text-gray-800">Drag & drop your PDFs</p>
          <p className="text-sm text-gray-500">Bank statements only</p>
        </div>

        <div className="flex items-center w-full gap-3 px-20">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400 whitespace-nowrap">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-md text-green-600 font-medium border-2 border-green-600 bg-white hover:bg-green-200 transition"
        >
          Browse files
        </button>

        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </section>
  )
}

export default Upload
