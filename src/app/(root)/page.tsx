
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import Process from '@/components/landing/Process'
import Features from '@/components/landing/Features'
import Benefits from '@/components/landing/Benefits'
import Trust from '@/components/landing/Trust'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

const Page = () => {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
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
