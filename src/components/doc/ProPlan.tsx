'use client'

import { FiCheckCircle, FiInfo } from "react-icons/fi"
import { Button } from "../ui/button"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"

export const ProPlan = () => {
  const [loading, setLoading] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const { user } = useUser()

  const price = billing === "monthly" ? "$9" : "$79"

  const handleUpgrade = async () => {
    if (!user) return alert("Please log in first")
    setLoading(true)

    // TODO: integrate checkout
  }

  return (
    <div className="relative rounded-2xl p-8 bg-gradient-to-br from-emerald-600 to-green-600 text-white shadow-2xl w-full max-w-lg">

      {/* Billing Toggle */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            billing === "monthly"
              ? "bg-white text-emerald-600"
              : "bg-emerald-500 text-white border border-white"
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => setBilling("yearly")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            billing === "yearly"
              ? "bg-white text-emerald-600"
              : "bg-emerald-500 text-white border border-white"
          }`}
        >
          Yearly (Save 20%)
        </button>
      </div>

      {/* Badge */}
      <span className="absolute -top-3 right-10 bg-white text-emerald-600 border-2 border-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
        Most popular
      </span>

      {/* Title */}
      <h3 className="text-xl font-semibold flex items-center gap-2">
        Pro
        <FiInfo
          className="w-4 h-4 cursor-pointer hover:text-emerald-200"
          onMouseUp={() => setShowInfo(!showInfo)}
        />
      </h3>

      {/* Tooltip */}
      {showInfo && (
        <div className="absolute top-28 left-8 w-64 p-4 bg-slate-800 text-slate-100 rounded-lg shadow-lg text-sm z-50">
          <p>
            Payments are processed securely via <strong>Lemon Squeezy</strong>.
            We never store your payment info.
          </p>
          <p className="mt-2">
            Upgrade or cancel anytime. Free plan available forever.
          </p>
          <button
            className="mt-2 text-emerald-400 font-semibold underline"
            onClick={() => setShowInfo(false)}
          >
            Close
          </button>
        </div>
      )}

      <p className="mt-2 text-emerald-100">
        For professionals & frequent use.
      </p>

      <div className="mt-6 text-4xl font-semibold">
        {price}
        <span className="text-base font-normal text-emerald-100">
          /{billing === "monthly" ? "month" : "year"}
        </span>
      </div>

      <ul className="mt-8 space-y-3">
        {[
          "Unlimited conversions",
          "Large files supported",
          "High-accuracy extraction",
          "Priority processing",
        ].map((item) => (
          <li key={item} className="flex items-center gap-3">
            <FiCheckCircle className="w-5 h-5" />
            {item}
          </li>
        ))}
      </ul>

      <Button
        onClick={handleUpgrade}
        disabled={loading}
        className="cursor-pointer mt-8 w-full font-semibold shadow-md bg-white text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Upgrade to Pro"}
      </Button>
    </div>
  )
}