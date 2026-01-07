'use client'

import { useEffect } from 'react'
import { useResultStore } from '@/stores/docStore'
import { RiDownload2Line } from 'react-icons/ri'
import { IoWarningOutline, IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

const ResultModal = () => {
  const { resultFile, clearResultFile } = useResultStore()

  // Always call useEffect, but skip logic if resultFile is null
  useEffect(() => {
    if (!resultFile) return

    return () => {
      URL.revokeObjectURL(resultFile.url)
    }
  }, [resultFile])

  const handleDownload = () => {
    if (!resultFile) return
    const a = document.createElement('a')
    a.href = resultFile.url
    a.download = resultFile.name
    a.click()
  }

  const router = useRouter()

  const handleClose = () => {
    if (resultFile) URL.revokeObjectURL(resultFile.url)
    clearResultFile()
    router.push('/doc') // navigate instead of reload
  }

  // Early return for UI
  if (!resultFile) return null

  return (
    <div className="fixed inset-0 z-1 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative text-center">

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <IoClose size={22} />
        </button>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 mb-3">
          Conversion Complete 🎉
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          Your bank statements have been successfully converted to an Excel file.
        </p>

        {/* File info */}
        <div className="bg-green-100 border-2 rounded-xl border-dashed border-green-300 p-3 mb-8">
          <p className="font-medium text-gray-800">{resultFile.name}</p>
          <p className="text-sm text-gray-500">
            {(resultFile.size / 1024).toFixed(2)} KB
          </p>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 rounded-md bg-amber-100 px-2 py-2 text-amber-600 text-sm mb-6">
          <IoWarningOutline size={18} className="mt-0.5" />
          <p>
            Refreshing or closing this page will permanently remove the Excel file
            for security reasons.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="mt-6 px-5 py-3 rounded-sm bg-green-600 text-white shadow-md mx-auto
          hover:bg-green-700 active:scale-[0.98] transition-all
          font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          Download Excel
          <RiDownload2Line size={20} />
        </button>

      </div>
    </div>
  )
}

export default ResultModal
