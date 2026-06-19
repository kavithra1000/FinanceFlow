
import { Inter } from 'next/font/google'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import PricingSection from '@/components/price/PricingSection'
const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
})

const Page = () => {
  return (
    <div className={`${inter.className} `}>
      <Header />
      <PricingSection/>
      <Footer />

    </div>
  )
}

export default Page
