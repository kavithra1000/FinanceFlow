'use client'

import { useResultStore } from '@/stores/useResultStore'
import { RiDownload2Line } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'
import TransactionTable from './TransactionTable'
import { useState } from 'react'

const ResultModal = () => {
  const { transactions, summary, isExporting, setIsExporting, clearResult } = useResultStore()
  const [error, setError] = useState('')

  const handleExport = async () => {
    if (transactions.length === 0) return

    setIsExporting(true)
    setError('')

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactions),
      })

      if (!response.ok) throw new Error('Failed to generate Excel file')

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = 'statements.xlsx'
      a.click()
      
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
    } finally {
      setIsExporting(false)
    }
  }

  const handleClose = () => {
    clearResult()
  }

  if (transactions.length === 0 && !summary?.failedCount) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 lg:p-10 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-6xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Preview & Export
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Verify extracted data before downloading your Excel file.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <p className="text-sm font-medium text-green-600 uppercase tracking-wider">Success</p>
              <p className="text-3xl font-bold text-green-700 mt-1">{summary?.successCount || 0}</p>
              <p className="text-xs text-green-600/80 mt-1">Files processed successfully</p>
            </div>
            
            {summary?.failedCount && summary.failedCount > 0 ? (
              <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                <p className="text-sm font-medium text-red-600 uppercase tracking-wider">Failed</p>
                <p className="text-3xl font-bold text-red-700 mt-1">{summary.failedCount}</p>
                <div className="mt-2 space-y-1">
                  {summary.failedFiles.map((f, i) => (
                    <p key={i} className="text-[10px] text-red-600 truncate" title={f.error}>
                      • {f.fileName}: {f.error}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 opacity-50">
                   <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">No Failures</p>
                   <p className="text-3xl font-bold text-gray-500 mt-1">0</p>
                </div>
            )}

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">Total Rows</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">{transactions.length}</p>
              <p className="text-xs text-blue-600/80 mt-1">Found in statements</p>
            </div>
          </div>

          {/* Table Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Extracted Transactions</h3>
              <p className="text-xs text-gray-400 italic">Rows are editable</p>
            </div>
            
            <TransactionTable />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-500 max-w-xs">
            Review your data carefully. Changes made here will be reflected in the final Excel document.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-white transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || transactions.length === 0}
              className={`px-8 py-2.5 rounded-xl bg-green-600 text-white font-bold
                flex items-center gap-2 shadow-lg shadow-green-200 transition-all
                hover:bg-green-700 active:scale-[0.98]
                ${(isExporting || transactions.length === 0) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isExporting ? 'Generating...' : 'Download Excel'}
              <RiDownload2Line size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultModal
