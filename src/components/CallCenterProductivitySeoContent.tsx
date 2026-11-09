/**
 * [INPUT]: 依赖 react；依赖 lucide-react 图标
 * [OUTPUT]: 导出 CallCenterProductivitySeoContent 组件
 * [POS]: src/components 的呼叫中心与客服深度权威 SEO 内容与基准矩阵，承接 /calculator/call-center 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import {
  Headphones,
  Clock,
  PhoneCall,
  Users,
  TrendingUp,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  AlertTriangle,
} from "lucide-react";

export default function CallCenterProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed">
      {/* 1. Visual Architecture Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Headphones className="w-5 h-5 text-cyan-400" />
          <span>Call Center Productivity Calculator Architecture &amp; WFM Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Workforce management (WFM) in modern contact centers balances three core dimensions: agent occupancy, call handling velocity, and shrinkage-adjusted staffing capacity. The architecture diagram below illustrates how live talk time, customer hold periods, and after-call work (ACW) synthesize into daily agent occupancy and required gross headcount.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/call-center-productivity-formula.svg"
            alt="Call center productivity calculator formula, agent occupancy, calls per hour, and workforce management shrinkage diagram"
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
          <Sliders className="w-5 h-5 text-cyan-400" />
          <span>The Core Mathematics: 3 Critical Contact Center Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Workforce management analysts, contact center operations managers, and BPO executives rely on three foundational mathematical equations to assess operational health and staff capacity:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              Formula 1: Queue Intensity
            </div>
            <div className="font-semibold text-foreground text-sm mb-2">Agent Occupancy Rate</div>
            <div className="p-2.5 rounded bg-muted/60 font-mono text-xs text-cyan-300 mb-2">
              Occupancy % = (Talk + Hold + ACW) ÷ Logged-In Time × 100
            </div>
            <p className="text-xs text-muted-foreground">
              Measures the percentage of logged-in ready time that an agent spends actively handling interactions versus waiting idle for calls.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
              Formula 2: Schedule Adherence
            </div>
            <div className="font-semibold text-foreground text-sm mb-2">Agent Utilization Rate</div>
            <div className="p-2.5 rounded bg-muted/60 font-mono text-xs text-purple-300 mb-2">
              Utilization % = Logged-In Available ÷ Total Paid Shift × 100
            </div>
            <p className="text-xs text-muted-foreground">
              Evaluates how much of the paid scheduled shift is actually spent logged into phone queues rather than lost to offline tasks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Formula 3: Roster Protection
            </div>
            <div className="font-semibold text-foreground text-sm mb-2">Gross Headcount Capacity</div>
            <div className="p-2.5 rounded bg-muted/60 font-mono text-xs text-emerald-300 mb-2">
              Gross Staff = Net On-Queue Agents ÷ (1 - Shrinkage Factor)
            </div>
            <p className="text-xs text-muted-foreground">
              Inflates base queue staffing requirements to guarantee service level agreements (SLAs) despite PTO, breaks, and training.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Industry Benchmarks Matrix Table */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <span>Contact Center &amp; BPO Industry Operational Benchmarks</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Target agent occupancy and handling velocity vary significantly based on interaction complexity and support tier. The benchmark matrix below highlights standard 2026 performance ranges across inbound customer service, outbound sales, technical escalation, and digital omnichannel desks:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/60 text-muted-foreground uppercase font-mono tracking-wider border-b border-border/60">
              <tr>
                <th className="p-3">Support Environment</th>
                <th className="p-3">Target Occupancy</th>
                <th className="p-3">Average Handle Time (AHT)</th>
                <th className="p-3">Calls Per Hour (CPH)</th>
                <th className="p-3">First Contact Resolution (FCR)</th>
                <th className="p-3">Shrinkage Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border/40 font-mono">
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-semibold text-foreground font-sans">
                  Inbound Tier-1 Customer Care
                </td>
                <td className="p-3 text-cyan-400">80% – 85%</td>
                <td className="p-3">300s – 360s (5–6m)</td>
                <td className="p-3 text-emerald-400">8.0 – 11.0 CPH</td>
                <td className="p-3">75% – 82%</td>
                <td className="p-3 text-muted-foreground">25% – 30%</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-semibold text-foreground font-sans">
                  Outbound Sales &amp; Lead Gen
                </td>
                <td className="p-3 text-purple-400">70% – 76%</td>
                <td className="p-3">150s – 210s (2.5–3.5m)</td>
                <td className="p-3 text-emerald-400">12.0 – 18.0 CPH</td>
                <td className="p-3">80% – 88%</td>
                <td className="p-3 text-muted-foreground">20% – 25%</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-semibold text-foreground font-sans">
                  Technical Support Tier-2 (BPO)
                </td>
                <td className="p-3 text-cyan-400">78% – 83%</td>
                <td className="p-3">550s – 720s (9–12m)</td>
                <td className="p-3 text-emerald-400">4.5 – 6.5 CPH</td>
                <td className="p-3">65% – 74%</td>
                <td className="p-3 text-muted-foreground">28% – 35%</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-semibold text-foreground font-sans">
                  Omnichannel Retail &amp; E-commerce
                </td>
                <td className="p-3 text-emerald-400">82% – 86%</td>
                <td className="p-3">220s – 280s (3.5–4.5m)</td>
                <td className="p-3 text-emerald-400">9.0 – 14.0 CPH</td>
                <td className="p-3">78% – 85%</td>
                <td className="p-3 text-muted-foreground">22% – 28%</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-semibold text-foreground font-sans">
                  Financial &amp; Healthcare Inbound
                </td>
                <td className="p-3 text-amber-400">75% – 82%</td>
                <td className="p-3">420s – 540s (7–9m)</td>
                <td className="p-3 text-emerald-400">6.0 – 8.5 CPH</td>
                <td className="p-3">82% – 90%</td>
                <td className="p-3 text-muted-foreground">26% – 32%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Practical Step-by-Step Worked Problem */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-cyan-400" />
          <span>Real-World Case Study: Staffing &amp; Occupancy for a 50-Agent Support Desk</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          To illustrate how to use the call center productivity calculator to audit workload distribution, consider the following real-world workforce management scenario for a 50-person enterprise helpdesk:
        </p>

        <div className="p-5 rounded-xl bg-card/60 border border-border/50 space-y-4 text-xs">
          <div className="font-semibold text-sm text-foreground">Operational Assumptions:</div>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li><strong>Forecast Demand:</strong> 2,400 incoming customer calls per 8-hour operating shift.</li>
            <li><strong>Average Handle Time (AHT):</strong> 330 seconds (240s talk time + 40s hold time + 50s after-call wrap-up).</li>
            <li><strong>Target Occupancy:</strong> 82% (allowing 18% idle ready time to protect service level response speed).</li>
            <li><strong>Workforce Shrinkage:</strong> 28% (15% internal breaks/meetings/training + 13% external PTO/sick absence).</li>
          </ul>

          <div className="font-semibold text-sm text-foreground pt-2 border-t border-border/40">
            Step-by-Step Mathematical Calculation:
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong>1. Total Workload Demand (Hours):</strong> 2,400 calls × 330 seconds = 792,000 handling seconds. Dividing by 3,600 seconds/hour yields <strong>220.0 contact workload hours</strong> needed on the phones.
            </p>
            <p>
              <strong>2. Productive Queue Hours per Agent:</strong> An 8-hour shift at 82% target occupancy yields 8.0 × 0.82 = <strong>6.56 productive phone hours per agent</strong>.
            </p>
            <p>
              <strong>3. Net On-Queue Agents Needed:</strong> 220.0 contact workload hours ÷ 6.56 hours/agent = <strong>33.54 net agents</strong> (rounded up to 34 agents on the phones simultaneously).
            </p>
            <p>
              <strong>4. Gross Headcount Roster (Factoring Shrinkage):</strong> With 28% shrinkage, each hired employee is available only 72% of the time (1 - 0.28 = 0.72). Gross Headcount = 34 net agents ÷ 0.72 = <strong>47.22 (48 FTE employees)</strong>.
            </p>
            <p>
              <strong>Conclusion:</strong> The contact center requires a roster of <strong>48 full-time agents</strong> to ensure that 34 agents are consistently logged in and handling calls at an optimal 82% occupancy rate without missing SLA queues or driving agent burnout.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Five WFM Strategies to Improve Productivity */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          <span>5 Operational Strategies to Optimize Call Center Productivity</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-card/40 border border-border/40 space-y-1.5">
            <h3 className="font-semibold text-sm text-foreground">1. Keep Agent Occupancy Below 88%</h3>
            <p className="text-xs text-muted-foreground leading-normal">
              Running agents above 88% occupancy creates constant back-to-back calls with zero breather time between interactions. This triggers rapid mental fatigue, elevates error rates, and causes severe staff turnover.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/40 space-y-1.5">
            <h3 className="font-semibold text-sm text-foreground">2. Compress After-Call Work (ACW) with CRM Macros</h3>
            <p className="text-xs text-muted-foreground leading-normal">
              Manual note-taking and ticket tagging often add 60–90 seconds of dead time after every call. Implementing automated CRM macros and AI-driven disposition summaries can cut ACW by 50%, unlocking massive capacity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/40 space-y-1.5">
            <h3 className="font-semibold text-sm text-foreground">3. Disaggregate Internal vs. External Shrinkage</h3>
            <p className="text-xs text-muted-foreground leading-normal">
              Track planned internal shrinkage (coaching, team huddles, system downtime) separately from external absenteeism (sick days, vacation). Targeting avoidable internal schedule leaks is the fastest way to recover phone hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/40 space-y-1.5">
            <h3 className="font-semibold text-sm text-foreground">4. Deploy Blended Omnichannel Queues</h3>
            <p className="text-xs text-muted-foreground leading-normal">
              During predictable call volume troughs (e.g., mid-morning or late afternoon), dynamically route incoming live chats or async email tickets to phone agents. This maintains productive utilization during low call arrival windows.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/40 space-y-1.5 md:col-span-2">
            <h3 className="font-semibold text-sm text-foreground">5. Align First Contact Resolution (FCR) with CPH Metrics</h3>
            <p className="text-xs text-muted-foreground leading-normal">
              Rushing agents off calls to artificially inflate Calls Per Hour (CPH) invariably harms First Contact Resolution (FCR). Repeat caller callbacks generate 2x to 3x more total queue volume later in the week. Prioritize resolution completeness over raw speed.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (PAA & Schema) */}
      <section className="space-y-6 pt-4 border-t border-border/40">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>Frequently Asked Questions About Call Center Productivity</span>
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-card/40 border border-border/40 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              How is call center agent productivity calculated?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Call center productivity is calculated by measuring agent occupancy (the percentage of logged-in queue time spent actively handling customer interactions: Talk Time + Hold Time + Wrap-up ACW divided by Available Ready Time), alongside throughput metrics such as Calls Per Hour (CPH), Average Handle Time (AHT), and First Contact Resolution (FCR).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/40 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              What is the difference between occupancy and utilization in a call center?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Occupancy measures how busy an agent is while logged into the queue ready to take calls: (Total Handling Time ÷ Logged-in Available Time) × 100. Utilization measures how much of the agent's total paid shift was spent logged in and available: (Logged-in Time ÷ Total Scheduled Shift Time) × 100. Occupancy reflects call arrival workload, whereas utilization reflects overall schedule adherence and shrinkage.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/40 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              What is an ideal occupancy rate for call center agents?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The industry gold standard for agent occupancy is between 75% and 85%. An occupancy rate below 70% suggests overstaffing and excessive idle waiting time. Conversely, an occupancy rate exceeding 88% leaves agents with virtually no pause between incoming calls, resulting in agent cognitive exhaustion, reduced empathy, and elevated turnover.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/40 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              What is shrinkage in a call center and what is an acceptable rate?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Shrinkage is the percentage of paid working time during which agents are unavailable to handle customer interactions. It encompasses internal shrinkage (rest breaks, 1-on-1 coaching, team meetings, system technical issues) and external shrinkage (paid time off, vacation, medical sick leave). A normal contact center shrinkage rate ranges between 25% and 35%.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/40 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              How do you calculate calls per hour (CPH)?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Calls Per Hour is calculated by dividing the total number of calls handled during a shift by the net working hours spent logged on queue: CPH = Total Calls Handled ÷ On-Queue Working Hours. For example, an agent who handles 64 calls over an 8-hour shift achieves an average throughput of 8.0 CPH.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/40 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              How does average handle time (AHT) impact call center productivity?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Average Handle Time directly dictates staffing requirements. AHT represents the sum of average talk time, hold time, and after-call work. Reducing AHT by 30 seconds across a 50-agent contact center handling 2,500 daily calls frees up roughly 20 hours of agent labor per day—effectively boosting queue capacity without hiring additional personnel.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Bottom Quality Assurance & Disclaimer */}
      <footer className="pt-6 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <ShieldCheck className="w-4 h-4" />
          <span>WFM Contact Center Operational Benchmark Suite</span>
        </div>
        <div>
          <span>Updated for 2026 Customer Support Operations</span>
        </div>
      </footer>
    </article>
  );
}
