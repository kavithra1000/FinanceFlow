'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '../landing/Header'
import Footer from './Footer'
import { Shield, Scale, Cookie, Lock, ChevronRight } from 'lucide-react'

interface DocPageLayoutProps {
  title: string
  highlight: string          // the word rendered in emerald gradient
  badge: string
  description: string
  lastUpdated: string
  children: React.ReactNode
  toc: { id: string; label: string }[]
  fileLabel: string          // shown in mac-window bar e.g. "privacy_policy.tsx"
}

export default function DocPageLayout({
  title,
  highlight,
  badge,
  description,
  lastUpdated,
  children,
  toc,
  fileLabel,
}: DocPageLayoutProps) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Privacy Policy',   href: '/privacy',  icon: Shield },
    { name: 'Terms of Service', href: '/terms',    icon: Scale  },
    { name: 'Cookie Policy',    href: '/cookies',  icon: Cookie },
    { name: 'Security',         href: '/security', icon: Lock   },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white antialiased">
      <Header />

      {/* ── Section wrapper — identical structure to ContactSection ───────── */}
      <section className="relative flex-grow flex flex-col items-center px-5 py-22 overflow-hidden">

        {/* ── Grid texture ────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #d1fae5 1px, transparent 1px),
              linear-gradient(to bottom, #d1fae5 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── Ambient glow blobs ──────────────────────────────────────────── */}
        <div className="absolute top-[-8%] left-[-8%] w-[38%] h-[38%] bg-emerald-200/20 blur-[130px] rounded-full -z-10" />
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-green-100/25 blur-[100px] rounded-full -z-10" />

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="text-center mb-14 max-w-2xl mx-auto w-full">
          {/* Animated badge — same as contact */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {badge}
          </div>

          {/* Heading with emerald gradient + SVG underline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            {title}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                {highlight}
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0,6 C50,0 150,0 200,6" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-4 text-md sm:text-lg text-slate-600">{description}</p>
          <p className="mt-2 text-xs text-slate-400 font-medium">Last updated: {lastUpdated}</p>
        </div>

        {/* ── Main content grid ────────────────────────────────────────────── */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT: Policy nav + TOC ────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Nav cards — same style as contact info cards */}
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`group rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 p-5 cursor-pointer
                    ${isActive
                      ? 'border-emerald-300 bg-emerald-50/60 shadow-md'
                      : 'border-slate-200 hover:border-emerald-200'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                        ${isActive
                          ? 'bg-emerald-100'
                          : 'bg-emerald-50 group-hover:bg-emerald-100'}`}
                      >
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold transition-colors
                          ${isActive ? 'text-emerald-700' : 'text-slate-800 group-hover:text-emerald-600'}`}
                        >
                          {item.name}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-colors
                        ${isActive ? 'text-emerald-500' : 'text-slate-300 group-hover:text-emerald-400'}`}
                      />
                    </div>
                  </div>
                </Link>
              )
            })}

            {/* TOC card — same green-tinted style as the "Tips" card on contact */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">
                On This Page
              </p>
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-center gap-2 text-xs text-emerald-800 hover:text-emerald-600 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── RIGHT: Main document card — mac-window style like contact form ── */}
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-900/5 overflow-hidden">

            {/* Mac window title bar */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100 bg-white/95">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="mx-auto text-xs text-slate-400 font-mono">{fileLabel}</span>
            </div>

            {/* Document content */}
            <div className="p-7 sm:p-10">
              <article className="space-y-10 text-slate-600 leading-relaxed">
                {children}
              </article>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
