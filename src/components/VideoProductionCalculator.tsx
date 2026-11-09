/**
 * [INPUT]: 依赖 react 的 useState, useMemo；依赖 lucide-react 图标；依赖 Tailwind CSS
 * [OUTPUT]: 导出 VideoProductionCalculator 组件
 * [POS]: src/components 的视频制作专属交互式计算器，承接 /calculator/video-production 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Film,
  DollarSign,
  Calendar,
  Clock,
  Sparkles,
  Copy,
  Check,
  TrendingUp,
  Sliders,
  AlertCircle,
  Scissors,
} from "lucide-react";

interface PresetConfig {
  name: string;
  desc: string;
  // Mode 1: Efficiency
  finishedMinutes: number;
  rawHours: number;
  editHours: number;
  shootDays: number;
  // Mode 2: Budget
  preBudget: number;
  prodBudget: number;
  postBudget: number;
  targetMins: number;
  // Mode 3: Schedule
  totalPostHours: number;
  editorCount: number;
  hoursPerDay: number;
  revisionRounds: number;
}

const PRESETS: PresetConfig[] = [
  {
    name: "Corporate Brand Promo",
    desc: "3-minute cinematic brand explainer with interview + B-roll",
    finishedMinutes: 3,
    rawHours: 4.5,
    editHours: 24,
    shootDays: 1,
    preBudget: 1200,
    prodBudget: 3800,
    postBudget: 2200,
    targetMins: 3,
    totalPostHours: 24,
    editorCount: 1,
    hoursPerDay: 8,
    revisionRounds: 2,
  },
  {
    name: "YouTube Creator Review",
    desc: "10-minute in-depth tech review / tutorial with graphics",
    finishedMinutes: 10,
    rawHours: 3.0,
    editHours: 12,
    shootDays: 0.5,
    preBudget: 150,
    prodBudget: 400,
    postBudget: 650,
    targetMins: 10,
    totalPostHours: 12,
    editorCount: 1,
    hoursPerDay: 6,
    revisionRounds: 1,
  },
  {
    name: "Social Shorts Batch",
    desc: "15 x 60s viral TikTok/Reels batch shot in a half-day session",
    finishedMinutes: 15,
    rawHours: 5.0,
    editHours: 18,
    shootDays: 1,
    preBudget: 300,
    prodBudget: 1200,
    postBudget: 1500,
    targetMins: 15,
    totalPostHours: 18,
    editorCount: 1,
    hoursPerDay: 8,
    revisionRounds: 1,
  },
  {
    name: "Commercial Broadcast (30s)",
    desc: "30-second broadcast television commercial with color grading & VFX",
    finishedMinutes: 0.5,
    rawHours: 8.0,
    editHours: 36,
    shootDays: 2,
    preBudget: 4500,
    prodBudget: 12500,
    postBudget: 7500,
    targetMins: 0.5,
    totalPostHours: 36,
    editorCount: 2,
    hoursPerDay: 8,
    revisionRounds: 3,
  },
];

export default function VideoProductionCalculator() {
  const [activeTab, setActiveTab] = useState<"efficiency" | "budget" | "schedule">("efficiency");

  // Mode 1: Production Output & Editing Efficiency
  const [finishedMinutes, setFinishedMinutes] = useState<number>(3);
  const [rawHours, setRawHours] = useState<number>(4.5);
  const [editHours, setEditHours] = useState<number>(24);
  const [shootDays, setShootDays] = useState<number>(1);

  // Mode 2: Budget Breakdown & Cost per Minute
  const [preBudget, setPreBudget] = useState<number>(1200);
  const [prodBudget, setProdBudget] = useState<number>(3800);
  const [postBudget, setPostBudget] = useState<number>(2200);
  const [targetMins, setTargetMins] = useState<number>(3);

  // Mode 3: Turnaround Time & Crew Scheduling
  const [totalPostHours, setTotalPostHours] = useState<number>(24);
  const [editorCount, setEditorCount] = useState<number>(1);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [revisionRounds, setRevisionRounds] = useState<number>(2);

  const [copied, setCopied] = useState<boolean>(false);

  // Preset Applicator
  const applyPreset = (preset: PresetConfig) => {
    setFinishedMinutes(preset.finishedMinutes);
    setRawHours(preset.rawHours);
    setEditHours(preset.editHours);
    setShootDays(preset.shootDays);

    setPreBudget(preset.preBudget);
    setProdBudget(preset.prodBudget);
    setPostBudget(preset.postBudget);
    setTargetMins(preset.targetMins);

    setTotalPostHours(preset.totalPostHours);
    setEditorCount(preset.editorCount);
    setHoursPerDay(preset.hoursPerDay);
    setRevisionRounds(preset.revisionRounds);
  };

  // ---------------- Calculation 1: Efficiency ----------------
  const efficiencyMetrics = useMemo(() => {
    const rawMinutes = Math.max(0.1, rawHours * 60);
    const validFinished = Math.max(0.1, finishedMinutes);
    const validEdit = Math.max(0.1, editHours);

    // Shooting Ratio: Raw minutes divided by finished minutes (e.g. 90:1)
    const shootingRatio = rawMinutes / validFinished;

    // Editing Pace: Edit hours per finished minute
    const editHoursPerFinishedMin = validEdit / validFinished;

    // Edit to Raw Ratio: Edit hours vs Raw footage hours
    const editToRawRatio = validEdit / Math.max(0.1, rawHours);

    // Total Labor Hours (Assuming 8hr shoot days)
    const totalLaborHours = shootDays * 8 + validEdit;

    // Benchmark comparison (Standard corporate benchmark ~ 6-8 edit hrs per finished min)
    let efficiencyRating = "Standard Commercial Flow";
    let badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (editHoursPerFinishedMin < 3) {
      efficiencyRating = "Rapid Turnaround / High Velocity";
      badgeColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    } else if (editHoursPerFinishedMin > 12) {
      efficiencyRating = "Premium Craft / Heavy VFX & Color";
      badgeColor = "text-purple-400 bg-purple-500/10 border-purple-500/20";
    }

    return {
      shootingRatio,
      editHoursPerFinishedMin,
      editToRawRatio,
      totalLaborHours,
      efficiencyRating,
      badgeColor,
    };
  }, [finishedMinutes, rawHours, editHours, shootDays]);

  // ---------------- Calculation 2: Budget ----------------
  const budgetMetrics = useMemo(() => {
    const totalCost = Math.max(0, preBudget + prodBudget + postBudget);
    const validMins = Math.max(0.1, targetMins);

    const costPerFinishedMin = totalCost / validMins;
    const costPerSecond = costPerFinishedMin / 60;

    const prePct = totalCost > 0 ? (preBudget / totalCost) * 100 : 0;
    const prodPct = totalCost > 0 ? (prodBudget / totalCost) * 100 : 0;
    const postPct = totalCost > 0 ? (postBudget / totalCost) * 100 : 0;

    let tierLabel = "Professional Corporate Tier";
    let tierColor = "text-blue-400";
    if (costPerFinishedMin < 500) {
      tierLabel = "Creator / Lean Indie Tier";
      tierColor = "text-cyan-400";
    } else if (costPerFinishedMin > 4000) {
      tierLabel = "Broadcast Commercial / Premium Agency Tier";
      tierColor = "text-purple-400";
    }

    return {
      totalCost,
      costPerFinishedMin,
      costPerSecond,
      prePct,
      prodPct,
      postPct,
      tierLabel,
      tierColor,
    };
  }, [preBudget, prodBudget, postBudget, targetMins]);

  // ---------------- Calculation 3: Schedule ----------------
  const scheduleMetrics = useMemo(() => {
    const validEditors = Math.max(1, editorCount);
    const validDailyHours = Math.max(1, hoursPerDay);
    const validHours = Math.max(1, totalPostHours);

    // Raw Working Days
    const netWorkingDays = validHours / (validEditors * validDailyHours);

    // Buffer for client revisions (each round adds approx 2 calendar days for review & tweak)
    const revisionBufferDays = revisionRounds * 2.0;

    // Total business days
    const businessDays = Math.ceil(netWorkingDays + revisionBufferDays);

    // Calendar Days (assuming 5-day work week -> 1.4x factor for weekends)
    const calendarDays = Math.ceil(businessDays * 1.35);

    // Estimated Delivery Date from today
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + calendarDays);

    const formattedDate = deliveryDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return {
      netWorkingDays: netWorkingDays.toFixed(1),
      businessDays,
      calendarDays,
      formattedDate,
    };
  }, [totalPostHours, editorCount, hoursPerDay, revisionRounds]);

  // Copy Executive Report
  const handleCopyReport = () => {
    const report = `=====================================================
VIDEO PRODUCTION PRODUCTIVITY & ESTIMATE REPORT
Generated by: productivitycalculator.work/calculator/video-production
=====================================================

[1. PRODUCTION OUTPUT & EFFICIENCY]
- Finished Video Duration  : ${finishedMinutes} min
- Raw Footage Captured     : ${rawHours} hrs
- Editing & Post Hours     : ${editHours} hrs
- Shooting Ratio           : ${efficiencyMetrics.shootingRatio.toFixed(1)}:1 (Raw min : Finished min)
- Editing Pace             : ${efficiencyMetrics.editHoursPerFinishedMin.toFixed(1)} edit hrs / finished min
- Production Velocity      : ${efficiencyMetrics.efficiencyRating}

[2. BUDGET & COST PER FINISHED MINUTE]
- Pre-Production Budget    : $${preBudget.toLocaleString()} (${budgetMetrics.prePct.toFixed(1)}%)
- Production Crew & Gear   : $${prodBudget.toLocaleString()} (${budgetMetrics.prodPct.toFixed(1)}%)
- Post-Production & VFX    : $${postBudget.toLocaleString()} (${budgetMetrics.postPct.toFixed(1)}%)
- Total Project Cost       : $${budgetMetrics.totalCost.toLocaleString()}
- Cost Per Finished Minute : $${budgetMetrics.costPerFinishedMin.toLocaleString(undefined, { maximumFractionDigits: 0 })}/min
- Cost Per Second          : $${budgetMetrics.costPerSecond.toFixed(2)}/sec
- Production Class         : ${budgetMetrics.tierLabel}

[3. TURNAROUND & CREW SCHEDULING]
- Dedicated Video Editors  : ${editorCount} editor(s) @ ${hoursPerDay}h/day
- Net Editing Working Days : ${scheduleMetrics.netWorkingDays} days
- Revisions & Feedback     : ${revisionRounds} round(s)
- Estimated Calendar Days  : ${scheduleMetrics.calendarDays} days
- Target Delivery Date     : ${scheduleMetrics.formattedDate}
=====================================================`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-card/60 backdrop-blur-md rounded-2xl border border-border/60 shadow-xl overflow-hidden">
      {/* Top Header Banner */}
      <div className="p-6 md:p-8 border-b border-border/40 bg-gradient-to-r from-cyan-500/10 via-background to-blue-500/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>Broadcast &amp; Studio Production Suite</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-display">
              Video Production Calculator
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Estimate cost per finished minute, post-production turnaround time, and crew labor efficiency.
            </p>
          </div>

          <button
            onClick={handleCopyReport}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Estimate Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Export Production Brief</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Industry Presets */}
        <div className="mt-6 pt-5 border-t border-border/40">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2.5">
            Quick Project Presets:
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className="text-left p-2.5 rounded-lg bg-background/50 hover:bg-background/90 border border-border/40 hover:border-cyan-500/40 transition-all text-xs group"
              >
                <div className="font-semibold text-foreground group-hover:text-cyan-400 truncate">
                  {p.name}
                </div>
                <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                  {p.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-border/40 bg-muted/30 px-6 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("efficiency")}
          className={`py-3.5 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "efficiency"
              ? "border-cyan-500 text-cyan-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>1. Output &amp; Editing Pace</span>
        </button>

        <button
          onClick={() => setActiveTab("budget")}
          className={`py-3.5 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "budget"
              ? "border-cyan-500 text-cyan-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>2. Budget &amp; Cost Per Minute</span>
        </button>

        <button
          onClick={() => setActiveTab("schedule")}
          className={`py-3.5 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "schedule"
              ? "border-cyan-500 text-cyan-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>3. Turnaround &amp; Crew Schedule</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-6 md:p-8">
        {/* ===================== TAB 1: EFFICIENCY ===================== */}
        {activeTab === "efficiency" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Form Inputs */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Footage &amp; Labor Parameters</span>
                </h3>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Finished Video Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={finishedMinutes}
                    onChange={(e) => setFinishedMinutes(parseFloat(e.target.value) || 0.1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    e.g., 3 mins for brand video, 10 mins for YouTube, 0.5 for TV spot
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Raw Footage Shot (hours)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={rawHours}
                    onChange={(e) => setRawHours(parseFloat(e.target.value) || 0.1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Total camera footage captured across all A/B cams
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Editing &amp; Post-Production Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={editHours}
                    onChange={(e) => setEditHours(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Assembly, rough cut, color grade, sound design, and export
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Shooting Days on Set
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={shootDays}
                    onChange={(e) => setShootDays(parseFloat(e.target.value) || 0.5)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>
              </div>

              {/* Right Output Dashboard */}
              <div className="bg-background/60 rounded-xl p-5 border border-border/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Editing Velocity Metrics
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Shooting Ratio</div>
                      <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                        {efficiencyMetrics.shootingRatio.toFixed(0)}:1
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Raw min vs finished min
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Editing Pace</div>
                      <div className="text-2xl font-bold font-mono text-foreground mt-1">
                        {efficiencyMetrics.editHoursPerFinishedMin.toFixed(1)}h
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Per finished minute
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Total Production Labor Time:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {efficiencyMetrics.totalLaborHours} hours
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Edit-to-Raw Ratio:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {efficiencyMetrics.editToRawRatio.toFixed(1)}x edit time / raw footage
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Total Camera Footage:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {(rawHours * 60).toFixed(0)} raw minutes
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs font-medium flex items-center gap-2 ${efficiencyMetrics.badgeColor}`}>
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Classification: {efficiencyMetrics.efficiencyRating}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: BUDGET ===================== */}
        {activeTab === "budget" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Budget Inputs */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  <span>Cost Allocation Breakdown</span>
                </h3>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Pre-Production Budget ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={preBudget}
                    onChange={(e) => setPreBudget(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Scriptwriting, location scouting, storyboards, casting
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Production Budget ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={prodBudget}
                    onChange={(e) => setProdBudget(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    DP, sound recordist, studio rental, camera &amp; lighting kits
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Post-Production Budget ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={postBudget}
                    onChange={(e) => setPostBudget(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Editor day rates, color grade, audio mixing, music rights
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Delivered Video Length (minutes)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={targetMins}
                    onChange={(e) => setTargetMins(parseFloat(e.target.value) || 0.1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>
              </div>

              {/* Right Budget Output */}
              <div className="bg-background/60 rounded-xl p-5 border border-border/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Cost per Finished Unit
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Cost Per Minute</div>
                      <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                        ${budgetMetrics.costPerFinishedMin.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Delivered runtime
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Total Budget</div>
                      <div className="text-2xl font-bold font-mono text-foreground mt-1">
                        ${budgetMetrics.totalCost.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        ${budgetMetrics.costPerSecond.toFixed(2)} / second
                      </div>
                    </div>
                  </div>

                  {/* Budget Allocation Progress Bar */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                      <span>Budget Distribution</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-muted overflow-hidden flex">
                      <div
                        style={{ width: `${budgetMetrics.prePct}%` }}
                        className="bg-amber-500 h-full transition-all"
                        title={`Pre-production: ${budgetMetrics.prePct.toFixed(1)}%`}
                      />
                      <div
                        style={{ width: `${budgetMetrics.prodPct}%` }}
                        className="bg-cyan-500 h-full transition-all"
                        title={`Production: ${budgetMetrics.prodPct.toFixed(1)}%`}
                      />
                      <div
                        style={{ width: `${budgetMetrics.postPct}%` }}
                        className="bg-purple-500 h-full transition-all"
                        title={`Post-production: ${budgetMetrics.postPct.toFixed(1)}%`}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                        Pre: {budgetMetrics.prePct.toFixed(0)}%
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
                        Prod: {budgetMetrics.prodPct.toFixed(0)}%
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                        Post: {budgetMetrics.postPct.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/40 border border-border/40 text-xs">
                  <div className="text-muted-foreground">Project Benchmark Tier:</div>
                  <div className={`font-semibold mt-0.5 ${budgetMetrics.tierColor}`}>
                    {budgetMetrics.tierLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: SCHEDULE ===================== */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Schedule Inputs */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Post-Production Timeline Parameters</span>
                </h3>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Total Post-Production Labor Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="2"
                    value={totalPostHours}
                    onChange={(e) => setTotalPostHours(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Sum of offline edit, motion graphics, audio sweetening &amp; rendering
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Dedicated Video Editors
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    step="1"
                    value={editorCount}
                    onChange={(e) => setEditorCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Daily Working Hours per Editor
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="12"
                    step="1"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 8)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Client Feedback &amp; Revision Rounds
                  </label>
                  <select
                    value={revisionRounds}
                    onChange={(e) => setRevisionRounds(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value={1}>1 Round (Rough Cut + Final Tweak)</option>
                    <option value={2}>2 Rounds (Standard Agency Flow)</option>
                    <option value={3}>3 Rounds (Stakeholder Committee)</option>
                    <option value={4}>4 Rounds (Intensive Corporate Review)</option>
                  </select>
                </div>
              </div>

              {/* Right Schedule Output */}
              <div className="bg-background/60 rounded-xl p-5 border border-border/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Turnaround Timeline Forecast
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Calendar Days</div>
                      <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                        {scheduleMetrics.calendarDays} Days
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Including weekends &amp; reviews
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Target Delivery</div>
                      <div className="text-lg font-bold font-mono text-foreground mt-1">
                        {scheduleMetrics.formattedDate}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Final Master Export
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Net Editor Workdays:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {scheduleMetrics.netWorkingDays} days
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Total Work Days (with reviews):</span>
                      <span className="font-mono font-semibold text-foreground">
                        {scheduleMetrics.businessDays} business days
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Daily Team Production Bandwidth:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {editorCount * hoursPerDay} labor hrs/day
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>
                    Plan 2 business days per revision cycle to protect turnaround deadlines.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
