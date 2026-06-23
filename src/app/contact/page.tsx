import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import ContactSection from '@/components/contact/ContactSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us – FinzFlow',
  description:
    'Get in touch with the FinzFlow team. We reply within 24 hours. Reach us at support@puretextclean.com.',
}

const ContactPage = () => {
  return (
    <div className="font-sans">
      <Header />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default ContactPage
