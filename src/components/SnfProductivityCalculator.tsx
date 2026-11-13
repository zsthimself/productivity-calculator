/**
 * [INPUT]: React useState/useMemo, lucide-react icons, Next/Link
 * [OUTPUT]: SnfProductivityCalculator component for /calculator/snf-productivity
 * [POS]: 专业护理机构(SNF)康复计算引擎：三模式计算 SNF 班次生产力百分比（含午休扣除与并发/小组加权）、Target Clock-Out 倒推、CMS PDPM 25% 上限自检
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Check, CheckCircle2, Clock, Copy, RotateCcw, ShieldCheck, Users } from "lucide-react";

type Mode = "snf_shift" | "target_clockout" | "pdpm_cap";

function minutesToClockLabel(totalMins: number): string {
  const wrapped = ((Math.round(totalMins) % 1440) + 1440) % 1440;
  const h24 = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

function parseTimeToMins(timeStr: string): number {
  const parts = timeStr.split(":");
  if (parts.length !== 2) return 480;
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  return h * 60 + m;
}

export default function SnfProductivityCalculator() {
  const [mode, setMode] = useState<Mode>("snf_shift");
  const [copied, setCopied] = useState(false);

  // Mode 1: SNF Daily Shift Productivity (with Lunch & Concurrent/Group)
  const [shiftHours, setShiftHours] = useState("8.5");
  const [lunchMinutes, setLunchMinutes] = useState("30");
  const [individualMins, setIndividualMins] = useState("350");
  const [concurrentPatientMins, setConcurrentPatientMins] = useState("40");
  const [groupPatientMins, setGroupPatientMins] = useState("30");
  const [roleTarget, setRoleTarget] = useState("85");

  // Mode 2: Target Clock-Out Time
  const [clockInTime, setClockInTime] = useState("08:00");
  const [plannedTxMins, setPlannedTxMins] = useState("408");
  const [targetPct, setTargetPct] = useState("85");
  const [clockLunchMins, setClockLunchMins] = useState("30");

  // Mode 3: CMS PDPM 25% Group + Concurrent Compliance Cap
  const [capIndivMins, setCapIndivMins] = useState("900");
  const [capConcMins, setCapConcMins] = useState("150");
  const [capGroupMins, setCapGroupMins] = useState("120");

  const shiftResult = useMemo(() => {
    const grossMins = Math.max(1, (parseFloat(shiftHours) || 0) * 60);
    const lunch = Math.max(0, parseFloat(lunchMinutes) || 0);
    const netPaidMins = Math.max(1, grossMins - lunch);

    const indiv = Math.max(0, parseFloat(individualMins) || 0);
    const conc = Math.max(0, parseFloat(concurrentPatientMins) || 0);
    const grp = Math.max(0, parseFloat(groupPatientMins) || 0);

    // Patient treatment value: standard SNF productivity credits combined patient minutes delivered
    const totalPatientMins = indiv + conc + grp;
    const rawPct = (totalPatientMins / netPaidMins) * 100;
    const docBufferMins = Math.max(0, netPaidMins - indiv - conc / 2 - grp / 4);
    const target = Math.max(1, parseFloat(roleTarget) || 85);
    const targetTxMinsNeeded = (netPaidMins * target) / 100;
    const varianceMins = totalPatientMins - targetTxMinsNeeded;

    const combinedConcGrp = conc + grp;
    const concGrpRatio = totalPatientMins > 0 ? (combinedConcGrp / totalPatientMins) * 100 : 0;

    return {
      grossMins,
      netPaidMins,
      totalPatientMins,
      rawPct,
      docBufferMins,
      targetTxMinsNeeded,
      varianceMins,
      concGrpRatio,
    };
  }, [shiftHours, lunchMinutes, individualMins, concurrentPatientMins, groupPatientMins, roleTarget]);

  const clockOutResult = useMemo(() => {
    const inMins = parseTimeToMins(clockInTime);
    const tx = Math.max(0, parseFloat(plannedTxMins) || 0);
    const pct = Math.min(130, Math.max(40, parseFloat(targetPct) || 85));
    const lunch = Math.max(0, parseFloat(clockLunchMins) || 0);

    const requiredPaidMins = tx / (pct / 100);
    const requiredTotalFacilityMins = requiredPaidMins + lunch;
    const clockOutMins = inMins + requiredTotalFacilityMins;
    const nonBillableBufferMins = Math.max(0, requiredPaidMins - tx);

    return {
      clockOutLabel: minutesToClockLabel(clockOutMins),
      requiredPaidHours: (requiredPaidMins / 60).toFixed(2),
      requiredPaidMins: Math.round(requiredPaidMins),
      nonBillableBufferMins: Math.round(nonBillableBufferMins),
      rolledNextDay: clockOutMins >= 1440,
    };
  }, [clockInTime, plannedTxMins, targetPct, clockLunchMins]);

  const capResult = useMemo(() => {
    const indiv = Math.max(0, parseFloat(capIndivMins) || 0);
    const conc = Math.max(0, parseFloat(capConcMins) || 0);
    const grp = Math.max(0, parseFloat(capGroupMins) || 0);
    const total = indiv + conc + grp;
    const combinedNonIndiv = conc + grp;
    const pct = total > 0 ? (combinedNonIndiv / total) * 100 : 0;
    const maxAllowedConcGrp = total * 0.25;
    const excessMins = Math.max(0, combinedNonIndiv - maxAllowedConcGrp);
    const isCompliant = pct <= 25.0;

    return { total, combinedNonIndiv, pct, maxAllowedConcGrp, excessMins, isCompliant };
  }, [capIndivMins, capConcMins, capGroupMins]);

  const handleCopy = async () => {
    let text = "";
    if (mode === "snf_shift") {
      text = `SNF Productivity: ${shiftResult.rawPct.toFixed(1)}% (${shiftResult.totalPatientMins} billable mins / ${shiftResult.netPaidMins} paid mins) | Non-billable admin buffer: ${Math.round(shiftResult.docBufferMins)}m`;
    } else if (mode === "target_clockout") {
      text = `SNF Target Clock-Out: ${clockOutResult.clockOutLabel} (${clockOutResult.requiredPaidHours} paid hrs @ ${targetPct}% target, ${clockOutResult.nonBillableBufferMins}m doc buffer)`;
    } else {
      text = `CMS PDPM Group+Concurrent Share: ${capResult.pct.toFixed(1)}% (${capResult.isCompliant ? "Compliant <= 25%" : "EXCEEDS 25% CAP by " + Math.round(capResult.excessMins) + "m"})`;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const resetAll = () => {
    setShiftHours("8.5");
    setLunchMinutes("30");
    setIndividualMins("350");
    setConcurrentPatientMins("40");
    setGroupPatientMins("30");
    setRoleTarget("85");
    setClockInTime("08:00");
    setPlannedTxMins("408");
    setTargetPct("85");
    setClockLunchMins("30");
    setCapIndivMins("900");
    setCapConcMins("150");
    setCapGroupMins("120");
  };

  return (
    <div className="card-neon rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
      {/* Mode Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7 p-1.5 rounded-xl bg-[var(--bg-elevated)] border border-white/10">
        <button
          type="button"
          onClick={() => setMode("snf_shift")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-display font-semibold transition-all cursor-pointer ${
            mode === "snf_shift"
              ? "bg-teal-400 text-slate-950 shadow-lg"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>1. SNF Shift %</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("target_clockout")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-display font-semibold transition-all cursor-pointer ${
            mode === "target_clockout"
              ? "bg-[var(--neon-cyan)] text-slate-950 shadow-lg"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>2. Target Clock-Out</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("pdpm_cap")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-display font-semibold transition-all cursor-pointer ${
            mode === "pdpm_cap"
              ? "bg-[var(--neon-pink)] text-white shadow-lg"
              : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>3. PDPM 25% Cap Audit</span>
        </button>
      </div>

      {/* Mode 1: SNF Shift % */}
      {mode === "snf_shift" && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
              Discipline Target:
            </span>
            {[
              { label: "PT / OT (85%)", target: "85" },
              { label: "PTA / COTA (90%)", target: "90" },
              { label: "Strict SNF (92%)", target: "92" },
              { label: "SLP (82%)", target: "82" },
            ].map((role) => (
              <button
                key={role.label}
                type="button"
                onClick={() => setRoleTarget(role.target)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition cursor-pointer ${
                  roleTarget === role.target
                    ? "border-teal-400 bg-teal-400/20 text-teal-200"
                    : "border-white/10 bg-white/5 text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Total Scheduled Shift (Hours)
              </label>
              <input
                type="number"
                step="0.25"
                min="1"
                value={shiftHours}
                onChange={(e) => setShiftHours(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Unpaid Lunch Break (Mins)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={lunchMinutes}
                onChange={(e) => setLunchMinutes(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Role Benchmark (%)
              </label>
              <input
                type="number"
                min="50"
                max="120"
                value={roleTarget}
                onChange={(e) => setRoleTarget(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Individual Treatment (Mins)
              </label>
              <input
                type="number"
                min="0"
                value={individualMins}
                onChange={(e) => setIndividualMins(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Concurrent Patient Mins (2 Residents)
              </label>
              <input
                type="number"
                min="0"
                value={concurrentPatientMins}
                onChange={(e) => setConcurrentPatientMins(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Group Patient Mins (2–6 Residents)
              </label>
              <input
                type="number"
                min="0"
                value={groupPatientMins}
                onChange={(e) => setGroupPatientMins(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-teal-400/40 bg-teal-500/10 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-teal-300 mb-1">
                SNF Productivity Score
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {shiftResult.rawPct.toFixed(1)}%
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                {shiftResult.totalPatientMins} billable / {Math.round(shiftResult.netPaidMins)} paid mins
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                vs. {roleTarget}% Facility Goal
              </div>
              <div
                className={`text-2xl font-bold font-mono ${
                  shiftResult.varianceMins >= 0 ? "text-emerald-300" : "text-amber-300"
                }`}
              >
                {shiftResult.varianceMins >= 0 ? "+" : ""}
                {Math.round(shiftResult.varianceMins)} tx mins
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                Target needed: {Math.round(shiftResult.targetTxMinsNeeded)} tx mins
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                PDPM Concurrent + Group Mix
              </div>
              <div
                className={`text-2xl font-bold font-mono ${
                  shiftResult.concGrpRatio <= 25 ? "text-[var(--neon-cyan)]" : "text-rose-400"
                }`}
              >
                {shiftResult.concGrpRatio.toFixed(1)}%
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                {shiftResult.concGrpRatio <= 25 ? "Within 25% Medicare Part A limit" : "Warning: Exceeds 25% PDPM limit"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Target Clock-Out Time */}
      {mode === "target_clockout" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Clock-In Time
              </label>
              <input
                type="time"
                value={clockInTime}
                onChange={(e) => setClockInTime(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Billable Treatment (Mins)
              </label>
              <input
                type="number"
                min="0"
                value={plannedTxMins}
                onChange={(e) => setPlannedTxMins(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Target SNF %
              </label>
              <input
                type="number"
                min="50"
                max="120"
                value={targetPct}
                onChange={(e) => setTargetPct(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Unpaid Lunch (Mins)
              </label>
              <input
                type="number"
                min="0"
                value={clockLunchMins}
                onChange={(e) => setClockLunchMins(e.target.value)}
                className="input-neon w-full font-mono text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/10 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--neon-cyan)] mb-1">
                Exact Target Clock-Out
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {clockOutResult.clockOutLabel}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                Includes {clockLunchMins}m unpaid meal period
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Allowed Paid Shift Hours
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-300">
                {clockOutResult.requiredPaidHours} hrs
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                {clockOutResult.requiredPaidMins} paid facility mins
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Non-Billable Documentation Buffer
              </div>
              <div className="text-2xl font-bold font-mono text-purple-300">
                {clockOutResult.nonBillableBufferMins} mins
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                For POS notes, IDT standup &amp; prep
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: CMS PDPM 25% Cap Checker */}
      {mode === "pdpm_cap" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Total Individual Mins (Stay/Week)
              </label>
              <input type="number" min="0" value={capIndivMins} onChange={(e) => setCapIndivMins(e.target.value)} className="input-neon w-full font-mono text-base" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Total Concurrent Mins
              </label>
              <input type="number" min="0" value={capConcMins} onChange={(e) => setCapConcMins(e.target.value)} className="input-neon w-full font-mono text-base" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                Total Group Mins
              </label>
              <input type="number" min="0" value={capGroupMins} onChange={(e) => setCapGroupMins(e.target.value)} className="input-neon w-full font-mono text-base" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`rounded-xl border p-5 ${
                capResult.isCompliant
                  ? "border-emerald-400/40 bg-emerald-500/10"
                  : "border-rose-400/40 bg-rose-500/10"
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider mb-1 text-white">
                {capResult.isCompliant ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-300" />
                )}
                <span>PDPM Group + Conc Share</span>
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {capResult.pct.toFixed(1)}%
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                {capResult.isCompliant ? "Compliant (≤ 25.0% CMS limit)" : `Over limit by ${Math.round(capResult.excessMins)} mins`}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Combined Conc + Group Mins
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {capResult.combinedNonIndiv} mins
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                Out of {capResult.total} total discipline mins
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Max 25% Allowance
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--neon-cyan)]">
                {Math.floor(capResult.maxAllowedConcGrp)} mins
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                Safe headroom: {Math.max(0, Math.floor(capResult.maxAllowedConcGrp - capResult.combinedNonIndiv))} mins
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <Clock className="w-4 h-4 text-teal-400" />
          <span>
            Also check outpatient{" "}
            <Link href="/calculator/physical-therapy" className="text-[var(--neon-cyan)] hover:underline">
              Physical Therapy Productivity
            </Link>{" "}
            &amp;{" "}
            <Link href="/calculator/billing-units" className="text-[var(--neon-cyan)] hover:underline">
              Medicare 8-Minute Billing Units
            </Link>
            .
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/15 border border-teal-400/40 text-teal-300 hover:bg-teal-500/25 font-mono cursor-pointer transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Summary"}
          </button>
        </div>
      </div>
    </div>
  );
}
