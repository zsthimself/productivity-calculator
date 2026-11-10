/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 CustomerSupportProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的客服人效、工单解决流速、FCR 首次解决率与 CSAT 产值计算引擎，承接 /calculator/customer-support 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Headphones,
  MessageSquare,
  Clock,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  Smile,
  AlertCircle,
} from "lucide-react";

type CalcMode = "throughput_volume" | "fcr_speed" | "cost_csat";

interface SupportPreset {
  name: string;
  channel: string;
  teamSize: number;
  workHoursPerWeek: number;
  weeklyTickets: number;
  fcrPct: number;
  ahtMinutes: number;
  frtHours: number;
  monthlyBudget: number;
  blendedHourlyWage: number;
  csatPct: number;
  surveyResponsePct: number;
}

const PRESETS: Record<string, SupportPreset> = {
  saas_helpdesk: {
    name: "Growth B2B SaaS Helpdesk",
    channel: "Omnichannel Ticket & Live Chat",
    teamSize: 18,
    workHoursPerWeek: 40,
    weeklyTickets: 3200,
    fcrPct: 74,
    ahtMinutes: 8.5,
    frtHours: 1.2,
    monthlyBudget: 115000,
    blendedHourlyWage: 26,
    csatPct: 92,
    surveyResponsePct: 18,
  },
  ecommerce_retail: {
    name: "E-Commerce Consumer Support",
    channel: "High-Volume Chat & Order Inquiry",
    teamSize: 42,
    workHoursPerWeek: 40,
    weeklyTickets: 11500,
    fcrPct: 81,
    ahtMinutes: 5.5,
    frtHours: 0.4,
    monthlyBudget: 185000,
    blendedHourlyWage: 21,
    csatPct: 88,
    surveyResponsePct: 12,
  },
  tech_tier3: {
    name: "Enterprise Technical Escalation",
    channel: "Complex Tier 2/3 Engineering Desk",
    teamSize: 8,
    workHoursPerWeek: 40,
    weeklyTickets: 420,
    fcrPct: 52,
    ahtMinutes: 38.0,
    frtHours: 3.5,
    monthlyBudget: 85000,
    blendedHourlyWage: 42,
    csatPct: 95,
    surveyResponsePct: 28,
  },
  global_247: {
    name: "24/7 Global Follow-the-Sun Desk",
    channel: "Continuous Multi-Shift Operations",
    teamSize: 28,
    workHoursPerWeek: 40,
    weeklyTickets: 5800,
    fcrPct: 76,
    ahtMinutes: 9.0,
    frtHours: 0.8,
    monthlyBudget: 165000,
    blendedHourlyWage: 25,
    csatPct: 90,
    surveyResponsePct: 15,
  },
};

