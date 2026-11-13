/**
 * [INPUT]: 依赖 react；依赖 next/link；依赖 lucide-react 图标
 * [OUTPUT]: SnfProductivitySeoContent 组件（承接 /calculator/snf-productivity 长尾语义指南、PT/PTA/OT/COTA/SLP 行业标准表、PDPM 合规说明与 Excel 公式）
 * [POS]: src/components 的 SNF 专业护理机构康复生产力指南与 FAQ 可见正文
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import Link from "next/link";
import { Calculator, Clock, FileSpreadsheet, HelpCircle, ShieldCheck } from "lucide-react";

export default function SnfProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed font-body">
      {/* 1. Architecture Overview */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Calculator className="w-5 h-5 text-teal-400" />
          <span>How an SNF Productivity Calculator Works for Skilled Nursing Rehab Teams</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          In Skilled Nursing Facility (SNF) rehabilitation, therapists manage tight daily schedules split across Medicare Part A, Medicare Part B, Medicare Advantage, and managed care caseloads. Our <strong className="text-white">SNF productivity calculator</strong> computes exact shift efficiency by dividing combined billable treatment minutes (individual, concurrent, and group delivery) by net paid facility minutes after subtracting unpaid meal periods.
        </p>
        <p className="text-sm text-muted-foreground">
          Unlike generic time-tracking tools, this dedicated SNF clinical suite validates both daily shift pacing and compliance with the CMS Patient-Driven Payment Model (PDPM) 25% concurrent and group therapy cap—helping Physical Therapists (PT), PTAs, Occupational Therapists (OT), COTAs, and SLPs plan documentation blocks and clock-out targets without ever documenting off the clock.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/snf-productivity-formula.svg"
            alt="SNF productivity calculator architecture diagram showing paid facility time, individual vs concurrent/group delivery, and CMS PDPM 25 percent limit"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* 2. Role Benchmarks Table */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-400" />
          <span>2026 SNF Productivity Benchmarks by Discipline (PT, PTA, OT, COTA, SLP)</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Rehabilitation contract companies and in-house SNF Directors of Rehab (DOR) calibrate expectations based on evaluation load: evaluating clinicians write complex MDS Section GG scores and Plans of Care, whereas therapy assistants focus primarily on direct treatment delivery.
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/40">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-white/5 text-white font-display uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 border-b border-white/10">Clinician Role</th>
                <th className="p-3 border-b border-white/10">Typical SNF Goal</th>
                <th className="p-3 border-b border-white/10">Tx Mins per 8h Paid Shift</th>
                <th className="p-3 border-b border-white/10">Non-Billable Buffer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-white">Physical Therapist (PT) — Evaluating</td>
                <td className="p-3 font-mono text-teal-300">85% – 88%</td>
                <td className="p-3 font-mono">408 – 422 mins</td>
                <td className="p-3 font-mono">58 – 72 mins (Evals &amp; MDS)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Physical Therapist Assistant (PTA)</td>
                <td className="p-3 font-mono text-teal-300">90% – 92%</td>
                <td className="p-3 font-mono">432 – 442 mins</td>
                <td className="p-3 font-mono">38 – 48 mins (Daily Notes)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Occupational Therapist (OT) — Evaluating</td>
                <td className="p-3 font-mono text-teal-300">85% – 88%</td>
                <td className="p-3 font-mono">408 – 422 mins</td>
                <td className="p-3 font-mono">58 – 72 mins (ADLs &amp; SOC)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Certified OT Assistant (COTA)</td>
                <td className="p-3 font-mono text-teal-300">90% – 92%</td>
                <td className="p-3 font-mono">432 – 442 mins</td>
                <td className="p-3 font-mono">38 – 48 mins (Daily Notes)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Speech-Language Pathologist (SLP)</td>
                <td className="p-3 font-mono text-teal-300">80% – 85%</td>
                <td className="p-3 font-mono">384 – 408 mins</td>
                <td className="p-3 font-mono">72 – 96 mins (Swallow Studies &amp; Cog)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. CMS PDPM Rules & Excel Formulas */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>CMS PDPM 25% Group/Concurrent Cap &amp; Excel Productivity Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          When a clinician treats two patients concurrently (unrelated goals in sight at once) or leads a therapy group of 2 to 6 residents performing similar interventions, total billed patient minutes increase per real clock minute worked. Under CMS Medicare Part A PDPM rules, combined concurrent and group therapy minutes must remain at or below <strong className="text-white">25%</strong> of total therapy minutes for each discipline across the resident&apos;s Part A stay.
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/40">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-white/5 text-white font-display uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 border-b border-white/10">SNF Audit Metric</th>
                <th className="p-3 border-b border-white/10">Excel / Google Sheets Formula</th>
                <th className="p-3 border-b border-white/10">Cell Mapping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-white">SNF Daily Productivity %</td>
                <td className="p-3 font-mono text-teal-300">=(A2/(B2-C2))*100</td>
                <td className="p-3">A2 Treatment Mins, B2 Gross Shift Mins, C2 Unpaid Lunch Mins</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Target Paid Shift Mins</td>
                <td className="p-3 font-mono text-teal-300">=A2/(D2/100)</td>
                <td className="p-3">A2 Treatment Mins, D2 Goal % (e.g. 85 or 90)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">PDPM Conc + Group % Check</td>
                <td className="p-3 font-mono text-teal-300">=((B2+C2)/(A2+B2+C2))*100</td>
                <td className="p-3">A2 Indiv, B2 Conc, C2 Group Mins</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. FAQ & Cross Links */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-teal-400" />
          <span>Skilled Nursing Productivity Calculator FAQ</span>
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-teal-400" />
              <span>What happens if a resident refuses therapy mid-shift?</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Refusals reduce billable treatment minutes without automatically lowering paid facility hours. Use the Target Clock-Out tab inside this <strong className="text-white">SNF productivity calculator</strong> to re-allocate remaining documentation buffer or pick up flexible co-treatments before clocking out.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold text-white mb-1">Related Therapy &amp; Billing Calculators</h3>
            <p className="text-xs text-muted-foreground flex flex-wrap gap-3 mt-1">
              <Link href="/calculator/physical-therapy" className="text-[var(--neon-cyan)] hover:underline">Physical Therapy Suite</Link>
              <span>&bull;</span>
              <Link href="/calculator/billing-units" className="text-[var(--neon-cyan)] hover:underline">Medicare 8-Minute Rule Billing Units</Link>
              <span>&bull;</span>
              <Link href="/calculator/healthcare" className="text-[var(--neon-cyan)] hover:underline">Healthcare wRVU &amp; Clinical Staffing</Link>
              <span>&bull;</span>
              <Link href="/calculator/time-efficiency" className="text-[var(--neon-cyan)] hover:underline">Time Efficiency Calculator</Link>
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
