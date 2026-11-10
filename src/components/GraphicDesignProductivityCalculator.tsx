/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 GraphicDesignProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的设计工坊工效、工单周期、改稿损耗率与设计师小时产值计算引擎，承接 /calculator/graphic-design 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Palette,
  Clock,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  Layers,
  AlertCircle,
  FileCode,
} from "lucide-react";

type CalcMode = "turnaround_velocity" | "revision_drag" | "hourly_profitability";

interface StudioPreset {
  name: string;
  category: string;
  teamSize: number;
  workHoursPerWeek: number;
  weeklyAssets: number;
  plannedHours: number;
  revisionHours: number;
  revisionRounds: number;
  projectFee: number;
  actualProjectHours: number;
  hourlyTargetRate: number;
  directCosts: number;
}

const PRESETS: Record<string, StudioPreset> = {
  branding_agency: {
    name: "Boutique Brand & Identity Agency",
    category: "Corporate Identity Systems",
    teamSize: 5,
    workHoursPerWeek: 40,
    weeklyAssets: 18,
    plannedHours: 40,
    revisionHours: 6.5,
    revisionRounds: 2,
    projectFee: 4800,
    actualProjectHours: 42,
    hourlyTargetRate: 110,
    directCosts: 350,
  },
  digital_ad_team: {
    name: "Performance Marketing Ad Studio",
    category: "High-Volume Social & Motion Ads",
    teamSize: 4,
    workHoursPerWeek: 40,
    weeklyAssets: 55,
    plannedHours: 25,
    revisionHours: 4.0,
    revisionRounds: 2,
    projectFee: 2200,
    actualProjectHours: 24,
    hourlyTargetRate: 85,
    directCosts: 180,
  },
  uiux_studio: {
    name: "Digital Product UI/UX Design Shop",
    category: "SaaS App & Design Systems",
    teamSize: 8,
    workHoursPerWeek: 40,
    weeklyAssets: 28,
    plannedHours: 80,
    revisionHours: 14,
    revisionRounds: 3,
    projectFee: 10500,
    actualProjectHours: 86,
    hourlyTargetRate: 125,
    directCosts: 600,
  },
  freelance_solo: {
    name: "Senior Independent Designer",
    category: "Solo Creative Practitioner",
    teamSize: 1,
    workHoursPerWeek: 35,
    weeklyAssets: 6,
    plannedHours: 20,
    revisionHours: 3.5,
    revisionRounds: 2,
    projectFee: 1950,
    actualProjectHours: 22,
    hourlyTargetRate: 90,
    directCosts: 120,
  },
};

