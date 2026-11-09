/**
 * [INPUT]: React hooks, UI primitives (Card, Button, Input, Label), Lucide icons
 * [OUTPUT]: LaborProductivityCalculator - Workforce throughput, revenue efficiency & utilization calculator
 * [POS]: Specialized labor productivity suite for /calculator/labor
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  Briefcase,
  TrendingUp,
  Percent,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  DollarSign,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

type ActiveTab = "output" | "blended" | "utilization";

interface Preset {
  name: string;
  totalOutput: number;
  laborHours: number;
  laborCost: number;
  benchmarkRate: number;
}

const PRESETS: Preset[] = [
  { name: "Professional Services", totalOutput: 74000, laborHours: 400, laborCost: 26000, benchmarkRate: 175 },
  { name: "Warehouse & Logistics", totalOutput: 5600, laborHours: 40, laborCost: 880, benchmarkRate: 130 },
  { name: "Construction Crew", totalOutput: 1440, laborHours: 80, laborCost: 2800, benchmarkRate: 16 },
  { name: "Tech & Software Team", totalOutput: 125000, laborHours: 520, laborCost: 45000, benchmarkRate: 220 },
];

export default function LaborProductivityCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("output");
  const [copied, setCopied] = useState(false);

  // Tab 1: Output & Cost Rate state
  const [totalOutput, setTotalOutput] = useState<number>(48000);
  const [laborHours, setLaborHours] = useState<number>(320);
  const [laborCost, setLaborCost] = useState<number>(11200);
  const [benchmarkRate, setBenchmarkRate] = useState<number>(140);

  // Tab 2: Blended Team & Workforce state
  const [seniorWorkers, setSeniorWorkers] = useState<number>(2);
  const [seniorRate, setSeniorRate] = useState<number>(65);
  const [midWorkers, setMidWorkers] = useState<number>(4);
  const [midRate, setMidRate] = useState<number>(42);
  const [juniorWorkers, setJuniorWorkers] = useState<number>(3);
  const [juniorRate, setJuniorRate] = useState<number>(26);
  const [hoursPerWorker, setHoursPerWorker] = useState<number>(40);
  const [projectRevenue, setProjectRevenue] = useState<number>(42000);

  // Tab 3: Capacity & Utilization Rate state
  const [scheduledHours, setScheduledHours] = useState<number>(40);
  const [billableHours, setBillableHours] = useState<number>(32);
  const [adminHours, setAdminHours] = useState<number>(5);
  const [breakHours, setBreakHours] = useState<number>(3);
  const [targetUtilization, setTargetUtilization] = useState<number>(80);

  // Tab 1 Calculations: Physical & Financial Productivity
  const outputResults = useMemo(() => {
    const safeHours = Math.max(0.1, laborHours);
    const safeCost = Math.max(0.1, laborCost);
    const safeOutput = Math.max(0, totalOutput);

    const productivityPerHour = safeOutput / safeHours;
    const revenueToCostRatio = safeCost > 0 ? safeOutput / safeCost : 0;
    const costPerUnit = safeOutput > 0 ? safeCost / safeOutput : 0;
    const achievement = benchmarkRate > 0 ? (productivityPerHour / benchmarkRate) * 100 : 100;

    return {
      productivityPerHour: Math.round(productivityPerHour * 10) / 10,
      revenueToCostRatio: Math.round(revenueToCostRatio * 100) / 100,
      costPerUnit: Math.round(costPerUnit * 100) / 100,
      achievement: Math.round(achievement * 10) / 10,
    };
  }, [totalOutput, laborHours, laborCost, benchmarkRate]);

  // Tab 2 Calculations: Blended Workforce
  const blendedResults = useMemo(() => {
    const totalHeadcount = Math.max(1, seniorWorkers + midWorkers + juniorWorkers);
    const seniorCost = seniorWorkers * seniorRate * hoursPerWorker;
    const midCost = midWorkers * midRate * hoursPerWorker;
    const juniorCost = juniorWorkers * juniorRate * hoursPerWorker;
    const totalPayroll = seniorCost + midCost + juniorCost;
    const totalTeamHours = totalHeadcount * hoursPerWorker;

    const blendedHourlyRate = totalTeamHours > 0 ? totalPayroll / totalTeamHours : 0;
    const revenuePerWorker = totalHeadcount > 0 ? projectRevenue / totalHeadcount : 0;
    const laborMargin = projectRevenue > 0 ? ((projectRevenue - totalPayroll) / projectRevenue) * 100 : 0;

    return {
      totalHeadcount,
      totalTeamHours,
      totalPayroll: Math.round(totalPayroll),
      blendedHourlyRate: Math.round(blendedHourlyRate * 10) / 10,
      revenuePerWorker: Math.round(revenuePerWorker),
      laborMargin: Math.round(laborMargin * 10) / 10,
    };
  }, [seniorWorkers, seniorRate, midWorkers, midRate, juniorWorkers, juniorRate, hoursPerWorker, projectRevenue]);

  // Tab 3 Calculations: Capacity & Utilization
  const utilizationResults = useMemo(() => {
    const safeScheduled = Math.max(0.1, scheduledHours);
    const safeBillable = Math.min(safeScheduled, Math.max(0, billableHours));
    const utilizationRate = (safeBillable / safeScheduled) * 100;
    const overheadPercent = Math.max(0, 100 - utilizationRate);
    const extraHoursNeeded = targetUtilization > 0
      ? Math.max(0, (targetUtilization / 100) * safeScheduled - safeBillable)
      : 0;

    let tier = "Target Achieved";
    let tierColor = "text-[var(--neon-green)]";
    if (utilizationRate < 70) {
      tier = "Low Utilization";
      tierColor = "text-rose-400";
    } else if (utilizationRate < targetUtilization) {
      tier = "Below Target";
      tierColor = "text-amber-400";
    }

    return {
      utilizationRate: Math.round(utilizationRate * 10) / 10,
      overheadPercent: Math.round(overheadPercent * 10) / 10,
      extraHoursNeeded: Math.round(extraHoursNeeded * 10) / 10,
      tier,
      tierColor,
    };
  }, [scheduledHours, billableHours, targetUtilization]);

  const applyPreset = (p: Preset) => {
    setTotalOutput(p.totalOutput);
    setLaborHours(p.laborHours);
    setLaborCost(p.laborCost);
    setBenchmarkRate(p.benchmarkRate);
  };

  const handleCopyReport = () => {
    let report = "";
    if (activeTab === "output") {
      report = `[Labor Productivity & Cost Efficiency Log]
Total Output: $${totalOutput.toLocaleString()} (or units) | Total Labor Hours: ${laborHours}h
Labor Productivity: ${outputResults.productivityPerHour} / hour
Revenue-to-Labor Ratio: ${outputResults.revenueToCostRatio}x ($${outputResults.revenueToCostRatio} return per $1 labor cost)
Labor Cost Per Unit: $${outputResults.costPerUnit}
Benchmark Achievement: ${outputResults.achievement}% (Target: ${benchmarkRate}/hr)
Generated via productivitycalculator.work`;
    } else if (activeTab === "blended") {
      report = `[Blended Workforce & Payroll Rate Log]
Team Composition: ${seniorWorkers} Senior ($${seniorRate}/h) + ${midWorkers} Mid ($${midRate}/h) + ${juniorWorkers} Junior ($${juniorRate}/h)
Total Headcount: ${blendedResults.totalHeadcount} workers | Team Hours: ${blendedResults.totalTeamHours}h
Blended Hourly Labor Cost: $${blendedResults.blendedHourlyRate}/hr
Total Labor Cost: $${blendedResults.totalPayroll.toLocaleString()}
Revenue per FTE: $${blendedResults.revenuePerWorker.toLocaleString()}
Gross Labor Margin: ${blendedResults.laborMargin}%
Generated via productivitycalculator.work`;
    } else {
      report = `[Labor Utilization & Capacity Efficiency Log]
Scheduled Work Hours: ${scheduledHours}h | Direct / Billable Hours: ${billableHours}h
Labor Utilization Rate: ${utilizationResults.utilizationRate}% (${utilizationResults.tier})
Non-Productive Overhead: ${utilizationResults.overheadPercent}% (${adminHours}h admin + ${breakHours}h breaks)
Target Benchmark: ${targetUtilization}% | Additional Billable Hours Needed: ${utilizationResults.extraHoursNeeded}h
Generated via productivitycalculator.work`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const resetValues = () => {
    if (activeTab === "output") {
      setTotalOutput(48000);
      setLaborHours(320);
      setLaborCost(11200);
      setBenchmarkRate(140);
    } else if (activeTab === "blended") {
      setSeniorWorkers(2);
      setSeniorRate(65);
      setMidWorkers(4);
      setMidRate(42);
      setJuniorWorkers(3);
      setJuniorRate(26);
      setHoursPerWorker(40);
      setProjectRevenue(42000);
    } else {
      setScheduledHours(40);
      setBillableHours(32);
      setAdminHours(5);
      setBreakHours(3);
      setTargetUtilization(80);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Mode Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[var(--bg-elevated)]/80 border border-white/10 backdrop-blur-md">
        <button
          onClick={() => setActiveTab("output")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-display font-medium transition-all ${
            activeTab === "output"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,255,242,0.3)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Output &amp; Cost Rate</span>
        </button>

        <button
          onClick={() => setActiveTab("blended")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-display font-medium transition-all ${
            activeTab === "blended"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,255,242,0.3)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Blended Workforce</span>
        </button>

        <button
          onClick={() => setActiveTab("utilization")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-display font-medium transition-all ${
            activeTab === "utilization"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,255,242,0.3)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Percent className="w-4 h-4" />
          <span>Capacity &amp; Utilization</span>
        </button>
      </div>

      {/* Quick Presets */}
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

      {/* Main Card */}
      <Card className="card-neon border-white/15 bg-black/60 shadow-2xl backdrop-blur-xl">
        <CardHeader className="pb-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                {activeTab === "output" && <TrendingUp className="w-6 h-6 text-[var(--neon-cyan)]" />}
                {activeTab === "blended" && <Users className="w-6 h-6 text-[var(--neon-cyan)]" />}
                {activeTab === "utilization" && <Percent className="w-6 h-6 text-[var(--neon-cyan)]" />}
                <span>
                  {activeTab === "output" && "Labor Productivity & Output per Hour"}
                  {activeTab === "blended" && "Blended Team Labor Rate & Margin"}
                  {activeTab === "utilization" && "Labor Utilization & Capacity Efficiency"}
                </span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-body">
                {activeTab === "output" && "Calculate physical units per man-hour, revenue-to-labor ratio, and unit cost."}
                {activeTab === "blended" && "Model mixed senior/mid/junior teams, blended hourly payroll rates, and revenue per FTE."}
                {activeTab === "utilization" && "Measure direct billable hours vs overhead admin to optimize staffing capacity."}
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
          {/* TAB 1: OUTPUT & COST RATE */}
          {activeTab === "output" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Output ($ or Units)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={totalOutput || ""}
                    onChange={(e) => setTotalOutput(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Total value produced</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Labor Hours
                  </Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={laborHours || ""}
                    onChange={(e) => setLaborHours(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Direct + indirect hours</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Labor Cost ($)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={laborCost || ""}
                    onChange={(e) => setLaborCost(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Wages, taxes, benefits</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Benchmark Target Rate
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={benchmarkRate || ""}
                    onChange={(e) => setBenchmarkRate(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Hourly output quota</span>
                </div>
              </div>

              {/* Metric Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Productivity per Hour</span>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    {outputResults.productivityPerHour}{" "}
                    <span className="text-xs font-normal text-[var(--text-secondary)]">/ man-hr</span>
                  </div>
                  <span className="text-[11px] text-[var(--neon-cyan)] mt-1 block">
                    {(outputResults.productivityPerHour / 60).toFixed(2)} per minute
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Revenue-to-Cost Ratio</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-green)] mt-1">
                    {outputResults.revenueToCostRatio}x
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    ${outputResults.revenueToCostRatio} return per $1 labor
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Labor Cost per Unit</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-cyan)] mt-1">
                    ${outputResults.costPerUnit}
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    Direct labor unit expense
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Target Achievement</span>
                  <div className={`text-2xl font-mono font-bold mt-1 ${
                    outputResults.achievement >= 100
                      ? "text-[var(--neon-green)]"
                      : outputResults.achievement >= 85
                      ? "text-[var(--neon-cyan)]"
                      : "text-amber-400"
                  }`}>
                    {outputResults.achievement}%
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    vs {benchmarkRate} benchmark
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BLENDED WORKFORCE */}
          {activeTab === "blended" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Senior tier */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-xs font-mono uppercase text-[var(--neon-pink)] block">Senior Specialists</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-[11px] text-[var(--text-muted)]">Count</Label>
                      <Input
                        type="number"
                        min="0"
                        value={seniorWorkers}
                        onChange={(e) => setSeniorWorkers(Number(e.target.value))}
                        className="font-mono text-sm bg-black/40 border-white/10"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] text-[var(--text-muted)]">Rate ($/h)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={seniorRate}
                        onChange={(e) => setSeniorRate(Number(e.target.value))}
                        className="font-mono text-sm bg-black/40 border-white/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Mid tier */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-xs font-mono uppercase text-[var(--neon-cyan)] block">Mid-Level Associates</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-[11px] text-[var(--text-muted)]">Count</Label>
                      <Input
                        type="number"
                        min="0"
                        value={midWorkers}
                        onChange={(e) => setMidWorkers(Number(e.target.value))}
                        className="font-mono text-sm bg-black/40 border-white/10"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] text-[var(--text-muted)]">Rate ($/h)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={midRate}
                        onChange={(e) => setMidRate(Number(e.target.value))}
                        className="font-mono text-sm bg-black/40 border-white/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Junior tier */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-xs font-mono uppercase text-[var(--neon-green)] block">Junior / Tech Support</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-[11px] text-[var(--text-muted)]">Count</Label>
                      <Input
                        type="number"
                        min="0"
                        value={juniorWorkers}
                        onChange={(e) => setJuniorWorkers(Number(e.target.value))}
                        className="font-mono text-sm bg-black/40 border-white/10"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] text-[var(--text-muted)]">Rate ($/h)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={juniorRate}
                        onChange={(e) => setJuniorRate(Number(e.target.value))}
                        className="font-mono text-sm bg-black/40 border-white/10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours & Project Revenue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Hours Worked per Staff (e.g. 40h/week)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={hoursPerWorker || ""}
                    onChange={(e) => setHoursPerWorker(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Delivered Project Revenue ($)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={projectRevenue || ""}
                    onChange={(e) => setProjectRevenue(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                </div>
              </div>

              {/* Blended Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Blended Hourly Wage</span>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    ${blendedResults.blendedHourlyRate}{" "}
                    <span className="text-xs font-normal text-[var(--text-secondary)]">/hr</span>
                  </div>
                  <span className="text-[11px] text-[var(--neon-cyan)] mt-1 block">
                    Across {blendedResults.totalHeadcount} total team FTEs
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Total Payroll Cost</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-pink)] mt-1">
                    ${blendedResults.totalPayroll.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    {blendedResults.totalTeamHours} total man-hours
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Revenue per Employee</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-cyan)] mt-1">
                    ${blendedResults.revenuePerWorker.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    Economic output per FTE
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Gross Labor Margin</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-green)] mt-1">
                    {blendedResults.laborMargin}%
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    Net profit after payroll
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAPACITY & UTILIZATION */}
          {activeTab === "utilization" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Scheduled (Hrs)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={scheduledHours || ""}
                    onChange={(e) => setScheduledHours(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">e.g. 40h standard week</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Billable / Direct (Hrs)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={billableHours || ""}
                    onChange={(e) => setBillableHours(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Client or product work</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Admin &amp; Meetings (Hrs)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={adminHours || ""}
                    onChange={(e) => setAdminHours(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Internal coordination</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Breaks &amp; Downtime (Hrs)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={breakHours || ""}
                    onChange={(e) => setBreakHours(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Non-working paid time</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Target Utilization (%)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={targetUtilization || ""}
                    onChange={(e) => setTargetUtilization(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Standard quota (75-85%)</span>
                </div>
              </div>

              {/* Utilization Composite Card */}
              <div className="p-6 rounded-2xl bg-[var(--bg-elevated)]/80 border border-white/15 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Workforce Utilization Rate
                    </span>
                    <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white mt-1 flex items-baseline gap-3">
                      <span>{utilizationResults.utilizationRate}%</span>
                      <span className={`text-sm font-display font-semibold ${utilizationResults.tierColor}`}>
                        [{utilizationResults.tier}]
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-[var(--text-muted)] block">Target Standard</span>
                    <span className="text-sm font-mono text-white/90">
                      Target: <strong className="text-[var(--neon-cyan)]">{targetUtilization}%</strong>
                    </span>
                  </div>
                </div>

                {/* Utilization Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                    <span>Direct Billable: {billableHours}h ({utilizationResults.utilizationRate}%)</span>
                    <span>Non-Billable Overhead: {(scheduledHours - billableHours).toFixed(1)}h ({utilizationResults.overheadPercent}%)</span>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden flex">
                    <div
                      className="bg-[var(--neon-cyan)] h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, utilizationResults.utilizationRate)}%` }}
                    />
                    <div
                      className="bg-amber-400/70 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, utilizationResults.overheadPercent)}%` }}
                    />
                  </div>
                </div>

                {/* Additional Work Needed Callout */}
                {utilizationResults.extraHoursNeeded > 0 ? (
                  <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-300 flex items-center justify-between">
                    <span>Gap to Target: Need {utilizationResults.extraHoursNeeded} additional direct hours per worker to meet {targetUtilization}% target.</span>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/20 text-xs font-mono text-[var(--neon-green)] flex items-center justify-between">
                    <span>Excellence: Direct billable hours exceed the {targetUtilization}% organizational quota.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
