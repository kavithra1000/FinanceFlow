import { CheckCircle } from 'lucide-react'

const Benefits = () => {
  return (
    <section className="mt-35 px-5 ">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left: Benefits */}
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
              Benefits
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-900">
              Why choose FinanceFlow?
            </h2>

            <p className="mt-4 max-w-xl text-slate-600">
              FinanceFlow removes the pain from processing bank statements —
              accurate results with zero manual work.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: 'Save hours of work',
                  description: 'No manual copy-paste or spreadsheet cleanup.',
                },
                {
                  title: 'Accurate extraction',
                  description: 'AI-powered parsing for clean, structured data.',
                },
                {
                  title: 'Ready for accounting',
                  description: 'Exports that work instantly with Excel.',
                },
                {
                  title: 'Simple by design',
                  description: 'Upload → Convert → Download. Nothing else.',
                },
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-slate-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Comparison Card */}
          <div className="mx-auto w-full max-w-md rounded-2xl bg-linear-to-br from-emerald-600 to-green-600 p-8 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <span className="text-sm font-medium text-white/80">
                  Manual processing
                </span>
                <span className="text-sm text-emerald-200">2–4 hours</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <span className="text-sm font-medium text-white">
                  With FinanceFlow
                </span>
                <span className="text-xl font-semibold text-white">
                  ~30 seconds
                </span>
              </div>

              <div className="rounded-xl bg-white/20 p-6 text-center">
                <p className="text-3xl font-semibold text-white">90%+</p>
                <p className="mt-1 text-sm text-emerald-100">
                  Time saved per statement
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Benefits
