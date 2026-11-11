/**
 * [INPUT]: React (useState, useMemo), Next/Link, Lucide icons
 * [OUTPUT]: 导出 BillingUnitsCalculator 交互组件与默认导出
 * [POS]: src/components 的 8 分钟规则计费单元转换、多 CPT 拆分与时薪折算引擎，承接 /calculator/billing-units
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  Calculator,
  Layers,
  Copy,
  Check,
  Plus,
  Trash2,
  RotateCcw,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Mode = "minutes_to_units" | "multi_cpt" | "units_to_hours";
type PayerRule = "cms" | "ama";

interface CptEntry {
  id: number;
  code: string;
  label: string;
  minutes: number;
}

const MINUTE_PRESETS = [15, 23, 38, 45, 53, 55, 60, 75];

const DEFAULT_CPTS: CptEntry[] = [
  { id: 1, code: "97110", label: "Therapeutic Exercise", minutes: 20 },
  { id: 2, code: "97140", label: "Manual Therapy", minutes: 18 },
  { id: 3, code: "97530", label: "Therapeutic Activities", minutes: 17 },
];

function computeCmsUnits(totalMinutes: number): number {
  const m = Math.max(0, Math.floor(totalMinutes));
  if (m < 8) return 0;
  return Math.floor((m + 7) / 15);
}

function getCmsBracket(units: number): { min: number; max: number } {
  if (units <= 0) return { min: 0, max: 7 };
  return { min: units * 15 - 7, max: units * 15 + 7 };
}

export default function BillingUnitsCalculator() {
  const [mode, setMode] = useState<Mode>("minutes_to_units");

  // Mode 1 state
  const [minutesInput, setMinutesInput] = useState<string>("55");
  const [payerRule, setPayerRule] = useState<PayerRule>("cms");
  const [ratePerUnit, setRatePerUnit] = useState<string>("28.50");

  // Mode 2 state: Multi-CPT split
  const [cpts, setCpts] = useState<CptEntry[]>(DEFAULT_CPTS);
  const [untimedEval, setUntimedEval] = useState<boolean>(false);

  // Mode 3 state: Units -> Minutes & Hours
  const [targetUnitsInput, setTargetUnitsInput] = useState<string>("4");
  const [copied, setCopied] = useState<boolean>(false);

  // Mode 1 calculation
  const singleMetrics = useMemo(() => {
    const mins = Math.max(0, parseInt(minutesInput, 10) || 0);
    const rate = Math.max(0, parseFloat(ratePerUnit) || 0);
    const units = computeCmsUnits(mins);
    const bracket = getCmsBracket(units);
    const nextThreshold = units === 0 ? 8 : (units + 1) * 15 - 7;
    const minsToNext = Math.max(0, nextThreshold - mins);
    const billingHours = units * 0.25;
    const revenue = units * rate;

    // AMA single-service comparison note: for 1 code, AMA 8+ min agrees with CMS per-code
    // unless total remainder was expected across codes.
    const amaSingleUnits = computeCmsUnits(mins);
    return {
      mins,
      units,
      amaSingleUnits,
      bracket,
      nextThreshold,
      minsToNext,
      billingHours,
      revenue,
    };
  }, [minutesInput, ratePerUnit]);

  // Mode 2 calculation: Medicare Pooled + Largest Remainder Algorithm
  const multiCptResult = useMemo(() => {
    const totalTimedMinutes = cpts.reduce(
      (sum, row) => sum + Math.max(0, Math.floor(row.minutes || 0)),
      0
    );
    const cmsTotalUnits = computeCmsUnits(totalTimedMinutes);

    // Step 1: Assign full 15-min units
    const allocated = cpts.map((row) => {
      const m = Math.max(0, Math.floor(row.minutes || 0));
      const fullUnits = Math.floor(m / 15);
      const remainder = m % 15;
      return {
        ...row,
        minutes: m,
        fullUnits,
        remainder,
        cmsAllocatedUnits: fullUnits,
        amaSeparateUnits: computeCmsUnits(m),
      };
    });

    const assignedFull = allocated.reduce((sum, r) => sum + r.fullUnits, 0);
    let extraUnits = Math.max(0, cmsTotalUnits - assignedFull);

    // Step 2: Sort descending by remainder minutes to distribute remaining CMS units
    const indicesByRemainder = allocated
      .map((item, idx) => ({ idx, remainder: item.remainder, minutes: item.minutes }))
      .filter((x) => x.minutes > 0)
      .sort((a, b) => b.remainder - a.remainder);

    // Assign 1 remainder unit per highest remainder row (only if remainder > 0 or still deficit)
    for (let i = 0; i < indicesByRemainder.length && extraUnits > 0; i++) {
      const targetIdx = indicesByRemainder[i].idx;
      allocated[targetIdx].cmsAllocatedUnits += 1;
      extraUnits -= 1;
    }

    // Fallback: if extraUnits somehow still > 0 (e.g. >7 mins remaining on a single multi-15 row)
    if (extraUnits > 0 && indicesByRemainder.length > 0) {
      allocated[indicesByRemainder[0].idx].cmsAllocatedUnits += extraUnits;
    }

    const amaTotalUnits = allocated.reduce((sum, r) => sum + r.amaSeparateUnits, 0);
    const untimedUnits = untimedEval ? 1 : 0;

    return {
      totalTimedMinutes,
      cmsTotalUnits,
      amaTotalUnits,
      untimedUnits,
      cmsGrandTotal: cmsTotalUnits + untimedUnits,
      amaGrandTotal: amaTotalUnits + untimedUnits,
      rows: allocated,
    };
  }, [cpts, untimedEval]);

  // Mode 3 calculation: Units -> Minutes & Decimal Hours
  const reverseMetrics = useMemo(() => {
    const u = Math.max(0, Math.min(96, parseInt(targetUnitsInput, 10) || 0));
    const rate = Math.max(0, parseFloat(ratePerUnit) || 0);
    const bracket = getCmsBracket(u);
    const midpoint = u * 15;
    const hoursDecimal = u * 0.25;
    const revenue = u * rate;
    return {
      units: u,
      minMins: bracket.min,
      maxMins: bracket.max,
      midpoint,
      hoursDecimal,
      revenue,
    };
  }, [targetUnitsInput, ratePerUnit]);

  const handleUpdateCpt = (id: number, field: "code" | "label" | "minutes", val: string) => {
    setCpts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === "minutes") {
          return { ...item, minutes: Math.max(0, parseInt(val, 10) || 0) };
        }
        return { ...item, [field]: val };
      })
    );
  };

  const handleAddCpt = () => {
    const nextId = cpts.length > 0 ? Math.max(...cpts.map((c) => c.id)) + 1 : 1;
    setCpts((prev) => [
      ...prev,
      { id: nextId, code: "97112", label: "Neuromuscular Re-Ed", minutes: 10 },
    ]);
  };

  const handleRemoveCpt = (id: number) => {
    if (cpts.length <= 1) return;
    setCpts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCopySummary = async () => {
    let summary = "";
    if (mode === "minutes_to_units") {
      summary = [
        "Billing Units Summary (CMS 8-Minute Rule)",
        `Direct Timed Treatment: ${singleMetrics.mins} mins`,
        `Billable Units: ${singleMetrics.units} units (${singleMetrics.bracket.min}-${singleMetrics.bracket.max} min bracket)`,
        `Billing Hours Equivalent: ${singleMetrics.billingHours.toFixed(2)} hrs`,
        `Estimated Reimbursement (@ $${(parseFloat(ratePerUnit) || 0).toFixed(2)}/unit): $${singleMetrics.revenue.toFixed(2)}`,
      ].join("\n");
    } else if (mode === "multi_cpt") {
      const lines = multiCptResult.rows.map(
        (r) =>
          `- CPT ${r.code} (${r.label}): ${r.minutes}m -> Medicare ${r.cmsAllocatedUnits}U | AMA ${r.amaSeparateUnits}U`
      );
      if (untimedEval) lines.push("- Untimed Eval (97161-97163): 1 flat unit");
      summary = [
        "Multi-CPT Timed Billing Audit Summary",
        `Total Direct Timed Time: ${multiCptResult.totalTimedMinutes} mins`,
        ...lines,
        `Total Allowed: Medicare ${multiCptResult.cmsGrandTotal}U | AMA ${multiCptResult.amaGrandTotal}U`,
      ].join("\n");
    } else {
      summary = [
        "Units-to-Minutes Conversion",
        `Target Units: ${reverseMetrics.units} units`,
        `Medicare 8-Min Required Range: ${reverseMetrics.minMins}-${reverseMetrics.maxMins} mins (Midpoint: ${reverseMetrics.midpoint} mins)`,
        `Decimal Hours: ${reverseMetrics.hoursDecimal.toFixed(2)} hrs`,
      ].join("\n");
    }

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-neon rounded-2xl p-6 md:p-8 space-y-6">
        {/* Mode Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
          <button
            type="button"
            onClick={() => setMode("minutes_to_units")}
            className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-display font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "minutes_to_units"
                ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_18px_rgba(0,255,242,0.3)]"
                : "text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Minutes → Units</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("multi_cpt")}
            className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-display font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "multi_cpt"
                ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_18px_rgba(0,255,242,0.3)]"
                : "text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Multi-CPT Splitter</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("units_to_hours")}
            className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-display font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === "units_to_hours"
                ? "bg-[var(--neon-cyan)] text-black shadow-[0_0_18px_rgba(0,255,242,0.3)]"
                : "text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Units → Minutes &amp; Hours</span>
          </button>
        </div>

        {/* MODE 1: MINUTES -> UNITS */}
        {mode === "minutes_to_units" && (
          <div className="space-y-6">
            {/* Quick Minute Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>QUICK MINUTE PRESETS</span>
                <span>CMS 8-MINUTE THRESHOLD</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {MINUTE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMinutesInput(String(preset))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                      singleMetrics.mins === preset
                        ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)]"
                        : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white"
                    }`}
                  >
                    {preset} min
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Direct Timed Minutes
                </label>
                <input
                  type="number"
                  min={0}
                  max={600}
                  value={minutesInput}
                  onChange={(e) => setMinutesInput(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] focus:border-[var(--neon-cyan)] focus:outline-none text-white font-mono text-lg font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Payer Guideline Mode
                </label>
                <div className="grid grid-cols-2 gap-2 h-11 p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setPayerRule("cms")}
                    className={`rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      payerRule === "cms"
                        ? "bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/50"
                        : "text-[var(--text-muted)] hover:text-white"
                    }`}
                  >
                    CMS 8-Min
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayerRule("ama")}
                    className={`rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      payerRule === "ama"
                        ? "bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] border border-[var(--neon-pink)]/50"
                        : "text-[var(--text-muted)] hover:text-white"
                    }`}
                  >
                    AMA Rule
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[var(--neon-cyan)]" />
                  <span>Rate Per Unit (Optional)</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  min={0}
                  value={ratePerUnit}
                  onChange={(e) => setRatePerUnit(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] focus:border-[var(--neon-cyan)] focus:outline-none text-white font-mono text-base font-bold"
                />
              </div>
            </div>

            {/* Live Result Panel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--neon-cyan)]/40 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--neon-cyan)]">
                    Total Billable Units
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)]">
                    {singleMetrics.bracket.min}–{singleMetrics.bracket.max}m Bracket
                  </span>
                </div>
                <div className="my-2 flex items-baseline gap-3">
                  <span className="font-mono text-5xl font-black text-white">
                    {singleMetrics.units}
                  </span>
                  <span className="text-sm font-mono text-[var(--neon-cyan)]">
                    {singleMetrics.units === 1 ? "BILLABLE UNIT" : "BILLABLE UNITS"}
                  </span>
                </div>
                <div className="text-xs font-mono text-[var(--text-secondary)]">
                  {singleMetrics.units === 0 ? (
                    <span className="text-amber-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Below 8-min minimum. Need {singleMetrics.minsToNext} more min for 1 unit.
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      +{singleMetrics.minsToNext} more min reaches {singleMetrics.units + 1} units ({singleMetrics.nextThreshold}m).
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] flex flex-col justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase">
                  Billing Hours Eq.
                </span>
                <div className="font-mono text-3xl font-extrabold text-white my-2">
                  {singleMetrics.billingHours.toFixed(2)}
                  <span className="text-sm text-[var(--text-muted)] ml-1">hrs</span>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                  15-min standard unit = 0.25h
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] flex flex-col justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase">
                  Est. Claim Value
                </span>
                <div className="font-mono text-3xl font-extrabold text-[var(--neon-pink)] my-2">
                  ${singleMetrics.revenue.toFixed(2)}
                </div>
                <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                  {payerRule === "cms"
                    ? "CMS pooled timed total"
                    : "AMA per-code threshold"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: MULTI-CPT SPLITTER */}
        {mode === "multi_cpt" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold text-white">
                  Mixed CPT Timed Code Unit Allocator
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Compare Medicare CMS pooled remainder rules vs AMA per-code substantial portion billing.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddCpt}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/40 hover:bg-[var(--neon-cyan)]/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add CPT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCpts(DEFAULT_CPTS);
                    setUntimedEval(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono border border-[var(--border)] text-[var(--text-secondary)] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {multiCptResult.rows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-12 gap-2 items-center p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]"
                >
                  <div className="col-span-3 sm:col-span-2">
                    <input
                      type="text"
                      value={row.code}
                      aria-label="CPT Code"
                      onChange={(e) => handleUpdateCpt(row.id, "code", e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-black/30 border border-[var(--border)] text-white font-mono text-xs font-bold"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-4">
                    <input
                      type="text"
                      value={row.label}
                      aria-label="Service Name"
                      onChange={(e) => handleUpdateCpt(row.id, "label", e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-black/30 border border-[var(--border)] text-[var(--text-secondary)] text-xs"
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        max={240}
                        value={row.minutes}
                        aria-label="Minutes"
                        onChange={(e) => handleUpdateCpt(row.id, "minutes", e.target.value)}
                        className="w-full px-2.5 py-2 pr-8 rounded-lg bg-black/30 border border-[var(--border)] text-white font-mono text-xs font-bold"
                      />
                      <span className="absolute right-2.5 top-2.5 text-[10px] font-mono text-[var(--text-muted)]">
                        m
                      </span>
                    </div>
                  </div>
                  <div className="col-span-10 sm:col-span-3 flex items-center justify-between sm:justify-end gap-2 text-xs font-mono">
                    <span className="px-2 py-1 rounded bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] font-bold">
                      CMS: {row.cmsAllocatedUnits}U
                    </span>
                    <span className="px-2 py-1 rounded bg-[var(--neon-pink)]/10 text-[var(--neon-pink)] font-bold">
                      AMA: {row.amaSeparateUnits}U
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveCpt(row.id)}
                      aria-label="Remove CPT code"
                      className="p-1.5 text-[var(--text-muted)] hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] cursor-pointer text-xs font-mono text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={untimedEval}
                onChange={(e) => setUntimedEval(e.target.checked)}
                className="accent-[var(--neon-cyan)] w-4 h-4"
              />
              <span>Include 1 Untimed Evaluation / Re-Eval Code (97161–97167 = +1 flat unit, excluded from timed pool)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                  Pooled Timed Minutes
                </div>
                <div className="font-mono text-3xl font-extrabold text-white mt-1">
                  {multiCptResult.totalTimedMinutes}m
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--neon-cyan)]/40">
                <div className="text-[11px] font-mono text-[var(--neon-cyan)] uppercase">
                  Medicare CMS Allowed Total
                </div>
                <div className="font-mono text-3xl font-extrabold text-[var(--neon-cyan)] mt-1">
                  {multiCptResult.cmsGrandTotal} Units
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--neon-pink)]/40">
                <div className="text-[11px] font-mono text-[var(--neon-pink)] uppercase">
                  AMA Per-Code Allowed Total
                </div>
                <div className="font-mono text-3xl font-extrabold text-[var(--neon-pink)] mt-1">
                  {multiCptResult.amaGrandTotal} Units
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: UNITS -> MINUTES & HOURS */}
        {mode === "units_to_hours" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Target Billable Units (1–96)
                </label>
                <input
                  type="number"
                  min={0}
                  max={96}
                  value={targetUnitsInput}
                  onChange={(e) => setTargetUnitsInput(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] focus:border-[var(--neon-cyan)] focus:outline-none text-white font-mono text-lg font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Rate Per Unit ($)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min={0}
                  value={ratePerUnit}
                  onChange={(e) => setRatePerUnit(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] focus:border-[var(--neon-cyan)] focus:outline-none text-white font-mono text-lg font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--neon-cyan)]/40">
                <div className="text-[11px] font-mono text-[var(--neon-cyan)] uppercase">
                  Required CMS Minute Window
                </div>
                <div className="font-mono text-3xl font-extrabold text-white mt-1">
                  {reverseMetrics.minMins}–{reverseMetrics.maxMins}m
                </div>
                <div className="text-xs font-mono text-[var(--text-secondary)] mt-1">
                  15m Midpoint: {reverseMetrics.midpoint} mins
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                  Units to Hours Equivalent
                </div>
                <div className="font-mono text-3xl font-extrabold text-white mt-1">
                  {reverseMetrics.hoursDecimal.toFixed(2)} hrs
                </div>
                <div className="text-xs font-mono text-[var(--text-secondary)] mt-1">
                  Standard 4 units = 1.00 hour
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                  Estimated Value
                </div>
                <div className="font-mono text-3xl font-extrabold text-[var(--neon-pink)] mt-1">
                  ${reverseMetrics.revenue.toFixed(2)}
                </div>
                <div className="text-xs font-mono text-[var(--text-secondary)] mt-1">
                  @ ${(parseFloat(ratePerUnit) || 0).toFixed(2)}/unit
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Action Bar */}
        <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/calculator/physical-therapy"
            className="text-xs font-mono text-[var(--neon-cyan)] hover:underline inline-flex items-center gap-1.5"
          >
            <span>Open Full-Shift PT Productivity &amp; Clock-Out Suite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleCopySummary}
            className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--neon-cyan)] text-xs font-mono text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Summary!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--neon-cyan)]" />
                <span>Copy Claim Summary</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
