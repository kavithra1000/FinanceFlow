import React from 'react'
import { Inter } from 'next/font/google'
import Header from '@/components/doc/Header'
import PricingSection from '@/components/price/PricingSection'

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
})


const page = () => {
  return (
    <div className={`${inter.className}`}>
        <Header />
        <PricingSection />
        
    </div>
  )
}

export default page