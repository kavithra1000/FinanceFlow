'use client'

import React from 'react'
import { FaFilePdf } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'

interface FileItemProps {
  file: File
  onRemove: () => void
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => (
  <div className="group w-full flex items-center justify-between gap-4 p-2 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 hover:bg-white transition-all duration-300 animate-in slide-in-from-right-4">
    <div className="flex items-center gap-4 min-w-0 flex-1">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-500 group-hover:scale-110 transition-transform duration-300">
        <FaFilePdf size={20} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="truncate font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
          {file.name}
        </span>
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          {(file.size / 1024).toFixed(1)} KB
        </span>
      </div>
    </div>

    <button
      onClick={onRemove}
      className="shrink-0 w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100"
      title="Remove from queue"
    >
      <IoCloseSharp size={18} />
    </button>
  </div>
)


export default FileItem
