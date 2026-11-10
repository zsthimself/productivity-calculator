/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 WritingProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的内容创作人效、千字费率、纯写作时钟 WPH 与稿酬净回报计算引擎，承接 /calculator/writing 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  PenTool,
  Clock,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Zap,
  Layers,
  FileText,
  AlertCircle,
} from "lucide-react";

type CalcMode = "drafting_velocity" | "editorial_overhead" | "effective_hourly_yield";

interface WritingPreset {
  name: string;
  category: string;
  wordCount: number;
  draftHours: number;
  researchHours: number;
  editingHours: number;
  revisionHours: number;
  projectFee: number;
  targetHourlyRate: number;
}

const PRESETS: Record<string, WritingPreset> = {
  b2b_saas_whitepaper: {
    name: "B2B SaaS Technical Whitepaper",
    category: "Technical & Enterprise Research",
    wordCount: 3500,
    draftHours: 8.5,
    researchHours: 7.0,
    editingHours: 3.5,
    revisionHours: 3.0,
    projectFee: 2450,
    targetHourlyRate: 110,
  },
  seo_commercial_blog: {
    name: "Commercial SEO Long-Form Guide",
    category: "Content Marketing & SEO",
    wordCount: 2200,
    draftHours: 3.5,
    researchHours: 2.0,
    editingHours: 1.5,
    revisionHours: 1.0,
    projectFee: 770,
    targetHourlyRate: 85,
  },
  ghostwriting_thought_leadership: {
    name: "Executive Thought Leadership Essay",
    category: "Ghostwriting & Opinion",
    wordCount: 1500,
    draftHours: 2.5,
    researchHours: 2.5,
    editingHours: 1.5,
    revisionHours: 1.5,
    projectFee: 1650,
    targetHourlyRate: 175,
  },
  book_fiction_author: {
    name: "Narrative Fiction & Memoir Sprints",
    category: "Creative & Book Manuscripts",
    wordCount: 5000,
    draftHours: 6.0,
    researchHours: 2.0,
    editingHours: 3.0,
    revisionHours: 2.0,
    projectFee: 1500,
    targetHourlyRate: 90,
  },
};

