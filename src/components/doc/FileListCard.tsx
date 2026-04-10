'use client'

import React from 'react'
import FileItem from './FileItem'
import { usePdfStore } from '@/stores/usePdfStore'


const FileListCard = () => {

  const selectedFiles = usePdfStore(state => state.selectedFiles);
  const removeFile = usePdfStore(state => state.removeFile);
  

  return (

    <div className="flex flex-col h-full animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-emerald-500 rounded-full" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Processing Queue</h2>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest leading-none mt-1">
              Ready for extraction
            </p>
          </div>
        </div>
        <div className="bg-emerald-50 text-emerald-700 font-bold px-4 py-1.5 rounded-xl text-sm border border-emerald-100 shadow-sm">
          {selectedFiles.length} {selectedFiles.length === 1 ? 'Statement' : 'Statements'}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 overflow-y-auto pr-2 max-h-[480px] xl:max-h-[65vh] scrollbar-thin scrollbar-thumb-gray-200">
        {selectedFiles.map((file, i) => (
          <FileItem key={i} file={file} onRemove={() => removeFile(file)} />
        ))}
      </div>
    </div>
  )
}

export default FileListCard