export function CustomerSupportProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("throughput_volume");
  const [copied, setCopied] = useState(false);

  // Common team parameters
  const [teamSize, setTeamSize] = useState(18);
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState(40);
  const [weeklyTickets, setWeeklyTickets] = useState(3200);

  // Mode 2: FCR & Handle Time
  const [fcrPct, setFcrPct] = useState(74);
  const [ahtMinutes, setAhtMinutes] = useState(8.5);
  const [frtHours, setFrtHours] = useState(1.2);

  // Mode 3: Cost & CSAT
  const [monthlyBudget, setMonthlyBudget] = useState(115000);
  const [blendedHourlyWage, setBlendedHourlyWage] = useState(26);
  const [csatPct, setCsatPct] = useState(92);
  const [surveyResponsePct, setSurveyResponsePct] = useState(18);

  // Computations: Mode 1 Throughput
  const throughputStats = useMemo(() => {
    const totalTeamWeeklyHours = Math.max(1, teamSize * workHoursPerWeek);
    const ticketsPerAgentHour = weeklyTickets / totalTeamWeeklyHours;
    const ticketsPerAgentDay = (weeklyTickets / Math.max(1, teamSize)) / 5; // 5 working days
    const weeklyTicketsPerAgent = teamSize > 0 ? weeklyTickets / teamSize : 0;

    return {
      totalTeamWeeklyHours,
      ticketsPerAgentHour,
      ticketsPerAgentDay,
      weeklyTicketsPerAgent,
    };
  }, [teamSize, workHoursPerWeek, weeklyTickets]);

  // Computations: Mode 2 FCR & Speed
  const fcrStats = useMemo(() => {
    const firstTouchResolved = (weeklyTickets * fcrPct) / 100;
    const escalatedOrReopened = weeklyTickets - firstTouchResolved;
    const weeklyWorkloadMinutes = weeklyTickets * ahtMinutes;
    const activeStaffCapacityMinutes = throughputStats.totalTeamWeeklyHours * 60;
    const agentOccupancyPct = Math.min(100, (weeklyWorkloadMinutes / activeStaffCapacityMinutes) * 100);

    return {
      firstTouchResolved,
      escalatedOrReopened,
      weeklyWorkloadMinutes,
      agentOccupancyPct,
    };
  }, [weeklyTickets, fcrPct, ahtMinutes, throughputStats.totalTeamWeeklyHours]);

  // Computations: Mode 3 Cost & CSAT
  const costStats = useMemo(() => {
    const monthlyResolvedTickets = weeklyTickets * 4.33;
    const costPerTicket = monthlyResolvedTickets > 0 ? monthlyBudget / monthlyResolvedTickets : 0;
    const monthlyLaborCost = throughputStats.totalTeamWeeklyHours * blendedHourlyWage * 4.33;
    const laborShareOfBudgetPct = monthlyBudget > 0 ? (monthlyLaborCost / monthlyBudget) * 100 : 0;
    const monthlySurveys = (monthlyResolvedTickets * surveyResponsePct) / 100;
    const happyCustomersMonthly = (monthlySurveys * csatPct) / 100;

    return {
      monthlyResolvedTickets,
      costPerTicket,
      monthlyLaborCost,
      laborShareOfBudgetPct,
      monthlySurveys,
      happyCustomersMonthly,
    };
  }, [weeklyTickets, monthlyBudget, throughputStats.totalTeamWeeklyHours, blendedHourlyWage, surveyResponsePct, csatPct]);

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setTeamSize(p.teamSize);
    setWorkHoursPerWeek(p.workHoursPerWeek);
    setWeeklyTickets(p.weeklyTickets);
    setFcrPct(p.fcrPct);
    setAhtMinutes(p.ahtMinutes);
    setFrtHours(p.frtHours);
    setMonthlyBudget(p.monthlyBudget);
    setBlendedHourlyWage(p.blendedHourlyWage);
    setCsatPct(p.csatPct);
    setSurveyResponsePct(p.surveyResponsePct);
  };

  const copyReport = () => {
    const text = `### Customer Support Productivity & Helpdesk Audit Report
**Support Team Size:** ${teamSize} FTEs | **Weekly Ticket Volume:** ${weeklyTickets.toLocaleString()} tickets
**Monthly Support Budget:** $${monthlyBudget.toLocaleString()}

#### 1. Throughput & Resolution Velocity
- **Tickets per Agent-Hour:** ${throughputStats.ticketsPerAgentHour.toFixed(2)} tickets/hr (HDI avg: 4 - 7)
- **Daily Tickets per Agent:** ${throughputStats.ticketsPerAgentDay.toFixed(1)} tickets / day
- **Agent Staff Occupancy:** ${fcrStats.agentOccupancyPct.toFixed(1)}% (healthy range: 75% - 85%)

#### 2. First Contact Resolution & Handle Time
- **First Contact Resolution (FCR):** ${fcrPct}% (${Math.round(fcrStats.firstTouchResolved)} first-touch solves)
- **Average Handle Time (AHT):** ${ahtMinutes} minutes
- **First Response Time (FRT):** ${frtHours} hours
- **Reopened / Escalated Tickets:** ${Math.round(fcrStats.escalatedOrReopened)} weekly

#### 3. Support Economics & CSAT Quality
- **Cost Per Resolved Ticket:** $${costStats.costPerTicket.toFixed(2)} / ticket
- **Customer Satisfaction (CSAT):** ${csatPct}% Positive (${Math.round(costStats.happyCustomersMonthly)} monthly satisfied reviews)
- **Labor Share of Budget:** ${costStats.laborShareOfBudgetPct.toFixed(1)}% ($${Math.round(costStats.monthlyLaborCost).toLocaleString()}/mo)
*Generated via productivitycalculator.work/calculator/customer-support*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-2xl space-y-8 font-body">
      {/* Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Headphones className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground tracking-tight">
                Customer Support Productivity Calculator
              </h2>
              <p className="text-xs text-muted-foreground">
                HDI helpdesk metrics, tickets per agent-hour, FCR resolution &amp; cost per ticket analyzer
              </p>
            </div>
          </div>
        </div>

        {/* Industry Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(PRESETS).map(([k, p]) => (
            <button
              key={k}
              onClick={() => applyPreset(k)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all border border-border/40 hover:border-border"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setMode("throughput_volume")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "throughput_volume"
              ? "bg-cyan-500/15 border-cyan-500/60 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>1. Ticket Volume &amp; Speed</span>
        </button>

        <button
          onClick={() => setMode("fcr_speed")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "fcr_speed"
              ? "bg-purple-500/15 border-purple-500/60 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>2. FCR &amp; Handle Time (AHT)</span>
        </button>

        <button
          onClick={() => setMode("cost_csat")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "cost_csat"
              ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <Smile className="w-4 h-4" />
          <span>3. Cost / Ticket &amp; CSAT</span>
        </button>
      </div>

      {/* Form Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-muted/20 border border-border/50">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Customer Support Team Size (FTEs)</span>
            <span className="font-mono text-cyan-400 font-bold">{teamSize} agents</span>
          </div>
          <input
            type="range"
            min="2"
            max="120"
            step="1"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Weekly Total Inbound Tickets / Chats</span>
            <span className="font-mono text-cyan-400 font-bold">{weeklyTickets.toLocaleString()} tickets/wk</span>
          </div>
          <input
            type="range"
            min="100"
            max="30000"
            step="100"
            value={weeklyTickets}
            onChange={(e) => setWeeklyTickets(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <input
            type="number"
            value={weeklyTickets}
            onChange={(e) => setWeeklyTickets(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500"
          />
        </div>

        {mode === "throughput_volume" && (
          <>
            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Scheduled Work Hours per Agent per Week</span>
                <span className="font-mono text-cyan-400 font-bold">{workHoursPerWeek} hrs/wk</span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                step="1"
                value={workHoursPerWeek}
                onChange={(e) => setWorkHoursPerWeek(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </>
        )}

        {mode === "fcr_speed" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">First Contact Resolution (FCR %)</span>
                <span className="font-mono text-purple-400 font-bold">{fcrPct}%</span>
              </div>
              <input
                type="range"
                min="35"
                max="95"
                step="1"
                value={fcrPct}
                onChange={(e) => setFcrPct(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Average Handle Time (AHT in Minutes)</span>
                <span className="font-mono text-purple-400 font-bold">{ahtMinutes} mins</span>
              </div>
              <input
                type="range"
                min="2"
                max="45"
                step="0.5"
                value={ahtMinutes}
                onChange={(e) => setAhtMinutes(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">First Response Time (FRT in Hours)</span>
                <span className="font-mono text-purple-400 font-bold">{frtHours} hrs</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="24"
                step="0.1"
                value={frtHours}
                onChange={(e) => setFrtHours(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </>
        )}

        {mode === "cost_csat" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Monthly Department Budget ($)</span>
                <span className="font-mono text-emerald-400 font-bold">${monthlyBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Customer CSAT Target Score (%)</span>
                <span className="font-mono text-emerald-400 font-bold">{csatPct}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                step="1"
                value={csatPct}
                onChange={(e) => setCsatPct(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Blended Fully-Loaded Hourly Wage ($/hr)</span>
                <span className="font-mono text-emerald-400 font-bold">${blendedHourlyWage.toFixed(2)}/hr</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="0.5"
                value={blendedHourlyWage}
                onChange={(e) => setBlendedHourlyWage(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </>
        )}
      </div>

      {/* Primary KPI Results Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Tickets / Agent-Hour
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-400">
            {throughputStats.ticketsPerAgentHour.toFixed(2)}
          </div>
          <div className="text-[11px] text-muted-foreground">HDI Target: 4.0 - 7.0</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            First Touch FCR %
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-mono ${
            fcrPct >= 70 ? "text-emerald-400" : "text-amber-400"
          }`}>
            {fcrPct}%
          </div>
          <div className="text-[11px] text-muted-foreground">Single-touch solves</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Cost Per Ticket
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">
            ${costStats.costPerTicket.toFixed(2)}
          </div>
          <div className="text-[11px] text-muted-foreground">Tier 1 avg: $6 - $12</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Agent Occupancy
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-mono ${
            fcrStats.agentOccupancyPct > 85 ? "text-rose-400" : "text-purple-400"
          }`}>
            {fcrStats.agentOccupancyPct.toFixed(1)}%
          </div>
          <div className="text-[11px] text-muted-foreground">Target: 75% - 85%</div>
        </div>
      </div>

      {/* Secondary Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-card border border-border/50 text-xs">
        <div>
          <span className="text-muted-foreground block">Daily Output / Agent</span>
          <span className="font-mono font-semibold text-foreground">
            ~{throughputStats.ticketsPerAgentDay.toFixed(1)} tickets / day
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Handle Time (AHT)</span>
          <span className="font-mono font-semibold text-foreground">
            {ahtMinutes} mins / ticket
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">First Response Time</span>
          <span className="font-mono font-semibold text-foreground">
            {frtHours} hrs SLA
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Customer CSAT</span>
          <span className="font-mono font-semibold text-foreground">
            {csatPct}% positive reviews
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Support metrics verified against HDI &amp; Zendesk CX benchmark standards</span>
        </div>

        <button
          onClick={copyReport}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Report Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Support Audit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CustomerSupportProductivityCalculator;
