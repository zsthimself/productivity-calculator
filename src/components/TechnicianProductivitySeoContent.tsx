/**
 * [INPUT]: 依赖 react；依赖 lucide-react 图标
 * [OUTPUT]: 导出 TechnicianProductivitySeoContent 组件
 * [POS]: src/components 的汽车售后维修与外勤设备工程深度权威 SEO 内容与基准矩阵，承接 /calculator/technician 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import {
  Wrench,
  Gauge,
  Sliders,
  DollarSign,
  CheckCircle2,
  HelpCircle,
  Truck,
  Car,
} from "lucide-react";

export default function TechnicianProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed">
      {/* 1. Visual Architecture Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Wrench className="w-5 h-5 text-cyan-500" />
          <span>Technician Productivity Calculator Architecture &amp; NADA Operational Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Using this interactive <strong>technician productivity calculator</strong>, automotive service directors, dealership fixed-ops managers, field service fleet dispatchers, and plant maintenance supervisors can precisely quantify technician efficiency, labor productivity, hands-on wrench time, and billable gross margin. Rooted in operational standards established by the National Automobile Dealers Association (NADA) and the Association for Facilities Engineering (AFE), this framework distinguishes between how fast a technician beats flat-rate book hours and how effectively scheduled shift hours are utilized on customer revenue jobs.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/technician-productivity-formula.svg"
            alt="Technician productivity calculator formula, NADA automotive flat-rate efficiency, field service wrench-time utilization, and shop profit diagram"
            width="800"
            height="400"
            className="w-full h-auto rounded-lg"
            loading="lazy"
          />
        </div>
      </section>

      {/* 2. Mathematical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-500" />
          <span>The Core Mathematics: 3 Critical Service Technician Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Service managers frequently confuse efficiency and productivity. Understanding the mathematical distinction is the key to identifying whether a shop suffers from slow technicians or poor dispatch workflow:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-cyan-500 uppercase tracking-wider mb-1">
              Automotive Flat-Rate
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Technician Efficiency (%)
            </div>
            <code className="text-xs font-mono bg-background/80 px-2 py-1 rounded block mb-2 text-foreground">
              Eff = (Billed Hrs ÷ Clock Hrs) × 100
            </code>
            <p className="text-xs text-muted-foreground">
              Measures speed and technical mastery against published warranty or retail book times. A technician billing 10 flat-rate hours in 8 clocked hours operates at 125% efficiency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-cyan-500 uppercase tracking-wider mb-1">
              Shop Capacity Model
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Labor Productivity (%)
            </div>
            <code className="text-xs font-mono bg-background/80 px-2 py-1 rounded block mb-2 text-foreground">
              Prod = (Clock Hrs ÷ Avail Shift Hrs) × 100
            </code>
            <p className="text-xs text-muted-foreground">
              Measures shop dispatch efficiency and schedule utilization. If a technician clocks 36 hours working on repair orders out of 40 available weekly hours, productivity is 90%.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-cyan-500 uppercase tracking-wider mb-1">
              Field Service &amp; MRO
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Wrench Time Utilization (%)
            </div>
            <code className="text-xs font-mono bg-background/80 px-2 py-1 rounded block mb-2 text-foreground">
              Wrench = (Tool Hrs ÷ Shift Hrs) × 100
            </code>
            <p className="text-xs text-muted-foreground">
              Quantifies direct hands-on repair work on customer equipment, isolating wasted travel hours, parts room waiting time, and administrative dispatch friction.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Industry Benchmark Matrix */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Gauge className="w-5 h-5 text-cyan-500" />
          <span>Industrial Benchmarks: Technician Productivity Across 5 Maintenance Sectors</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Technician performance expectations vary significantly between fixed-location retail repair facilities and remote field dispatch environments. The table below outlines standard performance quartiles across North American service operations:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/30">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-muted-foreground font-mono uppercase tracking-wider text-[11px] border-b border-border/50">
              <tr>
                <th className="py-3 px-4">Service Sector</th>
                <th className="py-3 px-3">Target Efficiency</th>
                <th className="py-3 px-3">Target Productivity</th>
                <th className="py-3 px-3">Overall Proficiency</th>
                <th className="py-3 px-4">Primary Operational Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  Automotive Master Diagnostic Tech
                </td>
                <td className="py-3 px-3 text-cyan-400 font-bold">125% – 145%</td>
                <td className="py-3 px-3">88% – 95%</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">115% – 135%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  Complex engine/transmission overhauls, electrical diagnosis; multi-bay staging.
                </td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  Fleet Diesel &amp; Heavy Truck Shop
                </td>
                <td className="py-3 px-3 text-cyan-400">95% – 115%</td>
                <td className="py-3 px-3">85% – 92%</td>
                <td className="py-3 px-3 text-emerald-400">90% – 105%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  DOT inspections, preventative maintenance, commercial fleet turnaround velocity.
                </td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  Commercial HVAC &amp; Refrigeration
                </td>
                <td className="py-3 px-3 text-cyan-400">100% – 110%</td>
                <td className="py-3 px-3 text-amber-400">50% – 60% (Wrench)</td>
                <td className="py-3 px-3">80% – 95%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  On-site compressor rebuilds, rooftop unit diagnostics; van parts stock optimization.
                </td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  Industrial Plant Maintenance (MRO)
                </td>
                <td className="py-3 px-3">90% – 105%</td>
                <td className="py-3 px-3 text-amber-400">40% – 55% (Wrench)</td>
                <td className="py-3 px-4">75% – 90%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  Assembly line uptime, MTTR (Mean Time to Repair), predictive vibration checks.
                </td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  Telecom &amp; Security Field Service
                </td>
                <td className="py-3 px-3">95% – 105%</td>
                <td className="py-3 px-3">55% – 65% (Wrench)</td>
                <td className="py-3 px-3 text-emerald-400">85% – 95%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  Fiber optic splicing, camera installations, first-time fix rate per route.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Industrial Service Shop Case Study */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-cyan-500" />
          <span>Case Study: Boosting 6-Bay Repair Shop Efficiency from 80% to 110%</span>
        </h2>
        <div className="p-6 rounded-2xl bg-card/60 border border-border/60 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Baseline Shop Bottlenecks:</h3>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Shop Setup: 6 service bays, 6 technicians, 40 scheduled hours/week per tech.</li>
                <li>Customer Door Labor Rate: $155.00/hr; Technician Wage: $34.00/hr.</li>
                <li>Average Weekly Billed Hours: 32.0 hours per technician.</li>
                <li>Technician Efficiency: 80.0% (lost time waiting at parts counter, slow diagnostic approvals).</li>
                <li>Weekly Labor Gross Profit per Bay: $3,872 ($4,960 revenue − $1,088 wage).</li>
                <li>Total Monthly Shop Labor Gross: $92,928.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Lean Fixed-Ops Intervention:</h3>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Pre-pulled fast-moving brake and suspension parts delivered directly to tech bays.</li>
                <li>Tablet-based digital vehicle inspections (DVI) speeding customer text approvals by 45 min.</li>
                <li>Technician Efficiency rose from 80% to 110% (44.0 billed hours produced weekly).</li>
                <li>Weekly Labor Gross Profit per Bay jumped to $5,324 ($6,820 revenue − $1,496 wage).</li>
                <li><strong>Net Gain:</strong> +$1,452 weekly gross profit per technician (+$34,848/month across the 6-bay shop)!</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t border-border/40">
            <strong>Key Management Takeaway:</strong> Improving technician productivity does not require rushing repair work or compromising quality. By eliminating shop administrative delays and parts counter queues, technicians naturally convert idle clock hours into billable wrench time.
          </p>
        </div>
      </section>

      {/* 5. 5 Lean Technician Management Strategies */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cyan-500" />
          <span>5 Operational Strategies to Maximize Daily Technician Productivity</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">1. Stage Parts Before Vehicle Rack Time</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Eliminate the morning queue at the parts back-counter. Having parts runners or apprentice techs pull filters, fluids, and hardware kits to the technician&apos;s bay prior to vehicle staging recovers 30 to 45 minutes of wasted clock time per shift.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">2. Implement Multi-Bay Staging Per Tech</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Assign senior diagnostic technicians two adjacent service bays. While one vehicle is draining fluids, curing adhesive, or awaiting customer estimate approval, the technician seamlessly transitions to secondary repairs without racking downtime.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">3. Adopt Digital MPI &amp; Video Walkarounds</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Equip service technicians with rugged tablets to capture short video inspections of worn suspension components and fluid leaks. Customer authorization rates increase by 32%, eliminating cold bays waiting for phone tag approvals.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">4. Deploy Stepped Flat-Rate Incentive Tiers</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Structure compensation with graduated productivity escalators (e.g., $32/hr base for 0–35 billed hours; $38/hr retroactive for 36–45 hours; $44/hr for 46+ hours). Transparent tiered structures align technician earnings with shop capacity goals.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">5. Optimize Route Density &amp; Mobile Van Stock</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              For commercial field service fleets (HVAC, plumbing, commercial refrigeration), apply GPS-assisted zone dispatching to cluster calls within compact postal radii. Carrying 95% of top-failure replacement parts on mobile service trucks slashes supply-house supply runs and elevates wrench time from 38% to over 54%.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-500" />
          <span>Frequently Asked Questions About Technician Productivity</span>
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              How do you calculate technician productivity?
            </h3>
            <p className="text-xs text-muted-foreground">
              Technician productivity is calculated by dividing actual clocked hours spent actively working on repair orders by total available scheduled shift hours: <strong>Productivity (%) = (Clock Hours Worked on Jobs ÷ Available Shift Hours) × 100</strong>. For example, if a technician works 36 hours on assigned vehicles during a 40-hour scheduled week, their labor productivity is 90%. The remaining 4 hours represent shop meetings, shop cleaning, or unassigned idle time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              What is the difference between technician efficiency and technician productivity?
            </h3>
            <p className="text-xs text-muted-foreground">
              <strong>Technician Efficiency</strong> measures task speed against flat-rate standards: Billed Hours ÷ Actual Clocked Hours. If a job is estimated at 3.0 book hours and the technician finishes it in 2.0 clock hours, efficiency is 150%. <strong>Technician Productivity</strong> measures schedule utilization: Clocked Hours on Jobs ÷ Available Scheduled Hours. Efficiency reflects mechanical skill and hustle, while productivity reflects shop dispatch flow and lack of downtime.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              What is a good technician efficiency percentage in automotive repair?
            </h3>
            <p className="text-xs text-muted-foreground">
              In automotive dealerships and independent repair facilities, a standard baseline is <strong>100% to 115% efficiency</strong> for experienced certified technicians. Master technicians with specialized diagnostic equipment frequently sustain <strong>125% to 145%+ efficiency</strong>. A shop average below 90% indicates diagnostic struggles, poor tooling, or frequent comeback rework.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              What is wrench time in maintenance and field service?
            </h3>
            <p className="text-xs text-muted-foreground">
              Wrench time (or tool time) is the proportion of a field or industrial maintenance technician&apos;s shift spent physically executing repair and maintenance work on equipment: <strong>Wrench Time (%) = (Direct Hands-on Hours ÷ Total Paid Shift Hours) × 100</strong>. Across industrial maintenance, average unoptimized wrench time is only 30% to 40% due to travel, permit delays, and part retrieval. World-class maintenance operations achieve 55% to 65% wrench time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              What is technician proficiency (or effective labor utilization)?
            </h3>
            <p className="text-xs text-muted-foreground">
              Technician proficiency represents total revenue-generating capacity, combining efficiency and productivity into a single metric: <strong>Proficiency (%) = (Total Billed Flat-Rate Hours ÷ Total Available Scheduled Hours) × 100</strong> (which mathematically equals Efficiency × Productivity). A technician who bills 50 flat-rate hours during a 40-hour paid week achieves 125% proficiency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              How can service managers improve technician billable hours?
            </h3>
            <p className="text-xs text-muted-foreground">
              Service managers increase billable hours by targeting non-wrench bottlenecks: 1) Pre-ordering required maintenance parts based on scheduled appointments, 2) Assigning dedicated service porters to stage vehicles in bays, 3) Implementing digital multipoint inspections to secure instant mobile customer approvals, and 4) Balancing technician dispatch by pairing complex diagnostic work with high-velocity maintenance jobs.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
