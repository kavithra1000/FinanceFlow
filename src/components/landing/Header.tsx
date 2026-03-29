'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'
import { SignUpButton } from '@clerk/nextjs'
import { navigate } from 'next/dist/client/components/segment-cache/navigation'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
        className={`${scrolled ? 'md:w-[60%] w-[92%] ' : 'w-screen'}`}
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          top: scrolled ? '16px' : '0px',
          maxWidth: scrolled ? '72rem' : '100%',
          borderRadius: scrolled ? '9999px' : '0px',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(14px)',
          boxShadow: scrolled ? '0 4px 28px rgba(0,0,0,0.10)' : '0 1px 0 rgba(0,0,0,0.07)',
          transition: [
            'top 0.5s cubic-bezier(0.4,0,0.2,1)',
            'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            'max-width 0.5s cubic-bezier(0.4,0,0.2,1)',
            'border-radius 0.5s cubic-bezier(0.4,0,0.2,1)',
            'box-shadow 0.5s cubic-bezier(0.4,0,0.2,1)',
            'background-color 0.5s cubic-bezier(0.4,0,0.2,1)',
          ].join(', '),
        }}
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
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200"
            >
              Pricing
            </Link>

            <Link href="/doc">
              <Button variant="outline" size="sm">
                Sign Up
              </Button>
            </Link>
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
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 px-2 py-1.5 rounded-lg hover:bg-gray-50"
                >
                  Pricing
                </Link>

                <div className="h-px bg-gray-100 my-1" />

                <Button variant="outline" className="w-full" size="sm">
                  Sign Up
                </Button>
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