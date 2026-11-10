/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 RestaurantProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的餐饮门店 RevPASH、翻台率、人工成本与后厨出餐工效计算引擎，承接 /calculator/restaurant 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  UtensilsCrossed,
  Clock,
  DollarSign,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  Flame,
  ChefHat,
  Users,
  Gauge,
  Percent,
} from "lucide-react";

type CalcMode = "revpash_seating" | "labor_prime_cost" | "kitchen_velocity";

interface RestaurantPreset {
  name: string;
  concept: string;
  seats: number;
  operatingHours: number;
  dailyRevenue: number;
  coversServed: number;
  diningDurationMins: number;
  fohHours: number;
  bohHours: number;
  blendedWage: number;
  foodCogs: number;
  entreesPlated: number;
  kitchenCookHours: number;
  dailyFoodWaste: number;
  foodPurchases: number;
}

const PRESETS: Record<string, RestaurantPreset> = {
  casual_dining: {
    name: "Casual Dining",
    concept: "High-Volume American / Italian Bistro",
    seats: 120,
    operatingHours: 10,
    dailyRevenue: 8400,
    coversServed: 260,
    diningDurationMins: 58,
    fohHours: 48,
    bohHours: 42,
    blendedWage: 17.5,
    foodCogs: 2450,
    entreesPlated: 320,
    kitchenCookHours: 32,
    dailyFoodWaste: 110,
    foodPurchases: 2550,
  },
  fine_dining: {
    name: "Fine Dining",
    concept: "Upscale Tasting Menu & Wine Bar",
    seats: 64,
    operatingHours: 5,
    dailyRevenue: 7200,
    coversServed: 82,
    diningDurationMins: 105,
    fohHours: 36,
    bohHours: 40,
    blendedWage: 21.0,
    foodCogs: 1950,
    entreesPlated: 95,
    kitchenCookHours: 30,
    dailyFoodWaste: 85,
    foodPurchases: 2050,
  },
  fast_casual: {
    name: "Fast Casual QSR",
    concept: "Counter-Service Bowl / Burger Concept",
    seats: 48,
    operatingHours: 13,
    dailyRevenue: 6200,
    coversServed: 410,
    diningDurationMins: 24,
    fohHours: 32,
    bohHours: 36,
    blendedWage: 15.5,
    foodCogs: 1720,
    entreesPlated: 440,
    kitchenCookHours: 26,
    dailyFoodWaste: 70,
    foodPurchases: 1800,
  },
  gastropub: {
    name: "Gastropub & Bar",
    concept: "Craft Beer & Kitchen Taphouse",
    seats: 96,
    operatingHours: 8,
    dailyRevenue: 5900,
    coversServed: 195,
    diningDurationMins: 65,
    fohHours: 35,
    bohHours: 28,
    blendedWage: 16.8,
    foodCogs: 1680,
    entreesPlated: 210,
    kitchenCookHours: 22,
    dailyFoodWaste: 95,
    foodPurchases: 1780,
  },
};

