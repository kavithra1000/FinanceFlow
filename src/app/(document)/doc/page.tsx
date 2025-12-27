'use client'
import { useState } from 'react'
import { Inter } from 'next/font/google'
import Header from '@/components/doc/Header'
import FileUpload from '@/components/doc/FileUpload'


const inter = Inter({
    weight: ['400', '600'],
    subsets: ['latin'],
})

const Page = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    

    return (
        <main className={`${inter.className} min-h-screen flex flex-col scroll-smooth`}>
            <section className='flex-1'>
                <Header />
                <FileUpload setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} />
            </section>

        </main>
    )
}

export default Page
