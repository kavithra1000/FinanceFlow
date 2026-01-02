import { FiCheckCircle } from "react-icons/fi"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export const FreePlan = () => {
  return (
    <div className="border-2 border-emerald-600 rounded-2xl p-8 text-left bg-white">
      <h3 className="text-xl font-semibold text-slate-900">Free</h3>
      <p className="mt-2 text-slate-600">
        Try FinanceFlow with basic limits.
      </p>

      <div className="mt-6 text-4xl font-semibold text-slate-900">
        $0
      </div>

      <ul className="mt-8 space-y-3 text-slate-700">
        {[
          "1 conversion per day",
          "Basic table extraction",
          "Secure processing",
          "No credit card required",
        ].map((item) => (
          <li key={item} className="flex items-center gap-3">
            <FiCheckCircle className="text-emerald-600 w-5 h-5" />
            {item}
          </li>
        ))}
      </ul>

      <Button
        variant="outline"
        className="mt-8 w-full cursor-pointer font-semibold shadow-md"
      >
        Get started
      </Button>
    </div>
  )
}
