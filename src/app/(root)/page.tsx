
import { Inter } from 'next/font/google'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import Upload from '@/components/landing/Upload'
import Process from '@/components/landing/Process'
import Features from '@/components/landing/Features'
import Benefits from '@/components/landing/Benefits'
import Trust from '@/components/landing/Trust'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
})

const Page = () => {
  return (
    <div className={`${inter.className} `}>
      <Header />
      <Hero />
      <Upload />
      <Process />
      <Features />
      <Benefits />
      <Trust />
      <FinalCTA />
      <Footer />

    </div>
  )
}

export default Page
