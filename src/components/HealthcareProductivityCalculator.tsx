/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标；依赖 @/components/ui 原生组件
 * [OUTPUT]: 导出 HealthcareProductivityCalculator 交互组件
 * [POS]: src/components 的医疗卫生与医院临床运营专属生产力计算引擎，承接 /calculator/healthcare 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
  HeartPulse,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Building,
  RotateCcw,
} from "lucide-react";

type CalcMode = "wrvu" | "hppd" | "clinic";

interface SpecialtyBenchmark {
  name: string;
  p25: number;
  p50: number; // Median
  p75: number;
  p90: number;
  avgConversion: number; // $/wRVU
}

const SPECIALTY_BENCHMARKS: Record<string, SpecialtyBenchmark> = {
  primary_care: {
    name: "Family Medicine & Internal Medicine (PCP)",
    p25: 4100,
    p50: 4950,
    p75: 5900,
    p90: 6900,
    avgConversion: 48.5,
  },
  hospitalist: {
    name: "Adult Inpatient Hospitalist",
    p25: 3900,
    p50: 4600,
    p75: 5400,
    p90: 6300,
    avgConversion: 52.0,
  },
  general_surgery: {
    name: "General Surgery",
    p25: 5800,
    p50: 7100,
    p75: 8600,
    p90: 10400,
    avgConversion: 64.0,
  },
  cardiology: {
    name: "Cardiology (Invasive / Non-Invasive)",
    p25: 6400,
    p50: 7900,
    p75: 9800,
    p90: 11900,
    avgConversion: 68.0,
  },
  pediatrics: {
    name: "General Outpatient Pediatrics",
    p25: 3800,
    p50: 4650,
    p75: 5600,
    p90: 6500,
    avgConversion: 46.0,
  },
};

interface UnitAcuityBenchmark {
  name: string;
  targetHppd: number;
  standardRatio: string;
  description: string;
}

const UNIT_ACUITY_BENCHMARKS: Record<string, UnitAcuityBenchmark> = {
  med_surg: {
    name: "Medical-Surgical Inpatient Floor",
    targetHppd: 8.5,
    standardRatio: "1:4 – 1:5",
    description: "Acute post-op and medical adult patients requiring routine monitoring.",
  },
  telemetry: {
    name: "Step-Down / Telemetry Cardiac Unit",
    targetHppd: 11.0,
    standardRatio: "1:3 – 1:4",
    description: "Intermediate care requiring continuous cardiac rhythm tracking.",
  },
  icu: {
    name: "Intensive Care Unit (ICU / CCU)",
    targetHppd: 20.0,
    standardRatio: "1:1 – 1:2",
    description: "Critically ill patients on mechanical ventilation or inotropic support.",
  },
  emergency: {
    name: "Emergency Department (Hours / Patient)",
    targetHppd: 5.5,
    standardRatio: "1:3 – 1:4",
    description: "Rapid turnaround, triage, diagnostic stabilization, and bed holding.",
  },
};

