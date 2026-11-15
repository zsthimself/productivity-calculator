/**
 * [INPUT]: 无外部参数，纯静态 JSX 渲染
 * [OUTPUT]: 导出 ProductivityLunchBreakSeoContent 组件（涵盖公式、0-CLS 图解、午休矩阵与内链）
 * [POS]: src/components/ProductivityLunchBreakSeoContent.tsx 为 /calculator/productivity-with-lunch-break 提供深度 SEO 内容
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import Link from "next/link";

export default function ProductivityLunchBreakSeoContent() {
    return (
        <article className="prose prose-invert max-w-none space-y-10 text-slate-300 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                    Why Use a Productivity Calculator With Lunch Break Deduction?
                </h2>
                <p>
                    Calculating shift efficiency without removing an unpaid meal period distorts every performance metric on a timesheet. If a clinician, technician, or operations specialist clocks in at 8:00 AM and clocks out at 4:30 PM, the raw clock span is 510 minutes (8.50 hours). When a 30-minute unpaid lunch break is deducted, the true net paid denominator drops to 480 minutes (8.00 hours). Using a dedicated <strong>productivity calculator with lunch break</strong> support ensures your utilization rate reflects actual paid work time rather than penalizing employees for legally mandated meal breaks.
                </p>
                <p>
                    For example, delivering 408 billable minutes across an 8:00 AM to 4:30 PM shift yields <strong>85.0% productivity</strong> after deducting a 30-minute lunch (<code className="font-mono text-cyan-300">408 ÷ 480</code>), whereas forgetting to subtract lunch understates performance at 80.0% (<code className="font-mono text-cyan-300">408 ÷ 510</code>). That 5-percentage-point gap is often the difference between meeting facility expectations and triggering an unnecessary performance review.
                </p>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
                <h2 className="text-2xl font-bold text-white mb-3">
                    Formula: Productivity Calculator With Lunch Break
                </h2>
                <p className="mb-4">
                    Our engine applies a two-step formula that handles standard daytime shifts, overnight shifts crossing midnight, and 30-, 45-, or 60-minute unpaid lunch deductions:
                </p>
                <div className="my-5">
                    <img
                        src="/images/productivity-lunch-break-formula.svg"
                        alt="Productivity calculator with lunch break formula diagram showing 8:00 AM to 4:30 PM minus 30 minute lunch equals 480 paid minutes and 85 percent productivity"
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-xl border border-slate-700"
                    />
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>
                        <strong>Step 1 — Net Paid Shift Minutes:</strong> <code className="font-mono text-cyan-300">(Clock-Out − Clock-In) − Unpaid Lunch Minutes</code>
                    </li>
                    <li>
                        <strong>Step 2 — Productivity Percentage:</strong> <code className="font-mono text-cyan-300">(Billable or Productive Minutes ÷ Net Paid Shift Minutes) × 100</code>
                    </li>
                    <li>
                        <strong>Step 3 — Target Clock-Out Time:</strong> <code className="font-mono text-cyan-300">Clock-In + (Billable Minutes ÷ Target %) + Unpaid Lunch Minutes</code>
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                    30-, 45-, and 60-Minute Lunch Break Shift Matrix
                </h2>
                <p className="mb-4">
                    Use this reference table to compare how different unpaid lunch durations affect your required clock-out time and billable minute targets for an 85% productivity benchmark on an 8.00-hour paid shift (8:00 AM start):
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm bg-slate-900/50 rounded-xl overflow-hidden">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-200 bg-slate-800/80">
                                <th className="py-3 px-4">Lunch Break</th>
                                <th className="py-3 px-4">Clock-Out (8h Paid)</th>
                                <th className="py-3 px-4">Gross Span</th>
                                <th className="py-3 px-4">Net Paid Mins</th>
                                <th className="py-3 px-4 text-right">85% Billable Target</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 font-mono text-xs sm:text-sm">
                            <tr>
                                <td className="py-2.5 px-4 text-amber-300 font-semibold">0 min (No Lunch)</td>
                                <td className="py-2.5 px-4 text-white">4:00 PM</td>
                                <td className="py-2.5 px-4">480 min</td>
                                <td className="py-2.5 px-4">480 min</td>
                                <td className="py-2.5 px-4 text-right text-emerald-400">408 min</td>
                            </tr>
                            <tr>
                                <td className="py-2.5 px-4 text-amber-300 font-semibold">30 min Lunch</td>
                                <td className="py-2.5 px-4 text-white">4:30 PM</td>
                                <td className="py-2.5 px-4">510 min</td>
                                <td className="py-2.5 px-4">480 min</td>
                                <td className="py-2.5 px-4 text-right text-emerald-400">408 min</td>
                            </tr>
                            <tr>
                                <td className="py-2.5 px-4 text-amber-300 font-semibold">45 min Lunch</td>
                                <td className="py-2.5 px-4 text-white">4:45 PM</td>
                                <td className="py-2.5 px-4">525 min</td>
                                <td className="py-2.5 px-4">480 min</td>
                                <td className="py-2.5 px-4 text-right text-emerald-400">408 min</td>
                            </tr>
                            <tr>
                                <td className="py-2.5 px-4 text-amber-300 font-semibold">60 min Lunch</td>
                                <td className="py-2.5 px-4 text-white">5:00 PM</td>
                                <td className="py-2.5 px-4">540 min</td>
                                <td className="py-2.5 px-4">480 min</td>
                                <td className="py-2.5 px-4 text-right text-emerald-400">408 min</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-lg font-bold text-white mb-2">
                        DOL 29 CFR § 785.19 Meal Period Guidance
                    </h3>
                    <p className="text-sm">
                        Based on US Department of Labor (29 CFR § 785.19) guidance, bona fide meal periods of 30 minutes or more are not counted as compensable work time when the employee is completely relieved from duties. Short rest breaks (5 to 20 minutes), by contrast, remain paid time and should stay inside your denominator.
                    </p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-lg font-bold text-white mb-2">
                        Excel &amp; Google Sheets Formula
                    </h3>
                    <p className="text-sm mb-2">
                        To replicate this <strong>productivity calculator with lunch break</strong> logic in a spreadsheet where <code className="font-mono text-cyan-300">A2</code> is Clock-In, <code className="font-mono text-cyan-300">B2</code> is Clock-Out, <code className="font-mono text-cyan-300">C2</code> is Lunch (minutes), and <code className="font-mono text-cyan-300">D2</code> is Billable Minutes:
                    </p>
                    <code className="block bg-slate-950 p-2.5 rounded-lg text-xs font-mono text-emerald-300">
                        =D2/(((B2-A2)*1440)-C2)
                    </code>
                </div>
            </section>

            <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                <h2 className="text-xl font-bold text-white mb-3">
                    Related Shift &amp; Utilization Calculators
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm not-prose">
                    <Link href="/calculator/productivity-percentage" className="block p-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-[var(--neon-cyan)] transition">
                        <div className="font-semibold text-white">Productivity Percentage</div>
                        <div className="text-xs text-slate-400 mt-1">Output vs. quota &amp; daily % tracker</div>
                    </Link>
                    <Link href="/calculator/snf-productivity" className="block p-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-[var(--neon-cyan)] transition">
                        <div className="font-semibold text-white">SNF Productivity</div>
                        <div className="text-xs text-slate-400 mt-1">Rehab therapy PDPM 25% cap &amp; lunch</div>
                    </Link>
                    <Link href="/calculator/physical-therapy" className="block p-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-[var(--neon-cyan)] transition">
                        <div className="font-semibold text-white">Physical Therapy</div>
                        <div className="text-xs text-slate-400 mt-1">Clinic PT/PTA billable minutes &amp; lunch</div>
                    </Link>
                </div>
            </section>
        </article>
    );
}
