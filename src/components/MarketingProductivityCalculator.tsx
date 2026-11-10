/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 MarketingProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的市场营销人效、CAC/LTV 与管道流速计算引擎，承接 /calculator/marketing 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Target,
  Sliders,
  DollarSign,
  Copy,
  Check,
  Sparkles,
  Activity,
  Layers,
  Zap,
  Users,
  CheckCircle2,
} from "lucide-react";

type CalcMode = "roi_cac" | "pipeline_velocity" | "labor_efficiency";

export function MarketingProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("roi_cac");
  const [copied, setCopied] = useState(false);

  // Mode 1: Marketing ROI & CAC-to-LTV Ratio
  const [programSpend, setProgramSpend] = useState(45000);
  const [attributedRevenue, setAttributedRevenue] = useState(225000);
  const [customerLtv, setCustomerLtv] = useState(32000);
  const [newCustomers, setNewCustomers] = useState(14);

  // Mode 2: Lead Velocity & Funnel Throughput
  const [inboundMqls, setInboundMqls] = useState(380);
  const [sqlConversionPct, setSqlConversionPct] = useState(22.5);
  const [oppWinRatePct, setOppWinRatePct] = useState(24.0);
  const [avgContractValueAcv, setAvgContractValueAcv] = useState(34000);
  const [salesCycleDays, setSalesCycleDays] = useState(55);

  // Mode 3: Marketing Spend Efficiency & Output per Hour
  const [quarterlyPayroll, setQuarterlyPayroll] = useState(85000);
  const [marketingFtes, setMarketingFtes] = useState(4);
  const [weeksEvaluated, setWeeksEvaluated] = useState(12);
  const [hoursPerWeek] = useState(40);
  const [pipelineCreatedValue, setPipelineCreatedValue] = useState(780000);

  // Mode 1 Computations
  const mode1Stats = useMemo(() => {
    const spend = Math.max(100, programSpend);
    const revenue = Math.max(0, attributedRevenue);
    const ltv = Math.max(100, customerLtv);
    const customers = Math.max(1, newCustomers);

    const netProfit = revenue - spend;
    const mroiPct = (netProfit / spend) * 100;
    const blendedCac = spend / customers;
    const ltvCacRatio = blendedCac > 0 ? ltv / blendedCac : 0;
    const paybackMonths = ltv > 0 && blendedCac > 0 ? (blendedCac / (ltv / 36)) : 0;

    let capitalTier = "Healthy Scalable Growth (3.0x - 4.5x LTV:CAC)";
    let tierColor = "text-indigo-400";
    let badgeBg = "bg-indigo-500/10 border-indigo-500/30";

    if (ltvCacRatio >= 4.5) {
      capitalTier = "Exceptional Capital Efficiency (>4.5x LTV:CAC)";
      tierColor = "text-emerald-400";
      badgeBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (ltvCacRatio < 2.5) {
      capitalTier = "High CAC Squeeze (<2.5x Risk)";
      tierColor = "text-rose-400";
      badgeBg = "bg-rose-500/10 border-rose-500/30";
    }

    return {
      spend, revenue, ltv, customers, netProfit, mroiPct,
      blendedCac, ltvCacRatio, paybackMonths, capitalTier, tierColor, badgeBg,
    };
  }, [programSpend, attributedRevenue, customerLtv, newCustomers]);

  // Mode 2 Computations
  const mode2Stats = useMemo(() => {
    const mqls = Math.max(1, inboundMqls);
    const sqlRate = Math.max(0.1, sqlConversionPct);
    const winRate = Math.max(0.1, oppWinRatePct);
    const acv = Math.max(100, avgContractValueAcv);
    const cycle = Math.max(1, salesCycleDays);

    const sqlsGenerated = mqls * (sqlRate / 100);
    const expectedWonDeals = sqlsGenerated * (winRate / 100);
    const totalPipelineValue = sqlsGenerated * acv;
    const expectedWonRevenue = expectedWonDeals * acv;
    const dailyVelocity = (mqls * (sqlRate / 100) * (winRate / 100) * acv) / cycle;
    const monthlyVelocity = dailyVelocity * 30.416;
    const annualVelocity = dailyVelocity * 365;

    let velocityStatus = "Balanced Pipeline Velocity";
    let tierColor = "text-indigo-400";
    let badgeBg = "bg-indigo-500/10 border-indigo-500/30";

    if (dailyVelocity >= 5000) {
      velocityStatus = "High Velocity Pipeline (> $5k/day)";
      tierColor = "text-emerald-400";
      badgeBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (dailyVelocity < 1200) {
      velocityStatus = "Pipeline Drag (< $1.2k/day)";
      tierColor = "text-amber-400";
      badgeBg = "bg-amber-500/10 border-amber-500/30";
    }

    return {
      sqlsGenerated, expectedWonDeals, totalPipelineValue, expectedWonRevenue,
      dailyVelocity, monthlyVelocity, annualVelocity, velocityStatus, tierColor, badgeBg,
    };
  }, [inboundMqls, sqlConversionPct, oppWinRatePct, avgContractValueAcv, salesCycleDays]);

  // Mode 3 Computations
  const mode3Stats = useMemo(() => {
    const payroll = Math.max(1000, quarterlyPayroll);
    const ftes = Math.max(1, marketingFtes);
    const weeks = Math.max(1, weeksEvaluated);
    const pipeline = Math.max(0, pipelineCreatedValue);

    const totalHours = ftes * weeks * hoursPerWeek;
    const pipelinePerHour = totalHours > 0 ? pipeline / totalHours : 0;
    const laborMultiple = payroll > 0 ? pipeline / payroll : 0;
    const costPerHour = totalHours > 0 ? payroll / totalHours : 0;

    let yieldTier = "Strong Pipeline Generation (4x - 7x Multiple)";
    let tierColor = "text-indigo-400";
    let badgeBg = "bg-indigo-500/10 border-indigo-500/30";

    if (laborMultiple >= 7.0) {
      yieldTier = "Exceptional Marketing Yield (>7x Multiple)";
      tierColor = "text-cyan-400";
      badgeBg = "bg-cyan-500/10 border-cyan-500/30";
    } else if (laborMultiple < 3.0) {
      yieldTier = "Elevated Marketing Payroll Drag (<3x)";
      tierColor = "text-rose-400";
      badgeBg = "bg-rose-500/10 border-rose-500/30";
    }

    return {
      totalHours, pipelinePerHour, laborMultiple, costPerHour,
      yieldTier, tierColor, badgeBg,
    };
  }, [quarterlyPayroll, marketingFtes, weeksEvaluated, hoursPerWeek, pipelineCreatedValue]);

  // Presets
  const applyPreset = (preset: "b2b_saas" | "b2c_ecommerce" | "plg_freemium" | "agency_demandgen") => {
    if (preset === "b2b_saas") {
      setProgramSpend(48000); setAttributedRevenue(260000); setCustomerLtv(42000); setNewCustomers(16);
      setInboundMqls(420); setSqlConversionPct(24.0); setOppWinRatePct(25.0); setAvgContractValueAcv(45000); setSalesCycleDays(60);
      setQuarterlyPayroll(95000); setMarketingFtes(5); setWeeksEvaluated(12); setPipelineCreatedValue(950000);
    } else if (preset === "b2c_ecommerce") {
      setProgramSpend(65000); setAttributedRevenue(310000); setCustomerLtv(480); setNewCustomers(820);
      setInboundMqls(3800); setSqlConversionPct(16.0); setOppWinRatePct(36.0); setAvgContractValueAcv(140); setSalesCycleDays(6);
      setQuarterlyPayroll(42000); setMarketingFtes(3); setWeeksEvaluated(12); setPipelineCreatedValue(320000);
    } else if (preset === "plg_freemium") {
      setProgramSpend(28000); setAttributedRevenue(175000); setCustomerLtv(5200); setNewCustomers(60);
      setInboundMqls(1900); setSqlConversionPct(14.0); setOppWinRatePct(30.0); setAvgContractValueAcv(2800); setSalesCycleDays(24);
      setQuarterlyPayroll(65000); setMarketingFtes(4); setWeeksEvaluated(12); setPipelineCreatedValue(580000);
    } else {
      setProgramSpend(55000); setAttributedRevenue(340000); setCustomerLtv(75000); setNewCustomers(14);
      setInboundMqls(460); setSqlConversionPct(26.0); setOppWinRatePct(28.0); setAvgContractValueAcv(36000); setSalesCycleDays(48);
      setQuarterlyPayroll(85000); setMarketingFtes(4); setWeeksEvaluated(12); setPipelineCreatedValue(1100000);
    }
  };

  const copyReport = () => {
    let report = "";
    if (mode === "roi_cac") {
      report = `### Marketing ROI & CAC-to-LTV Audit
- Program Marketing Spend: $${programSpend.toLocaleString()}
- Attributed Gross Revenue: $${attributedRevenue.toLocaleString()}
- Net Marketing Profit: $${Math.round(mode1Stats.netProfit).toLocaleString()}
- Marketing ROI (MROI): ${mode1Stats.mroiPct.toFixed(1)}%
- New Customers Acquired: ${newCustomers} Accounts
- Blended CAC: $${Math.round(mode1Stats.blendedCac).toLocaleString()}
- Customer Lifetime Value (LTV): $${customerLtv.toLocaleString()}
- LTV:CAC Ratio: ${mode1Stats.ltvCacRatio.toFixed(2)}x
- Estimated CAC Payback: ${mode1Stats.paybackMonths.toFixed(1)} Months
- Capital Efficiency: ${mode1Stats.capitalTier}`;
    } else if (mode === "pipeline_velocity") {
      report = `### Marketing Pipeline Velocity Audit
- Inbound MQL Volume: ${inboundMqls} Leads
- SQL Conversion Rate: ${sqlConversionPct.toFixed(1)}% (${Math.round(mode2Stats.sqlsGenerated)} SQLs)
- Opportunity Win Rate: ${oppWinRatePct.toFixed(1)}% (${mode2Stats.expectedWonDeals.toFixed(1)} Won Deals)
- Average Deal Size (ACV): $${avgContractValueAcv.toLocaleString()}
- Sales Cycle: ${salesCycleDays} Days
- Pipeline Created: $${Math.round(mode2Stats.totalPipelineValue).toLocaleString()}
- Expected Won Revenue: $${Math.round(mode2Stats.expectedWonRevenue).toLocaleString()}
- Daily Pipeline Velocity: $${Math.round(mode2Stats.dailyVelocity).toLocaleString()}/day
- Annualized Pipeline Run-Rate: $${Math.round(mode2Stats.annualVelocity).toLocaleString()}/yr
- Velocity Assessment: ${mode2Stats.velocityStatus}`;
    } else {
      report = `### Marketing Spend Efficiency & Labor Yield Audit
- Quarterly Marketing Payroll: $${quarterlyPayroll.toLocaleString()}
- Team Size: ${marketingFtes} FTEs (${mode3Stats.totalHours} Total Hours)
- Pipeline Value Created: $${pipelineCreatedValue.toLocaleString()}
- Created Pipeline per Labor Hour: $${Math.round(mode3Stats.pipelinePerHour).toLocaleString()}/hr
- Marketing Labor Multiple: ${mode3Stats.laborMultiple.toFixed(2)}x Payroll
- Loaded Cost per Labor Hour: $${mode3Stats.costPerHour.toFixed(2)}/hr
- Output Yield Status: ${mode3Stats.yieldTier}`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-neon rounded-2xl p-6 md:p-8 mb-12 border border-blue-500/20 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-blue-950/30">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            Demand Generation &amp; RevOps Engine
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Marketing Productivity Calculator
          </h2>
        </div>

        <button
          onClick={copyReport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-sm font-medium border border-slate-700/60 transition-all shadow-sm"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
          {copied ? "Audit Copied!" : "Export Markdown Audit"}
        </button>
      </div>

      {/* Preset Pills */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Industry Growth Profiles
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => applyPreset("b2b_saas")}
            className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-blue-950/30 border border-slate-800 hover:border-blue-500/40 text-left text-xs transition-all group"
          >
            <div className="font-semibold text-slate-200 group-hover:text-blue-300">B2B SaaS Inbound</div>
            <div className="text-slate-400 text-[10px]">$48k Spend · $42k LTV</div>
          </button>
          <button
            onClick={() => applyPreset("b2c_ecommerce")}
            className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-blue-950/30 border border-slate-800 hover:border-blue-500/40 text-left text-xs transition-all group"
          >
            <div className="font-semibold text-slate-200 group-hover:text-blue-300">B2C E-Commerce</div>
            <div className="text-slate-400 text-[10px]">3.8k MQLs · 7-Day Cycle</div>
          </button>
          <button
            onClick={() => applyPreset("plg_freemium")}
            className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-blue-950/30 border border-slate-800 hover:border-blue-500/40 text-left text-xs transition-all group"
          >
            <div className="font-semibold text-slate-200 group-hover:text-blue-300">Product-Led Growth</div>
            <div className="text-slate-400 text-[10px]">1.9k Signups · 14% PQL</div>
          </button>
          <button
            onClick={() => applyPreset("agency_demandgen")}
            className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-blue-950/30 border border-slate-800 hover:border-blue-500/40 text-left text-xs transition-all group"
          >
            <div className="font-semibold text-slate-200 group-hover:text-blue-300">Enterprise Agency</div>
            <div className="text-slate-400 text-[10px]">$75k LTV · $1.1M Pipe</div>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex border-b border-slate-800 mb-8 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setMode("roi_cac")}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-all ${
            mode === "roi_cac"
              ? "border-blue-400 text-blue-400 bg-blue-500/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Marketing ROI &amp; CAC:LTV
        </button>
        <button
          onClick={() => setMode("pipeline_velocity")}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-all ${
            mode === "pipeline_velocity"
              ? "border-blue-400 text-blue-400 bg-blue-500/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Pipeline Velocity (V)
        </button>
        <button
          onClick={() => setMode("labor_efficiency")}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-all ${
            mode === "labor_efficiency"
              ? "border-blue-400 text-blue-400 bg-blue-500/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          Labor Yield &amp; Efficiency
        </button>
      </div>

      {/* Mode 1: Marketing ROI & CAC:LTV */}
      {mode === "roi_cac" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Total Program Marketing Spend ($)</label>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  ${programSpend.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="250000"
                step="2500"
                value={programSpend}
                onChange={(e) => setProgramSpend(Number(e.target.value))}
                className="w-full accent-blue-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Attributed Closed Revenue ($)</label>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  ${attributedRevenue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={attributedRevenue}
                onChange={(e) => setAttributedRevenue(Number(e.target.value))}
                className="w-full accent-blue-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Customer LTV ($)</label>
                <input
                  type="number"
                  min="50"
                  max="500000"
                  step="500"
                  value={customerLtv}
                  onChange={(e) => setCustomerLtv(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">New Customers Won (#)</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  step="1"
                  value={newCustomers}
                  onChange={(e) => setNewCustomers(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-slate-900/60 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className={`p-3 rounded-lg border text-xs font-medium ${mode1Stats.badgeBg} ${mode1Stats.tierColor}`}>
                <span className="font-bold">Capital Efficiency:</span> {mode1Stats.capitalTier}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-400" />
                    LTV : CAC Ratio
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-blue-300">
                    {mode1Stats.ltvCacRatio.toFixed(2)}x
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Target: 3.0x – 5.0x
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    Marketing ROI (MROI)
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">
                    {mode1Stats.mroiPct.toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Net: +${Math.round(mode1Stats.netProfit).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Blended Customer Acquisition Cost (CAC):</span>
                  <span className="font-mono text-slate-200 font-semibold">${Math.round(mode1Stats.blendedCac).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Estimated CAC Payback:</span>
                  <span className="font-mono text-slate-200 font-semibold">{mode1Stats.paybackMonths.toFixed(1)} Months</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Gross Attributed Multiplier:</span>
                  <span className="font-mono text-blue-400 font-semibold">{(attributedRevenue / programSpend).toFixed(2)}x ROAS</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 mt-4">
              Formula: MROI = (Attributed Margin - Marketing Spend) ÷ Marketing Spend × 100%. LTV:CAC = Customer LTV ÷ Blended CAC.
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Pipeline Velocity */}
      {mode === "pipeline_velocity" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Inbound MQL Volume (#)</label>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {inboundMqls} MQLs
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="25"
                value={inboundMqls}
                onChange={(e) => setInboundMqls(Number(e.target.value))}
                className="w-full accent-blue-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">MQL to SQL Conv %</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="0.5"
                  value={sqlConversionPct}
                  onChange={(e) => setSqlConversionPct(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Opp Win Rate %</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="0.5"
                  value={oppWinRatePct}
                  onChange={(e) => setOppWinRatePct(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Average Contract ACV ($)</label>
                <input
                  type="number"
                  min="100"
                  max="200000"
                  step="500"
                  value={avgContractValueAcv}
                  onChange={(e) => setAvgContractValueAcv(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Sales Cycle (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  step="1"
                  value={salesCycleDays}
                  onChange={(e) => setSalesCycleDays(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-slate-900/60 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className={`p-3 rounded-lg border text-xs font-medium ${mode2Stats.badgeBg} ${mode2Stats.tierColor}`}>
                <span className="font-bold">Throughput:</span> {mode2Stats.velocityStatus}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                    Daily Velocity (V)
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-blue-300">
                    ${Math.round(mode2Stats.dailyVelocity).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Revenue Velocity / Day
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    SQL Pipeline Volume
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">
                    {Math.round(mode2Stats.sqlsGenerated)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Opportunities Generated
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Monthly Pipeline Velocity:</span>
                  <span className="font-mono text-slate-200 font-semibold">${Math.round(mode2Stats.monthlyVelocity).toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Annualized Pipeline Run-Rate:</span>
                  <span className="font-mono text-blue-400 font-semibold">${Math.round(mode2Stats.annualVelocity).toLocaleString()}/yr</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Expected Closed Deals per Cycle:</span>
                  <span className="font-mono text-slate-200 font-semibold">{mode2Stats.expectedWonDeals.toFixed(1)} Deals (${Math.round(mode2Stats.expectedWonRevenue).toLocaleString()})</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 mt-4">
              Velocity Equation: V = (MQLs × SQL Conv % × Opportunity Win % × ACV) ÷ Sales Cycle Length in Days.
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Labor Efficiency */}
      {mode === "labor_efficiency" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Quarterly Marketing Payroll ($)</label>
                <input
                  type="number"
                  min="5000"
                  max="500000"
                  step="2500"
                  value={quarterlyPayroll}
                  onChange={(e) => setQuarterlyPayroll(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Marketing Headcount (FTEs)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  step="1"
                  value={marketingFtes}
                  onChange={(e) => setMarketingFtes(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Pipeline Value Created ($)</label>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  ${pipelineCreatedValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="3000000"
                step="25000"
                value={pipelineCreatedValue}
                onChange={(e) => setPipelineCreatedValue(Number(e.target.value))}
                className="w-full accent-blue-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-200">Weeks in Period Evaluated</label>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {weeksEvaluated} weeks
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="52"
                step="1"
                value={weeksEvaluated}
                onChange={(e) => setWeeksEvaluated(Number(e.target.value))}
                className="w-full accent-blue-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-slate-900/60 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className={`p-3 rounded-lg border text-xs font-medium ${mode3Stats.badgeBg} ${mode3Stats.tierColor}`}>
                <span className="font-bold">Labor Yield:</span> {mode3Stats.yieldTier}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-blue-400" />
                    Pipeline / Labor Hour
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-blue-300">
                    ${Math.round(mode3Stats.pipelinePerHour).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Value created / staff hour
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Payroll Multiplier
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">
                    {mode3Stats.laborMultiple.toFixed(2)}x
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Pipeline ÷ Total Payroll
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Total Team Hours Worked:</span>
                  <span className="font-mono text-slate-200 font-semibold">{mode3Stats.totalHours.toLocaleString()} Hours</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Loaded Marketing Cost per Hour:</span>
                  <span className="font-mono text-slate-200 font-semibold">${mode3Stats.costPerHour.toFixed(2)}/hr</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Payroll-to-Pipeline Drag:</span>
                  <span className="font-mono text-blue-400 font-semibold">{((quarterlyPayroll / (pipelineCreatedValue || 1)) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 mt-4">
              Marketing Yield Formula: Pipeline Created ($) ÷ (FTEs × Hours Worked). Multiple = Pipeline ÷ Fully-Loaded Marketing Payroll.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketingProductivityCalculator;
