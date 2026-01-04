import React from 'react'
import { Button } from '../ui/button'
import { LuSparkles } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';


const Hero = () => {
    return (
        <section className="text-center  px-5">
            {/* Badge */}
            <div className="mt-30 mx-auto rounded-full inline-flex bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700 ">
                <p className='animate-pulse inline-flex items-center gap-2 '>
                    <LuSparkles className="h-4 w-4" />
                    AI-Powered Extraction
                </p>
            </div>

            {/* Heading */}
            <h1 className="mt-4 sm:mt-5 mx-auto max-w-4xl text-4xl font-semibold text-slate-900 leading-tight sm:text-5xl lg:text-6xl">
                Convert Bank Statement PDFs to{" "}
                <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Excel in Seconds
                </span>
            </h1>

            {/* Subheading */}
            <p className="mt-4 mx-auto max-w-3xl text-md sm:text-lg text-slate-600">
                AI-powered tool that works with both scanned and digital bank statements.
                Instantly turn unstructured PDFs into clean, accurate spreadsheets.
            </p>

            {/* CTA */}
            <Link href={"/doc"}>
                <Button size="lg" className="mt-20 cursor-pointer font-semibold px-6 py-6 mx-auto text-md bg-linear-to-br from-emerald-600 to-green-600 shadow-xl ">
                    Get Started - <span className='text-sm font-normal'>it&apos;s free</span>
                    <ArrowRight className='size-5' />
                </Button>
            </Link>


            {/* Trust indicators */}
            <div className="mt-8  mx-auto flex flex-row font-medium flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-600">
                <span className='flex items-center justify-start gap-2 text-sm sm:text-md'>
                    <FiCheckCircle className="w-5 h-5 text-green-600 font-bold" />
                    No bank card required
                </span>
                <span className='flex items-center justify-start gap-2 text-sm sm:text-md'>
                    <FiCheckCircle className="w-5 h-5 text-green-600" />
                    Secure file processing
                </span>
            </div>
        </section>

    )
}

export default Hero