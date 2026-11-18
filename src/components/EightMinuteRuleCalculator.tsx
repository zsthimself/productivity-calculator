/**
 * [INPUT]: React useState
 * [OUTPUT]: EightMinuteRuleCalculator 交互式 Medicare 8 分钟计费法则计算器组件
 * [POS]: src/components/EightMinuteRuleCalculator.tsx 为 /calculator/8-minute-rule 提供单项目与多 CPT 混合余数分配计算
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useState } from "react";

type Mode = "single" | "multi";

interface CptRow {
  id: string;
  code: string;
  label: string;
  minutes: number;
}

const DEFAULT_ROWS: CptRow[] = [
  { id: "r1", code: "97110", label: "Therapeutic Exercise", minutes: 22 },
  { id: "r2", code: "97140", label: "Manual Therapy", minutes: 15 },
  { id: "r3", code: "97530", label: "Therapeutic Activities", minutes: 10 },
];

const QUICK_PRESETS = [
  { label: "7 min (0U)", minutes: 7 },
  { label: "8 min (1U)", minutes: 8 },
  { label: "15 min (1U)", minutes: 15 },
  { label: "23 min (2U)", minutes: 23 },
  { label: "38 min (3U)", minutes: 38 },
  { label: "53 min (4U)", minutes: 53 },
];

function computeMedicareUnits(totalMinutes: number): number {
  if (totalMinutes < 8) return 0;
  return Math.floor((totalMinutes - 8) / 15) + 1;
}

function getNextThreshold(units: number): { minForNext: number; nextUnits: number } {
  const nextUnits = units + 1;
  const minForNext = nextUnits === 1 ? 8 : 8 + (nextUnits - 1) * 15;
  return { minForNext, nextUnits };
}

function allocateMultiCptUnits(rows: CptRow[]) {
  const totalTimed = rows.reduce((sum, r) => sum + Math.max(0, r.minutes || 0), 0);
  const totalAllowable = computeMedicareUnits(totalTimed);

  // CMS rule: assign full 15-min blocks first, then allocate remaining units to largest remainders >= 8 min (or largest remainder overall up to totalAllowable)
  const base = rows.map((r) => {
    const m = Math.max(0, r.minutes || 0);
    const full = Math.floor(m / 15);
    const rem = m % 15;
    return { ...r, minutes: m, units: full, remainder: rem };
  });

  let assigned = base.reduce((s, r) => s + r.units, 0);
  const sorted = [...base].sort((a, b) => b.remainder - a.remainder);

  for (const item of sorted) {
    if (assigned >= totalAllowable) break;
    if (item.minutes > 0 && item.remainder > 0) {
      const target = base.find((b) => b.id === item.id);
      if (target) {
        target.units += 1;
        assigned += 1;
      }
    }
  }

  return { totalTimed, totalAllowable, allocated: base };
}

export default function EightMinuteRuleCalculator() {
  const [mode, setMode] = useState<Mode>("single");
  const [singleMinutes, setSingleMinutes] = useState<number>(23);
  const [rows, setRows] = useState<CptRow[]>(DEFAULT_ROWS);
  const [untimedEvalCount, setUntimedEvalCount] = useState<number>(0);

  const singleUnits = computeMedicareUnits(singleMinutes);
  const { minForNext, nextUnits } = getNextThreshold(singleUnits);
  const minutesNeeded = Math.max(0, minForNext - singleMinutes);

  const multiResult = allocateMultiCptUnits(rows);
  const totalWithUntimed = multiResult.totalAllowable + Math.max(0, untimedEvalCount);

  const updateRowMinutes = (id: string, val: string) => {
    const parsed = Math.max(0, Math.min(240, Number(val) || 0));
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, minutes: parsed } : r)));
  };

  const addCptRow = () => {
    const nextIdx = rows.length + 1;
    setRows((prev) => [
      ...prev,
      { id: `r-${Date.now()}`, code: `97${110 + nextIdx}`, label: `Timed Service #${nextIdx}`, minutes: 15 },
    ]);
  };

  const removeCptRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="card-neon rounded-2xl p-6 md:p-8 space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setMode("single")}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition ${
            mode === "single"
              ? "bg-[var(--neon-cyan)] text-slate-950 shadow-lg"
              : "bg-white/5 text-slate-300 hover:bg-white/10"
          }`}
        >
          1. Single Service (Minutes → Units)
        </button>
        <button
          type="button"
          onClick={() => setMode("multi")}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition ${
            mode === "multi"
              ? "bg-[var(--neon-cyan)] text-slate-950 shadow-lg"
              : "bg-white/5 text-slate-300 hover:bg-white/10"
          }`}
        >
          2. Multi-CPT Remainder Allocator
        </button>
      </div>

      {mode === "single" ? (
        <div className="space-y-6">
          <div>
            <label htmlFor="singleMinInput" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
              Direct Timed Treatment Minutes
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <input
                id="singleMinInput"
                type="number"
                min={0}
                max={300}
                value={singleMinutes}
                onChange={(e) => setSingleMinutes(Math.max(0, Math.min(300, Number(e.target.value) || 0)))}
                className="w-full sm:w-48 px-4 py-3 rounded-xl bg-slate-950/90 border border-white/15 text-white font-mono text-lg font-bold focus:outline-none focus:border-[var(--neon-cyan)]"
              />
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setSingleMinutes(p.minutes)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border transition ${
                      singleMinutes === p.minutes
                        ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] font-bold"
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-950/80 border border-[var(--neon-cyan)]/40 p-5">
              <div className="text-xs font-mono uppercase text-slate-400">Medicare Billable Units</div>
              <div className="text-3xl font-black font-mono text-[var(--neon-cyan)] mt-1">
                {singleUnits} {singleUnits === 1 ? "Unit" : "Units"}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {singleMinutes < 8 ? "Below 8-min minimum threshold" : `Qualified at ${singleMinutes} timed min`}
              </div>
            </div>

            <div className="rounded-xl bg-slate-950/80 border border-white/10 p-5">
              <div className="text-xs font-mono uppercase text-slate-400">Next Unit Threshold</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {minForNext} min → {nextUnits}U
              </div>
              <div className="text-xs text-emerald-400 mt-1 font-mono">
                +{minutesNeeded} min needed for {nextUnits} {nextUnits === 1 ? "unit" : "units"}
              </div>
            </div>

            <div className="rounded-xl bg-slate-950/80 border border-white/10 p-5">
              <div className="text-xs font-mono uppercase text-slate-400">Bracket Range</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {singleUnits === 0 ? "0 – 7 min" : `${8 + (singleUnits - 1) * 15} – ${7 + singleUnits * 15} min`}
              </div>
              <div className="text-xs text-slate-400 mt-1">CMS 15-min timed code window</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="space-y-3">
            {rows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-12 gap-2 items-center bg-slate-950/70 border border-white/10 rounded-xl p-3"
              >
                <div className="col-span-3 sm:col-span-2">
                  <input
                    type="text"
                    aria-label="CPT Code"
                    value={row.code}
                    onChange={(e) =>
                      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, code: e.target.value } : r)))
                    }
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-white/10 text-xs font-mono text-[var(--neon-cyan)] font-bold"
                  />
                </div>
                <div className="col-span-5 sm:col-span-6">
                  <input
                    type="text"
                    aria-label="Service Name"
                    value={row.label}
                    onChange={(e) =>
                      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, label: e.target.value } : r)))
                    }
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="col-span-3 sm:col-span-3 flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0}
                    max={240}
                    aria-label="Minutes"
                    value={row.minutes}
                    onChange={(e) => updateRowMinutes(row.id, e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-white/15 text-xs font-mono text-white font-bold"
                  />
                  <span className="text-[11px] font-mono text-slate-400">m</span>
                </div>
                <div className="col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => removeCptRow(row.id)}
                    className="text-xs text-slate-500 hover:text-rose-400 px-1.5 py-1"
                    title="Remove row"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={addCptRow}
              className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/15 text-xs font-mono text-slate-200 hover:border-[var(--neon-cyan)] transition"
            >
              + Add Timed CPT Code
            </button>
            <label className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <span>Untimed Codes (e.g., 97161 Eval):</span>
              <input
                type="number"
                min={0}
                max={5}
                value={untimedEvalCount}
                onChange={(e) => setUntimedEvalCount(Math.max(0, Math.min(5, Number(e.target.value) || 0)))}
                className="w-16 px-2.5 py-1.5 rounded bg-slate-950 border border-white/15 text-xs font-mono text-white font-bold"
              />
            </label>
          </div>

          <div className="rounded-xl bg-slate-950/85 border border-[var(--neon-cyan)]/35 p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="text-xs font-mono uppercase text-slate-400">Total Timed Minutes</div>
                <div className="text-2xl font-black font-mono text-white">{multiResult.totalTimed} min</div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-slate-400">Allowable Timed Units</div>
                <div className="text-2xl font-black font-mono text-[var(--neon-cyan)]">{multiResult.totalAllowable} U</div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-slate-400">Total Claim Units (incl. Untimed)</div>
                <div className="text-2xl font-black font-mono text-emerald-400">{totalWithUntimed} U</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              {multiResult.allocated.map((item) => (
                <div key={item.id} className="p-3 rounded-lg bg-slate-900/90 border border-white/10 flex justify-between items-center">
                  <div>
                    <div className="text-[var(--neon-cyan)] font-bold">{item.code}</div>
                    <div className="text-[11px] text-slate-400">{item.minutes} min (rem {item.remainder}m)</div>
                  </div>
                  <div className="text-base font-black text-white">{item.units} U</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
