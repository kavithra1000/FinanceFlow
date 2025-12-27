'use client'   


import { Inter } from 'next/font/google'
import Header from '@/components/doc/Header'

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
})

const Page = () => {
  return (
    <div className={`${inter.className}`}>
      <Header />
      <br />
      <h1>Convert Your Bank Statement</h1>
      <p>Simply upload your PDF bank statement, and our AI will extract your transactions into a clean, editable table.</p>

      <p>No file chosen</p>
      <p>Drag & drop your PDF here</p>

      <p>or</p>

      <p>Click to Upload</p>
      <p>Your data is processed securely and is not stored on our servers.</p>

      <footer>
        © 2025 Bank Statement AI. All rights reserved.
      </footer>
    </div>
  )
}

export default Page
