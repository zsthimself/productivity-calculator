/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 SoftwareDevelopmentProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的软件开发人效、DORA 交付流速、Sprint 故事点与产研人均 ARR 计算引擎，承接 /calculator/software-development 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Code2,
  GitPullRequest,
  Zap,
  TrendingUp,
  DollarSign,
  Copy,
  Check,
  Sparkles,
  Layers,
  Bug,
  ShieldCheck,
  Cpu,
  Clock,
  Gauge,
} from "lucide-react";

type CalcMode = "dora_flow" | "sprint_capacity" | "engineering_economics";

interface DevPreset {
  name: string;
  stage: string;
  teamSize: number;
  sprintDurationWeeks: number;
  plannedPoints: number;
  completedPoints: number;
  mergedPrs: number;
  deploysPerWeek: number;
  leadTimeHours: number;
  changeFailurePct: number;
  mttrHours: number;
  annualArr: number;
  blendedSalary: number;
  techDebtPct: number;
}

const PRESETS: Record<string, DevPreset> = {
  scaleup_saas: {
    name: "Growth B2B SaaS",
    stage: "Series B/C ARR Scale-Up",
    teamSize: 16,
    sprintDurationWeeks: 2,
    plannedPoints: 140,
    completedPoints: 128,
    mergedPrs: 64,
    deploysPerWeek: 18,
    leadTimeHours: 14,
    changeFailurePct: 4.2,
    mttrHours: 1.2,
    annualArr: 8500000,
    blendedSalary: 165000,
    techDebtPct: 20,
  },
  enterprise_fintech: {
    name: "Enterprise FinTech",
    stage: "Regulated Banking Infrastructure",
    teamSize: 55,
    sprintDurationWeeks: 2,
    plannedPoints: 420,
    completedPoints: 375,
    mergedPrs: 145,
    deploysPerWeek: 4,
    leadTimeHours: 72,
    changeFailurePct: 8.5,
    mttrHours: 4.5,
    annualArr: 36000000,
    blendedSalary: 185000,
    techDebtPct: 15,
  },
  seed_startup: {
    name: "Seed-Stage AI Startup",
    stage: "High-Velocity Product-Market Fit",
    teamSize: 5,
    sprintDurationWeeks: 1,
    plannedPoints: 50,
    completedPoints: 48,
    mergedPrs: 28,
    deploysPerWeek: 35,
    leadTimeHours: 3.5,
    changeFailurePct: 6.0,
    mttrHours: 0.8,
    annualArr: 1200000,
    blendedSalary: 145000,
    techDebtPct: 10,
  },
  agency_consultancy: {
    name: "Digital Engineering Studio",
    stage: "Client Retainer & Project Delivery",
    teamSize: 22,
    sprintDurationWeeks: 2,
    plannedPoints: 180,
    completedPoints: 165,
    mergedPrs: 82,
    deploysPerWeek: 8,
    leadTimeHours: 28,
    changeFailurePct: 5.5,
    mttrHours: 2.5,
    annualArr: 5400000,
    blendedSalary: 135000,
    techDebtPct: 18,
  },
};

