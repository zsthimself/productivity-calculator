/**
 * [INPUT]: React useState/useMemo 与 Tailwind 主题变量
 * [OUTPUT]: 导出 ProductivityIndexCalculator 组件（单要素/多要素 Base-100 生产力指数与同比变动计算器）
 * [POS]: src/components/ProductivityIndexCalculator.tsx 为 /calculator/productivity-index 提供交互计算引擎
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useMemo, useState } from "react";

type Mode = "single" | "multifactor";

export default function ProductivityIndexCalculator() {
    const [mode, setMode] = useState<Mode>("single");

    // Mode 1: Single-Factor Productivity Index (Base = 100)
    const [baseOutput, setBaseOutput] = useState("1000");
    const [baseInput, setBaseInput] = useState("100");
    const [currOutput, setCurrOutput] = useState("1350");
    const [currInput, setCurrInput] = useState("120");

    // Mode 2: Multi-Factor (Labor + Capital) Index
    const [baseMfpOut, setBaseMfpOut] = useState("50000");
    const [baseLaborCost, setBaseLaborCost] = useState("20000");
    const [baseCapitalCost, setBaseCapitalCost] = useState("10000");
    const [currMfpOut, setCurrMfpOut] = useState("62000");
    const [currLaborCost, setCurrLaborCost] = useState("22000");
    const [currCapitalCost, setCurrCapitalCost] = useState("11000");

    const singleStats = useMemo(() => {
        const bOut = Math.max(0, parseFloat(baseOutput) || 0);
        const bIn = Math.max(0.0001, parseFloat(baseInput) || 0.0001);
        const cOut = Math.max(0, parseFloat(currOutput) || 0);
        const cIn = Math.max(0.0001, parseFloat(currInput) || 0.0001);

        const baseRatio = bOut / bIn;
        const currRatio = cOut / cIn;
        const index = baseRatio > 0 ? (currRatio / baseRatio) * 100 : 0;
        const pctChange = index - 100;
        const outputGrowth = bOut > 0 ? ((cOut - bOut) / bOut) * 100 : 0;
        const inputGrowth = bIn > 0 ? ((cIn - bIn) / bIn) * 100 : 0;

        return { baseRatio, currRatio, index, pctChange, outputGrowth, inputGrowth };
    }, [baseOutput, baseInput, currOutput, currInput]);

    const mfpStats = useMemo(() => {
        const bOut = Math.max(0, parseFloat(baseMfpOut) || 0);
        const bTotalIn = Math.max(0.0001, (parseFloat(baseLaborCost) || 0) + (parseFloat(baseCapitalCost) || 0));
        const cOut = Math.max(0, parseFloat(currMfpOut) || 0);
        const cTotalIn = Math.max(0.0001, (parseFloat(currLaborCost) || 0) + (parseFloat(currCapitalCost) || 0));

        const baseMfp = bOut / bTotalIn;
        const currMfp = cOut / cTotalIn;
        const index = baseMfp > 0 ? (currMfp / baseMfp) * 100 : 0;
        const pctChange = index - 100;

        return { baseMfp, currMfp, index, pctChange, bTotalIn, cTotalIn };
    }, [baseMfpOut, baseLaborCost, baseCapitalCost, currMfpOut, currLaborCost, currCapitalCost]);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
                <button
                    type="button"
                    onClick={() => setMode("single")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                        mode === "single"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                            : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                >
                    Single-Factor Index (Base = 100)
                </button>
                <button
                    type="button"
                    onClick={() => setMode("multifactor")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                        mode === "multifactor"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                            : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                >
                    Multi-Factor Index (Labor + Capital)
                </button>
            </div>

            {mode === "single" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                                Base Period (Index = 100.0)
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Base Output (Units / Real $)</label>
                                <input
                                    type="number"
                                    value={baseOutput}
                                    onChange={(e) => setBaseOutput(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Base Input (Hours / Staff)</label>
                                <input
                                    type="number"
                                    value={baseInput}
                                    onChange={(e) => setBaseInput(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                            <div className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                                Current Period
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Current Output (Units / Real $)</label>
                                <input
                                    type="number"
                                    value={currOutput}
                                    onChange={(e) => setCurrOutput(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Current Input (Hours / Staff)</label>
                                <input
                                    type="number"
                                    value={currInput}
                                    onChange={(e) => setCurrInput(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                Productivity Index
                            </span>
                            <span className="text-4xl font-mono font-extrabold text-emerald-400">
                                {singleStats.index.toFixed(1)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Efficiency Change vs. Base</span>
                            <span
                                className={`font-mono font-bold ${
                                    singleStats.pctChange >= 0 ? "text-emerald-300" : "text-rose-400"
                                }`}
                            >
                                {singleStats.pctChange >= 0 ? "+" : ""}
                                {singleStats.pctChange.toFixed(2)}%
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Base Period Ratio</span>
                            <span className="font-mono font-semibold text-white">
                                {singleStats.baseRatio.toFixed(2)} / unit
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Current Period Ratio</span>
                            <span className="font-mono font-semibold text-cyan-300">
                                {singleStats.currRatio.toFixed(2)} / unit
                            </span>
                        </div>
                        <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                            <div className="bg-slate-900 rounded-lg p-2.5">
                                <div className="text-slate-400">Output Δ</div>
                                <div className="text-white font-bold">
                                    {singleStats.outputGrowth >= 0 ? "+" : ""}
                                    {singleStats.outputGrowth.toFixed(1)}%
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-lg p-2.5">
                                <div className="text-slate-400">Input Δ</div>
                                <div className="text-white font-bold">
                                    {singleStats.inputGrowth >= 0 ? "+" : ""}
                                    {singleStats.inputGrowth.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                                Base Period Inputs ($)
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Base Real Output ($)</label>
                                <input
                                    type="number"
                                    value={baseMfpOut}
                                    onChange={(e) => setBaseMfpOut(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Base Labor Cost ($)</label>
                                <input
                                    type="number"
                                    value={baseLaborCost}
                                    onChange={(e) => setBaseLaborCost(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Base Capital &amp; Materials ($)</label>
                                <input
                                    type="number"
                                    value={baseCapitalCost}
                                    onChange={(e) => setBaseCapitalCost(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                            <div className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                                Current Period Inputs ($)
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Current Real Output ($)</label>
                                <input
                                    type="number"
                                    value={currMfpOut}
                                    onChange={(e) => setCurrMfpOut(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Current Labor Cost ($)</label>
                                <input
                                    type="number"
                                    value={currLaborCost}
                                    onChange={(e) => setCurrLaborCost(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Current Capital &amp; Materials ($)</label>
                                <input
                                    type="number"
                                    value={currCapitalCost}
                                    onChange={(e) => setCurrCapitalCost(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                Multi-Factor Index
                            </span>
                            <span className="text-4xl font-mono font-extrabold text-cyan-300">
                                {mfpStats.index.toFixed(1)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Net MFP Change</span>
                            <span
                                className={`font-mono font-bold ${
                                    mfpStats.pctChange >= 0 ? "text-emerald-300" : "text-rose-400"
                                }`}
                            >
                                {mfpStats.pctChange >= 0 ? "+" : ""}
                                {mfpStats.pctChange.toFixed(2)}%
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Base Return / $1 Input</span>
                            <span className="font-mono font-semibold text-white">
                                ${mfpStats.baseMfp.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Current Return / $1 Input</span>
                            <span className="font-mono font-semibold text-emerald-300">
                                ${mfpStats.currMfp.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
