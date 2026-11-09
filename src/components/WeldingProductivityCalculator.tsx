/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 WeldingProductivityCalculator 交互组件
 * [POS]: src/components 的工业焊接与金属构件制造专属生产力计算引擎，承接 /calculator/welding 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  Zap,
  Gauge,
  Sliders,
  DollarSign,
  Copy,
  Check,
  Building,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type CalcMode = "deposition" | "joint" | "cost";

interface WeldingProcessSpec {
  name: string;
  efficiency: number; // Deposition efficiency (0-1)
  defaultArcFactor: number; // Operating factor (0-1)
  typicalDepRate: number; // lbs/hr at standard arc
  shieldingGasCostPerHour: number; // $/hr
}

const WELDING_PROCESSES: Record<string, WeldingProcessSpec> = {
  gmaw_mig: {
    name: "GMAW / MIG (Solid Wire)",
    efficiency: 0.93,
    defaultArcFactor: 0.40,
    typicalDepRate: 7.5,
    shieldingGasCostPerHour: 4.20,
  },
  fcaw_flux: {
    name: "FCAW (Gas-Shielded Flux-Cored)",
    efficiency: 0.85,
    defaultArcFactor: 0.45,
    typicalDepRate: 10.5,
    shieldingGasCostPerHour: 4.50,
  },
  smaw_stick: {
    name: "SMAW (Shielded Metal Arc / Stick)",
    efficiency: 0.65,
    defaultArcFactor: 0.22,
    typicalDepRate: 4.5,
    shieldingGasCostPerHour: 0.0,
  },
  saw_submerged: {
    name: "SAW (Submerged Arc Automatic)",
    efficiency: 0.99,
    defaultArcFactor: 0.70,
    typicalDepRate: 22.0,
    shieldingGasCostPerHour: 5.50,
  },
  gtaw_tig: {
    name: "GTAW / TIG (Gas Tungsten Arc)",
    efficiency: 0.98,
    defaultArcFactor: 0.25,
    typicalDepRate: 2.8,
    shieldingGasCostPerHour: 6.80,
  },
};

