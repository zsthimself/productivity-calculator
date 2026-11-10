/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 ConstructionProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的建筑施工劳务工效、班组进度与成本 CPI 计算引擎，承接 /calculator/construction 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  HardHat,
  Clock,
  Gauge,
  Sliders,
  DollarSign,
  Copy,
  Check,
  Sparkles,
  Activity,
  Layers,
  Calendar,
  AlertTriangle,
} from "lucide-react";

type CalcMode = "labor_rate" | "crew_velocity" | "cost_cpi";

export function ConstructionProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("labor_rate");
  const [copied, setCopied] = useState(false);

  // --- Mode 1: Labor Productivity & Unit Rate ---
  const [workUnitsCompleted, setWorkUnitsCompleted] = useState(250.0);
  const [unitType, setUnitType] = useState("m³ Concrete");
  const [totalLaborHours, setTotalLaborHours] = useState(225.0);
  const [benchmarkUnitRate, setBenchmarkUnitRate] = useState(1.0); // man-hours per unit standard

  // --- Mode 2: Crew Velocity & Project Duration ---
  const [crewSize, setCrewSize] = useState(6);
  const [shiftHours, setShiftHours] = useState(8.0);
  const [crewOutputPerHour, setCrewOutputPerHour] = useState(1.15); // units per man-hour
  const [totalProjectScope, setTotalProjectScope] = useState(1200.0);
  const [bufferPct, setBufferPct] = useState(10.0); // weather & contingency %

  // --- Mode 3: Labor Cost & CPI Index ---
  const [blendedHourlyWage, setBlendedHourlyWage] = useState(48.0);
  const [actualHoursWorked, setActualHoursWorked] = useState(520.0);
  const [budgetedHoursAllowed, setBudgetedHoursAllowed] = useState(600.0);
  const [unitsInstalled, setUnitsInstalled] = useState(480.0);

  // --- Mode 1 Computations ---
  const mode1Stats = useMemo(() => {
    const hours = Math.max(0.1, totalLaborHours);
    const units = Math.max(0.01, workUnitsCompleted);
    const outputRate = units / hours; // units per man-hour
    const actualUnitRate = hours / units; // man-hours per unit
    const manDays = hours / 8.0;

    // Efficiency comparison vs benchmark
    const stdRate = Math.max(0.01, benchmarkUnitRate);
    const efficiencyPct = (stdRate / actualUnitRate) * 100;

    let performanceTier = "Standard Performance";
    let tierColor = "text-amber-400";
    if (efficiencyPct >= 115) {
      performanceTier = "High Efficiency (World-Class)";
      tierColor = "text-emerald-400";
    } else if (efficiencyPct < 90) {
      performanceTier = "Productivity Deficit (Delay Risk)";
      tierColor = "text-rose-400";
    }

    return {
      outputRate,
      actualUnitRate,
      manDays,
      efficiencyPct,
      performanceTier,
      tierColor,
    };
  }, [workUnitsCompleted, totalLaborHours, benchmarkUnitRate]);

  // --- Mode 2 Computations ---
  const mode2Stats = useMemo(() => {
    const crew = Math.max(1, crewSize);
    const shift = Math.max(0.5, shiftHours);
    const rate = Math.max(0.01, crewOutputPerHour);
    const scope = Math.max(0.1, totalProjectScope);
    const bufferMultiplier = 1 + Math.max(0, bufferPct) / 100;

    const dailyCrewManHours = crew * shift;
    const dailyCrewOutput = dailyCrewManHours * rate;
    const baseWorkingDays = scope / Math.max(0.01, dailyCrewOutput);
    const bufferedWorkingDays = baseWorkingDays * bufferMultiplier;
    const totalCrewManHours = bufferedWorkingDays * dailyCrewManHours;

    let scheduleStatus = "Manageable Pace";
    let statusColor = "text-emerald-400";
    if (bufferedWorkingDays > 30) {
      scheduleStatus = "Long Lead Sequence";
      statusColor = "text-amber-400";
    }

    return {
      dailyCrewManHours,
      dailyCrewOutput,
      baseWorkingDays,
      bufferedWorkingDays,
      totalCrewManHours,
      scheduleStatus,
      statusColor,
    };
  }, [crewSize, shiftHours, crewOutputPerHour, totalProjectScope, bufferPct]);

  // --- Mode 3 Computations ---
  const mode3Stats = useMemo(() => {
    const wage = Math.max(1, blendedHourlyWage);
    const actualHours = Math.max(0.1, actualHoursWorked);
    const budgetHours = Math.max(0.1, budgetedHoursAllowed);
    const units = Math.max(0.1, unitsInstalled);

    const actualCost = actualHours * wage;
    const earnedValue = budgetHours * wage;
    const costVariance = earnedValue - actualCost; // positive = savings, negative = overrun
    const cpi = earnedValue / actualCost; // >1 = under budget, <1 = overrun
    const unitLaborCost = actualCost / units;
    const budgetedUnitCost = earnedValue / units;

    let cpiStatus = "On Budget";
    let cpiColor = "text-amber-400";
    if (cpi >= 1.05) {
      cpiStatus = "Under Budget (Profitable)";
      cpiColor = "text-emerald-400";
    } else if (cpi < 0.95) {
      cpiStatus = "Cost Overrun Alert";
      cpiColor = "text-rose-400";
    }

    return {
      actualCost,
      earnedValue,
      costVariance,
      cpi,
      unitLaborCost,
      budgetedUnitCost,
      cpiStatus,
      cpiColor,
    };
  }, [blendedHourlyWage, actualHoursWorked, budgetedHoursAllowed, unitsInstalled]);

  // --- Presets Handler ---
  const applyPreset = (preset: "concrete" | "steel" | "drywall" | "masonry") => {
    if (preset === "concrete") {
      setMode("labor_rate");
      setWorkUnitsCompleted(300.0);
      setUnitType("m³ Concrete");
      setTotalLaborHours(270.0); // 0.9 mh/m³
      setBenchmarkUnitRate(1.0);
      setCrewSize(8);
      setShiftHours(8.0);
      setCrewOutputPerHour(1.11);
      setTotalProjectScope(1500.0);
      setBlendedHourlyWage(48.0);
    } else if (preset === "steel") {
      setMode("crew_velocity");
      setWorkUnitsCompleted(120.0);
      setUnitType("Tons Steel");
      setTotalLaborHours(1200.0); // 10 mh/ton
      setBenchmarkUnitRate(11.0);
      setCrewSize(6);
      setShiftHours(8.0);
      setCrewOutputPerHour(0.1);
      setTotalProjectScope(240.0);
      setBlendedHourlyWage(62.0);
    } else if (preset === "drywall") {
      setMode("cost_cpi");
      setWorkUnitsCompleted(15000.0);
      setUnitType("sq ft Drywall");
      setTotalLaborHours(480.0); // 0.032 mh/sq ft
      setBenchmarkUnitRate(0.035);
      setCrewSize(5);
      setShiftHours(8.0);
      setCrewOutputPerHour(31.25);
      setTotalProjectScope(30000.0);
      setBlendedHourlyWage(42.0);
      setActualHoursWorked(480.0);
      setBudgetedHoursAllowed(540.0);
      setUnitsInstalled(15000.0);
    } else if (preset === "masonry") {
      setMode("labor_rate");
      setWorkUnitsCompleted(25.0);
      setUnitType("1,000 Bricks");
      setTotalLaborHours(350.0); // 14 mh/1k
      setBenchmarkUnitRate(15.0);
      setCrewSize(6);
      setShiftHours(8.0);
      setCrewOutputPerHour(0.071);
      setTotalProjectScope(80.0);
      setBlendedHourlyWage(45.0);
    }
  };

  // --- Copy Markdown Report ---
  const copyReport = () => {
    let report = "";
    if (mode === "labor_rate") {
      report = `### Construction Productivity Audit Report (Unit Rate Mode)
- **Work Units Completed**: ${workUnitsCompleted.toLocaleString()} ${unitType}
- **Total Labor Hours**: ${totalLaborHours.toFixed(1)} man-hours (${mode1Stats.manDays.toFixed(1)} man-days)
- **Productivity Output Rate**: ${mode1Stats.outputRate.toFixed(2)} ${unitType}/man-hour
- **Labor Unit Rate**: ${mode1Stats.actualUnitRate.toFixed(3)} man-hours/${unitType}
- **Industry Benchmark**: ${benchmarkUnitRate.toFixed(3)} man-hours/${unitType}
- **Efficiency Index**: ${mode1Stats.efficiencyPct.toFixed(1)}% (${mode1Stats.performanceTier})
*Generated by Construction Productivity Calculator (https://productivitycalculator.work/calculator/construction)*`;
    } else if (mode === "crew_velocity") {
      report = `### Construction Productivity Audit Report (Crew Velocity & Schedule)
- **Crew Configuration**: ${crewSize} Tradespeople × ${shiftHours} hrs/shift (${mode2Stats.dailyCrewManHours.toFixed(0)} man-hours/day)
- **Hourly Production Rate**: ${crewOutputPerHour.toFixed(2)} units/man-hour
- **Daily Crew Capacity**: ${mode2Stats.dailyCrewOutput.toFixed(1)} units/day
- **Total Work Scope**: ${totalProjectScope.toLocaleString()} units
- **Estimated Duration**: ${mode2Stats.baseWorkingDays.toFixed(1)} days (Buffered: ${mode2Stats.bufferedWorkingDays.toFixed(1)} days at +${bufferPct}% buffer)
- **Total Crew Labor Hours Required**: ${mode2Stats.totalCrewManHours.toFixed(0)} man-hours
*Generated by Construction Productivity Calculator (https://productivitycalculator.work/calculator/construction)*`;
    } else {
      report = `### Construction Productivity Audit Report (Labor Cost & CPI)
- **Blended Hourly Wage**: $${blendedHourlyWage.toFixed(2)}/hr
- **Actual Labor Hours Expended (AC)**: ${actualHoursWorked.toFixed(1)} hrs ($${mode3Stats.actualCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
- **Budgeted Hours Allowed (EV)**: ${budgetedHoursAllowed.toFixed(1)} hrs ($${mode3Stats.earnedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
- **Cost Performance Index (CPI)**: ${mode3Stats.cpi.toFixed(2)} (${mode3Stats.cpiStatus})
- **Cost Variance**: ${mode3Stats.costVariance >= 0 ? "+" : ""}$${mode3Stats.costVariance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- **Actual Unit Labor Cost**: $${mode3Stats.unitLaborCost.toFixed(2)}/unit (Budgeted: $${mode3Stats.budgetedUnitCost.toFixed(2)}/unit)
*Generated by Construction Productivity Calculator (https://productivitycalculator.work/calculator/construction)*`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-md">
      {/* Header and Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <HardHat className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Construction Productivity &amp; Crew Velocity Calculator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Calculate physical labor rates (units/mh), crew daily velocity, and Earned Value Cost Performance Index (CPI).
          </p>
        </div>

        <button
          onClick={copyReport}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          {copied ? "Report Copied!" : "Copy Report"}
        </button>
      </div>

      {/* Quick Trade Presets */}
      <div className="pt-4 pb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Trade Presets:
        </span>
        <button
          onClick={() => applyPreset("concrete")}
          className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
        >
          Concrete Slab (m³)
        </button>
        <button
          onClick={() => applyPreset("steel")}
          className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
        >
          Structural Steel (Tons)
        </button>
        <button
          onClick={() => applyPreset("drywall")}
          className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
        >
          Commercial Drywall (sq ft)
        </button>
        <button
          onClick={() => applyPreset("masonry")}
          className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
        >
          Masonry (1k Bricks)
        </button>
      </div>

      {/* 3 Calculation Modes Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-6">
        <button
          onClick={() => setMode("labor_rate")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition ${
            mode === "labor_rate"
              ? "bg-amber-500 text-slate-950 shadow-md font-bold"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span className="hidden sm:inline">Mode 1:</span> Unit Rate &amp; Output
        </button>
        <button
          onClick={() => setMode("crew_velocity")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition ${
            mode === "crew_velocity"
              ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span className="hidden sm:inline">Mode 2:</span> Crew Velocity &amp; Duration
        </button>
        <button
          onClick={() => setMode("cost_cpi")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition ${
            mode === "cost_cpi"
              ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span className="hidden sm:inline">Mode 3:</span> Labor Cost &amp; CPI
        </button>
      </div>

      {/* Mode 1: Labor Productivity & Unit Rate */}
      {mode === "labor_rate" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Work Units Completed</label>
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={workUnitsCompleted}
                onChange={(e) => setWorkUnitsCompleted(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-amber-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Work Unit Identifier / Trade Label</label>
              <input
                type="text"
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-amber-500 outline-none transition"
                placeholder="e.g., m³ Concrete, sq ft Drywall"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Total Labor Hours Expended (Man-Hours)</label>
              <input
                type="number"
                min="0.1"
                step="1"
                value={totalLaborHours}
                onChange={(e) => setTotalLaborHours(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-amber-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Standard Baseline Unit Rate (Man-Hours / Unit)</label>
              <input
                type="number"
                min="0.001"
                step="0.05"
                value={benchmarkUnitRate}
                onChange={(e) => setBenchmarkUnitRate(parseFloat(e.target.value) || 0.01)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-amber-500 outline-none transition"
              />
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Output Rate (Units / mh)</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400 mt-1 block">
                {mode1Stats.outputRate.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500">{unitType} / man-hr</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Unit Rate (mh / Unit)</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-100 mt-1 block">
                {mode1Stats.actualUnitRate.toFixed(3)}
              </span>
              <span className="text-[10px] text-slate-500">labor hrs per unit</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Total Man-Days</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-100 mt-1 block">
                {mode1Stats.manDays.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-500">8-hour shift equiv.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Benchmark Efficiency</span>
              <span className={`text-xl sm:text-2xl font-bold font-mono ${mode1Stats.tierColor} mt-1 block`}>
                {mode1Stats.efficiencyPct.toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-500 truncate block">{mode1Stats.performanceTier}</span>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Crew Velocity & Project Duration */}
      {mode === "crew_velocity" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Crew Size (Workers on Site)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={crewSize}
                onChange={(e) => setCrewSize(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-cyan-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Working Shift Hours (per worker)</label>
              <input
                type="number"
                min="1"
                step="0.5"
                value={shiftHours}
                onChange={(e) => setShiftHours(parseFloat(e.target.value) || 8)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-cyan-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Hourly Rate per Man (Units / mh)</label>
              <input
                type="number"
                min="0.01"
                step="0.05"
                value={crewOutputPerHour}
                onChange={(e) => setCrewOutputPerHour(parseFloat(e.target.value) || 0.1)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-cyan-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-slate-300">Total Project Work Scope (Units)</label>
              <input
                type="number"
                min="1"
                step="10"
                value={totalProjectScope}
                onChange={(e) => setTotalProjectScope(parseFloat(e.target.value) || 100)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-cyan-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Weather &amp; Contingency Buffer (%)</label>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                value={bufferPct}
                onChange={(e) => setBufferPct(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-cyan-500 outline-none transition"
              />
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Daily Crew Output</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 mt-1 block">
                {mode2Stats.dailyCrewOutput.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-500">units per shift</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Estimated Workdays</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-100 mt-1 block">
                {mode2Stats.bufferedWorkingDays.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-500">incl. +{bufferPct}% buffer</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Daily Crew Hours</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-100 mt-1 block">
                {mode2Stats.dailyCrewManHours.toFixed(0)}h
              </span>
              <span className="text-[10px] text-slate-500">{crewSize} workers × {shiftHours}h</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Total Project Man-Hours</span>
              <span className={`text-xl sm:text-2xl font-bold font-mono ${mode2Stats.statusColor} mt-1 block`}>
                {mode2Stats.totalCrewManHours.toFixed(0)}h
              </span>
              <span className="text-[10px] text-slate-500 truncate block">{mode2Stats.scheduleStatus}</span>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Labor Cost & CPI Index */}
      {mode === "cost_cpi" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Blended Hourly Wage ($/hr with burden)</label>
              <input
                type="number"
                min="10"
                step="1"
                value={blendedHourlyWage}
                onChange={(e) => setBlendedHourlyWage(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-emerald-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Actual Labor Hours Expended (AC Hours)</label>
              <input
                type="number"
                min="1"
                step="5"
                value={actualHoursWorked}
                onChange={(e) => setActualHoursWorked(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-emerald-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Budgeted Hours Allocated (EV Hours)</label>
              <input
                type="number"
                min="1"
                step="5"
                value={budgetedHoursAllowed}
                onChange={(e) => setBudgetedHoursAllowed(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-emerald-500 outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Total Work Units Installed</label>
              <input
                type="number"
                min="1"
                step="10"
                value={unitsInstalled}
                onChange={(e) => setUnitsInstalled(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:border-emerald-500 outline-none transition"
              />
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Actual Labor Cost (AC)</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-100 mt-1 block">
                ${mode3Stats.actualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-[10px] text-slate-500">{actualHoursWorked}h @ ${blendedHourlyWage}/h</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Cost Performance Index (CPI)</span>
              <span className={`text-xl sm:text-2xl font-bold font-mono ${mode3Stats.cpiColor} mt-1 block`}>
                {mode3Stats.cpi.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500">{mode3Stats.cpiStatus}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Cost Variance ($)</span>
              <span
                className={`text-xl sm:text-2xl font-bold font-mono ${
                  mode3Stats.costVariance >= 0 ? "text-emerald-400" : "text-rose-400"
                } mt-1 block`}
              >
                {mode3Stats.costVariance >= 0 ? "+" : ""}$
                {mode3Stats.costVariance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-[10px] text-slate-500">
                {mode3Stats.costVariance >= 0 ? "Under budget" : "Over budget"}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 block">Unit Labor Cost</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                ${mode3Stats.unitLaborCost.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500">
                Budget: ${mode3Stats.budgetedUnitCost.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Notes */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>Complies with RSMeans &amp; Construction Industry Institute (CII) labor standards.</span>
        </div>
        <span>Zero-latency client-side calculations</span>
      </div>
    </div>
  );
}

export default ConstructionProductivityCalculator;