export function SoftwareDevelopmentProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("dora_flow");
  const [copied, setCopied] = useState(false);

  // Common team parameters
  const [teamSize, setTeamSize] = useState(16);
  const [sprintDurationWeeks, setSprintDurationWeeks] = useState(2);

  // Mode 1: DORA Metrics
  const [deploysPerWeek, setDeploysPerWeek] = useState(18);
  const [leadTimeHours, setLeadTimeHours] = useState(14);
  const [changeFailurePct, setChangeFailurePct] = useState(4.2);
  const [mttrHours, setMttrHours] = useState(1.2);

  // Mode 2: Sprint Throughput
  const [plannedPoints, setPlannedPoints] = useState(140);
  const [completedPoints, setCompletedPoints] = useState(128);
  const [mergedPrs, setMergedPrs] = useState(64);

  // Mode 3: Engineering Economics
  const [annualArr, setAnnualArr] = useState(8500000);
  const [blendedSalary, setBlendedSalary] = useState(165000);
  const [techDebtPct, setTechDebtPct] = useState(20);

  // Computations: Mode 1 DORA
  const doraStats = useMemo(() => {
    let tier: "Elite" | "High" | "Medium" | "Low" = "Low";
    if (deploysPerWeek >= 7 && leadTimeHours <= 24 && changeFailurePct <= 5 && mttrHours <= 1) {
      tier = "Elite";
    } else if (deploysPerWeek >= 1 && leadTimeHours <= 168 && changeFailurePct <= 15 && mttrHours <= 24) {
      tier = "High";
    } else if (deploysPerWeek >= 0.25 && leadTimeHours <= 720 && changeFailurePct <= 25) {
      tier = "Medium";
    }

    const deploysPerDevMonth = teamSize > 0 ? (deploysPerWeek * 4.33) / teamSize : 0;
    return {
      tier,
      deploysPerDevMonth,
    };
  }, [deploysPerWeek, leadTimeHours, changeFailurePct, mttrHours, teamSize]);

  // Computations: Mode 2 Sprint
  const sprintStats = useMemo(() => {
    const sprintCommitmentPct = plannedPoints > 0 ? (completedPoints / plannedPoints) * 100 : 0;
    const pointsPerDevSprint = teamSize > 0 ? completedPoints / teamSize : 0;
    const weeklyVelocity = sprintDurationWeeks > 0 ? completedPoints / sprintDurationWeeks : 0;
    const prsPerDevWeek = teamSize > 0 && sprintDurationWeeks > 0 ? mergedPrs / (teamSize * sprintDurationWeeks) : 0;

    return {
      sprintCommitmentPct,
      pointsPerDevSprint,
      weeklyVelocity,
      prsPerDevWeek,
    };
  }, [plannedPoints, completedPoints, mergedPrs, teamSize, sprintDurationWeeks]);

  // Computations: Mode 3 Economics
  const economicStats = useMemo(() => {
    const totalPayroll = teamSize * blendedSalary;
    const arrPerEngineer = teamSize > 0 ? annualArr / teamSize : 0;
    const engExpenseRatioPct = annualArr > 0 ? (totalPayroll / annualArr) * 100 : 0;
    const featureInvestment = totalPayroll * (1 - techDebtPct / 100);
    const techDebtInvestment = totalPayroll * (techDebtPct / 100);

    return {
      totalPayroll,
      arrPerEngineer,
      engExpenseRatioPct,
      featureInvestment,
      techDebtInvestment,
    };
  }, [teamSize, blendedSalary, annualArr, techDebtPct]);

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setTeamSize(p.teamSize);
    setSprintDurationWeeks(p.sprintDurationWeeks);
    setPlannedPoints(p.plannedPoints);
    setCompletedPoints(p.completedPoints);
    setMergedPrs(p.mergedPrs);
    setDeploysPerWeek(p.deploysPerWeek);
    setLeadTimeHours(p.leadTimeHours);
    setChangeFailurePct(p.changeFailurePct);
    setMttrHours(p.mttrHours);
    setAnnualArr(p.annualArr);
    setBlendedSalary(p.blendedSalary);
    setTechDebtPct(p.techDebtPct);
  };

  const copyReport = () => {
    const text = `### Software Development Productivity & DORA Audit Report
**Team Size:** ${teamSize} Engineering FTEs | **Sprint Duration:** ${sprintDurationWeeks} Weeks
**Annual ARR:** $${annualArr.toLocaleString()} | **DORA Classification:** ${doraStats.tier}

#### 1. DORA Release Velocity
- **Deployment Frequency:** ${deploysPerWeek} deploys/week (${doraStats.deploysPerDevMonth.toFixed(1)} deploys/dev-month)
- **Lead Time for Changes:** ${leadTimeHours} hours
- **Change Failure Rate (CFR):** ${changeFailurePct}%
- **Mean Time to Recovery (MTTR):** ${mttrHours} hours

#### 2. Sprint Story Point & PR Throughput
- **Velocity:** ${completedPoints} points completed (${sprintStats.weeklyVelocity.toFixed(1)} pts/week)
- **Commitment Delivery Ratio:** ${sprintStats.sprintCommitmentPct.toFixed(1)}% (target > 85%)
- **Story Points Per Developer:** ${sprintStats.pointsPerDevSprint.toFixed(1)} pts / sprint
- **PR Merge Rate:** ${sprintStats.prsPerDevWeek.toFixed(1)} PRs / dev-week

#### 3. Engineering Economics & ROI
- **ARR Per Engineer:** $${economicStats.arrPerEngineer.toLocaleString(undefined, { maximumFractionDigits: 0 })}
- **Engineering Payroll:** $${economicStats.totalPayroll.toLocaleString()} (${economicStats.engExpenseRatioPct.toFixed(1)}% of ARR)
- **Feature Dev Investment:** $${economicStats.featureInvestment.toLocaleString()} (${100 - techDebtPct}%)
- **Tech Debt Budget:** $${economicStats.techDebtInvestment.toLocaleString()} (${techDebtPct}%)
*Generated via productivitycalculator.work/calculator/software-development*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-2xl space-y-8 font-body">
      {/* Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Code2 className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground tracking-tight">
                Software Development Productivity Calculator
              </h2>
              <p className="text-xs text-muted-foreground">
                Google DORA DevOps metrics, agile sprint story throughput &amp; ARR per engineer model
              </p>
            </div>
          </div>
        </div>

        {/* Industry Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(PRESETS).map(([k, p]) => (
            <button
              key={k}
              onClick={() => applyPreset(k)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all border border-border/40 hover:border-border"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setMode("dora_flow")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "dora_flow"
              ? "bg-sky-500/15 border-sky-500/60 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>1. DORA Metrics &amp; Flow</span>
        </button>

        <button
          onClick={() => setMode("sprint_capacity")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "sprint_capacity"
              ? "bg-purple-500/15 border-purple-500/60 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <GitPullRequest className="w-4 h-4" />
          <span>2. Sprint Points &amp; PR Velocity</span>
        </button>

        <button
          onClick={() => setMode("engineering_economics")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "engineering_economics"
              ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>3. ARR per FTE &amp; Tech Debt</span>
        </button>
      </div>

      {/* Input Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-muted/20 border border-border/50">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Engineering Team Size (FTEs)</span>
            <span className="font-mono text-sky-400 font-bold">{teamSize} engineers</span>
          </div>
          <input
            type="range"
            min="2"
            max="150"
            step="1"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Sprint Cycle Duration (Weeks)</span>
            <span className="font-mono text-sky-400 font-bold">{sprintDurationWeeks} weeks</span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={sprintDurationWeeks}
            onChange={(e) => setSprintDurationWeeks(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
        </div>

        {mode === "dora_flow" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Production Deploys per Week</span>
                <span className="font-mono text-sky-400 font-bold">{deploysPerWeek} deploys/wk</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="60"
                step="0.5"
                value={deploysPerWeek}
                onChange={(e) => setDeploysPerWeek(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <input
                type="number"
                value={deploysPerWeek}
                onChange={(e) => setDeploysPerWeek(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Lead Time for Changes (Commit to Prod)</span>
                <span className="font-mono text-sky-400 font-bold">{leadTimeHours} hours</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="168"
                step="0.5"
                value={leadTimeHours}
                onChange={(e) => setLeadTimeHours(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <input
                type="number"
                value={leadTimeHours}
                onChange={(e) => setLeadTimeHours(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Change Failure Rate (CFR %)</span>
                <span className="font-mono text-sky-400 font-bold">{changeFailurePct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.1"
                value={changeFailurePct}
                onChange={(e) => setChangeFailurePct(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Failed Deploy Recovery Time (MTTR)</span>
                <span className="font-mono text-sky-400 font-bold">{mttrHours} hours</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="48"
                step="0.2"
                value={mttrHours}
                onChange={(e) => setMttrHours(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>
          </>
        )}

        {mode === "sprint_capacity" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Story Points Committed (Sprint Goal)</span>
                <span className="font-mono text-purple-400 font-bold">{plannedPoints} pts</span>
              </div>
              <input
                type="range"
                min="20"
                max="800"
                step="5"
                value={plannedPoints}
                onChange={(e) => setPlannedPoints(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <input
                type="number"
                value={plannedPoints}
                onChange={(e) => setPlannedPoints(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Story Points Delivered (Done)</span>
                <span className="font-mono text-purple-400 font-bold">{completedPoints} pts</span>
              </div>
              <input
                type="range"
                min="10"
                max="800"
                step="5"
                value={completedPoints}
                onChange={(e) => setCompletedPoints(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <input
                type="number"
                value={completedPoints}
                onChange={(e) => setCompletedPoints(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Total Pull Requests Merged in Sprint</span>
                <span className="font-mono text-purple-400 font-bold">{mergedPrs} PRs</span>
              </div>
              <input
                type="range"
                min="5"
                max="400"
                step="1"
                value={mergedPrs}
                onChange={(e) => setMergedPrs(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </>
        )}

        {mode === "engineering_economics" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Company Annual Recurring Revenue ($ ARR)</span>
                <span className="font-mono text-emerald-400 font-bold">${annualArr.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="80000000"
                step="250000"
                value={annualArr}
                onChange={(e) => setAnnualArr(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={annualArr}
                onChange={(e) => setAnnualArr(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Blended Fully-Loaded Salary ($/FTE/yr)</span>
                <span className="font-mono text-emerald-400 font-bold">${blendedSalary.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="60000"
                max="300000"
                step="5000"
                value={blendedSalary}
                onChange={(e) => setBlendedSalary(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={blendedSalary}
                onChange={(e) => setBlendedSalary(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Tech Debt &amp; Maintenance Allocation (%)</span>
                <span className="font-mono text-emerald-400 font-bold">{techDebtPct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={techDebtPct}
                onChange={(e) => setTechDebtPct(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </>
        )}
      </div>

      {/* KPI Display Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            DORA Performance
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-mono ${
            doraStats.tier === "Elite" ? "text-emerald-400" : doraStats.tier === "High" ? "text-sky-400" : "text-amber-400"
          }`}>
            {doraStats.tier} Tier
          </div>
          <div className="text-[11px] text-muted-foreground">Google Cloud DORA</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Sprint Commitment
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-mono ${
            sprintStats.sprintCommitmentPct >= 85 ? "text-emerald-400" : "text-amber-400"
          }`}>
            {sprintStats.sprintCommitmentPct.toFixed(1)}%
          </div>
          <div className="text-[11px] text-muted-foreground">Delivered / Planned</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            ARR per Engineer
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-purple-400">
            ${(economicStats.arrPerEngineer / 1000).toFixed(0)}k
          </div>
          <div className="text-[11px] text-muted-foreground">Benchmark: $250k - $450k</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            PR Merge Velocity
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-400">
            {sprintStats.prsPerDevWeek.toFixed(1)} PRs
          </div>
          <div className="text-[11px] text-muted-foreground">per engineer / week</div>
        </div>
      </div>

      {/* Secondary Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-card border border-border/50 text-xs">
        <div>
          <span className="text-muted-foreground block">Story Yield / Dev</span>
          <span className="font-mono font-semibold text-foreground">
            {sprintStats.pointsPerDevSprint.toFixed(1)} pts / sprint
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Lead Time to Deploy</span>
          <span className="font-mono font-semibold text-foreground">
            {leadTimeHours} hrs (commit to prod)
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Total Eng Payroll</span>
          <span className="font-mono font-semibold text-foreground">
            ${(economicStats.totalPayroll / 1000000).toFixed(2)}M ({economicStats.engExpenseRatioPct.toFixed(1)}% ARR)
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Feature vs Debt Split</span>
          <span className="font-mono font-semibold text-foreground">
            {100 - techDebtPct}% dev / {techDebtPct}% debt
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>DevOps benchmarks verified against Google Cloud DORA &amp; ACM SPACE research</span>
        </div>

        <button
          onClick={copyReport}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Report Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Dev Audit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default SoftwareDevelopmentProductivityCalculator;
