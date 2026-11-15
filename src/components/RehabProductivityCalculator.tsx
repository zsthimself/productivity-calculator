/**
 * [INPUT]: React useState/useMemo 与 Tailwind 主题变量
 * [OUTPUT]: 导出 RehabProductivityCalculator 组件（PT/OT/SLP 康复治疗生产力 %、午休扣减、PDPM 25% 团体/并发上限核验与目标下班倒推）
 * [POS]: src/components/RehabProductivityCalculator.tsx 为 /calculator/rehab-productivity 提供交互计算引擎
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useMemo, useState } from "react";

type Mode = "daily" | "clockout";

function parseTimeToMins(hhmm: string): number {
    const [hStr, mStr] = hhmm.split(":");
    const h = parseInt(hStr || "0", 10);
    const m = parseInt(mStr || "0", 10);
    if (Number.isNaN(h) || Number.isNaN(m)) return 0;
    return h * 60 + m;
}

function formatMinsAsClock(totalMins: number): string {
    const normalized = ((Math.round(totalMins) % 1440) + 1440) % 1440;
    const h24 = Math.floor(normalized / 60);
    const m = normalized % 60;
    const period = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export default function RehabProductivityCalculator() {
    const [mode, setMode] = useState<Mode>("daily");

    // Mode 1: Daily Rehab Shift + PDPM Group/Concurrent Cap
    const [clockIn, setClockIn] = useState("08:00");
    const [clockOut, setClockOut] = useState("16:30");
    const [lunchMins, setLunchMins] = useState("30");
    const [individualMins, setIndividualMins] = useState("348");
    const [groupConcurrentMins, setGroupConcurrentMins] = useState("60");

    // Mode 2: Target Clock-Out Solver
    const [targetIn, setTargetIn] = useState("08:00");
    const [targetLunch, setTargetLunch] = useState("30");
    const [billableTotal, setBillableTotal] = useState("408");
    const [targetPct, setTargetPct] = useState("85");

    const dailyStats = useMemo(() => {
        const inM = parseTimeToMins(clockIn);
        let outM = parseTimeToMins(clockOut);
        if (outM < inM) outM += 1440;
        const grossMins = Math.max(0, outM - inM);
        const lunch = Math.max(0, parseFloat(lunchMins) || 0);
        const netPaidMins = Math.max(1, grossMins - lunch);

        const indiv = Math.max(0, parseFloat(individualMins) || 0);
        const gc = Math.max(0, parseFloat(groupConcurrentMins) || 0);
        const totalBillable = indiv + gc;
        const productivityPct = (totalBillable / netPaidMins) * 100;
        const nonBillableMins = Math.max(0, netPaidMins - totalBillable);
        const gcShare = totalBillable > 0 ? (gc / totalBillable) * 100 : 0;

        return {
            grossMins,
            netPaidMins,
            totalBillable,
            productivityPct,
            nonBillableMins,
            gcShare,
            pdpmCompliant: gcShare <= 25,
        };
    }, [clockIn, clockOut, lunchMins, individualMins, groupConcurrentMins]);

    const clockOutStats = useMemo(() => {
        const inM = parseTimeToMins(targetIn);
        const lunch = Math.max(0, parseFloat(targetLunch) || 0);
        const billable = Math.max(0, parseFloat(billableTotal) || 0);
        const pct = Math.max(1, Math.min(100, parseFloat(targetPct) || 85));

        const requiredPaidMins = billable / (pct / 100);
        const totalShiftSpan = requiredPaidMins + lunch;
        const clockOutText = formatMinsAsClock(inM + totalShiftSpan);

        return { requiredPaidMins, totalShiftSpan, clockOutText };
    }, [targetIn, targetLunch, billableTotal, targetPct]);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
                <button
                    type="button"
                    onClick={() => setMode("daily")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                        mode === "daily"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                            : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                >
                    Daily Rehab Productivity &amp; 25% Cap
                </button>
                <button
                    type="button"
                    onClick={() => setMode("clockout")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                        mode === "clockout"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                            : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                >
                    Target Clock-Out Time Solver
                </button>
            </div>

            {mode === "daily" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                                Shift &amp; Lunch Break
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Clock-In Time</label>
                                <input
                                    type="time"
                                    value={clockIn}
                                    onChange={(e) => setClockIn(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Clock-Out Time</label>
                                <input
                                    type="time"
                                    value={clockOut}
                                    onChange={(e) => setClockOut(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Unpaid Lunch (mins)</label>
                                <input
                                    type="number"
                                    value={lunchMins}
                                    onChange={(e) => setLunchMins(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                            <div className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                                Billable Patient Minutes
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">1-on-1 Individual Mins</label>
                                <input
                                    type="number"
                                    value={individualMins}
                                    onChange={(e) => setIndividualMins(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">Group + Concurrent Mins</label>
                                <input
                                    type="number"
                                    value={groupConcurrentMins}
                                    onChange={(e) => setGroupConcurrentMins(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                            <div className="text-xs text-slate-400 pt-1">
                                Total Billable: <span className="font-mono text-white font-bold">{dailyStats.totalBillable} mins</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                Rehab Productivity
                            </span>
                            <span className="text-4xl font-mono font-extrabold text-emerald-400">
                                {dailyStats.productivityPct.toFixed(1)}%
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Net Paid Shift</span>
                            <span className="font-mono font-semibold text-white">
                                {dailyStats.netPaidMins} mins ({(dailyStats.netPaidMins / 60).toFixed(2)} hrs)
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Non-Billable Doc Time</span>
                            <span className="font-mono font-semibold text-amber-300">
                                {dailyStats.nonBillableMins} mins
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-800">
                            <span className="text-slate-400">Group/Concurrent Share</span>
                            <span
                                className={`font-mono font-bold ${
                                    dailyStats.pdpmCompliant ? "text-emerald-300" : "text-rose-400"
                                }`}
                            >
                                {dailyStats.gcShare.toFixed(1)}% {dailyStats.pdpmCompliant ? "(≤ 25% OK)" : "(> 25% CAP!)"}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-slate-300 mb-1">Clock-In Time</label>
                            <input
                                type="time"
                                value={targetIn}
                                onChange={(e) => setTargetIn(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-300 mb-1">Unpaid Lunch (mins)</label>
                            <input
                                type="number"
                                value={targetLunch}
                                onChange={(e) => setTargetLunch(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-300 mb-1">Completed Billable Mins</label>
                            <input
                                type="number"
                                value={billableTotal}
                                onChange={(e) => setBillableTotal(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-300 mb-1">Target Productivity (%)</label>
                            <input
                                type="number"
                                value={targetPct}
                                onChange={(e) => setTargetPct(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                Target Clock-Out Time
                            </span>
                            <span className="text-4xl font-mono font-extrabold text-cyan-300">
                                {clockOutStats.clockOutText}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Allowed Paid Shift</span>
                            <span className="font-mono font-semibold text-white">
                                {Math.round(clockOutStats.requiredPaidMins)} mins ({(clockOutStats.requiredPaidMins / 60).toFixed(2)} hrs)
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Total On-Site Span</span>
                            <span className="font-mono font-semibold text-emerald-300">
                                {Math.round(clockOutStats.totalShiftSpan)} mins (incl. lunch)
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
