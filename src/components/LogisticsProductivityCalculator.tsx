/**
 * [INPUT]: 依赖 react 的 useState, useMemo；依赖 lucide-react 图标；依赖 Tailwind CSS
 * [OUTPUT]: 导出 LogisticsProductivityCalculator 组件
 * [POS]: src/components 的仓储与物流人效专属计算器，承接 /calculator/logistics 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Truck,
  Package,
  Clock,
  Boxes,
  Copy,
  Check,
  Sparkles,
  Sliders,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  DollarSign,
  Navigation,
} from "lucide-react";

interface PresetConfig {
  name: string;
  desc: string;
  // Mode 1: Picking & Packing UPH
  unitsProcessed: number;
  directLaborHours: number;
  hourlyWage: number;
  benchmarkUph: number;
  // Mode 2: Order Turnaround
  ordersReceived: number;
  ordersShippedSla: number;
  dockToStockHours: number;
  orderCycleHours: number;
  // Mode 3: Fleet Delivery
  deliveriesCompleted: number;
  activeDrivers: number;
  routeHoursPerDriver: number;
  totalFleetDailyCost: number;
}

const PRESETS: PresetConfig[] = [
  {
    name: "E-Commerce Fulfillment",
    desc: "Fast-moving parcel sortation, batch piece-picking & conveyor packing",
    unitsProcessed: 3200,
    directLaborHours: 20,
    hourlyWage: 21.0,
    benchmarkUph: 150,
    ordersReceived: 1800,
    ordersShippedSla: 1780,
    dockToStockHours: 2.0,
    orderCycleHours: 2.8,
    deliveriesCompleted: 800,
    activeDrivers: 8,
    routeHoursPerDriver: 8,
    totalFleetDailyCost: 2240,
  },
  {
    name: "3PL Bulk & Pallet Warehouse",
    desc: "Heavy case picking, forklift pallet movement & B2B distributor freight",
    unitsProcessed: 1400,
    directLaborHours: 20,
    hourlyWage: 23.5,
    benchmarkUph: 85,
    ordersReceived: 240,
    ordersShippedSla: 235,
    dockToStockHours: 4.5,
    orderCycleHours: 5.0,
    deliveriesCompleted: 180,
    activeDrivers: 4,
    routeHoursPerDriver: 8,
    totalFleetDailyCost: 1440,
  },
  {
    name: "Retail Cross-Docking Hub",
    desc: "Rapid breakdown, dynamic sorting & immediate outbound trailer loading",
    unitsProcessed: 4800,
    directLaborHours: 20,
    hourlyWage: 22.0,
    benchmarkUph: 220,
    ordersReceived: 3200,
    ordersShippedSla: 3180,
    dockToStockHours: 1.2,
    orderCycleHours: 1.5,
    deliveriesCompleted: 1200,
    activeDrivers: 10,
    routeHoursPerDriver: 8,
    totalFleetDailyCost: 3100,
  },
  {
    name: "Cold Chain & Pharma Depot",
    desc: "Temperature-monitored staging, serial verification & validated packout",
    unitsProcessed: 1100,
    directLaborHours: 16,
    hourlyWage: 26.0,
    benchmarkUph: 75,
    ordersReceived: 450,
    ordersShippedSla: 448,
    dockToStockHours: 1.8,
    orderCycleHours: 2.2,
    deliveriesCompleted: 300,
    activeDrivers: 5,
    routeHoursPerDriver: 8,
    totalFleetDailyCost: 1650,
  },
];

export function LogisticsProductivityCalculator() {
  const [activeTab, setActiveTab] = useState<"picking" | "fulfillment" | "fleet">("picking");
  const [copied, setCopied] = useState(false);

  // Mode 1: Warehouse Picking & Packing UPH
  const [unitsProcessed, setUnitsProcessed] = useState<number>(3000);
  const [directLaborHours, setDirectLaborHours] = useState<number>(20);
  const [hourlyWage, setHourlyWage] = useState<number>(22.0);
  const [benchmarkUph, setBenchmarkUph] = useState<number>(130);

  // Mode 2: Fulfillment Turnaround & Cycle Time
  const [ordersReceived, setOrdersReceived] = useState<number>(1600);
  const [ordersShippedSla, setOrdersShippedSla] = useState<number>(1560);
  const [dockToStockHours, setDockToStockHours] = useState<number>(2.5);
  const [orderCycleHours, setOrderCycleHours] = useState<number>(3.0);

  // Mode 3: Fleet Delivery & Unit Shipping Cost
  const [deliveriesCompleted, setDeliveriesCompleted] = useState<number>(750);
  const [activeDrivers, setActiveDrivers] = useState<number>(8);
  const [routeHoursPerDriver, setRouteHoursPerDriver] = useState<number>(8);
  const [totalFleetDailyCost, setTotalFleetDailyCost] = useState<number>(2100);

  // Apply Preset
  const applyPreset = (preset: PresetConfig) => {
    setUnitsProcessed(preset.unitsProcessed);
    setDirectLaborHours(preset.directLaborHours);
    setHourlyWage(preset.hourlyWage);
    setBenchmarkUph(preset.benchmarkUph);
    setOrdersReceived(preset.ordersReceived);
    setOrdersShippedSla(preset.ordersShippedSla);
    setDockToStockHours(preset.dockToStockHours);
    setOrderCycleHours(preset.orderCycleHours);
    setDeliveriesCompleted(preset.deliveriesCompleted);
    setActiveDrivers(preset.activeDrivers);
    setRouteHoursPerDriver(preset.routeHoursPerDriver);
    setTotalFleetDailyCost(preset.totalFleetDailyCost);
  };

  // Calculations for Mode 1
  const m1 = useMemo(() => {
    const safeHours = directLaborHours > 0 ? directLaborHours : 1;
    const safeUnits = unitsProcessed > 0 ? unitsProcessed : 1;
    const actualUph = unitsProcessed / safeHours;
    const attainmentRate = benchmarkUph > 0 ? (actualUph / benchmarkUph) * 100 : 100;
    const totalLaborCost = directLaborHours * hourlyWage;
    const costPerUnit = totalLaborCost / safeUnits;
    const costPer1000 = costPerUnit * 1000;
    const secondsPerUnit = (safeHours * 3600) / safeUnits;

    let rating: { label: string; color: string; desc: string };
    if (attainmentRate >= 110) {
      rating = {
        label: "World-Class Velocity",
        color: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
        desc: "Exceeds standard warehouse labor benchmark by >10%. Lean layout and slotting are optimal.",
      };
    } else if (attainmentRate >= 95) {
      rating = {
        label: "Benchmark Met (Optimal)",
        color: "text-blue-400 bg-blue-950/40 border-blue-800",
        desc: "Meets expected operational throughput with balanced ergonomics and picking speed.",
      };
    } else if (attainmentRate >= 80) {
      rating = {
        label: "Moderate Deficit (-15%)",
        color: "text-amber-400 bg-amber-950/40 border-amber-800",
        desc: "Throughput lag detected. Review aisle congestion, pick-path routing or cart batching.",
      };
    } else {
      rating = {
        label: "Sub-Optimal Bottleneck",
        color: "text-rose-400 bg-rose-950/40 border-rose-800",
        desc: "High idle or transit time. Audit warehouse slotting velocity and deadheading travel.",
      };
    }

    return {
      actualUph,
      attainmentRate,
      totalLaborCost,
      costPerUnit,
      costPer1000,
      secondsPerUnit,
      rating,
    };
  }, [unitsProcessed, directLaborHours, hourlyWage, benchmarkUph]);

  // Calculations for Mode 2
  const m2 = useMemo(() => {
    const safeReceived = ordersReceived > 0 ? ordersReceived : 1;
    const sameDayRate = (ordersShippedSla / safeReceived) * 100;
    const slaGap = Math.max(0, ordersReceived - ordersShippedSla);

    let slaRating: { label: string; color: string };
    if (sameDayRate >= 99.0) {
      slaRating = { label: "Elite Tier (>99.0%)", color: "text-emerald-400" };
    } else if (sameDayRate >= 97.0) {
      slaRating = { label: "Standard SLA (97-99%)", color: "text-blue-400" };
    } else {
      slaRating = { label: "Breached Cutoff (<97%)", color: "text-rose-400" };
    }

    let dockStatus: { label: string; color: string };
    if (dockToStockHours <= 2.0) {
      dockStatus = { label: "Rapid Cross-Dock", color: "text-emerald-400" };
    } else if (dockToStockHours <= 4.0) {
      dockStatus = { label: "Acceptable Inbound", color: "text-blue-400" };
    } else {
      dockStatus = { label: "Receiving Congestion", color: "text-amber-400" };
    }

    return {
      sameDayRate,
      slaGap,
      slaRating,
      dockStatus,
    };
  }, [ordersReceived, ordersShippedSla, dockToStockHours]);

  // Calculations for Mode 3
  const m3 = useMemo(() => {
    const totalFleetHours = activeDrivers * routeHoursPerDriver;
    const safeFleetHours = totalFleetHours > 0 ? totalFleetHours : 1;
    const safeDeliveries = deliveriesCompleted > 0 ? deliveriesCompleted : 1;
    const stopsPerHourPerDriver = deliveriesCompleted / safeFleetHours;
    const deliveriesPerDriver = activeDrivers > 0 ? deliveriesCompleted / activeDrivers : 0;
    const costPerDelivery = totalFleetDailyCost / safeDeliveries;

    let fleetRating: { label: string; color: string };
    if (stopsPerHourPerDriver >= 12) {
      fleetRating = { label: "Dense Urban Routing", color: "text-emerald-400" };
    } else if (stopsPerHourPerDriver >= 8) {
      fleetRating = { label: "Standard Suburban Fleet", color: "text-blue-400" };
    } else {
      fleetRating = { label: "Rural / Heavy Freight", color: "text-amber-400" };
    }

    return {
      totalFleetHours,
      stopsPerHourPerDriver,
      deliveriesPerDriver,
      costPerDelivery,
      fleetRating,
    };
  }, [deliveriesCompleted, activeDrivers, routeHoursPerDriver, totalFleetDailyCost]);

  // Copy Markdown Scorecard
  const copyScorecard = () => {
    const report = `### Logistics & Warehouse Productivity KPI Scorecard
- **Timestamp**: ${new Date().toISOString().split("T")[0]}
- **Mode 1 - Picking Velocity**:
  - Processed Units: ${unitsProcessed.toLocaleString()} units
  - Direct Labor Hours: ${directLaborHours} hrs (Hourly Wage: $${hourlyWage.toFixed(2)})
  - Actual UPH: ${m1.actualUph.toFixed(1)} units/hr (Target: ${benchmarkUph} UPH, ${m1.attainmentRate.toFixed(1)}% Attainment)
  - Unit Labor Cost: $${m1.costPerUnit.toFixed(3)}/unit ($${m1.costPer1000.toFixed(2)} / 1,000 units)
  - Handling Speed: ${m1.secondsPerUnit.toFixed(1)} sec/unit (${m1.rating.label})
- **Mode 2 - Fulfillment Turnaround**:
  - Received vs SLA Shipped: ${ordersReceived.toLocaleString()} / ${ordersShippedSla.toLocaleString()} orders
  - Same-Day Dispatch Rate: ${m2.sameDayRate.toFixed(2)}% (${m2.slaRating.label})
  - Dock-to-Stock Latency: ${dockToStockHours} hrs (${m2.dockStatus.label})
  - Order Processing Cycle: ${orderCycleHours} hrs
- **Mode 3 - Fleet Delivery & Unit Shipping**:
  - Total Stops / Deliveries: ${deliveriesCompleted.toLocaleString()} stops (${activeDrivers} drivers, ${m3.totalFleetHours} total fleet hrs)
  - Route Velocity: ${m3.stopsPerHourPerDriver.toFixed(1)} stops/driver-hr (${m3.fleetRating.label})
  - Stops Per Driver: ${m3.deliveriesPerDriver.toFixed(1)} stops/route
  - Total Fleet Cost: $${totalFleetDailyCost.toLocaleString()} ($${m3.costPerDelivery.toFixed(2)} / stop)

*Generated via ProductivityCalculator.work/calculator/logistics*`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Warehouse &amp; Supply Chain WFM Tool</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Logistics Productivity Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Measure warehouse units per hour (UPH), pick rates, dock-to-stock latency, and fleet delivery costs.
          </p>
        </div>

        <button
          onClick={copyScorecard}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm self-start md:self-center"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          <span>{copied ? "Copied KPI Report" : "Copy WFM Report"}</span>
        </button>
      </div>

      {/* Presets */}
      <div className="pt-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Industry Facility Presets</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="text-left p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all group"
            >
              <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-400 transition-colors truncate">
                {p.name}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Navigation */}
      <div className="flex gap-2 my-6 p-1 bg-slate-950 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab("picking")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === "picking"
              ? "bg-amber-600 text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>1. Picking &amp; Packing (UPH)</span>
        </button>
        <button
          onClick={() => setActiveTab("fulfillment")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === "fulfillment"
              ? "bg-amber-600 text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>2. Turnaround &amp; SLA</span>
        </button>
        <button
          onClick={() => setActiveTab("fleet")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === "fleet"
              ? "bg-amber-600 text-white shadow-lg"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>3. Fleet &amp; Unit Cost</span>
        </button>
      </div>

      {/* Tab 1: Picking & Packing UPH */}
      {activeTab === "picking" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Total Units Picked / Packed</span>
                <span className="font-mono text-amber-400">{unitsProcessed.toLocaleString()} units</span>
              </label>
              <input
                type="number"
                min="10"
                step="50"
                value={unitsProcessed}
                onChange={(e) => setUnitsProcessed(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Total volume handled in shift</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Direct Labor Hours</span>
                <span className="font-mono text-amber-400">{directLaborHours} hrs</span>
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={directLaborHours}
                onChange={(e) => setDirectLaborHours(Math.max(0.1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Cumulative picker/packer hours</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Fully Loaded Hourly Wage ($/hr)</span>
                <span className="font-mono text-amber-400">${hourlyWage.toFixed(2)}/hr</span>
              </label>
              <input
                type="number"
                min="10"
                step="0.5"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Base wage + benefits + overtime</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Facility Target UPH Benchmark</span>
                <span className="font-mono text-amber-400">{benchmarkUph} UPH</span>
              </label>
              <input
                type="number"
                min="20"
                step="5"
                value={benchmarkUph}
                onChange={(e) => setBenchmarkUph(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">WERC standard: 120-150 UPH</span>
            </div>
          </div>

          {/* Mode 1 Output Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Pick Velocity (UPH)</div>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
                {m1.actualUph.toFixed(1)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Units / Man-Hour</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Target Attainment</div>
              <div className="text-2xl font-bold font-mono text-blue-400 mt-1">
                {m1.attainmentRate.toFixed(1)}%
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">vs {benchmarkUph} standard</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Labor Cost / Unit</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                ${m1.costPerUnit.toFixed(3)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">${m1.costPer1000.toFixed(2)} per 1k units</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Pick Interval</div>
              <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
                {m1.secondsPerUnit.toFixed(1)}s
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Sec per finished item</div>
            </div>
          </div>

          {/* Rating Callout */}
          <div className={`p-4 rounded-xl border ${m1.rating.color} flex items-start gap-3`}>
            <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold">{m1.rating.label}</div>
              <div className="text-xs opacity-90 mt-0.5">{m1.rating.desc}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Turnaround & SLA */}
      {activeTab === "fulfillment" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Orders Received Today</span>
                <span className="font-mono text-amber-400">{ordersReceived.toLocaleString()} orders</span>
              </label>
              <input
                type="number"
                min="10"
                step="50"
                value={ordersReceived}
                onChange={(e) => setOrdersReceived(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Customer orders batched for fulfillment</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Orders Dispatched Within SLA</span>
                <span className="font-mono text-amber-400">{ordersShippedSla.toLocaleString()} orders</span>
              </label>
              <input
                type="number"
                min="0"
                step="20"
                value={ordersShippedSla}
                onChange={(e) => setOrdersShippedSla(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Manifested before carrier cutoff window</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Dock-to-Stock Latency (Hours)</span>
                <span className="font-mono text-amber-400">{dockToStockHours} hrs</span>
              </label>
              <input
                type="number"
                min="0.1"
                step="0.2"
                value={dockToStockHours}
                onChange={(e) => setDockToStockHours(Math.max(0.1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Inbound trailer unseal to bin putaway</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Average Order Cycle Time (Hours)</span>
                <span className="font-mono text-amber-400">{orderCycleHours} hrs</span>
              </label>
              <input
                type="number"
                min="0.1"
                step="0.2"
                value={orderCycleHours}
                onChange={(e) => setOrderCycleHours(Math.max(0.1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Order drop to outbound carrier staging</span>
            </div>
          </div>

          {/* Mode 2 Output Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Same-Day Dispatch</div>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
                {m2.sameDayRate.toFixed(1)}%
              </div>
              <div className={`text-[11px] font-medium mt-0.5 ${m2.slaRating.color}`}>
                {m2.slaRating.label}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">SLA Rollover Gap</div>
              <div className="text-2xl font-bold font-mono text-rose-400 mt-1">
                {m2.slaGap.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Orders delayed to next shift</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Dock-to-Stock Status</div>
              <div className="text-2xl font-bold font-mono text-blue-400 mt-1">
                {dockToStockHours}h
              </div>
              <div className={`text-[11px] font-medium mt-0.5 ${m2.dockStatus.color}`}>
                {m2.dockStatus.label}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Cycle Velocity</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                {(ordersShippedSla / Math.max(1, orderCycleHours)).toFixed(0)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Orders dispatched / hour</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Fleet Delivery & Unit Cost */}
      {activeTab === "fleet" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Completed Deliveries / Stops</span>
                <span className="font-mono text-amber-400">{deliveriesCompleted.toLocaleString()} stops</span>
              </label>
              <input
                type="number"
                min="10"
                step="25"
                value={deliveriesCompleted}
                onChange={(e) => setDeliveriesCompleted(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Parcels or freight drops manifested</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Active Delivery Drivers</span>
                <span className="font-mono text-amber-400">{activeDrivers} drivers</span>
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={activeDrivers}
                onChange={(e) => setActiveDrivers(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Active fleet operators on road</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Route Shift Duration (Hours)</span>
                <span className="font-mono text-amber-400">{routeHoursPerDriver} hrs</span>
              </label>
              <input
                type="number"
                min="2"
                step="0.5"
                value={routeHoursPerDriver}
                onChange={(e) => setRouteHoursPerDriver(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Daily on-duty route hours</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Total Fleet Daily Cost ($)</span>
                <span className="font-mono text-amber-400">${totalFleetDailyCost.toLocaleString()}</span>
              </label>
              <input
                type="number"
                min="100"
                step="50"
                value={totalFleetDailyCost}
                onChange={(e) => setTotalFleetDailyCost(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500">Driver wages + fuel + vehicle lease</span>
            </div>
          </div>

          {/* Mode 3 Output Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Driver Stop Velocity</div>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
                {m3.stopsPerHourPerDriver.toFixed(1)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Stops / driver-hour</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Stops per Driver</div>
              <div className="text-2xl font-bold font-mono text-blue-400 mt-1">
                {m3.deliveriesPerDriver.toFixed(0)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Stops / route shift</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Cost per Delivery</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                ${m3.costPerDelivery.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">All-in cost per parcel drop</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Routing Density</div>
              <div className={`text-base font-bold mt-2 truncate ${m3.fleetRating.color}`}>
                {m3.fleetRating.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{m3.totalFleetHours} total fleet hrs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
