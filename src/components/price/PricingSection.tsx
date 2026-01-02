'use client'

import React, { useState } from "react"
import { FreePlan } from "./FreePlan"
import { ProPlan } from "./ProPlan"

const PricingSection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")

  return (
    <section className="px-5 py-32 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
        Simple, transparent pricing
      </h2>
      <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
        Start free. Upgrade only if you need more power.
      </p>

      {/* Billing Toggle */}
      <div className="mt-10 flex justify-center gap-2 bg-slate-100 shadow-md p-1 rounded-full w-fit mx-auto">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer ${
            billing === "monthly"
              ? "bg-white shadow text-slate-900"
              : "text-slate-500"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("yearly")}
          className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer ${
            billing === "yearly"
              ? "bg-white shadow text-slate-900"
              : "text-slate-500"
          }`}
        >
          Yearly <span className="text-emerald-600">(Save 20%)</span>
        </button>
      </div>

      {/* Cards */}
      <div className="mt-14 grid md:grid-cols-2 gap-8">
        <FreePlan />
        <ProPlan billing={billing} />
      </div>
    </section>
  )
}

export default PricingSection
