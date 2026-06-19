import React from 'react'
import { Metadata } from 'next'
import DocPageLayout from '@/components/shared/DocPageLayout'
import { Cookie, Settings, ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy | FinanceFlow',
  description: 'Understand how and why FinanceFlow uses cookies and tracking technologies on our website.',
}

export default function CookiesPage() {
  const toc = [
    { id: 'definition',  label: '1. What Are Cookies' },
    { id: 'usage',       label: '2. How We Use Cookies' },
    { id: 'types',       label: '3. Types of Cookies' },
    { id: 'management',  label: '4. Managing Your Settings' },
  ]

  return (
    <DocPageLayout
      title="Cookie"
      highlight="Policy."
      badge="Transparent · Minimal cookies used"
      description="We use cookies to provide a secure, smooth, and highly responsive user experience. Here's exactly what we use and why."
      lastUpdated="May 20, 2026"
      fileLabel="cookie_policy.tsx"
      toc={toc}
    >
      {/* 1 — Definition */}
      <section id="definition" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">1</span>
          What Are Cookies
        </h2>
        <p>
          Cookies are small text files stored on your computer or mobile device when you visit a website.
          They are widely used to make websites work correctly, improve navigation efficiency, and provide
          diagnostic information to website operators.
        </p>
      </section>

      {/* 2 — How We Use */}
      <section id="usage" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">2</span>
          How We Use Cookies
        </h2>
        <p>
          FinanceFlow uses cookies to recognize you when you sign in, protect your account against
          unauthorized access, remember your user settings, and analyze platform traffic to fix bugs
          and improve performance.
        </p>
      </section>

      {/* 3 — Types */}
      <section id="types" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">3</span>
          Types of Cookies We Use
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            {
              category: 'Strictly Necessary',
              purpose: 'Required for signing in, checking account authorization, and securing checkout.',
              example: '__session / Clerk, stripe.com',
              color: 'text-emerald-700 bg-emerald-50',
            },
            {
              category: 'Preferences & Settings',
              purpose: 'Remembers choices such as language, theme, or dashboard layout preferences.',
              example: 'ff_settings / LocalStorage',
              color: 'text-blue-700 bg-blue-50',
            },
            {
              category: 'Analytics & Performance',
              purpose: 'Aggregates anonymous counts of page visits, error rates, and load speeds.',
              example: 'Plausible Analytics (self-hosted)',
              color: 'text-violet-700 bg-violet-50',
            },
          ].map(({ category, purpose, example, color }) => (
            <div key={category} className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{category}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>
                      {example}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{purpose}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 — Management */}
      <section id="management" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">4</span>
          Managing Your Settings
        </h2>
        <p>
          Most web browsers automatically accept cookies, but you can change your browser settings to
          decline cookies or prompt you before accepting them.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: Settings,
              label: 'Browser Controls',
              body: 'Use the Privacy or Cookies settings inside Chrome, Safari, Firefox, or Edge to block or clear cookies at any time.',
            },
            {
              icon: ShieldAlert,
              label: 'Impact of Disabling',
              body: 'Blocking essential cookies will prevent you from signing in to your dashboard or using the statement converter.',
            },
          ].map(({ icon: Icon, label, body }) => (
            <div key={label} className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm">
          Questions about our use of cookies? Contact us at{' '}
          <a href="mailto:support@financeflow.com" className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-4 transition-colors">
            support@financeflow.com
          </a>.
        </p>
      </section>
    </DocPageLayout>
  )
}
