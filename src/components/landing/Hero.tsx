'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, FileText, Sparkles, CheckCircle2, ShieldCheck, Zap, ChevronRight, Download } from 'lucide-react'
import Link from 'next/link'
import { FiCheckCircle } from 'react-icons/fi'
import { Button } from '../ui/button'
import { LuSparkles } from "react-icons/lu";


// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(end: number, duration = 1800) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        let start = 0
        const step = Math.ceil(end / (duration / 16))
        const timer = setInterval(() => {
            start += step
            if (start >= end) { setCount(end); clearInterval(timer) }
            else setCount(start)
        }, 16)
        return () => clearInterval(timer)
    }, [end, duration])
    return count
}

// ─── Mini PDF-row component ───────────────────────────────────────────────────
const PdfRow = ({ label, amount, date, delay }: { label: string; amount: string; date: string; delay: string }) => (
    <div
        className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/60 backdrop-blur-sm border border-slate-100 text-xs"
        style={{ animationDelay: delay }}
    >
        <span className="text-slate-500 w-16 shrink-0">{date}</span>
        <span className="text-slate-700 font-medium flex-1 mx-2 truncate">{label}</span>
        <span className="font-semibold text-slate-800 tabular-nums">{amount}</span>
    </div>
)

// ─── Excel cell component ─────────────────────────────────────────────────────
const Cell = ({ v, cls = '' }: { v: string; cls?: string }) => (
    <td className={`border border-emerald-200 px-2 py-1 text-xs whitespace-nowrap ${cls}`}>{v}</td>
)

