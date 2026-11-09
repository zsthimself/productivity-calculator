/**
 * [INPUT]: 依赖 react；依赖 lucide-react 图标
 * [OUTPUT]: 导出 WeldingProductivitySeoContent 组件
 * [POS]: src/components 的工业焊接与金属构件制造深度权威 SEO 内容与基准矩阵，承接 /calculator/welding 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import {
  Flame,
  Gauge,
  Sliders,
  DollarSign,
  CheckCircle2,
  HelpCircle,
  Wrench,
  Cpu,
} from "lucide-react";

export default function WeldingProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed">
      {/* 1. Visual Architecture Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500" />
          <span>Welding Productivity Calculator Architecture &amp; AWS Deposition Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Using this industrial <strong>welding productivity calculator</strong>, structural steel fabricators, pipe shop superintendents, manufacturing plant managers, and welding engineers can accurately quantify filler metal deposition rate, arc-on operating factor, joint volume consumption, and true fabrication cost per linear foot. In modern metal fabrication facilities governed by American Welding Society (AWS) and ASME standards, total welding productivity is dominated by labor efficiency rather than consumable wire prices—making operating factor and deposition velocity the two primary levers for production profitability.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/welding-productivity-formula.svg"
            alt="Welding productivity calculator formula, AWS deposition rate model, arc-on operating factor, and fabrication cost per foot diagram"
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
          <Sliders className="w-5 h-5 text-amber-500" />
          <span>The Core Mathematics: 3 Critical Industrial Welding Productivity Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Welding process engineers and metal fabrication estimators rely on three foundational mathematical formulas to evaluate welder productivity per day, joint filling velocity, and unit fabrication costs:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              AWS Deposition Model
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Effective Deposition Rate
            </div>
            <code className="text-xs font-mono bg-background/80 px-2 py-1 rounded block mb-2 text-foreground">
              DepRate = Gross × Eff × ArcFactor
            </code>
            <p className="text-xs text-muted-foreground">
              Calculates net deposited weld metal per scheduled shift hour, multiplying the raw arc deposition rate by process deposition efficiency (85%–93%) and the shop arc-on operating factor (20%–50%).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              Joint Volume Model
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Filler Metal Weight Required
            </div>
            <code className="text-xs font-mono bg-background/80 px-2 py-1 rounded block mb-2 text-foreground">
              Weight = (Area × Length × ρ) ÷ Eff
            </code>
            <p className="text-xs text-muted-foreground">
              Computes total gross electrode or wire purchases needed to fill a specified joint profile (fillet or groove), factoring in steel density (0.2833 lbs/in³) and root reinforcement.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              Shop Economic Model
            </div>
            <div className="text-sm font-semibold text-foreground mb-2">
              Welding Cost Per Linear Foot
            </div>
            <code className="text-xs font-mono bg-background/80 px-2 py-1 rounded block mb-2 text-foreground">
              Cost/Ft = (Labor + Wire + Gas) ÷ Ft
            </code>
            <p className="text-xs text-muted-foreground">
              Derives complete linear fabrication cost across direct welder labor, fully burdened overhead, consumable wire, and shielding gas expenditure per completed foot of structural weld.
            </p>
          </div>
        </div>
      </section>

      {/* 3. AWS Process Benchmark Matrix */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Gauge className="w-5 h-5 text-amber-500" />
          <span>Industrial Benchmarks: Deposition &amp; Operating Factors Across 5 Welding Processes</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          The table below illustrates standard industrial benchmarks published by the American Welding Society (AWS) and major consumable manufacturers (Lincoln Electric, ESAB, Miller Electric). Notice how semi-automatic and continuous wire processes significantly outperform manual stick welding in both deposition velocity and welder operating factor:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/30">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-muted-foreground font-mono uppercase tracking-wider text-[11px] border-b border-border/50">
              <tr>
                <th className="py-3 px-4">Welding Process</th>
                <th className="py-3 px-3">Deposition Efficiency</th>
                <th className="py-3 px-3">Typical Deposition Rate</th>
                <th className="py-3 px-3">Shop Operating Factor</th>
                <th className="py-3 px-4">Primary Application &amp; Cost Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  GMAW / MIG (Solid Wire ER70S-6)
                </td>
                <td className="py-3 px-3 text-cyan-400">92% – 95%</td>
                <td className="py-3 px-3">6.0 – 9.0 lbs/hr</td>
                <td className="py-3 px-3 text-emerald-400">35% – 45%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  Sheet metal, light structural, robotic cells; minimal slag cleanup.
                </td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  FCAW (Gas-Shielded Flux-Cored)
                </td>
                <td className="py-3 px-3 text-cyan-400">82% – 88%</td>
                <td className="py-3 px-3 font-bold text-amber-400">8.0 – 14.0 lbs/hr</td>
                <td className="py-3 px-3 text-emerald-400">40% – 50%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  Heavy structural steel, shipbuilding, bridge fabrication; highest deposition in position.
                </td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  SMAW (Stick Electrode E7018)
                </td>
                <td className="py-3 px-3 text-amber-400">60% – 68%</td>
                <td className="py-3 px-3">3.0 – 5.5 lbs/hr</td>
                <td className="py-3 px-3 text-rose-400">18% – 25%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  Field erection, pipe tie-ins, maintenance; high stub and slag cleanup labor loss.
                </td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  SAW (Submerged Arc Welding)
                </td>
                <td className="py-3 px-3 text-cyan-400">98% – 99%</td>
                <td className="py-3 px-3 font-bold text-emerald-400">15.0 – 35.0 lbs/hr</td>
                <td className="py-3 px-3 text-emerald-400">55% – 70%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  Pressure vessels, wind towers, heavy plate girder seams; mechanized high-capacity.
                </td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  GTAW / TIG (Gas Tungsten Arc)
                </td>
                <td className="py-3 px-3 text-cyan-400">95% – 98%</td>
                <td className="py-3 px-3 text-rose-400">1.5 – 3.0 lbs/hr</td>
                <td className="py-3 px-3 text-rose-400">15% – 25%</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  Sanitary stainless tubing, aerospace, critical root passes; precision focus.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Industrial Fabrication Case Study */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-amber-500" />
          <span>Case Study: Upgrading a Structural Steel Shop from Stick to Flux-Cored</span>
        </h2>
        <div className="p-6 rounded-2xl bg-card/60 border border-border/60 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Shop Scenario &amp; Baseline Conditions:</h3>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Project: 300 linear feet of 5/16-inch structural fillet welds on steel columns.</li>
                <li>Baseline Process: SMAW (Stick E7018, 5/32" electrode).</li>
                <li>Operating Factor: 22% (frequent stub discard, electrode reloading, chip chipping).</li>
                <li>Deposition Rate: 4.5 lbs/hr (Gross arc time); Deposition Efficiency: 65%.</li>
                <li>Burdened Shop Labor Rate: $65.00/hour.</li>
                <li>Baseline Output: Total fabrication cost: $1,260 ($4.20 per linear foot); 18.2 shop labor hours.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-foreground">Lean Process Intervention (FCAW Upgrade):</h3>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Upgraded to Gas-Shielded Flux-Cored (E71T-1M, 0.045" wire on 33-lb spools).</li>
                <li>Operating Factor improved from 22% to 45% (continuous wire feed, minimal stops).</li>
                <li>Deposition Rate increased to 10.5 lbs/hr; Deposition Efficiency: 85%.</li>
                <li>Total Fabrication Cost dropped to $645 ($2.15 per linear foot).</li>
                <li>Total Labor Hours required dropped from 18.2 hours to 6.2 hours.</li>
                <li><strong>Net Savings:</strong> $615 saved and 12.0 labor hours freed up in a single shift!</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t border-border/40">
            <strong>Key Engineering Takeaway:</strong> In manual welding operations, direct labor accounts for 80% to 85% of total weld cost. Even though flux-cored wire carries a slightly higher initial purchase price per pound than stick electrodes, the reduction in labor hours yields a 48% reduction in cost per linear foot.
          </p>
        </div>
      </section>

      {/* 5. 5 Lean Welding Operations Strategies */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-500" />
          <span>5 Operational Strategies to Maximize Daily Welder Productivity</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">1. Transition to Continuous Wire Processes</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Replace stick electrode welding with gas-shielded FCAW or metal-cored wire whenever work is performed under roof. Continuous feeding increases arc-on operating factor from under 25% to over 45%, doubling daily deposited metal without worker fatigue.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">2. Position Welds in Flat &amp; Horizontal Orientations</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Utilize welding positioners, turntables, and turning rolls to eliminate vertical-up and overhead welding. Welding in the 1F and 1G flat positions permits higher amperage, thicker wire diameters, and 50% to 100% higher deposition rates.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">3. Standardize on Bulk Wire Drums</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Switch high-throughput bays from 33-lb or 44-lb spools to 500-lb or 900-lb bulk payoff drums. Eliminating spool changeover downtime recovers 30 to 45 minutes of productive arc time per welder each week.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">4. Prevent Over-Welding &amp; Joint Over-Filling</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Enforce fillet gauge verification. Increasing a fillet weld leg size from 1/4" to 5/16" requires 56% more deposited weld metal and 56% more arc time, without providing any engineered structural benefit under AWS D1.1 specifications.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-sm text-foreground">5. Deploy Arc-On Time Monitoring Systems</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Equip modern digital power sources with cloud-connected arc-time telemetry. Real-time feedback identifies bottlenecks in material handling, fit-up delays, and grinding excess, allowing shop foremen to systematically elevate shop operating factors from 28% to 42%.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Frequently Asked Questions About Welding Productivity</span>
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              How do you calculate welding productivity?
            </h3>
            <p className="text-xs text-muted-foreground">
              Welding productivity is calculated using two primary metrics: Deposition Productivity and Labor Velocity. In deposition terms: <strong>Effective Deposition Rate (lbs/hr) = Gross Deposition Rate × Deposition Efficiency × Arc-On Operating Factor</strong>. In fabrication terms: <strong>Welding Labor Productivity = Completed Linear Feet (or Joint Inches) ÷ Total Scheduled Welder Hours</strong>. Comparing this against theoretical arc time reveals true shop operating efficiency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              What is welder productivity per day?
            </h3>
            <p className="text-xs text-muted-foreground">
              Average welder productivity per 8-hour shift depends heavily on the welding process and shop environment. In structural manual stick welding (SMAW), a welder typically deposits <strong>8 to 14 pounds of weld metal per day</strong> (approx. 20% to 25% arc time). In semi-automatic MIG (GMAW) or flux-cored (FCAW) shop fabrication, output rises to <strong>25 to 45 pounds of deposited metal per day</strong> (approx. 35% to 45% arc time). Automated submerged arc (SAW) cells frequently exceed <strong>100 to 180 pounds per day</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              What is the arc-on operating factor in welding?
            </h3>
            <p className="text-xs text-muted-foreground">
              The arc-on operating factor (or duty cycle) is the percentage of a welder's scheduled shift during which the welding arc is actively struck and depositing metal: <strong>Operating Factor (%) = (Actual Arc Hours ÷ Total Scheduled Shift Hours) × 100</strong>. The remainder of the shift is consumed by part positioning, preheating, tacking, slag chipping, grinding, nozzle cleaning, and inspecting joint fit-ups. Industry benchmarks range from 15%–25% for manual stick to 40%–50% for flux-cored wire.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              How do you calculate welding deposition rate?
            </h3>
            <p className="text-xs text-muted-foreground">
              Welding deposition rate measures the weight of filler metal deposited into the joint per unit of continuous arc time (lbs/hr or kg/hr): <strong>Deposition Rate = (Wire Feed Speed in in/min × 60 min/hr × Weight per Inch of Wire) × Deposition Efficiency</strong>. Alternatively, it can be tested empirically by weighing a test steel plate before and after exactly 2 minutes of continuous arc welding, then extrapolating the net weight gain to an hour.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              Why does labor represent 80% to 85% of total welding costs?
            </h3>
            <p className="text-xs text-muted-foreground">
              Welding is a labor-intensive craft requiring skilled certified tradespeople. While solid wire consumables cost approximately $1.80 to $2.80 per pound and shielding gases add $0.30 to $0.60 per pound, burdened shop labor (wages, healthcare, insurance, payroll taxes, facility overhead) typically costs $55 to $85+ per hour. Because deposition rates are limited by operating factor, reducing labor hours through higher wire efficiency saves dramatically more money than buying cheaper electrodes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="font-semibold text-sm text-foreground">
              What is the financial impact of over-welding?
            </h3>
            <p className="text-xs text-muted-foreground">
              Over-welding occurs when a welder makes a fillet weld larger than the engineering drawing specifies. Because weld volume scales quadratically with fillet leg size (Volume ∝ Leg²), increasing a fillet weld from 3/16" to 1/4" increases filler metal and arc time by 78%. Increasing from 1/4" to 5/16" increases cost by 56%. Over-welding adds zero structural safety while causing excessive heat distortion, higher grinding time, and wasted labor dollars.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
