import {
  FileText,
  Sparkles,
  CheckCircle,
  Shield,
  Zap,
  Download,
} from 'lucide-react'

const Features = () => {
  return (
    <section id="features" className="mt-36 px-5 py-20 bg-slate-50">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Everything you need for clean financial data
        </h2>
        <p className="mt-3 text-md sm:text-lg text-slate-600">
          Built for accuracy, speed, and peace of mind
        </p>
      </div>

      {/* Feature grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          {
            title: 'OCR for Scanned PDFs',
            description:
              'Accurately reads scanned and image-based bank statements.',
            icon: FileText,
          },
          {
            title: 'Smart Column Detection',
            description:
              'Automatically detects dates, descriptions, debits, and credits.',
            icon: Sparkles,
          },
          {
            title: 'Multi-Bank Support',
            description:
              'Works with statements from different banks and layouts.',
            icon: CheckCircle,
          },
          {
            title: 'Secure Processing',
            description:
              'Files are encrypted and removed automatically after processing.',
            icon: Shield,
          },
          {
            title: 'Fast Conversion',
            description:
              'Convert statements to Excel in seconds, not hours.',
            icon: Zap,
          },
          {
            title: 'Excel & CSV Export',
            description:
              'Download structured data in Excel or CSV format.',
            icon: Download,
          },
        ].map((feature, idx) => {
          const Icon = feature.icon
          return (
            <div
              key={idx}
              className="
                rounded-xl border border-slate-200
                bg-white/50 backdrop-blur-sm
                p-6 transition
                hover:shadow-lg hover:scale-105
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mx-auto">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900 text-center">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Features
