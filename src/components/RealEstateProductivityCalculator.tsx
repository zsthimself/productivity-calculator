/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 RealEstateProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的房地产经纪人效、GCI 佣金分账、带看成交率与时薪回报计算引擎，承接 /calculator/real-estate 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Home,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  Sparkles,
  Users,
  Clock,
  Key,
  ShieldCheck,
  Target,
} from "lucide-react";

type CalcMode = "commission_split" | "lead_conversion" | "hourly_roi";

interface RealtorPreset {
  name: string;
  niche: string;
  salesVolume: number;
  commissionRatePct: number;
  agentSplitPct: number;
  annualDeskFees: number;
  closedDeals: number;
  inboundLeads: number;
  showingsConducted: number;
  weeklyHours: number;
  marketingSpend: number;
}

const PRESETS: Record<string, RealtorPreset> = {
  top_producer: {
    name: "Luxury Top Producer",
    niche: "High-End Residential & Coastal Listings",
    salesVolume: 16500000,
    commissionRatePct: 2.8,
    agentSplitPct: 85,
    annualDeskFees: 6000,
    closedDeals: 26,
    inboundLeads: 210,
    showingsConducted: 140,
    weeklyHours: 48,
    marketingSpend: 32000,
  },
  mid_career: {
    name: "Suburban Full-Time Realtor",
    niche: "Single-Family Move-Up & Relocation",
    salesVolume: 6200000,
    commissionRatePct: 2.7,
    agentSplitPct: 75,
    annualDeskFees: 4200,
    closedDeals: 15,
    inboundLeads: 180,
    showingsConducted: 165,
    weeklyHours: 42,
    marketingSpend: 12500,
  },
  team_leader: {
    name: "Mega Team Leader",
    niche: "Multi-Agent Regional Group",
    salesVolume: 42000000,
    commissionRatePct: 2.65,
    agentSplitPct: 55,
    annualDeskFees: 18000,
    closedDeals: 92,
    inboundLeads: 1450,
    showingsConducted: 850,
    weeklyHours: 55,
    marketingSpend: 88000,
  },
  rookie_agent: {
    name: "First-Year Associate",
    niche: "First-Time Homebuyers & Condos",
    salesVolume: 2100000,
    commissionRatePct: 2.75,
    agentSplitPct: 60,
    annualDeskFees: 3600,
    closedDeals: 5,
    inboundLeads: 95,
    showingsConducted: 75,
    weeklyHours: 35,
    marketingSpend: 4500,
  },
};

