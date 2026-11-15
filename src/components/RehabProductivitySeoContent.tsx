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

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Medicare 8-Minute Rule vs. PDPM Concurrent &amp; Group Therapy Rules</h2>
                <p>
                    Calculating rehab productivity accurately requires understanding how payers count treatment minutes. Under Medicare Part B outpatient rules, therapists apply the 8-Minute Rule to convert timed CPT codes (such as therapeutic exercise, manual therapy, or gait training) into billable 15-minute units. Because a single 38-minute session yields 3 billable units (45 minutes of unit credit) while a 22-minute session yields 1 unit, your billable treatment minutes in the numerator can differ slightly from raw stopwatch minutes depending on your facility&apos;s EMR configuration.
                </p>
                <p>
                    In Skilled Nursing Facilities (SNFs) operating under the Patient-Driven Payment Model (PDPM), CMS caps combined group and concurrent therapy at 25% of a resident&apos;s total therapy minutes per discipline. When a physical therapist treats two residents concurrently for 30 minutes, each patient receives 30 minutes of therapy credit toward their clinical record, but the clinician only worked 30 clock minutes. Many SNF directors therefore track both raw clock-time productivity and weighted group-adjusted productivity so that clinicians are never incentivized to exceed the 25% PDPM compliance threshold.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Daily Time-Blocking Workflow to Hit 85%–90% Rehab Productivity</h2>
                <p>
                    Experienced PT, OT, and SLP clinicians avoid end-of-day burnout by structuring their shift into predictable time blocks rather than leaving documentation until 4:30 PM. On a standard 480-minute (8-hour) paid shift, hitting an 85% productivity target requires 408 billable treatment minutes, leaving 72 minutes for all non-billable tasks.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Point-of-Service Documentation (Save 25–30 mins/day):</strong> Complete subjective updates, objective flowsheet measurements, and exercise progressions inside the gym or patient room during the final 3–5 minutes of each session while summarizing home-exercise instructions.
                    </li>
                    <li>
                        <strong>Batch Chart Reviews Early (15 mins at shift start):</strong> Review overnight nursing notes, vitals, and lab holds for all morning patients in one 15-minute block before walking onto the floor, eliminating wasted hallway trips between sessions.
                    </li>
                    <li>
                        <strong>Pre-Stage Cancellations &amp; Refusals:</strong> Keep a prioritized backup list of flexible PRN or inpatient residents so a 10:00 AM medical hold immediately converts into an alternate 30-minute treatment slot instead of unscheduled downtime.
                    </li>
                    <li>
                        <strong>Separate Unpaid Meal Breaks:</strong> Never include an unpaid 30-minute lunch in your denominator. An 8:00 AM to 4:30 PM schedule with a 30-minute unpaid lunch equals 480 paid minutes, not 510 minutes.
                    </li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Excel Formula for Weekly Rehab Productivity Tracking</h2>
                <p>
                    Rehab managers and travel therapists can track weekly compliance in Excel or Google Sheets. Place total billable patient minutes in column <code>B</code>, total paid shift hours in column <code>C</code>, and unpaid meal minutes already excluded from paid hours. Use this formula to calculate exact shift productivity:
                </p>
                <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-sm overflow-x-auto">
                    <code>=(B2/(C2*60))*100</code>
                </pre>
                <p>
                    To calculate the minimum billable minutes needed to meet an 88% facility target for any shift length in <code>C2</code>, use <code>=C2*60*0.88</code>. Monitoring this daily gap prevents small 15-minute documentation overruns from compounding into a missed weekly productivity review.
                </p>
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
