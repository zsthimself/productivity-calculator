/**
 * [INPUT]: 无外部参数，纯静态 JSX 渲染
 * [OUTPUT]: 导出 ProductivityIndexSeoContent 组件（涵盖 Base-100 公式、0-CLS 图解、解释表与内链）
 * [POS]: src/components/ProductivityIndexSeoContent.tsx 为 /calculator/productivity-index 提供深度 SEO 内容
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import Link from "next/link";

export default function ProductivityIndexSeoContent() {
    return (
        <article className="prose prose-invert max-w-none space-y-10 text-slate-300 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                    What Is a Productivity Index Calculator?
                </h2>
                <p>
                    A <strong>productivity index calculator</strong> tracks how operational efficiency changes over time by normalizing a chosen baseline period to <strong>100.0</strong>. Instead of comparing raw unit counts across teams of different sizes or shifting headcounts, operations managers, economists, and plant directors use a productivity index to isolate whether output per hour or per dollar of combined input is genuinely accelerating or slipping.
                </p>
                <p>
                    For example, if your base-period line produced 1,000 units across 100 labor hours (<code className="font-mono text-cyan-300">10.00 units/hr</code>) and your current-period team produced 1,350 units across 120 labor hours (<code className="font-mono text-cyan-300">11.25 units/hr</code>), the <strong>productivity index</strong> rises to <strong>112.5</strong>—proving a real +12.5% efficiency gain rather than just higher volume from added hours.
                </p>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
                <h2 className="text-2xl font-bold text-white mb-3">
                    Productivity Index Formula &amp; Worked Example
                </h2>
                <p className="mb-4">
                    Our <strong>productivity index calculator</strong> supports both single-factor (labor or machine) ratios and multi-factor (labor + capital + materials) indexes:
                </p>
                <div className="my-5">
                    <img
                        src="/images/productivity-index-formula.svg"
                        alt="Productivity index calculator formula diagram comparing Base Period 100.0 against Current Period 112.5"
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-xl border border-slate-700"
                    />
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>
                        <strong>Step 1 — Base Period Ratio:</strong> <code className="font-mono text-cyan-300">Base Output ÷ Base Input</code> (assigned Index = 100.0)
                    </li>
                    <li>
                        <strong>Step 2 — Current Period Ratio:</strong> <code className="font-mono text-cyan-300">Current Output ÷ Current Input</code>
                    </li>
                    <li>
                        <strong>Step 3 — Productivity Index:</strong> <code className="font-mono text-cyan-300">(Current Ratio ÷ Base Ratio) × 100</code>
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                    How to Interpret Your Productivity Index Score
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm border border-slate-800 rounded-xl overflow-hidden">
                        <thead className="bg-slate-900 text-slate-200 uppercase text-xs">
                            <tr>
                                <th className="p-3 border-b border-slate-800">Index Score</th>
                                <th className="p-3 border-b border-slate-800">Change vs. Base</th>
                                <th className="p-3 border-b border-slate-800">Operational Meaning</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="p-3 font-mono font-bold text-emerald-400">110.0+</td>
                                <td className="p-3 font-mono text-emerald-300">+10.0% or higher</td>
                                <td className="p-3">Strong efficiency breakout driven by workflow, tooling, or training gains</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono font-bold text-cyan-300">101.0 – 109.9</td>
                                <td className="p-3 font-mono text-cyan-200">+1.0% to +9.9%</td>
                                <td className="p-3">Steady continuous improvement over the reference quarter or year</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono font-bold text-white">100.0</td>
                                <td className="p-3 font-mono text-slate-300">0.0%</td>
                                <td className="p-3">Parity with base-period output per unit of input</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono font-bold text-rose-400">&lt; 100.0</td>
                                <td className="p-3 font-mono text-rose-300">Negative Δ</td>
                                <td className="p-3">Bottlenecks, downtime, or rising input costs reducing unit efficiency</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Single-Factor vs. Multi-Factor Productivity Index: Which Should You Track?</h2>
                <p>
                    Choosing between a single-factor and a multi-factor productivity index depends on whether your team needs fast operational feedback or executive-level capital efficiency reporting. A single-factor labor productivity index isolates output per labor hour or output per full-time equivalent (FTE), making it ideal for weekly shift reviews, warehouse throughput audits, and software sprint velocity tracking. Because it only requires two inputs per period, supervisors can compute it immediately at the end of a week without waiting for month-end accounting closes.
                </p>
                <p>
                    However, relying solely on a single-factor index can mask cost shifting. If a factory buys a new automated packaging line, labor output per hour will surge, pushing the labor productivity index from 100 to 135. Without accounting for machine depreciation, maintenance, and energy consumption, management may overestimate true operational gains. A multi-factor productivity index (also known as a total factor productivity index) solves this by placing combined labor, capital, materials, and energy costs in the denominator. Whenever your capital expenditure or outsourcing mix changes by more than 10% year-over-year, pairing both indices prevents misleading conclusions.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">How to Build a Productivity Index in Excel or Google Sheets</h2>
                <p>
                    Operations analysts frequently automate monthly index tracking inside spreadsheets so leadership dashboards update automatically. Suppose your base period output sits in cell <code>B2</code>, base period input sits in <code>C2</code>, and your current period output and input sit in <code>B3</code> and <code>C3</code>. You can compute the current productivity index in a single formula:
                </p>
                <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-sm overflow-x-auto">
                    <code>=((B3/C3)/(B2/C2))*100</code>
                </pre>
                <p>
                    To lock the base period while dragging the formula down across twelve months or fifty regional branches, anchor the denominator with dollar signs: <code>=((B3/C3)/($B$2/$C$2))*100</code>. If you want to display the percentage change relative to the base period alongside the index, use <code>=(D3-100)/100</code> formatted as a percentage, where <code>D3</code> holds the calculated productivity index.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Common Deflation &amp; Measurement Pitfalls to Avoid</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Mixing nominal revenue with physical units:</strong> If you measure output in dollars during an inflationary period without dividing by a price deflator (such as PPI or CPI), price hikes will artificially inflate your productivity index even when real unit volume is flat.
                    </li>
                    <li>
                        <strong>Choosing an anomalous base period:</strong> Never select a holiday peak, plant shutdown, or supply-chain disruption quarter as your Index = 100 baseline. Always pick a stable, representative operating period or use a 12-month trailing average as your base ratio.
                    </li>
                    <li>
                        <strong>Ignoring quality and rework rates:</strong> Producing 15% more units with a 10% scrap rate does not represent real productivity growth. Always measure net good output (shipped units minus defective returns) in the numerator of your productivity index calculator.
                    </li>
                    <li>
                        <strong>Changing input definitions mid-year:</strong> If contractor hours were excluded in Q1 but included in Q2, your index drop reflects an accounting boundary change rather than an operational slowdown. Re-baseline historical periods whenever scope changes.
                    </li>
                </ul>
            </section>

            <section className="pt-4 border-t border-slate-800">
                <h3 className="text-lg font-bold text-white mb-3">Related Productivity &amp; Efficiency Calculators</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm not-prose">
                    <Link href="/calculator/total-factor-productivity" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-200 transition">
                        Total Factor Productivity →
                    </Link>
                    <Link href="/calculator/labor" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-200 transition">
                        Labor Productivity →
                    </Link>
                    <Link href="/calculator/time-efficiency" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-200 transition">
                        Time Efficiency Calculator →
                    </Link>
                    <Link href="/calculator/productivity-percentage" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-200 transition">
                        Productivity Percentage →
                    </Link>
                </div>
            </section>
        </article>
    );
}
