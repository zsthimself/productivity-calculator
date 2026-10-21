/**
 * @INPUT: React hooks, UI primitives (Card, Button, Input, Label), Lucide icons
 * @OUTPUT: PhysicalTherapyCalculator - 专为全美 PT/OT/SLP 打造的临床绩效与打卡下班倒推计算器
 * @POS: 垂直行业定制核心组件 - 替代通用计算器，直击全美治疗师 Medicare 85% 考核与下班倒推痛点
 *
 * 功能特性:
 * 1. 每日绩效达标核算 (Daily Productivity %) - 扣除无薪午休，对比 85% 临床基线，提供分钟级缓冲预警
 * 2. 下班倒推规划器 (Reverse Clock-Out Planner) - 基于今日已完成治疗分钟数，精确倒推最早下班打卡时刻
 * 3. Medicare 8分钟计费规则换算 (CMS 8-Minute Rule) - 1~8 单元计费区间对照，一键导入治疗总时长
 * 4. 临床工作日志一键复制 (EMR Ready) - 便捷生成结构化文字摘要，方便粘贴至医疗系统
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 components/_META.md。
 */
"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Clock,
  Calculator,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";

type ActiveTab = "calculator" | "clockout" | "medicare";

interface BenchmarkPreset {
  label: string;
  value: number;
  setting: string;
}

const PRESETS: BenchmarkPreset[] = [
  { label: "75%", value: 75, setting: "Subacute / SNF" },
  { label: "80%", value: 80, setting: "Acute Hospital" },
  { label: "85%", value: 85, setting: "Outpatient / Standard" },
  { label: "90%", value: 90, setting: "High-Volume Clinic" },
];

const MEDICARE_UNITS = [
  { units: 1, min: 8, max: 22, midpoint: 15 },
  { units: 2, min: 23, max: 37, midpoint: 30 },
  { units: 3, min: 38, max: 52, midpoint: 45 },
  { units: 4, min: 53, max: 67, midpoint: 60 },
  { units: 5, min: 68, max: 82, midpoint: 75 },
  { units: 6, min: 83, max: 97, midpoint: 90 },
  { units: 7, min: 98, max: 112, midpoint: 105 },
  { units: 8, min: 113, max: 127, midpoint: 120 },
];