export default function GraphicDesignProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("turnaround_velocity");
  const [selectedPreset, setSelectedPreset] = useState<string>("branding_agency");

  // Mode 1: Turnaround & Project Velocity
  const [teamSize, setTeamSize] = useState<number>(5);
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState<number>(40);
  const [weeklyAssets, setWeeklyAssets] = useState<number>(18);

  // Mode 2: Revision Drag & Scope Churn
  const [plannedHours, setPlannedHours] = useState<number>(40);
  const [revisionHours, setRevisionHours] = useState<number>(6.5);
  const [revisionRounds, setRevisionRounds] = useState<number>(2);
  const [hourlyBillingRate, setHourlyBillingRate] = useState<number>(110);

  // Mode 3: Effective Hourly Rate & Profitability
  const [projectFee, setProjectFee] = useState<number>(4800);
  const [actualProjectHours, setActualProjectHours] = useState<number>(42);
  const [hourlyTargetRate, setHourlyTargetRate] = useState<number>(110);
  const [directCosts, setDirectCosts] = useState<number>(350);

  const [copied, setCopied] = useState<boolean>(false);

  const applyPreset = (presetKey: string) => {
    const p = PRESETS[presetKey];
    if (!p) return;
    setSelectedPreset(presetKey);
    setTeamSize(p.teamSize);
    setWorkHoursPerWeek(p.workHoursPerWeek);
    setWeeklyAssets(p.weeklyAssets);
    setPlannedHours(p.plannedHours);
    setRevisionHours(p.revisionHours);
    setRevisionRounds(p.revisionRounds);
    setHourlyBillingRate(p.hourlyTargetRate);
    setProjectFee(p.projectFee);
    setActualProjectHours(p.actualProjectHours);
    setHourlyTargetRate(p.hourlyTargetRate);
    setDirectCosts(p.directCosts);
  };

  // Calculations
  const metrics = useMemo(() => {
    // Mode 1
    const totalWeeklyCapacityHours = Math.max(1, teamSize * workHoursPerWeek);
    const assetsPerDesignerPerWeek = Number((weeklyAssets / Math.max(1, teamSize)).toFixed(1));
    const averageTurnaroundHours = Number((totalWeeklyCapacityHours / Math.max(1, weeklyAssets)).toFixed(1));
    const assumedBenchmarkHours = 9.0;
    const teamVelocityIndex = Number(((assumedBenchmarkHours / Math.max(0.5, averageTurnaroundHours)) * 100).toFixed(0));

    // Mode 2
    const totalProjectHoursInvested = Math.max(0.1, plannedHours + revisionHours);
    const revisionRatioPct = Number(((revisionHours / totalProjectHoursInvested) * 100).toFixed(1));
    const scopeCreepPct = Number(((revisionHours / Math.max(1, plannedHours)) * 100).toFixed(1));
    const unbilledRevisionCost = Math.round(revisionHours * hourlyBillingRate);
    const avgRevisionHoursPerRound = Number((revisionHours / Math.max(1, revisionRounds)).toFixed(1));

    // Mode 3
    const netProjectMarginDollars = Math.max(0, projectFee - directCosts);
    const realizedEHR = Number((netProjectMarginDollars / Math.max(0.1, actualProjectHours)).toFixed(2));
    const rateDifferential = Number((realizedEHR - hourlyTargetRate).toFixed(2));
    const profitMarginPct = Number(((netProjectMarginDollars / Math.max(1, projectFee)) * 100).toFixed(1));
    const breakevenHoursAtTarget = Number((netProjectMarginDollars / Math.max(1, hourlyTargetRate)).toFixed(1));

    return {
      totalWeeklyCapacityHours,
      assetsPerDesignerPerWeek,
      averageTurnaroundHours,
      teamVelocityIndex,
      totalProjectHoursInvested,
      revisionRatioPct,
      scopeCreepPct,
      unbilledRevisionCost,
      avgRevisionHoursPerRound,
      netProjectMarginDollars,
      realizedEHR,
      rateDifferential,
      profitMarginPct,
      breakevenHoursAtTarget,
    };
  }, [
    teamSize,
    workHoursPerWeek,
    weeklyAssets,
    plannedHours,
    revisionHours,
    revisionRounds,
    hourlyBillingRate,
    projectFee,
    actualProjectHours,
    hourlyTargetRate,
    directCosts,
  ]);

  const handleCopyReport = () => {
    const reportText = `### Graphic Design Productivity & Studio Audit Report
Generated by ProductivityCalculator.work (AIGA & DMI Design Standards)

#### Preset: ${PRESETS[selectedPreset]?.name || "Custom Configuration"}
- Creative Team Size: ${teamSize} Designers
- Active Operating Mode: ${mode.toUpperCase()}

#### 1. Turnaround & Production Velocity
- Total Weekly Studio Hours: ${metrics.totalWeeklyCapacityHours} hrs
- Weekly Delivered Assets: ${weeklyAssets} assets (${metrics.assetsPerDesignerPerWeek} assets/designer)
- Average Turnaround Time (TAT): ${metrics.averageTurnaroundHours} hrs/asset

#### 2. Revision Ratio & Scope Creep
- Planned Work Hours: ${plannedHours} hrs | Revision Hours Logged: ${revisionHours} hrs
- Revision Drag Ratio: ${metrics.revisionRatioPct}% (AIGA Target: 10% - 18%)
- Scope Expansion: +${metrics.scopeCreepPct}% | Unbilled Revisions Value: $${metrics.unbilledRevisionCost.toLocaleString()}
- Feedback Rounds: ${revisionRounds} rounds (${metrics.avgRevisionHoursPerRound} hrs/round)

#### 3. Effective Hourly Rate & Studio Profitability
- Fixed Project Fee: $${projectFee.toLocaleString()} | Direct Costs: $${directCosts.toLocaleString()}
- Actual Hours Invested: ${actualProjectHours} hrs (Target Rate: $${hourlyTargetRate}/hr)
- Realized Effective Hourly Rate (EHR): $${metrics.realizedEHR}/hr
- Variance to Target: ${metrics.rateDifferential >= 0 ? "+" : ""}$${metrics.rateDifferential}/hr
- Net Project Margin: ${metrics.profitMarginPct}% | Breakeven Hours: ${metrics.breakevenHoursAtTarget} hrs
`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl p-6 md:p-8 space-y-8 font-body">
      {/* Header & Preset Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-pink-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Palette className="w-4 h-4" />
            <span>Design Studio &amp; Agency Engine</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-display tracking-tight mt-1">
            Graphic Design Productivity Calculator
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Measure creative turnaround time, revision loss ratio, effective hourly rate, and agency utilization.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5 bg-muted/40 p-1.5 rounded-xl border border-border/50">
          {Object.entries(PRESETS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedPreset === key
                  ? "bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {p.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <button
          onClick={() => setMode("turnaround_velocity")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
            mode === "turnaround_velocity"
              ? "bg-pink-500/15 border-pink-500/50 text-pink-300 shadow-md"
              : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Turnaround &amp; Velocity</span>
        </button>

        <button
          onClick={() => setMode("revision_drag")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
            mode === "revision_drag"
              ? "bg-purple-500/15 border-purple-500/50 text-purple-300 shadow-md"
              : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>2. Revision Drag &amp; Scope</span>
        </button>

        <button
          onClick={() => setMode("hourly_profitability")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
            mode === "hourly_profitability"
              ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300 shadow-md"
              : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>3. Realized Hourly Rate</span>
        </button>
      </div>

      {/* Interactive Controls & KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {mode === "turnaround_velocity" && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-pink-400" />
                    Creative Team Size (Designers)
                  </span>
                  <span className="font-mono text-pink-300">{teamSize} FTE</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-pink-500 h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-pink-400" />
                    Weekly Hours per Designer
                  </span>
                  <span className="font-mono text-pink-300">{workHoursPerWeek} hrs</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={50}
                  step={1}
                  value={workHoursPerWeek}
                  onChange={(e) => setWorkHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-pink-500 h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Total Completed Assets per Week
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={weeklyAssets}
                    onChange={(e) => setWeeklyAssets(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-muted-foreground font-mono">
                    assets/wk
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Includes logos, social carousels, UI components, ads, and printed spreads.
                </p>
              </div>
            </div>
          )}

          {mode === "revision_drag" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Original Budgeted Project Hours
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={400}
                    step={1}
                    value={plannedHours}
                    onChange={(e) => setPlannedHours(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-muted-foreground font-mono">
                    planned hrs
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    Additional Revision &amp; Scope Change Hours
                  </span>
                  <span className="font-mono text-purple-300">{revisionHours} hrs</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={0.5}
                  value={revisionHours}
                  onChange={(e) => setRevisionHours(Number(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Client Feedback Rounds
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={revisionRounds}
                    onChange={(e) => setRevisionRounds(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Standard Hourly Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={350}
                    value={hourlyBillingRate}
                    onChange={(e) => setHourlyBillingRate(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "hourly_profitability" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Agreed Flat-Fee Project Contract ($)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={100}
                    max={100000}
                    step={100}
                    value={projectFee}
                    onChange={(e) => setProjectFee(Math.max(10, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-muted-foreground font-mono">
                    USD
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Actual Total Hours Invested
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    step={0.5}
                    value={actualProjectHours}
                    onChange={(e) => setActualProjectHours(Math.max(0.5, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Target Hourly Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    min={25}
                    max={400}
                    value={hourlyTargetRate}
                    onChange={(e) => setHourlyTargetRate(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Direct Project Expenses (Fonts, Stock, Mockups)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    step={25}
                    value={directCosts}
                    onChange={(e) => setDirectCosts(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-muted-foreground font-mono">
                    USD
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Output Scorecard (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-border/70 bg-card/80 p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Production KPI Analysis
            </span>
            <span
              className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                mode === "turnaround_velocity"
                  ? "bg-pink-500/10 border-pink-500/30 text-pink-300"
                  : mode === "revision_drag"
                  ? metrics.revisionRatioPct <= 18
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                  : metrics.realizedEHR >= hourlyTargetRate
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
              }`}
            >
              {mode === "turnaround_velocity"
                ? "Velocity Mode"
                : mode === "revision_drag"
                ? `${metrics.revisionRatioPct}% Churn`
                : `$${metrics.realizedEHR}/hr EHR`}
            </span>
          </div>

          {/* Primary Big Metric */}
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">
              {mode === "turnaround_velocity"
                ? "Average Turnaround Time (TAT)"
                : mode === "revision_drag"
                ? "Revision Drag Ratio"
                : "Realized Effective Hourly Rate"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono tracking-tight text-foreground">
                {mode === "turnaround_velocity"
                  ? `${metrics.averageTurnaroundHours} hrs`
                  : mode === "revision_drag"
                  ? `${metrics.revisionRatioPct}%`
                  : `$${metrics.realizedEHR}`}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {mode === "turnaround_velocity"
                  ? "per completed asset"
                  : mode === "revision_drag"
                  ? "of total project time"
                  : `vs $${hourlyTargetRate}/hr goal`}
              </span>
            </div>
          </div>

          {/* Secondary Metric Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {mode === "turnaround_velocity" && (
              <>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Designer Yield</div>
                  <div className="text-base font-bold font-mono text-pink-300 mt-0.5">
                    {metrics.assetsPerDesignerPerWeek} <span className="text-xs font-normal">assets/wk</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Studio Capacity</div>
                  <div className="text-base font-bold font-mono text-foreground mt-0.5">
                    {metrics.totalWeeklyCapacityHours} <span className="text-xs font-normal">hrs/wk</span>
                  </div>
                </div>
              </>
            )}

            {mode === "revision_drag" && (
              <>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Unbilled Cost</div>
                  <div className="text-base font-bold font-mono text-purple-300 mt-0.5">
                    ${metrics.unbilledRevisionCost.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Scope Growth</div>
                  <div className="text-base font-bold font-mono text-foreground mt-0.5">
                    +{metrics.scopeCreepPct}%
                  </div>
                </div>
              </>
            )}

            {mode === "hourly_profitability" && (
              <>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Net Margin</div>
                  <div className="text-base font-bold font-mono text-cyan-300 mt-0.5">
                    {metrics.profitMarginPct}%
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Rate Variance</div>
                  <div
                    className={`text-base font-bold font-mono mt-0.5 ${
                      metrics.rateDifferential >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {metrics.rateDifferential >= 0 ? "+" : ""}${metrics.rateDifferential}/hr
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Benchmark Advisory */}
          <div className="rounded-lg p-3 bg-card/60 border border-border/50 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
              <span>AIGA Studio Operational Guideline</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              {mode === "turnaround_velocity"
                ? "Standard digital agencies deliver 3 to 6 polished marketing deliverables per designer weekly. Turnaround times exceeding 12 hours indicate design system deficiencies."
                : mode === "revision_drag"
                ? "Healthy studio projects cap revisions at 10% to 18% of project hours across 2 contractual rounds. Rework past 25% requires immediate scope change change-orders."
                : "Realized effective hourly rates reflect billable reality. If realized EHR drops below $65/hr, designers should renegotiate fixed fees or transition to hourly billables."}
            </p>
          </div>

          {/* One-Click Markdown Audit Export */}
          <button
            onClick={handleCopyReport}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-500/40 transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audit Report Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Studio Audit Report (Markdown)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export { GraphicDesignProductivityCalculator };
