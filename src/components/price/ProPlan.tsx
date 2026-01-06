'use client'

import { FiCheckCircle } from "react-icons/fi"
import { Button } from "../ui/button"
import { createCheckout } from "@/app/actions/checkout"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"

export const ProPlan = ({ billing }: { billing: "monthly" | "yearly" }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const price = billing === "monthly" ? "$9" : "$79"

  const handleUpgrade = async () => {
    if (!user) return alert("Please log in first")
    const email = user.emailAddresses?.[0]?.emailAddress
    if (!email) return alert("No email found for this user")

    setLoading(true)
    try {
      const variantId =
        billing === "monthly"
          ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_MONTHLY_VARIANT_ID
          : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_YEARLY_VARIANT_ID

      if (!variantId) throw new Error("Variant ID not set")

      await createCheckout(variantId, user.id, email)
    } catch (err) {
      console.error("Checkout error:", err)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative rounded-2xl p-8 text-left bg-linear-to-br from-emerald-600 to-green-600 text-white shadow-2xl">
      <span className="absolute -top-3 right-6 bg-white text-emerald-600 border-2 border-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
        Most popular
      </span>

      <h3 className="text-xl font-semibold">Pro</h3>
      <p className="mt-2 text-emerald-100">For professionals & frequent use.</p>

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
            <FiCheckCircle className="text-white w-5 h-5" />
            {item}
          </li>
        ))}
      </ul>

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
