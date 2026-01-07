'use client'

import { FiCheckCircle, FiInfo } from "react-icons/fi"
import { Button } from "../ui/button"
import { createCheckout } from "@/app/actions/checkout"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"

export const ProPlan = ({ billing }: { billing: "monthly" | "yearly" }) => {
  const [loading, setLoading] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const { user } = useUser()
  const price = billing === "monthly" ? "$9" : "$79"

  const handleUpgrade = async () => {
    if (!user) return alert("Please log in first")
    setLoading(true)

    const variantId =
      billing === "monthly"
        ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_MONTHLY_VARIANT_ID
        : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_YEARLY_VARIANT_ID

    if (variantId) {
      await createCheckout(variantId, user.id, user.emailAddresses[0].emailAddress)
    }

    setLoading(false)
  }

  return (
    <div className="relative rounded-2xl p-8 text-left bg-linear-to-br from-emerald-600 to-green-600 text-white shadow-2xl">
      {/* Most Popular Badge */}
      <span className="absolute -top-3 right-6 bg-white text-emerald-600 border-2 border-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
        Most popular
      </span>

      {/* Plan Title */}
      <h3 className="text-xl font-semibold flex items-center gap-2">
        Pro
        <FiInfo
          className="w-4 h-4 cursor-pointer hover:text-emerald-300"
          onClick={() => setShowInfo(!showInfo)}
        />
      </h3>

      {/* Tooltip / Modal */}
      {showInfo && (
        <div className="absolute top-10 left-24 w-64 p-4 bg-slate-700 text-slate-100 rounded-lg shadow-lg text-sm z-50">
          <p>
            Payments are processed securely via <strong>Lemon Squeezy</strong>. We never store your payment info.
          </p>
          <p className="mt-2">
            Upgrade or cancel anytime. Free plan available forever. Pro plan is for professionals & frequent use.
          </p>
          <p className="mt-2">
            Refunds follow Lemon Squeezy&apos;s policy. Contact us for any issues.
          </p>
          <button
            className="mt-2 text-emerald-600 font-semibold underline"
            onClick={() => setShowInfo(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Description */}
      <p className="mt-2 text-emerald-100">For professionals & frequent use.</p>

      {/* Price */}
      <div className="mt-6 text-4xl font-semibold">
        {price}
        <span className="text-base font-normal text-emerald-100">
          /{billing === "monthly" ? "month" : "year"}
        </span>
      </div>

      {/* Features */}
      <ul className="mt-8 space-y-3">
        {[
          "Unlimited conversions",
          "Large files supported",
          "High-accuracy extraction",
          "Priority processing",
        ].map((item) => (
          <li key={item} className="flex items-center gap-3">
            <FiCheckCircle className="text-white w-5 h-5" />
            {item}
          </li>
        ))}
      </ul>

      {/* Upgrade Button */}
      <Button
        onClick={handleUpgrade}
        disabled={loading}
        className="mt-8 w-full font-semibold shadow-md bg-white text-emerald-700 hover:bg-emerald-50 cursor-pointer disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Upgrade to Pro"}
      </Button>
    </div>
  )
}
