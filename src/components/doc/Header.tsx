'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { useState, useLayoutEffect } from 'react'

const Header = () => {
  const [isMounted, setIsMounted] = useState(false)

  // Use layout effect to avoid cascading render warning
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  return (
    <header className="relative z-1 min-w-full flex-nowrap flex w-full items-center justify-between gap-2 px-4 lg:px-10 xl:px-20 p-4 backdrop-blur-2xl">
      
      {/* Logo / Home */}
      <Link href='/' className="cursor-pointer flex items-center justify-center gap-2 pointer-events-none">
        <Image alt='logo' src={'/logo.png'} width={40} height={40} />
        <h1 className='font-extrabold text-xl'>FinanceFlow</h1>
      </Link>

      {/* Signed Out */}
      <SignedOut>
        {isMounted && (
          <div className="flex gap-2">
            <SignInButton>
              <Button variant={'outline'}>Sign In</Button>
            </SignInButton>
          </div>
        )}
      </SignedOut>

      {/* Signed In */}
      <SignedIn>
        {isMounted && (
          <div className="flex items-center gap-5">
            <Button variant={'outline'}>Subscribe ✨</Button>
            <UserButton
              appearance={{
                elements: {
                  userButtonBox: 'focus:outline-none',
                },
              }}
            />
          </div>
        )}
      </SignedIn>
    </header>
  )
}

export default Header
