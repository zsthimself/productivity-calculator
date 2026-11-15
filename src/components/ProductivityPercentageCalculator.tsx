/**
 * [INPUT]: React useState/useMemo, lucide-react icons, Next/Link
 * [OUTPUT]: ProductivityPercentageCalculator component for /calculator/productivity-percentage
 * [POS]: 通用生产力百分比计算引擎：三模式计算（含午休扣除的工时百分比、目标百分比反推下班时间、实际产出与配额达成百分比）
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Clock, Copy, Percent, RotateCcw, Target, TrendingUp } from "lucide-react";

type Mode = "time_pct" | "target_clockout" | "quota_pct";

function minutesToClockLabel(totalMins: number): string {
    const wrapped = ((Math.round(totalMins) % 1440) + 1440) % 1440;
    const h24 = Math.floor(wrapped / 60);
    const m = wrapped % 60;
    const period = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

function parseTimeToMins(timeStr: string): number {
    const parts = timeStr.split(":");
    if (parts.length !== 2) return 480;
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    return h * 60 + m;
}

export default function ProductivityPercentageCalculator() {
    const [mode, setMode] = useState<Mode>("time_pct");
    const [copied, setCopied] = useState(false);

    // Mode 1: Time-Based Productivity Percentage (with Lunch Break)
    const [shiftHours, setShiftHours] = useState("8.5");
    const [lunchMinutes, setLunchMinutes] = useState("30");
    const [productiveMinutes, setProductiveMinutes] = useState("408");
    const [targetPercent, setTargetPercent] = useState("85");

    // Mode 2: Target Productivity % Clock-Out Planner
    const [clockInTime, setClockInTime] = useState("08:00");
    const [completedMins, setCompletedMins] = useState("408");
    const [goalPct, setGoalPct] = useState("85");
    const [clockLunchMins, setClockLunchMins] = useState("30");

    // Mode 3: Output vs. Target Quota Percentage
    const [actualOutput, setActualOutput] = useState("138");
    const [targetQuota, setTargetQuota] = useState("120");
    const [quotaUnitLabel, setQuotaUnitLabel] = useState("units");

    const timeResult = useMemo(() => {
        const grossMins = Math.max(1, (parseFloat(shiftHours) || 0) * 60);
        const lunch = Math.max(0, parseFloat(lunchMinutes) || 0);
        const netPaidMins = Math.max(1, grossMins - lunch);
        const prod = Math.max(0, parseFloat(productiveMinutes) || 0);
        const target = Math.max(1, parseFloat(targetPercent) || 85);

        const pct = (prod / netPaidMins) * 100;
        const nonProdMins = Math.max(0, netPaidMins - prod);
        const requiredProdMins = (netPaidMins * target) / 100;
        const varianceMins = prod - requiredProdMins;

        return {
            grossMins,
            lunch,
            netPaidMins,
            prod,
            pct,
            nonProdMins,
            requiredProdMins,
            varianceMins,
            target,
        };
    }, [shiftHours, lunchMinutes, productiveMinutes, targetPercent]);

    const clockResult = useMemo(() => {
        const startMins = parseTimeToMins(clockInTime);
        const prod = Math.max(0, parseFloat(completedMins) || 0);
        const pct = Math.max(1, Math.min(200, parseFloat(goalPct) || 85));
        const lunch = Math.max(0, parseFloat(clockLunchMins) || 0);

        const allowedPaidMins = (prod / pct) * 100;
        const totalOnSiteMins = allowedPaidMins + lunch;
        const clockOutMins = startMins + totalOnSiteMins;
        const nonProdAllowance = Math.max(0, allowedPaidMins - prod);

        return {
            allowedPaidMins,
            totalOnSiteMins,
            clockOutLabel: minutesToClockLabel(clockOutMins),
            nonProdAllowance,
        };
    }, [clockInTime, completedMins, goalPct, clockLunchMins]);

    const quotaResult = useMemo(() => {
        const actual = Math.max(0, parseFloat(actualOutput) || 0);
        const target = Math.max(0.0001, parseFloat(targetQuota) || 1);
        const pct = (actual / target) * 100;
        const variance = actual - target;
        const tier =
            pct >= 110 ? "Exceeding Target" : pct >= 95 ? "On Target" : pct >= 80 ? "Near Target" : "Below Target";

        return { actual, target, pct, variance, tier };
    }, [actualOutput, targetQuota]);

    const handleCopy = () => {
        let summary = "";
        if (mode === "time_pct") {
            summary = `Productivity Percentage: ${timeResult.pct.toFixed(1)}% (${timeResult.prod.toFixed(0)} productive mins / ${timeResult.netPaidMins.toFixed(0)} net paid mins after ${timeResult.lunch.toFixed(0)}m lunch)`;
        } else if (mode === "target_clockout") {
            summary = `Target Clock-Out: ${clockResult.clockOutLabel} for ${goalPct}% productivity (${completedMins} productive mins + ${clockLunchMins}m lunch)`;
        } else {
            summary = `Output Quota Productivity: ${quotaResult.pct.toFixed(1)}% (${quotaResult.actual} / ${quotaResult.target} ${quotaUnitLabel})`;
        }
        navigator.clipboard?.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    const handleReset = () => {
        setShiftHours("8.5");
        setLunchMinutes("30");
        setProductiveMinutes("408");
        setTargetPercent("85");
        setClockInTime("08:00");
        setCompletedMins("408");
        setGoalPct("85");
        setClockLunchMins("30");
        setActualOutput("138");
        setTargetQuota("120");
        setQuotaUnitLabel("units");
    };

    return (
        <div className="glass-card rounded-2xl p-6 md:p-8 neon-border relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setMode("time_pct")}
                        className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
                            mode === "time_pct"
                                ? "bg-[var(--neon-cyan)] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                                : "bg-white/5 text-[var(--text-secondary)] hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                    >
                        <Percent className="w-4 h-4" />
                        <span>Shift &amp; Lunch %</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("target_clockout")}
                        className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
                            mode === "target_clockout"
                                ? "bg-[var(--neon-cyan)] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                                : "bg-white/5 text-[var(--text-secondary)] hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                    >
                        <Clock className="w-4 h-4" />
                        <span>Target Clock-Out</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("quota_pct")}
                        className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
                            mode === "quota_pct"
                                ? "bg-[var(--neon-cyan)] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                                : "bg-white/5 text-[var(--text-secondary)] hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                    >
                        <Target className="w-4 h-4" />
                        <span>Output vs. Quota %</span>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 transition-colors"
                        title="Reset defaults"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                    </button>
                </div>
            </div>

            {mode === "time_pct" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                    Total Shift Length (Hours)
                                </label>
                                <input
                                    type="number"
                                    step="0.25"
                                    min="0.5"
                                    value={shiftHours}
                                    onChange={(e) => setShiftHours(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                    Unpaid Lunch Break (Minutes)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="120"
                                    value={lunchMinutes}
                                    onChange={(e) => setLunchMinutes(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                                />
                                <div className="flex gap-1.5 mt-2">
                                    {["0", "30", "45", "60"].map((m) => (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => setLunchMinutes(m)}
                                            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
                                                lunchMinutes === m
                                                    ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)]"
                                                    : "border-white/10 bg-white/5 text-[var(--text-muted)] hover:text-white"
                                            }`}
                                        >
                                            {m}m
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                    Productive / Billable Minutes
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={productiveMinutes}
                                    onChange={(e) => setProductiveMinutes(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                    Target Benchmark (%)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="150"
                                    value={targetPercent}
                                    onChange={(e) => setTargetPercent(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 rounded-2xl bg-slate-950/80 border border-white/10 p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                                Productivity Percentage
                            </span>
                            <span
                                className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                                    timeResult.pct >= timeResult.target
                                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                        : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                                }`}
                            >
                                {timeResult.pct >= timeResult.target ? "Target Met" : "Below Target"}
                            </span>
                        </div>
                        <div className="text-4xl md:text-5xl font-display font-bold text-gradient font-mono">
                            {timeResult.pct.toFixed(1)}%
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
                            <div>
                                <div className="text-[var(--text-muted)]">Net Paid Shift</div>
                                <div className="text-white font-mono font-semibold mt-0.5">
                                    {timeResult.netPaidMins.toFixed(0)} mins ({(timeResult.netPaidMins / 60).toFixed(2)}h)
                                </div>
                            </div>
                            <div>
                                <div className="text-[var(--text-muted)]">Non-Billable Buffer</div>
                                <div className="text-white font-mono font-semibold mt-0.5">
                                    {timeResult.nonProdMins.toFixed(0)} mins
                                </div>
                            </div>
                            <div>
                                <div className="text-[var(--text-muted)]">Target ({timeResult.target}%)</div>
                                <div className="text-white font-mono font-semibold mt-0.5">
                                    {timeResult.requiredProdMins.toFixed(0)} mins
                                </div>
                            </div>
                            <div>
                                <div className="text-[var(--text-muted)]">Variance</div>
                                <div
                                    className={`font-mono font-semibold mt-0.5 ${
                                        timeResult.varianceMins >= 0 ? "text-emerald-400" : "text-rose-400"
                                    }`}
                                >
                                    {timeResult.varianceMins >= 0 ? "+" : ""}
                                    {timeResult.varianceMins.toFixed(0)} mins
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mode === "target_clockout" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                Shift Clock-In Time
                            </label>
                            <input
                                type="time"
                                value={clockInTime}
                                onChange={(e) => setClockInTime(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                Productive / Billable Minutes
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={completedMins}
                                onChange={(e) => setCompletedMins(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                Target Productivity (%)
                            </label>
                            <input
                                type="number"
                                min="10"
                                max="150"
                                value={goalPct}
                                onChange={(e) => setGoalPct(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                Unpaid Lunch Break (Minutes)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="120"
                                value={clockLunchMins}
                                onChange={(e) => setClockLunchMins(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-5 rounded-2xl bg-slate-950/80 border border-white/10 p-5 space-y-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                            Target Clock-Out Time
                        </div>
                        <div className="text-4xl md:text-5xl font-display font-bold text-gradient font-mono">
                            {clockResult.clockOutLabel}
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
                            <div>
                                <div className="text-[var(--text-muted)]">Paid Shift Window</div>
                                <div className="text-white font-mono font-semibold mt-0.5">
                                    {(clockResult.allowedPaidMins / 60).toFixed(2)} hrs ({clockResult.allowedPaidMins.toFixed(0)}m)
                                </div>
                            </div>
                            <div>
                                <div className="text-[var(--text-muted)]">Admin / Doc Margin</div>
                                <div className="text-white font-mono font-semibold mt-0.5">
                                    {clockResult.nonProdAllowance.toFixed(0)} mins
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mode === "quota_pct" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                Actual Output
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={actualOutput}
                                onChange={(e) => setActualOutput(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                Target Quota
                            </label>
                            <input
                                type="number"
                                min="0.01"
                                value={targetQuota}
                                onChange={(e) => setTargetQuota(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                                Unit Label
                            </label>
                            <input
                                type="text"
                                value={quotaUnitLabel}
                                onChange={(e) => setQuotaUnitLabel(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-5 rounded-2xl bg-slate-950/80 border border-white/10 p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                                Quota Attainment %
                            </span>
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30">
                                {quotaResult.tier}
                            </span>
                        </div>
                        <div className="text-4xl md:text-5xl font-display font-bold text-gradient font-mono">
                            {quotaResult.pct.toFixed(1)}%
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] pt-2 border-t border-white/10 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>
                                Variance:{" "}
                                <strong className="text-white font-mono">
                                    {quotaResult.variance >= 0 ? "+" : ""}
                                    {quotaResult.variance.toFixed(1)} {quotaUnitLabel}
                                </strong>{" "}
                                vs. quota
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
                <span>100% client-side calculation. Zero data leaves your browser.</span>
                <div className="flex flex-wrap gap-3">
                    <Link href="/calculator/physical-therapy" className="text-[var(--neon-cyan)] hover:underline">
                        PT &amp; Rehab Suite →
                    </Link>
                    <Link href="/calculator/time-efficiency" className="text-[var(--neon-cyan)] hover:underline">
                        Time Efficiency →
                    </Link>
                </div>
            </div>
        </div>
    );
}