export function RestaurantProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("revpash_seating");
  const [copied, setCopied] = useState(false);

  // Mode 1: RevPASH & Seating Dynamics
  const [seats, setSeats] = useState(120);
  const [operatingHours, setOperatingHours] = useState(10);
  const [dailyRevenue, setDailyRevenue] = useState(8400);
  const [coversServed, setCoversServed] = useState(260);
  const [diningDurationMins, setDiningDurationMins] = useState(58);

  // Mode 2: Labor Cost & Prime Cost
  const [fohHours, setFohHours] = useState(48);
  const [bohHours, setBohHours] = useState(42);
  const [blendedWage, setBlendedWage] = useState(17.5);
  const [foodCogs, setFoodCogs] = useState(2450);

  // Mode 3: Kitchen Velocity & Waste Loss
  const [entreesPlated, setEntreesPlated] = useState(320);
  const [kitchenCookHours, setKitchenCookHours] = useState(32);
  const [dailyFoodWaste, setDailyFoodWaste] = useState(110);
  const [foodPurchases, setFoodPurchases] = useState(2550);

  // Calculations: Mode 1
  const revpashStats = useMemo(() => {
    const seatHours = Math.max(1, seats * operatingHours);
    const revpash = dailyRevenue / seatHours;
    const tableTurns = seats > 0 ? coversServed / seats : 0;
    const avgCheck = coversServed > 0 ? dailyRevenue / coversServed : 0;
    const totalMinutesSold = coversServed * diningDurationMins;
    const totalMinutesAvailable = seatHours * 60;
    const seatOccupancyPct = Math.min(100, Math.max(0, (totalMinutesSold / totalMinutesAvailable) * 100));

    return {
      seatHours,
      revpash,
      tableTurns,
      avgCheck,
      seatOccupancyPct,
    };
  }, [seats, operatingHours, dailyRevenue, coversServed, diningDurationMins]);

  // Calculations: Mode 2
  const laborStats = useMemo(() => {
    const totalLaborHours = fohHours + bohHours;
    const totalPayroll = totalLaborHours * blendedWage;
    const laborCostPct = dailyRevenue > 0 ? (totalPayroll / dailyRevenue) * 100 : 0;
    const foodCogsPct = dailyRevenue > 0 ? (foodCogs / dailyRevenue) * 100 : 0;
    const primeCost = totalPayroll + foodCogs;
    const primeCostPct = dailyRevenue > 0 ? (primeCost / dailyRevenue) * 100 : 0;
    const splh = totalLaborHours > 0 ? dailyRevenue / totalLaborHours : 0;
    const grossMarginAfterPrime = dailyRevenue - primeCost;

    return {
      totalLaborHours,
      totalPayroll,
      laborCostPct,
      foodCogsPct,
      primeCost,
      primeCostPct,
      splh,
      grossMarginAfterPrime,
    };
  }, [fohHours, bohHours, blendedWage, foodCogs, dailyRevenue]);

  // Calculations: Mode 3
  const kitchenStats = useMemo(() => {
    const entreesPerCookHour = kitchenCookHours > 0 ? entreesPlated / kitchenCookHours : 0;
    const avgMinutesPerEntree = entreesPerCookHour > 0 ? 60 / entreesPerCookHour : 0;
    const foodWastePct = foodPurchases > 0 ? (dailyFoodWaste / foodPurchases) * 100 : 0;
    const wasteCostPerCover = coversServed > 0 ? dailyFoodWaste / coversServed : 0;

    return {
      entreesPerCookHour,
      avgMinutesPerEntree,
      foodWastePct,
      wasteCostPerCover,
    };
  }, [kitchenCookHours, entreesPlated, dailyFoodWaste, foodPurchases, coversServed]);

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setSeats(p.seats);
    setOperatingHours(p.operatingHours);
    setDailyRevenue(p.dailyRevenue);
    setCoversServed(p.coversServed);
    setDiningDurationMins(p.diningDurationMins);
    setFohHours(p.fohHours);
    setBohHours(p.bohHours);
    setBlendedWage(p.blendedWage);
    setFoodCogs(p.foodCogs);
    setEntreesPlated(p.entreesPlated);
    setKitchenCookHours(p.kitchenCookHours);
    setDailyFoodWaste(p.dailyFoodWaste);
    setFoodPurchases(p.foodPurchases);
  };

  const copyReport = () => {
    const text = `### Restaurant Productivity & RevPASH Audit Report
**Operating Mode:** ${mode}
**Daily Gross Revenue:** $${dailyRevenue.toLocaleString()}
**Dining Capacity:** ${seats} seats | ${operatingHours} operating hours (${revpashStats.seatHours} seat-hours)

#### 1. Seating & RevPASH Dynamics
- **RevPASH:** $${revpashStats.revpash.toFixed(2)} / seat-hour
- **Daily Table Turns:** ${revpashStats.tableTurns.toFixed(2)} turns
- **Average Guest Check:** $${revpashStats.avgCheck.toFixed(2)}
- **Seat Occupancy Rate:** ${revpashStats.seatOccupancyPct.toFixed(1)}%

#### 2. Labor & Prime Cost Financials
- **Total Labor Cost:** $${laborStats.totalPayroll.toFixed(2)} (${laborStats.laborCostPct.toFixed(1)}% of sales)
- **Food & Beverage COGS:** $${foodCogs.toFixed(2)} (${laborStats.foodCogsPct.toFixed(1)}% of sales)
- **Prime Cost:** $${laborStats.primeCost.toFixed(2)} (${laborStats.primeCostPct.toFixed(1)}% target < 60%)
- **Sales Per Labor Hour (SPLH):** $${laborStats.splh.toFixed(2)} / hour
- **Gross Margin After Prime:** $${laborStats.grossMarginAfterPrime.toFixed(2)}

#### 3. Kitchen Output & Waste Control
- **Ticket Velocity:** ${kitchenStats.entreesPerCookHour.toFixed(1)} entrees / cook-hour
- **Food Spoilage & Plate Waste:** $${dailyFoodWaste.toFixed(2)} (${kitchenStats.foodWastePct.toFixed(1)}% of purchases)
*Generated via productivitycalculator.work/calculator/restaurant*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-2xl space-y-8 font-body">
      {/* Top Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <UtensilsCrossed className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground tracking-tight">
                Restaurant RevPASH &amp; Labor Calculator
              </h2>
              <p className="text-xs text-muted-foreground">
                Hospitality revenue engineering, Cornell RevPASH standards &amp; prime cost analyzer
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
          onClick={() => setMode("revpash_seating")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "revpash_seating"
              ? "bg-orange-500/15 border-orange-500/60 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>1. RevPASH &amp; Seating Turns</span>
        </button>

        <button
          onClick={() => setMode("labor_prime_cost")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "labor_prime_cost"
              ? "bg-cyan-500/15 border-cyan-500/60 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>2. Labor Cost &amp; Prime Cost</span>
        </button>

        <button
          onClick={() => setMode("kitchen_velocity")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "kitchen_velocity"
              ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>3. Kitchen Velocity &amp; Waste</span>
        </button>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-muted/20 border border-border/50">
        {mode === "revpash_seating" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Daily Food &amp; Beverage Revenue ($)</span>
                <span className="font-mono text-orange-400 font-bold">${dailyRevenue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="30000"
                step="100"
                value={dailyRevenue}
                onChange={(e) => setDailyRevenue(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <input
                type="number"
                value={dailyRevenue}
                onChange={(e) => setDailyRevenue(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Dining Room Seats</span>
                <span className="font-mono text-orange-400 font-bold">{seats} seats</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="2"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Daily Operating Service Hours</span>
                <span className="font-mono text-orange-400 font-bold">{operatingHours} hrs</span>
              </div>
              <input
                type="range"
                min="3"
                max="18"
                step="0.5"
                value={operatingHours}
                onChange={(e) => setOperatingHours(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <input
                type="number"
                value={operatingHours}
                onChange={(e) => setOperatingHours(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Daily Total Covers Served</span>
                <span className="font-mono text-orange-400 font-bold">{coversServed} guests</span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="5"
                value={coversServed}
                onChange={(e) => setCoversServed(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <input
                type="number"
                value={coversServed}
                onChange={(e) => setCoversServed(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Average Dining Duration (Minutes per Table)</span>
                <span className="font-mono text-orange-400 font-bold">{diningDurationMins} mins</span>
              </div>
              <input
                type="range"
                min="15"
                max="150"
                step="1"
                value={diningDurationMins}
                onChange={(e) => setDiningDurationMins(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          </>
        )}

        {mode === "labor_prime_cost" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Front-of-House (FOH) Hours</span>
                <span className="font-mono text-cyan-400 font-bold">{fohHours} hrs</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="1"
                value={fohHours}
                onChange={(e) => setFohHours(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <input
                type="number"
                value={fohHours}
                onChange={(e) => setFohHours(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Back-of-House (BOH) Hours</span>
                <span className="font-mono text-cyan-400 font-bold">{bohHours} hrs</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="1"
                value={bohHours}
                onChange={(e) => setBohHours(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <input
                type="number"
                value={bohHours}
                onChange={(e) => setBohHours(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Blended Hourly Wage &amp; Taxes ($/hr)</span>
                <span className="font-mono text-cyan-400 font-bold">${blendedWage.toFixed(2)}/hr</span>
              </div>
              <input
                type="range"
                min="12"
                max="35"
                step="0.25"
                value={blendedWage}
                onChange={(e) => setBlendedWage(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <input
                type="number"
                value={blendedWage}
                onChange={(e) => setBlendedWage(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Daily Food &amp; Beverage COGS ($)</span>
                <span className="font-mono text-cyan-400 font-bold">${foodCogs.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="12000"
                step="50"
                value={foodCogs}
                onChange={(e) => setFoodCogs(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <input
                type="number"
                value={foodCogs}
                onChange={(e) => setFoodCogs(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500"
              />
            </div>
          </>
        )}

        {mode === "kitchen_velocity" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Total Entrees Plated &amp; Served</span>
                <span className="font-mono text-emerald-400 font-bold">{entreesPlated} entrees</span>
              </div>
              <input
                type="range"
                min="30"
                max="800"
                step="5"
                value={entreesPlated}
                onChange={(e) => setEntreesPlated(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={entreesPlated}
                onChange={(e) => setEntreesPlated(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Direct Kitchen Cook Line Hours</span>
                <span className="font-mono text-emerald-400 font-bold">{kitchenCookHours} hrs</span>
              </div>
              <input
                type="range"
                min="8"
                max="80"
                step="1"
                value={kitchenCookHours}
                onChange={(e) => setKitchenCookHours(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={kitchenCookHours}
                onChange={(e) => setKitchenCookHours(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Daily Food Waste &amp; Plate Loss ($)</span>
                <span className="font-mono text-emerald-400 font-bold">${dailyFoodWaste}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={dailyFoodWaste}
                onChange={(e) => setDailyFoodWaste(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={dailyFoodWaste}
                onChange={(e) => setDailyFoodWaste(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Daily Food Ingredient Purchases ($)</span>
                <span className="font-mono text-emerald-400 font-bold">${foodPurchases.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="50"
                value={foodPurchases}
                onChange={(e) => setFoodPurchases(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={foodPurchases}
                onChange={(e) => setFoodPurchases(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>
          </>
        )}
      </div>

      {/* Primary KPI Results Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Cornell RevPASH
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-orange-400">
            ${revpashStats.revpash.toFixed(2)}
          </div>
          <div className="text-[11px] text-muted-foreground">per seat-hour</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Prime Cost %
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-mono ${
            laborStats.primeCostPct <= 60 ? "text-emerald-400" : "text-rose-400"
          }`}>
            {laborStats.primeCostPct.toFixed(1)}%
          </div>
          <div className="text-[11px] text-muted-foreground">Target &lt; 60.0%</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Table Turn Rate
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-400">
            {revpashStats.tableTurns.toFixed(2)}x
          </div>
          <div className="text-[11px] text-muted-foreground">turns per seat/day</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Sales / Labor Hour
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-indigo-400">
            ${laborStats.splh.toFixed(1)}
          </div>
          <div className="text-[11px] text-muted-foreground">NRA target: $65 - $110</div>
        </div>
      </div>

      {/* Secondary Detailed Financial Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-card border border-border/50 text-xs">
        <div>
          <span className="text-muted-foreground block">Labor Cost %</span>
          <span className="font-mono font-semibold text-foreground">
            {laborStats.laborCostPct.toFixed(1)}% (${laborStats.totalPayroll.toFixed(0)})
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Avg Guest Check</span>
          <span className="font-mono font-semibold text-foreground">
            ${revpashStats.avgCheck.toFixed(2)} / cover
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Kitchen Ticket Speed</span>
          <span className="font-mono font-semibold text-foreground">
            {kitchenStats.entreesPerCookHour.toFixed(1)} entrees/cook-hr
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Plate Waste Ratio</span>
          <span className="font-mono font-semibold text-foreground">
            {kitchenStats.foodWastePct.toFixed(1)}% of purchases
          </span>
        </div>
      </div>

      {/* Action Footer & Export Report */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Real-time hospitality benchmarks aligned with Cornell &amp; NRA standards</span>
        </div>

        <button
          onClick={copyReport}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Report Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Restaurant Audit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default RestaurantProductivityCalculator;
