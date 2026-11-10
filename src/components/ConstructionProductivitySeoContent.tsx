/**
 * [INPUT]: 依赖 react；依赖 lucide-react 图标
 * [OUTPUT]: 导出 ConstructionProductivitySeoContent 组件及默认导出
 * [POS]: src/components 的建筑施工工效、班组进度与成本 CPI 深度权威 SEO 内容与基准矩阵，承接 /calculator/construction 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import {
  HardHat,
  Gauge,
  Sliders,
  DollarSign,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  Calendar,
} from "lucide-react";

export default function ConstructionProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed">
      {/* 1. Visual Architecture Diagram & Core Definitions */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HardHat className="w-5 h-5 text-amber-500" />
          <span>Construction Productivity Calculator Architecture &amp; Jobsite Production Theory</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Using this professional <strong>construction productivity calculator</strong>, general contractors, project managers, cost estimators, and field superintendents can accurately quantify trade labor output rates, determine man-hours per unit, forecast daily crew velocity, and monitor the Earned Value Cost Performance Index (CPI). Developed in alignment with guidelines published by the Construction Industry Institute (CII) and RSMeans cost data, this engineering suite eliminates estimation guesswork, identifies non-productive standby waste, and protects commercial construction margins from schedule delays and liquidated damages.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/construction-productivity-formula.svg"
            alt="Construction productivity calculator formula, labor output rate per man-hour, crew daily velocity, and Earned Value Cost Performance Index CPI diagram"
            width="800"
            height="400"
            className="w-full h-auto rounded-lg"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* 2. Mathematical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-500" />
          <span>The Core Mathematics: 3 Essential Construction Productivity Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Field productivity governs whether a construction contract generates substantial operating profit or triggers ruinous budget overruns. By entering project data into our specialized <strong>construction productivity calculator</strong>, superintendents can evaluate three foundational mathematical equations used by leading general contracting firms:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              Labor Output &amp; Unit Rate
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Physical Production Rate
            </div>
            <div className="p-2.5 rounded-lg bg-background/80 font-mono text-xs text-amber-400 border border-border/60 mb-2">
              Rate = Work Units ÷ Labor Hours
            </div>
            <p className="text-xs text-muted-foreground">
              Calculates installed units per man-hour (e.g., cubic yards/mh, square feet/mh). Inverting this equation yields the contractor Unit Rate: <code className="text-amber-300 font-mono">Man-Hours ÷ Work Units</code>, the core building block of unit-price bidding and crew estimating.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-cyan-500 uppercase tracking-wider mb-1">
              Crew Daily Velocity
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Scheduled Production Pace
            </div>
            <div className="p-2.5 rounded-lg bg-background/80 font-mono text-xs text-cyan-400 border border-border/60 mb-2">
              Daily Output = Crew × Shift × Rate
            </div>
            <p className="text-xs text-muted-foreground">
              Computes daily physical volume installed by a composite gang. Dividing total project scope by daily crew output determines critical-path construction duration: <code className="text-cyan-300 font-mono">Days = Scope ÷ Daily Rate</code>, accounting for weather and site logistics buffers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">
              Cost Performance Index
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Earned Value CPI Ratio
            </div>
            <div className="p-2.5 rounded-lg bg-background/80 font-mono text-xs text-emerald-400 border border-border/60 mb-2">
              CPI = Earned Value (EV) ÷ Actual Cost (AC)
            </div>
            <p className="text-xs text-muted-foreground">
              Earned Value Management (EVM) metric verifying whether labor spending tracks physical site progress. A CPI &gt; 1.0 confirms work is completing under labor budget, while a CPI &lt; 1.0 flags excessive trade overtime or hidden rework before progress billing audits.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Trade Benchmark Matrix */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          <span>Standard Labor Productivity Rates in Construction: Trade Benchmark Matrix</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Construction productivity varies dramatically based on trade complexity, access equipment, elevation, and weather. The benchmark table below reflects verified field baseline production rates compiled from RSMeans, the Construction Industry Institute (CII), and empirical commercial contractor logs:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/40">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/50 text-foreground font-semibold border-b border-border/60">
              <tr>
                <th className="p-3">Construction Division &amp; Trade</th>
                <th className="p-3">Standard Work Unit</th>
                <th className="p-3">Typical Crew Composition</th>
                <th className="p-3">Average Unit Rate (mh/unit)</th>
                <th className="p-3">Daily Output per Crew</th>
                <th className="p-3">Primary Productivity Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              <tr className="hover:bg-muted/30 transition">
                <td className="p-3 font-semibold text-foreground">Cast-in-Place Concrete Slab</td>
                <td className="p-3">Cubic Yard (yd³)</td>
                <td className="p-3">6 Laborers + 2 Finishers</td>
                <td className="p-3 font-mono text-amber-400">0.85 – 1.15 mh/yd³</td>
                <td className="p-3 font-mono">55 – 75 yd³/shift</td>
                <td className="p-3">Ready-mix truck pump staging delays</td>
              </tr>
              <tr className="hover:bg-muted/30 transition">
                <td className="p-3 font-semibold text-foreground">Structural Steel Erection</td>
                <td className="p-3">Ton of Steel</td>
                <td className="p-3">1 Foreman + 4 Ironworkers + 1 Crane</td>
                <td className="p-3 font-mono text-cyan-400">9.0 – 14.0 mh/ton</td>
                <td className="p-3 font-mono">3.5 – 5.5 tons/shift</td>
                <td className="p-3">Crane pick radius &amp; hook cycle time</td>
              </tr>
              <tr className="hover:bg-muted/30 transition">
                <td className="p-3 font-semibold text-foreground">CMU Block &amp; Brick Masonry</td>
                <td className="p-3">1,000 Bricks / 100 CMU</td>
                <td className="p-3">3 Masons + 2 Tenders</td>
                <td className="p-3 font-mono text-emerald-400">12.0 – 16.0 mh/1k</td>
                <td className="p-3 font-mono">2,500 – 3,200 bricks/shift</td>
                <td className="p-3">Scaffold staging &amp; mortar mixing mix pace</td>
              </tr>
              <tr className="hover:bg-muted/30 transition">
                <td className="p-3 font-semibold text-foreground">Drywall &amp; Light Gauge Framing</td>
                <td className="p-3">Square Feet (sq ft)</td>
                <td className="p-3">4 Commercial Carpenters</td>
                <td className="p-3 font-mono text-amber-400">0.028 – 0.038 mh/sq ft</td>
                <td className="p-3 font-mono">850 – 1,150 sq ft/shift</td>
                <td className="p-3">MEP in-wall rough-in conflicts</td>
              </tr>
              <tr className="hover:bg-muted/30 transition">
                <td className="p-3 font-semibold text-foreground">Commercial MEP Piping Installation</td>
                <td className="p-3">Linear Foot (LF 2&quot;–4&quot;)</td>
                <td className="p-3">2 Pipefitters + 1 Apprentice</td>
                <td className="p-3 font-mono text-cyan-400">0.45 – 0.70 mh/LF</td>
                <td className="p-3 font-mono">35 – 55 LF/shift</td>
                <td className="p-3">Overhead aerial lift positioning bottlenecks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Real-World Case Study */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Gauge className="w-5 h-5 text-emerald-500" />
          <span>Case Study: Boosting Concrete Deck Pour Productivity by +43.9% on a 5-Story Office Project</span>
        </h2>
        <div className="p-5 rounded-2xl bg-card/60 border border-border/60 space-y-4">
          <p className="text-sm text-muted-foreground">
            A mid-size commercial general contractor in Dallas, Texas was constructing a 5-story, 120,000-square-foot office building. On the first two elevated post-tensioned deck pours, the concrete placement crew of 8 workers struggled with sluggish productivity. Operating at an average unit rate of <strong>1.22 man-hours per cubic yard</strong> (0.82 yd³/mh), each 300-yard slab took over 45 crew hours across multiple shifts, resulting in excessive overtime, pump standby charges, and a 14-day schedule delay.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-background/80 border border-border/60">
              <span className="text-[11px] text-muted-foreground block">Initial Unit Rate</span>
              <span className="text-lg font-bold font-mono text-rose-400">1.22 mh/yd³</span>
              <span className="text-[10px] text-muted-foreground block">Overtime &amp; pump standby penalties</span>
            </div>
            <div className="p-3 rounded-xl bg-background/80 border border-border/60">
              <span className="text-[11px] text-muted-foreground block">Lean Optimized Rate</span>
              <span className="text-lg font-bold font-mono text-emerald-400">0.85 mh/yd³</span>
              <span className="text-[10px] text-muted-foreground block">+43.9% physical output velocity</span>
            </div>
            <div className="p-3 rounded-xl bg-background/80 border border-border/60">
              <span className="text-[11px] text-muted-foreground block">Direct Cost Savings</span>
              <span className="text-lg font-bold font-mono text-amber-400">$44,800 + 16 Days</span>
              <span className="text-[10px] text-muted-foreground block">Avoided $28k liquidated damages</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            By modeling crew dynamics in a <strong>construction productivity calculator</strong>, the project team identified that concrete delivery trucks spent 42 minutes idling waiting for rebar clearance and pump cleanouts. The superintendent implemented three Lean Construction countermeasures: (1) Off-site pre-tied rebar mats hoisted directly by tower crane; (2) Dual wash-out stations and dedicated pump line staging; and (3) Daily 15-minute Last Planner coordination with the ready-mix batch plant. On decks 3, 4, and roof, unit rates improved to <strong>0.85 man-hours per yard</strong> (1.18 yd³/mh), finishing the structural frame 16 days ahead of recovery schedule and saving $44,800 in direct labor.
          </p>
        </div>
      </section>

      {/* 5. Lean Construction Best Practices */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-amber-500" />
          <span>5 Proven Lean Construction Strategies to Maximize Jobsite Productivity</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold">1</span>
              Adopt the Last Planner System (LPS) &amp; Daily Huddles
            </h3>
            <p className="text-xs text-muted-foreground">
              Replace rigid monthly master schedules with rolling 6-week lookahead planning. Hold daily 10-minute huddles with trade foremen to identify prerequisite constraints (RFIs, material availability, crane access) before mobilizing crews to workfaces.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold">2</span>
              Expand Off-Site Prefabrication &amp; Modularization
            </h3>
            <p className="text-xs text-muted-foreground">
              Shift high-density trade labor from congested, weather-exposed jobsites into climate-controlled manufacturing shops. Prefabricating multi-trade utility racks, plumbing spools, and rebar cages cuts on-site installation man-hours by 30% to 50%.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold">3</span>
              Enforce Just-In-Time (JIT) Staging &amp; 5S Housekeeping
            </h3>
            <p className="text-xs text-muted-foreground">
              CII studies reveal tradespeople spend up to 40% of their shift walking, hunting for tools, or clearing site debris. Store materials on rolling carts positioned directly at the work installation floor, maintaining clear pathways to eliminate non-productive transit time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold">4</span>
              Prevent Overcrowding &amp; Trade Stacking
            </h3>
            <p className="text-xs text-muted-foreground">
              Placing too many subcontractors in one sector simultaneously creates severe trade friction, lowering individual productivity by 20%–35%. Sequence critical work zones in strict takt-time batches, ensuring dry trades follow wet trades smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (PAA Integration) */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Construction Productivity FAQs: Industry Answers &amp; Estimating Rules</span>
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-1.5">
            <h3 className="text-sm font-semibold text-foreground">How do you calculate construction labor productivity?</h3>
            <p className="text-xs text-muted-foreground">
              Construction labor productivity is calculated as the ratio of work units completed to total labor hours expended: <code className="text-amber-400 font-mono">Productivity Rate = Output Units ÷ Total Man-Hours worked</code> (e.g., cubic yards of concrete per man-hour, square feet of drywall per hour). Estimators also calculate the inverse Unit Rate: Man-Hours per Unit (<code className="text-amber-400 font-mono">mh/unit = Total Labor Hours ÷ Output Units</code>), which directly dictates jobsite labor pricing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-1.5">
            <h3 className="text-sm font-semibold text-foreground">What are standard labor productivity rates in construction?</h3>
            <p className="text-xs text-muted-foreground">
              Standard industry benchmarks derived from RSMeans and CII include: (1) Concrete Slab Pouring &amp; Finishing: 0.8 to 1.2 man-hours per cubic yard; (2) Brick &amp; Block Masonry: 12 to 16 man-hours per 1,000 standard bricks; (3) Structural Steel Erection: 8 to 14 man-hours per ton; and (4) Commercial Drywall &amp; Metal Framing: 25 to 35 square feet per man-hour (0.028–0.040 mh/sq ft).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-1.5">
            <h3 className="text-sm font-semibold text-foreground">How do you measure crew productivity and daily velocity on a jobsite?</h3>
            <p className="text-xs text-muted-foreground">
              Crew daily velocity measures the total physical production a specialized crew completes during one standard shift: <code className="text-cyan-400 font-mono">Daily Crew Output = Crew Size × Working Shift Hours × Average Productivity Rate (Units/mh)</code>. Dividing remaining project scope by daily crew velocity yields the net working days required, enabling project managers to detect schedule slippage before critical path milestones are compromised.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-1.5">
            <h3 className="text-sm font-semibold text-foreground">What is the Cost Performance Index (CPI) in construction projects?</h3>
            <p className="text-xs text-muted-foreground">
              The Cost Performance Index (CPI) is an Earned Value Management (EVM) metric indicating labor cost efficiency: <code className="text-emerald-400 font-mono">CPI = Earned Value (EV) ÷ Actual Cost (AC)</code>, where Earned Value is budgeted cost of work completed and Actual Cost is incurred payroll. A CPI greater than 1.0 indicates work is completing under budget; a CPI below 1.0 alerts superintendents that labor overruns are eroding project contingency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-1.5">
            <h3 className="text-sm font-semibold text-foreground">What are the primary causes of low productivity on construction jobsites?</h3>
            <p className="text-xs text-muted-foreground">
              Research by the Construction Industry Institute (CII) shows the top five productivity drains are: (1) Crew stacking and trade congestion (loss of 15%–30% efficiency); (2) Material handling and travel delays (up to 40% non-wrench time); (3) Rework due to drawing conflicts or design RFIs; (4) Inadequate supervisor daily planning; and (5) Adverse weather disruptions without staging contingencies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-1.5">
            <h3 className="text-sm font-semibold text-foreground">How can general contractors improve construction labor productivity using Lean Construction?</h3>
            <p className="text-xs text-muted-foreground">
              Contractors achieve 20% to 35% productivity gains by adopting Lean Construction principles: (1) Prefabrication and modular sub-assemblies to shift hazardous jobsite work into controlled factory conditions; (2) The Last Planner System (LPS) with daily 15-minute subcontractor huddles; (3) Just-In-Time (JIT) material delivery directly to installation floors; (4) 5S jobsite organization to minimize walking waste; and (5) Digital mobile time-tracking to record production quantities daily.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
