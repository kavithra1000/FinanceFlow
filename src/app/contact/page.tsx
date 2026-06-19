import { Inter } from 'next/font/google'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import ContactSection from '@/components/contact/ContactSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us – FinanceFlow',
  description:
    'Get in touch with the FinanceFlow team. We reply within 24 hours. Reach us at support@financeflow.com.',
}

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const ContactPage = () => {
  return (
    <div className={inter.className}>
      <Header />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default ContactPage
