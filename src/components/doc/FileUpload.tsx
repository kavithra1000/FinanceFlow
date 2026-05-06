'use client'

import React from 'react'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { LuSparkles } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import UploadCard from './UploadCard'
import FileListCard from './FileListCard'
import ErrorMessage from './ErrorMessage'
import { usePdfStore } from '@/stores/usePdfStore'
import { useResultStore } from '@/stores/useResultStore'

const FileUpload = () => {
  // -------------------- PDF Store --------------------
  const selectedFiles = usePdfStore(state => state.selectedFiles)
  const error = usePdfStore(state => state.error)
  const loading = usePdfStore(state => state.loading)
  const addFiles = usePdfStore(state => state.addFiles)
  const setError = usePdfStore(state => state.setError)
  const setLoading = usePdfStore(state => state.setLoading)

  // -------------------- Result Store --------------------
  const setResult = useResultStore(state => state.setResult)

  // -------------------- Handlers --------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    addFiles(Array.from(e.target.files))
    e.target.value = '' // allow re-selecting the same file
  }

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      setError('Please upload at least one PDF.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      selectedFiles.forEach(file => formData.append('files', file))

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      setResult(
        null, // No file blob yet
        data.summary,
        data.transactions
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  // -------------------- Render --------------------
  return (
    <div className="relative flex flex-col items-center min-h-[calc(100vh-80px)] p-6 lg:p-12 overflow-hidden">
      
      {/* Background Glow Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-200/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-100/30 blur-[100px] rounded-full -z-10" />

      {/* Hero Section */}
      {selectedFiles.length === 0 && (
        <div className="text-center max-w-4xl mb-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Badge */}
          <div className="mb-6 rounded-full inline-flex bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
            <p className="animate-pulse inline-flex items-center gap-2">
              <LuSparkles className="h-4 w-4" />
              AI-Powered Extraction
            </p>
          </div>

          <h1 className="text-4xl sm:text-3xl lg:text-6xl font-semibold text-slate-900 leading-tight mb-6">
            Precision Banking <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>


          {/* Trust Indicators */}
          <div className="flex flex-row font-medium flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-600">
            <span className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 text-green-600" />
              Secure processing
            </span>
            <span className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 text-green-600" />
              No data storage
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full max-w-2xl animate-in zoom-in-95 duration-300">
          <ErrorMessage message={error} />
        </div>
      )}

      <div
        className={`flex flex-col w-full max-w-7xl justify-center items-start transition-all duration-700 gap-12 ${
          selectedFiles.length > 0 ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Upload Card Area */}
        <div className={`w-full transition-all duration-500 ${selectedFiles.length > 0 ? 'lg:w-[400px] sticky top-8' : 'max-w-4xl mx-auto'}`}>
          <div className="relative group">
            <UploadCard />
            
            {selectedFiles.length > 0 && (
              <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={loading}
                  className={`group relative overflow-hidden px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold
                    flex items-center justify-center gap-3 w-full shadow-2xl shadow-gray-200
                    hover:scale-[1.02] active:scale-[0.98] transition-all
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <RiFileExcel2Fill className="size-6 relative z-10" />
                  <span className="relative z-10">
                    {loading ? 'Processing Data…' : 'Finalize & Convert'}
                  </span>
                </button>
                <p className="text-center text-xs text-gray-500">
                  Multiple statements will be consolidated into a single Excel file.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Files Hub */}
        {selectedFiles.length > 0 && (
          <div className="flex-1 w-full animate-in fade-in slide-in-from-left-8 duration-700">
            <FileListCard />
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default FileUpload
