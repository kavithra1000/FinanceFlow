import React from 'react'
import { Metadata } from 'next'
import DocPageLayout from '@/components/shared/DocPageLayout'
import { ShieldCheck, Lock, Trash2, Server, UserCheck, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security | FinanceFlow',
  description: 'Learn about the advanced security infrastructure, encryption, and deletion protocols protecting your financial statements on FinanceFlow.',
}

export default function SecurityPage() {
  const toc = [
    { id: 'overview',       label: '1. Security Overview' },
    { id: 'encryption',     label: '2. Data Encryption' },
    { id: 'deletion',       label: '3. Statement Deletion Protocol' },
    { id: 'infrastructure', label: '4. Hosting & Infrastructure' },
    { id: 'auth',           label: '5. Account & Auth Security' },
    { id: 'disclosure',     label: '6. Vulnerability Disclosure' },
  ]

  return (
    <DocPageLayout
      title="Bank-Grade"
      highlight="Security."
      badge="Encrypted · Purged after 24h · MFA ready"
      description="We employ bank-grade protocols to ensure your financial statements are parsed, processed, and permanently purged with zero compromise."
      lastUpdated="May 20, 2026"
      fileLabel="security_policy.tsx"
      toc={toc}
    >
      {/* 1 — Overview */}
      <section id="overview" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">1</span>
          Security Overview
        </h2>
        <p>
          At FinanceFlow, we recognize that bank statements contain highly sensitive financial information.
          Security is a core requirement in every feature we ship — not an afterthought.
        </p>
        <div className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 text-emerald-800 text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <strong>Zero Storage Commitment:</strong> We do not build permanent transaction profiles or
            aggregate your banking records. FinanceFlow is designed to be a temporary utility — we parse,
            convert, and delete.
          </p>
        </div>
      </section>

      {/* 2 — Encryption */}
      <section id="encryption" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">2</span>
          Data Encryption
        </h2>
        <p>Your files and data are protected by industry-standard encryption at all times:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: Lock,
              label: 'In Transit — TLS 1.3',
              body: 'All traffic between your browser and our servers is encrypted using Transport Layer Security (TLS 1.3), preventing eavesdropping or tampering.',
            },
            {
              icon: ShieldCheck,
              label: 'At Rest — AES-256',
              body: 'Uploaded statements are encrypted immediately upon arrival using 256-bit Advanced Encryption Standard (AES-256).',
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
      </section>

      {/* 3 — Deletion */}
      <section id="deletion" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">3</span>
          Statement Deletion Protocol
        </h2>
        <p>We enforce automated purging to minimise risk from data retention:</p>
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-800">
            <Trash2 className="w-4 h-4 text-red-500" />
            Temporary Data Lifecycle
          </div>
          <div className="divide-y divide-slate-100 text-sm">
            {[
              ['Immediate Purge',        'Click "Delete File" in your dashboard to destroy the PDF and spreadsheet instantly.', 'text-emerald-600'],
              ['Auto 24-Hour Purge',     'All converted files older than 24 hours are automatically destroyed by system cron jobs.', 'text-amber-600'],
              ['No Backup Retention',    'Deleted bank statements are not archived in database backups — they are gone for good.', 'text-red-600'],
            ].map(([action, detail, color]) => (
              <div key={action} className="px-5 py-4 flex flex-col gap-1">
                <span className={`text-xs font-bold uppercase tracking-wide ${color}`}>{action}</span>
                <span className="text-slate-600 text-xs leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Infrastructure */}
      <section id="infrastructure" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">4</span>
          Hosting &amp; Infrastructure
        </h2>
        <p>FinanceFlow is hosted on leading, secure cloud platforms (primarily AWS and Vercel).</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: Server,
              label: 'Certified Datacenters',
              body: 'Our servers run in physical environments certified for ISO 27001, SOC 2, and PCI-DSS compliance.',
            },
            {
              icon: ShieldCheck,
              label: 'Active Firewalls (WAF)',
              body: 'Web Application Firewalls monitor and filter requests to guard against DDoS attacks, SQL injection, and web exploits.',
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
      </section>

      {/* 5 — Auth */}
      <section id="auth" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">5</span>
          Account &amp; Auth Security
        </h2>
        <div className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Clerk Authentication</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We use <strong className="text-slate-800">Clerk</strong> to handle authentication, session keys,
                and password guidelines — we never see or store your password in plain text. Multi-Factor
                Authentication (MFA) is supported and strongly encouraged for all accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Disclosure */}
      <section id="disclosure" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">6</span>
          Vulnerability Disclosure
        </h2>
        <p>
          If you believe you have discovered a security vulnerability in FinanceFlow, please do not exploit
          it publicly. Contact us immediately so we can coordinate a fix responsibly.
        </p>
        <div className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
              <Mail className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Report a Vulnerability</p>
              <a href="mailto:security@puretextclean.com" className="text-sm font-semibold text-slate-800 hover:text-emerald-600 transition-colors">
                security@puretextclean.com
              </a>
              <p className="mt-1 text-xs text-slate-400">We review reports within 48 hours and coordinate standard disclosure timelines.</p>
            </div>
          </div>
        </div>
      </section>
    </DocPageLayout>
  )
}
