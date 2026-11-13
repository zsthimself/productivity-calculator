/**
 * [INPUT]: React useState/useMemo, lucide-react icons, Next/Link
 * [OUTPUT]: TimeEfficiencyCalculator component for /calculator/time-efficiency
 * [POS]: 时间效率与工时利用率三模式核心计算引擎：标准/实际工时比、班次有效利用率、团队流程提效年化收益对比
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Clock, Copy, Gauge, RotateCcw, TrendingUp, Users } from "lucide-react";

type Mode = "cycle_ratio" | "shift_utilization" | "workflow_savings";
type TimeUnit = "minutes" | "hours";

interface CyclePreset {
  label: string;
  standard: string;
  actual: string;
  units: string;
  unitType: TimeUnit;
}

const CYCLE_PRESETS: CyclePreset[] = [
  { label: "Fast Task (45m vs 36m)", standard: "45", actual: "36", units: "12", unitType: "minutes" },
  { label: "CNC Batch (120m vs 135m)", standard: "120", actual: "135", units: "8", unitType: "minutes" },
  { label: "Sprint Story (16h vs 14h)", standard: "16", actual: "14", units: "4", unitType: "hours" },
];

function formatHours(hours: number): string {
  const sign = hours < 0 ? "-" : "";
  const abs = Math.abs(hours);
  const wholeH = Math.floor(abs);
  const mins = Math.round((abs - wholeH) * 60);
  if (mins === 60) {
    return `${sign}${wholeH + 1}h 00m`;
  }
  return `${sign}${wholeH}h ${mins.toString().padStart(2, "0")}m`;
}

function classifyEfficiency(pct: number): { label: string; badgeClass: string } {
  if (pct >= 110) {
    return {
      label: "Elite Pace (≥110%)",
      badgeClass: "bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] border-[var(--neon-cyan)]/40",
    };
  }
  if (pct >= 95) {
    return {
      label: "Optimal Target (95–109%)",
      badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-400/40",
    };
  }
  if (pct >= 75) {
    return {
      label: "Moderate / Recoverable (75–94%)",
      badgeClass: "bg-amber-500/15 text-amber-300 border-amber-400/40",
    };
  }
  return {
    label: "Bottleneck Alert (<75%)",
    badgeClass: "bg-rose-500/15 text-rose-300 border-rose-400/40",
  };
}

export default function TimeEfficiencyCalculator() {
  const [mode, setMode] = useState<Mode>("cycle_ratio");
  const [copied, setCopied] = useState(false);

  // Mode 1: Task / Cycle Efficiency
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("minutes");
  const [standardTime, setStandardTime] = useState<string>("45");
  const [actualTime, setActualTime] = useState<string>("36");
  const [tasksCompleted, setTasksCompleted] = useState<string>("12");

  // Mode 2: Shift Utilization
  const [scheduledHours, setScheduledHours] = useState<string>("8");
  const [breakDowntimeMins, setBreakDowntimeMins] = useState<string>("45");
  const [adminOverheadMins, setAdminOverheadMins] = useState<string>("35");
  const [hourlyRate, setHourlyRate] = useState<string>("48");

  // Mode 3: Team Workflow Improvement Savings
  const [beforeMins, setBeforeMins] = useState<string>("28");
  const [afterMins, setAfterMins] = useState<string>("19");
  const [dailyVolume, setDailyVolume] = useState<string>("40");
  const [teamCount, setTeamCount] = useState<string>("6");
  const [workDaysYear, setWorkDaysYear] = useState<string>("250");
  const [blendedWage, setBlendedWage] = useState<string>("42");

  const cycleMetrics = useMemo(() => {
    const std = Math.max(0, parseFloat(standardTime) || 0);
    const act = Math.max(0, parseFloat(actualTime) || 0);
    const count = Math.max(1, parseFloat(tasksCompleted) || 1);

    const efficiencyPct = act > 0 && std > 0 ? (std / act) * 100 : 0;
    const variancePerTask = std - act;
    const totalVariance = variancePerTask * count;
    const totalStdHours = ((std * count) / (timeUnit === "minutes" ? 60 : 1));
    const totalActHours = ((act * count) / (timeUnit === "minutes" ? 60 : 1));
    const netHoursDelta = totalStdHours - totalActHours;
    const status = classifyEfficiency(efficiencyPct);

    return {
      std,
      act,
      count,
      efficiencyPct,
      variancePerTask,
      totalVariance,
      totalStdHours,
      totalActHours,
      netHoursDelta,
      status,
    };
  }, [standardTime, actualTime, tasksCompleted, timeUnit]);

  const shiftMetrics = useMemo(() => {
    const paidHrs = Math.max(0.25, parseFloat(scheduledHours) || 0.25);
    const downtimeHrs = Math.max(0, parseFloat(breakDowntimeMins) || 0) / 60;
    const overheadHrs = Math.max(0, parseFloat(adminOverheadMins) || 0) / 60;
    const wage = Math.max(0, parseFloat(hourlyRate) || 0);

    const nonProductiveHrs = Math.min(paidHrs, downtimeHrs + overheadHrs);
    const productiveHrs = Math.max(0, paidHrs - nonProductiveHrs);
    const utilizationPct = (productiveHrs / paidHrs) * 100;
    const idlePct = 100 - utilizationPct;
    const effectiveCostPerProductiveHr = productiveHrs > 0 ? (paidHrs * wage) / productiveHrs : 0;
    const weeklyProductiveHrs = productiveHrs * 5;
    const weeklyLeakageCost = nonProductiveHrs * 5 * wage;

    return {
      paidHrs,
      productiveHrs,
      nonProductiveHrs,
      utilizationPct,
      idlePct,
      effectiveCostPerProductiveHr,
      weeklyProductiveHrs,
      weeklyLeakageCost,
      status: classifyEfficiency(utilizationPct),
    };
  }, [scheduledHours, breakDowntimeMins, adminOverheadMins, hourlyRate]);

  const savingsMetrics = useMemo(() => {
    const before = Math.max(0.1, parseFloat(beforeMins) || 0.1);
    const after = Math.max(0.1, parseFloat(afterMins) || 0.1);
    const volume = Math.max(1, parseFloat(dailyVolume) || 1);
    const team = Math.max(1, parseFloat(teamCount) || 1);
    const days = Math.max(1, parseFloat(workDaysYear) || 1);
    const wage = Math.max(0, parseFloat(blendedWage) || 0);

    const speedRatioPct = (before / after) * 100;
    const cycleReductionPct = ((before - after) / before) * 100;
    const minsSavedPerTask = before - after;
    const dailyTeamHoursSaved = (minsSavedPerTask * volume * team) / 60;
    const annualHoursSaved = dailyTeamHoursSaved * days;
    const fteEquivalent = annualHoursSaved / (days * 8);
    const annualDollarSavings = annualHoursSaved * wage;

    return {
      speedRatioPct,
      cycleReductionPct,
      minsSavedPerTask,
      dailyTeamHoursSaved,
      annualHoursSaved,
      fteEquivalent,
      annualDollarSavings,
    };
  }, [beforeMins, afterMins, dailyVolume, teamCount, workDaysYear, blendedWage]);

  const handleReset = () => {
    setTimeUnit("minutes");
    setStandardTime("45");
    setActualTime("36");
    setTasksCompleted("12");
    setScheduledHours("8");
    setBreakDowntimeMins("45");
    setAdminOverheadMins("35");
    setHourlyRate("48");
    setBeforeMins("28");
    setAfterMins("19");
    setDailyVolume("40");
    setTeamCount("6");
    setWorkDaysYear("250");
    setBlendedWage("42");
  };

  const handleCopySummary = async () => {
    let text = "";
    if (mode === "cycle_ratio") {
      text = [
        "Time Efficiency Calculator Summary (Cycle Ratio)",
        `Standard Time: ${cycleMetrics.std} ${timeUnit} | Actual Time: ${cycleMetrics.act} ${timeUnit}`,
        `Time Efficiency: ${cycleMetrics.efficiencyPct.toFixed(1)}% (${cycleMetrics.status.label})`,
        `Batch (${cycleMetrics.count} tasks): ${cycleMetrics.totalStdHours.toFixed(2)}h standard vs ${cycleMetrics.totalActHours.toFixed(2)}h actual`,
        `Net Time Delta: ${formatHours(cycleMetrics.netHoursDelta)}`,
      ].join("\n");
    } else if (mode === "shift_utilization") {
      text = [
        "Time Efficiency Summary (Shift Utilization)",
        `Scheduled Shift: ${shiftMetrics.paidHrs.toFixed(2)} hrs`,
        `Productive Time: ${shiftMetrics.productiveHrs.toFixed(2)} hrs (${shiftMetrics.utilizationPct.toFixed(1)}%)`,
        `Non-Productive Drag: ${shiftMetrics.nonProductiveHrs.toFixed(2)} hrs (${shiftMetrics.idlePct.toFixed(1)}%)`,
        `Effective Cost / Productive Hr: $${shiftMetrics.effectiveCostPerProductiveHr.toFixed(2)}`,
      ].join("\n");
    } else {
      text = [
        "Time Efficiency Summary (Team Workflow Gains)",
        `Cycle Speedup: ${savingsMetrics.speedRatioPct.toFixed(1)}% (${savingsMetrics.cycleReductionPct.toFixed(1)}% shorter cycle)`,
        `Daily Team Hours Saved: ${savingsMetrics.dailyTeamHoursSaved.toFixed(2)} hrs/day`,
        `Annual Hours Recovered: ${Math.round(savingsMetrics.annualHoursSaved).toLocaleString()} hrs (${savingsMetrics.fteEquivalent.toFixed(2)} FTE)`,
        `Estimated Annual Savings: $${Math.round(savingsMetrics.annualDollarSavings).toLocaleString()}`,
      ].join("\n");
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-neon rounded-2xl p-6 md:p-8 space-y-6">
        {/* Mode Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
          <button
            type="button"
            onClick={() => setMode("cycle_ratio")}
            className={`flex-1 min-w-[175px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-display font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "cycle_ratio"
                ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_18px_rgba(0,255,242,0.3)]"
                : "text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <Gauge className="w-4 h-4" />
            Task Cycle Efficiency
          </button>
          <button
            type="button"
            onClick={() => setMode("shift_utilization")}
            className={`flex-1 min-w-[175px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-display font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "shift_utilization"
                ? "bg-[var(--neon-pink)] text-white shadow-[0_0_18px_rgba(255,42,133,0.3)]"
                : "text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            Shift Utilization
          </button>
          <button
            type="button"
            onClick={() => setMode("workflow_savings")}
            className={`flex-1 min-w-[175px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-display font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "workflow_savings"
                ? "bg-emerald-400 text-black shadow-[0_0_18px_rgba(52,211,153,0.3)]"
                : "text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            Team Hours Saved
          </button>
        </div>

        {/* Mode 1: Standard vs Actual Task Cycle Efficiency */}
        {mode === "cycle_ratio" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {CYCLE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setStandardTime(preset.standard);
                      setActualTime(preset.actual);
                      setTasksCompleted(preset.units);
                      setTimeUnit(preset.unitType);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--neon-cyan)] transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="inline-flex rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] p-1 text-xs font-mono">
                {(["minutes", "hours"] as TimeUnit[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setTimeUnit(u)}
                    className={`px-3 py-1 rounded-md capitalize transition-colors cursor-pointer ${
                      timeUnit === u ? "bg-[var(--neon-cyan)] text-black font-bold" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Standard / Allowed Time ({timeUnit})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={standardTime}
                  onChange={(e) => setStandardTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Actual Time Spent ({timeUnit})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={actualTime}
                  onChange={(e) => setActualTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Tasks / Units in Batch
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={tasksCompleted}
                  onChange={(e) => setTasksCompleted(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-cyan)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--neon-cyan)]/40">
                <div className="text-xs font-mono uppercase text-[var(--neon-cyan)] mb-1">
                  Time Efficiency Score
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-white tabular-nums">
                  {cycleMetrics.efficiencyPct.toFixed(1)}%
                </div>
                <div className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${cycleMetrics.status.badgeClass}`}>
                  {cycleMetrics.status.label}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                  Variance Per Unit
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-white tabular-nums">
                  {cycleMetrics.variancePerTask >= 0 ? "+" : ""}
                  {cycleMetrics.variancePerTask.toFixed(1)} {timeUnit === "minutes" ? "min" : "hr"}
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-2">
                  {cycleMetrics.variancePerTask >= 0 ? "Saved vs. standard budget" : "Overrun vs. standard budget"}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                  Net Batch Capacity Delta
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-emerald-300 tabular-nums">
                  {cycleMetrics.netHoursDelta >= 0 ? "+" : ""}
                  {formatHours(cycleMetrics.netHoursDelta)}
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-2 tabular-nums">
                  {cycleMetrics.totalStdHours.toFixed(2)}h budgeted vs. {cycleMetrics.totalActHours.toFixed(2)}h actual
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: Shift Utilization */}
        {mode === "shift_utilization" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Paid Shift Length (hrs)
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.25"
                  value={scheduledHours}
                  onChange={(e) => setScheduledHours(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-pink)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Breaks / Idle Delay (min)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={breakDowntimeMins}
                  onChange={(e) => setBreakDowntimeMins(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-pink)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Meetings / Setup Overhead (min)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={adminOverheadMins}
                  onChange={(e) => setAdminOverheadMins(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-pink)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Loaded Hourly Cost ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-[var(--neon-pink)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--neon-pink)]/40">
                <div className="text-xs font-mono uppercase text-[var(--neon-pink)] mb-1">
                  Shift Time Efficiency
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-white tabular-nums">
                  {shiftMetrics.utilizationPct.toFixed(1)}%
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-2 tabular-nums">
                  {shiftMetrics.productiveHrs.toFixed(2)} productive hrs / {shiftMetrics.paidHrs.toFixed(2)} paid hrs
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                  Effective Cost / Productive Hr
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-white tabular-nums">
                  ${shiftMetrics.effectiveCostPerProductiveHr.toFixed(2)}
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-2 tabular-nums">
                  vs. ${parseFloat(hourlyRate || "0").toFixed(2)} base rate ({shiftMetrics.idlePct.toFixed(1)}% drag)
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                  Weekly 5-Day Output Hours
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-[var(--neon-cyan)] tabular-nums">
                  {shiftMetrics.weeklyProductiveHrs.toFixed(1)} hrs
                </div>
                <div className="text-xs text-rose-300 mt-2 tabular-nums">
                  ${shiftMetrics.weeklyLeakageCost.toFixed(0)}/wk non-productive cost
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode 3: Team Workflow Savings */}
        {mode === "workflow_savings" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Current Cycle Time (min)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={beforeMins}
                  onChange={(e) => setBeforeMins(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  New Process Time (min)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={afterMins}
                  onChange={(e) => setAfterMins(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Tasks / Person / Day
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={dailyVolume}
                  onChange={(e) => setDailyVolume(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Team Members
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={teamCount}
                  onChange={(e) => setTeamCount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Workdays / Year
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={workDaysYear}
                  onChange={(e) => setWorkDaysYear(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Blended Hourly Rate ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={blendedWage}
                  onChange={(e) => setBlendedWage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-white font-mono text-lg focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-emerald-400/40">
                <div className="text-xs font-mono uppercase text-emerald-300 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Relative Efficiency Gain
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-white tabular-nums">
                  {savingsMetrics.speedRatioPct.toFixed(1)}%
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-2 tabular-nums">
                  {savingsMetrics.cycleReductionPct.toFixed(1)}% cycle time reduction ({savingsMetrics.minsSavedPerTask.toFixed(1)}m/task)
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                  Annual Capacity Freed
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-[var(--neon-cyan)] tabular-nums">
                  {Math.round(savingsMetrics.annualHoursSaved).toLocaleString()} hrs
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-2 tabular-nums">
                  {savingsMetrics.dailyTeamHoursSaved.toFixed(1)} hrs/day ≈ {savingsMetrics.fteEquivalent.toFixed(2)} FTE
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                  Annual Labor Value Saved
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-emerald-300 tabular-nums">
                  ${Math.round(savingsMetrics.annualDollarSavings).toLocaleString()}
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-2">
                  Reclaimed productive capacity
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Bar + Cross-Links */}
        <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[var(--text-muted)]">Related Suites:</span>
            <Link
              href="/calculator/labor"
              className="px-2.5 py-1 rounded-md bg-[var(--bg-elevated)] text-[var(--neon-cyan)] hover:underline"
            >
              Labor Productivity
            </Link>
            <Link
              href="/calculator/billing-units"
              className="px-2.5 py-1 rounded-md bg-[var(--bg-elevated)] text-[var(--neon-pink)] hover:underline"
            >
              8-Min Billing Units
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-lg text-xs font-mono bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-[var(--neon-cyan)] text-black hover:shadow-[0_0_15px_rgba(0,255,242,0.35)] flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied Summary" : "Copy Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
