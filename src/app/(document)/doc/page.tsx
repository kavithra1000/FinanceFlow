'use client'

import { Inter } from 'next/font/google'
import Header from '@/components/doc/Header'
import FileUpload from '@/components/doc/FileUpload'
import ResultModal from '@/components/doc/ResultModal'
import Footer from '@/components/shared/Footer'


const inter = Inter({
    weight: ['400', '600'],
    subsets: ['latin'],
})

const Page = () => {    
    return (
        <main className={`${inter.className} h-screen flex flex-col scroll-smooth`}>
            <section className='flex-1'>
                <Header />
                <FileUpload />
                <ResultModal />
                <Footer />
            </section>

        </main>
    )
}

export default Page
