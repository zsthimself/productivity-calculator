/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 DataEntryProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的数据录入效率、KPH/WPM 转换与每千条记录成本计算引擎，承接 /calculator/data-entry 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Keyboard,
  Clock,
  Gauge,
  Sliders,
  DollarSign,
  Copy,
  Check,
  Sparkles,
  Activity,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

type CalcMode = "kph_accuracy" | "wpm_velocity" | "cost_per_thousand";

export function DataEntryProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("kph_accuracy");
  const [copied, setCopied] = useState(false);

  // Mode 1: KPH & Net Accuracy
  const [grossKph, setGrossKph] = useState(10500);
  const [hourlyErrors, setHourlyErrors] = useState(28);
  const [penaltyMultiplier, setPenaltyMultiplier] = useState(5);
  const [shiftHours, setShiftHours] = useState(8);

  // Mode 2: WPM & Batch Velocity
  const [grossWpm, setGrossWpm] = useState(52);
  const [keystrokesPerRecord, setKeystrokesPerRecord] = useState(220);
  const [allocatedHours, setAllocatedHours] = useState(7.5);
  const [shiftTargetRecords, setShiftTargetRecords] = useState(320);

  // Mode 3: Cost Per 1,000 Records & BPO Economics
  const [hourlyWage, setHourlyWage] = useState(20.5);
  const [recordsPerHour, setRecordsPerHour] = useState(45);
  const [monthlyVolume, setMonthlyVolume] = useState(20000);
  const [reworkOverheadPct, setReworkOverheadPct] = useState(4.2);
  const [benchmarkOffshoreRate, setBenchmarkOffshoreRate] = useState(180);

  // Mode 1 Computations: KPH & Net Accuracy
  const mode1Stats = useMemo(() => {
    const gross = Math.max(100, grossKph);
    const errors = Math.max(0, hourlyErrors);
    const penalty = Math.max(1, penaltyMultiplier);
    const hours = Math.max(0.5, shiftHours);

    const deduction = errors * penalty;
    const netKph = Math.max(0, gross - deduction);
    const rawAccuracyPct = Math.max(0, ((gross - errors) / gross) * 100);
    const netAccuracyPct = Math.max(0, (netKph / gross) * 100);
    const equivalentWpm = netKph / 300;
    const shiftTotalNetKeystrokes = netKph * hours;

    let tierLabel = "Senior Production Clerk (Standard BPO Grade)";
    let tierColor = "text-indigo-400";
    let badgeBg = "bg-indigo-500/10 border-indigo-500/30";

    if (netKph >= 12000) {
      tierLabel = "Elite 10-Key Specialist (Top 5% Velocity)";
      tierColor = "text-emerald-400";
      badgeBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (netKph >= 9500) {
      tierLabel = "Proficient Production Operator (Standard Grade)";
      tierColor = "text-cyan-400";
      badgeBg = "bg-cyan-500/10 border-cyan-500/30";
    } else if (netKph < 7500) {
      tierLabel = "Sub-Benchmark Velocity (Remedial Training Required)";
      tierColor = "text-rose-400";
      badgeBg = "bg-rose-500/10 border-rose-500/30";
    }

    return {
      gross, errors, penalty, deduction, netKph, rawAccuracyPct,
      netAccuracyPct, equivalentWpm, shiftTotalNetKeystrokes,
      tierLabel, tierColor, badgeBg,
    };
  }, [grossKph, hourlyErrors, penaltyMultiplier, shiftHours]);

  // Mode 2 Computations: WPM & Batch Velocity
  const mode2Stats = useMemo(() => {
    const wpm = Math.max(5, grossWpm);
    const kpr = Math.max(10, keystrokesPerRecord);
    const hours = Math.max(0.5, allocatedHours);
    const target = Math.max(1, shiftTargetRecords);

    const hourlyKeystrokes = wpm * 300;
    const recPerHour = hourlyKeystrokes / kpr;
    const shiftCapacity = recPerHour * hours;
    const attainmentPct = (shiftCapacity / target) * 100;
    const secondsPerRecord = recPerHour > 0 ? 3600 / recPerHour : 0;
    const minutesFor100Records = recPerHour > 0 ? (100 / recPerHour) * 60 : 0;

    let velocityTier = "Balanced Batch Throughput";
    let tierColor = "text-indigo-400";
    let badgeBg = "bg-indigo-500/10 border-indigo-500/30";

    if (attainmentPct >= 115) {
      velocityTier = "Surplus Velocity (Target Exceeded)";
      tierColor = "text-emerald-400";
      badgeBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (attainmentPct < 85) {
      velocityTier = "Batch Backlog Risk (<85% Target)";
      tierColor = "text-rose-400";
      badgeBg = "bg-rose-500/10 border-rose-500/30";
    }

    return {
      hourlyKeystrokes, recPerHour, shiftCapacity, attainmentPct,
      secondsPerRecord, minutesFor100Records, velocityTier, tierColor, badgeBg,
    };
  }, [grossWpm, keystrokesPerRecord, allocatedHours, shiftTargetRecords]);

  // Mode 3 Computations: Cost Per 1,000 Records
  const mode3Stats = useMemo(() => {
    const wage = Math.max(1, hourlyWage);
    const rph = Math.max(1, recordsPerHour);
    const vol = Math.max(100, monthlyVolume);
    const rework = Math.max(0, reworkOverheadPct);
    const benchmark = Math.max(10, benchmarkOffshoreRate);

    const directCostPerRecord = wage / rph;
    const directCostPer1k = directCostPerRecord * 1000;
    const reworkDragPer1k = directCostPer1k * (rework / 100);
    const totalCostPer1k = directCostPer1k + reworkDragPer1k;
    const monthlyInHouseTotal = (totalCostPer1k / 1000) * vol;
    const monthlyBenchmarkTotal = (benchmark / 1000) * vol;
    const monthlyVariance = monthlyInHouseTotal - monthlyBenchmarkTotal;
    const costPerRecordWithRework = totalCostPer1k / 1000;

    let ecoRating = "Competitive Onshore Unit Cost";
    let ecoColor = "text-indigo-400";
    let ecoBg = "bg-indigo-500/10 border-indigo-500/30";

    if (totalCostPer1k <= benchmark) {
      ecoRating = "High Internal Cost Efficiency (< BPO Benchmark)";
      ecoColor = "text-emerald-400";
      ecoBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (monthlyVariance > 5000) {
      ecoRating = "Substantial Cost Premium vs Automation/Offshore";
      ecoColor = "text-amber-400";
      ecoBg = "bg-amber-500/10 border-amber-500/30";
    }

    return {
      directCostPerRecord, directCostPer1k, reworkDragPer1k, totalCostPer1k,
      monthlyInHouseTotal, monthlyBenchmarkTotal, monthlyVariance,
      costPerRecordWithRework, ecoRating, ecoColor, ecoBg,
    };
  }, [hourlyWage, recordsPerHour, monthlyVolume, reworkOverheadPct, benchmarkOffshoreRate]);

  // Presets
  const applyPreset = (preset: "medical_claims" | "ecommerce_catalog" | "financial_invoicing" | "legal_archival") => {
    if (preset === "medical_claims") {
      setGrossKph(11200); setHourlyErrors(22); setPenaltyMultiplier(8); setShiftHours(8);
      setGrossWpm(48); setKeystrokesPerRecord(320); setAllocatedHours(8); setShiftTargetRecords(260);
      setHourlyWage(24.5); setRecordsPerHour(38); setMonthlyVolume(15000); setReworkOverheadPct(5.5); setBenchmarkOffshoreRate(240);
    } else if (preset === "ecommerce_catalog") {
      setGrossKph(9800); setHourlyErrors(35); setPenaltyMultiplier(5); setShiftHours(7.5);
      setGrossWpm(55); setKeystrokesPerRecord(180); setAllocatedHours(7.5); setShiftTargetRecords(380);
      setHourlyWage(18.5); setRecordsPerHour(52); setMonthlyVolume(30000); setReworkOverheadPct(3.8); setBenchmarkOffshoreRate(140);
    } else if (preset === "financial_invoicing") {
      setGrossKph(13800); setHourlyErrors(15); setPenaltyMultiplier(10); setShiftHours(8);
      setGrossWpm(44); setKeystrokesPerRecord(210); setAllocatedHours(8); setShiftTargetRecords(450);
      setHourlyWage(22.0); setRecordsPerHour(62); setMonthlyVolume(25000); setReworkOverheadPct(2.5); setBenchmarkOffshoreRate(165);
    } else {
      setGrossKph(8600); setHourlyErrors(12); setPenaltyMultiplier(6); setShiftHours(7.5);
      setGrossWpm(58); setKeystrokesPerRecord(440); setAllocatedHours(7.5); setShiftTargetRecords(180);
      setHourlyWage(21.0); setRecordsPerHour(28); setMonthlyVolume(10000); setReworkOverheadPct(2.0); setBenchmarkOffshoreRate(290);
    }
  };

  const copyReport = () => {
    let report = "";
    if (mode === "kph_accuracy") {
      report = `### Data Entry Productivity Audit - KPH & Net Accuracy
- Gross Speed: ${mode1Stats.gross.toLocaleString()} KPH
- Keying Errors: ${mode1Stats.errors} errors/hr (Penalty: ${mode1Stats.penalty}x)
- Error Penalty Deduction: -${mode1Stats.deduction.toLocaleString()} KPH
- Net Billable KPH: ${Math.round(mode1Stats.netKph).toLocaleString()} Net KPH
- Raw Keystroke Accuracy: ${mode1Stats.rawAccuracyPct.toFixed(2)}%
- Net Accuracy: ${mode1Stats.netAccuracyPct.toFixed(2)}%
- Equivalent Typing Speed: ${mode1Stats.equivalentWpm.toFixed(1)} WPM
- Shift Output (8h): ${Math.round(mode1Stats.shiftTotalNetKeystrokes).toLocaleString()} Net Keystrokes
- Operator Tier: ${mode1Stats.tierLabel}`;
    } else if (mode === "wpm_velocity") {
      report = `### Data Entry Batch Velocity Audit
- Typing Speed: ${grossWpm} WPM (${Math.round(mode2Stats.hourlyKeystrokes).toLocaleString()} KPH gross)
- Complexity: ${keystrokesPerRecord} Keystrokes/Record
- Velocity: ${mode2Stats.recPerHour.toFixed(1)} Records/hr (${mode2Stats.secondsPerRecord.toFixed(1)}s per record)
- Shift Capacity (${allocatedHours}h): ${Math.round(mode2Stats.shiftCapacity)} Records
- Shift Target: ${shiftTargetRecords} Records (${mode2Stats.attainmentPct.toFixed(1)}% Attainment)
- 100-Record Batch Time: ${mode2Stats.minutesFor100Records.toFixed(1)} minutes
- Status: ${mode2Stats.velocityTier}`;
    } else {
      report = `### Data Entry Unit Cost & BPO Economic Audit
- Loaded Operator Wage: $${hourlyWage.toFixed(2)}/hr
- Output Throughput: ${recordsPerHour} Records/hr
- Direct Cost per Record: $${mode3Stats.directCostPerRecord.toFixed(4)}
- Direct Cost per 1,000 Records: $${mode3Stats.directCostPer1k.toFixed(2)}
- QA Rework Overhead (${reworkOverheadPct}%): +$${mode3Stats.reworkDragPer1k.toFixed(2)}/1k
- Fully Loaded Cost per 1,000 Records: $${mode3Stats.totalCostPer1k.toFixed(2)}/1k
- Monthly Volume: ${monthlyVolume.toLocaleString()} Records
- Monthly Internal Cost: $${Math.round(mode3Stats.monthlyInHouseTotal).toLocaleString()}
- BPO Benchmark ($${benchmarkOffshoreRate}/1k): $${Math.round(mode3Stats.monthlyBenchmarkTotal).toLocaleString()}
- Monthly Variance: ${mode3Stats.monthlyVariance >= 0 ? "+" : ""}$${Math.round(mode3Stats.monthlyVariance).toLocaleString()}
- Assessment: ${mode3Stats.ecoRating}`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-neon rounded-2xl p-6 md:p-8 mb-12 border border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-950/30">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            BPO & Back-Office Workstation Engine
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Data Entry Productivity Calculator
          </h2>
        </div>

        <button
          onClick={copyReport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-sm font-medium border border-slate-700/60 transition-all shadow-sm"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
          {copied ? "Audit Copied!" : "Export Markdown Audit"}
        </button>
      </div>

      {/* Preset Pills */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Industry Benchmark Profiles
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => applyPreset("medical_claims")}
            className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-cyan-950/30 border border-slate-800 hover:border-cyan-500/40 text-left text-xs transition-all group"
          >
            <div className="font-semibold text-slate-200 group-hover:text-cyan-300">CMS-1500 Medical</div>
            <div className="text-slate-400 text-[10px]">11.2k KPH · 8x Penalty</div>
          </button>
          <button
            onClick={() => applyPreset("ecommerce_catalog")}
            className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-cyan-950/30 border border-slate-800 hover:border-cyan-500/40 text-left text-xs transition-all group"
          >
            <div className="font-semibold text-slate-200 group-hover:text-cyan-300">E-Commerce SKU</div>
            <div className="text-slate-400 text-[10px]">9.8k KPH · 180 KPR</div>
          </button>
          <button
            onClick={() => applyPreset("financial_invoicing")}
            className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-cyan-950/30 border border-slate-800 hover:border-cyan-500/40 text-left text-xs transition-all group"
          >
            <div className="font-semibold text-slate-200 group-hover:text-cyan-300">Accounts Payable</div>
            <div className="text-slate-400 text-[10px]">13.8k 10-Key · 10x Penalty</div>
          </button>
          <button
            onClick={() => applyPreset("legal_archival")}
            className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-cyan-950/30 border border-slate-800 hover:border-cyan-500/40 text-left text-xs transition-all group"
          >
            <div className="font-semibold text-slate-200 group-hover:text-cyan-300">Legal Archival</div>
            <div className="text-slate-400 text-[10px]">58 WPM · 440 KPR</div>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex border-b border-slate-800 mb-8 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setMode("kph_accuracy")}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-all ${
            mode === "kph_accuracy"
              ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Keyboard className="w-4 h-4" />
          KPH & Net Accuracy
        </button>
        <button
          onClick={() => setMode("wpm_velocity")}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-all ${
            mode === "wpm_velocity"
              ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          WPM & Batch Velocity
        </button>
        <button
          onClick={() => setMode("cost_per_thousand")}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-all ${
            mode === "cost_per_thousand"
              ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Cost per 1,000 Records & BPO
        </button>
      </div>

      {/* Mode 1: KPH & Net Accuracy */}
      {mode === "kph_accuracy" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Gross Keystrokes Per Hour (KPH)</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {grossKph.toLocaleString()} KPH
                </span>
              </div>
              <input
                type="range"
                min="4000"
                max="18000"
                step="250"
                value={grossKph}
                onChange={(e) => setGrossKph(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Entry: 6,000</span>
                <span>Standard: 10,000</span>
                <span>Elite 10-Key: 15,000+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Keying Errors (per hour)</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {hourlyErrors} errors
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                step="1"
                value={hourlyErrors}
                onChange={(e) => setHourlyErrors(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Zero: 0</span>
                <span>Target: &lt;20</span>
                <span>Sub-par: &gt;60</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Error Penalty Multiplier</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {penaltyMultiplier}x penalty
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={penaltyMultiplier}
                onChange={(e) => setPenaltyMultiplier(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                BPO standards deduct 5x-10x keystrokes for QA auditing and record re-entry overhead.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Shift Length (Hours)</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {shiftHours} hrs
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={shiftHours}
                onChange={(e) => setShiftHours(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-slate-900/60 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className={`p-3 rounded-lg border text-xs font-medium ${mode1Stats.badgeBg} ${mode1Stats.tierColor}`}>
                <span className="font-bold">Operator Rating:</span> {mode1Stats.tierLabel}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
                    Net Billable KPH
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-300">
                    {Math.round(mode1Stats.netKph).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Deduced: -{mode1Stats.deduction.toLocaleString()} KPH
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Net Accuracy %
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">
                    {mode1Stats.netAccuracyPct.toFixed(2)}%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Raw: {mode1Stats.rawAccuracyPct.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Equivalent Prose Typing Speed:</span>
                  <span className="font-mono text-slate-200 font-semibold">{mode1Stats.equivalentWpm.toFixed(1)} WPM</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Shift Total Net Keystrokes ({shiftHours}h):</span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {Math.round(mode1Stats.shiftTotalNetKeystrokes).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Error Penalty Formula:</span>
                  <span className="font-mono text-cyan-400">Gross - ({hourlyErrors} × {penaltyMultiplier}x)</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 mt-4">
              Net KPH is the standard SLA metric utilized in enterprise BPO, medical billing, and insurance claims processing.
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: WPM & Batch Velocity */}
      {mode === "wpm_velocity" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Gross Typing Speed (WPM)</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {grossWpm} WPM
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                value={grossWpm}
                onChange={(e) => setGrossWpm(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Avg: 40 WPM</span>
                <span>Fast: 65 WPM</span>
                <span>Pro: 85+ WPM</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Keystrokes per Record / Form</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {keystrokesPerRecord} keystrokes
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="600"
                step="10"
                value={keystrokesPerRecord}
                onChange={(e) => setKeystrokesPerRecord(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Short SKU: 80</span>
                <span>Invoice: 220</span>
                <span>CMS-1500: 380+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Allocated Processing Hours</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {allocatedHours} hrs
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="0.5"
                value={allocatedHours}
                onChange={(e) => setAllocatedHours(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Shift Target Batch Quota</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {shiftTargetRecords} records
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="10"
                value={shiftTargetRecords}
                onChange={(e) => setShiftTargetRecords(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-slate-900/60 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className={`p-3 rounded-lg border text-xs font-medium ${mode2Stats.badgeBg} ${mode2Stats.tierColor}`}>
                <span className="font-bold">Throughput Status:</span> {mode2Stats.velocityTier}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
                    Throughput Rate
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-300">
                    {mode2Stats.recPerHour.toFixed(1)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Records / hour
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Cycle Time / Record
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">
                    {mode2Stats.secondsPerRecord.toFixed(1)}s
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    per completed form
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Shift Total Capacity ({allocatedHours}h):</span>
                  <span className="font-mono text-slate-200 font-semibold">{Math.round(mode2Stats.shiftCapacity)} Records</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Quota Target Attainment:</span>
                  <span className="font-mono text-cyan-400 font-semibold">{mode2Stats.attainmentPct.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Time to Complete 100 Records:</span>
                  <span className="font-mono text-slate-200 font-semibold">
                    {mode2Stats.minutesFor100Records.toFixed(1)} mins ({(mode2Stats.minutesFor100Records / 60).toFixed(2)} hrs)
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Hourly Keystrokes (WPM × 300):</span>
                  <span className="font-mono text-slate-300">{Math.round(mode2Stats.hourlyKeystrokes).toLocaleString()} KPH</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 mt-4">
              Conversion formula: 1 WPM = 5 Keystrokes × 60 mins = 300 KPH. Records/hr = (WPM × 300) ÷ Keystrokes Per Record.
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Cost Per 1,000 Records & BPO Economics */}
      {mode === "cost_per_thousand" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Hourly Loaded Wage ($)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  step="0.5"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Records Completed / Hour</label>
                <input
                  type="number"
                  min="5"
                  max="200"
                  step="1"
                  value={recordsPerHour}
                  onChange={(e) => setRecordsPerHour(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Monthly Record Volume</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {monthlyVolume.toLocaleString()} records
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="100000"
                step="1000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">QA Error Rework Overhead (%)</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {reworkOverheadPct.toFixed(1)}% drag
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.2"
                value={reworkOverheadPct}
                onChange={(e) => setReworkOverheadPct(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Accounts for manager review, discrepancy resolution, and customer support disputes.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Offshore / BPO Benchmark Rate ($ per 1k Records)
              </label>
              <input
                type="number"
                min="20"
                max="600"
                step="5"
                value={benchmarkOffshoreRate}
                onChange={(e) => setBenchmarkOffshoreRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-slate-900/60 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className={`p-3 rounded-lg border text-xs font-medium ${mode3Stats.ecoBg} ${mode3Stats.ecoColor}`}>
                <span className="font-bold">Economic Assessment:</span> {mode3Stats.ecoRating}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                    Unit Cost / 1k Records
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-300">
                    ${mode3Stats.totalCostPer1k.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Direct: ${mode3Stats.directCostPer1k.toFixed(2)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    Cost Per Single Record
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">
                    ${mode3Stats.costPerRecordWithRework.toFixed(4)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    includes {reworkOverheadPct}% rework
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Monthly In-House Spend ({monthlyVolume.toLocaleString()} recs):</span>
                  <span className="font-mono text-slate-200 font-semibold">
                    ${Math.round(mode3Stats.monthlyInHouseTotal).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">External BPO Benchmark Total:</span>
                  <span className="font-mono text-slate-200 font-semibold">
                    ${Math.round(mode3Stats.monthlyBenchmarkTotal).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Monthly Variance (Internal vs BPO):</span>
                  <span className={`font-mono font-bold ${mode3Stats.monthlyVariance <= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                    {mode3Stats.monthlyVariance <= 0 ? "-" : "+"}${Math.abs(Math.round(mode3Stats.monthlyVariance)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Rework Drag Penalty / 1k:</span>
                  <span className="font-mono text-rose-400">+${mode3Stats.reworkDragPer1k.toFixed(2)} / 1k</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 mt-4">
              Fully Loaded Cost per 1k = (Hourly Wage ÷ Records per Hour × 1,000) × (1 + Rework Drag %).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataEntryProductivityCalculator;
