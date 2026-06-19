'use client'

import React, { useState } from "react"
import { FreePlan } from "./FreePlan"
import { ProPlan } from "./ProPlan"

const PricingSection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")

  return (
    <section className="relative min-h-screen flex flex-col items-center px-5 py-22 overflow-hidden">

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
      <div className="text-center mb-14 max-w-2xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          No hidden fees, ever
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
          Simple,{' '}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
              transparent
            </span>
            <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
              <path d="M0,6 C50,0 150,0 200,6" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          {' '}pricing
        </h1>
        <p className="mt-4 text-md sm:text-lg text-slate-600">
          Start free. Upgrade only if you need more power.
        </p>
      </div>

      {/* ── Billing Toggle ──────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 bg-white/80 backdrop-blur-sm shadow-md border border-slate-200 p-1 rounded-full w-fit mx-auto mb-12">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
            billing === "monthly"
              ? "bg-gradient-to-br from-emerald-600 to-green-600 text-white shadow-md shadow-emerald-200"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("yearly")}
          className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
            billing === "yearly"
              ? "bg-gradient-to-br from-emerald-600 to-green-600 text-white shadow-md shadow-emerald-200"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Yearly <span className={billing === "yearly" ? "text-emerald-200" : "text-emerald-600"}>(Save 20%)</span>
        </button>
      </div>

      {/* ── Pricing Cards ───────────────────────────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <FreePlan />
        <ProPlan billing={billing} />
      </div>

    </section>
  )
}

export default PricingSection