export default function WritingProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("drafting_velocity");
  const [selectedPreset, setSelectedPreset] = useState<string>("b2b_saas_whitepaper");

  // Mode 1: Drafting Velocity
  const [wordCount, setWordCount] = useState<number>(3500);
  const [draftHours, setDraftHours] = useState<number>(8.5);
  const [dailySprintHours, setDailySprintHours] = useState<number>(3.5);

  // Mode 2: Editorial Overhead & Friction
  const [researchHours, setResearchHours] = useState<number>(7.0);
  const [outliningHours, setOutliningHours] = useState<number>(2.0);
  const [editingHours, setEditingHours] = useState<number>(3.5);
  const [revisionHours, setRevisionHours] = useState<number>(3.0);

  // Mode 3: Effective Hourly Yield
  const [projectFee, setProjectFee] = useState<number>(2450);
  const [targetHourlyRate, setTargetHourlyRate] = useState<number>(110);
  const [monthlyGoalDollars, setMonthlyGoalDollars] = useState<number>(8500);

  const [copied, setCopied] = useState<boolean>(false);

  const applyPreset = (presetKey: string) => {
    const p = PRESETS[presetKey];
    if (!p) return;
    setSelectedPreset(presetKey);
    setWordCount(p.wordCount);
    setDraftHours(p.draftHours);
    setResearchHours(p.researchHours);
    setOutliningHours(1.5);
    setEditingHours(p.editingHours);
    setRevisionHours(p.revisionHours);
    setProjectFee(p.projectFee);
    setTargetHourlyRate(p.targetHourlyRate);
  };

  // Calculations
  const metrics = useMemo(() => {
    // Mode 1: Drafting Velocity
    const wordsPerHour = Number((wordCount / Math.max(0.2, draftHours)).toFixed(0));
    const estimatedSprintDays = Number((draftHours / Math.max(0.5, dailySprintHours)).toFixed(1));
    const dailyWordOutput = Number((wordsPerHour * dailySprintHours).toFixed(0));

    // Mode 2: Overhead Drag
    const nonDraftingHours = researchHours + outliningHours + editingHours + revisionHours;
    const totalAllInHours = Number((draftHours + nonDraftingHours).toFixed(1));
    const nonDraftingDragPct = Number(((nonDraftingHours / Math.max(0.5, totalAllInHours)) * 100).toFixed(1));
    const draftingFrictionRatio = Number((totalAllInHours / Math.max(0.2, draftHours)).toFixed(2));

    // Mode 3: Effective Hourly Yield
    const realizedEHR = Number((projectFee / Math.max(0.5, totalAllInHours)).toFixed(2));
    const effectiveRatePerWord = Number((projectFee / Math.max(1, wordCount)).toFixed(3));
    const rateSpread = Number((realizedEHR - targetHourlyRate).toFixed(2));
    const targetMonthlyHours = Math.round(monthlyGoalDollars / Math.max(1, targetHourlyRate));
    const monthlyArticlesNeeded = Math.ceil(monthlyGoalDollars / Math.max(1, projectFee));

    return {
      wordsPerHour,
      estimatedSprintDays,
      dailyWordOutput,
      nonDraftingHours,
      totalAllInHours,
      nonDraftingDragPct,
      draftingFrictionRatio,
      realizedEHR,
      effectiveRatePerWord,
      rateSpread,
      targetMonthlyHours,
      monthlyArticlesNeeded,
    };
  }, [
    wordCount,
    draftHours,
    dailySprintHours,
    researchHours,
    outliningHours,
    editingHours,
    revisionHours,
    projectFee,
    targetHourlyRate,
    monthlyGoalDollars,
  ]);

  const handleCopyReport = () => {
    const reportText = `### Writing Productivity & Freelance Editorial Audit Report
Generated by ProductivityCalculator.work (EFA & ASJA Editorial Standards)

#### Preset: ${PRESETS[selectedPreset]?.name || "Custom Project"}
- Word Count: ${wordCount.toLocaleString()} words
- Active Calculation Mode: ${mode.toUpperCase()}

#### 1. Drafting Velocity & Output
- Pure Drafting Hours: ${draftHours} hrs
- Words Per Hour (WPH): ${metrics.wordsPerHour} WPH (EFA Benchmark: 500 - 900 WPH)
- Daily Output Pace: ~${metrics.dailyWordOutput} words/day (${dailySprintHours} hrs/day sprint)
- Estimated Drafting Duration: ${metrics.estimatedSprintDays} days

#### 2. Non-Drafting Overhead & Friction
- Research & Outlining: ${researchHours + outliningHours} hrs
- Self-Editing & Revisions: ${editingHours + revisionHours} hrs
- Total Non-Drafting Overhead: ${metrics.nonDraftingHours} hrs
- Total All-In Project Hours: ${metrics.totalAllInHours} hrs
- Non-Drafting Drag Ratio: ${metrics.nonDraftingDragPct}% (Standard: 45% - 60%)
- Friction Multiplier: ${metrics.draftingFrictionRatio}x total-to-draft ratio

#### 3. Effective Hourly Yield & Compensation
- Agreed Project Fee: $${projectFee.toLocaleString()} ($${metrics.effectiveRatePerWord}/word)
- Realized Effective Hourly Rate (EHR): $${metrics.realizedEHR}/hr
- Target Hourly Wage: $${targetHourlyRate}/hr (Variance: ${metrics.rateSpread >= 0 ? "+" : ""}$${metrics.rateSpread}/hr)
- Monthly Target ($${monthlyGoalDollars.toLocaleString()}): Requires ${metrics.monthlyArticlesNeeded} projects (~${metrics.targetMonthlyHours} billable hours)
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
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <PenTool className="w-4 h-4" />
            <span>Editorial &amp; Author Workspace Suite</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-display tracking-tight mt-1">
            Writing Productivity Calculator
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Measure words per hour (WPH), editorial overhead drag, per-word conversion, and effective hourly wage.
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
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
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
          onClick={() => setMode("drafting_velocity")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
            mode === "drafting_velocity"
              ? "bg-sky-500/15 border-sky-500/50 text-sky-300 shadow-md"
              : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>1. Drafting Velocity (WPH)</span>
        </button>

        <button
          onClick={() => setMode("editorial_overhead")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
            mode === "editorial_overhead"
              ? "bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-md"
              : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Research &amp; Edit Drag</span>
        </button>

        <button
          onClick={() => setMode("effective_hourly_yield")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
            mode === "effective_hourly_yield"
              ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md"
              : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>3. Realized Hourly Wage</span>
        </button>
      </div>

      {/* Interactive Controls & Output Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {mode === "drafting_velocity" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Finished Word Count Target
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={100}
                    max={100000}
                    step={100}
                    value={wordCount}
                    onChange={(e) => setWordCount(Math.max(50, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-muted-foreground font-mono">
                    words
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    Dedicated Drafting Hours
                  </span>
                  <span className="font-mono text-sky-300">{draftHours} hrs</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={50}
                  step={0.5}
                  value={draftHours}
                  onChange={(e) => setDraftHours(Number(e.target.value))}
                  className="w-full accent-sky-500 h-1.5 bg-muted rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Exclude research, client calls, and editing passes. Count only keyboard drafting time.
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    Daily Deep-Work Sprint Hours
                  </span>
                  <span className="font-mono text-sky-300">{dailySprintHours} hrs/day</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={0.5}
                  value={dailySprintHours}
                  onChange={(e) => setDailySprintHours(Number(e.target.value))}
                  className="w-full accent-sky-500 h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}

          {mode === "editorial_overhead" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Research &amp; Interview Hours
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={researchHours}
                    onChange={(e) => setResearchHours(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Outlining &amp; Angle Strategy
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    step={0.5}
                    value={outliningHours}
                    onChange={(e) => setOutliningHours(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Self-Editing &amp; Proofing Hours
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    step={0.5}
                    value={editingHours}
                    onChange={(e) => setEditingHours(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Client Feedback &amp; Revision Hours
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    step={0.5}
                    value={revisionHours}
                    onChange={(e) => setRevisionHours(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Active Pure Drafting Time (Baseline)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0.5}
                    max={100}
                    step={0.5}
                    value={draftHours}
                    onChange={(e) => setDraftHours(Math.max(0.2, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-muted-foreground font-mono">
                    hours
                  </span>
                </div>
              </div>
            </div>
          )}

          {mode === "effective_hourly_yield" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Agreed Project Fee ($)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={50}
                    max={50000}
                    step={50}
                    value={projectFee}
                    onChange={(e) => setProjectFee(Math.max(10, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-muted-foreground font-mono">
                    USD
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Target Hourly Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={400}
                    value={targetHourlyRate}
                    onChange={(e) => setTargetHourlyRate(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Monthly Revenue Target ($)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    max={50000}
                    step={500}
                    value={monthlyGoalDollars}
                    onChange={(e) => setMonthlyGoalDollars(Math.max(100, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Finished Word Count
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={100}
                    max={50000}
                    step={100}
                    value={wordCount}
                    onChange={(e) => setWordCount(Math.max(50, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-muted-foreground font-mono">
                    words
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
              Editorial Production KPI
            </span>
            <span
              className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                mode === "drafting_velocity"
                  ? "bg-sky-500/10 border-sky-500/30 text-sky-300"
                  : mode === "editorial_overhead"
                  ? metrics.nonDraftingDragPct <= 55
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                  : metrics.realizedEHR >= targetHourlyRate
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
              }`}
            >
              {mode === "drafting_velocity"
                ? `${metrics.wordsPerHour} WPH`
                : mode === "editorial_overhead"
                ? `${metrics.nonDraftingDragPct}% Overhead`
                : `$${metrics.realizedEHR}/hr EHR`}
            </span>
          </div>

          {/* Primary Big Metric */}
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">
              {mode === "drafting_velocity"
                ? "Words Per Hour (WPH)"
                : mode === "editorial_overhead"
                ? "Non-Drafting Overhead Drag"
                : "Realized Effective Hourly Rate"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono tracking-tight text-foreground">
                {mode === "drafting_velocity"
                  ? `${metrics.wordsPerHour}`
                  : mode === "editorial_overhead"
                  ? `${metrics.nonDraftingDragPct}%`
                  : `$${metrics.realizedEHR}`}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {mode === "drafting_velocity"
                  ? "words / drafting hour"
                  : mode === "editorial_overhead"
                  ? "of all project time"
                  : `vs $${targetHourlyRate}/hr target`}
              </span>
            </div>
          </div>

          {/* Secondary Metric Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {mode === "drafting_velocity" && (
              <>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Daily Sprint Yield</div>
                  <div className="text-base font-bold font-mono text-sky-300 mt-0.5">
                    ~{metrics.dailyWordOutput} <span className="text-xs font-normal">words/day</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Sprint Duration</div>
                  <div className="text-base font-bold font-mono text-foreground mt-0.5">
                    {metrics.estimatedSprintDays} <span className="text-xs font-normal">days</span>
                  </div>
                </div>
              </>
            )}

            {mode === "editorial_overhead" && (
              <>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Total Project Time</div>
                  <div className="text-base font-bold font-mono text-amber-300 mt-0.5">
                    {metrics.totalAllInHours} <span className="text-xs font-normal">hours</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Friction Ratio</div>
                  <div className="text-base font-bold font-mono text-foreground mt-0.5">
                    {metrics.draftingFrictionRatio}x <span className="text-xs font-normal">total/draft</span>
                  </div>
                </div>
              </>
            )}

            {mode === "effective_hourly_yield" && (
              <>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Rate Per Word</div>
                  <div className="text-base font-bold font-mono text-emerald-300 mt-0.5">
                    ${metrics.effectiveRatePerWord} <span className="text-xs font-normal">/word</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Rate Variance</div>
                  <div
                    className={`text-base font-bold font-mono mt-0.5 ${
                      metrics.rateSpread >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {metrics.rateSpread >= 0 ? "+" : ""}${metrics.rateSpread}/hr
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Benchmark Advisory */}
          <div className="rounded-lg p-3 bg-card/60 border border-border/50 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>EFA &amp; ASJA Operational Standard</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              {mode === "drafting_velocity"
                ? "Professional commercial writers draft at 500 to 900 WPH. Pure drafting speeds above 1,200 WPH without outlines risk severe downstream revision penalties."
                : mode === "editorial_overhead"
                ? "High-tier writing allocates 45% to 55% of hours to research, outlining, and polishing. Overhead exceeding 65% signals scope ambiguity."
                : "Realized EHR accounts for every minute worked. At $0.35/word, keeping total project hours under 8 preserves an $85+/hr consulting compensation tier."}
            </p>
          </div>

          {/* One-Click Markdown Audit Export */}
          <button
            onClick={handleCopyReport}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/40 transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audit Report Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Editorial Audit Report (Markdown)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export { WritingProductivityCalculator };
