/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 TechnicianProductivityCalculator 交互组件
 * [POS]: src/components 的汽车售后维修与外勤设备工程专属技术人员生产力与工效计算引擎，承接 /calculator/technician 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Wrench,
  Clock,
  Gauge,
  Sliders,
  DollarSign,
  Copy,
  Check,
  Building,
  RotateCcw,
  Sparkles,
  Truck,
  Car,
} from "lucide-react";

type CalcMode = "flat_rate" | "wrench_time" | "labor_profit";

export function TechnicianProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("flat_rate");
  const [copied, setCopied] = useState(false);

  // --- Mode 1: Automotive Flat-Rate Efficiency & Proficiency Inputs ---
  const [billedHours, setBilledHours] = useState(48.0); // Flat-rate / billable hours booked
  const [clockedHoursOnJob, setClockedHoursOnJob] = useState(38.0); // Actual hours clocked working on cars
  const [availableShiftHours, setAvailableShiftHours] = useState(40.0); // Total scheduled / paid hours (e.g. 40 hr week)

  // --- Mode 2: Field Service & MRO Wrench Time Inputs ---
  const [shiftHours, setShiftHours] = useState(8.0); // Total shift hours per day
  const [wrenchTimeHours, setWrenchTimeHours] = useState(4.2); // Direct hands-on tool time
  const [travelHours, setTravelHours] = useState(2.2); // Drive / route travel time
  const [adminPartsHours, setAdminPartsHours] = useState(1.6); // Parts retrieval, paperwork, staging
  const [completedCalls, setCompletedCalls] = useState(4); // Service calls completed

  // --- Mode 3: Shop Labor Revenue & Margin Multipliers Inputs ---
  const [doorLaborRate, setDoorLaborRate] = useState(165.0); // Customer posted hourly labor rate $/hr
  const [techLoadedWage, setTechLoadedWage] = useState(38.0); // Tech hourly wage / flat-rate $/hr
  const [weeklyBilledHours, setWeeklyBilledHours] = useState(45.0); // Weekly billed hours
  const [partsToLaborRatio, setPartsToLaborRatio] = useState(0.85); // Parts revenue / Labor revenue

  // --- Mode 1 Calculations ---
  // Efficiency = (Billed Hours ÷ Actual Clocked Hours on Job) * 100
  // Productivity = (Actual Clocked Hours on Job ÷ Available Paid Hours) * 100
  // Proficiency = (Billed Hours ÷ Available Paid Hours) * 100 [= Efficiency * Productivity]
  const mode1Stats = useMemo(() => {
    const safeClocked = clockedHoursOnJob > 0 ? clockedHoursOnJob : 0.1;
    const safeAvailable = availableShiftHours > 0 ? availableShiftHours : 0.1;

    const efficiency = (billedHours / safeClocked) * 100;
    const productivity = (safeClocked / safeAvailable) * 100;
    const proficiency = (billedHours / safeAvailable) * 100;
    const unbilledIdleHours = Math.max(0, availableShiftHours - safeClocked);

    let tierBadge = "Standard Tech (On Benchmark)";
    let tierColor = "text-emerald-400";
    if (efficiency >= 125) {
      tierBadge = "Master Technician (Top 10% Fast)";
      tierColor = "text-cyan-400";
    } else if (efficiency >= 105) {
      tierBadge = "Senior Tech (Above Average)";
      tierColor = "text-emerald-400";
    } else if (efficiency < 85) {
      tierBadge = "Apprentice / Training Needed";
      tierColor = "text-rose-400";
    }

    return {
      efficiency: efficiency.toFixed(1),
      productivity: productivity.toFixed(1),
      proficiency: proficiency.toFixed(1),
      unbilledIdleHours: unbilledIdleHours.toFixed(1),
      tierBadge,
      tierColor,
    };
  }, [billedHours, clockedHoursOnJob, availableShiftHours]);

  // --- Mode 2 Calculations ---
  const mode2Stats = useMemo(() => {
    const safeShift = shiftHours > 0 ? shiftHours : 0.1;
    const wrenchTimePct = (wrenchTimeHours / safeShift) * 100;
    const travelPct = (travelHours / safeShift) * 100;
    const adminPct = (adminPartsHours / safeShift) * 100;
    const safeCalls = completedCalls > 0 ? completedCalls : 1;
    const wrenchTimePerCall = wrenchTimeHours / safeCalls;

    let wrenchBenchmark = "Average (35% – 50%)";
    if (wrenchTimePct >= 55) {
      wrenchBenchmark = "World-Class Lean Fleet (≥55%)";
    } else if (wrenchTimePct < 35) {
      wrenchBenchmark = "Sub-Optimal (Heavy Travel Waste)";
    }

    return {
      wrenchTimePct: wrenchTimePct.toFixed(1),
      travelPct: travelPct.toFixed(1),
      adminPct: adminPct.toFixed(1),
      wrenchTimePerCall: (wrenchTimePerCall * 60).toFixed(0), // in minutes
      wrenchBenchmark,
    };
  }, [shiftHours, wrenchTimeHours, travelHours, adminPartsHours, completedCalls]);

  // --- Mode 3 Calculations ---
  const mode3Stats = useMemo(() => {
    const grossLaborRevenue = weeklyBilledHours * doorLaborRate;
    const directLaborCost = weeklyBilledHours * techLoadedWage;
    const grossLaborProfit = grossLaborRevenue - directLaborCost;
    const laborMarginPct =
      grossLaborRevenue > 0
        ? (grossLaborProfit / grossLaborRevenue) * 100
        : 0;
    const estimatedPartsRevenue = grossLaborRevenue * partsToLaborRatio;
    const totalWeeklyDepartmentGross = grossLaborRevenue + estimatedPartsRevenue;

    return {
      grossLaborRevenue: grossLaborRevenue.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }),
      directLaborCost: directLaborCost.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }),
      grossLaborProfit: grossLaborProfit.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }),
      laborMarginPct: laborMarginPct.toFixed(1),
      estimatedPartsRevenue: estimatedPartsRevenue.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }),
      totalWeeklyDepartmentGross: totalWeeklyDepartmentGross.toLocaleString(
        "en-US",
        { maximumFractionDigits: 0 }
      ),
    };
  }, [doorLaborRate, techLoadedWage, weeklyBilledHours, partsToLaborRatio]);

  // --- Preset Scenarios ---
  const applyPreset = (presetName: string) => {
    if (presetName === "dealership_master") {
      setMode("flat_rate");
      setBilledHours(52.0);
      setClockedHoursOnJob(38.0);
      setAvailableShiftHours(40.0);
      setDoorLaborRate(185.0);
      setTechLoadedWage(45.0);
    } else if (presetName === "hvac_field_service") {
      setMode("wrench_time");
      setShiftHours(8.0);
      setWrenchTimeHours(4.8);
      setTravelHours(1.9);
      setAdminPartsHours(1.3);
      setCompletedCalls(5);
    } else if (presetName === "fleet_diesel_shop") {
      setMode("labor_profit");
      setDoorLaborRate(155.0);
      setTechLoadedWage(36.0);
      setWeeklyBilledHours(42.0);
      setPartsToLaborRatio(1.1);
    } else if (presetName === "independent_auto_shop") {
      setMode("flat_rate");
      setBilledHours(44.0);
      setClockedHoursOnJob(36.0);
      setAvailableShiftHours(40.0);
      setDoorLaborRate(145.0);
      setTechLoadedWage(32.0);
    }
  };

  const copyReport = () => {
    let report = "";
    if (mode === "flat_rate") {
      report = `### Technician Flat-Rate Efficiency & Productivity Report
- **Flat-Rate / Billed Hours Produced**: ${billedHours} hrs
- **Actual Clocked Hours on Job**: ${clockedHoursOnJob} hrs
- **Total Paid Available Shift Hours**: ${availableShiftHours} hrs
- **Technician Efficiency**: ${mode1Stats.efficiency}% (Billed ÷ Clocked)
- **Shop Labor Productivity**: ${mode1Stats.productivity}% (Clocked ÷ Available)
- **Overall Technician Proficiency**: ${mode1Stats.proficiency}% (Billed ÷ Available)
- **Unbilled / Idle Shop Hours**: ${mode1Stats.unbilledIdleHours} hrs
- **Performance Rating**: ${mode1Stats.tierBadge}`;
    } else if (mode === "wrench_time") {
      report = `### Field Service Technician Wrench-Time & Route Report
- **Scheduled Shift Hours**: ${shiftHours} hrs
- **Direct Hands-on Wrench Time**: ${wrenchTimeHours} hrs (${mode2Stats.wrenchTimePct}%)
- **Travel / Route Driving Time**: ${travelHours} hrs (${mode2Stats.travelPct}%)
- **Admin / Parts Staging**: ${adminPartsHours} hrs (${mode2Stats.adminPct}%)
- **Completed Work Orders**: ${completedCalls} calls
- **Average Wrench Time per Call**: ${mode2Stats.wrenchTimePerCall} minutes
- **Fleet Benchmark Status**: ${mode2Stats.wrenchBenchmark}`;
    } else {
      report = `### Service Department Labor Revenue & Gross Profit Report
- **Posted Customer Door Labor Rate**: $${doorLaborRate}/hr
- **Technician Loaded Wage Rate**: $${techLoadedWage}/hr
- **Weekly Billed Hours Produced**: ${weeklyBilledHours} hrs
- **Weekly Labor Revenue**: $${mode3Stats.grossLaborRevenue}
- **Direct Technician Payroll Cost**: $${mode3Stats.directLaborCost}
- **Gross Labor Profit**: $${mode3Stats.grossLaborProfit} (${mode3Stats.laborMarginPct}% Margin)
- **Estimated Parts Revenue (Ratio ${partsToLaborRatio})**: $${mode3Stats.estimatedPartsRevenue}
- **Combined Department Weekly Gross**: $${mode3Stats.totalWeeklyDepartmentGross}`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-2xl space-y-8">
      {/* Header with Title and Presets */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display">
              Technician Productivity &amp; Efficiency Suite
            </h2>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            NADA automotive flat-rate efficiency, field service wrench-time utilization, and shop labor profitability.
          </p>
        </div>

        {/* Quick Industry Presets */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset("dealership_master")}
            className="text-xs px-3 py-1.5 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900/80 transition-colors flex items-center gap-1.5"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Master Tech (130%)</span>
          </button>
          <button
            onClick={() => applyPreset("hvac_field_service")}
            className="text-xs px-3 py-1.5 rounded-lg bg-pink-950/60 text-pink-300 border border-pink-800/60 hover:bg-pink-900/80 transition-colors flex items-center gap-1.5"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>HVAC Field Tech</span>
          </button>
          <button
            onClick={() => applyPreset("independent_auto_shop")}
            className="text-xs px-3 py-1.5 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800/60 hover:bg-amber-900/80 transition-colors flex items-center gap-1.5"
          >
            <Building className="w-3.5 h-3.5" />
            <span>Auto Repair Shop</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 bg-muted/60 rounded-xl border border-border/50">
        <button
          onClick={() => setMode("flat_rate")}
          className={`py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            mode === "flat_rate"
              ? "bg-card text-cyan-400 shadow-md border border-cyan-500/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>Flat-Rate Efficiency &amp; Proficiency</span>
        </button>

        <button
          onClick={() => setMode("wrench_time")}
          className={`py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            mode === "wrench_time"
              ? "bg-card text-pink-400 shadow-md border border-pink-500/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Field Service Wrench-Time</span>
        </button>

        <button
          onClick={() => setMode("labor_profit")}
          className={`py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            mode === "labor_profit"
              ? "bg-card text-amber-400 shadow-md border border-amber-500/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Shop Labor Revenue &amp; Margin</span>
        </button>
      </div>

      {/* Main Workspace (Inputs & Results) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {mode === "flat_rate" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-300">
                <strong>NADA Standard Definitions:</strong> Efficiency measures how fast a tech beats flat-rate book time. Productivity measures how much scheduled shift time is spent working on billable cars.
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                  <span className="text-foreground">Flat-Rate / Billed Hours Produced</span>
                  <span className="font-mono text-cyan-400">{billedHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="0.5"
                  value={billedHours}
                  onChange={(e) => setBilledHours(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[11px] text-muted-foreground">Standard book hours sold to customers or warranty.</span>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                  <span className="text-foreground">Actual Clocked Hours on Job</span>
                  <span className="font-mono text-cyan-400">{clockedHoursOnJob} hrs</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="0.5"
                  value={clockedHoursOnJob}
                  onChange={(e) => setClockedHoursOnJob(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[11px] text-muted-foreground">Time punched directly onto repair orders (flag time).</span>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                  <span className="text-foreground">Scheduled Shift Available Hours</span>
                  <span className="font-mono text-cyan-400">{availableShiftHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="1"
                  value={availableShiftHours}
                  onChange={(e) => setAvailableShiftHours(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[11px] text-muted-foreground">Total paid hours on the time clock (typically 40 hrs/week).</span>
              </div>
            </div>
          )}

          {mode === "wrench_time" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-pink-950/20 border border-pink-800/40 text-xs text-pink-300">
                <strong>Field Service &amp; MRO Metric:</strong> Wrench time is the % of a field technician&apos;s day spent with tools in hand solving customer issues, excluding drive time and parts delays.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Total Shift Hours (hrs)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="4"
                    max="14"
                    value={shiftHours}
                    onChange={(e) => setShiftHours(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-pink-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Hands-on Wrench Time (hrs)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="12"
                    value={wrenchTimeHours}
                    onChange={(e) => setWrenchTimeHours(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-sm font-mono text-pink-400 font-bold focus:outline-none focus:ring-1 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Drive / Route Travel (hrs)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="8"
                    value={travelHours}
                    onChange={(e) => setTravelHours(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-pink-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Admin &amp; Staging (hrs)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="6"
                    value={adminPartsHours}
                    onChange={(e) => setAdminPartsHours(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-pink-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Completed Work Orders (Calls)</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={completedCalls}
                  onChange={(e) => setCompletedCalls(parseInt(e.target.value) || 1)}
                  className="w-full p-2.5 rounded-lg bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
            </div>
          )}

          {mode === "labor_profit" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-300">
                <strong>Shop Economic Model:</strong> Direct labor profit margins should exceed 70% in profitable dealerships and independent service centers to absorb overhead.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Door Labor Rate ($/hr)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">$</span>
                    <input
                      type="number"
                      step="5"
                      min="60"
                      max="350"
                      value={doorLaborRate}
                      onChange={(e) => setDoorLaborRate(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Tech Loaded Wage ($/hr)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-muted-foreground">$</span>
                    <input
                      type="number"
                      step="1"
                      min="15"
                      max="90"
                      value={techLoadedWage}
                      onChange={(e) => setTechLoadedWage(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Weekly Billed Hours Produced</label>
                  <input
                    type="number"
                    step="0.5"
                    min="10"
                    max="80"
                    value={weeklyBilledHours}
                    onChange={(e) => setWeeklyBilledHours(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-sm font-mono text-amber-400 font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Parts-to-Labor Ratio (e.g. 0.85)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="3.0"
                    value={partsToLaborRatio}
                    onChange={(e) => setPartsToLaborRatio(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Dashboard: KPIs (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-card/60 border border-border/80 shadow-inner flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Performance Dashboard
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-foreground">
                Real-Time
              </span>
            </div>

            {/* Mode 1 Output */}
            {mode === "flat_rate" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-center">
                  <span className="text-xs text-cyan-300 font-medium">Technician Efficiency</span>
                  <div className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-mono mt-1">
                    {mode1Stats.efficiency}%
                  </div>
                  <span className="text-[11px] text-muted-foreground block mt-1">
                    Billed {billedHours} hrs ÷ Clocked {clockedHoursOnJob} hrs
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Labor Productivity</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      {mode1Stats.productivity}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Overall Proficiency</span>
                    <div className="font-bold font-mono text-emerald-400 mt-1 text-sm">
                      {mode1Stats.proficiency}%
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs">
                  <span className="text-muted-foreground block mb-1">Performance Tier:</span>
                  <span className={`font-semibold ${mode1Stats.tierColor}`}>
                    {mode1Stats.tierBadge}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    Unbilled / non-working time: <strong>{mode1Stats.unbilledIdleHours} hrs</strong> this week.
                  </p>
                </div>
              </div>
            )}

            {/* Mode 2 Output */}
            {mode === "wrench_time" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-pink-950/30 border border-pink-800/40 text-center">
                  <span className="text-xs text-pink-300 font-medium">Wrench-Time Utilization</span>
                  <div className="text-3xl md:text-4xl font-extrabold text-pink-400 font-mono mt-1">
                    {mode2Stats.wrenchTimePct}%
                  </div>
                  <span className="text-[11px] text-muted-foreground block mt-1">
                    {wrenchTimeHours} hrs hands-on tools of {shiftHours} hr shift
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Route Travel Share</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      {mode2Stats.travelPct}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Avg Time per Call</span>
                    <div className="font-bold font-mono text-pink-400 mt-1 text-sm">
                      {mode2Stats.wrenchTimePerCall} min
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs">
                  <span className="text-muted-foreground block mb-1">Fleet Benchmark:</span>
                  <span className="font-semibold text-foreground">
                    {mode2Stats.wrenchBenchmark}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Admin &amp; staging consumes {mode2Stats.adminPct}% of the technician&apos;s shift.
                  </p>
                </div>
              </div>
            )}

            {/* Mode 3 Output */}
            {mode === "labor_profit" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-center">
                  <span className="text-xs text-amber-300 font-medium">Weekly Labor Gross Profit</span>
                  <div className="text-3xl md:text-4xl font-extrabold text-amber-400 font-mono mt-1">
                    ${mode3Stats.grossLaborProfit}
                  </div>
                  <span className="text-[11px] text-muted-foreground block mt-1">
                    {mode3Stats.laborMarginPct}% Direct Labor Margin
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Total Labor Revenue</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      ${mode3Stats.grossLaborRevenue}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Tech Payroll Cost</span>
                    <div className="font-bold font-mono text-rose-400 mt-1 text-sm">
                      ${mode3Stats.directLaborCost}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs">
                  <span className="text-muted-foreground block mb-1">Department Weekly Gross:</span>
                  <span className="font-semibold text-amber-400 font-mono text-sm">
                    ${mode3Stats.totalWeeklyDepartmentGross}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Includes approx. ${mode3Stats.estimatedPartsRevenue} parts revenue sold alongside labor.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action: Copy Report Button */}
          <div className="pt-4 border-t border-border/60 mt-4">
            <button
              onClick={copyReport}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs md:text-sm transition-all shadow-md active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Report Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Export Technician KPI Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianProductivityCalculator;
