import React from 'react'
import { Metadata } from 'next'
import DocPageLayout from '@/components/shared/DocPageLayout'
import { FileText, CreditCard, ShieldAlert, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | FinanceFlow',
  description: 'Understand the terms, guidelines, and rules for using the FinanceFlow bank statement converter platform.',
}

export default function TermsPage() {
  const toc = [
    { id: 'acceptance',   label: '1. Acceptance of Terms' },
    { id: 'description',  label: '2. Description of Service' },
    { id: 'accounts',     label: '3. User Accounts & Eligibility' },
    { id: 'use-policy',   label: '4. Acceptable Use & Uploads' },
    { id: 'billing',      label: '5. Subscriptions & Payments' },
    { id: 'disclaimer',   label: '6. Disclaimer of Warranties' },
    { id: 'liability',    label: '7. Limitation of Liability' },
  ]

  return (
    <DocPageLayout
      title="Terms of"
      highlight="Service."
      badge="Legal · Clear & fair terms"
      description="Please read these terms carefully before using FinanceFlow. They outline your rights and our mutual obligations."
      lastUpdated="May 20, 2026"
      fileLabel="terms_of_service.tsx"
      toc={toc}
    >
      {/* 1 — Acceptance */}
      <section id="acceptance" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">1</span>
          Acceptance of Terms
        </h2>
        <p>
          By accessing, signing up for, or using FinanceFlow&apos;s website, tools, and services, you agree
          to be bound by these Terms of Service and our Privacy Policy. If you do not agree to all of these
          terms, you do not have permission to access or use our services.
        </p>
      </section>

      {/* 2 — Description */}
      <section id="description" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">2</span>
          Description of Service
        </h2>
        <p>
          FinanceFlow operates an AI-powered data processing platform designed to parse digital and scanned
          bank statement documents (primarily PDFs) and convert them into structured spreadsheets (Excel, CSV).
          We reserve the right to modify, suspend, or discontinue any aspect of our services at any time
          without prior notice.
        </p>
      </section>

      {/* 3 — Accounts */}
      <section id="accounts" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">3</span>
          User Accounts &amp; Eligibility
        </h2>
        <p>To access the statement converter, you must create a user account. You agree to:</p>
        <ul className="space-y-2.5 pl-5 list-disc">
          <li>Provide accurate, current, and complete registration information.</li>
          <li>Keep your login credentials secure. Authentication is handled safely by our provider Clerk.</li>
          <li>Promptly notify us of any unauthorized use or security breach of your account.</li>
        </ul>
      </section>

      {/* 4 — Acceptable Use */}
      <section id="use-policy" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">4</span>
          Acceptable Use &amp; Uploads
        </h2>
        <p>
          You retain full legal ownership of the documents you upload. However, you are solely responsible
          for all content uploaded to our servers.
        </p>
        <div className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Upload Restrictions</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                You must not upload bank statements or financial documents that you do not own, or for which
                you lack explicit legal authorization. Uploading fraudulent files or files containing malware
                is grounds for immediate account termination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Billing */}
      <section id="billing" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">5</span>
          Subscriptions &amp; Payments
        </h2>
        <p>FinanceFlow offers both free and paid premium subscription tiers.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: CreditCard,
              label: 'Billing & Processing',
              body: 'Paid plans are billed on a recurring monthly or annual basis via Stripe. Payments are non-refundable except as required by law.',
            },
            {
              icon: FileText,
              label: 'Usage Quotas',
              body: 'Accounts are subject to monthly parsing quotas based on the chosen tier. Unused quotas do not roll over to subsequent billing cycles.',
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

      {/* 6 — Disclaimer */}
      <section id="disclaimer" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">6</span>
          Disclaimer of Warranties
        </h2>
        <p>
          THE SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS.
          FINANCEFLOW DISCLAIMS ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY
          AND FITNESS FOR A PARTICULAR PURPOSE.
        </p>
        <div className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy Disclaimer</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                While our parser delivers industry-leading accuracy (99%+), bank statement formatting varies
                significantly. You are solely responsible for verifying all converted data before using it for
                tax filing, accounting, audits, or financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Liability */}
      <section id="liability" className="scroll-mt-28 space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0">7</span>
          Limitation of Liability
        </h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FINANCEFLOW SHALL NOT BE LIABLE FOR ANY
          INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR
          GOODWILL RESULTING FROM YOUR USE OF THE SERVICE OR ANY INACCURATE CONVERSIONS.
        </p>
        <p className="text-sm">
          Questions about these Terms? Contact us at{' '}
          <a href="mailto:support@financeflow.com" className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-4 transition-colors">
            support@financeflow.com
          </a>.
        </p>
      </section>
    </DocPageLayout>
  )
}
