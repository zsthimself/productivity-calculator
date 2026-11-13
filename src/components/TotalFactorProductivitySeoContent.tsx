/**
 * [INPUT]: 依赖 react；依赖 next/link；依赖 lucide-react 图标
 * [OUTPUT]: TotalFactorProductivitySeoContent 组件（承接 /calculator/total-factor-productivity 长尾深度正文、BLS/OECD 基准表与 Excel 公式）
 * [POS]: src/components 的 TFP / Multifactor Productivity 语义权威文章与 FAQ 可见正文
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import Link from "next/link";
import { Calculator, HelpCircle, Layers, Scale, TrendingUp } from "lucide-react";

export default function TotalFactorProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed font-body">
      {/* 1. Overview & Architecture Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-400" />
          <span>How a Total Factor Productivity Calculator Isolates True Innovation</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          A <strong className="text-white">total factor productivity calculator</strong> measures the share of economic output that cannot be explained solely by adding more labor hours or capital equipment. Known mathematically as the Solow Residual (<span className="font-mono text-cyan-300">A</span>) in the Cobb-Douglas production function <span className="font-mono text-cyan-300">Y = A · K^&alpha; · L^(1&minus;&alpha;)</span>, Total Factor Productivity (TFP) captures gains from workflow automation, supply-chain architecture, software adoption, and workforce skill.
        </p>
        <p className="text-sm text-muted-foreground">
          In operational finance and U.S. Bureau of Labor Statistics (BLS) industry accounting, teams frequently pair Cobb-Douglas modeling with a cost-weighted <strong className="text-white">multifactor productivity calculator</strong> (KLEMS: Capital, Labor, Energy, Materials, and Purchased Services). Running both lenses together protects executives from a costly trap: boosting output per worker simply by over-investing in expensive capital hardware that lowers net return on total inputs.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/total-factor-productivity-formula.svg"
            alt="Total factor productivity calculator diagram illustrating Cobb-Douglas TFP, KLEMS multifactor productivity, and Solow Residual growth"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* 2. Formulas Comparison */}
      <section className="space-y-5">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-400" />
          <span>Cobb-Douglas TFP vs. Multifactor Productivity (MFP) Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Whether you are analyzing macroeconomic growth accounting or auditing a multi-shift manufacturing plant, select the exact specification that matches your input data format:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-blue-500/30 bg-card/60 p-5 space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase text-blue-400">1. Cobb-Douglas TFP</div>
            <div className="p-2.5 rounded-lg bg-muted/40 font-mono text-xs text-blue-200">
              A = Y &divide; (K^&alpha; &times; L^&beta;)
            </div>
            <p className="text-xs text-muted-foreground">
              Solves baseline Total Factor Productivity <span className="font-mono">A</span> given real GDP or revenue (<span className="font-mono">Y</span>), capital stock (<span className="font-mono">K</span>), labor hours (<span className="font-mono">L</span>), and income shares (&alpha;, &beta;).
            </p>
          </div>

          <div className="rounded-xl border border-purple-500/30 bg-card/60 p-5 space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase text-purple-400">2. KLEMS Multifactor (MFP)</div>
            <div className="p-2.5 rounded-lg bg-muted/40 font-mono text-xs text-purple-200">
              MFP = Output &divide; (Labor + Capital + Materials)
            </div>
            <p className="text-xs text-muted-foreground">
              Ideal when a firm tracks dollar expenses rather than physical capital stock. Compare two periods on an indexed 100.0 scale in our <strong className="text-white">multifactor productivity calculator</strong> tab.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-card/60 p-5 space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase text-emerald-400">3. Solow Growth Residual</div>
            <div className="p-2.5 rounded-lg bg-muted/40 font-mono text-xs text-emerald-200">
              %ΔA = %ΔY &minus; &alpha;%ΔK &minus; (1&minus;&alpha;)%ΔL
            </div>
            <p className="text-xs text-muted-foreground">
              Decomposes year-over-year output growth into capital deepening, headcount expansion, and pure efficiency progress.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Benchmark Table by Sector */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <span>Typical Income Share (&alpha; / &beta;) &amp; Annual TFP Benchmarks</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          According to OECD Productivity Database and Federal Reserve sectoral studies, calibrated Cobb-Douglas weights vary significantly between equipment-heavy plants and knowledge-intensive services:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/40">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-white/5 text-white font-display uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 border-b border-white/10">Industry Category</th>
                <th className="p-3 border-b border-white/10">Capital Share (&alpha;)</th>
                <th className="p-3 border-b border-white/10">Labor Share (1&minus;&alpha;)</th>
                <th className="p-3 border-b border-white/10">Typical Annual TFP Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-white">Macro Economy (U.S. Nonfarm Business)</td>
                <td className="p-3 font-mono text-cyan-300">0.33 – 0.36</td>
                <td className="p-3 font-mono">0.64 – 0.67</td>
                <td className="p-3 font-mono">+0.8% to +1.6% / yr</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Discrete Manufacturing &amp; Robotics</td>
                <td className="p-3 font-mono text-cyan-300">0.40 – 0.48</td>
                <td className="p-3 font-mono">0.52 – 0.60</td>
                <td className="p-3 font-mono">+1.5% to +3.2% / yr</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Software, SaaS &amp; AI Engineering</td>
                <td className="p-3 font-mono text-cyan-300">0.22 – 0.30</td>
                <td className="p-3 font-mono">0.70 – 0.78</td>
                <td className="p-3 font-mono">+2.5% to +5.5% / yr</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Logistics, Warehousing &amp; Freight</td>
                <td className="p-3 font-mono text-cyan-300">0.35 – 0.42</td>
                <td className="p-3 font-mono">0.58 – 0.65</td>
                <td className="p-3 font-mono">+1.0% to +2.4% / yr</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Retail &amp; Hospitality Services</td>
                <td className="p-3 font-mono text-cyan-300">0.25 – 0.32</td>
                <td className="p-3 font-mono">0.68 – 0.75</td>
                <td className="p-3 font-mono">+0.5% to +1.4% / yr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Worked Case Study + Excel Formulas */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          <span>Worked Example &amp; Excel Formulas for Multifactor Productivity</span>
        </h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-2 text-xs sm:text-sm text-muted-foreground">
          <div className="font-bold text-white">Worked Growth Accounting Example (Mid-Size Assembly Plant)</div>
          <p>
            Suppose real plant output expands by <strong>+7.4%</strong> year-over-year after deploying automated QA vision sensors. Over the same span, capital investment grows <strong>+5.0%</strong> (<span className="font-mono">&alpha; = 0.35</span>) and total shift labor hours expand <strong>+3.2%</strong> (<span className="font-mono">1&minus;&alpha; = 0.65</span>):
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-white/90">
            <li>Capital contribution = 0.35 &times; 5.0% = +1.75%</li>
            <li>Labor contribution = 0.65 &times; 3.2% = +2.08%</li>
            <li>Solow Residual (TFP Growth) = 7.40% &minus; 1.75% &minus; 2.08% = <strong>+3.57%</strong> (48.2% of total growth came from true process efficiency)</li>
          </ul>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/40">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-white/5 text-white font-display uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 border-b border-white/10">Model Type</th>
                <th className="p-3 border-b border-white/10">Excel / Google Sheets Formula</th>
                <th className="p-3 border-b border-white/10">Inputs Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-white">Cobb-Douglas TFP (A)</td>
                <td className="p-3 font-mono text-cyan-300">=A2/((B2^D2)*(C2^(1-D2)))</td>
                <td className="p-3">A2 Output, B2 Capital, C2 Labor, D2 Alpha</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">KLEMS Cost MFP Ratio</td>
                <td className="p-3 font-mono text-cyan-300">=A2/(B2+C2+D2)</td>
                <td className="p-3">A2 Output $, B2 Labor $, C2 Capital $, D2 Materials $</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Solow Growth Residual</td>
                <td className="p-3 font-mono text-cyan-300">=A2-(D2*B2)-((1-D2)*C2)</td>
                <td className="p-3">A2 %ΔY, B2 %ΔK, C2 %ΔL, D2 Alpha</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Visible FAQ Section & Cross-Links */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <span>Total Factor &amp; Multifactor Productivity FAQ</span>
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold text-white mb-1">Why use a total factor productivity calculator instead of output per worker?</h3>
            <p className="text-xs text-muted-foreground">
              Output per worker rises artificially whenever a company buys expensive automation or outsources fabrication. A total factor productivity calculator charges both capital depreciation and purchased materials against output so you measure genuine operational gains.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold text-white mb-1">How do Total Factor Productivity and Multifactor Productivity differ?</h3>
            <p className="text-xs text-muted-foreground">
              Both measure efficiency beyond individual inputs. Academic macroeconomics typically uses Cobb-Douglas TFP with physical capital and hours worked, while BLS/corporate finance teams use a multifactor productivity calculator dividing value-added or gross revenue by combined inflation-adjusted KLEMS dollar costs.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-bold text-white mb-1">Explore Related Enterprise Calculators</h3>
            <p className="text-xs text-muted-foreground flex flex-wrap gap-3 mt-1">
              <Link href="/calculator/general" className="text-[var(--neon-cyan)] hover:underline">General Business Productivity</Link>
              <span>&bull;</span>
              <Link href="/calculator/labor" className="text-[var(--neon-cyan)] hover:underline">Labor Productivity</Link>
              <span>&bull;</span>
              <Link href="/calculator/manufacturing" className="text-[var(--neon-cyan)] hover:underline">Manufacturing OEE</Link>
              <span>&bull;</span>
              <Link href="/calculator/time-efficiency" className="text-[var(--neon-cyan)] hover:underline">Time Efficiency Calculator</Link>
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