export default function PhysicalTherapyCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("calculator");

  // Tab 1: Productivity % Inputs
  const [treatmentMinutes, setTreatmentMinutes] = useState<string>("360");
  const [shiftHours, setShiftHours] = useState<string>("8.0");
  const [lunchMinutes, setLunchMinutes] = useState<string>("30");
  const [targetPercent, setTargetPercent] = useState<number>(85);

  // Tab 2: Clock-out Planner Inputs
  const [clockInTime, setClockInTime] = useState<string>("08:00");
  const [completedTxMinutes, setCompletedTxMinutes] = useState<string>("340");
  const [clockoutLunch, setClockoutLunch] = useState<string>("30");
  const [clockoutTarget, setClockoutTarget] = useState<number>(85);

  // Tab 3: Medicare Units Count
  const [unitCounts, setUnitCounts] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 6,
  });

  const [copied, setCopied] = useState(false);

  // Load saved preferences from LocalStorage
  useEffect(() => {
    try {
      const savedTarget = localStorage.getItem("pt_target_percent");
      if (savedTarget) {
        setTargetPercent(Number(savedTarget));
        setClockoutTarget(Number(savedTarget));
      }
      const savedLunch = localStorage.getItem("pt_lunch_minutes");
      if (savedLunch) {
        setLunchMinutes(savedLunch);
        setClockoutLunch(savedLunch);
      }
      const savedShift = localStorage.getItem("pt_shift_hours");
      if (savedShift) setShiftHours(savedShift);
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const savePreferences = (target: number, lunch: string, shift?: string) => {
    try {
      localStorage.setItem("pt_target_percent", target.toString());
      localStorage.setItem("pt_lunch_minutes", lunch);
      if (shift) localStorage.setItem("pt_shift_hours", shift);
    } catch {
      // ignore
    }
  };

  // Calculations for Tab 1
  const productivityStats = useMemo(() => {
    const tx = parseFloat(treatmentMinutes) || 0;
    const hours = parseFloat(shiftHours) || 0;
    const lunch = parseFloat(lunchMinutes) || 0;

    const totalShiftMins = Math.max(0, hours * 60);
    const paidMinutes = Math.max(0, totalShiftMins - lunch);
    const productivity = paidMinutes > 0 ? (tx / paidMinutes) * 100 : 0;
    const targetMinutesNeeded = (paidMinutes * targetPercent) / 100;
    const minuteVariance = tx - targetMinutesNeeded;
    const docAndNonBillableMins = Math.max(0, paidMinutes - tx);

    return {
      productivity: Math.round(productivity * 10) / 10,
      totalShiftMins,
      paidMinutes,
      targetMinutesNeeded: Math.round(targetMinutesNeeded * 10) / 10,
      minuteVariance: Math.round(minuteVariance * 10) / 10,
      isMet: productivity >= targetPercent,
      docAndNonBillableMins,
      txMinutes: tx,
    };
  }, [treatmentMinutes, shiftHours, lunchMinutes, targetPercent]);

  // Calculations for Tab 2: Clock-Out Planner
  const clockoutStats = useMemo(() => {
    const completedTx = parseFloat(completedTxMinutes) || 0;
    const lunch = parseFloat(clockoutLunch) || 0;
    const target = clockoutTarget > 0 ? clockoutTarget / 100 : 0.85;

    // Required paid minutes to achieve target%: CompletedTx / target%
    const requiredPaidMinutes = completedTx > 0 ? Math.ceil(completedTx / target) : 0;
    // Total clock-in span = requiredPaidMinutes + lunch
    const totalOnSiteMinutes = requiredPaidMinutes + lunch;

    // Parse clockInTime (HH:MM)
    const [hh, mm] = clockInTime.split(":").map((v) => parseInt(v, 10) || 0);
    const inTotalMins = hh * 60 + mm;
    const outTotalMins = inTotalMins + totalOnSiteMinutes;

    const outHours24 = Math.floor(outTotalMins / 60) % 24;
    const outMins = outTotalMins % 60;

    // Format 12-hour AM/PM
    const period = outHours24 >= 12 ? "PM" : "AM";
    const outHours12 = outHours24 % 12 === 0 ? 12 : outHours24 % 12;
    const formattedClockOut = `${outHours12.toString().padStart(2, "0")}:${outMins
      .toString()
      .padStart(2, "0")} ${period}`;

    return {
      requiredPaidMinutes,
      totalOnSiteMinutes,
      formattedClockOut,
      completedTx,
    };
  }, [clockInTime, completedTxMinutes, clockoutLunch, clockoutTarget]);

  // Medicare Unit Sum Calculation
  const medicareSum = useMemo(() => {
    let totalMinutes = 0;
    let totalUnits = 0;
    Object.entries(unitCounts).forEach(([unitsStr, count]) => {
      const u = parseInt(unitsStr, 10);
      const c = count || 0;
      totalUnits += u * c;
      const rule = MEDICARE_UNITS.find((m) => m.units === u);
      if (rule) {
        totalMinutes += rule.midpoint * c;
      }
    });
    return { totalUnits, totalMinutes };
  }, [unitCounts]);

  const addQuickMinutes = (mins: number) => {
    const current = parseFloat(treatmentMinutes) || 0;
    setTreatmentMinutes((current + mins).toString());
  };

  const applyMedicareToTx = () => {
    setTreatmentMinutes(medicareSum.totalMinutes.toString());
    setCompletedTxMinutes(medicareSum.totalMinutes.toString());
    setActiveTab("calculator");
  };

  const copySummary = () => {
    const text = [
      `--- Physical Therapy Productivity Report ---`,
      `Date: ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
      `Scheduled Shift: ${shiftHours} hrs (${productivityStats.totalShiftMins} mins) | Unpaid Lunch: ${lunchMinutes} mins`,
      `Paid Working Time: ${productivityStats.paidMinutes} mins`,
      `Billable Treatment Time: ${treatmentMinutes} mins`,
      `Non-Billable / Documentation: ${productivityStats.docAndNonBillableMins} mins`,
      `Actual Productivity: ${productivityStats.productivity}% (Target Goal: ${targetPercent}%)`,
      `Clinical Status: ${
        productivityStats.isMet
          ? `Quota Met (+${productivityStats.minuteVariance} mins buffer)`
          : `Deficit of ${Math.abs(productivityStats.minuteVariance)} treatment mins`
      }`,
      `Verified with https://productivitycalculator.work/calculator/physical-therapy`,
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] max-w-xl mx-auto shadow-lg">
        <button
          onClick={() => setActiveTab("calculator")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs md:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "calculator"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_15px_rgba(0,255,242,0.4)]"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-elevated)]"
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Productivity %</span>
        </button>

        <button
          onClick={() => setActiveTab("clockout")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs md:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "clockout"
              ? "bg-[var(--neon-pink)] text-white shadow-[0_0_15px_rgba(255,0,229,0.4)]"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-elevated)]"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Clock-Out Planner</span>
        </button>

        <button
          onClick={() => setActiveTab("medicare")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs md:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "medicare"
              ? "bg-[var(--neon-purple)] text-white shadow-[0_0_15px_rgba(157,0,255,0.4)]"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-elevated)]"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>8-Minute Rule</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTIVITY PERCENTAGE CALCULATOR */}
      {activeTab === "calculator" && (
        <Card className="card-neon border-[var(--neon-cyan)]/30 rounded-2xl overflow-hidden backdrop-blur-xl">
          <CardHeader className="border-b border-[var(--border)] pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="font-display text-xl md:text-2xl text-white flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-[var(--neon-cyan)]" />
                  Daily Physical Therapy Productivity Calculator
                </CardTitle>
                <CardDescription className="text-[var(--text-secondary)] font-body mt-1">
                  Standard CMS/Medicare billing quota calculator with unpaid lunch deduction.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copySummary}
                  className="neon-border text-xs gap-1.5 cursor-pointer hover:bg-[var(--neon-cyan)]/10"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy EMR Note"}</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-8">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Treatment Minutes Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-white flex items-center gap-1.5">
                    <span>Direct Treatment (Tx Minutes)</span>
                    <span className="text-[var(--neon-cyan)] font-mono text-xs">*Billable</span>
                  </Label>
                  <span className="text-xs text-[var(--text-muted)]">Direct Patient Care</span>
                </div>
                <Input
                  type="number"
                  min="0"
                  max="1440"
                  value={treatmentMinutes}
                  onChange={(e) => setTreatmentMinutes(e.target.value)}
                  placeholder="e.g. 360"
                  className="font-mono text-lg bg-[var(--bg-elevated)] border-[var(--border)] text-white focus:border-[var(--neon-cyan)]"
                />
                {/* Quick Add Pills */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-[var(--text-muted)]">Quick add:</span>
                  {[15, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => addQuickMinutes(mins)}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--neon-cyan)] border border-transparent transition-all cursor-pointer"
                    >
                      +{mins}m
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setTreatmentMinutes("0")}
                    className="ml-auto text-xs text-[var(--text-muted)] hover:text-rose-400 cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                </div>
              </div>

              {/* Shift Hours Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-white">Scheduled Shift Length</Label>
                  <span className="text-xs text-[var(--text-muted)]">Total On-Clock Time</span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.25"
                    min="1"
                    max="24"
                    value={shiftHours}
                    onChange={(e) => {
                      setShiftHours(e.target.value);
                      savePreferences(targetPercent, lunchMinutes, e.target.value);
                    }}
                    placeholder="e.g. 8.0"
                    className="font-mono text-lg bg-[var(--bg-elevated)] border-[var(--border)] text-white focus:border-[var(--neon-cyan)] pr-16"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-[var(--text-muted)]">Hours</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {[7.5, 8.0, 8.5, 10.0].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => {
                        setShiftHours(h.toString());
                        savePreferences(targetPercent, lunchMinutes, h.toString());
                      }}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                        parseFloat(shiftHours) === h
                          ? "bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/40"
                          : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-white"
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Unpaid Lunch Break */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-white">Unpaid Lunch Break</Label>
                  <span className="text-xs text-[var(--text-muted)]">Deducted from Shift</span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    max="180"
                    value={lunchMinutes}
                    onChange={(e) => {
                      setLunchMinutes(e.target.value);
                      savePreferences(targetPercent, e.target.value, shiftHours);
                    }}
                    placeholder="e.g. 30"
                    className="font-mono text-lg bg-[var(--bg-elevated)] border-[var(--border)] text-white focus:border-[var(--neon-cyan)] pr-16"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-[var(--text-muted)]">Minutes</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {[0, 30, 45, 60].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setLunchMinutes(m.toString());
                        savePreferences(targetPercent, m.toString(), shiftHours);
                      }}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                        parseInt(lunchMinutes, 10) === m
                          ? "bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/40"
                          : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-white"
                      }`}
                    >
                      {m === 0 ? "No Lunch" : `${m}m`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Productivity Goal */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-white">Productivity Target</Label>
                  <span className="text-xs text-[var(--neon-cyan)] font-mono">{targetPercent}%</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => {
                        setTargetPercent(p.value);
                        savePreferences(p.value, lunchMinutes, shiftHours);
                      }}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        targetPercent === p.value
                          ? "bg-[var(--neon-cyan)]/15 border-[var(--neon-cyan)] text-white shadow-[0_0_12px_rgba(0,255,242,0.2)]"
                          : "bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-secondary)] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm">{p.label}</span>
                        <span className="text-[10px] uppercase font-mono text-[var(--text-muted)]">{p.setting}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESULTS DASHBOARD */}
            <div className="p-6 md:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] w-full"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Main Metric */}
                <div className="text-center md:text-left space-y-2">
                  <span className="text-xs uppercase font-display tracking-widest text-[var(--text-muted)]">
                    Calculated Productivity
                  </span>
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                    <span
                      className={`font-display text-5xl md:text-6xl font-black tracking-tight ${
                        productivityStats.isMet ? "text-[var(--neon-cyan)]" : "text-rose-400"
                      }`}
                    >
                      {productivityStats.productivity}%
                    </span>
                    <span className="text-sm font-mono text-[var(--text-muted)]">/ {targetPercent}% Target</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mt-2">
                    {productivityStats.isMet ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Target Met (+{productivityStats.minuteVariance} mins surplus)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-rose-400 bg-rose-950/60 border border-rose-800/60 px-3 py-1 rounded-full">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Under Target by {Math.abs(productivityStats.minuteVariance)} mins
                      </span>
                    )}
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3 font-body text-xs md:text-sm border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0 md:pl-6 col-span-2">
                  <div className="flex justify-between items-center text-[var(--text-secondary)]">
                    <span>Paid Shift Work Time (Shift − Lunch):</span>
                    <span className="font-mono text-white font-semibold">
                      {Math.floor(productivityStats.paidMinutes / 60)}h {productivityStats.paidMinutes % 60}m (
                      {productivityStats.paidMinutes}m)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[var(--text-secondary)]">
                    <span>Direct Billable Care Minutes:</span>
                    <span className="font-mono text-[var(--neon-cyan)] font-semibold">
                      {productivityStats.txMinutes} mins (
                      {(productivityStats.txMinutes / 60).toFixed(1)} hrs)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[var(--text-secondary)]">
                    <span>Non-Billable & Documentation Time:</span>
                    <span className="font-mono text-white">
                      {productivityStats.docAndNonBillableMins} mins (
                      {(productivityStats.docAndNonBillableMins / 60).toFixed(1)} hrs)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[var(--text-secondary)] pt-2 border-t border-[var(--border)]/50">
                    <span>Required Tx Minutes to Hit {targetPercent}%:</span>
                    <span className="font-mono font-bold text-[var(--neon-pink)]">
                      {productivityStats.targetMinutesNeeded} mins
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: REVERSE CLOCK-OUT PLANNER */}
      {activeTab === "clockout" && (
        <Card className="card-neon border-[var(--neon-pink)]/30 rounded-2xl overflow-hidden backdrop-blur-xl">
          <CardHeader className="border-b border-[var(--border)] pb-5">
            <CardTitle className="font-display text-xl md:text-2xl text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-[var(--neon-pink)]" />
              Physical Therapy Clock-Out Time Planner
            </CardTitle>
            <CardDescription className="text-[var(--text-secondary)] font-body mt-1">
              Reverse calculator: Know the exact minute you can clock out today based on your treated minutes.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Clock-In Time */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[var(--neon-pink)]" />
                  Clock-In Time
                </Label>
                <Input
                  type="time"
                  value={clockInTime}
                  onChange={(e) => setClockInTime(e.target.value)}
                  className="font-mono text-lg bg-[var(--bg-elevated)] border-[var(--border)] text-white focus:border-[var(--neon-pink)]"
                />
                <p className="text-xs text-[var(--text-muted)]">Your official badge swipe time this morning</p>
              </div>

              {/* Billable Minutes Treated Today */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-white">Billable Minutes Treated So Far</Label>
                <Input
                  type="number"
                  min="0"
                  max="1440"
                  value={completedTxMinutes}
                  onChange={(e) => setCompletedTxMinutes(e.target.value)}
                  placeholder="e.g. 340"
                  className="font-mono text-lg bg-[var(--bg-elevated)] border-[var(--border)] text-white focus:border-[var(--neon-pink)]"
                />
                <p className="text-xs text-[var(--text-muted)]">Total treatment units converted to minutes</p>
              </div>

              {/* Lunch Duration */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-white">Unpaid Lunch Break Duration</Label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    max="120"
                    value={clockoutLunch}
                    onChange={(e) => setClockoutLunch(e.target.value)}
                    className="font-mono text-lg bg-[var(--bg-elevated)] border-[var(--border)] text-white focus:border-[var(--neon-pink)] pr-16"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-[var(--text-muted)]">Mins</span>
                </div>
              </div>

              {/* Target Quota */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-white">Target Productivity Percentage</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[75, 80, 85, 90].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setClockoutTarget(t)}
                      className={`py-2 rounded-lg font-mono text-sm font-semibold transition-all cursor-pointer ${
                        clockoutTarget === t
                          ? "bg-[var(--neon-pink)] text-white shadow-[0_0_10px_rgba(255,0,229,0.3)]"
                          : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-white"
                      }`}
                    >
                      {t}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CLOCK OUT RESULT BANNER */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-surface)] border border-[var(--neon-pink)]/40 relative overflow-hidden text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase font-display tracking-widest text-[var(--neon-pink)] font-semibold flex items-center justify-center md:justify-start gap-1.5 mb-2">
                    <Sparkles className="w-4 h-4" /> Recommended Safe Clock-Out Time
                  </span>
                  <div className="font-display text-5xl md:text-6xl font-black text-white tracking-tight text-gradient">
                    {clockoutStats.formattedClockOut}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] font-body mt-2">
                    Clocking out at this time will give you exactly{" "}
                    <span className="text-[var(--neon-pink)] font-semibold">{clockoutTarget}%</span> productivity based
                    on your {clockoutStats.completedTx} treatment minutes.
                  </p>
                </div>

                <div className="w-full md:w-auto p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono text-[var(--text-secondary)] min-w-[220px]">
                  <div className="flex justify-between">
                    <span>Required Paid Time:</span>
                    <span className="text-white font-semibold">
                      {Math.floor(clockoutStats.requiredPaidMinutes / 60)}h {clockoutStats.requiredPaidMinutes % 60}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unpaid Lunch:</span>
                    <span className="text-white font-semibold">{clockoutLunch} mins</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 text-[var(--neon-pink)] font-bold">
                    <span>Total Shift Span:</span>
                    <span>
                      {Math.floor(clockoutStats.totalOnSiteMinutes / 60)}h {clockoutStats.totalOnSiteMinutes % 60}m
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 3: MEDICARE 8-MINUTE RULE QUICK CONVERTER */}
      {activeTab === "medicare" && (
        <Card className="card-neon border-[var(--neon-purple)]/30 rounded-2xl overflow-hidden backdrop-blur-xl">
          <CardHeader className="border-b border-[var(--border)] pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="font-display text-xl md:text-2xl text-white flex items-center gap-2">
                  <Layers className="w-6 h-6 text-[var(--neon-purple)]" />
                  Medicare 8-Minute Rule Quick Reference & Converter
                </CardTitle>
                <CardDescription className="text-[var(--text-secondary)] font-body mt-1">
                  CMS Part B timed billing code threshold converter for PT, OT, and SLP therapy sessions.
                </CardDescription>
              </div>

              {medicareSum.totalMinutes > 0 && (
                <Button
                  onClick={applyMedicareToTx}
                  className="bg-[var(--neon-purple)] text-white hover:bg-[var(--neon-purple)]/80 text-xs font-semibold gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(157,0,255,0.4)]"
                >
                  <span>Apply {medicareSum.totalMinutes}m to Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="p-4 rounded-xl bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/20 text-xs md:text-sm text-[var(--text-secondary)] font-body flex items-start gap-3">
              <Info className="w-5 h-5 text-[var(--neon-purple)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">How CMS 8-Minute Rule Works:</strong> To bill 1 unit of a timed code
                (like 97110 Therapeutic Exercise or 97140 Manual Therapy), you must treat the patient for at least 8
                minutes. Subsequent units are added in ~15-minute increments.
              </div>
            </div>

            {/* Units Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm font-body border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Billable Units</th>
                    <th className="py-3 px-4">Direct Treatment Range</th>
                    <th className="py-3 px-4">Standard Midpoint</th>
                    <th className="py-3 px-4 text-center">Patient Count Counter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]/50 font-mono">
                  {MEDICARE_UNITS.map((item) => (
                    <tr key={item.units} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">
                        {item.units} {item.units === 1 ? "Unit" : "Units"}
                      </td>
                      <td className="py-3 px-4 text-[var(--neon-cyan)]">
                        {item.min} – {item.max} minutes
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">{item.midpoint} mins</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setUnitCounts((prev) => ({
                                ...prev,
                                [item.units]: Math.max(0, (prev[item.units] || 0) - 1),
                              }))
                            }
                            className="w-7 h-7 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-white hover:border-[var(--neon-purple)] flex items-center justify-center text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-white font-bold">{unitCounts[item.units] || 0}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setUnitCounts((prev) => ({
                                ...prev,
                                [item.units]: (prev[item.units] || 0) + 1,
                              }))
                            }
                            className="w-7 h-7 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-white hover:border-[var(--neon-purple)] flex items-center justify-center text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Units Summary Card */}
            <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase font-display text-[var(--text-muted)]">Calculated Daily Total</span>
                <div className="font-display text-2xl font-bold text-white mt-0.5">
                  <span className="text-[var(--neon-purple)]">{medicareSum.totalUnits} Units</span> ≈{" "}
                  <span>{medicareSum.totalMinutes} Treatment Minutes</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUnitCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 })}
                  className="text-xs border-[var(--border)] text-[var(--text-muted)] hover:text-white cursor-pointer"
                >
                  Reset
                </Button>
                <Button
                  onClick={applyMedicareToTx}
                  className="bg-[var(--neon-purple)] text-white hover:bg-[var(--neon-purple)]/80 text-xs font-semibold cursor-pointer"
                >
                  Apply to Main Calculator
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 0-CLS High-eCPM AdSense Reserved Placement Banner */}
      <div className="w-full my-6 p-4 rounded-xl border border-dashed border-white/10 bg-black/20 flex flex-col items-center justify-center min-h-[100px] text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-1">
          Advertisement
        </span>
        <span className="text-xs text-[var(--text-secondary)] font-body">
          Specialized EMR & Clinical Practice Management Tools for Therapists
        </span>
      </div>
    </div>
  );
}
