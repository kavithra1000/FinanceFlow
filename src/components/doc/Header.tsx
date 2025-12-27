'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className="min-w-full flex-nowrap border-b border-zinc-900/20 flex w-full items-center justify-between gap-2 px-4 lg:px-10 xl:px-20 p-4 fixed backdrop-blur-2xl">
      {/* Logo or Home Link */}
      <Link href='/' className="cursor-pointer">
        <h1 className='font-extrabold text-xl'>FinanceFlow</h1>
      </Link>

      {/* Show Sign In / Sign Up when user is not signed in */}
      <SignedOut>
        <div className="flex gap-2">
          <SignInButton>
            <Button variant={'outline'}>Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>

      {/* Show UserButton when signed in */}
      <SignedIn>
        <div className="flex items-center gap-5 ">
          <Button variant={'outline'}>Subscribe ✨</Button>
          <UserButton
            appearance={{
              elements: {
                userButtonBox: 'focus:outline-none',
              },
            }}
          />
        </div>
      </SignedIn>
    </header>
  )
}

export default Header
