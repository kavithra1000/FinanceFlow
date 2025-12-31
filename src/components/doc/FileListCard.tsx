'use client'

import React from 'react'
import FileItem from './FileItem'

interface FileListCardProps {
  files: File[]
  onRemoveFile: (file: File) => void
}

const FileListCard: React.FC<FileListCardProps> = ({ files, onRemoveFile }) => (
  <div className=" flex flex-col gap-3 md:p-4 bg-white rounded-xl w-full lg:max-w-xl xl:max-w-2xl h-full">
    <h2 className="font-semibold text-gray-700">Selected Files ({files.length})</h2>
    <div className="grid lg:grid-cols-1 grid-cols-1 sm:grid-cols-2 gap-2 ">
      {files.map((file, i) => (
        <FileItem key={i} file={file} onRemove={() => onRemoveFile(file)} />
      ))}
    </div>
  </div>
)

export default FileListCard
