'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 md:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image alt="logo" src="/logo.png" width={28} height={28} />
            <span className="text-lg font-extrabold text-slate-900 sm:text-xl">
              FinanceFlow
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {isMounted && (
              <>
                <SignedOut>
                  <SignInButton>
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-5">
                    <Button variant="outline" size="sm">
                      Subscribe ✨
                    </Button>
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonBox: 'focus:outline-none',
                        },
                      }}
                    />
                  </div>
                </SignedIn>
              </>
            )}
          </nav>

          {/* Mobile: Hamburger only */}
          <div className="relative md:hidden" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="rounded-full p-1.5 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Floating Dropdown — detached below hamburger */}
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                right: 0,
                width: '220px',
                backgroundColor: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(16px)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.07)',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
                pointerEvents: open ? 'auto' : 'none',
                transition: 'opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)',
                transformOrigin: 'top right',
              }}
            >
              <div className="flex flex-col gap-2 p-4">
                {isMounted && (
                  <>
                    <SignedOut>
                      <SignInButton>
                        <Button variant="outline" className="w-full" size="sm">
                          Sign In
                        </Button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <Button variant="outline" className="w-full" size="sm">
                        Subscribe ✨
                      </Button>
                      <div className="flex justify-center pt-2">
                        <UserButton
                          appearance={{
                            elements: {
                              userButtonBox: 'focus:outline-none',
                            },
                          }}
                        />
                      </div>
                    </SignedIn>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-14 md:h-15" />
    </>
  )
}

export default Header

