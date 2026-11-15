/**
 * [INPUT]: React useState/useMemo 与 Tailwind 主题变量
 * [OUTPUT]: 导出 ProductivityLunchBreakCalculator 组件（三模式：班次午休扣减 %、目标下班倒推、五日周汇总）
 * [POS]: src/components/ProductivityLunchBreakCalculator.tsx 为 /calculator/productivity-with-lunch-break 提供交互引擎
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useMemo, useState } from "react";

type Mode = "shift" | "clockout" | "weekly";

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

export default function ProductivityLunchBreakCalculator() {
    const [mode, setMode] = useState<Mode>("shift");

    // Mode 1: Shift & Lunch Deduction
    const [clockIn, setClockIn] = useState("08:00");
    const [clockOut, setClockOut] = useState("16:30");
    const [lunchMins, setLunchMins] = useState("30");
    const [billableMins, setBillableMins] = useState("408");

    // Mode 2: Target Clock-Out Solver
    const [targetIn, setTargetIn] = useState("08:00");
    const [targetLunch, setTargetLunch] = useState("30");
    const [completedBillable, setCompletedBillable] = useState("408");
    const [targetPct, setTargetPct] = useState("85");

    // Mode 3: 5-Day Weekly Rollup
    const [dailyNetHours, setDailyNetHours] = useState("8.0");
    const [dailyLunchMins, setDailyLunchMins] = useState("30");
    const [weeklyBillableHrs, setWeeklyBillableHrs] = useState("34.0");
    const [workDays, setWorkDays] = useState("5");

    const shiftStats = useMemo(() => {
        const inM = parseTimeToMins(clockIn);
        let outM = parseTimeToMins(clockOut);
        if (outM < inM) outM += 1440; // Overnight shift support
        const grossMins = Math.max(0, outM - inM);
        const lunch = Math.max(0, parseFloat(lunchMins) || 0);
        const netPaidMins = Math.max(1, grossMins - lunch);
        const billable = Math.max(0, parseFloat(billableMins) || 0);
        const pct = (billable / netPaidMins) * 100;
        const nonBillable = Math.max(0, netPaidMins - billable);
        return {
            grossMins,
            lunch,
            netPaidMins,
            netPaidHours: (netPaidMins / 60).toFixed(2),
            billable,
            nonBillable,
            pct: pct.toFixed(1),
            tier: pct >= 90 ? "High Output" : pct >= 80 ? "Healthy Target" : pct >= 70 ? "Moderate" : "Below Benchmark",
        };
    }, [clockIn, clockOut, lunchMins, billableMins]);

    const clockOutStats = useMemo(() => {
        const inM = parseTimeToMins(targetIn);
        const lunch = Math.max(0, parseFloat(targetLunch) || 0);
        const billable = Math.max(0, parseFloat(completedBillable) || 0);
        const pctDec = Math.max(0.05, (parseFloat(targetPct) || 85) / 100);
        const allowedPaidMins = billable / pctDec;
        const totalSpanMins = allowedPaidMins + lunch;
        const outTimeMins = inM + totalSpanMins;
        const rolledNextDay = outTimeMins >= 1440;
        return {
            allowedPaidMins: Math.round(allowedPaidMins),
            allowedPaidHours: (allowedPaidMins / 60).toFixed(2),
            totalSpanMins: Math.round(totalSpanMins),
            targetClockOut: formatMinsAsClock(outTimeMins),
            rolledNextDay,
        };
    }, [targetIn, targetLunch, completedBillable, targetPct]);

    const weeklyStats = useMemo(() => {
        const days = Math.max(1, parseFloat(workDays) || 5);
        const netHrsDay = Math.max(0.5, parseFloat(dailyNetHours) || 8);
        const lunchDay = Math.max(0, parseFloat(dailyLunchMins) || 0);
        const totalNetPaidHrs = days * netHrsDay;
        const totalLunchHrs = (days * lunchDay) / 60;
        const totalGrossSiteHrs = totalNetPaidHrs + totalLunchHrs;
        const billableHrs = Math.max(0, parseFloat(weeklyBillableHrs) || 0);
        const weeklyPct = (billableHrs / totalNetPaidHrs) * 100;
        return {
            totalNetPaidHrs: totalNetPaidHrs.toFixed(2),
            totalLunchHrs: totalLunchHrs.toFixed(2),
            totalGrossSiteHrs: totalGrossSiteHrs.toFixed(2),
            weeklyPct: weeklyPct.toFixed(1),
        };
    }, [dailyNetHours, dailyLunchMins, weeklyBillableHrs, workDays]);

    return (
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Mode Switcher */}
            <div className="flex flex-wrap gap-2 mb-6 pb-5 border-b border-[var(--border-color)]">
                {[
                    { id: "shift" as Mode, label: "1. Shift & Lunch Deduction %" },
                    { id: "clockout" as Mode, label: "2. Target Clock-Out Solver" },
                    { id: "weekly" as Mode, label: "3. Weekly Lunch & Net Rollup" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMode(tab.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            mode === tab.id
                                ? "bg-[var(--neon-cyan)] text-slate-950 shadow-md"
                                : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {mode === "shift" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Clock-In Time
                                </label>
                                <input
                                    type="time"
                                    value={clockIn}
                                    onChange={(e) => setClockIn(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Clock-Out Time
                                </label>
                                <input
                                    type="time"
                                    value={clockOut}
                                    onChange={(e) => setClockOut(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Unpaid Lunch Break (Minutes)
                            </label>
                            <div className="flex flex-wrap gap-2 items-center">
                                <input
                                    type="number"
                                    min="0"
                                    max="180"
                                    value={lunchMins}
                                    onChange={(e) => setLunchMins(e.target.value)}
                                    className="w-32 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                                />
                                {[0, 30, 45, 60].map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => setLunchMins(String(preset))}
                                        className="px-3 py-2 rounded-lg text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 cursor-pointer"
                                    >
                                        {preset} min
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Productive / Billable Minutes Completed
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={billableMins}
                                onChange={(e) => setBillableMins(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Net Productivity %</span>
                            <span className="text-4xl font-mono font-extrabold text-[var(--neon-cyan)]">{shiftStats.pct}%</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-slate-950/60 p-3 rounded-xl">
                                <div className="text-xs text-slate-400">Net Paid Shift</div>
                                <div className="font-mono font-bold text-white text-base">{shiftStats.netPaidMins} min ({shiftStats.netPaidHours}h)</div>
                            </div>
                            <div className="bg-slate-950/60 p-3 rounded-xl">
                                <div className="text-xs text-slate-400">Gross Clock Span</div>
                                <div className="font-mono font-bold text-slate-200 text-base">{shiftStats.grossMins} min</div>
                            </div>
                            <div className="bg-slate-950/60 p-3 rounded-xl">
                                <div className="text-xs text-slate-400">Non-Billable Paid</div>
                                <div className="font-mono font-bold text-amber-300 text-base">{shiftStats.nonBillable} min</div>
                            </div>
                            <div className="bg-slate-950/60 p-3 rounded-xl">
                                <div className="text-xs text-slate-400">Benchmark Tier</div>
                                <div className="font-semibold text-emerald-400 text-base">{shiftStats.tier}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mode === "clockout" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Shift Clock-In Time
                                </label>
                                <input
                                    type="time"
                                    value={targetIn}
                                    onChange={(e) => setTargetIn(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Unpaid Lunch Break (Mins)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={targetLunch}
                                    onChange={(e) => setTargetLunch(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Billable Minutes Delivered
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={completedBillable}
                                    onChange={(e) => setCompletedBillable(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Target Productivity (%)
                                </label>
                                <input
                                    type="number"
                                    min="10"
                                    max="150"
                                    value={targetPct}
                                    onChange={(e) => setTargetPct(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Target Clock-Out</span>
                            <span className="text-3xl font-mono font-extrabold text-emerald-400">
                                {clockOutStats.targetClockOut}
                                {clockOutStats.rolledNextDay ? " (+1d)" : ""}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-slate-950/60 p-3 rounded-xl">
                                <div className="text-xs text-slate-400">Allowed Paid Time</div>
                                <div className="font-mono font-bold text-white">{clockOutStats.allowedPaidMins} min ({clockOutStats.allowedPaidHours}h)</div>
                            </div>
                            <div className="bg-slate-950/60 p-3 rounded-xl">
                                <div className="text-xs text-slate-400">Total On-Site Span</div>
                                <div className="font-mono font-bold text-cyan-300">{clockOutStats.totalSpanMins} min</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mode === "weekly" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Work Days per Week
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="7"
                                value={workDays}
                                onChange={(e) => setWorkDays(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Paid Hours / Day (Excl. Lunch)
                            </label>
                            <input
                                type="number"
                                step="0.25"
                                min="1"
                                value={dailyNetHours}
                                onChange={(e) => setDailyNetHours(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Daily Unpaid Lunch (Mins)
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={dailyLunchMins}
                                onChange={(e) => setDailyLunchMins(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Weekly Billable Hours
                            </label>
                            <input
                                type="number"
                                step="0.25"
                                min="0"
                                value={weeklyBillableHrs}
                                onChange={(e) => setWeeklyBillableHrs(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Weekly Net Productivity</span>
                            <span className="text-4xl font-mono font-extrabold text-[var(--neon-cyan)]">{weeklyStats.weeklyPct}%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5 text-xs">
                            <div className="bg-slate-950/60 p-3 rounded-xl">
                                <div className="text-slate-400">Net Paid Hrs</div>
                                <div className="font-mono font-bold text-white text-sm mt-0.5">{weeklyStats.totalNetPaidHrs}h</div>
                            </div>
                            <div className="bg-slate-950/60 p-3 rounded-xl">
                                <div className="text-slate-400">Unpaid Lunch</div>
                                <div className="font-mono font-bold text-amber-300 text-sm mt-0.5">{weeklyStats.totalLunchHrs}h</div>
                            </div>
                            <div className="bg-slate-950/60 p-3 rounded-xl">
                                <div className="text-slate-400">Total On-Site</div>
                                <div className="font-mono font-bold text-slate-200 text-sm mt-0.5">{weeklyStats.totalGrossSiteHrs}h</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