export function WeldingProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("deposition");
  const [copied, setCopied] = useState(false);

  // --- Mode 1: Deposition Rate & Operating Factor Inputs ---
  const [selectedProcess, setSelectedProcess] = useState("fcaw_flux");
  const [wireFeedSpeed, setWireFeedSpeed] = useState(320); // Inches per minute
  const [wireDiameter, setWireDiameter] = useState("0.045"); // inches
  const [operatingFactor, setOperatingFactor] = useState(45); // % arc-on time
  const [shiftHours, setShiftHours] = useState(8);

  // --- Mode 2: Joint Volume & Filler Metal Inputs ---
  const [jointType, setJointType] = useState("fillet"); // 'fillet' | 'single_v'
  const [filletLegSize, setFilletLegSize] = useState(0.3125); // 5/16" in inches (0.3125)
  const [plateThickness, setPlateThickness] = useState(0.5); // inches for groove
  const [bevelAngle, setBevelAngle] = useState(60); // degrees
  const [totalLinearFeet, setTotalLinearFeet] = useState(250); // ft of weld

  // --- Mode 3: Fabrication Labor & Cost per Foot Inputs ---
  const [welderHourlyWage, setWelderHourlyWage] = useState(52.0); // Fully loaded $/hr
  const [travelSpeed, setTravelSpeed] = useState(14.0); // Inches Per Minute (IPM)
  const [wireCostPerPound, setWireCostPerPound] = useState(3.40); // $/lb

  // --- Process Constants ---
  const procData = WELDING_PROCESSES[selectedProcess];

  // Wire weight per inch constants (Carbon steel, 0.283 lb/in³)
  const WIRE_WEIGHT_PER_INCH: Record<string, number> = {
    "0.035": 0.000272,
    "0.045": 0.000450,
    "0.052": 0.000600,
    "0.0625": 0.000868, // 1/16"
  };

  // --- Mode 1 Calculations ---
  const depositionRateLbsPerHour = useMemo(() => {
    const weightPerInch = WIRE_WEIGHT_PER_INCH[wireDiameter] || 0.000450;
    // lbs/min = WFS (in/min) * weight/in * efficiency
    // lbs/hr = lbs/min * 60
    const rawLbsPerHour = wireFeedSpeed * weightPerInch * 60 * procData.efficiency;
    return Number(rawLbsPerHour.toFixed(2));
  }, [wireFeedSpeed, wireDiameter, procData]);

  const dailyDepositedLbs = useMemo(() => {
    const arcHours = shiftHours * (operatingFactor / 100);
    return Number((depositionRateLbsPerHour * arcHours).toFixed(1));
  }, [depositionRateLbsPerHour, shiftHours, operatingFactor]);

  const annualDepositedLbs = useMemo(() => {
    return Math.round(dailyDepositedLbs * 240); // 240 shop days/yr
  }, [dailyDepositedLbs]);

  // --- Mode 2 Calculations ---
  const { theoreticalWeightLbs, requiredPurchasedLbs } = useMemo(() => {
    const density = 0.283; // lb/in³ for carbon steel
    let crossSectionAreaSqIn = 0;

    if (jointType === "fillet") {
      // Triangle area: 0.5 * leg * leg
      crossSectionAreaSqIn = 0.5 * Math.pow(filletLegSize, 2);
    } else {
      // Single-V Butt: thickness * thickness * tan(angle/2 in rad) + 1/16" root face
      const rad = (bevelAngle / 2) * (Math.PI / 180);
      crossSectionAreaSqIn = Math.pow(plateThickness, 2) * Math.tan(rad) + 0.0625 * plateThickness;
    }

    // Volume in in³ = Area (in²) * (Linear Feet * 12 in/ft)
    const volumeInCuIn = crossSectionAreaSqIn * (totalLinearFeet * 12);
    const theoWt = volumeInCuIn * density;
    const reqPurchased = theoWt / procData.efficiency;

    return {
      theoreticalWeightLbs: Number(theoWt.toFixed(1)),
      requiredPurchasedLbs: Number(reqPurchased.toFixed(1)),
    };
  }, [jointType, filletLegSize, plateThickness, bevelAngle, totalLinearFeet, procData]);

  // --- Mode 3 Calculations ---
  const { costPerFoot, laborHoursTotal, laborCostPct, totalJobCost } = useMemo(() => {
    // Travel speed in feet per hour = (IPM * 60) / 12 = IPM * 5
    const feetPerHourArcTime = travelSpeed * 5;
    // Effective travel speed accounting for operating factor
    const effectiveFeetPerHour = feetPerHourArcTime * (operatingFactor / 100);
    const laborHrs = effectiveFeetPerHour > 0 ? totalLinearFeet / effectiveFeetPerHour : 0;

    const totalLaborCost = laborHrs * welderHourlyWage;
    const totalWireCost = requiredPurchasedLbs * wireCostPerPound;
    const arcHours = laborHrs * (operatingFactor / 100);
    const totalGasCost = arcHours * procData.shieldingGasCostPerHour;

    const totalCost = totalLaborCost + totalWireCost + totalGasCost;
    const costPerFt = totalLinearFeet > 0 ? totalCost / totalLinearFeet : 0;
    const laborPct = totalCost > 0 ? (totalLaborCost / totalCost) * 100 : 80;

    return {
      costPerFoot: Number(costPerFt.toFixed(2)),
      laborHoursTotal: Number(laborHrs.toFixed(1)),
      laborCostPct: Number(laborPct.toFixed(1)),
      totalJobCost: Math.round(totalCost),
    };
  }, [
    travelSpeed,
    operatingFactor,
    totalLinearFeet,
    welderHourlyWage,
    requiredPurchasedLbs,
    wireCostPerPound,
    procData,
  ]);

  // --- Presets ---
  const applyPreset = (key: string) => {
    if (key === "structural") {
      setMode("deposition");
      setSelectedProcess("fcaw_flux");
      setWireDiameter("0.045");
      setWireFeedSpeed(340);
      setOperatingFactor(45);
      setJointType("fillet");
      setFilletLegSize(0.3125); // 5/16"
      setTotalLinearFeet(300);
      setTravelSpeed(13);
    } else if (key === "pipe") {
      setMode("joint");
      setSelectedProcess("smaw_stick");
      setOperatingFactor(25);
      setJointType("single_v");
      setPlateThickness(0.375); // 3/8" wall
      setBevelAngle(60);
      setTotalLinearFeet(120);
      setTravelSpeed(7);
    } else if (key === "sheet_metal") {
      setMode("cost");
      setSelectedProcess("gmaw_mig");
      setWireDiameter("0.035");
      setWireFeedSpeed(380);
      setOperatingFactor(40);
      setJointType("fillet");
      setFilletLegSize(0.1875); // 3/16"
      setTotalLinearFeet(500);
      setTravelSpeed(18);
    } else if (key === "sub_arc") {
      setMode("deposition");
      setSelectedProcess("saw_submerged");
      setWireDiameter("0.0625");
      setWireFeedSpeed(220);
      setOperatingFactor(70);
      setJointType("single_v");
      setPlateThickness(1.0);
      setBevelAngle(50);
      setTotalLinearFeet(200);
      setTravelSpeed(22);
    }
  };

  const copyReport = () => {
    let report = "";
    if (mode === "deposition") {
      report = `### Welding Deposition & Operating Factor Report (AWS D1.1)
- **Welding Process**: ${procData.name}
- **Wire Specification**: ${wireDiameter}" diameter @ ${wireFeedSpeed} IPM
- **Deposition Efficiency**: ${(procData.efficiency * 100).toFixed(0)}%
- **Arc-On Operating Factor**: ${operatingFactor}%
- **Hourly Deposition Rate**: ${depositionRateLbsPerHour} lbs / arc hour
- **Daily Weld Metal Output**: ${dailyDepositedLbs} lbs / ${shiftHours}h shift
- **Annual Shop Output**: ${annualDepositedLbs.toLocaleString()} lbs / year
- *Source: ProductivityCalculator.work Industrial Welding Suite*`;
    } else if (mode === "joint") {
      report = `### Welding Joint Volume & Filler Metal Report
- **Joint Geometry**: ${jointType === "fillet" ? `${filletLegSize}" Fillet Weld` : `${plateThickness}" Single-V Butt (${bevelAngle}°)`}
- **Total Linear Welds**: ${totalLinearFeet} linear feet
- **Theoretical Weld Metal**: ${theoreticalWeightLbs} lbs (Carbon Steel @ 0.283 lb/in³)
- **Process Spatter & Slag**: ${(100 - procData.efficiency * 100).toFixed(0)}% loss
- **Required Filler Metal Purchase**: ${requiredPurchasedLbs} lbs
- *Source: ProductivityCalculator.work Industrial Welding Suite*`;
    } else {
      report = `### Welding Fabrication Labor & Linear Cost Report
- **Welding Process**: ${procData.name}
- **Total Linear Feet**: ${totalLinearFeet} ft
- **Travel Speed & Arc Factor**: ${travelSpeed} IPM @ ${operatingFactor}% arc time
- **Welder Loaded Rate**: $${welderHourlyWage.toFixed(2)} / hr
- **Total Labor Hours**: ${laborHoursTotal} man-hours
- **Labor Share of Cost**: ${laborCostPct}% (Industry avg: 75%–85%)
- **Calculated Unit Cost**: $${costPerFoot.toFixed(2)} / linear foot
- **Total Job Fabrication Cost**: $${totalJobCost.toLocaleString()}
- *Source: ProductivityCalculator.work Industrial Welding Suite*`;
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-md">
      {/* Header with Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display">
              Industrial Welding Productivity Calculator
            </h2>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Calculate filler metal deposition rate, arc-on operating factor, joint filler consumption, and fabrication cost per linear foot.
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex bg-muted/60 p-1 rounded-xl border border-border text-xs font-medium">
          <button
            onClick={() => setMode("deposition")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === "deposition"
                ? "bg-amber-500 text-black font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Deposition Rate
          </button>
          <button
            onClick={() => setMode("joint")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === "joint"
                ? "bg-amber-500 text-black font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Joint Volume
          </button>
          <button
            onClick={() => setMode("cost")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === "cost"
                ? "bg-amber-500 text-black font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Labor &amp; Cost / Ft
          </button>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 text-xs">
        <span className="text-muted-foreground whitespace-nowrap">Shop Presets:</span>
        <button
          onClick={() => applyPreset("structural")}
          className="px-2.5 py-1 rounded-md bg-muted/40 hover:bg-muted text-foreground border border-border/60 transition whitespace-nowrap"
        >
          Structural Steel (FCAW)
        </button>
        <button
          onClick={() => applyPreset("pipe")}
          className="px-2.5 py-1 rounded-md bg-muted/40 hover:bg-muted text-foreground border border-border/60 transition whitespace-nowrap"
        >
          Heavy Pipe Butt (Stick)
        </button>
        <button
          onClick={() => applyPreset("sheet_metal")}
          className="px-2.5 py-1 rounded-md bg-muted/40 hover:bg-muted text-foreground border border-border/60 transition whitespace-nowrap"
        >
          Sheet Metal (MIG)
        </button>
        <button
          onClick={() => applyPreset("sub_arc")}
          className="px-2.5 py-1 rounded-md bg-muted/40 hover:bg-muted text-foreground border border-border/60 transition whitespace-nowrap"
        >
          Vessel 1" Plate (SAW)
        </button>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Left Column: Form Controls */}
        <div className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>AWS Welding Process</span>
              <span className="text-amber-500 text-xs font-mono">
                Efficiency: {(procData.efficiency * 100).toFixed(0)}%
              </span>
            </label>
            <select
              value={selectedProcess}
              onChange={(e) => {
                setSelectedProcess(e.target.value);
                setOperatingFactor(Math.round(WELDING_PROCESSES[e.target.value].defaultArcFactor * 100));
              }}
              className="w-full mt-1.5 p-2.5 rounded-xl bg-background border border-border text-xs md:text-sm font-medium focus:ring-1 focus:ring-amber-500"
            >
              {Object.entries(WELDING_PROCESSES).map(([key, proc]) => (
                <option key={key} value={key}>
                  {proc.name}
                </option>
              ))}
            </select>
          </div>

          {mode === "deposition" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Wire Diameter</label>
                  <select
                    value={wireDiameter}
                    onChange={(e) => setWireDiameter(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  >
                    <option value="0.035">0.035" (0.9 mm)</option>
                    <option value="0.045">0.045" (1.2 mm)</option>
                    <option value="0.052">0.052" (1.4 mm)</option>
                    <option value="0.0625">1/16" (1.6 mm)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Shift Hours</label>
                  <input
                    type="number"
                    min="4"
                    max="14"
                    value={shiftHours}
                    onChange={(e) => setShiftHours(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Wire Feed Speed (WFS)</span>
                  <span className="text-amber-400 font-mono">{wireFeedSpeed} IPM</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="650"
                  step="10"
                  value={wireFeedSpeed}
                  onChange={(e) => setWireFeedSpeed(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Arc-On Operating Factor (%)</span>
                  <span className="text-amber-400 font-mono">{operatingFactor}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="85"
                  step="5"
                  value={operatingFactor}
                  onChange={(e) => setOperatingFactor(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500 cursor-pointer"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Manual Stick: 15–25% • Semi-Auto MIG: 35–50% • Sub-Arc / Robot: 65–80%
                </p>
              </div>
            </>
          )}

          {mode === "joint" && (
            <>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Joint Geometry Type</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => setJointType("fillet")}
                    className={`p-2 rounded-lg border text-xs font-semibold ${
                      jointType === "fillet"
                        ? "bg-amber-500 text-black border-amber-500"
                        : "bg-background text-muted-foreground border-border"
                    }`}
                  >
                    Fillet Weld (T-Joint)
                  </button>
                  <button
                    onClick={() => setJointType("single_v")}
                    className={`p-2 rounded-lg border text-xs font-semibold ${
                      jointType === "single_v"
                        ? "bg-amber-500 text-black border-amber-500"
                        : "bg-background text-muted-foreground border-border"
                    }`}
                  >
                    Single-V Groove Butt
                  </button>
                </div>
              </div>

              {jointType === "fillet" ? (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Fillet Leg Size</label>
                  <select
                    value={filletLegSize}
                    onChange={(e) => setFilletLegSize(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  >
                    <option value={0.1875}>3/16" (4.8 mm)</option>
                    <option value={0.25}>1/4" (6.4 mm)</option>
                    <option value={0.3125}>5/16" (7.9 mm)</option>
                    <option value={0.375}>3/8" (9.5 mm)</option>
                    <option value={0.5}>1/2" (12.7 mm)</option>
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Plate Thickness (in)</label>
                    <input
                      type="number"
                      step="0.125"
                      min="0.25"
                      max="3.0"
                      value={plateThickness}
                      onChange={(e) => setPlateThickness(Number(e.target.value))}
                      className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Bevel Angle (°)</label>
                    <input
                      type="number"
                      min="30"
                      max="75"
                      value={bevelAngle}
                      onChange={(e) => setBevelAngle(Number(e.target.value))}
                      className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Total Linear Feet of Weld</span>
                  <span className="text-amber-400 font-mono">{totalLinearFeet} ft</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1500"
                  step="10"
                  value={totalLinearFeet}
                  onChange={(e) => setTotalLinearFeet(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500 cursor-pointer"
                />
              </div>
            </>
          )}

          {mode === "cost" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Welder Loaded Wage ($/hr)</label>
                  <input
                    type="number"
                    min="25"
                    max="120"
                    value={welderHourlyWage}
                    onChange={(e) => setWelderHourlyWage(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Filler Wire Cost ($/lb)</label>
                  <input
                    type="number"
                    step="0.2"
                    min="1.5"
                    max="20"
                    value={wireCostPerPound}
                    onChange={(e) => setWireCostPerPound(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-background border border-border text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Arc Travel Speed (Inches Per Minute)</span>
                  <span className="text-amber-400 font-mono">{travelSpeed} IPM</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="35"
                  step="1"
                  value={travelSpeed}
                  onChange={(e) => setTravelSpeed(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Arc-On Operating Factor (%)</span>
                  <span className="text-amber-400 font-mono">{operatingFactor}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="80"
                  step="5"
                  value={operatingFactor}
                  onChange={(e) => setOperatingFactor(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-500 cursor-pointer"
                />
              </div>
            </>
          )}
        </div>

        {/* Right Column: Dynamic KPI Display Card */}
        <div className="p-6 rounded-2xl bg-card/60 border border-border flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Welding Shop KPI Scorecard
              </span>
              <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                AWS Standards
              </span>
            </div>

            {mode === "deposition" && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-background/80 border border-border/80">
                  <div className="text-xs text-muted-foreground">Hourly Deposition Rate</div>
                  <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">
                    {depositionRateLbsPerHour}{" "}
                    <span className="text-xs text-muted-foreground font-sans">lbs / arc hour</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    At {(procData.efficiency * 100).toFixed(0)}% process deposition efficiency.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Daily Deposited Metal</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      {dailyDepositedLbs} lbs / shift
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Annual Output (1 Arc)</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      {annualDepositedLbs.toLocaleString()} lbs
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground">
                  Operating Factor note: Increasing arc-on time from 30% to 45% yields a{" "}
                  <strong className="text-amber-400">+50% production gain</strong> without hiring additional welders.
                </div>
              </div>
            )}

            {mode === "joint" && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-background/80 border border-border/80">
                  <div className="text-xs text-muted-foreground">Purchased Filler Metal Required</div>
                  <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">
                    {requiredPurchasedLbs}{" "}
                    <span className="text-xs text-muted-foreground font-sans">lbs of Wire / Rod</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Theoretical joint metal: {theoreticalWeightLbs} lbs ({(100 - procData.efficiency * 100).toFixed(0)}% spatter &amp; slag allowance)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Linear Foot Volume</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      {(theoreticalWeightLbs / totalLinearFeet).toFixed(3)} lb/ft
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Estimated Wire Cost</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      ${(requiredPurchasedLbs * wireCostPerPound).toFixed(0)}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground">
                  Over-welding warning: Increasing a fillet leg by just 1/16" (e.g. 5/16" to 3/8") requires{" "}
                  <strong className="text-rose-400">+44% more filler metal</strong> and 44% more arc time.
                </div>
              </div>
            )}

            {mode === "cost" && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-background/80 border border-border/80">
                  <div className="text-xs text-muted-foreground">Total Cost Per Linear Foot</div>
                  <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">
                    ${costPerFoot}{" "}
                    <span className="text-xs text-muted-foreground font-sans">/ linear foot</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Total Job Cost: ${totalJobCost.toLocaleString()} across {totalLinearFeet} ft.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Total Labor Hours</span>
                    <div className="font-bold font-mono text-foreground mt-1 text-sm">
                      {laborHoursTotal} man-hours
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground">Labor Cost Share</span>
                    <div className="font-bold font-mono text-amber-400 mt-1 text-sm">
                      {laborCostPct}% of cost
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground">
                  Economic takeaway: Because labor represents {laborCostPct}% of costs, investing in higher deposition wires (FCAW/Metal-Cored) pays for itself rapidly in saved man-hours.
                </div>
              </div>
            )}
          </div>

          {/* Action: Copy Report Button */}
          <div className="pt-4 border-t border-border/60 mt-4">
            <button
              onClick={copyReport}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs md:text-sm transition-all shadow-md active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Report Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Export Welding Job Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeldingProductivityCalculator;
