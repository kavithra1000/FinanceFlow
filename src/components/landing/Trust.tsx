import { Shield, Lock, Trash2 } from 'lucide-react'

const Trust = () => {
  return (
    <section className="mt-32 px-5 py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            Security You Can Trust
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            FinanceFlow is built with privacy-first principles.
            Your bank statements are processed securely and never stored.
          </p>
        </div>

        {/* Trust Points */}
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: <Lock className="h-6 w-6 text-emerald-600" />,
              title: "No Bank Credentials",
              description: "We never ask for logins, passwords, or account access.",
            },
            {
              icon: <Trash2 className="h-6 w-6 text-emerald-600" />,
              title: "Automatic Deletion",
              description: "Files are deleted immediately after conversion.",
            },
            {
              icon: <Shield className="h-6 w-6 text-emerald-600" />,
              title: "Encrypted Processing",
              description: "End-to-end encryption for uploads and downloads.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trust
