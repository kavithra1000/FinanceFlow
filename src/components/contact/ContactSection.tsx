'use client'

import React, { useState } from 'react'
import { Mail, Clock, Send, CheckCircle2, MessageSquare, User, AtSign } from 'lucide-react'

type FormState = {
  name: string
  email: string
  description: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', description: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})

  const errors: Partial<Record<keyof FormState, string>> = {}
  if (touched.name && !form.name.trim()) errors.name = 'Name is required.'
  if (touched.email && !form.email.trim()) errors.email = 'Email is required.'
  else if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email.'
  if (touched.description && form.description.trim().length < 10)
    errors.description = 'Please describe your issue (at least 10 characters).'

  const isValid =
    form.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.description.trim().length >= 10

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, description: true })
    if (!isValid) return
    setStatus('loading')
    // Simulate an API call
    await new Promise((r) => setTimeout(r, 1600))
    setStatus('success')
  }

  const handleReset = () => {
    setForm({ name: '', email: '', description: '' })
    setTouched({})
    setStatus('idle')
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 py-22 overflow-hidden">

      {/* ── Grid texture (matches site pattern) ─────────────────────────────── */}
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

      {/* ── Ambient glow blobs ───────────────────────────────────────────────── */}
      <div className="absolute top-[-8%] left-[-8%] w-[38%] h-[38%] bg-emerald-200/20 blur-[130px] rounded-full -z-10" />
      <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-green-100/25 blur-[100px] rounded-full -z-10" />

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          We&apos;re here to help
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
          Get in{' '}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
              Touch
            </span>
            <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
              <path d="M0,6 C50,0 150,0 200,6" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="mt-4 text-md sm:text-lg text-slate-600">
          Have a question or need help? Drop us a message and our team will get back to you.
        </p>
      </div>

      {/* ── Main content grid ────────────────────────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* ── LEFT: Contact info cards ─────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Email card */}
          <div className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email us</p>
                <a
                  href="mailto:support@puretextclean.com"
                  className="text-sm font-semibold text-slate-800 hover:text-emerald-600 transition-colors break-all"
                >
                  support@puretextclean.com
                </a>
                <p className="mt-1 text-xs text-slate-400">For general inquiries &amp; support</p>
              </div>
            </div>
          </div>

          {/* Response time card */}
          <div className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Response time</p>
                <p className="text-sm font-semibold text-slate-800">We reply within 24 hours</p>
                <p className="mt-1 text-xs text-slate-400">Mon – Fri, 9 AM – 6 PM UTC</p>
              </div>
            </div>
          </div>

          {/* What to include hint */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">Tips for faster help</p>
            <ul className="space-y-2">
              {[
                'Describe your issue clearly',
                'Mention your account email',
                'Attach screenshots if helpful',
              ].map((tip) => (
                <li key={tip} className="flex items-center gap-2 text-xs text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── RIGHT: Contact form ──────────────────────────────────────────── */}
        <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-900/5 overflow-hidden">

          {/* Card header */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100 bg-white/95">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="mx-auto text-xs text-slate-400 font-mono">contact_form.tsx</span>
          </div>

          <div className="p-7 sm:p-8">
            {status === 'success' ? (
              /* ── Success state ────────────────────────────────────────────── */
              <div className="flex flex-col items-center justify-center text-center py-10 gap-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message sent!</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Thanks for reaching out. We&apos;ll get back to you at{' '}
                    <span className="font-medium text-emerald-700">{form.email}</span> within 24 hours.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-4 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* ── Form ─────────────────────────────────────────────────────── */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    placeholder="Jane Doe"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 bg-slate-50 outline-none transition-all duration-200
                      focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 focus:bg-white
                      ${errors.name ? 'border-red-300 bg-red-50/30 focus:ring-red-300/50 focus:border-red-400' : 'border-slate-200 hover:border-slate-300'}`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <AtSign className="w-3.5 h-3.5 text-slate-400" />
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="jane@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 bg-slate-50 outline-none transition-all duration-200
                      focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 focus:bg-white
                      ${errors.email ? 'border-red-300 bg-red-50/30 focus:ring-red-300/50 focus:border-red-400' : 'border-slate-200 hover:border-slate-300'}`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-description" className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    Message
                  </label>
                  <textarea
                    id="contact-description"
                    name="description"
                    rows={5}
                    value={form.description}
                    onChange={handleChange}
                    onBlur={() => handleBlur('description')}
                    placeholder="Tell us what's on your mind…"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 bg-slate-50 outline-none transition-all duration-200 resize-none
                      focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 focus:bg-white
                      ${errors.description ? 'border-red-300 bg-red-50/30 focus:ring-red-300/50 focus:border-red-400' : 'border-slate-200 hover:border-slate-300'}`}
                  />
                  <div className="flex items-start justify-between">
                    {errors.description ? (
                      <p className="text-xs text-red-500">{errors.description}</p>
                    ) : (
                      <span />
                    )}
                    <span className={`text-xs tabular-nums ${form.description.length < 10 ? 'text-slate-400' : 'text-emerald-600'}`}>
                      {form.description.length} chars
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  We reply within{' '}
                  <span className="font-semibold text-emerald-600">24 hours</span>. Your data is always private.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
