import { ArrowRight } from 'lucide-react'

const FinalCTA = () => {
  return (
    <section className="mt-32 px-5">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 to-green-600 p-12 sm:p-16 text-center">

          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          <div className="relative z-10 py-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
              Turn bank statement PDFs into Excel
              <span className="block text-white">
                in seconds
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-white text-opacity-90">
              Upload your statement and get a clean, structured spreadsheet —
              no manual work, no setup.
            </p>

            <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-medium text-emerald-700 transition hover:scale-105 hover:shadow-xl">
              Upload your statement
              <ArrowRight className="h-5 w-5" />
            </button>

            <p className="mt-4 text-sm text-white/80">
              Free to try · No signup required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
