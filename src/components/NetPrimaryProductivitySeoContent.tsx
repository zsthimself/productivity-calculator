/**
 * [INPUT]: 无外部参数，纯静态 JSX 渲染
 * [OUTPUT]: 导出 NetPrimaryProductivitySeoContent 组件（涵盖 NPP = GPP - R 公式、溶氧法、生物群落基准表与内链）
 * [POS]: src/components/NetPrimaryProductivitySeoContent.tsx 为 /calculator/net-primary-productivity 提供深度 SEO 内容
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import Link from "next/link";

const BIOME_BENCHMARKS = [
    { biome: "Tropical Rainforest", npp: "2,200", range: "1,000 – 3,500", cue: "35% – 45%", driver: "Year-round warmth, high solar radiation, abundant rainfall" },
    { biome: "Estuaries & Coral Reefs", npp: "1,500 – 2,000", range: "200 – 4,000", cue: "50% – 65%", driver: "Nutrient-rich tidal mixing and warm shallow waters" },
    { biome: "Temperate Deciduous Forest", npp: "1,200", range: "600 – 2,500", cue: "45% – 55%", driver: "Seasonal leaf-out and moderate soil moisture" },
    { biome: "Cultivated Cropland", npp: "650", range: "100 – 3,500", cue: "50% – 60%", driver: "Fertilizer inputs, irrigation, and high-yield cultivars" },
    { biome: "Temperate Grassland", npp: "600", range: "200 – 1,500", cue: "45% – 55%", driver: "Below-ground root biomass and seasonal precipitation" },
    { biome: "Open Ocean", npp: "125", range: "2 – 400", cue: "55% – 70%", driver: "Vast surface area but nitrogen/iron nutrient limitation" },
    { biome: "Extreme Desert & Tundra", npp: "90 – 140", range: "10 – 400", cue: "40% – 50%", driver: "Severe water deficit or short growing season" },
];

export default function NetPrimaryProductivitySeoContent() {
    return (
        <article className="prose prose-invert max-w-none space-y-10 text-slate-300 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                    What Is a Net Primary Productivity Calculator?
                </h2>
                <p>
                    A <strong>net primary productivity calculator</strong> measures the rate at which photosynthetic autotrophs—such as plants, algae, and cyanobacteria—accumulate new organic biomass after subtracting the energy they consume for cellular respiration. In ecology, forestry, agronomy, and AP Environmental Science (APES), <strong>Net Primary Productivity (NPP)</strong> represents the actual energy budget available to herbivores, decomposers, and human agriculture.
                </p>
                <p>
                    While <strong>Gross Primary Productivity (GPP)</strong> captures the total carbon or solar energy fixed during photosynthesis, plants must burn a substantial fraction of those sugars to maintain roots, stems, and leaf tissue. Subtracting autotrophic respiration (<code className="font-mono text-amber-300">R</code>) from <code className="font-mono text-cyan-300">GPP</code> reveals whether an ecosystem is actively gaining carbon biomass or operating near metabolic equilibrium.
                </p>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
                <h2 className="text-2xl font-bold text-white mb-3">
                    NPP Formula: NPP = GPP &minus; R &amp; Light-Dark Bottle Method
                </h2>
                <p className="mb-4">
                    Our <strong>net primary productivity calculator</strong> supports both terrestrial carbon-budget equations and aquatic dissolved-oxygen lab measurements:
                </p>
                <div className="my-5">
                    <img
                        src="/images/net-primary-productivity-formula.svg"
                        alt="Net primary productivity calculator formula showing NPP equals GPP minus autotrophic respiration"
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-xl border border-slate-700"
                    />
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>
                        <strong>Terrestrial Carbon / Biomass Formula:</strong> <code className="font-mono text-emerald-300">NPP = GPP &minus; R</code> (typically expressed in <span className="font-mono">g C / m&sup2; / yr</span> or <span className="font-mono">kcal / m&sup2; / yr</span>).
                    </li>
                    <li>
                        <strong>Carbon Use Efficiency (CUE):</strong> <code className="font-mono text-cyan-300">CUE = (NPP &divide; GPP) &times; 100%</code>. Most terrestrial forests convert 40%–55% of gross fixed carbon into net biomass.
                    </li>
                    <li>
                        <strong>Aquatic Light &amp; Dark Bottle Method (AP Biology):</strong> <code className="font-mono text-cyan-300">NPP = Light Bottle DO &minus; Initial Bottle DO</code>, <code className="font-mono text-amber-300">Respiration (R) = Initial DO &minus; Dark Bottle DO</code>, and <code className="font-mono text-emerald-300">GPP = Light DO &minus; Dark DO</code>.
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                    Global Biome Net Primary Productivity Benchmarks
                </h2>
                <p className="mb-4 text-sm text-slate-400">
                    Reference values below summarize mean annual Net Primary Productivity across major terrestrial and aquatic biomes (expressed in grams of dry organic matter or carbon per square meter per year):
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm border border-slate-800 rounded-xl overflow-hidden">
                        <thead className="bg-slate-900 text-slate-200 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-3 border-b border-slate-800">Biome / Ecosystem</th>
                                <th className="p-3 border-b border-slate-800">Mean NPP (g/m&sup2;/yr)</th>
                                <th className="p-3 border-b border-slate-800">Typical Range</th>
                                <th className="p-3 border-b border-slate-800">Typical CUE</th>
                                <th className="p-3 border-b border-slate-800">Primary Limiting / Driving Factor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                            {BIOME_BENCHMARKS.map((row) => (
                                <tr key={row.biome} className="hover:bg-slate-900/50 transition">
                                    <td className="p-3 font-semibold text-white">{row.biome}</td>
                                    <td className="p-3 font-mono text-emerald-400 font-bold">{row.npp}</td>
                                    <td className="p-3 font-mono text-slate-300">{row.range}</td>
                                    <td className="p-3 font-mono text-cyan-300">{row.cue}</td>
                                    <td className="p-3 text-slate-400 text-xs">{row.driver}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-3">
                    Worked Step-by-Step NPP Calculation Examples
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                    <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                        <h3 className="text-base font-bold text-white mb-2">Example 1: Temperate Forest Carbon Budget</h3>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            A temperate oak forest fixes <span className="font-mono text-cyan-300">2,400 g C/m&sup2;/yr</span> (GPP) and expends <span className="font-mono text-amber-300">1,100 g C/m&sup2;/yr</span> in autotrophic respiration (R).
                        </p>
                        <div className="font-mono text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-emerald-300">
                            NPP = 2,400 &minus; 1,100 = 1,300 g C/m&sup2;/yr<br />
                            CUE = (1,300 &divide; 2,400) &times; 100% = 54.2%
                        </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                        <h3 className="text-base font-bold text-white mb-2">Example 2: APES Pond Water Light/Dark Bottle</h3>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            Initial dissolved oxygen is <span className="font-mono text-slate-200">8.2 mg/L</span>. After 24 hours, the Light Bottle measures <span className="font-mono text-cyan-300">11.6 mg/L</span> and the Dark Bottle measures <span className="font-mono text-amber-300">6.4 mg/L</span>.
                        </p>
                        <div className="font-mono text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-cyan-300">
                            NPP = 11.6 &minus; 8.2 = +3.40 mg O&#8322;/L<br />
                            R = 8.2 &minus; 6.4 = 1.80 mg O&#8322;/L &bull; GPP = 5.20 mg O&#8322;/L
                        </div>
                    </div>
                </div>
            </section>

            <section className="not-prose p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-bold text-white">Related Science, Agriculture &amp; Efficiency Calculators:</span>
                <div className="flex flex-wrap gap-3 text-cyan-400">
                    <Link href="/calculator/agriculture" className="hover:underline">Agriculture Productivity Calculator</Link>
                    <span className="text-slate-600">&bull;</span>
                    <Link href="/calculator/total-factor-productivity" className="hover:underline">Total Factor Productivity (TFP)</Link>
                    <span className="text-slate-600">&bull;</span>
                    <Link href="/calculator/productivity-index" className="hover:underline">Productivity Index Calculator</Link>
                    <span className="text-slate-600">&bull;</span>
                    <Link href="/calculator/general" className="hover:underline">General Productivity Calculator</Link>
                </div>
            </section>
        </article>
    );
}
