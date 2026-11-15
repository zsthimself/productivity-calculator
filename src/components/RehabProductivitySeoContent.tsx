/**
 * [INPUT]: 无外部参数，纯静态 JSX 渲染
 * [OUTPUT]: 导出 RehabProductivitySeoContent 组件（涵盖 PT/OT/SLP 康复公式、0-CLS 图解、设定基准表与内链）
 * [POS]: src/components/RehabProductivitySeoContent.tsx 为 /calculator/rehab-productivity 提供深度 SEO 内容
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import Link from "next/link";

export default function RehabProductivitySeoContent() {
    return (
        <article className="prose prose-invert max-w-none space-y-10 text-slate-300 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                    How Rehab Productivity Works for PT, OT, and SLP Clinicians
                </h2>
                <p>
                    A dedicated <strong>rehab productivity calculator</strong> helps physical therapists (PT/PTA), occupational therapists (OT/COTA), and speech-language pathologists (SLP) measure billable patient treatment time against net paid shift hours. Unlike generic office timesheets, rehabilitation departments must account for unpaid lunch breaks, point-of-service documentation, care conferences, and Medicare PDPM group/concurrent caps.
                </p>
                <p>
                    For instance, a therapist working 8:00 AM to 4:30 PM with a 30-minute unpaid lunch has 480 net paid minutes. Logging 408 billable minutes yields <strong>85.0% rehab productivity</strong> (<code className="font-mono text-cyan-300">408 ÷ 480</code>), leaving 72 paid minutes for evaluations, notes, and interdisciplinary huddles.
                </p>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
                <h2 className="text-2xl font-bold text-white mb-3">
                    Rehab Productivity Formula &amp; Medicare PDPM 25% Rule
                </h2>
                <div className="my-5">
                    <img
                        src="/images/rehab-productivity-formula.svg"
                        alt="Rehab productivity calculator formula diagram showing 408 billable minutes divided by 480 net paid minutes equals 85.0 percent"
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-xl border border-slate-700"
                    />
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>
                        <strong>Net Paid Shift Minutes:</strong> <code className="font-mono text-cyan-300">(Clock-Out − Clock-In) − Unpaid Lunch Minutes</code>
                    </li>
                    <li>
                        <strong>Rehab Productivity %:</strong> <code className="font-mono text-cyan-300">(Billable Treatment Minutes ÷ Net Paid Shift Minutes) × 100</code>
                    </li>
                    <li>
                        <strong>PDPM Group/Concurrent Cap:</strong> Combined group and concurrent therapy minutes must remain <code className="font-mono text-cyan-300">≤ 25%</code> of total therapy minutes per discipline under Medicare Part A SNF guidelines.
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                    Rehab Productivity Benchmarks by Clinical Setting
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm border border-slate-800 rounded-xl overflow-hidden">
                        <thead className="bg-slate-900 text-slate-200 uppercase text-xs">
                            <tr>
                                <th className="p-3 border-b border-slate-800">Rehab Setting</th>
                                <th className="p-3 border-b border-slate-800">Typical Target %</th>
                                <th className="p-3 border-b border-slate-800">Billable Mins / 8h Paid</th>
                                <th className="p-3 border-b border-slate-800">Key Workflow Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="p-3 font-semibold text-white">Acute Care Hospital</td>
                                <td className="p-3 font-mono text-cyan-300">70% – 78%</td>
                                <td className="p-3 font-mono">336 – 374 mins</td>
                                <td className="p-3">High medical acuity, ICU hold checks, discharge coordination</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-semibold text-white">Inpatient Rehab (IRF)</td>
                                <td className="p-3 font-mono text-cyan-300">75% – 82%</td>
                                <td className="p-3 font-mono">360 – 394 mins</td>
                                <td className="p-3">3-hour daily therapy rule &amp; weekly team conferences</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-semibold text-white">Outpatient Clinic</td>
                                <td className="p-3 font-mono text-emerald-300">80% – 85%</td>
                                <td className="p-3 font-mono">384 – 408 mins</td>
                                <td className="p-3">8-minute rule billing units &amp; cancellation backfill</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-semibold text-white">Skilled Nursing (SNF)</td>
                                <td className="p-3 font-mono text-amber-300">85% – 90%</td>
                                <td className="p-3 font-mono">408 – 432 mins</td>
                                <td className="p-3">PTA/COTA higher targets; PDPM 25% group/concurrent cap</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="pt-4 border-t border-slate-800">
                <h3 className="text-lg font-bold text-white mb-3">Related Therapy &amp; Healthcare Calculators</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm not-prose">
                    <Link href="/calculator/physical-therapy" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-200 transition">
                        Physical Therapy Calculator →
                    </Link>
                    <Link href="/calculator/snf-productivity" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-200 transition">
                        SNF Productivity Calculator →
                    </Link>
                    <Link href="/calculator/billing-units" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-200 transition">
                        8-Minute Billing Units →
                    </Link>
                    <Link href="/calculator/productivity-with-lunch-break" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-200 transition">
                        Lunch Break Calculator →
                    </Link>
                </div>
            </section>
        </article>
    );
}
