/**
 * [INPUT]: React hooks, UI primitives (Card, Button, Input, Label), Lucide icons
 * [OUTPUT]: EmployeeProductivityCalculator - Executive revenue per employee, profit per FTE & workforce ROI calculator
 * [POS]: Specialized employee productivity suite for /calculator/employee
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
  DollarSign,
  TrendingUp,
  Award,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  PieChart,
  BarChart2,
  Briefcase,
  Target,
} from "lucide-react";

type ActiveTab = "revenue" | "roi" | "department";

interface Preset {
  name: string;
  revenue: number;
  profit: number;
  headcount: number;
  avgComp: number;
  benchmarkRevPerFte: number;
}

const PRESETS: Preset[] = [
  { name: "Enterprise SaaS", revenue: 9500000, profit: 1900000, headcount: 25, avgComp: 135000, benchmarkRevPerFte: 350000 },
  { name: "Professional Agency", revenue: 2800000, profit: 420000, headcount: 15, avgComp: 85000, benchmarkRevPerFte: 180000 },
  { name: "E-Commerce / Retail", revenue: 12000000, profit: 840000, headcount: 50, avgComp: 55000, benchmarkRevPerFte: 220000 },
  { name: "Tech & Hardware", revenue: 22500000, profit: 3600000, headcount: 50, avgComp: 120000, benchmarkRevPerFte: 400000 },
];

export default function EmployeeProductivityCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("revenue");
  const [copied, setCopied] = useState(false);

  // Tab 1: Revenue & Profit per FTE
  const [annualRevenue, setAnnualRevenue] = useState<number>(4500000);
  const [annualProfit, setAnnualProfit] = useState<number>(675000);
  const [headcount, setHeadcount] = useState<number>(18);
  const [targetRevPerFte, setTargetRevPerFte] = useState<number>(250000);

  // Tab 2: Employee Cost & ROI Multiplier
  const [avgComp, setAvgComp] = useState<number>(95000);
  const [estimatedValue, setEstimatedValue] = useState<number>(320000);
  const [annualHours, setAnnualHours] = useState<number>(1920); // 40h * 48 wks

  // Tab 3: Department Quota & Performance
  const [departmentType, setDepartmentType] = useState<string>("Sales & Account Execs");
  const [teamSize, setTeamSize] = useState<number>(8);
  const [totalOutputUnits, setTotalOutputUnits] = useState<number>(240); // e.g. closed deals or deliverables
  const [targetQuotaPerPerson, setTargetQuotaPerPerson] = useState<number>(25);

  // Tab 1 Calculations
  const revenueResults = useMemo(() => {
    const safeFTE = Math.max(1, headcount);
    const revPerEmployee = annualRevenue / safeFTE;
    const profitPerEmployee = annualProfit / safeFTE;
    const profitMargin = annualRevenue > 0 ? (annualProfit / annualRevenue) * 100 : 0;
    const benchmarkAchievement = targetRevPerFte > 0 ? (revPerEmployee / targetRevPerFte) * 100 : 100;

    let tier = "S&P 500 Average";
    let tierColor = "text-[var(--neon-cyan)]";
    if (revPerEmployee >= 400000) {
      tier = "Top Quartile / Elite";
      tierColor = "text-[var(--neon-green)]";
    } else if (revPerEmployee < 150000) {
      tier = "Under-Leveraged";
      tierColor = "text-rose-400";
    }

    return {
      revPerEmployee: Math.round(revPerEmployee),
      profitPerEmployee: Math.round(profitPerEmployee),
      profitMargin: Math.round(profitMargin * 10) / 10,
      benchmarkAchievement: Math.round(benchmarkAchievement * 10) / 10,
      tier,
      tierColor,
    };
  }, [annualRevenue, annualProfit, headcount, targetRevPerFte]);

  // Tab 2 Calculations
  const roiResults = useMemo(() => {
    const safeComp = Math.max(1000, avgComp);
    const safeHours = Math.max(1, annualHours);
    const roiMultiplier = estimatedValue / safeComp;
    const netValueAdded = estimatedValue - safeComp;
    const hourlyValueRate = estimatedValue / safeHours;
    const hourlyCompRate = safeComp / safeHours;

    return {
      roiMultiplier: Math.round(roiMultiplier * 100) / 100,
      netValueAdded: Math.round(netValueAdded),
      hourlyValueRate: Math.round(hourlyValueRate * 10) / 10,
      hourlyCompRate: Math.round(hourlyCompRate * 10) / 10,
    };
  }, [avgComp, estimatedValue, annualHours]);

  // Tab 3 Calculations
  const deptResults = useMemo(() => {
    const safeSize = Math.max(1, teamSize);
    const actualPerPerson = totalOutputUnits / safeSize;
    const teamQuota = safeSize * targetQuotaPerPerson;
    const quotaAchievement = teamQuota > 0 ? (totalOutputUnits / teamQuota) * 100 : 100;
    const surplusOrDeficit = actualPerPerson - targetQuotaPerPerson;

    return {
      actualPerPerson: Math.round(actualPerPerson * 10) / 10,
      teamQuota,
      quotaAchievement: Math.round(quotaAchievement * 10) / 10,
      surplusOrDeficit: Math.round(surplusOrDeficit * 10) / 10,
    };
  }, [teamSize, totalOutputUnits, targetQuotaPerPerson]);

  const applyPreset = (p: Preset) => {
    setAnnualRevenue(p.revenue);
    setAnnualProfit(p.profit);
    setHeadcount(p.headcount);
    setAvgComp(p.avgComp);
    setTargetRevPerFte(p.benchmarkRevPerFte);
    setEstimatedValue(p.revenue / p.headcount);
  };

  const handleCopyReport = () => {
    let report = "";
    if (activeTab === "revenue") {
      report = `[Executive Employee Productivity & Leverage Report]
Total Headcount: ${headcount} FTEs | Gross Revenue: $${annualRevenue.toLocaleString()}
Revenue per Employee: $${revenueResults.revPerEmployee.toLocaleString()} (${revenueResults.tier})
Net Profit per Employee: $${revenueResults.profitPerEmployee.toLocaleString()} (Margin: ${revenueResults.profitMargin}%)
Benchmark Achievement: ${revenueResults.benchmarkAchievement}% (Target: $${targetRevPerFte.toLocaleString()}/FTE)
Generated via productivitycalculator.work`;
    } else if (activeTab === "roi") {
      report = `[Employee Compensation & ROI Multiplier Report]
Average Total Compensation: $${avgComp.toLocaleString()} / year ($${roiResults.hourlyCompRate}/hr)
Delivered Value Generated: $${estimatedValue.toLocaleString()} / year ($${roiResults.hourlyValueRate}/hr)
Employee ROI Multiplier: ${roiResults.roiMultiplier}x ($${roiResults.roiMultiplier} return per $1 invested)
Net Value Added per Employee: $${roiResults.netValueAdded.toLocaleString()}
Generated via productivitycalculator.work`;
    } else {
      report = `[Department Quota & Staff Performance Report]
Department: ${departmentType} | Team Size: ${teamSize} employees
Total Team Output: ${totalOutputUnits} units (Target: ${deptResults.teamQuota} units)
Output per Employee: ${deptResults.actualPerPerson} units (Individual Target: ${targetQuotaPerPerson})
Quota Realization: ${deptResults.quotaAchievement}% (${deptResults.surplusOrDeficit >= 0 ? "+" : ""}${deptResults.surplusOrDeficit} per worker)
Generated via productivitycalculator.work`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const resetValues = () => {
    if (activeTab === "revenue") {
      setAnnualRevenue(4500000);
      setAnnualProfit(675000);
      setHeadcount(18);
      setTargetRevPerFte(250000);
    } else if (activeTab === "roi") {
      setAvgComp(95000);
      setEstimatedValue(320000);
      setAnnualHours(1920);
    } else {
      setDepartmentType("Sales & Account Execs");
      setTeamSize(8);
      setTotalOutputUnits(240);
      setTargetQuotaPerPerson(25);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Mode Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[var(--bg-elevated)]/80 border border-white/10 backdrop-blur-md">
        <button
          onClick={() => setActiveTab("revenue")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-display font-medium transition-all ${
            activeTab === "revenue"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,255,242,0.3)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Revenue &amp; Profit / FTE</span>
        </button>

        <button
          onClick={() => setActiveTab("roi")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-display font-medium transition-all ${
            activeTab === "roi"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,255,242,0.3)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Employee ROI Multiplier</span>
        </button>

        <button
          onClick={() => setActiveTab("department")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-display font-medium transition-all ${
            activeTab === "department"
              ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,255,242,0.3)] font-semibold"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Department Quota &amp; Output</span>
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

      {/* Main Calculation Card */}
      <Card className="card-neon border-white/15 bg-black/60 shadow-2xl backdrop-blur-xl">
        <CardHeader className="pb-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                {activeTab === "revenue" && <DollarSign className="w-6 h-6 text-[var(--neon-cyan)]" />}
                {activeTab === "roi" && <TrendingUp className="w-6 h-6 text-[var(--neon-cyan)]" />}
                {activeTab === "department" && <Target className="w-6 h-6 text-[var(--neon-cyan)]" />}
                <span>
                  {activeTab === "revenue" && "Revenue & Profit per Employee (FTE)"}
                  {activeTab === "roi" && "Employee Compensation & Labor ROI Multiplier"}
                  {activeTab === "department" && "Department Staff Quota & Performance"}
                </span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-body">
                {activeTab === "revenue" && "Measure corporate operating leverage, revenue per head, and profit per FTE."}
                {activeTab === "roi" && "Calculate value generated per dollar of employee salary, benefits, and payroll overhead."}
                {activeTab === "department" && "Model sales team quotas, ticket resolutions, and individual staff contribution rates."}
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
          {/* TAB 1: REVENUE & PROFIT PER FTE */}
          {activeTab === "revenue" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Gross Revenue ($)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={annualRevenue || ""}
                    onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Annual company top-line</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Net Operating Profit ($)
                  </Label>
                  <Input
                    type="number"
                    value={annualProfit || ""}
                    onChange={(e) => setAnnualProfit(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">EBITDA or net earnings</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Full-Time Staff (FTE)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={headcount || ""}
                    onChange={(e) => setHeadcount(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Total headcount equivalent</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Target Revenue / FTE ($)
                  </Label>
                  <Input
                    type="number"
                    min="1000"
                    value={targetRevPerFte || ""}
                    onChange={(e) => setTargetRevPerFte(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Industry benchmark quota</span>
                </div>
              </div>

              {/* Live Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Revenue per Employee</span>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    ${revenueResults.revPerEmployee.toLocaleString()}
                  </div>
                  <span className={`text-[11px] font-semibold mt-1 block ${revenueResults.tierColor}`}>
                    [{revenueResults.tier}]
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Profit per Employee</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-green)] mt-1">
                    ${revenueResults.profitPerEmployee.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    {revenueResults.profitMargin}% net margin
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Target Achievement</span>
                  <div className={`text-2xl font-mono font-bold mt-1 ${
                    revenueResults.benchmarkAchievement >= 100
                      ? "text-[var(--neon-green)]"
                      : revenueResults.benchmarkAchievement >= 85
                      ? "text-[var(--neon-cyan)]"
                      : "text-amber-400"
                  }`}>
                    {revenueResults.benchmarkAchievement}%
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    vs ${targetRevPerFte.toLocaleString()} goal
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">S&amp;P 500 Comparison</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-cyan)] mt-1">
                    {((revenueResults.revPerEmployee / 320000) * 100).toFixed(0)}%
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    vs $320k US market average
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EMPLOYEE COST & ROI MULTIPLIER */}
          {activeTab === "roi" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Average Annual Compensation ($)
                  </Label>
                  <Input
                    type="number"
                    min="1000"
                    value={avgComp || ""}
                    onChange={(e) => setAvgComp(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Salary, healthcare, bonus, taxes</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Value / Revenue Generated ($)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={estimatedValue || ""}
                    onChange={(e) => setEstimatedValue(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Annual business value per FTE</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Annual Working Hours
                  </Label>
                  <Input
                    type="number"
                    min="100"
                    value={annualHours || ""}
                    onChange={(e) => setAnnualHours(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Standard 1,920h (40h × 48wks)</span>
                </div>
              </div>

              {/* ROI Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Employee ROI Multiplier</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-green)] mt-1">
                    {roiResults.roiMultiplier}x
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    ${roiResults.roiMultiplier} return per $1 spent
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Net Value Added</span>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    ${roiResults.netValueAdded.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-[var(--neon-cyan)] mt-1 block">
                    Profit beyond compensation
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Effective Hourly Value</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-cyan)] mt-1">
                    ${roiResults.hourlyValueRate} <span className="text-xs font-normal text-[var(--text-secondary)]">/hr</span>
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    Revenue created per hour worked
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">Hourly Cost to Company</span>
                  <div className="text-2xl font-mono font-bold text-[var(--neon-pink)] mt-1">
                    ${roiResults.hourlyCompRate} <span className="text-xs font-normal text-[var(--text-secondary)]">/hr</span>
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                    Loaded hourly payroll cost
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEPARTMENT QUOTA & PERFORMANCE */}
          {activeTab === "department" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Department Role
                  </Label>
                  <Input
                    type="text"
                    value={departmentType}
                    onChange={(e) => setDepartmentType(e.target.value)}
                    className="font-body text-sm bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Team or function title</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Team Headcount
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={teamSize || ""}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Number of team members</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Output Units
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={totalOutputUnits || ""}
                    onChange={(e) => setTotalOutputUnits(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Deals, tickets, or tasks</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Target Quota / Person
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={targetQuotaPerPerson || ""}
                    onChange={(e) => setTargetQuotaPerPerson(Number(e.target.value))}
                    className="font-mono text-base bg-white/5 border-white/10 focus:border-[var(--neon-cyan)]"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] block">Individual target benchmark</span>
                </div>
              </div>

              {/* Department Output Results */}
              <div className="p-6 rounded-2xl bg-[var(--bg-elevated)]/80 border border-white/15 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Department Quota Realization
                    </span>
                    <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white mt-1 flex items-baseline gap-3">
                      <span>{deptResults.quotaAchievement}%</span>
                      <span className={`text-sm font-display font-semibold ${
                        deptResults.quotaAchievement >= 100
                          ? "text-[var(--neon-green)]"
                          : "text-amber-400"
                      }`}>
                        [{deptResults.quotaAchievement >= 100 ? "Quota Met" : "Quota Shortfall"}]
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-[var(--text-muted)] block">Team Target Total</span>
                    <span className="text-sm font-mono text-white/90">
                      Target: <strong className="text-[var(--neon-cyan)]">{deptResults.teamQuota} units</strong>
                    </span>
                  </div>
                </div>

                {/* Individual Contribution Callouts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-mono text-[var(--text-muted)] block">Average Output per Employee</span>
                    <div className="text-xl font-mono font-bold text-white mt-1">
                      {deptResults.actualPerPerson} units / member
                    </div>
                    <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                      Target was {targetQuotaPerPerson} units
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-mono text-[var(--text-muted)] block">Variance from Quota</span>
                    <div className={`text-xl font-mono font-bold mt-1 ${
                      deptResults.surplusOrDeficit >= 0 ? "text-[var(--neon-green)]" : "text-rose-400"
                    }`}>
                      {deptResults.surplusOrDeficit >= 0 ? "+" : ""}{deptResults.surplusOrDeficit} units / person
                    </div>
                    <span className="text-[11px] text-[var(--text-secondary)] mt-1 block">
                      {deptResults.surplusOrDeficit >= 0 ? "Exceeding planned capacity" : "Performance coaching required"}
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
