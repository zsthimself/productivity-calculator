/**
 * [INPUT]: 依赖 react 的 useState, useMemo；依赖 lucide-react 图标；依赖 Tailwind CSS
 * [OUTPUT]: 导出 CallCenterProductivityCalculator 组件
 * [POS]: src/components 的呼叫中心与客服人效专属计算器，承接 /calculator/call-center 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  PhoneCall,
  Clock,
  Users,
  Copy,
  Check,
  Sparkles,
  Sliders,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Headphones,
} from "lucide-react";

interface PresetConfig {
  name: string;
  desc: string;
  // Mode 1: Occupancy
  shiftHours: number;
  availableMinutes: number;
  handlingMinutes: number;
  callsHandled: number;
  // Mode 2: CPH & Velocity
  cphCalls: number;
  cphHours: number;
  fcrRate: number;
  ahtSeconds: number;
  // Mode 3: Staffing Capacity
  forecastVolume: number;
  staffAhtSeconds: number;
  targetOccupancy: number;
  shrinkagePct: number;
}

const PRESETS: PresetConfig[] = [
  {
    name: "Inbound Tier-1 Support",
    desc: "General customer service desk handling billing, returns & inquiries",
    shiftHours: 8,
    availableMinutes: 400,
    handlingMinutes: 320,
    callsHandled: 55,
    cphCalls: 55,
    cphHours: 8,
    fcrRate: 78,
    ahtSeconds: 349,
    forecastVolume: 1200,
    staffAhtSeconds: 350,
    targetOccupancy: 80,
    shrinkagePct: 28,
  },
  {
    name: "Outbound Inside Sales",
    desc: "Lead generation, warm qualification & account follow-up calls",
    shiftHours: 8,
    availableMinutes: 420,
    handlingMinutes: 310,
    callsHandled: 110,
    cphCalls: 110,
    cphHours: 8,
    fcrRate: 85,
    ahtSeconds: 169,
    forecastVolume: 2200,
    staffAhtSeconds: 170,
    targetOccupancy: 75,
    shrinkagePct: 22,
  },
  {
    name: "Technical Support Tier-2 (BPO)",
    desc: "Complex IT troubleshooting, remote diagnostics & escalation tickets",
    shiftHours: 8,
    availableMinutes: 390,
    handlingMinutes: 330,
    callsHandled: 32,
    cphCalls: 32,
    cphHours: 8,
    fcrRate: 70,
    ahtSeconds: 618,
    forecastVolume: 650,
    staffAhtSeconds: 620,
    targetOccupancy: 82,
    shrinkagePct: 32,
  },
  {
    name: "Omnichannel E-Commerce",
    desc: "Blended queue handling voice calls, live chat & ticket resolutions",
    shiftHours: 8,
    availableMinutes: 410,
    handlingMinutes: 340,
    callsHandled: 80,
    cphCalls: 80,
    cphHours: 8,
    fcrRate: 82,
    ahtSeconds: 255,
    forecastVolume: 1800,
    staffAhtSeconds: 260,
    targetOccupancy: 83,
    shrinkagePct: 25,
  },
];

export default function CallCenterProductivityCalculator() {
  const [activeTab, setActiveTab] = useState<"occupancy" | "cph" | "staffing">("occupancy");

  // Mode 1: Occupancy & Utilization
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [availableMinutes, setAvailableMinutes] = useState<number>(400);
  const [handlingMinutes, setHandlingMinutes] = useState<number>(320);
  const [callsHandled, setCallsHandled] = useState<number>(55);

  // Mode 2: Calls Per Hour & Velocity
  const [cphCalls, setCphCalls] = useState<number>(55);
  const [cphHours, setCphHours] = useState<number>(8);
  const [fcrRate, setFcrRate] = useState<number>(78);
  const [ahtSeconds, setAhtSeconds] = useState<number>(349);

  // Mode 3: Staffing Capacity & Shrinkage
  const [forecastVolume, setForecastVolume] = useState<number>(1200);
  const [staffAhtSeconds, setStaffAhtSeconds] = useState<number>(350);
  const [targetOccupancy, setTargetOccupancy] = useState<number>(80);
  const [shrinkagePct, setShrinkagePct] = useState<number>(28);

  const [copied, setCopied] = useState<boolean>(false);

  // Apply Preset
  const applyPreset = (p: PresetConfig) => {
    setShiftHours(p.shiftHours);
    setAvailableMinutes(p.availableMinutes);
    setHandlingMinutes(p.handlingMinutes);
    setCallsHandled(p.callsHandled);

    setCphCalls(p.cphCalls);
    setCphHours(p.cphHours);
    setFcrRate(p.fcrRate);
    setAhtSeconds(p.ahtSeconds);

    setForecastVolume(p.forecastVolume);
    setStaffAhtSeconds(p.staffAhtSeconds);
    setTargetOccupancy(p.targetOccupancy);
    setShrinkagePct(p.shrinkagePct);
  };

  // ---------------- Calculation 1: Occupancy & Utilization ----------------
  const occupancyMetrics = useMemo(() => {
    const shiftTotalMinutes = Math.max(60, shiftHours * 60);
    const validAvail = Math.max(1, availableMinutes);
    const validHandling = Math.max(0, handlingMinutes);
    const validCalls = Math.max(1, callsHandled);

    // Agent Occupancy % = Handling Time / Available Time * 100
    const occupancyRate = (validHandling / validAvail) * 100;

    // Agent Utilization % = Available Logged Time / Total Paid Shift Time * 100
    const utilizationRate = (validAvail / shiftTotalMinutes) * 100;

    // Idle / Ready Wait Time
    const idleMinutes = Math.max(0, validAvail - validHandling);

    // Calculated AHT (seconds)
    const calculatedAhtSec = (validHandling * 60) / validCalls;

    // Evaluation
    let statusText = "Optimal Occupancy (75%–85%)";
    let statusColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (occupancyRate < 70) {
      statusText = "Low Occupancy (Overstaffed / High Idle Time)";
      statusColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    } else if (occupancyRate > 88) {
      statusText = "High Burnout Risk (>88% Overburdened)";
      statusColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }

    return {
      occupancyRate,
      utilizationRate,
      idleMinutes,
      calculatedAhtSec,
      statusText,
      statusColor,
    };
  }, [shiftHours, availableMinutes, handlingMinutes, callsHandled]);

  // ---------------- Calculation 2: Calls Per Hour (CPH) ----------------
  const cphMetrics = useMemo(() => {
    const validHours = Math.max(0.5, cphHours);
    const validCalls = Math.max(0, cphCalls);
    const validFcr = Math.min(100, Math.max(0, fcrRate));

    const cph = validCalls / validHours;
    const resolvedCalls = Math.round(validCalls * (validFcr / 100));

    // Total Productive Hours Spent on Calls
    const productiveHours = (validCalls * ahtSeconds) / 3600;
    const paceIndex = (cph / 7.0) * 100; // Baseline 7.0 calls/hr

    return {
      cph: cph.toFixed(1),
      resolvedCalls,
      productiveHours: productiveHours.toFixed(1),
      paceIndex: paceIndex.toFixed(0),
    };
  }, [cphCalls, cphHours, fcrRate, ahtSeconds]);

  // ---------------- Calculation 3: Staffing Capacity & Shrinkage ----------------
  const staffingMetrics = useMemo(() => {
    const validVolume = Math.max(1, forecastVolume);
    const validAht = Math.max(10, staffAhtSeconds);
    const validOccupancy = Math.max(0.5, Math.min(0.95, targetOccupancy / 100));
    const validShrinkage = Math.max(0.05, Math.min(0.6, shrinkagePct / 100));

    // Total Workload Hours required
    const totalWorkloadHours = (validVolume * validAht) / 3600;

    // Daily productive hours per agent on 8-hour shift
    const netAgentAvailableHours = 8.0 * validOccupancy;

    // Net FTE Agents needed on phone lines
    const netAgentsNeeded = totalWorkloadHours / netAgentAvailableHours;

    // Gross Agents Needed after factoring in Shrinkage (1 - Shrinkage)
    const grossAgentsRequired = netAgentsNeeded / (1.0 - validShrinkage);

    // Buffer staff needed
    const bufferStaff = grossAgentsRequired - netAgentsNeeded;

    return {
      totalWorkloadHours: totalWorkloadHours.toFixed(1),
      netAgentsNeeded: Math.ceil(netAgentsNeeded),
      grossAgentsRequired: Math.ceil(grossAgentsRequired),
      bufferStaff: Math.ceil(bufferStaff),
    };
  }, [forecastVolume, staffAhtSeconds, targetOccupancy, shrinkagePct]);

  // Copy WFM Report
  const handleCopyReport = () => {
    const report = `=====================================================
CALL CENTER PRODUCTIVITY & WORKFORCE (WFM) REPORT
Generated by: productivitycalculator.work/calculator/call-center
=====================================================

[1. AGENT OCCUPANCY & UTILIZATION]
- Scheduled Shift Length   : ${shiftHours} hours
- Available Queue Time     : ${availableMinutes} mins
- Handling Workload (AHT)  : ${handlingMinutes} mins
- Agent Occupancy Rate     : ${occupancyMetrics.occupancyRate.toFixed(1)}% (Talk+Hold+ACW / Available)
- Agent Utilization Rate   : ${occupancyMetrics.utilizationRate.toFixed(1)}% (Available / Shift)
- Idle Queue Waiting Time  : ${occupancyMetrics.idleMinutes} mins
- Calculated Average AHT   : ${occupancyMetrics.calculatedAhtSec.toFixed(0)} seconds (${(occupancyMetrics.calculatedAhtSec / 60).toFixed(1)} mins)
- Health Classification    : ${occupancyMetrics.statusText}

[2. CALLS PER HOUR & RESOLUTION VELOCITY]
- Total Calls Handled      : ${cphCalls} calls
- Handling Velocity (CPH)  : ${cphMetrics.cph} calls per hour
- First Contact Resolution : ${fcrRate}% (${cphMetrics.resolvedCalls} resolved calls)
- Active Interaction Time  : ${cphMetrics.productiveHours} hours
- Workload Pace Index      : ${cphMetrics.paceIndex}% vs baseline

[3. STAFFING CAPACITY & SHRINKAGE REQUIREMENT]
- Forecast Daily Call Vol  : ${forecastVolume.toLocaleString()} calls
- Average Handle Time      : ${staffAhtSeconds} seconds
- Total Workload Required  : ${staffingMetrics.totalWorkloadHours} hours
- Target Agent Occupancy   : ${targetOccupancy}%
- Workforce Shrinkage Rate : ${shrinkagePct}%
- Net On-Queue Agents (FTE): ${staffingMetrics.netAgentsNeeded} agents
- Gross Headcount Required : ${staffingMetrics.grossAgentsRequired} agents (+${staffingMetrics.bufferStaff} shrinkage buffer)
=====================================================`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-card/60 backdrop-blur-md rounded-2xl border border-border/60 shadow-xl overflow-hidden">
      {/* Top Header Banner */}
      <div className="p-6 md:p-8 border-b border-border/40 bg-gradient-to-r from-cyan-500/10 via-background to-blue-500/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-3">
              <Headphones className="w-3.5 h-3.5" />
              <span>Contact Center &amp; BPO Operations Suite</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-display">
              Call Center Productivity Calculator
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Measure agent occupancy, handling velocity (AHT), calls per hour (CPH), and shrinkage-adjusted staffing capacity.
            </p>
          </div>

          <button
            onClick={handleCopyReport}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>WFM Report Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Export WFM Scorecard</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Industry Presets */}
        <div className="mt-6 pt-5 border-t border-border/40">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2.5">
            Quick Contact Center Profiles:
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className="text-left p-2.5 rounded-lg bg-background/50 hover:bg-background/90 border border-border/40 hover:border-cyan-500/40 transition-all text-xs group"
              >
                <div className="font-semibold text-foreground group-hover:text-cyan-400 truncate">
                  {p.name}
                </div>
                <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                  {p.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-border/40 bg-muted/30 px-6 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("occupancy")}
          className={`py-3.5 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "occupancy"
              ? "border-cyan-500 text-cyan-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>1. Occupancy &amp; Utilization</span>
        </button>

        <button
          onClick={() => setActiveTab("cph")}
          className={`py-3.5 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "cph"
              ? "border-cyan-500 text-cyan-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>2. Calls Per Hour (CPH)</span>
        </button>

        <button
          onClick={() => setActiveTab("staffing")}
          className={`py-3.5 px-4 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "staffing"
              ? "border-cyan-500 text-cyan-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>3. Staffing &amp; Shrinkage</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-6 md:p-8">
        {/* ===================== TAB 1: OCCUPANCY ===================== */}
        {activeTab === "occupancy" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Inputs */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Shift &amp; Queue Workload Inputs</span>
                </h3>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Scheduled Shift Length (hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    step="0.5"
                    value={shiftHours}
                    onChange={(e) => setShiftHours(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Total paid workday ({shiftHours * 60} total shift minutes)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Logged-In Available Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="10"
                    value={availableMinutes}
                    onChange={(e) => setAvailableMinutes(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Total time agent is logged into ACD ready to accept calls (excluding lunch &amp; breaks)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Handling Workload: Talk + Hold + ACW (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="5"
                    value={handlingMinutes}
                    onChange={(e) => setHandlingMinutes(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Actual time spent on live calls, on-hold, and post-call wrap-up work
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Total Calls Handled
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={callsHandled}
                    onChange={(e) => setCallsHandled(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>
              </div>

              {/* Right Output Dashboard */}
              <div className="bg-background/60 rounded-xl p-5 border border-border/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    WFM Productivity KPIs
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Occupancy Rate</div>
                      <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                        {occupancyMetrics.occupancyRate.toFixed(1)}%
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Target: 75% – 85%
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Utilization Rate</div>
                      <div className="text-2xl font-bold font-mono text-foreground mt-1">
                        {occupancyMetrics.utilizationRate.toFixed(1)}%
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Of total paid shift
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Average Handle Time (AHT):</span>
                      <span className="font-mono font-semibold text-foreground">
                        {occupancyMetrics.calculatedAhtSec.toFixed(0)}s ({(occupancyMetrics.calculatedAhtSec / 60).toFixed(1)} min/call)
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Idle / Queue Waiting Time:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {occupancyMetrics.idleMinutes} mins ({(occupancyMetrics.idleMinutes / 60).toFixed(1)} hrs)
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Offline Break &amp; Shrinkage Time:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {shiftHours * 60 - availableMinutes} mins
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs font-medium flex items-center gap-2 ${occupancyMetrics.statusColor}`}>
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{occupancyMetrics.statusText}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: CPH & VELOCITY ===================== */}
        {activeTab === "cph" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left CPH Inputs */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-cyan-400" />
                  <span>Call Throughput &amp; Resolution Metrics</span>
                </h3>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Total Calls Handled in Shift
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="5"
                    value={cphCalls}
                    onChange={(e) => setCphCalls(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Shift Productive Hours (On Queue)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    step="0.5"
                    value={cphHours}
                    onChange={(e) => setCphHours(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    First Contact Resolution Rate (FCR %)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={fcrRate}
                    onChange={(e) => setFcrRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Industry benchmark: 70%–80% resolved on initial call without escalation
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Average Handling Time AHT (seconds)
                  </label>
                  <input
                    type="number"
                    min="30"
                    step="10"
                    value={ahtSeconds}
                    onChange={(e) => setAhtSeconds(parseInt(e.target.value) || 30)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Talk time + customer hold time + after-call wrap-up (ACW)
                  </span>
                </div>
              </div>

              {/* Right CPH Output */}
              <div className="bg-background/60 rounded-xl p-5 border border-border/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Call Throughput Summary
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Calls Per Hour</div>
                      <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                        {cphMetrics.cph} CPH
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Velocity rate
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Resolved Calls</div>
                      <div className="text-2xl font-bold font-mono text-foreground mt-1">
                        {cphMetrics.resolvedCalls}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        At {fcrRate}% FCR
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Live Interaction Duration:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {cphMetrics.productiveHours} hours
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Relative Velocity Index:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {cphMetrics.paceIndex}% vs 7.0 CPH baseline
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Unresolved / Escalated Calls:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {cphCalls - cphMetrics.resolvedCalls} calls
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/40 border border-border/40 text-xs">
                  <span className="text-muted-foreground">
                    Balancing high CPH with high FCR ensures throughput does not compromise resolution quality.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: STAFFING CAPACITY ===================== */}
        {activeTab === "staffing" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Staffing Inputs */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>WFM Capacity &amp; Shrinkage Model</span>
                </h3>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Forecast Call Volume (Calls / Day)
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="50"
                    value={forecastVolume}
                    onChange={(e) => setForecastVolume(parseInt(e.target.value) || 10)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Expected daily inbound or outbound queue volume
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Average Handle Time AHT (seconds)
                  </label>
                  <input
                    type="number"
                    min="30"
                    step="15"
                    value={staffAhtSeconds}
                    onChange={(e) => setStaffAhtSeconds(parseInt(e.target.value) || 30)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Target Occupancy Rate (%)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="95"
                    step="1"
                    value={targetOccupancy}
                    onChange={(e) => setTargetOccupancy(parseFloat(e.target.value) || 50)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Standard healthy target: 80%–85% to prevent agent churn
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Workforce Shrinkage Factor (%)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    step="1"
                    value={shrinkagePct}
                    onChange={(e) => setShrinkagePct(parseFloat(e.target.value) || 5)}
                    className="w-full px-3.5 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Internal (breaks, 1-on-1s, training) + External (PTO, sick leave). Industry average ~ 25%–30%
                  </span>
                </div>
              </div>

              {/* Right Staffing Output */}
              <div className="bg-background/60 rounded-xl p-5 border border-border/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Headcount Capacity Requirements
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Gross Headcount</div>
                      <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                        {staffingMetrics.grossAgentsRequired} FTE
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        With {shrinkagePct}% shrinkage
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="text-xs text-muted-foreground">Net On-Queue</div>
                      <div className="text-2xl font-bold font-mono text-foreground mt-1">
                        {staffingMetrics.netAgentsNeeded} FTE
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        At {targetOccupancy}% occupancy
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Total Workload Demand:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {staffingMetrics.totalWorkloadHours} contact hours
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Shrinkage Buffer Headcount:</span>
                      <span className="font-mono font-semibold text-foreground">
                        +{staffingMetrics.bufferStaff} staff for PTO/training
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/40">
                      <span>Effective Daily Agent Throughput:</span>
                      <span className="font-mono font-semibold text-foreground">
                        {(forecastVolume / staffingMetrics.grossAgentsRequired).toFixed(0)} calls / rostered agent
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs flex items-center gap-2">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>
                    Gross headcount protects SLA targets against real-world absenteeism and coaching off-phone time.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
