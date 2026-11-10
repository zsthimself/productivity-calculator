/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 MachineProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的工业机械设备生产力、OEE 综合效率与节拍节约计算引擎，承接 /calculator/machine 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Cpu,
  Clock,
  Gauge,
  Sliders,
  DollarSign,
  Copy,
  Check,
  Sparkles,
  Activity,
} from "lucide-react";

type CalcMode = "oee" | "cycle_time" | "capacity_cost";

export function MachineProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("oee");
  const [copied, setCopied] = useState(false);

  // --- Mode 1: OEE Inputs ---
  const [plannedTimeHours, setPlannedTimeHours] = useState(8.0);
  const [unplannedDowntimeHours, setUnplannedDowntimeHours] = useState(0.8);
  const [idealCycleTimeSec, setIdealCycleTimeSec] = useState(30.0);
  const [totalUnitsProduced, setTotalUnitsProduced] = useState(780);
  const [defectiveUnits, setDefectiveUnits] = useState(25);

  // --- Mode 2: Cycle Time & Takt Inputs ---
  const [actualCycleTimeSec, setActualCycleTimeSec] = useState(42.0);
  const [shiftHours, setShiftHours] = useState(8.0);
  const [plannedBreaksMin, setPlannedBreaksMin] = useState(50);
  const [customerDailyDemand, setCustomerDailyDemand] = useState(550);
  const [scrapRatePct, setScrapRatePct] = useState(3.0);

  // --- Mode 3: Capacity & Downtime Inputs ---
  const [machineHourlyRate, setMachineHourlyRate] = useState(120.0);
  const [scheduledWeeklyHours, setScheduledWeeklyHours] = useState(80.0);
  const [actualRunWeeklyHours, setActualRunWeeklyHours] = useState(58.0);
  const [partSalePrice, setPartSalePrice] = useState(35.0);
  const [partsPerRunHour, setPartsPerRunHour] = useState(15.0);

  // Mode 1: OEE
  const mode1Stats = useMemo(() => {
    const safePlanned = plannedTimeHours > 0 ? plannedTimeHours : 0.1;
    const operatingTime = Math.max(0, plannedTimeHours - unplannedDowntimeHours);
    const availability = (operatingTime / safePlanned) * 100;

    const idealHoursRun = (totalUnitsProduced * idealCycleTimeSec) / 3600;
    const safeOperating = operatingTime > 0 ? operatingTime : 0.001;
    const performance = Math.min(100, Math.max(0, (idealHoursRun / safeOperating) * 100));

    const goodUnits = Math.max(0, totalUnitsProduced - defectiveUnits);
    const safeTotal = totalUnitsProduced > 0 ? totalUnitsProduced : 1;
    const quality = (goodUnits / safeTotal) * 100;
    const oee = (availability / 100) * (performance / 100) * (quality / 100) * 100;

    let oeeTier = "Typical Industrial Standard (60%–70%)";
    let oeeColor = "text-amber-400";
    if (oee >= 85) {
      oeeTier = "World-Class OEE Benchmark (Top Quartile)";
      oeeColor = "text-emerald-400";
    } else if (oee >= 72) {
      oeeTier = "Good Operational Range (Competitive)";
      oeeColor = "text-cyan-400";
    } else if (oee < 55) {
      oeeTier = "Substantial Hidden Capacity Lost";
      oeeColor = "text-rose-400";
    }

    return {
      operatingHours: operatingTime.toFixed(1),
      availability: availability.toFixed(1),
      performance: performance.toFixed(1),
      quality: quality.toFixed(1),
      oee: oee.toFixed(1),
      goodUnits,
      oeeTier,
      oeeColor,
    };
  }, [plannedTimeHours, unplannedDowntimeHours, idealCycleTimeSec, totalUnitsProduced, defectiveUnits]);

  // Mode 2: Cycle Time vs Takt Time
  const mode2Stats = useMemo(() => {
    const netAvailableSeconds = Math.max(0, shiftHours * 3600 - plannedBreaksMin * 60);
    const safeDemand = customerDailyDemand > 0 ? customerDailyDemand : 1;
    const taktTimeSec = netAvailableSeconds / safeDemand;
    const safeActualCycle = actualCycleTimeSec > 0 ? actualCycleTimeSec : 0.1;

    const grossPerHour = 3600 / safeActualCycle;
    const netPerHour = grossPerHour * (1 - scrapRatePct / 100);
    const fullShiftCapacityParts = Math.floor((netAvailableSeconds / safeActualCycle) * (1 - scrapRatePct / 100));
    const taktDeltaSec = taktTimeSec - safeActualCycle;

    return {
      netAvailableHours: (netAvailableSeconds / 3600).toFixed(1),
      taktTimeSec: taktTimeSec.toFixed(1),
      actualCycleTimeSec: safeActualCycle.toFixed(1),
      grossPerHour: grossPerHour.toFixed(1),
      netPerHour: netPerHour.toFixed(1),
      fullShiftCapacityParts,
      taktDeltaSec: Math.abs(taktDeltaSec).toFixed(1),
      isPaceSufficient: taktDeltaSec >= 0,
    };
  }, [actualCycleTimeSec, shiftHours, plannedBreaksMin, customerDailyDemand, scrapRatePct]);

  // Mode 3: Capacity & Downtime
  const mode3Stats = useMemo(() => {
    const safeScheduled = scheduledWeeklyHours > 0 ? scheduledWeeklyHours : 0.1;
    const utilizationPct = (actualRunWeeklyHours / safeScheduled) * 100;
    const downtimeHours = Math.max(0, scheduledWeeklyHours - actualRunWeeklyHours);
    const directIdleOverheadWaste = downtimeHours * machineHourlyRate;
    const lostPartsWeekly = downtimeHours * partsPerRunHour;
    const lostRevenueWeekly = lostPartsWeekly * partSalePrice;
    const actualWeeklyParts = actualRunWeeklyHours * partsPerRunHour;
    const actualWeeklyValue = actualWeeklyParts * partSalePrice;

    return {
      utilizationPct: utilizationPct.toFixed(1),
      downtimeHours: downtimeHours.toFixed(1),
      directIdleOverheadWaste: Math.round(directIdleOverheadWaste),
      lostPartsWeekly: Math.round(lostPartsWeekly),
      lostRevenueWeekly: Math.round(lostRevenueWeekly),
      actualWeeklyParts: Math.round(actualWeeklyParts),
      actualWeeklyValue: Math.round(actualWeeklyValue),
      annualIdleWaste: Math.round(directIdleOverheadWaste * 50),
    };
  }, [machineHourlyRate, scheduledWeeklyHours, actualRunWeeklyHours, partSalePrice, partsPerRunHour]);

  const loadPreset = (presetName: string) => {
    if (presetName === "cnc") {
      setMode("oee");
      setPlannedTimeHours(8.0);
      setUnplannedDowntimeHours(0.7);
      setIdealCycleTimeSec(120.0);
      setTotalUnitsProduced(210);
      setDefectiveUnits(4);
    } else if (presetName === "injection") {
      setMode("cycle_time");
      setActualCycleTimeSec(18.0);
      setShiftHours(12.0);
      setPlannedBreaksMin(60);
      setCustomerDailyDemand(2200);
      setScrapRatePct(1.5);
    } else if (presetName === "smt") {
      setMode("oee");
      setPlannedTimeHours(10.0);
      setUnplannedDowntimeHours(0.5);
      setIdealCycleTimeSec(12.0);
      setTotalUnitsProduced(2800);
      setDefectiveUnits(15);
    } else if (presetName === "stamping") {
      setMode("capacity_cost");
      setMachineHourlyRate(165.0);
      setScheduledWeeklyHours(80.0);
      setActualRunWeeklyHours(52.0);
      setPartSalePrice(18.5);
      setPartsPerRunHour(180.0);
    }
  };

  const copyReport = () => {
    let report = "";
    if (mode === "oee") {
      report = `### Machine Productivity & OEE Analysis Report\n- **Planned Time**: ${plannedTimeHours} hrs | **Operating Time**: ${mode1Stats.operatingHours} hrs\n- **Unplanned Downtime**: ${unplannedDowntimeHours} hrs\n- **Total Units**: ${totalUnitsProduced} (Good: ${mode1Stats.goodUnits}, Scrap: ${defectiveUnits})\n- **Availability**: ${mode1Stats.availability}% | **Performance**: ${mode1Stats.performance}% | **Quality**: ${mode1Stats.quality}%\n- **OEE Score**: ${mode1Stats.oee}% (${mode1Stats.oeeTier})\n*Generated via ProductivityCalculator.work/calculator/machine*`;
    } else if (mode === "cycle_time") {
      report = `### Machine Cycle Time & Takt Time Audit Report\n- **Cycle Time**: ${mode2Stats.actualCycleTimeSec} s/part | **Takt Time**: ${mode2Stats.taktTimeSec} s/part\n- **Pace Status**: ${mode2Stats.isPaceSufficient ? "Sufficient (+ " + mode2Stats.taktDeltaSec + "s)" : "Takt Deficit (- " + mode2Stats.taktDeltaSec + "s)"}\n- **Output Rate**: ${mode2Stats.netPerHour} good parts/hr (Scrap: ${scrapRatePct}%)\n- **Shift Capacity**: ${mode2Stats.fullShiftCapacityParts.toLocaleString()} good parts\n*Generated via ProductivityCalculator.work/calculator/machine*`;
    } else {
      report = `### Machine Capacity, Utilization & Downtime Waste Report\n- **Utilization**: ${mode3Stats.utilizationPct}% (${actualRunWeeklyHours} of ${scheduledWeeklyHours} hrs)\n- **Weekly Downtime**: ${mode3Stats.downtimeHours} hrs\n- **Direct Idle Waste**: $${mode3Stats.directIdleOverheadWaste.toLocaleString()}/wk ($${mode3Stats.annualIdleWaste.toLocaleString()}/yr)\n- **Lost Output Opportunity**: ${mode3Stats.lostPartsWeekly.toLocaleString()} parts ($${mode3Stats.lostRevenueWeekly.toLocaleString()}/wk)\n- **Delivered Weekly Value**: $${mode3Stats.actualWeeklyValue.toLocaleString()}\n*Generated via ProductivityCalculator.work/calculator/machine*`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              ISO 22400 &amp; TPM Standard
            </span>
            <span className="text-slate-400 text-xs">Discrete &amp; Automated Manufacturing</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            Machine Productivity &amp; OEE Calculator
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Presets:
          </span>
          {[
            { id: "cnc", label: "5-Axis CNC" },
            { id: "injection", label: "Molding" },
            { id: "smt", label: "SMT Line" },
            { id: "stamping", label: "Stamping" },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset.id)}
              className="px-3 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
        {[
          { id: "oee", label: "1. OEE Efficiency", desc: "Availability × Performance × Quality", icon: Gauge, color: "cyan" },
          { id: "cycle_time", label: "2. Cycle Time & Takt", desc: "Pace, Output Rate & Deficit", icon: Clock, color: "amber" },
          { id: "capacity_cost", label: "3. Capacity & Cost", desc: "Uptime % & Lost Margin Waste", icon: DollarSign, color: "emerald" },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = mode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id as CalcMode)}
              className={`flex items-center gap-2.5 p-3.5 rounded-xl border text-left transition ${
                active
                  ? `bg-${tab.color}-950/60 border-${tab.color}-500/80 text-white shadow-lg`
                  : "bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? `text-${tab.color}-400` : "text-slate-400"}`} />
              <div>
                <div className="font-semibold text-sm">{tab.label}</div>
                <div className="text-xs text-slate-400">{tab.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mode 1 */}
      {mode === "oee" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-4">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> Shift &amp; Availability Inputs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Planned Production Time</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={plannedTimeHours}
                      onChange={(e) => setPlannedTimeHours(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-xs text-slate-500">hrs</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Unplanned Downtime</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={unplannedDowntimeHours}
                      onChange={(e) => setUnplannedDowntimeHours(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-xs text-slate-500">hrs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-4">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Speed, Output &amp; Quality
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Ideal Cycle Time</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      min="0.1"
                      value={idealCycleTimeSec}
                      onChange={(e) => setIdealCycleTimeSec(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-xs text-slate-500">s</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Total Units Run</label>
                  <input
                    type="number"
                    step="10"
                    min="1"
                    value={totalUnitsProduced}
                    onChange={(e) => setTotalUnitsProduced(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Defective / Scrap</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={defectiveUnits}
                    onChange={(e) => setDefectiveUnits(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Overall Equipment Effectiveness</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-5xl font-extrabold text-white font-mono">{mode1Stats.oee}%</span>
                <span className="text-xs text-slate-400 font-mono">OEE Score</span>
              </div>
              <div className={`text-xs font-semibold mt-1.5 ${mode1Stats.oeeColor}`}>{mode1Stats.oeeTier}</div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">1. Availability:</span>
                <span className="font-mono font-bold text-white">{mode1Stats.availability}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, parseFloat(mode1Stats.availability))}%` }} />
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">2. Performance:</span>
                <span className="font-mono font-bold text-white">{mode1Stats.performance}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, parseFloat(mode1Stats.performance))}%` }} />
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">3. Quality:</span>
                <span className="font-mono font-bold text-white">{mode1Stats.quality}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, parseFloat(mode1Stats.quality))}%` }} />
              </div>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Net Run Time:</span>
                <span className="font-mono text-cyan-300">{mode1Stats.operatingHours} hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Good Parts Output:</span>
                <span className="font-mono text-emerald-300">{mode1Stats.goodUnits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>World-Class Standard:</span>
                <span className="font-mono text-slate-400">85.0% OEE</span>
              </div>
            </div>

            <button
              onClick={copyReport}
              className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Report Copied" : "Copy OEE Audit Report"}
            </button>
          </div>
        </div>
      )}

      {/* Mode 2 */}
      {mode === "cycle_time" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-4">
              <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> Cycle &amp; Shift Setup
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Actual Cycle Time</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="0.1"
                      value={actualCycleTimeSec}
                      onChange={(e) => setActualCycleTimeSec(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-xs text-slate-500">sec</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Shift Duration</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={shiftHours}
                      onChange={(e) => setShiftHours(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-xs text-slate-500">hrs</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Planned Breaks</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="5"
                      min="0"
                      value={plannedBreaksMin}
                      onChange={(e) => setPlannedBreaksMin(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-xs text-slate-500">min</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Customer Demand</label>
                  <input
                    type="number"
                    step="50"
                    min="1"
                    value={customerDailyDemand}
                    onChange={(e) => setCustomerDailyDemand(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Scrap Rate %</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={scrapRatePct}
                    onChange={(e) => setScrapRatePct(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Output Velocity</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-5xl font-extrabold text-white font-mono">{mode2Stats.netPerHour}</span>
                <span className="text-xs text-slate-400 font-mono">Good Parts / Hr</span>
              </div>
              <div className={`text-xs font-semibold mt-1.5 ${mode2Stats.isPaceSufficient ? "text-emerald-400" : "text-rose-400"}`}>
                {mode2Stats.isPaceSufficient
                  ? `✓ Pace Sufficient (${mode2Stats.taktDeltaSec}s faster than Takt)`
                  : `⚠ Takt Deficit: Behind by ${mode2Stats.taktDeltaSec}s / part`}
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Customer Takt Time:</span>
                <span className="font-mono text-white font-bold">{mode2Stats.taktTimeSec} s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Actual Machine Cycle:</span>
                <span className="font-mono text-amber-300 font-bold">{mode2Stats.actualCycleTimeSec} s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gross Output Rate:</span>
                <span className="font-mono text-white">{mode2Stats.grossPerHour} parts/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Shift Net Operating Time:</span>
                <span className="font-mono text-slate-300">{mode2Stats.netAvailableHours} hrs</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800/60 font-semibold text-slate-200">
                <span>Shift Good Parts Capacity:</span>
                <span className="font-mono text-emerald-400">{mode2Stats.fullShiftCapacityParts.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={copyReport}
              className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Report Copied" : "Copy Cycle Time Report"}
            </button>
          </div>
        </div>
      )}

      {/* Mode 3 */}
      {mode === "capacity_cost" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-4">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> Financial &amp; Utilization Inputs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Machine Burden Rate ($/hr)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-slate-500">$</span>
                    <input
                      type="number"
                      step="5"
                      min="1"
                      value={machineHourlyRate}
                      onChange={(e) => setMachineHourlyRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Scheduled Hours / Week</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={scheduledWeeklyHours}
                      onChange={(e) => setScheduledWeeklyHours(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-xs text-slate-500">hrs</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Actual Run Hours</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={actualRunWeeklyHours}
                      onChange={(e) => setActualRunWeeklyHours(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-xs text-slate-500">hrs</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Parts / Run Hr</label>
                  <input
                    type="number"
                    step="1"
                    min="0.1"
                    value={partsPerRunHour}
                    onChange={(e) => setPartsPerRunHour(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Part Value ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-slate-500">$</span>
                    <input
                      type="number"
                      step="1"
                      min="0.1"
                      value={partSalePrice}
                      onChange={(e) => setPartSalePrice(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Equipment Utilization</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-5xl font-extrabold text-white font-mono">{mode3Stats.utilizationPct}%</span>
                <span className="text-xs text-slate-400 font-mono">Uptime</span>
              </div>
              <div className="text-xs text-slate-300 mt-1">{mode3Stats.downtimeHours} hrs idle downtime per week</div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Weekly Idle Overhead Waste:</span>
                <span className="font-mono text-rose-400 font-bold">-${mode3Stats.directIdleOverheadWaste.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Annualized Idle Waste:</span>
                <span className="font-mono text-rose-300">-${mode3Stats.annualIdleWaste.toLocaleString()}/yr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lost Part Output / Wk:</span>
                <span className="font-mono text-amber-300">{mode3Stats.lostPartsWeekly.toLocaleString()} parts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lost Weekly Billing:</span>
                <span className="font-mono text-amber-400">-${mode3Stats.lostRevenueWeekly.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800/60 font-semibold text-slate-200">
                <span>Delivered Weekly Output:</span>
                <span className="font-mono text-emerald-400">+${mode3Stats.actualWeeklyValue.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={copyReport}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Report Copied" : "Copy Capacity Report"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MachineProductivityCalculator;
