'use client'

import React from 'react'
import { FaFilePdf } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'

interface FileItemProps {
  file: File
  onRemove: () => void
}

const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => (
  <div className="w-full flex items-center justify-between gap-3 py-2 px-4 rounded-lg bg-green-50 border">
    <div className="flex items-center gap-2 min-w-0 flex-1">
      <FaFilePdf className="text-red-500 shrink-0" />
      <span className="truncate font-medium">
        {file.name}
      </span>
    </div>

    <button
      onClick={onRemove}
      className="shrink-0 bg-white text-red-500 hover:text-red-700 p-1 rounded-full cursor-pointer border"
    >
      <IoCloseSharp size={15} />
    </button>
  </div>
)


export default FileItem