export function HealthcareProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("wrvu");
  const [copied, setCopied] = useState(false);

  // --- Mode 1: Physician wRVU Inputs ---
  const [selectedSpecialty, setSelectedSpecialty] = useState("primary_care");
  const [wrvuProduced, setWrvuProduced] = useState(4800);
  const [clinicalDays, setClinicalDays] = useState(210);
  const [conversionFactor, setConversionFactor] = useState(48.5);

  // --- Mode 2: Inpatient Nursing HPPD Inputs ---
  const [selectedUnit, setSelectedUnit] = useState("med_surg");
  const [totalNursingHours, setTotalNursingHours] = useState(240); // 24-hr day (e.g. 20 staff x 12 hr)
  const [patientCensus, setPatientCensus] = useState(28); // Midnight census or average bed count
  const [averageHourlyWage, setAverageHourlyWage] = useState(46.0); // Blended RN/LPN wage

  // --- Mode 3: Outpatient Clinic Encounters Inputs ---
  const [scheduledSlots, setScheduledSlots] = useState(22);
  const [noShowRate, setNoShowRate] = useState(12); // %
  const [clinicHoursPerDay, setClinicHoursPerDay] = useState(8);
  const [revenuePerVisit, setRevenuePerVisit] = useState(165); // $ average professional fee

  // --- Mode 1 Calculations ---
  const specialtyData = SPECIALTY_BENCHMARKS[selectedSpecialty];
  const wrvuPerDay = useMemo(() => {
    if (clinicalDays <= 0) return 0;
    return Number((wrvuProduced / clinicalDays).toFixed(2));
  }, [wrvuProduced, clinicalDays]);

  const estimatedCollections = useMemo(() => {
    return Math.round(wrvuProduced * conversionFactor);
  }, [wrvuProduced, conversionFactor]);

  const mgmaTier = useMemo(() => {
    if (wrvuProduced < specialtyData.p25) {
      return { label: "< 25th Percentile (Below Median)", color: "text-amber-400" };
    } else if (wrvuProduced < specialtyData.p50) {
      return { label: "25th – 50th Percentile (Approaching Median)", color: "text-cyan-400" };
    } else if (wrvuProduced < specialtyData.p75) {
      return { label: "50th – 75th Percentile (Above Median / High)", color: "text-emerald-400" };
    } else {
      return { label: "≥ 75th Percentile (Top Tier Clinical Output)", color: "text-purple-400" };
    }
  }, [wrvuProduced, specialtyData]);

  // --- Mode 2 Calculations ---
  const unitData = UNIT_ACUITY_BENCHMARKS[selectedUnit];
  const realizedHppd = useMemo(() => {
    if (patientCensus <= 0) return 0;
    return Number((totalNursingHours / patientCensus).toFixed(2));
  }, [totalNursingHours, patientCensus]);

  const hppdVariance = useMemo(() => {
    if (unitData.targetHppd <= 0) return 0;
    return Number((((realizedHppd - unitData.targetHppd) / unitData.targetHppd) * 100).toFixed(1));
  }, [realizedHppd, unitData]);

  const dailyNursingPayroll = useMemo(() => {
    return Math.round(totalNursingHours * averageHourlyWage);
  }, [totalNursingHours, averageHourlyWage]);

  // --- Mode 3 Calculations ---
  const completedVisits = useMemo(() => {
    const rate = Math.max(0, Math.min(100, noShowRate));
    return Number((scheduledSlots * (1 - rate / 100)).toFixed(1));
  }, [scheduledSlots, noShowRate]);

  const visitsPerHour = useMemo(() => {
    if (clinicHoursPerDay <= 0) return 0;
    return Number((completedVisits / clinicHoursPerDay).toFixed(2));
  }, [completedVisits, clinicHoursPerDay]);

  const dailyClinicRevenue = useMemo(() => {
    return Math.round(completedVisits * revenuePerVisit);
  }, [completedVisits, revenuePerVisit]);

  const dailyNoShowLoss = useMemo(() => {
    const lostCount = scheduledSlots - completedVisits;
    return Math.round(lostCount * revenuePerVisit);
  }, [scheduledSlots, completedVisits, revenuePerVisit]);

  // --- Quick Presets ---
  const applyPreset = (presetKey: string) => {
    if (presetKey === "pcp") {
      setMode("wrvu");
      setSelectedSpecialty("primary_care");
      setWrvuProduced(5100);
      setClinicalDays(212);
      setConversionFactor(48.5);
    } else if (presetKey === "med_surg") {
      setMode("hppd");
      setSelectedUnit("med_surg");
      setTotalNursingHours(240);
      setPatientCensus(28);
      setAverageHourlyWage(46);
    } else if (presetKey === "icu") {
      setMode("hppd");
      setSelectedUnit("icu");
      setTotalNursingHours(220);
      setPatientCensus(11);
      setAverageHourlyWage(52);
    } else if (presetKey === "cardio") {
      setMode("wrvu");
      setSelectedSpecialty("cardiology");
      setWrvuProduced(8200);
      setClinicalDays(200);
      setConversionFactor(68.0);
    }
  };

  const copyReport = () => {
    let report = "";
    if (mode === "wrvu") {
      report = `### Healthcare Productivity Clinical Report (Physician wRVU Model)
- **Clinical Specialty**: ${specialtyData.name}
- **Annual Work RVUs**: ${wrvuProduced.toLocaleString()} wRVU
- **Clinical Days Worked**: ${clinicalDays} days
- **Daily Clinical Velocity**: ${wrvuPerDay} wRVU / day
- **Compensation Rate**: $${conversionFactor.toFixed(2)} / wRVU
- **Gross Estimated Production**: $${estimatedCollections.toLocaleString()}
- **MGMA Benchmarking Tier**: ${mgmaTier.label} (Median: ${specialtyData.p50.toLocaleString()} wRVU)
- *Source: ProductivityCalculator.work Healthcare Suite*`;
    } else if (mode === "hppd") {
      report = `### Inpatient Nursing Productivity Report (HPPD Acuity Model)
- **Care Unit**: ${unitData.name}
- **Midnight Patient Census**: ${patientCensus} patients
- **Total Productive Nursing Hours**: ${totalNursingHours} hrs / 24h
- **Realized HPPD**: ${realizedHppd} Hours Per Patient Day
- **Target HPPD Benchmark**: ${unitData.targetHppd} HPPD (${unitData.standardRatio})
- **Staffing Acuity Variance**: ${hppdVariance > 0 ? "+" : ""}${hppdVariance}%
- **Daily Unit Nursing Payroll**: $${dailyNursingPayroll.toLocaleString()} ($${averageHourlyWage}/hr avg)
- *Source: ProductivityCalculator.work Healthcare Suite*`;
    } else {
      report = `### Ambulatory Clinic Productivity Report (Patient Encounter Model)
- **Scheduled Clinic Slots**: ${scheduledSlots} appointments / day
- **No-Show & Late Cancel Rate**: ${noShowRate}%
- **Realized Completed Visits**: ${completedVisits} patients / day
- **Clinical Visit Velocity**: ${visitsPerHour} patients / hour (${clinicHoursPerDay}h clinic)
- **Daily Generated Revenue**: $${dailyClinicRevenue.toLocaleString()} ($${revenuePerVisit}/visit)
- **Lost No-Show Opportunity**: $${dailyNoShowLoss.toLocaleString()} / day
- *Source: ProductivityCalculator.work Healthcare Suite*`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-md">
      {/* Header with Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-cyan-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display">
              Clinical Healthcare Productivity Calculator
            </h2>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Quantify physician wRVU output, inpatient nursing HPPD staffing, and ambulatory clinic capacity against CMS &amp; MGMA standards.
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex bg-muted/60 p-1 rounded-xl border border-border text-xs font-medium">
          <button
            onClick={() => setMode("wrvu")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === "wrvu"
                ? "bg-cyan-500 text-black font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Physician wRVU
          </button>
          <button
            onClick={() => setMode("hppd")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === "hppd"
                ? "bg-cyan-500 text-black font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Nursing HPPD
          </button>
          <button
            onClick={() => setMode("clinic")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === "clinic"
                ? "bg-cyan-500 text-black font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Clinic Encounters
          </button>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 text-xs">
        <span className="text-muted-foreground whitespace-nowrap">Clinical Presets:</span>
        <button
          onClick={() => applyPreset("pcp")}
          className="px-2.5 py-1 rounded-md bg-muted/40 hover:bg-muted text-foreground border border-border/60 transition whitespace-nowrap"
        >
          Primary Care Clinic
        </button>
        <button
          onClick={() => applyPreset("med_surg")}
          className="px-2.5 py-1 rounded-md bg-muted/40 hover:bg-muted text-foreground border border-border/60 transition whitespace-nowrap"
        >
          Med-Surg Ward (28 Beds)
        </button>
        <button
          onClick={() => applyPreset("icu")}
          className="px-2.5 py-1 rounded-md bg-muted/40 hover:bg-muted text-foreground border border-border/60 transition whitespace-nowrap"
        >
          ICU Critical Care
        </button>
        <button
          onClick={() => applyPreset("cardio")}
          className="px-2.5 py-1 rounded-md bg-muted/40 hover:bg-muted text-foreground border border-border/60 transition whitespace-nowrap"
        >
          Cardiology Specialist
        </button>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Left Column: Form Controls */}
        <div className="space-y-5">
          {mode === "wrvu" && (
            <>
              <div>
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Clinical Specialty &amp; MGMA Benchmark</span>
                  <span className="text-cyan-500 text-xs font-mono">
                    Median: {specialtyData.p50.toLocaleString()} wRVU
                  </span>
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => {
                    setSelectedSpecialty(e.target.value);
                    setConversionFactor(SPECIALTY_BENCHMARKS[e.target.value].avgConversion);
                  }}
                  className="w-full mt-1.5 p-2.5 rounded-xl bg-background border border-border text-xs md:text-sm font-medium focus:ring-1 focus:ring-cyan-500"
                >
                  {Object.entries(SPECIALTY_BENCHMARKS).map(([key, spec]) => (
                    <option key={key} value={key}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Annual / Period Work RVUs Produced</span>
                  <span className="text-cyan-400 font-mono">{wrvuProduced.toLocaleString()} wRVU</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="14000"
                  step="100"
                  value={wrvuProduced}
                  onChange={(e) => setWrvuProduced(Number(e.target.value))}
                  className="w-full mt-2 accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Clinical Work Days / Year</label>
                  <input
                    type="number"
                    min="50"
                    max="300"
                    value={clinicalDays}
                    onChange={(e) => setClinicalDays(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Comp Rate ($/wRVU)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="20"
                    max="120"
                    value={conversionFactor}
                    onChange={(e) => setConversionFactor(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  />
                </div>
              </div>
            </>
          )}

          {mode === "hppd" && (
            <>
              <div>
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Inpatient Care Unit &amp; Standard Ratio</span>
                  <span className="text-emerald-500 text-xs font-mono">{unitData.standardRatio}</span>
                </label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full mt-1.5 p-2.5 rounded-xl bg-background border border-border text-xs md:text-sm font-medium focus:ring-1 focus:ring-emerald-500"
                >
                  {Object.entries(UNIT_ACUITY_BENCHMARKS).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.targetHppd} HPPD)
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-muted-foreground mt-1">{unitData.description}</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Total Daily Nursing Staff Hours (RN + LPN + CNA)</span>
                  <span className="text-emerald-400 font-mono">{totalNursingHours} hrs / 24h</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="600"
                  step="10"
                  value={totalNursingHours}
                  onChange={(e) => setTotalNursingHours(Number(e.target.value))}
                  className="w-full mt-2 accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Midnight Patient Census</label>
                  <input
                    type="number"
                    min="1"
                    max="150"
                    value={patientCensus}
                    onChange={(e) => setPatientCensus(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Avg Loaded Nurse Wage ($/hr)</label>
                  <input
                    type="number"
                    min="25"
                    max="120"
                    value={averageHourlyWage}
                    onChange={(e) => setAverageHourlyWage(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  />
                </div>
              </div>
            </>
          )}

          {mode === "clinic" && (
            <>
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Scheduled Daily Appointment Slots</span>
                  <span className="text-purple-400 font-mono">{scheduledSlots} patients / day</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="45"
                  step="1"
                  value={scheduledSlots}
                  onChange={(e) => setScheduledSlots(Number(e.target.value))}
                  className="w-full mt-2 accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>No-Show &amp; Late Cancellation Rate</span>
                  <span className="text-purple-400 font-mono">{noShowRate}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  step="1"
                  value={noShowRate}
                  onChange={(e) => setNoShowRate(Number(e.target.value))}
                  className="w-full mt-2 accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Clinic Session Hours</label>
                  <input
                    type="number"
                    min="2"
                    max="12"
                    value={clinicHoursPerDay}
                    onChange={(e) => setClinicHoursPerDay(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Average Rev / Visit ($)</label>
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={revenuePerVisit}
                    onChange={(e) => setRevenuePerVisit(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Dynamic KPI Display Card */}
        <div className="p-6 rounded-2xl bg-card/60 border border-border flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Clinical KPI Scorecard
              </span>
              <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                {mode === "wrvu" ? "CMS Model" : mode === "hppd" ? "Acuity Model" : "Ambulatory Model"}
              </span>
            </div>

            {mode === "wrvu" && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-background/80 border border-border/80">
                  <div className="text-xs text-muted-foreground">Daily wRVU Velocity</div>
                  <div className="text-2xl font-bold font-mono text-cyan-400 mt-0.5">
                    {wrvuPerDay}{" "}
                    <span className="text-xs text-muted-foreground font-sans">wRVU / Clinical Day</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Based on {clinicalDays} clinical encounters days per year.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Est. Value Produced</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      ${estimatedCollections.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Specialty Median</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      {specialtyData.p50.toLocaleString()} wRVU
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs">
                  <div className="text-muted-foreground">MGMA Benchmark Tier</div>
                  <div className={`font-semibold mt-0.5 ${mgmaTier.color}`}>{mgmaTier.label}</div>
                </div>
              </div>
            )}

            {mode === "hppd" && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-background/80 border border-border/80">
                  <div className="text-xs text-muted-foreground">Realized Nursing HPPD</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                    {realizedHppd}{" "}
                    <span className="text-xs text-muted-foreground font-sans">Hours Per Patient Day</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Standard Acuity Target: {unitData.targetHppd} HPPD ({unitData.standardRatio})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Staffing Variance</span>
                    <div
                      className={`font-bold font-mono mt-1 text-sm ${
                        Math.abs(hppdVariance) <= 5
                          ? "text-emerald-400"
                          : hppdVariance > 5
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {hppdVariance > 0 ? "+" : ""}
                      {hppdVariance}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">24-Hr Unit Payroll</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      ${dailyNursingPayroll.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground">
                  {hppdVariance < -5 ? (
                    <span className="text-rose-400">
                      ⚠️ Unit is currently under target acuity. Risk of nurse burnout and delayed medication administration.
                    </span>
                  ) : hppdVariance > 10 ? (
                    <span className="text-amber-400">
                      ℹ️ Staffing exceeds acuity target by {hppdVariance}%. Review float pool and overtime usage.
                    </span>
                  ) : (
                    <span className="text-emerald-400">
                      ✓ Optimal staffing alignment. Meets patient safety and nurse satisfaction thresholds.
                    </span>
                  )}
                </div>
              </div>
            )}

            {mode === "clinic" && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-background/80 border border-border/80">
                  <div className="text-xs text-muted-foreground">Completed Encounters &amp; Velocity</div>
                  <div className="text-2xl font-bold font-mono text-purple-400 mt-0.5">
                    {completedVisits}{" "}
                    <span className="text-xs text-muted-foreground font-sans">
                      Visits ({visitsPerHour} / hour)
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {scheduledSlots} scheduled slots with {noShowRate}% no-show friction.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Daily Realized Revenue</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      ${dailyClinicRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Daily No-Show Loss</span>
                    <div className="font-bold font-mono text-rose-400 mt-1 text-sm">
                      -${dailyNoShowLoss.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground">
                  Projected Annual No-Show Leakage:{" "}
                  <strong className="text-rose-400 font-mono">
                    ${(dailyNoShowLoss * 240).toLocaleString()}
                  </strong>{" "}
                  (240 clinic days). Automated SMS confirmations can recover 40%–60%.
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
                  <span>Export Clinical Performance Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
