'use client'

import React from 'react'
import FileItem from './FileItem'
import { usePdfStore } from '@/stores/usePdfStore'


const FileListCard = () => {

  const selectedFiles = usePdfStore(state => state.selectedFiles);
  const removeFile = usePdfStore(state => state.removeFile);
  

  return (

    <div className=" flex flex-col gap-3 md:p-4 bg-white rounded-xl w-full lg:max-w-xl xl:max-w-2xl h-full">
      <h2 className="font-semibold text-gray-700">Selected Files ({selectedFiles.length})</h2>
      <div className="grid lg:grid-cols-1 grid-cols-1 sm:grid-cols-2 gap-2 ">
        {selectedFiles.map((file, i) => (
          <FileItem key={i} file={file} onRemove={() => removeFile(file)} />
        ))}
      </div>
    </div>
  )
}

export default FileListCard
