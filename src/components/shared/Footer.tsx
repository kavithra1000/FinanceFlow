'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Pricing', href: '/price' },
        { name: 'Converter', href: '/doc' },
        { name: 'Features', href: '/#features' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Help Center', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Security', href: '#' },
      ],
    },
  ]

  const socials = [
    { icon: <FaTwitter size={18} />, href: '#', name: 'Twitter' },
    { icon: <FaFacebook size={18} />, href: '#', name: 'Facebook' },
    { icon: <FaLinkedin size={18} />, href: '#', name: 'LinkedIn' },
    { icon: <FaGithub size={18} />, href: '#', name: 'GitHub' },
  ]

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image alt="logo" src="/logo.png" width={32} height={32} />
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                FinanceFlow
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              The ultimate AI-powered bank statement converter. Turn complex PDFs 
              into accurate spreadsheets in seconds. Precision banking made simple for 
              businesses and individuals worldwide.
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-2 text-slate-400 hover:text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 rounded-lg"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-emerald-600 transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 lg:mt-24 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © {currentYear} FinanceFlow Inc. All rights reserved. 
            <span className="hidden sm:inline mx-2 text-slate-300">|</span> 
            Made with <span className="text-rose-500">♥</span> globally.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors"> Status </Link>
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors"> Privacy </Link>
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors"> Terms </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
