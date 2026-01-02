import { FiCheckCircle } from "react-icons/fi"
import { Button } from "../ui/button"

export const ProPlan = ({ billing }: { billing: "monthly" | "yearly" }) => {
  const price = billing === "monthly" ? "$9" : "$79"

  return (
    <div className="relative rounded-2xl p-8 text-left bg-linear-to-br from-emerald-600 to-green-600 text-white shadow-2xl">
      {/* Badge */}
      <span className="absolute -top-3 right-6 bg-white text-emerald-600 border-2 border-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
        Most popular
      </span>

      <h3 className="text-xl font-semibold">Pro</h3>
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
            <FiCheckCircle className="text-white w-5 h-5" />
            {item}
          </li>
        ))}
      </ul>

      <Button
        className="mt-8 w-full font-semibold shadow-md bg-white text-emerald-700 hover:bg-emerald-50 cursor-pointer"
      >
        Upgrade to Pro
      </Button>
    </div>
  )
}
