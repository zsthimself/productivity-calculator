/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 GeneralProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的全行业通用生产力基准、全要素生产率 TFP 与复合多维投入产出计算引擎，承接 /calculator/general 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Gauge,
  Clock,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  Sparkles,
  Briefcase,
  ShieldCheck,
  Zap,
  Layers,
  BarChart3,
  Scale,
} from "lucide-react";

type CalcMode = "single_factor_labor" | "total_factor_cobb_douglas" | "multifactor_cost_yield";

interface EnterprisePreset {
  name: string;
  sector: string;
  outputUnits: number;
  laborHours: number;
  revenue: number;
  laborCost: number;
  capitalStock: number;
  materialsCost: number;
  laborElasticity: number;
}

const PRESETS: Record<string, EnterprisePreset> = {
  b2b_saas_enterprise: {
    name: "Growth B2B Cloud Software Enterprise",
    sector: "Technology & Software",
    outputUnits: 12500,
    laborHours: 4200,
    revenue: 1250000,
    laborCost: 380000,
    capitalStock: 650000,
    materialsCost: 140000,
    laborElasticity: 0.75,
  },
  advanced_manufacturing: {
    name: "Precision Advanced Manufacturing",
    sector: "Industrial Automation",
    outputUnits: 48000,
    laborHours: 6400,
    revenue: 1850000,
    laborCost: 420000,
    capitalStock: 1450000,
    materialsCost: 680000,
    laborElasticity: 0.60,
  },
  professional_consulting: {
    name: "Strategy & Management Consulting",
    sector: "Professional Services",
    outputUnits: 850,
    laborHours: 3200,
    revenue: 890000,
    laborCost: 350000,
    capitalStock: 120000,
    materialsCost: 65000,
    laborElasticity: 0.85,
  },
  ecommerce_fulfillment: {
    name: "Omnichannel Logistics Fulfillment",
    sector: "Commerce & Supply Chain",
    outputUnits: 95000,
    laborHours: 7800,
    revenue: 1450000,
    laborCost: 310000,
    capitalStock: 580000,
    materialsCost: 450000,
    laborElasticity: 0.65,
  },
};

