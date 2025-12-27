'use client'

import { useEffect, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// ✅ Use CDN worker (fixes module error)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface PdfThumbnailProps {
  file: File
}

export default function PdfThumbnail({ file }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let isMounted = true

    const renderPdf = async () => {
      const url = URL.createObjectURL(file)

      const pdf = await pdfjsLib.getDocument(url).promise
      const page = await pdf.getPage(1)

      const viewport = page.getViewport({ scale: 0.5 })
      const canvas = canvasRef.current
      if (!canvas || !isMounted) return

      const context = canvas.getContext('2d')
      if (!context) return

      canvas.width = viewport.width
      canvas.height = viewport.height

      // ✅ Correct render params
      await page.render({
        canvas,
        canvasContext: context,
        viewport,
      }).promise
    }

    renderPdf()

    return () => {
      isMounted = false
    }
  }, [file])

  return (
    <canvas
      ref={canvasRef}
      className="rounded-md border bg-white shadow-sm"
    />
  )
}
