/**
 * [INPUT]: React useState/useMemo, lucide-react icons, Next/Link
 * [OUTPUT]: TotalFactorProductivityCalculator component for /calculator/total-factor-productivity
 * [POS]: 全要素生产率(TFP)与多要素生产率(MFP)三模式引擎：Cobb-Douglas Solow Residual、KLEMS 复合成本指数、Solow 增长核算拆解
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { BarChart3, Check, Copy, Layers, RotateCcw, Scale, TrendingUp } from "lucide-react";

type Mode = "cobb_douglas" | "mfp_index" | "solow_growth";

const CD_PRESETS = [
  { label: "US Macro Benchmark (α=0.33)", output: "1250000", capital: "480000", labor: "18500", alpha: "0.33" },
  { label: "Automated Plant (α=0.42)", output: "3800000", capital: "1950000", labor: "24000", alpha: "0.42" },
  { label: "SaaS Operations (α=0.25)", output: "960000", capital: "180000", labor: "9200", alpha: "0.25" },
];

export default function TotalFactorProductivityCalculator() {
  const [mode, setMode] = useState<Mode>("cobb_douglas");
  const [copied, setCopied] = useState(false);

  // Mode 1: Cobb-Douglas TFP (Y = A * K^alpha * L^beta)
  const [cdOutput, setCdOutput] = useState("1250000");
  const [cdCapital, setCdCapital] = useState("480000");
  const [cdLabor, setCdLabor] = useState("18500");
  const [cdAlpha, setCdAlpha] = useState("0.33");
  const [constantReturns, setConstantReturns] = useState(true);
  const [customBeta, setCustomBeta] = useState("0.67");

  // Mode 2: Multifactor Productivity (KLEMS Two-Period Cost Comparison)
  const [p1Output, setP1Output] = useState("850000");
  const [p1Labor, setP1Labor] = useState("320000");
  const [p1Capital, setP1Capital] = useState("150000");
  const [p1Materials, setP1Materials] = useState("180000");

  const [p2Output, setP2Output] = useState("1020000");
  const [p2Labor, setP2Labor] = useState("345000");
  const [p2Capital, setP2Capital] = useState("165000");
  const [p2Materials, setP2Materials] = useState("195000");

  // Mode 3: Solow Growth Accounting (%ΔA/A = %ΔY/Y - α*%ΔK/K - (1-α)*%ΔL/L)
  const [growthY, setGrowthY] = useState("7.4");
  const [growthK, setGrowthK] = useState("5.0");
  const [growthL, setGrowthL] = useState("3.2");
  const [growthAlpha, setGrowthAlpha] = useState("0.35");

  const cdResult = useMemo(() => {
    const Y = Math.max(0, parseFloat(cdOutput) || 0);
    const K = Math.max(0.0001, parseFloat(cdCapital) || 0);
    const L = Math.max(0.0001, parseFloat(cdLabor) || 0);
    const alpha = Math.min(0.99, Math.max(0.01, parseFloat(cdAlpha) || 0.33));
    const beta = constantReturns
      ? Number((1 - alpha).toFixed(4))
      : Math.min(1.5, Math.max(0.01, parseFloat(customBeta) || 0.67));

    const compositeInput = Math.pow(K, alpha) * Math.pow(L, beta);
    const tfp = compositeInput > 0 ? Y / compositeInput : 0;
    const returnsSum = alpha + beta;
    const scaleLabel =
      Math.abs(returnsSum - 1) < 0.005
        ? "Constant Returns (α+β = 1.00)"
        : returnsSum > 1
        ? `Increasing Returns (${returnsSum.toFixed(2)})`
        : `Decreasing Returns (${returnsSum.toFixed(2)})`;

    const marginalCapital = K > 0 ? (alpha * Y) / K : 0;
    const marginalLabor = L > 0 ? (beta * Y) / L : 0;

    return {
      tfp,
      beta,
      compositeInput,
      scaleLabel,
      marginalCapital,
      marginalLabor,
      laborProductivity: Y / L,
    };
  }, [cdOutput, cdCapital, cdLabor, cdAlpha, constantReturns, customBeta]);

  const mfpResult = useMemo(() => {
    const y1 = Math.max(0, parseFloat(p1Output) || 0);
    const i1 =
      (parseFloat(p1Labor) || 0) +
      (parseFloat(p1Capital) || 0) +
      (parseFloat(p1Materials) || 0);
    const y2 = Math.max(0, parseFloat(p2Output) || 0);
    const i2 =
      (parseFloat(p2Labor) || 0) +
      (parseFloat(p2Capital) || 0) +
      (parseFloat(p2Materials) || 0);

    const mfp1 = i1 > 0 ? y1 / i1 : 0;
    const mfp2 = i2 > 0 ? y2 / i2 : 0;
    const mfpIndex = mfp1 > 0 ? (mfp2 / mfp1) * 100 : 100;
    const mfpChangePct = mfp1 > 0 ? ((mfp2 - mfp1) / mfp1) * 100 : 0;

    const lProd1 = (parseFloat(p1Labor) || 0) > 0 ? y1 / (parseFloat(p1Labor) || 1) : 0;
    const lProd2 = (parseFloat(p2Labor) || 0) > 0 ? y2 / (parseFloat(p2Labor) || 1) : 0;
    const laborChangePct = lProd1 > 0 ? ((lProd2 - lProd1) / lProd1) * 100 : 0;

    return { mfp1, mfp2, mfpIndex, mfpChangePct, lProd1, lProd2, laborChangePct, i1, i2 };
  }, [p1Output, p1Labor, p1Capital, p1Materials, p2Output, p2Labor, p2Capital, p2Materials]);

  const solowResult = useMemo(() => {
    const dy = parseFloat(growthY) || 0;
    const dk = parseFloat(growthK) || 0;
    const dl = parseFloat(growthL) || 0;
    const alpha = Math.min(0.99, Math.max(0.01, parseFloat(growthAlpha) || 0.35));
    const beta = 1 - alpha;

    const capitalContribution = alpha * dk;
    const laborContribution = beta * dl;
    const residualTfpGrowth = dy - capitalContribution - laborContribution;
    const tfpShareOfGrowth = dy !== 0 ? (residualTfpGrowth / dy) * 100 : 0;

    return {
      alpha,
      beta,
      capitalContribution,
      laborContribution,
      residualTfpGrowth,
      tfpShareOfGrowth,
    };
  }, [growthY, growthK, growthL, growthAlpha]);

  const handleCopySummary = async () => {
    let summary = "";
    if (mode === "cobb_douglas") {
      summary = `Cobb-Douglas TFP: ${cdResult.tfp.toFixed(4)} | ${cdResult.scaleLabel} | Labor Output Ratio: ${cdResult.laborProductivity.toFixed(2)}`;
    } else if (mode === "mfp_index") {
      summary = `Multifactor Productivity Index: ${mfpResult.mfpIndex.toFixed(2)} (${mfpResult.mfpChangePct >= 0 ? "+" : ""}${mfpResult.mfpChangePct.toFixed(2)}%) | Base MFP: ${mfpResult.mfp1.toFixed(3)} -> Current MFP: ${mfpResult.mfp2.toFixed(3)}`;
    } else {
      summary = `Solow Residual TFP Growth: ${solowResult.residualTfpGrowth >= 0 ? "+" : ""}${solowResult.residualTfpGrowth.toFixed(2)}% | Capital Contrib: ${solowResult.capitalContribution.toFixed(2)}% | Labor Contrib: ${solowResult.laborContribution.toFixed(2)}%`;
    }
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const resetCurrent = () => {
    setCdOutput("1250000");
    setCdCapital("480000");
    setCdLabor("18500");
    setCdAlpha("0.33");
    setConstantReturns(true);
    setCustomBeta("0.67");
    setP1Output("850000");
    setP1Labor("320000");
    setP1Capital("150000");
    setP1Materials("180000");
    setP2Output("1020000");
    setP2Labor("345000");
    setP2Capital("165000");
    setP2Materials("195000");
    setGrowthY("7.4");
    setGrowthK("5.0");
    setGrowthL("3.2");
    setGrowthAlpha("0.35");
  };

  return (
    <div className="card-neon rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
      {/* Mode Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7 p-1.5 rounded-xl bg-[var(--bg-elevated)] border border-white/10">
        <button
          type="button"
          onClick={() => setMode("cobb_douglas")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-display font-semibold transition-all cursor-pointer ${
            mode === "cobb_douglas"
              ? "bg-[var(--neon-cyan)] text-slate-950 shadow-lg"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>1. Cobb-Douglas TFP</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("mfp_index")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-display font-semibold transition-all cursor-pointer ${
            mode === "mfp_index"
              ? "bg-[var(--neon-purple)] text-white shadow-lg"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Multifactor (MFP)</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("solow_growth")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-display font-semibold transition-all cursor-pointer ${
            mode === "solow_growth"
              ? "bg-emerald-400 text-slate-950 shadow-lg"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>3. Solow Growth (ΔA/A)</span>
        </button>
      </div>

      {/* Mode 1: Cobb-Douglas TFP */}
      {mode === "cobb_douglas" && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
              Presets:
            </span>
            {CD_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setCdOutput(p.output);
                  setCdCapital(p.capital);
                  setCdLabor(p.labor);
                  setCdAlpha(p.alpha);
                  setConstantReturns(true);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-mono border border-white/10 bg-white/5 hover:border-[var(--neon-cyan)] text-[var(--text-secondary)] hover:text-white transition cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Real Output Y ($)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={cdOutput}
                onChange={(e) => setCdOutput(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Capital Stock K ($)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={cdCapital}
                onChange={(e) => setCdCapital(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Labor Input L (Hours)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={cdLabor}
                onChange={(e) => setCdLabor(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Capital Share α (0.01–0.99)
              </label>
              <input
                type="number"
                min="0.01"
                max="0.99"
                step="0.01"
                value={cdAlpha}
                onChange={(e) => setCdAlpha(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <label className="inline-flex items-center gap-2 cursor-pointer text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={constantReturns}
                onChange={(e) => setConstantReturns(e.target.checked)}
                className="accent-[var(--neon-cyan)]"
              />
              <span>Enforce Constant Returns to Scale (β = 1 − α = {cdResult.beta.toFixed(2)})</span>
            </label>
            {!constantReturns && (
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)] font-mono">Custom Labor Share β:</span>
                <input
                  type="number"
                  step="0.01"
                  value={customBeta}
                  onChange={(e) => setCustomBeta(e.target.value)}
                  className="input-neon w-24 py-1 px-2 text-xs font-mono"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/10 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--neon-cyan)] mb-1">
                Total Factor Productivity (A)
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {cdResult.tfp.toFixed(4)}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{cdResult.scaleLabel}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Marginal Product of Labor (MPL)
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-300">
                ${cdResult.marginalLabor.toFixed(2)} / hr
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                Avg Output/Hour: ${cdResult.laborProductivity.toFixed(2)}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Marginal Product of Capital (MPK)
              </div>
              <div className="text-2xl font-bold font-mono text-purple-300">
                {(cdResult.marginalCapital * 100).toFixed(2)}%
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                ${cdResult.marginalCapital.toFixed(3)} per $1 capital
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Multifactor Productivity (KLEMS Two-Period Comparison) */}
      {mode === "mfp_index" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--neon-cyan)] font-bold">
                Baseline Period (Index = 100)
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">Real Output ($)</label>
                  <input type="number" value={p1Output} onChange={(e) => setP1Output(e.target.value)} className="input-neon w-full font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">Labor Cost ($)</label>
                  <input type="number" value={p1Labor} onChange={(e) => setP1Labor(e.target.value)} className="input-neon w-full font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">Capital / Equip ($)</label>
                  <input type="number" value={p1Capital} onChange={(e) => setP1Capital(e.target.value)} className="input-neon w-full font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">Materials &amp; Energy ($)</label>
                  <input type="number" value={p1Materials} onChange={(e) => setP1Materials(e.target.value)} className="input-neon w-full font-mono text-sm" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--neon-purple)]/30 bg-[var(--neon-purple)]/5 p-4 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                Current Period Comparison
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">Real Output ($)</label>
                  <input type="number" value={p2Output} onChange={(e) => setP2Output(e.target.value)} className="input-neon w-full font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">Labor Cost ($)</label>
                  <input type="number" value={p2Labor} onChange={(e) => setP2Labor(e.target.value)} className="input-neon w-full font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">Capital / Equip ($)</label>
                  <input type="number" value={p2Capital} onChange={(e) => setP2Capital(e.target.value)} className="input-neon w-full font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">Materials &amp; Energy ($)</label>
                  <input type="number" value={p2Materials} onChange={(e) => setP2Materials(e.target.value)} className="input-neon w-full font-mono text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[var(--neon-purple)]/40 bg-[var(--neon-purple)]/15 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-1">
                Multifactor Productivity Index
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {mfpResult.mfpIndex.toFixed(1)}
              </div>
              <div className="text-xs text-emerald-300 mt-1 font-mono">
                {mfpResult.mfpChangePct >= 0 ? "+" : ""}
                {mfpResult.mfpChangePct.toFixed(2)}% vs. base 100.0
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Output per $1 Total Input
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                ${mfpResult.mfp2.toFixed(3)}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                Baseline: ${mfpResult.mfp1.toFixed(3)} per $1
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Partial Labor Cost Productivity
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--neon-cyan)]">
                {mfpResult.laborChangePct >= 0 ? "+" : ""}
                {mfpResult.laborChangePct.toFixed(2)}%
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                ${mfpResult.lProd2.toFixed(2)} output per $1 labor
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Solow Residual Growth Accounting */}
      {mode === "solow_growth" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Output Growth ΔY/Y (%)
              </label>
              <input type="number" step="0.1" value={growthY} onChange={(e) => setGrowthY(e.target.value)} className="input-neon w-full font-mono text-base" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Capital Growth ΔK/K (%)
              </label>
              <input type="number" step="0.1" value={growthK} onChange={(e) => setGrowthK(e.target.value)} className="input-neon w-full font-mono text-base" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Labor Growth ΔL/L (%)
              </label>
              <input type="number" step="0.1" value={growthL} onChange={(e) => setGrowthL(e.target.value)} className="input-neon w-full font-mono text-base" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Capital Weight α
              </label>
              <input type="number" min="0.01" max="0.99" step="0.01" value={growthAlpha} onChange={(e) => setGrowthAlpha(e.target.value)} className="input-neon w-full font-mono text-base" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-300 mb-1">
                Solow Residual (TFP Growth)
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {solowResult.residualTfpGrowth >= 0 ? "+" : ""}
                {solowResult.residualTfpGrowth.toFixed(2)}%
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                {solowResult.tfpShareOfGrowth.toFixed(1)}% of total output growth
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Capital Deepening (α·ΔK)
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--neon-cyan)]">
                +{solowResult.capitalContribution.toFixed(2)}%
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                Weight α = {solowResult.alpha.toFixed(2)}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Labor Expansion ((1−α)·ΔL)
              </div>
              <div className="text-2xl font-bold font-mono text-purple-300">
                +{solowResult.laborContribution.toFixed(2)}%
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                Weight (1−α) = {solowResult.beta.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <BarChart3 className="w-4 h-4 text-[var(--neon-cyan)]" />
          <span>
            Need single-factor output or cycle ratio?{" "}
            <Link href="/calculator/general" className="text-[var(--neon-cyan)] hover:underline">
              General Suite
            </Link>{" "}
            or{" "}
            <Link href="/calculator/time-efficiency" className="text-[var(--neon-cyan)] hover:underline">
              Time Efficiency Calculator
            </Link>
            .
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetCurrent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--neon-cyan)]/15 border border-[var(--neon-cyan)]/40 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/25 font-mono cursor-pointer transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Summary"}
          </button>
        </div>
      </div>
    </div>
  );
}
