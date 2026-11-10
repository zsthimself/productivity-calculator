/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 AgricultureProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的农业耕作单产、农机作业效率(EFC)与保本边际计算引擎，承接 /calculator/agriculture 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Tractor,
  Wheat,
  Sprout,
  DollarSign,
  Copy,
  Check,
  Sparkles,
  Activity,
  Layers,
  CheckCircle2,
  Gauge,
  Fuel,
  TrendingUp,
} from "lucide-react";

type CalcMode = "crop_yield" | "machinery_efc" | "margin_breakeven";

interface AgPreset {
  commodity: string;
  unit: string;
  totalProduction: number;
  harvestedAcres: number;
  fieldLaborHours: number;
  implementWidthFt: number;
  speedMph: number;
  fieldEfficiencyPct: number;
  fuelGallons: number;
  dieselPricePerGal: number;
  marketPricePerUnit: number;
  operatingCostPerAcre: number;
  cashRentPerAcre: number;
}

const PRESETS: Record<string, AgPreset> = {
  corn_grain: {
    commodity: "Corn (Grain)", unit: "bushels",
    totalProduction: 246000, harvestedAcres: 1200, fieldLaborHours: 540,
    implementWidthFt: 36, speedMph: 5.5, fieldEfficiencyPct: 75,
    fuelGallons: 1380, dieselPricePerGal: 3.85,
    marketPricePerUnit: 4.85, operatingCostPerAcre: 620, cashRentPerAcre: 260,
  },
  dryland_wheat: {
    commodity: "Winter Wheat", unit: "bushels",
    totalProduction: 156000, harvestedAcres: 2400, fieldLaborHours: 420,
    implementWidthFt: 45, speedMph: 4.8, fieldEfficiencyPct: 78,
    fuelGallons: 2200, dieselPricePerGal: 3.75,
    marketPricePerUnit: 6.20, operatingCostPerAcre: 310, cashRentPerAcre: 95,
  },
  organic_produce: {
    commodity: "Organic Vegetables", unit: "lbs",
    totalProduction: 1170000, harvestedAcres: 65, fieldLaborHours: 1650,
    implementWidthFt: 15, speedMph: 3.2, fieldEfficiencyPct: 70,
    fuelGallons: 380, dieselPricePerGal: 4.15,
    marketPricePerUnit: 0.88, operatingCostPerAcre: 7400, cashRentPerAcre: 1100,
  },
  orchard_fruit: {
    commodity: "Honeycrisp Apples", unit: "lbs",
    totalProduction: 4200000, harvestedAcres: 110, fieldLaborHours: 4600,
    implementWidthFt: 12, speedMph: 3.0, fieldEfficiencyPct: 72,
    fuelGallons: 620, dieselPricePerGal: 3.95,
    marketPricePerUnit: 0.45, operatingCostPerAcre: 8900, cashRentPerAcre: 1400,
  },
};