export function RealEstateProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("commission_split");
  const [copied, setCopied] = useState(false);

  // Common parameters
  const [salesVolume, setSalesVolume] = useState(6200000);
  const [commissionRatePct, setCommissionRatePct] = useState(2.7);
  const [agentSplitPct, setAgentSplitPct] = useState(75);
  const [annualDeskFees, setAnnualDeskFees] = useState(4200);
  const [closedDeals, setClosedDeals] = useState(15);

  // Mode 2: Funnel & Conversion
  const [inboundLeads, setInboundLeads] = useState(180);
  const [showingsConducted, setShowingsConducted] = useState(165);

  // Mode 3: Hourly & ROI
  const [weeklyHours, setWeeklyHours] = useState(42);
  const [marketingSpend, setMarketingSpend] = useState(12500);

  // Computations: Mode 1 Commission
  const commissionStats = useMemo(() => {
    const grossCommission = salesVolume * (commissionRatePct / 100);
    const grossAgentShare = grossCommission * (agentSplitPct / 100);
    const netAgentIncome = Math.max(0, grossAgentShare - annualDeskFees - marketingSpend);
    const brokerageShare = grossCommission - grossAgentShare;
    const avgCommissionPerDeal = closedDeals > 0 ? grossCommission / closedDeals : 0;
    const avgNetPerDeal = closedDeals > 0 ? netAgentIncome / closedDeals : 0;

    return {
      grossCommission,
      grossAgentShare,
      netAgentIncome,
      brokerageShare,
      avgCommissionPerDeal,
      avgNetPerDeal,
    };
  }, [salesVolume, commissionRatePct, agentSplitPct, annualDeskFees, marketingSpend, closedDeals]);

  // Computations: Mode 2 Funnel
  const funnelStats = useMemo(() => {
    const leadConversionPct = inboundLeads > 0 ? (closedDeals / inboundLeads) * 100 : 0;
    const showingsPerDeal = closedDeals > 0 ? showingsConducted / closedDeals : 0;
    const showingConversionPct = showingsConducted > 0 ? (closedDeals / showingsConducted) * 100 : 0;
    const gciPerLead = inboundLeads > 0 ? commissionStats.grossCommission / inboundLeads : 0;

    return {
      leadConversionPct,
      showingsPerDeal,
      showingConversionPct,
      gciPerLead,
    };
  }, [inboundLeads, closedDeals, showingsConducted, commissionStats.grossCommission]);

  // Computations: Mode 3 Hourly & ROI
  const hourlyStats = useMemo(() => {
    const annualHours = Math.max(1, weeklyHours * 50); // 50 working weeks
    const effectiveHourlyRate = commissionStats.netAgentIncome / annualHours;
    const grossHourlyRate = commissionStats.grossCommission / annualHours;
    const marketingRoiMultiple = marketingSpend > 0 ? commissionStats.grossCommission / marketingSpend : 0;
    const netProfitMultiple = marketingSpend > 0 ? commissionStats.netAgentIncome / marketingSpend : 0;

    return {
      annualHours,
      effectiveHourlyRate,
      grossHourlyRate,
      marketingRoiMultiple,
      netProfitMultiple,
    };
  }, [weeklyHours, commissionStats.netAgentIncome, commissionStats.grossCommission, marketingSpend]);

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setSalesVolume(p.salesVolume);
    setCommissionRatePct(p.commissionRatePct);
    setAgentSplitPct(p.agentSplitPct);
    setAnnualDeskFees(p.annualDeskFees);
    setClosedDeals(p.closedDeals);
    setInboundLeads(p.inboundLeads);
    setShowingsConducted(p.showingsConducted);
    setWeeklyHours(p.weeklyHours);
    setMarketingSpend(p.marketingSpend);
  };

  const copyReport = () => {
    const text = `### Real Estate Agent Productivity & Commission Audit Report
**Annual Closed Volume:** $${salesVolume.toLocaleString()} (${closedDeals} closed deals)
**Gross Commission Income (GCI):** $${commissionStats.grossCommission.toLocaleString()} @ ${commissionRatePct}%
**Brokerage Split:** ${agentSplitPct}% Agent / ${100 - agentSplitPct}% Broker

#### 1. Commission & Take-Home Economics
- **Agent Net Take-Home:** $${commissionStats.netAgentIncome.toLocaleString()}
- **Brokerage Total Share:** $${commissionStats.brokerageShare.toLocaleString()}
- **Annual Desk & Tech Fees:** $${annualDeskFees.toLocaleString()}
- **Net Income Per Closed Deal:** $${commissionStats.avgNetPerDeal.toFixed(0)}

#### 2. Lead Funnel & Showing Conversion
- **Lead-to-Close Rate:** ${funnelStats.leadConversionPct.toFixed(1)}% (${closedDeals} closed of ${inboundLeads} leads)
- **Showings Per Closed Deal:** ${funnelStats.showingsPerDeal.toFixed(1)} showings
- **Showing-to-Contract Conversion:** ${funnelStats.showingConversionPct.toFixed(1)}%
- **GCI Generated Per Inbound Lead:** $${funnelStats.gciPerLead.toFixed(0)}

#### 3. Hourly Earnings & Marketing ROI
- **Effective Net Hourly Wage:** $${hourlyStats.effectiveHourlyRate.toFixed(2)} / hour (${hourlyStats.annualHours} annual hours)
- **Marketing Ad Spend:** $${marketingSpend.toLocaleString()}
- **Marketing GCI Multiple:** ${hourlyStats.marketingRoiMultiple.toFixed(1)}x return
*Generated via productivitycalculator.work/calculator/real-estate*`;

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
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Building2 className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground tracking-tight">
                Real Estate Productivity &amp; Commission Calculator
              </h2>
              <p className="text-xs text-muted-foreground">
                NAR production benchmarks, commission split modeling &amp; showing conversion analyzer
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
          onClick={() => setMode("commission_split")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "commission_split"
              ? "bg-amber-500/15 border-amber-500/60 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>1. GCI &amp; Brokerage Split</span>
        </button>

        <button
          onClick={() => setMode("lead_conversion")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "lead_conversion"
              ? "bg-sky-500/15 border-sky-500/60 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <Home className="w-4 h-4" />
          <span>2. Funnel &amp; Showing Rate</span>
        </button>

        <button
          onClick={() => setMode("hourly_roi")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "hourly_roi"
              ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>3. Hourly Wage &amp; Ad ROI</span>
        </button>
      </div>

      {/* Form Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-muted/20 border border-border/50">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Annual Closed Sales Volume ($)</span>
            <span className="font-mono text-amber-400 font-bold">${salesVolume.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="500000"
            max="60000000"
            step="100000"
            value={salesVolume}
            onChange={(e) => setSalesVolume(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <input
            type="number"
            value={salesVolume}
            onChange={(e) => setSalesVolume(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Annual Closed Escrow Deals</span>
            <span className="font-mono text-amber-400 font-bold">{closedDeals} deals</span>
          </div>
          <input
            type="range"
            min="1"
            max="120"
            step="1"
            value={closedDeals}
            onChange={(e) => setClosedDeals(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <input
            type="number"
            value={closedDeals}
            onChange={(e) => setClosedDeals(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-amber-500"
          />
        </div>

        {mode === "commission_split" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Average Commission Rate (%)</span>
                <span className="font-mono text-amber-400 font-bold">{commissionRatePct}%</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="4.0"
                step="0.05"
                value={commissionRatePct}
                onChange={(e) => setCommissionRatePct(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Agent Commission Split Ratio (%)</span>
                <span className="font-mono text-amber-400 font-bold">{agentSplitPct}% agent</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="1"
                value={agentSplitPct}
                onChange={(e) => setAgentSplitPct(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Annual Brokerage Desk, Tech &amp; Insurance Fees ($)</span>
                <span className="font-mono text-amber-400 font-bold">${annualDeskFees.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30000"
                step="250"
                value={annualDeskFees}
                onChange={(e) => setAnnualDeskFees(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </>
        )}

        {mode === "lead_conversion" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Annual Inbound Leads Generated</span>
                <span className="font-mono text-sky-400 font-bold">{inboundLeads} leads</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={inboundLeads}
                onChange={(e) => setInboundLeads(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <input
                type="number"
                value={inboundLeads}
                onChange={(e) => setInboundLeads(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">In-Person Property Showings Conducted</span>
                <span className="font-mono text-sky-400 font-bold">{showingsConducted} tours</span>
              </div>
              <input
                type="range"
                min="10"
                max="1200"
                step="5"
                value={showingsConducted}
                onChange={(e) => setShowingsConducted(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <input
                type="number"
                value={showingsConducted}
                onChange={(e) => setShowingsConducted(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-sky-500"
              />
            </div>
          </>
        )}

        {mode === "hourly_roi" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Active Weekly Working Hours</span>
                <span className="font-mono text-emerald-400 font-bold">{weeklyHours} hrs/week</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                step="1"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Annual Lead Gen &amp; Ad Marketing Spend ($)</span>
                <span className="font-mono text-emerald-400 font-bold">${marketingSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="120000"
                step="500"
                value={marketingSpend}
                onChange={(e) => setMarketingSpend(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={marketingSpend}
                onChange={(e) => setMarketingSpend(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>
          </>
        )}
      </div>

      {/* KPI Display Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Gross GCI
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-amber-400">
            ${(commissionStats.grossCommission / 1000).toFixed(0)}k
          </div>
          <div className="text-[11px] text-muted-foreground">Total Commission</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Net Agent Take-Home
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">
            ${(commissionStats.netAgentIncome / 1000).toFixed(0)}k
          </div>
          <div className="text-[11px] text-muted-foreground">After Split &amp; Desk Fees</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Showing Conversion
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-sky-400">
            {funnelStats.showingConversionPct.toFixed(1)}%
          </div>
          <div className="text-[11px] text-muted-foreground">{funnelStats.showingsPerDeal.toFixed(1)} tours/deal</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Net Hourly Wage
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-purple-400">
            ${hourlyStats.effectiveHourlyRate.toFixed(1)}
          </div>
          <div className="text-[11px] text-muted-foreground">per active work hour</div>
        </div>
      </div>

      {/* Secondary Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-card border border-border/50 text-xs">
        <div>
          <span className="text-muted-foreground block">Brokerage Split Share</span>
          <span className="font-mono font-semibold text-foreground">
            ${(commissionStats.brokerageShare / 1000).toFixed(1)}k ({100 - agentSplitPct}%)
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Lead-to-Close Rate</span>
          <span className="font-mono font-semibold text-foreground">
            {funnelStats.leadConversionPct.toFixed(1)}% of leads
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">GCI Yield / Lead</span>
          <span className="font-mono font-semibold text-foreground">
            ${funnelStats.gciPerLead.toFixed(0)} / inbound lead
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Marketing ROI Multiplier</span>
          <span className="font-mono font-semibold text-foreground">
            {hourlyStats.marketingRoiMultiple.toFixed(1)}x GCI return
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Real estate metrics aligned with NAR Member Profiles &amp; RealTrends standards</span>
        </div>

        <button
          onClick={copyReport}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Report Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Realtor Audit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default RealEstateProductivityCalculator;