export default function GeneralProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("single_factor_labor");
  const [selectedPreset, setSelectedPreset] = useState<string>("b2b_saas_enterprise");

  // Mode 1: Single-Factor Labor Productivity
  const [outputUnits, setOutputUnits] = useState<number>(12500);
  const [laborHours, setLaborHours] = useState<number>(4200);
  const [revenue, setRevenue] = useState<number>(1250000);
  const [laborCost, setLaborCost] = useState<number>(380000);

  // Mode 2: Total Factor Productivity (Cobb-Douglas)
  const [capitalStock, setCapitalStock] = useState<number>(650000);
  const [laborElasticity, setLaborElasticity] = useState<number>(0.75);

  // Mode 3: Multifactor Operating Cost Yield
  const [materialsCost, setMaterialsCost] = useState<number>(140000);
  const [targetMarginPct, setTargetMarginPct] = useState<number>(25);

  const [copied, setCopied] = useState<boolean>(false);

  const applyPreset = (presetKey: string) => {
    const p = PRESETS[presetKey];
    if (!p) return;
    setSelectedPreset(presetKey);
    setOutputUnits(p.outputUnits);
    setLaborHours(p.laborHours);
    setRevenue(p.revenue);
    setLaborCost(p.laborCost);
    setCapitalStock(p.capitalStock);
    setMaterialsCost(p.materialsCost);
    setLaborElasticity(p.laborElasticity);
  };

  // Calculations
  const metrics = useMemo(() => {
    // Mode 1: Labor Productivity
    const unitsPerHour = Number((outputUnits / Math.max(1, laborHours)).toFixed(2));
    const revenuePerHour = Number((revenue / Math.max(1, laborHours)).toFixed(2));
    const laborCostRatioPct = Number(((laborCost / Math.max(1, revenue)) * 100).toFixed(1));
    const revenuePerLaborDollar = Number((revenue / Math.max(1, laborCost)).toFixed(2));

    // Mode 2: Cobb-Douglas TFP
    const alpha = laborElasticity;
    const beta = Number((1 - alpha).toFixed(2));
    const normalizedLabor = Math.max(1, laborHours / 100);
    const normalizedCapital = Math.max(1, capitalStock / 10000);
    const compositeFactorInput = Math.pow(normalizedLabor, alpha) * Math.pow(normalizedCapital, beta);
    const tfpIndex = Number(((revenue / 1000) / Math.max(0.1, compositeFactorInput)).toFixed(2));
    const baselineTfpIndex = 25.0;
    const tfpGainPct = Number((((tfpIndex - baselineTfpIndex) / baselineTfpIndex) * 100).toFixed(1));

    // Mode 3: Multifactor Cost Yield
    const totalOperatingCost = laborCost + materialsCost + Math.round(capitalStock * 0.15); // 15% annual capital depreciation/carrying
    const operatingProfit = revenue - totalOperatingCost;
    const mfpRatio = Number((revenue / Math.max(1, totalOperatingCost)).toFixed(2));
    const realizedMarginPct = Number(((operatingProfit / Math.max(1, revenue)) * 100).toFixed(1));
    const marginSpread = Number((realizedMarginPct - targetMarginPct).toFixed(1));
    const costPerDollarValue = Number((totalOperatingCost / Math.max(1, revenue)).toFixed(2));

    return {
      unitsPerHour,
      revenuePerHour,
      laborCostRatioPct,
      revenuePerLaborDollar,
      alpha,
      beta,
      tfpIndex,
      tfpGainPct,
      totalOperatingCost,
      operatingProfit,
      mfpRatio,
      realizedMarginPct,
      marginSpread,
      costPerDollarValue,
    };
  }, [
    outputUnits,
    laborHours,
    revenue,
    laborCost,
    capitalStock,
    laborElasticity,
    materialsCost,
    targetMarginPct,
  ]);

  const handleCopyReport = () => {
    const reportText = `### Universal Enterprise Productivity Audit Report
Generated by ProductivityCalculator.work (BLS & OECD Measurement Standards)

#### Preset: ${PRESETS[selectedPreset]?.name || "Custom Enterprise Model"}
- Industry Sector: ${PRESETS[selectedPreset]?.sector || "Enterprise Operations"}
- Active Mode: ${mode.toUpperCase()}

#### 1. Labor & Single-Factor Productivity
- Total Output: ${outputUnits.toLocaleString()} units | Total Labor: ${laborHours.toLocaleString()} hours
- Units per Labor Hour: ${metrics.unitsPerHour} units/hr
- Revenue Velocity: $${metrics.revenuePerHour}/labor hour
- Labor Cost Ratio: ${metrics.laborCostRatioPct}% of revenue ($${metrics.revenuePerLaborDollar} rev / $1 payroll)

#### 2. Total Factor Productivity (Cobb-Douglas TFP)
- Capital Asset Stock: $${capitalStock.toLocaleString()}
- Output Elasticity: Labor (α = ${metrics.alpha}), Capital (β = ${metrics.beta})
- Calculated TFP Solow Residual Index: ${metrics.tfpIndex}
- Relative Efficiency vs Baseline: ${metrics.tfpGainPct >= 0 ? "+" : ""}${metrics.tfpGainPct}%

#### 3. Multifactor Operating Yield & Return
- Total Gross Revenue: $${revenue.toLocaleString()}
- Total Operating Costs (Labor + Capital + Materials): $${metrics.totalOperatingCost.toLocaleString()}
- Multifactor Productivity (MFP) Ratio: ${metrics.mfpRatio}x (Target > 1.25x)
- Realized Operating Profit: $${metrics.operatingProfit.toLocaleString()} (${metrics.realizedMarginPct}% margin)
- Variance to Target Margin (${targetMarginPct}%): ${metrics.marginSpread >= 0 ? "+" : ""}${metrics.marginSpread}%
`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl p-6 md:p-8 space-y-8 font-body">
      {/* Header & Preset Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Gauge className="w-4 h-4" />
            <span>Enterprise Multi-Factor Baseline Suite</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-display tracking-tight mt-1">
            Universal Business Productivity Calculator
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Measure single-factor labor yield, Cobb-Douglas Total Factor Productivity (TFP), and multifactor cost returns.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5 bg-muted/40 p-1.5 rounded-xl border border-border/50">
          {Object.entries(PRESETS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedPreset === key
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {p.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <button
          onClick={() => setMode("single_factor_labor")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
            mode === "single_factor_labor"
              ? "bg-blue-500/15 border-blue-500/50 text-blue-300 shadow-md"
              : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>1. Labor Productivity</span>
        </button>

        <button
          onClick={() => setMode("total_factor_cobb_douglas")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
            mode === "total_factor_cobb_douglas"
              ? "bg-purple-500/15 border-purple-500/50 text-purple-300 shadow-md"
              : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>2. Total Factor (TFP)</span>
        </button>

        <button
          onClick={() => setMode("multifactor_cost_yield")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
            mode === "multifactor_cost_yield"
              ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md"
              : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>3. Multifactor Yield</span>
        </button>
      </div>

      {/* Interactive Controls & Output Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {mode === "single_factor_labor" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Total Output (Units or Deliverables)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={1000000}
                    value={outputUnits}
                    onChange={(e) => setOutputUnits(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Total Labor Hours Worked
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={200000}
                    value={laborHours}
                    onChange={(e) => setLaborHours(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Total Gross Revenue ($)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={50000000}
                    step={1000}
                    value={revenue}
                    onChange={(e) => setRevenue(Math.max(10, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Total Labor &amp; Payroll Cost ($)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={25000000}
                    step={1000}
                    value={laborCost}
                    onChange={(e) => setLaborCost(Math.max(10, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "total_factor_cobb_douglas" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Value-Added Revenue ($)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    max={100000000}
                    step={5000}
                    value={revenue}
                    onChange={(e) => setRevenue(Math.max(100, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Capital &amp; Equipment Assets ($)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    max={50000000}
                    step={5000}
                    value={capitalStock}
                    onChange={(e) => setCapitalStock(Math.max(100, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-purple-400" />
                    Labor Elasticity (α) vs Capital (β = {(1 - laborElasticity).toFixed(2)})
                  </span>
                  <span className="font-mono text-purple-300">α = {laborElasticity}</span>
                </div>
                <input
                  type="range"
                  min={0.4}
                  max={0.9}
                  step={0.05}
                  value={laborElasticity}
                  onChange={(e) => setLaborElasticity(Number(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-muted rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Standard US nonfarm labor share α ranges from 0.65 to 0.75; tech and software sit higher at 0.75 to 0.85.
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Active Labor Hours Worked
                </label>
                <input
                  type="number"
                  min={100}
                  max={200000}
                  value={laborHours}
                  onChange={(e) => setLaborHours(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>
            </div>
          )}

          {mode === "multifactor_cost_yield" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Total Enterprise Revenue ($)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    max={100000000}
                    step={5000}
                    value={revenue}
                    onChange={(e) => setRevenue(Math.max(100, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Total Workforce Labor Cost ($)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    max={50000000}
                    step={5000}
                    value={laborCost}
                    onChange={(e) => setLaborCost(Math.max(10, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Materials, Cloud SaaS &amp; Supplies ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={50000000}
                    step={2500}
                    value={materialsCost}
                    onChange={(e) => setMaterialsCost(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    Target Operating Profit Margin (%)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={60}
                    value={targetMarginPct}
                    onChange={(e) => setTargetMarginPct(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl bg-card border border-border/80 px-4 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Output Scorecard (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-border/70 bg-card/80 p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Universal Efficiency Score
            </span>
            <span
              className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                mode === "single_factor_labor"
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                  : mode === "total_factor_cobb_douglas"
                  ? metrics.tfpGainPct >= 0
                    ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                  : metrics.mfpRatio >= 1.25
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-300"
              }`}
            >
              {mode === "single_factor_labor"
                ? `$${metrics.revenuePerHour}/hr Velocity`
                : mode === "total_factor_cobb_douglas"
                ? `TFP Index: ${metrics.tfpIndex}`
                : `${metrics.mfpRatio}x MFP Yield`}
            </span>
          </div>

          {/* Primary Big Metric */}
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">
              {mode === "single_factor_labor"
                ? "Revenue per Labor Hour"
                : mode === "total_factor_cobb_douglas"
                ? "Solow Residual (TFP Index)"
                : "Multifactor Productivity (MFP) Ratio"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono tracking-tight text-foreground">
                {mode === "single_factor_labor"
                  ? `$${metrics.revenuePerHour}`
                  : mode === "total_factor_cobb_douglas"
                  ? `${metrics.tfpIndex}`
                  : `${metrics.mfpRatio}x`}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {mode === "single_factor_labor"
                  ? "per employee hour worked"
                  : mode === "total_factor_cobb_douglas"
                  ? "allocative efficiency factor"
                  : "revenue-to-operating cost"}
              </span>
            </div>
          </div>

          {/* Secondary Metric Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {mode === "single_factor_labor" && (
              <>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Labor Cost Ratio</div>
                  <div className="text-base font-bold font-mono text-blue-300 mt-0.5">
                    {metrics.laborCostRatioPct}% <span className="text-xs font-normal">of rev</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Labor Multiplier</div>
                  <div className="text-base font-bold font-mono text-foreground mt-0.5">
                    ${metrics.revenuePerLaborDollar} <span className="text-xs font-normal">rev/$</span>
                  </div>
                </div>
              </>
            )}

            {mode === "total_factor_cobb_douglas" && (
              <>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Relative TFP Delta</div>
                  <div
                    className={`text-base font-bold font-mono mt-0.5 ${
                      metrics.tfpGainPct >= 0 ? "text-purple-300" : "text-amber-300"
                    }`}
                  >
                    {metrics.tfpGainPct >= 0 ? "+" : ""}{metrics.tfpGainPct}%
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Factor Elasticities</div>
                  <div className="text-base font-bold font-mono text-foreground mt-0.5">
                    α:{metrics.alpha} / β:{metrics.beta}
                  </div>
                </div>
              </>
            )}

            {mode === "multifactor_cost_yield" && (
              <>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Realized Margin</div>
                  <div className="text-base font-bold font-mono text-emerald-300 mt-0.5">
                    {metrics.realizedMarginPct}%
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <div className="text-[11px] text-muted-foreground">Operating Profit</div>
                  <div className="text-base font-bold font-mono text-foreground mt-0.5">
                    ${(metrics.operatingProfit / 1000).toFixed(0)}k
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Benchmark Advisory */}
          <div className="rounded-lg p-3 bg-card/60 border border-border/50 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>BLS &amp; OECD Productivity Standard</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              {mode === "single_factor_labor"
                ? "Labor productivity captures direct workforce yield. In modern enterprise businesses, labor cost ratios exceeding 45% of gross revenue signal capacity underutilization."
                : mode === "total_factor_cobb_douglas"
                ? "Total Factor Productivity isolates structural innovation beyond capital equipment additions. A positive TFP index indicates technological and managerial superiority."
                : "Multifactor yield aggregates labor, capital, and materials. An MFP ratio over 1.25x generates robust free cash flow to fund R&D and expansion."}
            </p>
          </div>

          {/* One-Click Markdown Audit Export */}
          <button
            onClick={handleCopyReport}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/40 transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audit Report Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Enterprise Audit Report (Markdown)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export { GeneralProductivityCalculator };
