/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 SalesProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的销售人效、管道流速与每小时产值计算引擎，承接 /calculator/sales 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Clock,
  Gauge,
  Sliders,
  DollarSign,
  Copy,
  Check,
  Sparkles,
  Activity,
  Users,
  Target,
  Zap,
} from "lucide-react";

type CalcMode = "quota_attainment" | "sales_velocity" | "sales_per_hour";

export function SalesProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("quota_attainment");
  const [copied, setCopied] = useState(false);

  // Mode 1: Quota Attainment & Rep Capacity
  const [repCount, setRepCount] = useState(8);
  const [quotaPerRep, setQuotaPerRep] = useState(650000);
  const [actualTotalRevenue, setActualTotalRevenue] = useState(4800000);
  const [rampEfficiencyPct, setRampEfficiencyPct] = useState(90);

  // Mode 2: Sales Pipeline Velocity
  const [qualifiedOpps, setQualifiedOpps] = useState(42);
  const [winRatePct, setWinRatePct] = useState(26.5);
  const [avgDealSize, setAvgDealSize] = useState(28500);
  const [salesCycleDays, setSalesCycleDays] = useState(64);

  // Mode 3: Sales Per Hour & Labor Efficiency
  const [periodRevenue, setPeriodRevenue] = useState(1200000);
  const [repsForHours, setRepsForHours] = useState(6);
  const [weeksEvaluated, setWeeksEvaluated] = useState(12);
  const [totalWorkHoursPerWeek] = useState(40);
  const [activeSellingTimePct, setActiveSellingTimePct] = useState(35);
  const [fullyLoadedRepCost, setFullyLoadedRepCost] = useState(135000);

  // Mode 1 Computations
  const mode1Stats = useMemo(() => {
    const reps = Math.max(1, repCount);
    const effectiveQuota = reps * quotaPerRep * Math.max(0.1, rampEfficiencyPct / 100);
    const actualRev = Math.max(0, actualTotalRevenue);
    const attainmentPct = effectiveQuota > 0 ? (actualRev / effectiveQuota) * 100 : 0;
    const revPerRep = actualRev / reps;
    const gapToQuota = actualRev - effectiveQuota;

    let performanceTier = "Balanced Attainment (Healthy)";
    let tierColor = "text-indigo-400";
    let badgeBg = "bg-indigo-500/10 border-indigo-500/30";

    if (attainmentPct >= 105) {
      performanceTier = "High Velocity (Presidents Club Tier)";
      tierColor = "text-emerald-400";
      badgeBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (attainmentPct < 80) {
      performanceTier = "Pipeline Capacity Deficit";
      tierColor = "text-rose-400";
      badgeBg = "bg-rose-500/10 border-rose-500/30";
    }

    return { reps, effectiveQuota, actualRev, attainmentPct, revPerRep, gapToQuota, performanceTier, tierColor, badgeBg };
  }, [repCount, quotaPerRep, actualTotalRevenue, rampEfficiencyPct]);

  // Mode 2 Computations
  const mode2Stats = useMemo(() => {
    const opps = Math.max(1, qualifiedOpps);
    const winRate = Math.max(0.1, winRatePct) / 100;
    const dealSize = Math.max(100, avgDealSize);
    const cycle = Math.max(1, salesCycleDays);

    const dailyVelocity = (opps * winRate * dealSize) / cycle;
    const monthlyVelocity = dailyVelocity * 30.417;
    const annualRunRate = dailyVelocity * 365;
    const expectedWonDeals = opps * winRate;

    let velocityTier = "Healthy Mid-Market Pace";
    let tierColor = "text-cyan-400";
    let badgeBg = "bg-cyan-500/10 border-cyan-500/30";

    if (cycle <= 45 && winRatePct >= 28) {
      velocityTier = "High-Velocity Engine";
      tierColor = "text-emerald-400";
      badgeBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (cycle > 90 || winRatePct < 20) {
      velocityTier = "Friction in Pipeline (Slow Cycle)";
      tierColor = "text-amber-400";
      badgeBg = "bg-amber-500/10 border-amber-500/30";
    }

    return { dailyVelocity, monthlyVelocity, annualRunRate, expectedWonDeals, velocityTier, tierColor, badgeBg };
  }, [qualifiedOpps, winRatePct, avgDealSize, salesCycleDays]);

  // Mode 3 Computations
  const mode3Stats = useMemo(() => {
    const reps = Math.max(1, repsForHours);
    const weeks = Math.max(1, weeksEvaluated);
    const rev = Math.max(0, periodRevenue);
    const totalHours = reps * weeks * totalWorkHoursPerWeek;
    const activeHours = totalHours * (Math.max(5, activeSellingTimePct) / 100);

    const grossPerHour = totalHours > 0 ? rev / totalHours : 0;
    const activePerHour = activeHours > 0 ? rev / activeHours : 0;
    const payroll = (fullyLoadedRepCost / 52) * weeks * reps;
    const multiplier = payroll > 0 ? rev / payroll : 0;
    const dragPct = rev > 0 ? (payroll / rev) * 100 : 0;

    let roiTier = "Strong Revenue Generation (4x-6x)";
    let tierColor = "text-emerald-400";
    let badgeBg = "bg-emerald-500/10 border-emerald-500/30";

    if (multiplier >= 6.0) {
      roiTier = "Exceptional Sales ROI (>6x OTE)";
      tierColor = "text-cyan-400";
      badgeBg = "bg-cyan-500/10 border-cyan-500/30";
    } else if (multiplier < 3.0) {
      roiTier = "High Rep Payroll Drag (<3x)";
      tierColor = "text-rose-400";
      badgeBg = "bg-rose-500/10 border-rose-500/30";
    }

    return { totalHours, activeHours, grossPerHour, activePerHour, payroll, multiplier, dragPct, roiTier, tierColor, badgeBg };
  }, [periodRevenue, repsForHours, weeksEvaluated, totalWorkHoursPerWeek, activeSellingTimePct, fullyLoadedRepCost]);

  // Presets
  const applyPreset = (preset: "smb_saas" | "enterprise_b2b" | "inside_sales" | "agency") => {
    if (preset === "smb_saas") {
      setRepCount(8); setQuotaPerRep(500000); setActualTotalRevenue(4200000); setRampEfficiencyPct(92);
      setQualifiedOpps(55); setWinRatePct(28.0); setAvgDealSize(14500); setSalesCycleDays(42);
      setPeriodRevenue(1050000); setRepsForHours(8); setWeeksEvaluated(13); setActiveSellingTimePct(38); setFullyLoadedRepCost(130000);
    } else if (preset === "enterprise_b2b") {
      setRepCount(5); setQuotaPerRep(1200000); setActualTotalRevenue(6200000); setRampEfficiencyPct(95);
      setQualifiedOpps(18); setWinRatePct(23.5); setAvgDealSize(88000); setSalesCycleDays(84);
      setPeriodRevenue(1550000); setRepsForHours(5); setWeeksEvaluated(13); setActiveSellingTimePct(32); setFullyLoadedRepCost(210000);
    } else if (preset === "inside_sales") {
      setRepCount(12); setQuotaPerRep(300000); setActualTotalRevenue(3300000); setRampEfficiencyPct(85);
      setQualifiedOpps(95); setWinRatePct(19.0); setAvgDealSize(5800); setSalesCycleDays(22);
      setPeriodRevenue(825000); setRepsForHours(12); setWeeksEvaluated(13); setActiveSellingTimePct(42); setFullyLoadedRepCost(95000);
    } else {
      setRepCount(4); setQuotaPerRep(850000); setActualTotalRevenue(3200000); setRampEfficiencyPct(90);
      setQualifiedOpps(14); setWinRatePct(31.0); setAvgDealSize(95000); setSalesCycleDays(105);
      setPeriodRevenue(800000); setRepsForHours(4); setWeeksEvaluated(13); setActiveSellingTimePct(34); setFullyLoadedRepCost(160000);
    }
  };

  const copyReport = () => {
    let report = "";
    if (mode === "quota_attainment") {
      report = `### Sales Productivity Audit - Quota Attainment
- Team Size: ${mode1Stats.reps} Reps
- Period Quota / Rep: $${quotaPerRep.toLocaleString()}
- Effective Team Target: $${mode1Stats.effectiveQuota.toLocaleString()}
- Actual Closed Revenue: $${mode1Stats.actualRev.toLocaleString()}
- Quota Attainment Rate: ${mode1Stats.attainmentPct.toFixed(1)}%
- Revenue per Rep: $${Math.round(mode1Stats.revPerRep).toLocaleString()}
- Quota Variance: ${mode1Stats.gapToQuota >= 0 ? "+" : ""}$${Math.round(mode1Stats.gapToQuota).toLocaleString()}
- Status: ${mode1Stats.performanceTier}`;
    } else if (mode === "sales_velocity") {
      report = `### Sales Pipeline Velocity Audit
- Qualified Pipeline Deals: ${qualifiedOpps} Opps
- Win Rate: ${winRatePct.toFixed(1)}%
- Average Deal Size (ACV): $${avgDealSize.toLocaleString()}
- Sales Cycle: ${salesCycleDays} Days
- Daily Sales Velocity: $${Math.round(mode2Stats.dailyVelocity).toLocaleString()}/day
- Monthly Velocity: $${Math.round(mode2Stats.monthlyVelocity).toLocaleString()}/mo
- Annualized Pipeline Run-Rate: $${Math.round(mode2Stats.annualRunRate).toLocaleString()}/yr
- Deals Won / Cycle: ${mode2Stats.expectedWonDeals.toFixed(1)} Deals
- Status: ${mode2Stats.velocityTier}`;
    } else {
      report = `### Sales Per Hour & Labor Efficiency Audit
- Period Revenue: $${periodRevenue.toLocaleString()} (${weeksEvaluated} Weeks)
- Active Sales Reps: ${repsForHours} Reps
- Active Selling Time: ${activeSellingTimePct}%
- Sales Per Hour (Gross): $${mode3Stats.grossPerHour.toFixed(2)}/hr
- Sales Per Hour (Active Selling): $${mode3Stats.activePerHour.toFixed(2)}/hr
- Period Payroll: $${Math.round(mode3Stats.payroll).toLocaleString()}
- Revenue per Payroll Dollar: ${mode3Stats.multiplier.toFixed(2)}x
- Payroll-to-Revenue Drag: ${mode3Stats.dragPct.toFixed(1)}%
- Rating: ${mode3Stats.roiTier}`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-neon rounded-2xl p-6 md:p-8 space-y-8">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-black/40 rounded-xl border border-[var(--card-border)]">
        <button
          onClick={() => setMode("quota_attainment")}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-display text-sm tracking-wide transition-all ${
            mode === "quota_attainment"
              ? "bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
              : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Target className="w-4 h-4 text-indigo-400" />
          <span>Quota &amp; Rep Capacity</span>
        </button>

        <button
          onClick={() => setMode("sales_velocity")}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-display text-sm tracking-wide transition-all ${
            mode === "sales_velocity"
              ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Sales Pipeline Velocity</span>
        </button>

        <button
          onClick={() => setMode("sales_per_hour")}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-display text-sm tracking-wide transition-all ${
            mode === "sales_per_hour"
              ? "bg-gradient-to-r from-emerald-500/20 to-teal-600/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Sales Per Hour &amp; ROI</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mr-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Presets:
        </span>
        <button
          onClick={() => applyPreset("smb_saas")}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/30 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 transition-all"
        >
          SMB High-Velocity SaaS
        </button>
        <button
          onClick={() => applyPreset("enterprise_b2b")}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/30 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-all"
        >
          Enterprise B2B Software
        </button>
        <button
          onClick={() => applyPreset("inside_sales")}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/30 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 transition-all"
        >
          Inside Sales &amp; SDR Outreach
        </button>
        <button
          onClick={() => applyPreset("agency")}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/30 border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all"
        >
          Consultative Agency Sales
        </button>
      </div>

      {/* Main Grid: Inputs + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {mode === "quota_attainment" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>Active Sales Reps (AE / Account Execs)</span>
                  </label>
                  <span className="font-mono text-sm text-indigo-300 font-bold">{repCount} Reps</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={repCount}
                  onChange={(e) => setRepCount(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-indigo-400" />
                    <span>Annual Quota Target per Rep ($)</span>
                  </label>
                  <span className="font-mono text-sm text-indigo-300 font-bold">
                    ${quotaPerRep.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="150000"
                  max="2500000"
                  step="25000"
                  value={quotaPerRep}
                  onChange={(e) => setQuotaPerRep(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Actual Closed Team Revenue ($)</span>
                  </label>
                  <span className="font-mono text-sm text-emerald-300 font-bold">
                    ${actualTotalRevenue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="20000000"
                  step="50000"
                  value={actualTotalRevenue}
                  onChange={(e) => setActualTotalRevenue(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>Blended Team Ramp Capacity (%)</span>
                  </label>
                  <span className="font-mono text-sm text-amber-300 font-bold">{rampEfficiencyPct}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={rampEfficiencyPct}
                  onChange={(e) => setRampEfficiencyPct(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {mode === "sales_velocity" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span>Qualified Pipeline Opportunities (Opps)</span>
                  </label>
                  <span className="font-mono text-sm text-cyan-300 font-bold">{qualifiedOpps} Opps</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="250"
                  step="1"
                  value={qualifiedOpps}
                  onChange={(e) => setQualifiedOpps(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Pipeline Win Rate Percentage (%)</span>
                  </label>
                  <span className="font-mono text-sm text-emerald-300 font-bold">{winRatePct.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="65"
                  step="0.5"
                  value={winRatePct}
                  onChange={(e) => setWinRatePct(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    <span>Average Deal Size (ACV / Contract $)</span>
                  </label>
                  <span className="font-mono text-sm text-cyan-300 font-bold">
                    ${avgDealSize.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="250000"
                  step="1000"
                  value={avgDealSize}
                  onChange={(e) => setAvgDealSize(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>Sales Cycle Length (Days to Close)</span>
                  </label>
                  <span className="font-mono text-sm text-purple-300 font-bold">{salesCycleDays} Days</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="180"
                  step="1"
                  value={salesCycleDays}
                  onChange={(e) => setSalesCycleDays(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {mode === "sales_per_hour" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Evaluated Period Closed Revenue ($)</span>
                  </label>
                  <span className="font-mono text-sm text-emerald-300 font-bold">
                    ${periodRevenue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="25000"
                  value={periodRevenue}
                  onChange={(e) => setPeriodRevenue(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-2">
                  <label className="text-xs text-[var(--text-muted)] font-medium">Sales Reps Evaluated</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={repsForHours}
                    onChange={(e) => setRepsForHours(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm"
                  />
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-2">
                  <label className="text-xs text-[var(--text-muted)] font-medium">Period Length (Weeks)</label>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    value={weeksEvaluated}
                    onChange={(e) => setWeeksEvaluated(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Active Selling Time (% of Hours)</span>
                  </label>
                  <span className="font-mono text-sm text-amber-300 font-bold">{activeSellingTimePct}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="70"
                  step="1"
                  value={activeSellingTimePct}
                  onChange={(e) => setActiveSellingTimePct(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-[var(--card-border)] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-indigo-400" />
                    <span>Fully-Loaded Rep Annual Payroll ($ OTE)</span>
                  </label>
                  <span className="font-mono text-sm text-indigo-300 font-bold">
                    ${fullyLoadedRepCost.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="60000"
                  max="350000"
                  step="5000"
                  value={fullyLoadedRepCost}
                  onChange={(e) => setFullyLoadedRepCost(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Metric Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-[var(--card-border)] space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-indigo-400" />
                <span>Executive Metric Dashboard</span>
              </h3>
              <button
                onClick={copyReport}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-all border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Audit"}</span>
              </button>
            </div>

            {mode === "quota_attainment" && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
                  <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Team Quota Attainment
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl md:text-4xl font-extrabold text-indigo-400">
                      {mode1Stats.attainmentPct.toFixed(1)}%
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">of adjusted quota</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${mode1Stats.badgeBg}`}>
                  <span className="text-xs text-[var(--text-muted)] block">Capacity Status</span>
                  <span className={`font-display text-sm font-bold ${mode1Stats.tierColor}`}>
                    {mode1Stats.performanceTier}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-[var(--text-muted)] block mb-1">Revenue per Rep</span>
                    <span className="font-mono text-sm font-bold text-white">
                      ${Math.round(mode1Stats.revPerRep).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-[var(--text-muted)] block mb-1">Quota Variance</span>
                    <span
                      className={`font-mono text-sm font-bold ${
                        mode1Stats.gapToQuota >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {mode1Stats.gapToQuota >= 0 ? "+" : ""}${Math.round(mode1Stats.gapToQuota).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/20 border border-white/5 text-xs text-[var(--text-secondary)] space-y-1">
                  <div className="flex justify-between">
                    <span>Effective Target (Ramp-adjusted):</span>
                    <span className="font-mono text-white font-semibold">
                      ${Math.round(mode1Stats.effectiveQuota).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unweighted Full Capacity Quota:</span>
                    <span className="font-mono text-white">
                      ${(mode1Stats.reps * quotaPerRep).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {mode === "sales_velocity" && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
                  <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Sales Pipeline Velocity (V)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl md:text-4xl font-extrabold text-cyan-400">
                      ${Math.round(mode2Stats.dailyVelocity).toLocaleString()}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">ARR / Day</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${mode2Stats.badgeBg}`}>
                  <span className="text-xs text-[var(--text-muted)] block">Pipeline Health</span>
                  <span className={`font-display text-sm font-bold ${mode2Stats.tierColor}`}>
                    {mode2Stats.velocityTier}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-[var(--text-muted)] block mb-1">Monthly Run-Rate</span>
                    <span className="font-mono text-sm font-bold text-white">
                      ${Math.round(mode2Stats.monthlyVelocity).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-[var(--text-muted)] block mb-1">Annual Pipeline Output</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">
                      ${Math.round(mode2Stats.annualRunRate).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/20 border border-white/5 text-xs text-[var(--text-secondary)] space-y-1">
                  <div className="flex justify-between">
                    <span>Expected Deals Won / Cycle:</span>
                    <span className="font-mono text-white font-semibold">
                      {mode2Stats.expectedWonDeals.toFixed(1)} Deals
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Cycle Duration:</span>
                    <span className="font-mono text-white">{salesCycleDays} Days</span>
                  </div>
                </div>
              </div>
            )}

            {mode === "sales_per_hour" && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
                  <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Sales Per Active Hour
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl md:text-4xl font-extrabold text-emerald-400">
                      ${mode3Stats.activePerHour.toFixed(2)}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">/ selling hr</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${mode3Stats.badgeBg}`}>
                  <span className="text-xs text-[var(--text-muted)] block">Payroll ROI Multiple</span>
                  <span className={`font-display text-sm font-bold ${mode3Stats.tierColor}`}>
                    {mode3Stats.multiplier.toFixed(2)}x ARR on Rep Cost
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-[var(--text-muted)] block mb-1">Sales / Gross Hour</span>
                    <span className="font-mono text-sm font-bold text-white">
                      ${mode3Stats.grossPerHour.toFixed(2)}/hr
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                    <span className="text-[var(--text-muted)] block mb-1">Payroll Drag Ratio</span>
                    <span className="font-mono text-sm font-bold text-amber-400">
                      {mode3Stats.dragPct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/20 border border-white/5 text-xs text-[var(--text-secondary)] space-y-1">
                  <div className="flex justify-between">
                    <span>Total Selling Hours (Team):</span>
                    <span className="font-mono text-white font-semibold">
                      {Math.round(mode3Stats.activeHours).toLocaleString()} hrs
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Period Payroll Allowed:</span>
                    <span className="font-mono text-white">
                      ${Math.round(mode3Stats.payroll).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesProductivityCalculator;