export function AgricultureProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("crop_yield");
  const [copied, setCopied] = useState(false);

  // Mode 1: Crop Yield & Harvest Labor
  const [commodity, setCommodity] = useState("Corn (Grain)");
  const [unit, setUnit] = useState("bushels");
  const [totalProduction, setTotalProduction] = useState(246000);
  const [harvestedAcres, setHarvestedAcres] = useState(1200);
  const [fieldLaborHours, setFieldLaborHours] = useState(540);

  // Mode 2: Machinery Field Capacity (EFC)
  const [implementWidthFt, setImplementWidthFt] = useState(36);
  const [speedMph, setSpeedMph] = useState(5.5);
  const [fieldEfficiencyPct, setFieldEfficiencyPct] = useState(75);
  const [fuelGallons, setFuelGallons] = useState(1380);
  const [dieselPricePerGal, setDieselPricePerGal] = useState(3.85);

  // Mode 3: Operating Margin & Breakeven
  const [marketPricePerUnit, setMarketPricePerUnit] = useState(4.85);
  const [operatingCostPerAcre, setOperatingCostPerAcre] = useState(620);
  const [cashRentPerAcre, setCashRentPerAcre] = useState(260);

  // Mode 1 Computations
  const yieldStats = useMemo(() => {
    const acres = Math.max(1, harvestedAcres);
    const prod = Math.max(0, totalProduction);
    const hours = Math.max(1, fieldLaborHours);

    const yieldPerAcre = prod / acres;
    const laborEfficiency = prod / hours;
    const laborHoursPerAcre = hours / acres;

    let rating: "Superior Yield" | "Target Average" | "Sub-Optimal Yield";
    let badgeColor: string;

    if (unit === "bushels" && yieldPerAcre >= 195) {
      rating = "Superior Yield";
      badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    } else if (unit === "bushels" && yieldPerAcre >= 155) {
      rating = "Target Average";
      badgeColor = "text-blue-400 bg-blue-500/10 border-blue-500/20";
    } else {
      rating = "Sub-Optimal Yield";
      badgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }

    return { yieldPerAcre, laborEfficiency, laborHoursPerAcre, rating, badgeColor };
  }, [harvestedAcres, totalProduction, fieldLaborHours, unit]);

  // Mode 2 Computations (ASABE D497 Standards)
  const machineryStats = useMemo(() => {
    const width = Math.max(1, implementWidthFt);
    const speed = Math.max(0.5, speedMph);
    const eff = Math.min(100, Math.max(10, fieldEfficiencyPct));
    const acres = Math.max(1, harvestedAcres);
    const fuel = Math.max(0, fuelGallons);
    const dieselPrice = Math.max(0, dieselPricePerGal);

    // ASABE formula: EFC (ac/hr) = (width * speed * eff%) / 8.25
    const efcAcresPerHour = (width * speed * (eff / 100)) / 8.25;
    const totalMachineryHours = acres / efcAcresPerHour;
    const fuelGallonsPerAcre = fuel / acres;
    const fuelCostPerAcre = fuelGallonsPerAcre * dieselPrice;
    const fuelBurnRateGalPerHour = totalMachineryHours > 0 ? fuel / totalMachineryHours : 0;

    return {
      efcAcresPerHour,
      totalMachineryHours,
      fuelGallonsPerAcre,
      fuelCostPerAcre,
      fuelBurnRateGalPerHour,
    };
  }, [implementWidthFt, speedMph, fieldEfficiencyPct, harvestedAcres, fuelGallons, dieselPricePerGal]);

  // Mode 3 Computations
  const marginStats = useMemo(() => {
    const acres = Math.max(1, harvestedAcres);
    const yieldPerAc = Math.max(0.1, yieldStats.yieldPerAcre);
    const price = Math.max(0.01, marketPricePerUnit);
    const opCost = Math.max(0, operatingCostPerAcre);
    const rent = Math.max(0, cashRentPerAcre);

    const totalCostPerAcre = opCost + rent;
    const grossRevenuePerAcre = yieldPerAc * price;
    const netMarginPerAcre = grossRevenuePerAcre - totalCostPerAcre;
    const totalFarmNetProfit = netMarginPerAcre * acres;
    const breakevenYieldPerAcre = totalCostPerAcre / price;
    const marginSafetyBufferPct = ((yieldPerAc - breakevenYieldPerAcre) / yieldPerAc) * 100;

    return {
      totalCostPerAcre,
      grossRevenuePerAcre,
      netMarginPerAcre,
      totalFarmNetProfit,
      breakevenYieldPerAcre,
      marginSafetyBufferPct,
    };
  }, [harvestedAcres, yieldStats.yieldPerAcre, marketPricePerUnit, operatingCostPerAcre, cashRentPerAcre]);

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setCommodity(p.commodity);
    setUnit(p.unit);
    setTotalProduction(p.totalProduction);
    setHarvestedAcres(p.harvestedAcres);
    setFieldLaborHours(p.fieldLaborHours);
    setImplementWidthFt(p.implementWidthFt);
    setSpeedMph(p.speedMph);
    setFieldEfficiencyPct(p.fieldEfficiencyPct);
    setFuelGallons(p.fuelGallons);
    setDieselPricePerGal(p.dieselPricePerGal);
    setMarketPricePerUnit(p.marketPricePerUnit);
    setOperatingCostPerAcre(p.operatingCostPerAcre);
    setCashRentPerAcre(p.cashRentPerAcre);
  };

  const copyMarkdownReport = () => {
    const text = `# Agriculture Productivity & Yield Audit Report
Generated by ProductivityCalculator.work/calculator/agriculture

### Operational Parameters
- **Enterprise / Crop**: ${commodity} (${unit})
- **Harvested Acreage**: ${harvestedAcres.toLocaleString()} acres
- **Total Production**: ${totalProduction.toLocaleString()} ${unit}
- **Direct Field Labor**: ${fieldLaborHours.toLocaleString()} hours

### Mode 1: Biological Yield & Labor Efficiency
- **Crop Yield per Acre**: ${yieldStats.yieldPerAcre.toFixed(1)} ${unit}/acre
- **Labor Efficiency**: ${yieldStats.laborEfficiency.toFixed(1)} ${unit}/labor hr
- **Field Labor Unit Rate**: ${yieldStats.laborHoursPerAcre.toFixed(2)} hr/acre
- **Performance Rating**: ${yieldStats.rating}

### Mode 2: ASABE Machinery Field Capacity (EFC)
- **Implement Swath & Speed**: ${implementWidthFt} ft @ ${speedMph} mph (${fieldEfficiencyPct}% field efficiency)
- **Effective Field Capacity (EFC)**: ${machineryStats.efcAcresPerHour.toFixed(2)} acres/hr
- **Total Field Machinery Work**: ${machineryStats.totalMachineryHours.toFixed(1)} machine hours
- **Diesel Fuel Rate**: ${machineryStats.fuelGallonsPerAcre.toFixed(2)} gal/acre ($${machineryStats.fuelCostPerAcre.toFixed(2)}/acre)
- **Engine Fuel Burn**: ${machineryStats.fuelBurnRateGalPerHour.toFixed(1)} gal/hr

### Mode 3: Per-Acre Operating Margin & Breakeven
- **Gross Revenue**: $${marginStats.grossRevenuePerAcre.toFixed(2)} / acre
- **Total Operating Cost**: $${marginStats.totalCostPerAcre.toFixed(2)} / acre (Op: $${operatingCostPerAcre} + Rent: $${cashRentPerAcre})
- **Net Operating Margin**: $${marginStats.netMarginPerAcre.toFixed(2)} / acre
- **Total Enterprise Net Profit**: $${marginStats.totalFarmNetProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
- **Breakeven Yield Required**: ${marginStats.breakevenYieldPerAcre.toFixed(1)} ${unit}/acre
- **Yield Safety Margin Buffer**: ${marginStats.marginSafetyBufferPct.toFixed(1)}%

---
*Standards Compliance: USDA ERS Agricultural Productivity Indicators & ASABE D497 Agricultural Machinery Management Standards.*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-[#0b1120] border border-slate-800 p-6 md:p-8 shadow-2xl text-slate-100">
      {/* Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Tractor className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Agriculture Productivity Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            USDA Biological Yields · ASABE D497 Machinery Field Capacity · Per-Acre Breakeven
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Presets:
          </span>
          <button
            onClick={() => applyPreset("corn_grain")}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Corn 1,200 ac
          </button>
          <button
            onClick={() => applyPreset("dryland_wheat")}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Wheat 2,400 ac
          </button>
          <button
            onClick={() => applyPreset("organic_produce")}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Produce 65 ac
          </button>
          <button
            onClick={() => applyPreset("orchard_fruit")}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Apples 110 ac
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
        <button
          onClick={() => setMode("crop_yield")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition border ${
            mode === "crop_yield"
              ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/5"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <Wheat className="w-4 h-4" />
          <span>1. Crop Yield &amp; Labor</span>
        </button>

        <button
          onClick={() => setMode("machinery_efc")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition border ${
            mode === "machinery_efc"
              ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-lg shadow-amber-500/5"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>2. Machinery Field Cap (EFC)</span>
        </button>

        <button
          onClick={() => setMode("margin_breakeven")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition border ${
            mode === "margin_breakeven"
              ? "bg-sky-500/10 border-sky-500 text-sky-400 shadow-lg shadow-sky-500/5"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>3. Margin &amp; Breakeven</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 space-y-5">
          {mode === "crop_yield" && (
            <div className="space-y-4 bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-400" /> Harvest &amp; Land Inputs
                </h3>
                <span className="text-xs text-slate-400 font-mono">{commodity}</span>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Crop Commodity Name &amp; Unit
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="bushels">bushels (bu)</option>
                    <option value="lbs">pounds (lbs)</option>
                    <option value="tons">metric tons (tn)</option>
                    <option value="cwt">hundredweight (cwt)</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-300">Total Harvested Production ({unit})</span>
                  <span className="font-mono text-emerald-400 font-semibold">{totalProduction.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  min="1"
                  step="1000"
                  value={totalProduction}
                  onChange={(e) => setTotalProduction(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-300">Harvested Land Area (Acres)</span>
                  <span className="font-mono text-emerald-400 font-semibold">{harvestedAcres.toLocaleString()} ac</span>
                </div>
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={harvestedAcres}
                  onChange={(e) => setHarvestedAcres(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-300">Direct Field Labor Hours Worked</span>
                  <span className="font-mono text-emerald-400 font-semibold">{fieldLaborHours.toLocaleString()} hrs</span>
                </div>
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={fieldLaborHours}
                  onChange={(e) => setFieldLaborHours(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>
            </div>
          )}

          {mode === "machinery_efc" && (
            <div className="space-y-4 bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Tractor className="w-4 h-4 text-amber-400" /> ASABE D497 Machinery Parameters
                </h3>
                <span className="text-xs text-slate-400 font-mono">{harvestedAcres} ac field</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Implement Width (ft)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={implementWidthFt}
                    onChange={(e) => setImplementWidthFt(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Ground Speed (mph)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.1"
                    value={speedMph}
                    onChange={(e) => setSpeedMph(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-300">Field Efficiency (% including turns &amp; hopper reloads)</span>
                  <span className="font-mono text-amber-400 font-semibold">{fieldEfficiencyPct}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="95"
                  value={fieldEfficiencyPct}
                  onChange={(e) => setFieldEfficiencyPct(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Sprayer (60-70%)</span>
                  <span>Planter (65-75%)</span>
                  <span>Combine (70-85%)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Diesel Fuel Consumed (Gal)</label>
                  <input
                    type="number"
                    min="1"
                    step="10"
                    value={fuelGallons}
                    onChange={(e) => setFuelGallons(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Diesel Price ($/gal)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.05"
                    value={dieselPricePerGal}
                    onChange={(e) => setDieselPricePerGal(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "margin_breakeven" && (
            <div className="space-y-4 bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-sky-400" /> Economic &amp; Cost Inputs
                </h3>
                <span className="text-xs text-slate-400 font-mono">Yield: {yieldStats.yieldPerAcre.toFixed(1)} {unit}/ac</span>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Expected Market Selling Price ($/{unit})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0.01"
                    step="0.05"
                    value={marketPricePerUnit}
                    onChange={(e) => setMarketPricePerUnit(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Direct Operating Inputs Cost ($/acre: seed, fertilizer, chemical, fuel, drying)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={operatingCostPerAcre}
                    onChange={(e) => setOperatingCostPerAcre(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Cash Rent / Land Opportunity Cost ($/acre)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={cashRentPerAcre}
                    onChange={(e) => setCashRentPerAcre(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats Pill */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Acreage: <strong>{harvestedAcres.toLocaleString()} ac</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>EFC: <strong>{machineryStats.efcAcresPerHour.toFixed(1)} ac/hr</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>BE: <strong>{marginStats.breakevenYieldPerAcre.toFixed(1)} {unit}/ac</strong></span>
            </span>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-6 space-y-5">
          {mode === "crop_yield" && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900/80 border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                    Crop Yield Per Acre
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${yieldStats.badgeColor}`}>
                    {yieldStats.rating}
                  </span>
                </div>
                <div className="text-4xl font-extrabold text-white mt-2 font-mono">
                  {yieldStats.yieldPerAcre.toFixed(1)}
                  <span className="text-lg font-normal text-slate-400 ml-2">{unit}/acre</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Total production of {totalProduction.toLocaleString()} {unit} harvested across {harvestedAcres.toLocaleString()} acres.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Labor Productivity</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">
                    {yieldStats.laborEfficiency.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-slate-400">{unit} per labor hr</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Labor Density</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">
                    {yieldStats.laborHoursPerAcre.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate-400">hours worked / acre</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-slate-300">Yield Optimization Insight</div>
                <p className="text-slate-400">
                  Corn target yields average 175-225 bu/ac across Iowa/Illinois Corn Belt soils. A labor intensity of {yieldStats.laborHoursPerAcre.toFixed(2)} hr/ac reflects mechanized large-scale grain operations.
                </p>
              </div>
            </div>
          )}

          {mode === "machinery_efc" && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/40 to-slate-900/80 border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-amber-400">
                    Effective Field Capacity (EFC)
                  </span>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full border text-amber-400 bg-amber-500/10 border-amber-500/20">
                    ASABE D497
                  </span>
                </div>
                <div className="text-4xl font-extrabold text-white mt-2 font-mono">
                  {machineryStats.efcAcresPerHour.toFixed(2)}
                  <span className="text-lg font-normal text-slate-400 ml-2">acres / hr</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  At {implementWidthFt} ft swath, {speedMph} mph, and {fieldEfficiencyPct}% field efficiency.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Machine Hours Needed</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">
                    {machineryStats.totalMachineryHours.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-slate-400">hrs for {harvestedAcres} acres</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Fuel Cost / Acre</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">
                    ${machineryStats.fuelCostPerAcre.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate-400">{machineryStats.fuelGallonsPerAcre.toFixed(2)} gal diesel/ac</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-slate-300">Machinery Management Insight</div>
                <p className="text-slate-400">
                  Increasing field efficiency from {fieldEfficiencyPct}% to 82% via RTK auto-steer saves {(machineryStats.totalMachineryHours * 0.08).toFixed(1)} tractor operating hours across {harvestedAcres} acres.
                </p>
              </div>
            </div>
          )}

          {mode === "margin_breakeven" && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-sky-950/40 to-slate-900/80 border border-sky-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-sky-400">
                    Net Operating Margin / Acre
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${
                    marginStats.netMarginPerAcre >= 0
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                  }`}>
                    {marginStats.netMarginPerAcre >= 0 ? "Profitable Crop" : "Operating Deficit"}
                  </span>
                </div>
                <div className="text-4xl font-extrabold text-white mt-2 font-mono">
                  ${marginStats.netMarginPerAcre.toFixed(2)}
                  <span className="text-lg font-normal text-slate-400 ml-2">/ acre</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Total Enterprise Profit: <strong>${marginStats.totalFarmNetProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Breakeven Yield</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">
                    {marginStats.breakevenYieldPerAcre.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-slate-400">{unit}/acre @ ${marketPricePerUnit}/{unit}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Safety Margin Buffer</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">
                    {marginStats.marginSafetyBufferPct.toFixed(1)}%
                  </span>
                  <span className="text-[11px] text-slate-400">above breakeven</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-slate-300">Financial Cushion Analysis</div>
                <p className="text-slate-400">
                  Total cost per acre is ${marginStats.totalCostPerAcre.toFixed(2)}. Yield drops below {marginStats.breakevenYieldPerAcre.toFixed(1)} {unit}/ac or price below ${(marginStats.totalCostPerAcre / yieldStats.yieldPerAcre).toFixed(2)} will trigger negative cash flows.
                </p>
              </div>
            </div>
          )}

          {/* Export Report Action */}
          <div className="pt-2">
            <button
              onClick={copyMarkdownReport}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition border border-slate-700 shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied Agricultural Audit Report!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Complete Agricultural Audit (Markdown)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgricultureProductivityCalculator;
