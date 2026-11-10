/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 RetailProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的零售门店工效、每平方英尺销售额与 GMROI 计算引擎，承接 /calculator/retail 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  Store,
  DollarSign,
  Copy,
  Check,
  Sparkles,
  Activity,
  Layers,
  CheckCircle2,
  Package,
  Clock,
  ShieldAlert,
} from "lucide-react";

type CalcMode = "labor_hourly" | "floor_space" | "inventory_gmroi";

interface StorePreset {
  weeklySales: number; scheduledHours: number; hourlyLoadedWage: number; transactionsCount: number;
  annualSales: number; sellingSqFt: number; totalStoreSqFt: number; annualRentAndCam: number;
  annualGrossMargin: number; averageInventoryCost: number; annualCogs: number; annualShrinkageLoss: number;
}

const PRESETS: Record<string, StorePreset> = {
  apparel: {
    weeklySales: 46500, scheduledHours: 215, hourlyLoadedWage: 18.5, transactionsCount: 980,
    annualSales: 1880000, sellingSqFt: 3800, totalStoreSqFt: 5000, annualRentAndCam: 155000,
    annualGrossMargin: 940000, averageInventoryCost: 320000, annualCogs: 940000, annualShrinkageLoss: 26000,
  },
  big_box: {
    weeklySales: 185000, scheduledHours: 890, hourlyLoadedWage: 19.0, transactionsCount: 4850,
    annualSales: 8900000, sellingSqFt: 28000, totalStoreSqFt: 36000, annualRentAndCam: 680000,
    annualGrossMargin: 2670000, averageInventoryCost: 780000, annualCogs: 6230000, annualShrinkageLoss: 135000,
  },
  luxury: {
    weeklySales: 72000, scheduledHours: 140, hourlyLoadedWage: 28.0, transactionsCount: 115,
    annualSales: 3750000, sellingSqFt: 1800, totalStoreSqFt: 2600, annualRentAndCam: 340000,
    annualGrossMargin: 2450000, averageInventoryCost: 680000, annualCogs: 1300000, annualShrinkageLoss: 18000,
  },
  express: {
    weeklySales: 26500, scheduledHours: 115, hourlyLoadedWage: 17.5, transactionsCount: 1850,
    annualSales: 1120000, sellingSqFt: 1400, totalStoreSqFt: 1800, annualRentAndCam: 92000,
    annualGrossMargin: 480000, averageInventoryCost: 95000, annualCogs: 640000, annualShrinkageLoss: 19500,
  },
};

