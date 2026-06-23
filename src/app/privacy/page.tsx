import React from 'react'
import { Metadata } from 'next'
import DocPageLayout from '@/components/shared/DocPageLayout'
import { EyeOff, Database, Trash2, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | FinanceFlow',
  description: 'Learn how FinanceFlow collects, processes, and protects your financial data and bank statement PDFs.',
}

export default function PrivacyPage() {
  const toc = [
    { id: 'introduction',  label: '1. Introduction' },
    { id: 'collection',    label: '2. Information We Collect' },
    { id: 'processing',    label: '3. How We Process Your Files' },
    { id: 'retention',     label: '4. Automated Deletion & Purging' },
    { id: 'sharing',       label: '5. Third-Party Services' },
    { id: 'rights',        label: '6. Your Rights & Choices' },
  ]

  return (
    <DocPageLayout
      title="Your Privacy,"
      highlight="Protected."
      badge="Privacy First · No data selling · Ever"
      description="We handle your bank statements with the highest level of care. Read how we collect, process, and permanently delete your data."
      lastUpdated="May 20, 2026"
      fileLabel="privacy_policy.tsx"
      toc={toc}
    >
      {/* 1 — Introduction */}
      <section id="introduction" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">1</span>
          Introduction
        </h2>
        <p>
          Welcome to <strong className="text-slate-800">FinanceFlow</strong>. We operate an AI-powered bank statement
          converter platform. We are committed to protecting your personal and financial information.
          This Privacy Policy explains how we collect, process, secure, and automatically delete your
          bank statements and other information when you use our service.
        </p>
        <div className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 text-emerald-800 text-sm">
          <EyeOff className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <strong>Privacy First:</strong> FinanceFlow is built with privacy-first principles. We do not
            sell your transactions or financial data to third-party brokers, advertisers, or aggregators.
          </p>
        </div>
      </section>

      {/* 2 — Information We Collect */}
      <section id="collection" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">2</span>
          Information We Collect
        </h2>
        <p>We collect the minimum data necessary to deliver high-quality conversions:</p>
        <ul className="space-y-3 pl-5 list-disc">
          <li>
            <strong className="text-slate-800">Account Information:</strong> When you sign up via Clerk,
            we collect your name, email address, and profile photo (if provided).
          </li>
          <li>
            <strong className="text-slate-800">Uploaded Document Files:</strong> Bank statement PDFs or image
            scans you submit for extraction — containing account details, transaction descriptions, dates,
            amounts, and balances.
          </li>
          <li>
            <strong className="text-slate-800">Usage Metadata:</strong> Non-identifiable browser and analytics
            data to monitor service performance and fix bugs.
          </li>
        </ul>
      </section>

      {/* 3 — How We Process */}
      <section id="processing" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">3</span>
          How We Process Your Files
        </h2>
        <p>
          Our core service uses proprietary parsing logic and secure AI models to turn PDF statements into
          spreadsheets. Your files are processed programmatically — no human employees or contractors inspect
          your transactions unless you explicitly request support.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 p-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
                <EyeOff className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">No Human Viewers</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Statements are processed entirely by automated systems. No one reads your transactions.
                </p>
              </div>
            </div>
          </div>
          <div className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 p-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
                <Database className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">No Model Training</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your financial data is never used to train public AI models.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Automated Deletion */}
      <section id="retention" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">4</span>
          Automated Deletion &amp; Purging
        </h2>
        <p>We enforce strict data minimization — your statements are never stored indefinitely.</p>
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-800">
            <Trash2 className="w-4 h-4 text-red-500" />
            File Retention Schedule
          </div>
          <div className="divide-y divide-slate-100 text-sm">
            {[
              ['Initial Upload',            'Stored temporarily in encrypted cloud bucket',    'text-amber-600'],
              ['Successful Extraction',     'Available for download inside your dashboard',    'text-emerald-600'],
              ['24 Hours Post-Extraction',  'Permanently purged — automatic, unrecoverable',   'text-red-600'],
            ].map(([stage, action, color]) => (
              <div key={stage} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-3">
                <span className="text-slate-500 font-medium">{stage}</span>
                <span className={`font-semibold text-xs ${color}`}>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Third-Party Services */}
      <section id="sharing" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">5</span>
          Third-Party Services
        </h2>
        <p>We use trusted services under strict contractual data-protection obligations:</p>
        <ul className="space-y-2.5 pl-5 list-disc">
          <li><strong className="text-slate-800">Clerk</strong> — secure sign-in and user authentication.</li>
          <li><strong className="text-slate-800">Lemon Squeezy</strong> — secure subscription billing. We never store card numbers.</li>
          <li><strong className="text-slate-800">AWS / Vercel</strong> — web hosting and temporary encrypted file storage.</li>
        </ul>
      </section>

      {/* 6 — Your Rights */}
      <section id="rights" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">6</span>
          Your Rights &amp; Choices
        </h2>
        <p>Depending on your location (UK, EU, California), you have the right to:</p>
        <ul className="space-y-2 pl-5 list-disc">
          <li>Export or download your account information at any time.</li>
          <li>Request immediate deletion of all your account data and uploaded files.</li>
          <li>Object to or restrict processing of your documents.</li>
        </ul>
        <p className="text-sm">
          To exercise any of these rights, email us at{' '}
          <a href="mailto:support@puretextclean.com" className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-4 transition-colors">
            support@puretextclean.com
          </a>. We respond within 3 business days.
        </p>
      </section>
    </DocPageLayout>
  )
}
