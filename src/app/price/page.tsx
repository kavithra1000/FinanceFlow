
import { Inter } from 'next/font/google'
import Header from '@/components/landing/Header'
import Benefits from '@/components/landing/Benefits'
import Trust from '@/components/landing/Trust'
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
      <Trust />
      <Benefits />
      <Footer />

    </div>
  )
}

export default Page
