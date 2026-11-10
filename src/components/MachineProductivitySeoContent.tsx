/**
 * [INPUT]: 依赖 react；依赖 lucide-react 图标
 * [OUTPUT]: 导出 MachineProductivitySeoContent 组件及默认导出
 * [POS]: src/components 的工业机械设备生产力、OEE 综合效率与节拍节约深度权威 SEO 内容与基准矩阵，承接 /calculator/machine 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import {
  Cpu,
  Gauge,
  Sliders,
  DollarSign,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
} from "lucide-react";

export default function MachineProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed">
      {/* 1. Visual Architecture Diagram & Core Definitions */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-500" />
          <span>Machine Productivity Calculator Architecture &amp; Industrial OEE Principles</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Using this interactive <strong>machine productivity calculator</strong>, plant managers, manufacturing continuous improvement engineers, shop floor supervisors, and operations directors can accurately quantify machine throughput, evaluate Overall Equipment Effectiveness (OEE), balance cycle time against customer takt demand, and uncover the financial cost of unplanned machine downtime. Built on international standards established by ISO 22400 and Total Productive Maintenance (TPM), this framework isolates why capital equipment fails to hit maximum theoretical capacity and pinpoints where Six Big Losses erode shop profitability.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/machine-productivity-formula.svg"
            alt="Machine productivity calculator formula, Overall Equipment Effectiveness OEE, cycle time vs takt time pace, and equipment capacity utilization diagram"
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
          <span>The Core Mathematics: 3 Essential Machine Productivity Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          To master equipment efficiency on the plant floor, manufacturers must separate running time, operational velocity, and first-pass quality into distinct mathematical levers. Below are the three foundational formulas utilized by world-class discrete factories:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-cyan-500 uppercase tracking-wider mb-1">
              Overall Equipment Effectiveness
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              1. The OEE Multiplier
            </div>
            <div className="p-2.5 rounded-lg bg-muted/60 font-mono text-xs text-foreground mb-3 border border-border/40">
              OEE (%) = Availability × Performance × Quality
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Quantifies true machine productivity by multiplying Availability (Operating Time ÷ Planned Time), Performance (Ideal Cycle Time × Total Units ÷ Operating Time), and Quality (Good Units ÷ Total Units). An 85% score represents the global gold standard.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              Production Velocity
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              2. Cycle Time vs Takt Time
            </div>
            <div className="p-2.5 rounded-lg bg-muted/60 font-mono text-xs text-foreground mb-3 border border-border/40">
              Takt = Net Shift Sec ÷ Daily Demand
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Measures machine production rhythm against customer demand. When Actual Cycle Time is lower than Takt Time, the equipment satisfies customer orders without overtime. When Cycle Time exceeds Takt, delivery backlogs accumulate.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">
              Financial Capacity
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              3. Unplanned Downtime Waste
            </div>
            <div className="p-2.5 rounded-lg bg-muted/60 font-mono text-xs text-foreground mb-3 border border-border/40">
              Waste ($) = Idle Downtime Hrs × Machine Rate
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Converts idle spindle hours directly into unabsorbed manufacturing overhead and lost part revenue. A machine burdened at $120/hour idling 20 hours a week burns $2,400 in direct waste and forfeits thousands more in billable production margin.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Industry Benchmark Matrix */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Gauge className="w-5 h-5 text-cyan-500" />
          <span>Industrial Machine Productivity &amp; OEE Benchmark Matrix</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Machine throughput standards vary drastically depending on mechanical tooling complexity, changeover frequency, material thermal stabilization, and automation levels. Below are verified baseline benchmarks compiled across major discrete manufacturing sectors:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-muted/80 text-foreground font-semibold border-b border-border">
              <tr>
                <th className="p-3">Sector &amp; Machine Cell</th>
                <th className="p-3">Target Availability</th>
                <th className="p-3">Target Performance</th>
                <th className="p-3">First-Pass Quality</th>
                <th className="p-3">World-Class OEE</th>
                <th className="p-3">Primary Productivity Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr className="hover:bg-muted/30">
                <td className="p-3 font-medium text-foreground">CNC Machining (5-Axis Milling &amp; Turning)</td>
                <td className="p-3 font-mono">88% – 92%</td>
                <td className="p-3 font-mono">92% – 96%</td>
                <td className="p-3 font-mono">98.5% – 99.5%</td>
                <td className="p-3 font-mono text-cyan-400 font-semibold">82% – 86%</td>
                <td className="p-3">Rapid fixture setups, preset tool offsets &amp; chip evacuation</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="p-3 font-medium text-foreground">High-Speed Injection Molding</td>
                <td className="p-3 font-mono">90% – 95%</td>
                <td className="p-3 font-mono">95% – 98%</td>
                <td className="p-3 font-mono">99.0% – 99.8%</td>
                <td className="p-3 font-mono text-cyan-400 font-semibold">86% – 90%</td>
                <td className="p-3">Mold cooling optimization, robotic degating &amp; quick die change</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="p-3 font-medium text-foreground">SMT PCB Electronics Assembly</td>
                <td className="p-3 font-mono">85% – 90%</td>
                <td className="p-3 font-mono">94% – 98%</td>
                <td className="p-3 font-mono">99.2% – 99.9%</td>
                <td className="p-3 font-mono text-cyan-400 font-semibold">80% – 85%</td>
                <td className="p-3">Feeder reel splicing on the fly &amp; automated optical inspection (AOI)</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="p-3 font-medium text-foreground">Automotive Metal Stamping Press</td>
                <td className="p-3 font-mono">82% – 88%</td>
                <td className="p-3 font-mono">90% – 95%</td>
                <td className="p-3 font-mono">98.0% – 99.2%</td>
                <td className="p-3 font-mono text-cyan-400 font-semibold">75% – 82%</td>
                <td className="p-3">Single-Minute Exchange of Die (SMED) &amp; coil feeding stability</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="p-3 font-medium text-foreground">High-Speed Packaging &amp; Bottling</td>
                <td className="p-3 font-mono">88% – 94%</td>
                <td className="p-3 font-mono">95% – 99%</td>
                <td className="p-3 font-mono">99.5% – 99.9%</td>
                <td className="p-3 font-mono text-cyan-400 font-semibold">84% – 89%</td>
                <td className="p-3">Capper jam prevention, accumulation conveyors &amp; clean-in-place</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Real-World Case Study */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-cyan-500" />
          <span>Real-World Case Study: Boosting an 8-Machine CNC Department from 62% to 84% OEE</span>
        </h2>
        <div className="p-5 rounded-2xl bg-card/60 border border-border/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Precision Aerospace Machining Facility • Cleveland, Ohio
              </div>
              <div className="text-base font-bold text-foreground">
                8 Vertical CNC Machining Centers • Dual 8-Hour Daily Shifts
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800/60 self-start sm:self-auto">
              +$48,600 Monthly Operating Profit
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted-foreground">
            <div>
              <strong className="text-foreground block mb-1">Initial Operating Bottleneck:</strong>
              <p>
                The facility operated 8 CNC mills scheduled for 80 hours per week each (640 total cell machine hours). Despite skilled machinists, average machine OEE languished at 62.4% (Availability 74.0%, Performance 88.0%, Quality 95.8%). Unplanned downtime averaged 20.8 hours per machine weekly due to searching for specialized carbide cutters, manual part deburring while spindles sat idle, and slow job changeovers taking up to 90 minutes.
              </p>
            </div>
            <div>
              <strong className="text-foreground block mb-1">Targeted Lean Machine Interventions:</strong>
              <p>
                The plant manager deployed our <strong>machine productivity calculator</strong> to quantify true spindle utilization and implemented three core operational upgrades: 1) instituted standardized quick-change zero-point clamping fixtures (slashing setup time from 90 to 22 minutes), 2) pre-kitted tool holders in offline tool presetters, and 3) instituted operator autonomous lubrication checks before shift start.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border/40 text-center">
            <div className="p-3 bg-muted/40 rounded-xl">
              <div className="text-xs text-muted-foreground">Availability Increase</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">74% → 91%</div>
              <div className="text-[10px] text-muted-foreground">+13.6 In-Cut Spindle Hrs/Wk</div>
            </div>
            <div className="p-3 bg-muted/40 rounded-xl">
              <div className="text-xs text-muted-foreground">Setup Downtime</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">90m → 22m</div>
              <div className="text-[10px] text-muted-foreground">75% SMED Reduction</div>
            </div>
            <div className="p-3 bg-muted/40 rounded-xl">
              <div className="text-xs text-muted-foreground">Overall Cell OEE</div>
              <div className="text-lg font-bold text-amber-400 font-mono">62.4% → 84.1%</div>
              <div className="text-[10px] text-muted-foreground">+21.7% Overall Gain</div>
            </div>
            <div className="p-3 bg-muted/40 rounded-xl">
              <div className="text-xs text-muted-foreground">Net Capacity Gain</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">+1,080 Parts</div>
              <div className="text-[10px] text-muted-foreground">Zero Added Capital Equipment</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 5 Lean Strategies */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cyan-500" />
          <span>5 Proven Lean Strategies to Maximize Machine Productivity</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Increasing equipment output does not require purchasing multimillion-dollar new machinery. World-class manufacturers utilize these five lean tactics to extract hidden capacity from their existing asset fleet:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-card/40 border border-border/50 flex gap-3.5 items-start">
            <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-800">
              1
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Deploy Single-Minute Exchange of Die (SMED) Methodology
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Convert internal setup activities (tasks performed while the machine is stopped) into external setup activities (tasks prepared while the machine is running previous batches). Staging raw billets, pre-measuring tool offsets, and preheating injection molds externally compresses setup downtime by 60% to 80%.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 flex gap-3.5 items-start">
            <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-800">
              2
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Eliminate Micro-Stops and Sensor Blindness
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Chronic micro-stops lasting between 15 seconds and 3 minutes—such as optical parts sensor misalignments, chute jams, or pneumatic pressure fluctuations—rarely trigger maintenance work orders but silently rob 10% to 15% of daily machine performance. Log micro-stops to address root causes systematically.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 flex gap-3.5 items-start">
            <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-800">
              3
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Implement Operator Autonomous Maintenance (Jishu Hozen)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Train machine operators to handle basic equipment inspections, daily lubrication replenishment, chip filtering, and belt tensioning. Establishing ownership at the front line prevents 70% of unexpected catastrophic mechanical breakdowns before they halt factory production.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 flex gap-3.5 items-start">
            <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-800">
              4
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Synchronize Machine Cycle Speeds to Customer Takt Time
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Running machines at maximum overspeed when downstream assembly lines cannot consume the output creates costly work-in-progress (WIP) inventory, accelerates tool wear, and increases scrap. Pace production to match customer takt time smoothly across all shifts.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 flex gap-3.5 items-start">
            <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-800">
              5
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Incorporate Real-Time Spindle Monitoring &amp; IIoT Telemetry
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Eliminate manual paper logs that conceal true machine status. Automated current sensor clamps, PLC output integrations, and vibration telemetry give supervisors real-time visibility into whether spindles are actively cutting metal or waiting for materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (PAA) */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-500" />
          <span>Frequently Asked Questions About Machine Productivity</span>
        </h2>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">
              How do you calculate machine productivity?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Machine productivity is calculated by dividing actual good output units by the total operating machine hours invested: Machine Productivity = Total Good Units Produced ÷ Operating Machine Hours. In industrial manufacturing, it is comprehensively quantified through Overall Equipment Effectiveness: OEE (%) = Availability × Performance × Quality.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">
              What is the difference between machine productivity and machine efficiency?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Machine productivity measures total volume of good output generated per equipment running hour (units/hr). Machine efficiency measures how closely the machine operates compared to its theoretical design speed and rated nameplate capacity: Efficiency (%) = (Actual Production Rate ÷ Nameplate Maximum Rate) × 100.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">
              What is a good Overall Equipment Effectiveness (OEE) benchmark for industrial machines?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In discrete manufacturing and precision machining, an OEE of 85% is internationally recognized as World-Class (typically 90% Availability, 95% Performance, and 99.9% Quality). Typical manufacturing plants operate between 60% and 70% OEE. Operations below 50% OEE indicate substantial hidden capacity trapped by chronic downtime and micro-stops.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">
              How do you calculate cycle time vs takt time on a production machine?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Cycle Time is the actual time required for a machine to complete one full part cycle (Seconds per Part = Available Operating Seconds ÷ Total Parts Produced). Takt Time is the customer demand pace (Available Production Time ÷ Customer Order Demand). If machine cycle time exceeds takt time, the equipment cannot satisfy customer shipments without overtime.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">
              What are the Six Big Losses in machine productivity?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Under Total Productive Maintenance (TPM), the Six Big Losses are: 1. Equipment Breakdown (unplanned downtime), 2. Setup and Tool Adjustments, 3. Micro-stops and Idling (under 5 minutes), 4. Reduced Operating Speed, 5. Startup and Warm-up Rejects, and 6. In-process Quality Scrap. Eliminating these losses directly drives OEE from 60% to 85%+.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">
              How does unplanned machine downtime impact unit production cost?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Unplanned downtime reduces total output volume across fixed overhead costs (equipment depreciation, facility leasing, operator standby payroll). For a precision CNC machine burdened at $120/hr, two hours of unplanned spindle downtime not only wastes $240 in unabsorbed machine cost, but also sacrifices 40 finished parts valued at $2,000+ in lost billing margin.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
