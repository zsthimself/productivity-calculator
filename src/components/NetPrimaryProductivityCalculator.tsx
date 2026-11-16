/**
 * [INPUT]: React useState/useMemo 与 Tailwind 主题样式
 * [OUTPUT]: 导出 NetPrimaryProductivityCalculator 组件（NPP = GPP - R 与溶氧法 AP 生态实验双模式计算器）
 * [POS]: src/components/NetPrimaryProductivityCalculator.tsx 为 /calculator/net-primary-productivity 提供交互计算引擎
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useMemo, useState } from "react";

type Mode = "carbon" | "dissolved-oxygen";

export default function NetPrimaryProductivityCalculator() {
    const [mode, setMode] = useState<Mode>("carbon");

    const [gpp, setGpp] = useState("2400");
    const [respiration, setRespiration] = useState("1100");
    const [unit, setUnit] = useState("g C / m² / yr");

    const [initialDo, setInitialDo] = useState("8.2");
    const [lightDo, setLightDo] = useState("11.6");
    const [darkDo, setDarkDo] = useState("6.4");
    const [hours, setHours] = useState("24");

    const carbonStats = useMemo(() => {
        const g = Math.max(0, parseFloat(gpp) || 0);
        const r = Math.max(0, parseFloat(respiration) || 0);
        const npp = g - r;
        const cue = g > 0 ? (npp / g) * 100 : 0;
        const respShare = g > 0 ? (r / g) * 100 : 0;
        return { g, r, npp, cue, respShare };
    }, [gpp, respiration]);

    const doStats = useMemo(() => {
        const init = parseFloat(initialDo) || 0;
        const light = parseFloat(lightDo) || 0;
        const dark = parseFloat(darkDo) || 0;
        const hrs = Math.max(0.1, parseFloat(hours) || 24);

        const nppMgL = light - init;
        const respMgL = init - dark;
        const gppMgL = light - dark;
        const nppCarbonMgL = nppMgL * 0.375;
        const nppRatePerHr = nppMgL / hrs;

        return { nppMgL, respMgL, gppMgL, nppCarbonMgL, nppRatePerHr, hrs };
    }, [initialDo, lightDo, darkDo, hours]);

    return (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    type="button"
                    onClick={() => setMode("carbon")}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                        mode === "carbon"
                            ? "bg-emerald-500 text-slate-950 shadow-md"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                >
                    NPP = GPP - R (Biomass / Carbon)
                </button>
                <button
                    type="button"
                    onClick={() => setMode("dissolved-oxygen")}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                        mode === "dissolved-oxygen"
                            ? "bg-cyan-500 text-slate-950 shadow-md"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                >
                    Light &amp; Dark Bottle (Dissolved O₂)
                </button>
            </div>

            {mode === "carbon" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Gross Primary Productivity (GPP)
                            </label>
                            <input
                                type="number"
                                value={gpp}
                                onChange={(e) => setGpp(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-emerald-500"
                                placeholder="e.g. 2400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Autotrophic Respiration (R)
                            </label>
                            <input
                                type="number"
                                value={respiration}
                                onChange={(e) => setRespiration(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-emerald-500"
                                placeholder="e.g. 1100"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Measurement Unit
                            </label>
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                            >
                                <option value="g C / m² / yr">g C / m² / yr (Grams Carbon)</option>
                                <option value="kcal / m² / yr">kcal / m² / yr (Kilocalories)</option>
                                <option value="kg / m² / yr">kg / m² / yr (Dry Biomass)</option>
                                <option value="g / m² / day">g / m² / day (Daily Rate)</option>
                            </select>
                        </div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1">
                                Net Primary Productivity (NPP)
                            </div>
                            <div className={`text-4xl sm:text-5xl font-black font-mono tabular-nums ${carbonStats.npp >= 0 ? "text-white" : "text-rose-400"}`}>
                                {carbonStats.npp.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-xs font-mono text-slate-400 mt-1">{unit}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-800">
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <div className="text-[11px] text-slate-400 uppercase">Carbon Use Efficiency</div>
                                <div className="text-lg font-bold font-mono text-emerald-400">
                                    {carbonStats.cue.toFixed(1)}%
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <div className="text-[11px] text-slate-400 uppercase">Respiration Loss</div>
                                <div className="text-lg font-bold font-mono text-amber-400">
                                    {carbonStats.respShare.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Initial Bottle DO (mg/L)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={initialDo}
                                onChange={(e) => setInitialDo(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Light Bottle DO (mg/L)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={lightDo}
                                onChange={(e) => setLightDo(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Dark Bottle DO (mg/L)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={darkDo}
                                onChange={(e) => setDarkDo(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Incubation Time (Hours)
                            </label>
                            <input
                                type="number"
                                step="1"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-500"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                                Net Primary Productivity (Light - Initial)
                            </div>
                            <div className="text-4xl font-black font-mono tabular-nums text-white">
                                {doStats.nppMgL.toFixed(2)} <span className="text-base font-normal text-slate-400">mg O₂/L</span>
                            </div>
                            <div className="text-xs font-mono text-emerald-400 mt-1">
                                ≈ {doStats.nppCarbonMgL.toFixed(3)} mg C/L ({doStats.nppRatePerHr.toFixed(3)} mg O₂/L/hr)
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-800">
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <div className="text-[11px] text-slate-400 uppercase">GPP (Light - Dark)</div>
                                <div className="text-lg font-bold font-mono text-cyan-400">
                                    {doStats.gppMgL.toFixed(2)} mg/L
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <div className="text-[11px] text-slate-400 uppercase">Respiration (Init - Dark)</div>
                                <div className="text-lg font-bold font-mono text-amber-400">
                                    {doStats.respMgL.toFixed(2)} mg/L
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
