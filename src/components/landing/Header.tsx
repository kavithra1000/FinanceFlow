'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="top-0 z-50 w-full border-b border-zinc-900/10 backdrop-blur-xl fixed lg:px-20 px-1">
      <div className="mx-auto flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image alt="logo" src="/logo.png" width={30} height={30} />
          <h1 className="text-xl font-extrabold text-slate-900">FinanceFlow</h1>
        </Link> 
        
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/">Pricing</Link>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <Button variant="outline">Subscribe ✨</Button>
              <UserButton />
            </div>
          </SignedIn>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-900/10 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link href="/" onClick={() => setOpen(false)}>
              Pricing
            </Link>

            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button variant="outline" className="w-full">
                Subscribe ✨
              </Button>
              <div className="mt-2">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
