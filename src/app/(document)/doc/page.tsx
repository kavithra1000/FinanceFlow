import Header from '@/components/doc/Header'
import FileUpload from '@/components/doc/FileUpload'
import ResultModal from '@/components/doc/ResultModal'
import Footer from '@/components/shared/Footer'

const Page = () => {    
    return (
        <main className="font-sans h-screen flex flex-col scroll-smooth">
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