export function RetailProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("labor_hourly");
  const [copied, setCopied] = useState(false);

  // Mode 1: Labor
  const [weeklySales, setWeeklySales] = useState(48500);
  const [scheduledHours, setScheduledHours] = useState(210);
  const [hourlyLoadedWage, setHourlyLoadedWage] = useState(19.5);
  const [transactionsCount, setTransactionsCount] = useState(1050);

  // Mode 2: Floor Space
  const [annualSales, setAnnualSales] = useState(1920000);
  const [sellingSqFt, setSellingSqFt] = useState(4200);
  const [totalStoreSqFt, setTotalStoreSqFt] = useState(5600);
  const [annualRentAndCam, setAnnualRentAndCam] = useState(168000);

  // Mode 3: GMROI & Inventory
  const [annualGrossMargin, setAnnualGrossMargin] = useState(920000);
  const [averageInventoryCost, setAverageInventoryCost] = useState(310000);
  const [annualCogs, setAnnualCogs] = useState(1280000);
  const [annualShrinkageLoss, setAnnualShrinkageLoss] = useState(32000);

  // Mode 1 Computations
  const laborStats = useMemo(() => {
    const sales = Math.max(100, weeklySales);
    const hours = Math.max(1, scheduledHours);
    const wage = Math.max(1, hourlyLoadedWage);
    const tx = Math.max(1, transactionsCount);

    const splh = sales / hours;
    const totalPayroll = hours * wage;
    const laborCostPct = (totalPayroll / sales) * 100;
    const avgTxValue = sales / tx;
    const txPerLaborHour = tx / hours;

    let tier: "Elite World-Class" | "Healthy Benchmark" | "Labor Drag" | "Severe Overstaffing";
    let badgeColor: string;

    if (splh >= 320 && laborCostPct <= 10.5) {
      tier = "Elite World-Class";
      badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    } else if (splh >= 210 && laborCostPct <= 14.5) {
      tier = "Healthy Benchmark";
      badgeColor = "text-blue-400 bg-blue-500/10 border-blue-500/20";
    } else if (laborCostPct <= 19.0) {
      tier = "Labor Drag";
      badgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
    } else {
      tier = "Severe Overstaffing";
      badgeColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
    }

    return { splh, totalPayroll, laborCostPct, avgTxValue, txPerLaborHour, tier, badgeColor };
  }, [weeklySales, scheduledHours, hourlyLoadedWage, transactionsCount]);

  // Mode 2 Computations
  const spaceStats = useMemo(() => {
    const sales = Math.max(100, annualSales);
    const sellingSpace = Math.max(10, sellingSqFt);
    const totalSpace = Math.max(sellingSpace, totalStoreSqFt);
    const occupancyCost = Math.max(0, annualRentAndCam);

    const spsfSelling = sales / sellingSpace;
    const spsfGross = sales / totalSpace;
    const sellingSpaceRatio = (sellingSpace / totalSpace) * 100;
    const rentToSalesPct = (occupancyCost / sales) * 100;
    const salesPerDay = sales / 365;

    let rating: "Prime Density Leader" | "Sound Space Yield" | "Sub-Par Footprint" | "Excess Space Drain";
    let badgeColor: string;

    if (spsfSelling >= 650 && rentToSalesPct <= 8.5) {
      rating = "Prime Density Leader";
      badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    } else if (spsfSelling >= 380 && rentToSalesPct <= 12.0) {
      rating = "Sound Space Yield";
      badgeColor = "text-blue-400 bg-blue-500/10 border-blue-500/20";
    } else if (spsfSelling >= 220) {
      rating = "Sub-Par Footprint";
      badgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
    } else {
      rating = "Excess Space Drain";
      badgeColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
    }

    return { spsfSelling, spsfGross, sellingSpaceRatio, rentToSalesPct, salesPerDay, rating, badgeColor };
  }, [annualSales, sellingSqFt, totalStoreSqFt, annualRentAndCam]);

  // Mode 3 Computations
  const gmroiStats = useMemo(() => {
    const gm = Math.max(100, annualGrossMargin);
    const invCost = Math.max(100, averageInventoryCost);
    const cogs = Math.max(100, annualCogs);
    const shrinkage = Math.max(0, annualShrinkageLoss);

    const rawGmroi = gm / invCost;
    const invTurnover = cogs / invCost;
    const daysOnHand = 365 / invTurnover;
    const totalRetailValue = gm + cogs;
    const shrinkageDragPct = (shrinkage / totalRetailValue) * 100;
    const adjustedGmroi = (gm - shrinkage) / invCost;

    let health: "Top Decile Capital Yield" | "Sustainable Turnover" | "Capital Stagnation Risk";
    let badgeColor: string;

    if (rawGmroi >= 3.2 && shrinkageDragPct <= 1.4) {
      health = "Top Decile Capital Yield";
      badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    } else if (rawGmroi >= 2.2 && shrinkageDragPct <= 2.2) {
      health = "Sustainable Turnover";
      badgeColor = "text-blue-400 bg-blue-500/10 border-blue-500/20";
    } else {
      health = "Capital Stagnation Risk";
      badgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }

    return { rawGmroi, invTurnover, daysOnHand, shrinkageDragPct, adjustedGmroi, health, badgeColor };
  }, [annualGrossMargin, averageInventoryCost, annualCogs, annualShrinkageLoss]);

  const handleApplyPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setWeeklySales(p.weeklySales);
    setScheduledHours(p.scheduledHours);
    setHourlyLoadedWage(p.hourlyLoadedWage);
    setTransactionsCount(p.transactionsCount);
    setAnnualSales(p.annualSales);
    setSellingSqFt(p.sellingSqFt);
    setTotalStoreSqFt(p.totalStoreSqFt);
    setAnnualRentAndCam(p.annualRentAndCam);
    setAnnualGrossMargin(p.annualGrossMargin);
    setAverageInventoryCost(p.averageInventoryCost);
    setAnnualCogs(p.annualCogs);
    setAnnualShrinkageLoss(p.annualShrinkageLoss);
  };

  const handleCopyReport = () => {
    let report = "";
    if (mode === "labor_hourly") {
      report = `# Retail Store Labor Productivity Audit Report
- Target Keyword: retail productivity calculator
- Metric Mode: Sales Per Labor Hour (SPLH) & Store Labor Cost %
- Net Weekly Sales: $${weeklySales.toLocaleString()}
- Total Scheduled Labor Hours: ${scheduledHours} hrs
- Average Loaded Hourly Wage: $${hourlyLoadedWage.toFixed(2)}/hr
- Total Customer Transactions: ${transactionsCount.toLocaleString()}
--------------------------------------------------
- Sales Per Labor Hour (SPLH): $${laborStats.splh.toFixed(2)}/hr
- Total Weekly Store Payroll: $${laborStats.totalPayroll.toLocaleString(undefined, { maximumFractionDigits: 2 })}
- Labor Cost Ratio: ${laborStats.laborCostPct.toFixed(2)}% of Sales
- Average Transaction Value (ATV): $${laborStats.avgTxValue.toFixed(2)}
- Transactions Per Labor Hour (TPLH): ${laborStats.txPerLaborHour.toFixed(2)} tx/hr
- Operational Assessment: ${laborStats.tier}
Generated via ProductivityCalculator.work/calculator/retail`;
    } else if (mode === "floor_space") {
      report = `# Retail Store Space Productivity Audit Report
- Target Keyword: retail productivity calculator
- Metric Mode: Sales Per Square Foot (SPSF) & Floor Yield
- Net Annual Sales: $${annualSales.toLocaleString()}
- Dedicated Selling Space: ${sellingSqFt.toLocaleString()} sq ft
- Gross Store Footprint (GLA): ${totalStoreSqFt.toLocaleString()} sq ft
- Annual Rent & CAM Occupancy Cost: $${annualRentAndCam.toLocaleString()}
--------------------------------------------------
- Sales Per Square Foot (Selling Space): $${spaceStats.spsfSelling.toFixed(2)}/sq ft
- Sales Per Square Foot (Gross Footprint): $${spaceStats.spsfGross.toFixed(2)}/sq ft
- Selling Space Footprint Ratio: ${spaceStats.sellingSpaceRatio.toFixed(1)}%
- Occupancy Cost (Rent-to-Sales Drag): ${spaceStats.rentToSalesPct.toFixed(2)}%
- Average Daily Sales Yield: $${spaceStats.salesPerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })}/day
- Density Assessment: ${spaceStats.rating}
Generated via ProductivityCalculator.work/calculator/retail`;
    } else {
      report = `# Retail Store GMROI & Inventory Turn Audit Report
- Target Keyword: retail productivity calculator
- Metric Mode: GMROI & Inventory Capital Velocity
- Annual Gross Margin: $${annualGrossMargin.toLocaleString()}
- Average Inventory Investment at Cost: $${averageInventoryCost.toLocaleString()}
- Annual Cost of Goods Sold (COGS): $${annualCogs.toLocaleString()}
- Annual Shrinkage / Inventory Theft Loss: $${annualShrinkageLoss.toLocaleString()}
--------------------------------------------------
- Raw GMROI Ratio: ${gmroiStats.rawGmroi.toFixed(2)}x
- Inventory Turnover Ratio: ${gmroiStats.invTurnover.toFixed(2)} turns/year
- Days of Inventory on Hand (DOH): ${gmroiStats.daysOnHand.toFixed(1)} days
- Shrinkage Drag Rate: ${gmroiStats.shrinkageDragPct.toFixed(2)}%
- Net Adjusted GMROI: ${gmroiStats.adjustedGmroi.toFixed(2)}x
- Capital Health Assessment: ${gmroiStats.health}
Generated via ProductivityCalculator.work/calculator/retail`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Top Header */}
      <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-muted/50 via-card to-muted/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Retail Store Productivity Calculator
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                SPLH · SPSF · GMROI
              </span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Evaluate retail sales per labor hour, floor sales density per square foot, and inventory GMROI.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyReport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-all shadow-sm active:scale-95"
          title="Copy audit report to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied Report" : "Copy Audit Report"}</span>
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="px-6 pt-4 pb-2 bg-muted/20 border-b border-border/60">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: "labor_hourly", label: "1. Labor (SPLH & Payroll %)", icon: Clock, color: "text-emerald-400" },
            { id: "floor_space", label: "2. Floor Density (SPSF Yield)", icon: Layers, color: "text-sky-400" },
            { id: "inventory_gmroi", label: "3. Inventory Turn & GMROI", icon: Package, color: "text-amber-400" },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id as CalcMode)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  active
                    ? "bg-card text-primary border-primary/30 shadow-md shadow-primary/5"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Presets Bar */}
      <div className="px-6 py-2.5 bg-muted/10 border-b border-border/40 flex flex-wrap items-center justify-between text-xs gap-2">
        <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Industry Benchmark Profiles:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: "apparel", label: "Specialty Apparel" },
            { key: "big_box", label: "Big-Box Superstore" },
            { key: "luxury", label: "Luxury Boutique" },
            { key: "express", label: "Express / Convenience" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => handleApplyPreset(btn.key)}
              className="px-2.5 py-1 rounded-md bg-secondary/70 hover:bg-secondary text-secondary-foreground font-medium text-[11px] border border-border/60 transition-colors"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-primary" />
              Store Parameter Inputs
            </h3>
            <span className="text-[11px] font-mono text-muted-foreground">Adjust operational variables</span>
          </div>

          {/* Mode 1 Inputs: Labor */}
          {mode === "labor_hourly" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="weeklySales" className="font-semibold text-foreground flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Net Weekly Store Sales ($)
                  </label>
                  <span className="font-mono text-xs font-bold text-primary">${weeklySales.toLocaleString()}</span>
                </div>
                <input
                  id="weeklySales"
                  type="range"
                  min="5000"
                  max="250000"
                  step="500"
                  value={weeklySales}
                  onChange={(e) => setWeeklySales(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>$5,000/wk</span>
                  <span>$125,000/wk</span>
                  <span>$250,000/wk</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="scheduledHours" className="font-semibold text-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Scheduled Store Labor Hours (Weekly)
                  </label>
                  <span className="font-mono text-xs font-bold text-primary">{scheduledHours} hrs</span>
                </div>
                <input
                  id="scheduledHours"
                  type="range"
                  min="40"
                  max="1200"
                  step="5"
                  value={scheduledHours}
                  onChange={(e) => setScheduledHours(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>40 hrs (1-2 staff)</span>
                  <span>600 hrs</span>
                  <span>1,200 hrs (Big-box)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                  <label htmlFor="hourlyLoadedWage" className="text-xs font-semibold text-foreground block">
                    Average Loaded Wage ($/hr)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-mono text-muted-foreground">$</span>
                    <input
                      id="hourlyLoadedWage"
                      type="number"
                      step="0.5"
                      min="10"
                      max="60"
                      value={hourlyLoadedWage}
                      onChange={(e) => setHourlyLoadedWage(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                  <label htmlFor="transactionsCount" className="text-xs font-semibold text-foreground block">
                    Total Transactions (Weekly)
                  </label>
                  <input
                    id="transactionsCount"
                    type="number"
                    step="25"
                    min="50"
                    max="10000"
                    value={transactionsCount}
                    onChange={(e) => setTransactionsCount(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mode 2 Inputs: Space */}
          {mode === "floor_space" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="annualSales" className="font-semibold text-foreground flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-sky-400" />
                    Annual Net Store Sales ($)
                  </label>
                  <span className="font-mono text-xs font-bold text-primary">${annualSales.toLocaleString()}</span>
                </div>
                <input
                  id="annualSales"
                  type="range"
                  min="200000"
                  max="15000000"
                  step="25000"
                  value={annualSales}
                  onChange={(e) => setAnnualSales(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                  <label htmlFor="sellingSqFt" className="text-xs font-semibold text-foreground block">
                    Selling Floor Space (Sq Ft)
                  </label>
                  <input
                    id="sellingSqFt"
                    type="number"
                    step="100"
                    min="200"
                    max="80000"
                    value={sellingSqFt}
                    onChange={(e) => setSellingSqFt(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                  <label htmlFor="totalStoreSqFt" className="text-xs font-semibold text-foreground block">
                    Gross Footprint / GLA (Sq Ft)
                  </label>
                  <input
                    id="totalStoreSqFt"
                    type="number"
                    step="100"
                    min="300"
                    max="100000"
                    value={totalStoreSqFt}
                    onChange={(e) => setTotalStoreSqFt(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="annualRentAndCam" className="font-semibold text-foreground flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-amber-400" />
                    Annual Occupancy Cost (Rent + CAM) ($)
                  </label>
                  <span className="font-mono text-xs font-bold text-primary">${annualRentAndCam.toLocaleString()}</span>
                </div>
                <input
                  id="annualRentAndCam"
                  type="range"
                  min="30000"
                  max="1200000"
                  step="5000"
                  value={annualRentAndCam}
                  onChange={(e) => setAnnualRentAndCam(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Mode 3 Inputs: GMROI & Inventory */}
          {mode === "inventory_gmroi" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="annualGrossMargin" className="font-semibold text-foreground flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Annual Gross Margin Dollars ($)
                  </label>
                  <span className="font-mono text-xs font-bold text-primary">${annualGrossMargin.toLocaleString()}</span>
                </div>
                <input
                  id="annualGrossMargin"
                  type="range"
                  min="50000"
                  max="6000000"
                  step="10000"
                  value={annualGrossMargin}
                  onChange={(e) => setAnnualGrossMargin(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                  <label htmlFor="averageInventoryCost" className="text-xs font-semibold text-foreground block">
                    Average Inventory at Cost ($)
                  </label>
                  <input
                    id="averageInventoryCost"
                    type="number"
                    step="5000"
                    min="10000"
                    max="2000000"
                    value={averageInventoryCost}
                    onChange={(e) => setAverageInventoryCost(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1.5">
                  <label htmlFor="annualCogs" className="text-xs font-semibold text-foreground block">
                    Annual Cost of Goods Sold ($)
                  </label>
                  <input
                    id="annualCogs"
                    type="number"
                    step="10000"
                    min="20000"
                    max="8000000"
                    value={annualCogs}
                    onChange={(e) => setAnnualCogs(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="annualShrinkageLoss" className="font-semibold text-foreground flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    Annual Shrinkage / Theft Loss ($)
                  </label>
                  <span className="font-mono text-xs font-bold text-rose-400">${annualShrinkageLoss.toLocaleString()}</span>
                </div>
                <input
                  id="annualShrinkageLoss"
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={annualShrinkageLoss}
                  onChange={(e) => setAnnualShrinkageLoss(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Outputs Column */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                Store Productivity Yield
              </h3>
              {mode === "labor_hourly" && (
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${laborStats.badgeColor}`}>
                  {laborStats.tier}
                </span>
              )}
              {mode === "floor_space" && (
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${spaceStats.badgeColor}`}>
                  {spaceStats.rating}
                </span>
              )}
              {mode === "inventory_gmroi" && (
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${gmroiStats.badgeColor}`}>
                  {gmroiStats.health}
                </span>
              )}
            </div>

            {/* Mode 1 Output Cards */}
            {mode === "labor_hourly" && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-card to-card border border-emerald-500/30 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Sales Per Labor Hour (SPLH)
                      </span>
                      <div className="text-3xl font-mono font-extrabold text-foreground mt-1">
                        ${laborStats.splh.toFixed(2)}
                        <span className="text-sm font-sans font-normal text-muted-foreground ml-1">/hr</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Benchmark: Specialty ($180 - $280/hr), Grocery ($160 - $240/hr)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Labor Cost % of Sales</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      {laborStats.laborCostPct.toFixed(2)}%
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">Target: 9% - 14%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Weekly Store Payroll</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      ${laborStats.totalPayroll.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">
                      ${hourlyLoadedWage.toFixed(2)}/hr base wage
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Avg Transaction Value</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      ${laborStats.avgTxValue.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">Per customer receipt</span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Tx Per Labor Hour</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      {laborStats.txPerLaborHour.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">Checkouts / staff hour</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2 Output Cards */}
            {mode === "floor_space" && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-gradient-to-br from-sky-500/10 via-card to-card border border-sky-500/30 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Sales Per Square Foot (Selling Area)
                      </span>
                      <div className="text-3xl font-mono font-extrabold text-foreground mt-1">
                        ${spaceStats.spsfSelling.toFixed(2)}
                        <span className="text-sm font-sans font-normal text-muted-foreground ml-1">/sq ft</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                      <Layers className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Based on {sellingSqFt.toLocaleString()} sq ft customer sales space</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Gross Footprint SPSF</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      ${spaceStats.spsfGross.toFixed(2)}/sq ft
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">GLA Total footprint</span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Selling Space Ratio</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      {spaceStats.sellingSpaceRatio.toFixed(1)}%
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">Target: 70% - 85%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Occupancy Cost Drag</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      {spaceStats.rentToSalesPct.toFixed(2)}%
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">Rent-to-sales ratio</span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Average Daily Sales</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      ${spaceStats.salesPerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">Store cash yield / day</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 3 Output Cards */}
            {mode === "inventory_gmroi" && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-card to-card border border-amber-500/30 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Gross Margin Return on Investment (GMROI)
                      </span>
                      <div className="text-3xl font-mono font-extrabold text-foreground mt-1">
                        {gmroiStats.rawGmroi.toFixed(2)}x
                        <span className="text-sm font-sans font-normal text-muted-foreground ml-1">
                          ($3.00+ is healthy)
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Net GMROI after shrinkage: {gmroiStats.adjustedGmroi.toFixed(2)}x</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Inventory Turnover</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      {gmroiStats.invTurnover.toFixed(2)} turns/yr
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">Stock cycle velocity</span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Days of Inventory (DOH)</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      {gmroiStats.daysOnHand.toFixed(1)} days
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">Shelf holding duration</span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Shrinkage Loss Rate</span>
                    <div className="text-xl font-mono font-bold text-rose-400 mt-0.5">
                      {gmroiStats.shrinkageDragPct.toFixed(2)}%
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">NRF National Avg: 1.6%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border shadow-sm">
                    <span className="text-[11px] font-semibold text-muted-foreground block">Annual Loss Dollars</span>
                    <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                      ${annualShrinkageLoss.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">Shoplifting + admin error</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footnote Info Box */}
          <div className="p-3.5 rounded-xl bg-muted/20 border border-border/60 text-xs text-muted-foreground flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Store Operator Tip:</strong> High-performing retail chains pair hourly Sales Per Labor Hour (SPLH)
              with sensor footfall heatmaps to prevent overstaffing during dead morning hours and avoid lost sales from
              understaffed checkout registers during lunch and weekend peaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetailProductivityCalculator;
