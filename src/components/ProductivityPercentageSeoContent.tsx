/**
 * [INPUT]: Next/Link, productivityPercentageFaqs from @/lib/schemas/faqs/productivityPercentage
 * [OUTPUT]: ProductivityPercentageSeoContent component for /calculator/productivity-percentage
 * [POS]: 生产力百分比计算器深度语义攻略内容：公式拆解、午休扣除指南、行业基准表、Excel/Sheets 公式、FAQ 与高权重内链闭环
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import React from "react";
import Link from "next/link";
import { productivityPercentageFaqs } from "@/lib/schemas/faqs/productivityPercentage";

export default function ProductivityPercentageSeoContent() {
    return (
        <section className="mt-14 space-y-12 text-[var(--text-secondary)] font-body leading-relaxed">
            {/* Section 1: Core Formula & Visual Diagram */}
            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                    How the Productivity Percentage Calculator Works
                </h2>
                <p>
                    A <strong className="text-white">productivity percentage calculator</strong> converts raw shift hours,
                    billable treatment minutes, or completed output units into a single standardized utilization score.
                    Whether you are a physical therapist verifying daily clinic targets, an operations manager auditing
                    warehouse throughput, or a team lead tracking billable hours, the core ratio compares{" "}
                    <strong className="text-white">productive output</strong> against{" "}
                    <strong className="text-white">available paid input</strong>.
                </p>

                <div className="my-6 rounded-xl overflow-hidden border border-white/10 bg-slate-950/70">
                    <img
                        src="/images/productivity-percentage-formula.svg"
                        alt="Productivity percentage calculator formula showing productive minutes divided by net paid shift minutes after unpaid lunch break deduction"
                        width={800}
                        height={400}
                        className="w-full h-auto block"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-2">
                        <h3 className="font-display text-base font-bold text-[var(--neon-cyan)]">
                            1. Time-Based Productivity Percentage
                        </h3>
                        <p className="text-sm font-mono text-white bg-black/40 p-2.5 rounded-lg">
                            Productivity % = (Productive Mins ÷ Net Paid Shift Mins) × 100
                        </p>
                        <p className="text-xs">
                            Best for healthcare clinicians, consultants, agencies, and hourly service teams where
                            utilization of paid shift time determines profitability.
                        </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-2">
                        <h3 className="font-display text-base font-bold text-emerald-400">
                            2. Output-to-Quota Productivity Percentage
                        </h3>
                        <p className="text-sm font-mono text-white bg-black/40 p-2.5 rounded-lg">
                            Productivity % = (Actual Output ÷ Target Quota) × 100
                        </p>
                        <p className="text-xs">
                            Best for logistics, manufacturing, sales, and data-entry teams measuring units shipped,
                            records processed, or revenue closed against a shift benchmark.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 2: Lunch Break Deduction */}
            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-4">
                <h2 className="font-display text-2xl font-bold text-white">
                    Using a Productivity Calculator with Lunch Break Deduction
                </h2>
                <p>
                    The most common mistake when calculating daily work percentage is dividing billable minutes by{" "}
                    <em>total clock-in-to-clock-out time</em> instead of <em>net paid time</em>. Under standard labor
                    accounting, an unpaid 30-minute or 60-minute meal period is excluded from the denominator. Leaving
                    an unpaid 30-minute lunch inside an 8.5-hour shift artificially drops an{" "}
                    <strong className="text-white">85.0%</strong> shift down to{" "}
                    <strong className="text-white">80.0%</strong>.
                </p>
                <p>
                    In the <strong className="text-white">Shift &amp; Lunch %</strong> tab above, select your gross
                    shift length (for example, 8.5 hours from 8:00 AM to 4:30 PM) and tap the quick{" "}
                    <code className="text-[var(--neon-cyan)]">30m</code>,{" "}
                    <code className="text-[var(--neon-cyan)]">45m</code>, or{" "}
                    <code className="text-[var(--neon-cyan)]">60m</code> lunch button. The calculator automatically
                    subtracts your unpaid meal break before computing your true productivity percentage and remaining
                    non-billable documentation buffer.
                </p>
            </div>

            {/* Section 3: Industry Benchmarks Table */}
            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
                <h2 className="font-display text-2xl font-bold text-white">
                    Productivity Percentage Benchmarks by Industry
                </h2>
                <p>
                    A 100% score is rarely sustainable in knowledge work or clinical care because documentation,
                    equipment setup, and team handoffs require dedicated non-billable time. Compare your result
                    against these standard industry ranges:
                </p>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900/90 text-xs uppercase tracking-wider text-white">
                            <tr>
                                <th className="px-4 py-3">Industry / Role</th>
                                <th className="px-4 py-3">Healthy Target %</th>
                                <th className="px-4 py-3">Primary Metric</th>
                                <th className="px-4 py-3">Specialized Suite</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-xs md:text-sm">
                            <tr className="hover:bg-white/5">
                                <td className="px-4 py-3 font-medium text-white">Outpatient Physical Therapy</td>
                                <td className="px-4 py-3 font-mono text-emerald-400">80% – 85%</td>
                                <td className="px-4 py-3">Billable treatment mins ÷ paid shift</td>
                                <td className="px-4 py-3">
                                    <Link href="/calculator/physical-therapy" className="text-[var(--neon-cyan)] hover:underline">
                                        PT Productivity →
                                    </Link>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="px-4 py-3 font-medium text-white">SNF Rehab (PT/OT/SLP)</td>
                                <td className="px-4 py-3 font-mono text-emerald-400">85% – 90%</td>
                                <td className="px-4 py-3">Patient mins (PDPM 25% cap)</td>
                                <td className="px-4 py-3">
                                    <Link href="/calculator/snf-productivity" className="text-[var(--neon-cyan)] hover:underline">
                                        SNF Calculator →
                                    </Link>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="px-4 py-3 font-medium text-white">Data Entry &amp; BPO</td>
                                <td className="px-4 py-3 font-mono text-emerald-400">90% – 98%</td>
                                <td className="px-4 py-3">Net KPH / records vs. SLA quota</td>
                                <td className="px-4 py-3">
                                    <Link href="/calculator/data-entry" className="text-[var(--neon-cyan)] hover:underline">
                                        Data Entry Suite →
                                    </Link>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="px-4 py-3 font-medium text-white">Customer Support</td>
                                <td className="px-4 py-3 font-mono text-emerald-400">75% – 85%</td>
                                <td className="px-4 py-3">Agent occupancy &amp; ticket velocity</td>
                                <td className="px-4 py-3">
                                    <Link href="/calculator/customer-support" className="text-[var(--neon-cyan)] hover:underline">
                                        Support Suite →
                                    </Link>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="px-4 py-3 font-medium text-white">Education &amp; Teaching</td>
                                <td className="px-4 py-3 font-mono text-emerald-400">78% – 88%</td>
                                <td className="px-4 py-3">Instructional hours vs. prep load</td>
                                <td className="px-4 py-3">
                                    <Link href="/calculator/education" className="text-[var(--neon-cyan)] hover:underline">
                                        Education Suite →
                                    </Link>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5">
                                <td className="px-4 py-3 font-medium text-white">Agriculture &amp; Ag Ops</td>
                                <td className="px-4 py-3 font-mono text-emerald-400">70% – 85%</td>
                                <td className="px-4 py-3">Effective field capacity (EFC %)</td>
                                <td className="px-4 py-3">
                                    <Link href="/calculator/agriculture" className="text-[var(--neon-cyan)] hover:underline">
                                        Agriculture Suite →
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section 4: Excel & Google Sheets Formulas */}
            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-4">
                <h2 className="font-display text-2xl font-bold text-white">
                    Excel &amp; Google Sheets Formulas for Productivity Percentage
                </h2>
                <p>
                    If you log weekly team utilization in a spreadsheet, pair this productivity percentage calculator
                    with these exact formulas (then apply <strong>Format → Number → Percent</strong>):
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5">
                        <div className="text-[var(--neon-cyan)] font-bold">With Lunch Deduction (Minutes)</div>
                        <div className="text-white">=A2/(B2-C2)</div>
                        <div className="text-[var(--text-muted)] font-body">
                            A2 = Productive mins, B2 = Gross shift mins, C2 = Unpaid lunch mins
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5">
                        <div className="text-emerald-400 font-bold">Output vs. Target Quota</div>
                        <div className="text-white">=IFERROR(A2/B2, 0)</div>
                        <div className="text-[var(--text-muted)] font-body">
                            A2 = Actual units completed, B2 = Shift or weekly target quota
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 5: FAQ */}
            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
                <h2 className="font-display text-2xl font-bold text-white">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {productivityPercentageFaqs.map((faq) => (
                        <div key={faq.question} className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
                            <h3 className="font-display text-base font-bold text-white mb-1.5">{faq.question}</h3>
                            <p className="text-sm text-[var(--text-secondary)]">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