// ─── Floating badge ───────────────────────────────────────────────────────────
const FloatingBadge = ({
    icon, text, sub, className
}: { icon: React.ReactNode; text: string; sub: string; className: string }) => (
    <div className={`absolute flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl px-3 py-2 ${className}`}>
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-50 shrink-0">
            {icon}
        </div>
        <div>
            <p className="text-xs font-semibold text-slate-800 leading-tight">{text}</p>
            <p className="text-[10px] text-slate-500 leading-tight">{sub}</p>
        </div>
    </div>
)

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
    const [active, setActive] = useState(false)
    const [step, setStep] = useState(0) // 0=idle, 1=scanning, 2=done
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const docs = useCounter(12480)
    const acc = useCounter(99)

    // Auto-run demo once on mount
    useEffect(() => {
        timerRef.current = setTimeout(() => runDemo(), 1200)
        return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    }, [])

    function runDemo() {
        setStep(1)
        timerRef.current = setTimeout(() => setStep(2), 2200)
    }

    const rows = [
        { label: 'NETFLIX.COM MONTHLY', amount: '-$15.49', date: 'Jan 03' },
        { label: 'DIRECT DEPOSIT - ACME INC', amount: '+$3,200.00', date: 'Jan 04' },
        { label: 'WHOLE FOODS MARKET', amount: '-$67.32', date: 'Jan 05' },
        { label: 'STRIPE PAYOUT', amount: '+$840.00', date: 'Jan 06' },
        { label: 'AMZN MKTP US', amount: '-$29.99', date: 'Jan 07' },
    ]

    return (
        <section className="relative min-h-screen flex flex-col items-center overflow-hidden">

            {/* ── Grid texture ───────────────────────────────────────────────────── */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.35]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #d1fae5 1px, transparent 1px),
            linear-gradient(to bottom, #d1fae5 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* ── Hero body ──────────────────────────────────────────────────────── */}
            <section className="relative text-center px-5 overflow-hidden py-10 mt-12">
                {/* Background Glow Decorations */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-200/10 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-100/20 blur-[100px] rounded-full -z-10" />

                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 mb-10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    AI-Powered · Works with scanned PDFs
                </div>

                {/* Heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-slate-900 leading-[1.05] tracking-tight max-w-5xl" style={{ fontFamily: "'Cal Sans', 'DM Sans', sans-serif" }}>
                    Bank PDFs →{' '}
                    <span className="relative inline-block">
                        <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                            Excel
                        </span>
                        <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                            <path d="M0,6 C50,0 150,0 200,6" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                    <br />in seconds.
                </h1>

                {/* Subheading */}
                <p className="mt-4 mx-auto max-w-3xl text-md sm:text-lg text-slate-600">
                    AI-powered tool that works with both scanned and digital bank statements.
                    Instantly turn unstructured PDFs into clean, accurate spreadsheets.
                </p>

                {/* CTA */}
                <Link href={"/doc"}>
                    <Button size="lg" className="mt-15 cursor-pointer font-semibold px-6 py-6 mx-auto text-md bg-gradient-to-br from-emerald-600 to-green-600 shadow-xl ">
                        <Zap className="w-4 h-4" />
                        Get Started - <span className='text-sm font-normal'>it&apos;s free</span>
                        <ArrowRight className='size-5' />
                    </Button>
                </Link>


                {/* Trust indicators */}
                <div className="mt-8 mb-20 mx-auto flex flex-row font-medium flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-600">
                    <span className='flex items-center justify-start gap-2 text-sm sm:text-md'>
                        <FiCheckCircle className="w-5 h-5 text-green-600 font-bold" />
                        No bank card required
                    </span>
                    <span className='flex items-center justify-start gap-2 text-sm sm:text-md'>
                        <FiCheckCircle className="w-5 h-5 text-green-600" />
                        Secure file processing
                    </span>
                </div>
            </section>

            {/* ── UI DEMO CARD ───────────────────────────────────────────────────── */}
            <div className="relative w-full max-w-6xl mx-auto px-4 pb-20">

                {/* Floating badges */}
                <FloatingBadge
                    icon={<Zap className="w-4 h-4 text-emerald-600" />}
                    text="4.2 seconds"
                    sub="Average parse time"
                    className="-top-4 -left-2 sm:left-8 z-20 animate-float-slow"
                />
                <FloatingBadge
                    icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    text="99.3% accuracy"
                    sub="Across 50+ bank formats"
                    className="-top-4 -right-2 sm:right-8 z-20 animate-float-slow-reverse"
                />

                {/* Main demo card */}
                <div className="relative rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-900/10 overflow-hidden">

                    {/* Card header */}
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 bg-white/90">
                        <span className="w-3 h-3 rounded-full bg-red-400" />
                        <span className="w-3 h-3 rounded-full bg-amber-400" />
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                        <span className="mx-auto text-xs text-slate-400 font-mono">bankstatement_jan2024.pdf → output.xlsx</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">

                        {/* LEFT: PDF preview */}
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md bg-red-100 flex items-center justify-center">
                                        <FileText className="w-3.5 h-3.5 text-red-500" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-600">Source PDF</span>
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono">Jan 2024</span>
                            </div>

                            {/* Faux PDF header */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden mb-3">
                                <div className="px-4 py-3 border-b border-slate-200 bg-slate-100/60">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Chase Bank</p>
                                            <p className="text-[9px] text-slate-500">Account ending in ••••4821</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] text-slate-500">Statement Period</p>
                                            <p className="text-[10px] font-semibold text-slate-700">Jan 1–31, 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 space-y-1.5">
                                    {/* Scan-line animation overlay when processing */}
                                    <div className="relative">
                                        {step === 1 && (
                                            <div className="absolute inset-0 z-10 overflow-hidden rounded pointer-events-none">
                                                <div className="h-0.5 w-full bg-emerald-400/70 shadow-[0_0_12px_3px_rgba(52,211,153,0.5)] animate-scan" />
                                            </div>
                                        )}
                                        {rows.map((r, i) => (
                                            <PdfRow key={i} {...r} delay={`${i * 80}ms`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={runDemo}
                                disabled={step === 1}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white text-xs font-bold shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/40 transition-all active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                {step === 0 ? 'Extract to Excel' : step === 1 ? 'Extracting…' : 'Extracted!'}
                            </button>
                        </div>

                        {/* RIGHT: Excel output */}
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center">
                                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-600">Excel Output</span>
                                </div>
                                {step === 2 && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                        Ready
                                    </span>
                                )}
                            </div>

                            {/* Excel table */}
                            <div className={`rounded-xl border border-emerald-200 bg-emerald-50/40 overflow-hidden transition-all duration-700 ${step === 0 ? 'opacity-30 blur-sm' : step === 1 ? 'opacity-50 blur-[2px]' : 'opacity-100 blur-0'}`}>
                                {/* Column header row */}
                                <div className="grid grid-cols-4 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-widest px-1 py-1.5">
                                    {['Date', 'Description', 'Amount', 'Balance'].map(h => (
                                        <span key={h} className="px-1">{h}</span>
                                    ))}
                                </div>
                                <table className="w-full border-collapse text-[10px]">
                                    <tbody>
                                        {[
                                            ['Jan 03', 'NETFLIX.COM', '-$15.49', '$4,218.21'],
                                            ['Jan 04', 'ACME INC PAYROLL', '+$3,200.00', '$7,418.21'],
                                            ['Jan 05', 'WHOLE FOODS MKT', '-$67.32', '$7,350.89'],
                                            ['Jan 06', 'STRIPE PAYOUT', '+$840.00', '$8,190.89'],
                                            ['Jan 07', 'AMZN MKTP US', '-$29.99', '$8,160.90'],
                                        ].map(([date, desc, amt, bal], i) => (
                                            <tr key={i} className={i % 2 === 0 ? 'bg-white/80' : 'bg-emerald-50/60'}>
                                                <Cell v={date} cls="text-slate-500" />
                                                <Cell v={desc} cls="text-slate-700" />
                                                <Cell v={amt} cls={amt.startsWith('+') ? 'text-emerald-700 font-semibold' : 'text-red-600 font-semibold'} />
                                                <Cell v={bal} cls="text-slate-600" />
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="px-3 py-2 bg-emerald-100/60 border-t border-emerald-200 flex items-center justify-between">
                                    <span className="text-[10px] text-emerald-700 font-semibold">5 of 147 rows shown</span>
                                    <span className="text-[10px] text-emerald-600">output.xlsx · 22 KB</span>
                                </div>
                            </div>

                            {step === 2 && (
                                <button className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-300 text-emerald-700 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 transition-all">
                                    <Download className="w-3.5 h-3.5" />
                                    Download output.xlsx
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Stats row ─────────────────────────────────────────────────────── */}
                <div className="mt-8 grid grid-cols-3 max-w-4xl mx-auto gap-4">
                    {[
                        { value: `${docs.toLocaleString()}+`, label: 'Statements processed' },
                        { value: `${acc}%`, label: 'Extraction accuracy' },
                        { value: '50+', label: 'Bank formats supported' },
                    ].map(({ value, label }) => (
                        <div key={label} className="text-center rounded-2xl border border-slate-200 bg-white/70 backdrop-blur py-4 shadow-sm">
                            <p className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">{value}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

                {/* ── Supported banks ────────────────────────────────────────────────── */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    <span className="text-xs text-slate-400 font-medium mr-1">Works with:</span>
                    {['Chase', 'Bank of America', 'Wells Fargo', 'Citi', 'HSBC', 'Barclays', 'TD Bank', '+ more'].map((b) => (
                        <span key={b} className="text-xs px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 font-medium shadow-sm">
                            {b}
                        </span>
                    ))}
                </div>
            </div>

            {/* Keyframes via style tag */}
            <style>
            {`
                @keyframes float-slow {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-6px); }
                }
                @keyframes float-slow-reverse {
                0%, 100% { transform: translateY(-4px); }
                50% { transform: translateY(4px); }
                }
                @keyframes scan {
                0% { transform: translateY(0); }
                100% { transform: translateY(200px); }
                }
                .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
                .animate-float-slow-reverse { animation: float-slow-reverse 3.5s ease-in-out infinite; }
                .animate-scan { animation: scan 1.8s ease-in-out infinite; }
            `}
            </style>
        </section>
    )
}