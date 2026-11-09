/**
 * [INPUT]: React hooks, UI primitives (Card, Button, Input, Label), Lucide icons
 * [OUTPUT]: ManufacturingCalculator - Industrial production rate, capacity projection & OEE calculator
 * [POS]: Specialized industrial calculator component for /calculator/manufacturing
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Factory,
  Cog,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Gauge,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";

type ActiveTab = "rate" | "capacity" | "oee";

interface Preset {
  name: string;
  unitsPerHour: number;
  shiftHours: number;
  shiftsPerDay: number;
  lines: number;
  targetOee: number;
}

const PRESETS: Preset[] = [
  { name: "Automotive Assembly", unitsPerHour: 45, shiftHours: 8, shiftsPerDay: 2, lines: 2, targetOee: 85 },
  { name: "High-Speed Packaging", unitsPerHour: 3600, shiftHours: 10, shiftsPerDay: 2, lines: 4, targetOee: 88 },
  { name: "Electronics SMT", unitsPerHour: 12000, shiftHours: 12, shiftsPerDay: 2, lines: 3, targetOee: 92 },
  { name: "Precision CNC", unitsPerHour: 18, shiftHours: 8, shiftsPerDay: 1, lines: 6, targetOee: 78 },
];

export default function ManufacturingCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("rate");
  const [copied, setCopied] = useState(false);

  // Tab 1: Labor & Machine Output Rate state
  const [totalUnits, setTotalUnits] = useState<number>(4800);
  const [hoursWorked, setHoursWorked] = useState<number>(40);
  const [scrapUnits, setScrapUnits] = useState<number>(96);
  const [targetRate, setTargetRate] = useState<number>(120);

  // Tab 2: Factory Capacity Planner state
  const [lineRate, setLineRate] = useState<number>(250);
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [shiftsPerDay, setShiftsPerDay] = useState<number>(2);
  const [activeLines, setActiveLines] = useState<number>(3);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<number>(5);

  // Tab 3: OEE Fast Estimator state
  const [plannedMins, setPlannedMins] = useState<number>(480);
  const [downtimeMins, setDowntimeMins] = useState<number>(45);
  const [idealCycleSecs, setIdealCycleSecs] = useState<number>(12);
  const [oeeTotalUnits, setOeeTotalUnits] = useState<number>(1950);
  const [oeeDefectUnits, setOeeDefectUnits] = useState<number>(39);

  // Tab 1 Calculations
  const rateResults = useMemo(() => {
    const safeHours = Math.max(0.1, hoursWorked);
    const safeTotal = Math.max(0, totalUnits);
    const safeScrap = Math.min(safeTotal, Math.max(0, scrapUnits));
    const goodUnits = safeTotal - safeScrap;

    const grossRate = safeTotal / safeHours;
    const netRate = goodUnits / safeHours;
    const scrapRate = safeTotal > 0 ? (safeScrap / safeTotal) * 100 : 0;
    const efficiency = targetRate > 0 ? (grossRate / targetRate) * 100 : 100;

    return {
      grossRate: Math.round(grossRate * 10) / 10,
      netRate: Math.round(netRate * 10) / 10,
      scrapRate: Math.round(scrapRate * 100) / 100,
      efficiency: Math.round(efficiency * 10) / 10,
      goodUnits,
    };
  }, [totalUnits, hoursWorked, scrapUnits, targetRate]);

  // Tab 2 Calculations
  const capacityResults = useMemo(() => {
    const totalLines = Math.max(1, activeLines);
    const hourlyCapacity = lineRate * totalLines;
    const dailyHours = shiftHours * shiftsPerDay;
    const dailyUnits = hourlyCapacity * dailyHours;
    const weeklyUnits = dailyUnits * workDaysPerWeek;
    const monthlyUnits = dailyUnits * (workDaysPerWeek * 4.33);
    const annualUnits = weeklyUnits * 52;

    return {
      hourlyCapacity,
      dailyHours,
      dailyUnits: Math.round(dailyUnits),
      weeklyUnits: Math.round(weeklyUnits),
      monthlyUnits: Math.round(monthlyUnits),
      annualUnits: Math.round(annualUnits),
    };
  }, [lineRate, shiftHours, shiftsPerDay, activeLines, workDaysPerWeek]);

  // Tab 3 Calculations (OEE)
  const oeeResults = useMemo(() => {
    const operatingMins = Math.max(0, plannedMins - downtimeMins);
    const availability = plannedMins > 0 ? Math.min(100, (operatingMins / plannedMins) * 100) : 0;

    const operatingSecs = operatingMins * 60;
    const idealProductionSecs = oeeTotalUnits * idealCycleSecs;
    const performance = operatingSecs > 0 ? Math.min(100, (idealProductionSecs / operatingSecs) * 100) : 0;

    const goodCount = Math.max(0, oeeTotalUnits - oeeDefectUnits);
    const quality = oeeTotalUnits > 0 ? (goodCount / oeeTotalUnits) * 100 : 0;

    const oeeScore = (availability * performance * quality) / 10000;

    let grade = "World-Class";
    let gradeColor = "text-[var(--neon-green)]";
    if (oeeScore < 60) {
      grade = "Low Efficiency";
      gradeColor = "text-rose-400";
    } else if (oeeScore < 85) {
      grade = "Typical / Acceptable";
      gradeColor = "text-[var(--neon-cyan)]";
    }

    return {
      availability: Math.round(availability * 10) / 10,
      performance: Math.round(performance * 10) / 10,
      quality: Math.round(quality * 100) / 100,
      oeeScore: Math.round(oeeScore * 10) / 10,
      grade,
      gradeColor,
      goodCount,
    };
  }, [plannedMins, downtimeMins, idealCycleSecs, oeeTotalUnits, oeeDefectUnits]);

  const applyPreset = (preset: Preset) => {
    setLineRate(preset.unitsPerHour);
    setShiftHours(preset.shiftHours);
    setShiftsPerDay(preset.shiftsPerDay);
    setActiveLines(preset.lines);
    setTargetRate(preset.unitsPerHour);
    setTotalUnits(preset.unitsPerHour * preset.shiftHours * preset.lines);
    setHoursWorked(preset.shiftHours);
  };

  const handleCopyReport = () => {
    let report = "";
    if (activeTab === "rate") {
      report = `[Manufacturing Productivity Log]
Total Units: ${totalUnits} | Hours Worked: ${hoursWorked}h
Gross Output Rate: ${rateResults.grossRate} units/hr
Net Good Output: ${rateResults.netRate} units/hr
Scrap Rate: ${rateResults.scrapRate}% (${scrapUnits} scrap units)
Target Benchmark Achievement: ${rateResults.efficiency}% (Target: ${targetRate} units/hr)
Generated via productivitycalculator.work`;
    } else if (activeTab === "capacity") {
      report = `[Factory Capacity & Output Projection]
Lines: ${activeLines} | Line Speed: ${lineRate} units/hr | Total Speed: ${capacityResults.hourlyCapacity} units/hr
Shift Schedule: ${shiftsPerDay} shifts/day x ${shiftHours}h (${capacityResults.dailyHours} operating hrs/day)
Daily Output: ${capacityResults.dailyUnits.toLocaleString()} units
Weekly Output (${workDaysPerWeek} days): ${capacityResults.weeklyUnits.toLocaleString()} units
Monthly Output (30 days): ${capacityResults.monthlyUnits.toLocaleString()} units
Annual Output (52 weeks): ${capacityResults.annualUnits.toLocaleString()} units
Generated via productivitycalculator.work`;
    } else {
      report = `[Overall Equipment Effectiveness (OEE) Report]
Planned Time: ${plannedMins}m | Downtime: ${downtimeMins}m
Availability: ${oeeResults.availability}%
Performance: ${oeeResults.performance}% (Ideal Cycle: ${idealCycleSecs}s)
Quality: ${oeeResults.quality}% (Defects: ${oeeDefectUnits}/${oeeTotalUnits})
Overall OEE: ${oeeResults.oeeScore}% (${oeeResults.grade})
Generated via productivitycalculator.work`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const resetValues = () => {
    if (activeTab === "rate") {
      setTotalUnits(4800);
      setHoursWorked(40);
      setScrapUnits(96);
      setTargetRate(120);
    } else if (activeTab === "capacity") {
      setLineRate(250);
      setShiftHours(8);
      setShiftsPerDay(2);
      setActiveLines(3);
      setWorkDaysPerWeek(5);
    } else {
      setPlannedMins(480);
      setDowntimeMins(45);
      idealCycleSecs && setIdealCycleSecs(12);
      setOeeTotalUnits(1950);
      setOeeDefectUnits(39);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Mode Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[var(--bg-elevated)]/80 border border-white/10 backdrop-blur-md">
        <button
          onClick={() => setActiveTab("rate")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-display font-medium transition-all ${
            activeTab === "rate"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,255,242,0.3)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Output & Labor Rate</span>
        </button>

        <button
          onClick={() => setActiveTab("capacity")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-display font-medium transition-all ${
            activeTab === "capacity"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,255,242,0.3)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>Factory Capacity</span>
        </button>

        <button
          onClick={() => setActiveTab("oee")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-display font-medium transition-all ${
            activeTab === "oee"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,255,242,0.3)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>OEE Fast Analyzer</span>
        </button>
      </div>

      {/* Preset Quick Selectors */}
      <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-[var(--neon-cyan)]" /> Quick Presets:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p)}
            className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:border-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 text-[var(--text-secondary)] hover:text-white font-mono transition-all"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Main Calculation Card */}
      <Card className="card-neon border-white/15 bg-black/60 shadow-2xl backdrop-blur-xl">
        <CardHeader className="pb-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                {activeTab === "rate" && <TrendingUp className="w-6 h-6 text-[var(--neon-cyan)]" />}
                {activeTab === "capacity" && <Factory className="w-6 h-6 text-[var(--neon-cyan)]" />}
                {activeTab === "oee" && <Gauge className="w-6 h-6 text-[var(--neon-cyan)]" />}
                <span>
                  {activeTab === "rate" && "Labor & Machine Productivity Rate"}
                  {activeTab === "capacity" && "Factory Daily & Annual Output Estimator"}
                  {activeTab === "oee" && "OEE (Overall Equipment Effectiveness) Benchmark"}
                </span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-body">
                {activeTab === "rate" && "Calculate gross output per hour, scrap loss percentage, and net good productivity."}
                {activeTab === "capacity" && "Project total factory capacity across shifts, active lines, and operating days."}
                {activeTab === "oee" && "Calculate Availability, Performance, and Quality against the 85% world-class standard."}
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetValues}
                className="text-xs font-mono border-white/20 hover:bg-white/10 text-[var(--text-secondary)]"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
              </Button>
              <Button
                size="sm"
                onClick={handleCopyReport}
                className="text-xs font-mono bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 text-black font-semibold"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-black" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copy Log
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-8">
          {/* TAB 1: OUTPUT & LABOR RATE */}
          {activeTab === "rate" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Units Produced
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={totalUnits || ""}
                    onChange={(e) => setTotalUnits(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Gross production volume</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Hours Worked
                  </Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={hoursWorked || ""}
                    onChange={(e) => setHoursWorked(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Labor or machine hours</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Scrap / Defect Units
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={scrapUnits || ""}
                    onChange={(e) => setScrapUnits(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Units rejected by QA</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Target Standard Rate
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={targetRate || ""}
                    onChange={(e) => setTargetRate(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Units/hour quota benchmark</span>
                </div>
              </div>

              {/* Live Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Gross Output Rate</span>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    {rateResults.grossRate}{" "}
                    <span className="text-xs font-normal text-[var(--text-secondary)]">units/hr</span>
                  </div>
                  <span className="text-[11px] text-[var(--neon-cyan)] mt-1 block">
                    {(rateResults.grossRate / 60).toFixed(2)} units/min
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Net Good Rate</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-cyan)] mt-1">
                    {rateResults.netRate}{" "}
                    <span className="text-xs font-normal text-[var(--text-secondary)]">good/hr</span>
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    {rateResults.goodUnits.toLocaleString()} total usable
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Scrap / Defect Rate</span>
                  <div className={`text-2xl font-mono font-bold mt-1 ${
                    rateResults.scrapRate <= 1.0
                      ? "text-[var(--neon-green)]"
                      : rateResults.scrapRate <= 3.0
                      ? "text-[var(--neon-cyan)]"
                      : "text-amber-400"
                  }`}>
                    {rateResults.scrapRate}%
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    {rateResults.scrapRate <= 1.0 ? "World-Class Quality" : "Optimization Recommended"}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Target Achievement</span>
                  <div className={`text-2xl font-mono font-bold mt-1 ${
                    rateResults.efficiency >= 100
                      ? "text-[var(--neon-green)]"
                      : rateResults.efficiency >= 85
                      ? "text-[var(--neon-cyan)]"
                      : "text-rose-400"
                  }`}>
                    {rateResults.efficiency}%
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    vs {targetRate} units/hr quota
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FACTORY CAPACITY & PROJECTION */}
          {activeTab === "capacity" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Line Speed (Units/Hr)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={lineRate || ""}
                    onChange={(e) => setLineRate(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Per production line</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Active Lines
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={activeLines || ""}
                    onChange={(e) => setActiveLines(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Parallel lines running</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Shift Length (Hrs)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="24"
                    value={shiftHours || ""}
                    onChange={(e) => setShiftHours(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Standard shift hours</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Shifts / Day
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="3"
                    value={shiftsPerDay || ""}
                    onChange={(e) => setShiftsPerDay(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">1, 2, or 3 shifts</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Workdays / Week
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="7"
                    value={workDaysPerWeek || ""}
                    onChange={(e) => setWorkDaysPerWeek(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Operating days/week</span>
                </div>
              </div>

              {/* Output Horizons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Daily Plant Capacity</span>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    {capacityResults.dailyUnits.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[var(--neon-cyan)] mt-1 block">
                    {capacityResults.dailyHours} operating hrs/day
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Weekly Output</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-cyan)] mt-1">
                    {capacityResults.weeklyUnits.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    {workDaysPerWeek} production days
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Monthly Output</span>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    {capacityResults.monthlyUnits.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    ~30 calendar days
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Annual Plant Capacity</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-green)] mt-1">
                    {capacityResults.annualUnits.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    52 operational weeks
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OEE FAST ESTIMATOR */}
          {activeTab === "oee" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Planned Time (Mins)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={plannedMins || ""}
                    onChange={(e) => setPlannedMins(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">e.g. 480m for 8h shift</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Downtime (Mins)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={downtimeMins || ""}
                    onChange={(e) => setDowntimeMins(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Breakdowns & setups</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Ideal Cycle (Secs)
                  </Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={idealCycleSecs || ""}
                    onChange={(e) => setIdealCycleSecs(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Design cycle time</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Produced
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={oeeTotalUnits || ""}
                    onChange={(e) => setOeeTotalUnits(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Total pieces made</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Defective Pieces
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={oeeDefectUnits || ""}
                    onChange={(e) => setOeeDefectUnits(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Scrapped or reworked</span>
                </div>
              </div>

              {/* OEE Composite Result */}
              <div className="p-6 rounded-2xl bg-[var(--bg-elevated)]/80 border border-white/15 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Overall Equipment Effectiveness (OEE)
                    </span>
                    <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white mt-1 flex items-baseline gap-3">
                      <span>{oeeResults.oeeScore}%</span>
                      <span className={`text-sm font-display font-semibold ${oeeResults.gradeColor}`}>
                        [{oeeResults.grade}]
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-[var(--text-muted)] block">Benchmark Standard</span>
                    <span className="text-sm font-mono text-white/90">
                      World-Class: <strong className="text-[var(--neon-green)]">85.0%</strong>
                    </span>
                  </div>
                </div>

                {/* 3 Pillars Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[var(--text-muted)]">Availability</span>
                      <span className="text-sm font-mono font-bold text-white">{oeeResults.availability}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[var(--neon-cyan)] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, oeeResults.availability)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                      Target &gt; 90.0%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[var(--text-muted)]">Performance</span>
                      <span className="text-sm font-mono font-bold text-white">{oeeResults.performance}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[var(--neon-pink)] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, oeeResults.performance)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                      Target &gt; 95.0%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[var(--text-muted)]">Quality</span>
                      <span className="text-sm font-mono font-bold text-white">{oeeResults.quality}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[var(--neon-green)] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, oeeResults.quality)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                      Target &gt; 99.0%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
