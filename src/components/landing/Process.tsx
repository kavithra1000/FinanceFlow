import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Upload, Cpu, FileSpreadsheet } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Bank Statement',
    description:
      'Upload your bank statement PDF — scanned or digital. Multiple banks supported.',
  },
  {
    icon: Cpu,
    title: 'AI Extracts Data',
    description:
      'Our AI reads, understands, and structures transactions accurately.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Download Excel',
    description:
      'Get a clean, ready-to-use Excel sheet in seconds.',
  },
]

const Process = () => {
  return (
    <section className="mt-20 sm:mt-30 px-5">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          How it works
        </h2>
        <p className="mt-3 text-slate-600 text-md sm:text-lg">
          Convert bank statements to Excel in three simple steps
        </p>
      </div>

      {/* Steps */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <Card
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform border border-slate-200"
            >
              <CardContent className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-md text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default Process
