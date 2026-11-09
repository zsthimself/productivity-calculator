/**
 * [INPUT]: 依赖 react 的 useState, useMemo；依赖 lucide-react 图标；依赖 Tailwind CSS
 * [OUTPUT]: 导出 CleaningServicesProductivityCalculator 组件
 * [POS]: src/components 的商业保洁与物业人效专属计算器，承接 /calculator/cleaning-services 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Clock,
  Users,
  DollarSign,
  Copy,
  Check,
  ShieldCheck,
  Sliders,
  TrendingUp,
  AlertTriangle,
  Building,
  CheckCircle2,
} from "lucide-react";

interface PresetConfig {
  name: string;
  desc: string;
  // Mode 1: Cleaning Time
  facilitySqFt: number;
  productionRate: number;
  cleaningsPerWeek: number;
  hourlyLaborWage: number;
  // Mode 2: Crew Output
  cleanedSqFt: number;
  crewSize: number;
  shiftDurationHours: number;
  facilityTargetRate: number;
  // Mode 3: Contract Bidding
  contractSqFt: number;
  monthlyLabor: number;
  suppliesPct: number;
  targetProfitMargin: number;
}

const PRESETS: PresetConfig[] = [
  {
    name: "Class-A Corporate Office",
    desc: "Multi-tenant commercial office tower with carpet, cubicles & executive suites",
    facilitySqFt: 30000,
    productionRate: 3000,
    cleaningsPerWeek: 5,
    hourlyLaborWage: 20.0,
    cleanedSqFt: 30000,
    crewSize: 3,
    shiftDurationHours: 3.5,
    facilityTargetRate: 3000,
    contractSqFt: 30000,
    monthlyLabor: 3900,
    suppliesPct: 8,
    targetProfitMargin: 25,
  },
  {
    name: "Medical Healthcare Clinic",
    desc: "Outpatient clinical rooms requiring terminal cleaning, biohazard & sanitization",
    facilitySqFt: 12000,
    productionRate: 1500,
    cleaningsPerWeek: 6,
    hourlyLaborWage: 23.0,
    cleanedSqFt: 12000,
    crewSize: 2,
    shiftDurationHours: 4.0,
    facilityTargetRate: 1500,
    contractSqFt: 12000,
    monthlyLabor: 3980,
    suppliesPct: 12,
    targetProfitMargin: 28,
  },
  {
    name: "K-12 School Campus",
    desc: "Classrooms, cafeterias, hallways & high-traffic student restrooms",
    facilitySqFt: 65000,
    productionRate: 2600,
    cleaningsPerWeek: 5,
    hourlyLaborWage: 18.5,
    cleanedSqFt: 65000,
    crewSize: 6,
    shiftDurationHours: 4.2,
    facilityTargetRate: 2600,
    contractSqFt: 65000,
    monthlyLabor: 9800,
    suppliesPct: 9,
    targetProfitMargin: 20,
  },
  {
    name: "Industrial Warehouse Floor",
    desc: "Open distribution center concrete floors, dock offices & break areas",
    facilitySqFt: 100000,
    productionRate: 6000,
    cleaningsPerWeek: 3,
    hourlyLaborWage: 19.0,
    cleanedSqFt: 100000,
    crewSize: 4,
    shiftDurationHours: 4.2,
    facilityTargetRate: 6000,
    contractSqFt: 100000,
    monthlyLabor: 4100,
    suppliesPct: 6,
    targetProfitMargin: 22,
  },
];

export function CleaningServicesProductivityCalculator() {
  const [activeTab, setActiveTab] = useState<"duration" | "crew" | "bidding">("duration");
  const [copied, setCopied] = useState(false);

  // Mode 1: Commercial Cleaning Time Estimator
  const [facilitySqFt, setFacilitySqFt] = useState<number>(25000);
  const [productionRate, setProductionRate] = useState<number>(2800);
  const [cleaningsPerWeek, setCleaningsPerWeek] = useState<number>(5);
  const [hourlyLaborWage, setHourlyLaborWage] = useState<number>(19.5);

  // Mode 2: Crew Output & Production Velocity
  const [cleanedSqFt, setCleanedSqFt] = useState<number>(25000);
  const [crewSize, setCrewSize] = useState<number>(3);
  const [shiftDurationHours, setShiftDurationHours] = useState<number>(3.0);
  const [facilityTargetRate, setFacilityTargetRate] = useState<number>(2800);

  // Mode 3: Janitorial Contract Bidding
  const [contractSqFt, setContractSqFt] = useState<number>(25000);
  const [monthlyLabor, setMonthlyLabor] = useState<number>(3500);
  const [suppliesPct, setSuppliesPct] = useState<number>(8);
  const [targetProfitMargin, setTargetProfitMargin] = useState<number>(22);

  // Apply Preset
  const applyPreset = (preset: PresetConfig) => {
    setFacilitySqFt(preset.facilitySqFt);
    setProductionRate(preset.productionRate);
    setCleaningsPerWeek(preset.cleaningsPerWeek);
    setHourlyLaborWage(preset.hourlyLaborWage);
    setCleanedSqFt(preset.cleanedSqFt);
    setCrewSize(preset.crewSize);
    setShiftDurationHours(preset.shiftDurationHours);
    setFacilityTargetRate(preset.facilityTargetRate);
    setContractSqFt(preset.contractSqFt);
    setMonthlyLabor(preset.monthlyLabor);
    setSuppliesPct(preset.suppliesPct);
    setTargetProfitMargin(preset.targetProfitMargin);
  };

  // Mode 1 Calculations
  const m1 = useMemo(() => {
    const safeRate = productionRate > 0 ? productionRate : 1;
    const safeSqFt = facilitySqFt > 0 ? facilitySqFt : 1;
    const hoursPerClean = safeSqFt / safeRate;
    const cleanersFor4HrShift = Math.ceil(hoursPerClean / 4.0);
    const weeklyHours = hoursPerClean * cleaningsPerWeek;
    const monthlyLaborCost = weeklyHours * 4.333 * hourlyLaborWage;
    const monthlyCostPerSqFt = monthlyLaborCost / safeSqFt;
    const minutesPer1kSqFt = (safeRate > 0 ? (1000 / safeRate) * 60 : 0);

    let paceRating: { label: string; color: string; desc: string };
    if (productionRate >= 3500) {
      paceRating = {
        label: "High Velocity (Open Plan)",
        color: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
        desc: "Ideal for wide corridors, conference halls & open layouts with backpack vacuums.",
      };
    } else if (productionRate >= 2400) {
      paceRating = {
        label: "Standard Commercial (ISSA 612)",
        color: "text-blue-400 bg-blue-950/40 border-blue-800",
        desc: "Standard corporate office pace covering daily trash, dusting, restrooms & vacuuming.",
      };
    } else if (productionRate >= 1500) {
      paceRating = {
        label: "Detailed / Medical Sanitization",
        color: "text-amber-400 bg-amber-950/40 border-amber-800",
        desc: "High touchpoint sanitization required for healthcare, lab rooms & dense cubicles.",
      };
    } else {
      paceRating = {
        label: "Heavy Disinfection / Biohazard",
        color: "text-rose-400 bg-rose-950/40 border-rose-800",
        desc: "Terminal healthcare or cleanroom cleaning with strict multi-step dwell times.",
      };
    }

    return {
      hoursPerClean,
      cleanersFor4HrShift,
      weeklyHours,
      monthlyLaborCost,
      monthlyCostPerSqFt,
      minutesPer1kSqFt,
      paceRating,
    };
  }, [facilitySqFt, productionRate, cleaningsPerWeek, hourlyLaborWage]);

  // Mode 2 Calculations
  const m2 = useMemo(() => {
    const totalCrewHours = crewSize * shiftDurationHours;
    const safeCrewHours = totalCrewHours > 0 ? totalCrewHours : 1;
    const actualProductionRate = cleanedSqFt / safeCrewHours;
    const variancePct = facilityTargetRate > 0
      ? ((actualProductionRate - facilityTargetRate) / facilityTargetRate) * 100
      : 0;

    let varianceRating: { label: string; color: string };
    if (variancePct >= 10) {
      varianceRating = { label: "Above Target (+10%+)", color: "text-emerald-400" };
    } else if (variancePct >= -10) {
      varianceRating = { label: "On Target (±10%)", color: "text-blue-400" };
    } else {
      varianceRating = { label: "Lagging Pace (-10%-)", color: "text-rose-400" };
    }

    return {
      totalCrewHours,
      actualProductionRate,
      variancePct,
      varianceRating,
    };
  }, [cleanedSqFt, crewSize, shiftDurationHours, facilityTargetRate]);

  // Mode 3 Calculations
  const m3 = useMemo(() => {
    const supplyCostMonthly = monthlyLabor * (suppliesPct / 100);
    const totalOperatingCost = monthlyLabor + supplyCostMonthly;
    const safeMargin = targetProfitMargin < 100 ? (100 - targetProfitMargin) / 100 : 0.75;
    const recommendedMonthlyBid = safeMargin > 0 ? totalOperatingCost / safeMargin : totalOperatingCost * 1.25;
    const annualContractValue = recommendedMonthlyBid * 12;
    const ratePerSqFtMonthly = contractSqFt > 0 ? recommendedMonthlyBid / contractSqFt : 0;
    const monthlyProfitMarginDollars = recommendedMonthlyBid - totalOperatingCost;

    return {
      supplyCostMonthly,
      totalOperatingCost,
      recommendedMonthlyBid,
      annualContractValue,
      ratePerSqFtMonthly,
      monthlyProfitMarginDollars,
    };
  }, [contractSqFt, monthlyLabor, suppliesPct, targetProfitMargin]);

  // Copy Markdown Report
  const copyScorecard = () => {
    const report = `### Commercial Cleaning Time & Janitorial Productivity Report
- **Facility Area**: ${facilitySqFt.toLocaleString()} sq ft (${cleaningsPerWeek}x per week)
- **Mode 1 - Cleaning Time Estimator (ISSA 612)**:
  - Estimated Cleaning Time: ${m1.hoursPerClean.toFixed(2)} hours per clean
  - Recommended Crew Size: ${m1.cleanersFor4HrShift} cleaners (for 4.0 hr shift window)
  - Weekly Labor Hours: ${m1.weeklyHours.toFixed(1)} hrs/week (${m1.minutesPer1kSqFt.toFixed(1)} min / 1,000 sq ft)
  - Monthly Direct Labor: $${m1.monthlyLaborCost.toFixed(2)} ($${m1.monthlyCostPerSqFt.toFixed(3)}/sq ft/mo)
  - Pace Rating: ${m1.paceRating.label} (${productionRate.toLocaleString()} sq ft/hr)
- **Mode 2 - Crew Output & Velocity**:
  - Crew Output: ${m2.actualProductionRate.toFixed(0)} sq ft / man-hour (${m2.totalCrewHours.toFixed(1)} total crew hrs)
  - Target Variance: ${m2.variancePct >= 0 ? "+" : ""}${m2.variancePct.toFixed(1)}% vs ${facilityTargetRate.toLocaleString()} sq ft/hr target (${m2.varianceRating.label})
- **Mode 3 - Janitorial Contract Bidding**:
  - Direct Labor: $${monthlyLabor.toLocaleString()} + Chemical Supplies: $${m3.supplyCostMonthly.toFixed(2)} (${suppliesPct}%)
  - Recommended Monthly Bid: $${m3.recommendedMonthlyBid.toFixed(2)} ($${m3.ratePerSqFtMonthly.toFixed(3)}/sq ft/mo)
  - Annual Contract Value: $${m3.annualContractValue.toFixed(2)} (Target Profit Margin: ${targetProfitMargin}%, $${m3.monthlyProfitMarginDollars.toFixed(2)}/mo net)

*Generated via ProductivityCalculator.work/calculator/cleaning-services*`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commercial Janitorial &amp; ISSA 612 Tool</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Commercial Cleaning Time Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Calculate cleaning hours per square foot, janitorial crew production rates, and monthly contract bids.
          </p>
        </div>

        <button
          onClick={copyScorecard}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm self-start md:self-center"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          <span>{copied ? "Copied Bidding Report" : "Copy Janitorial Report"}</span>
        </button>
      </div>

      {/* Presets */}
      <div className="pt-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Building className="w-3.5 h-3.5 text-teal-400" />
          <span>Facility Type Presets (ISSA Standards)</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="text-left p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all group"
            >
              <div className="text-xs font-semibold text-slate-200 group-hover:text-teal-400 transition-colors truncate">
                {p.name}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Navigation */}
      <div className="flex gap-2 my-6 p-1 bg-slate-950 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab("duration")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === "duration"
              ? "bg-teal-600 text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>1. Cleaning Time (ISSA 612)</span>
        </button>
        <button
          onClick={() => setActiveTab("crew")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === "crew"
              ? "bg-teal-600 text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>2. Crew Output &amp; Velocity</span>
        </button>
        <button
          onClick={() => setActiveTab("bidding")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === "bidding"
              ? "bg-teal-600 text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>3. Contract Bidding &amp; Margin</span>
        </button>
      </div>

      {/* Tab 1: Commercial Cleaning Time Estimator */}
      {activeTab === "duration" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Facility Cleanable Area (Sq Ft)</span>
                <span className="font-mono text-teal-400">{facilitySqFt.toLocaleString()} sq ft</span>
              </label>
              <input
                type="number"
                min="500"
                step="500"
                value={facilitySqFt}
                onChange={(e) => setFacilitySqFt(Math.max(100, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Gross cleanable square footage</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Production Rate (Sq Ft / Hour)</span>
                <span className="font-mono text-teal-400">{productionRate.toLocaleString()} sq ft/hr</span>
              </label>
              <input
                type="number"
                min="500"
                step="100"
                value={productionRate}
                onChange={(e) => setProductionRate(Math.max(100, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">ISSA standard: 2,500 - 3,500 sq ft/hr</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Cleaning Frequency (Days / Week)</span>
                <span className="font-mono text-teal-400">{cleaningsPerWeek} days/wk</span>
              </label>
              <input
                type="number"
                min="1"
                max="7"
                step="1"
                value={cleaningsPerWeek}
                onChange={(e) => setCleaningsPerWeek(Math.max(1, Math.min(7, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Scheduled service days per week</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Fully Loaded Cleaner Wage ($/hr)</span>
                <span className="font-mono text-teal-400">${hourlyLaborWage.toFixed(2)}/hr</span>
              </label>
              <input
                type="number"
                min="10"
                step="0.5"
                value={hourlyLaborWage}
                onChange={(e) => setHourlyLaborWage(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Base hourly rate + taxes &amp; insurance</span>
            </div>
          </div>

          {/* Mode 1 Output Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Time per Clean</div>
              <div className="text-2xl font-bold font-mono text-teal-400 mt-1">
                {m1.hoursPerClean.toFixed(2)}h
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{(m1.hoursPerClean * 60).toFixed(0)} total minutes</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Recommended Crew</div>
              <div className="text-2xl font-bold font-mono text-blue-400 mt-1">
                {m1.cleanersFor4HrShift} Cleaners
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Based on 4.0h evening shift</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Monthly Direct Labor</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                ${m1.monthlyLaborCost.toFixed(0)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">${m1.monthlyCostPerSqFt.toFixed(3)}/sq ft/mo</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Cleaning Interval</div>
              <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
                {m1.minutesPer1kSqFt.toFixed(1)}m
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Minutes per 1,000 sq ft</div>
            </div>
          </div>

          {/* Rating Callout */}
          <div className={`p-4 rounded-xl border ${m1.paceRating.color} flex items-start gap-3`}>
            <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold">{m1.paceRating.label}</div>
              <div className="text-xs opacity-90 mt-0.5">{m1.paceRating.desc}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Crew Output & Velocity */}
      {activeTab === "crew" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Total Cleaned Area (Sq Ft)</span>
                <span className="font-mono text-teal-400">{cleanedSqFt.toLocaleString()} sq ft</span>
              </label>
              <input
                type="number"
                min="500"
                step="500"
                value={cleanedSqFt}
                onChange={(e) => setCleanedSqFt(Math.max(100, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Square footage serviced during shift</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Active Cleaners on Duty</span>
                <span className="font-mono text-teal-400">{crewSize} cleaners</span>
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={crewSize}
                onChange={(e) => setCrewSize(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Janitorial crew staff count</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Shift Working Hours</span>
                <span className="font-mono text-teal-400">{shiftDurationHours} hrs</span>
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={shiftDurationHours}
                onChange={(e) => setShiftDurationHours(Math.max(0.5, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Working duration per associate</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Facility Target Rate Benchmark</span>
                <span className="font-mono text-teal-400">{facilityTargetRate.toLocaleString()} sq ft/hr</span>
              </label>
              <input
                type="number"
                min="500"
                step="100"
                value={facilityTargetRate}
                onChange={(e) => setFacilityTargetRate(Math.max(100, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Expected production rate standard</span>
            </div>
          </div>

          {/* Mode 2 Output Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Actual Velocity</div>
              <div className="text-2xl font-bold font-mono text-teal-400 mt-1">
                {m2.actualProductionRate.toFixed(0)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Sq Ft / Man-Hour</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Cumulative Crew Hours</div>
              <div className="text-2xl font-bold font-mono text-blue-400 mt-1">
                {m2.totalCrewHours.toFixed(1)}h
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{crewSize} cleaners × {shiftDurationHours}h</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Target Variance</div>
              <div className={`text-2xl font-bold font-mono mt-1 ${m2.variancePct >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {m2.variancePct >= 0 ? "+" : ""}{m2.variancePct.toFixed(1)}%
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">vs {facilityTargetRate.toLocaleString()} benchmark</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Pace Rating</div>
              <div className={`text-base font-bold mt-2 truncate ${m2.varianceRating.color}`}>
                {m2.varianceRating.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Crew velocity audit</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Contract Bidding & Margin */}
      {activeTab === "bidding" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Billable Area (Sq Ft)</span>
                <span className="font-mono text-teal-400">{contractSqFt.toLocaleString()} sq ft</span>
              </label>
              <input
                type="number"
                min="500"
                step="500"
                value={contractSqFt}
                onChange={(e) => setContractSqFt(Math.max(100, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Contract scope square footage</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Monthly Direct Labor Cost ($)</span>
                <span className="font-mono text-teal-400">${monthlyLabor.toLocaleString()}</span>
              </label>
              <input
                type="number"
                min="100"
                step="100"
                value={monthlyLabor}
                onChange={(e) => setMonthlyLabor(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Monthly cleaner payroll expense</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Supplies &amp; Chemicals Overhead (%)</span>
                <span className="font-mono text-teal-400">{suppliesPct}%</span>
              </label>
              <input
                type="number"
                min="1"
                max="25"
                step="1"
                value={suppliesPct}
                onChange={(e) => setSuppliesPct(Math.max(1, Math.min(25, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Liners, chemicals, towels (typically 6-10%)</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Target Operating Profit Margin (%)</span>
                <span className="font-mono text-teal-400">{targetProfitMargin}%</span>
              </label>
              <input
                type="number"
                min="5"
                max="50"
                step="1"
                value={targetProfitMargin}
                onChange={(e) => setTargetProfitMargin(Math.max(5, Math.min(50, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-[11px] text-slate-500">Commercial standard: 20% to 30%</span>
            </div>
          </div>

          {/* Mode 3 Output Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Monthly Bid Quote</div>
              <div className="text-2xl font-bold font-mono text-teal-400 mt-1">
                ${m3.recommendedMonthlyBid.toFixed(0)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">${m3.ratePerSqFtMonthly.toFixed(3)} / sq ft / mo</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Annual Contract Value</div>
              <div className="text-2xl font-bold font-mono text-blue-400 mt-1">
                ${m3.annualContractValue.toFixed(0)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">12-month billing value</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Monthly Gross Profit</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                ${m3.monthlyProfitMarginDollars.toFixed(0)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{targetProfitMargin}% target margin</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Monthly Supplies Cost</div>
              <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
                ${m3.supplyCostMonthly.toFixed(0)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{suppliesPct}% chemical consumable load</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
