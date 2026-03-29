'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { useState, useLayoutEffect } from 'react'
import { ProPlan } from './ProPlan'

const Header = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [showPricing, setShowPricing] = useState(false)

  useLayoutEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <header className="relative z-10 w-full flex items-center justify-between px-4 lg:px-10 xl:px-20 p-4 backdrop-blur-2xl">

        <Link href='/' className="flex items-center gap-2">
          <Image alt='logo' src={'/logo.png'} width={40} height={40} />
          <h1 className='font-extrabold text-xl'>FinanceFlow</h1>
        </Link>

        <SignedOut>
          {isMounted && (
            <SignInButton>
              <Button variant={'outline'}>Sign In</Button>
            </SignInButton>
          )}
        </SignedOut>

        <SignedIn>
          {isMounted && (
            <div className="flex items-center gap-5">
              <Button
                variant={'outline'}
                onClick={() => setShowPricing(true)}
              >
                Subscribe ✨
              </Button>
              <UserButton />
            </div>
          )}
        </SignedIn>
      </header>

      {showPricing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="relative w-full max-w-lg">

            {/* Outside Close Button */}
            <button
              onClick={() => setShowPricing(false)}
              className="cursor-pointer absolute font-bold text-sm flex items-center justify-center -top-8 -right-8 bg-white text-black rounded-full p-2 w-6 h-6 shadow-lg hover:scale-110 transition"
            >
              ✕
            </button>

            <ProPlan />
          </div>

        </div>
      )}
    </>
  )
}

export default Header