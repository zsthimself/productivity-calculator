/**
 * [INPUT]: None (Static semantic industrial manufacturing content, SVG diagram, and benchmark tables)
 * [OUTPUT]: ManufacturingSeoContent component for /calculator/manufacturing
 * [POS]: High-density manufacturing reference, OEE benchmark matrix, word problem solutions, and FAQ section
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import Image from "next/image";

export default function ManufacturingSeoContent() {
  return (
    <section className="mt-20 max-w-4xl mx-auto space-y-12 text-left">
      {/* Visual Diagram Card */}
      <div className="card-neon rounded-2xl p-6 md:p-10">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-mono tracking-widest text-[var(--neon-cyan)] block mb-2">
            Visual Guide & Engineering Architecture
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            How Manufacturing Productivity is Calculated
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-body max-w-2xl mx-auto mt-2">
            Understand how gross factory output, machine availability, scrap rate, and labor hours interact across modern industrial production lines.
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <Image
            src="/images/manufacturing-productivity-formula.svg"
            alt="Manufacturing productivity calculator formula and OEE workflow diagram"
            width={800}
            height={400}
            className="rounded-xl border border-white/10 w-full max-w-2xl h-auto shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Core Formula & Mathematical Framework */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
          Manufacturing Productivity Calculator Formulas: Labor, Machine, and OEE
        </h2>

        <div className="space-y-4 text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          <p>
            In modern factory operations, manufacturing productivity evaluates how efficiently labor, capital equipment, and raw materials are transformed into finished goods. Industrial engineers and plant managers rely on three distinct levels of calculation:
          </p>

          {/* Formula 1: Labor Productivity */}
          <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              1. Labor Productivity Formula (Output per Hour)
            </div>
            <code className="font-display text-base md:text-xl text-[var(--neon-cyan)] block">
              Labor Productivity = Total Usable Finished Units ÷ Total Direct Labor Hours Worked
            </code>
            <p className="text-xs text-[var(--text-secondary)] font-mono mt-2">
              Measures human workforce throughput while excluding rework and defect hours.
            </p>
          </div>

          {/* Formula 2: Machine Throughput */}
          <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              2. Net Machine Production Rate (Units per Operating Hour)
            </div>
            <code className="font-display text-base md:text-xl text-[var(--neon-cyan)] block">
              Net Production Rate = (Total Units Produced − Scrap & Reject Units) ÷ Machine Operating Hours
            </code>
            <p className="text-xs text-[var(--text-secondary)] font-mono mt-2">
              Directly reflects true yield by isolating scrap losses and tool downtime.
            </p>
          </div>

          {/* Formula 3: OEE Composite */}
          <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              3. Overall Equipment Effectiveness (OEE) Composite Formula
            </div>
            <code className="font-display text-base md:text-xl text-[var(--neon-green)] block">
              OEE (%) = Availability × Performance × Quality × 100
            </code>
            <p className="text-xs text-[var(--text-secondary)] font-mono mt-2">
              Where Availability = Operating Time ÷ Planned Time; Performance = Ideal Cycle Time ÷ Operating Time; Quality = Good Units ÷ Total Units.
            </p>
          </div>
        </div>
      </div>

      {/* OEE Benchmark Standards Table */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          OEE (Overall Equipment Effectiveness) Benchmarks for Modern Factories
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)] font-body">
          OEE is the gold standard metric across Six Sigma, Lean Manufacturing, and TPM (Total Productive Maintenance). Compare your plant performance against recognized global standards:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left font-body text-xs md:text-sm border border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-white/5 font-mono text-white uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-white/10">OEE Score Tier</th>
                <th className="p-3.5 border-b border-white/10">Availability</th>
                <th className="p-3.5 border-b border-white/10">Performance</th>
                <th className="p-3.5 border-b border-white/10">Quality Rate</th>
                <th className="p-3.5 border-b border-white/10">Operational Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[var(--text-secondary)]">
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3.5 font-bold text-[var(--neon-green)]">&gt; 85% (World-Class)</td>
                <td className="p-3.5 text-white">90.0%</td>
                <td className="p-3.5 text-white">95.0%</td>
                <td className="p-3.5 text-white">99.9%</td>
                <td className="p-3.5 font-body">Top-tier manufacturing excellence with zero unplanned stops and minimal changeovers.</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3.5 font-bold text-[var(--neon-cyan)]">65% – 84% (Typical / Good)</td>
                <td className="p-3.5 text-white">80.0%</td>
                <td className="p-3.5 text-white">85.0%</td>
                <td className="p-3.5 text-white">96.0%</td>
                <td className="p-3.5 font-body">Standard discrete manufacturing floor. Profitable but has clear room for setup and maintenance optimization.</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3.5 font-bold text-amber-400">50% – 64% (Acceptable)</td>
                <td className="p-3.5 text-white">70.0%</td>
                <td className="p-3.5 text-white">78.0%</td>
                <td className="p-3.5 text-white">92.0%</td>
                <td className="p-3.5 font-body">Common in plants starting digital transformation. Suffers from chronic bottleneck shifts and tool change delays.</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3.5 font-bold text-rose-400">&lt; 50% (Underperforming)</td>
                <td className="p-3.5 text-white">&lt; 60.0%</td>
                <td className="p-3.5 text-white">&lt; 70.0%</td>
                <td className="p-3.5 text-white">&lt; 88.0%</td>
                <td className="p-3.5 font-body">Critical equipment downtime, frequent operator starvation, and high scrap loss requiring urgent Kaizen intervention.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sector Benchmarks */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Sector Benchmarks: Automotive, Electronics, Food & Beverage, and Metal Fabrication
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)] font-body">
          Productivity rates and scrap allowances fluctuate drastically by industrial sector due to automation levels, tooling complexities, and tolerance requirements:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10 space-y-2">
            <h3 className="font-display text-base font-bold text-white flex items-center justify-between">
              <span>Automotive & Aerospace</span>
              <span className="text-xs font-mono text-[var(--neon-cyan)]">Target OEE: 85%+</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
              Dominated by automated robotic weld cells and synchronized conveyors. Scrap tolerances are under 0.1% (PPM metrics), and takt time is strictly tracked per minute.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10 space-y-2">
            <h3 className="font-display text-base font-bold text-white flex items-center justify-between">
              <span>Electronics SMT & Assembly</span>
              <span className="text-xs font-mono text-[var(--neon-green)]">Target OEE: 90%+</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
              Ultra-high-speed surface mount technology placing 20,000+ components per hour. Primary productivity focus is reducing feeder reload stops and thermal profile errors.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10 space-y-2">
            <h3 className="font-display text-base font-bold text-white flex items-center justify-between">
              <span>Food, Beverage & Packaging</span>
              <span className="text-xs font-mono text-[var(--neon-cyan)]">Target OEE: 80%–88%</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
              Continuous rotary bottling and cartoning lines running at 100–500 units/min. Productivity is influenced by washdown CIP (clean-in-place) cycles and packaging foil jams.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10 space-y-2">
            <h3 className="font-display text-base font-bold text-white flex items-center justify-between">
              <span>Precision CNC & Fabrication</span>
              <span className="text-xs font-mono text-amber-400">Target OEE: 70%–80%</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
              High-mix low-volume milling and turning. Productivity revolves around setup reduction (SMED), multi-axis fixture loading, and cutting tool wear management.
            </p>
          </div>
        </div>
      </div>

      {/* Production Output Equations & Word Problem Solutions */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
          Factory Production Output Equations & Word Problem Solutions
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)] font-body">
          Factory capacity planning frequently requires solving multi-shift production math problems. Here is the exact mathematical breakdown for standard manufacturing homework and operational schedule queries:
        </p>

        <div className="space-y-4 my-6 font-mono text-xs md:text-sm bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="text-white font-bold text-sm">
            Example Problem: &quot;A factory produces 450 units per hour. Operating 2 shifts per day (8 hours each), how many units are produced in 5 days across 3 parallel lines?&quot;
          </div>
          <div className="text-[var(--neon-cyan)] pt-2 space-y-1">
            <p>Step 1: Calculate total operating hours per line = 2 shifts × 8 hours = 16 hours/day</p>
            <p>Step 2: Calculate daily output for 1 line = 450 units/hr × 16 hours = 7,200 units/day</p>
            <p>Step 3: Multiply across 3 lines = 7,200 units/day × 3 lines = 21,600 units/day</p>
            <p>Step 4: Total 5-day factory output = 21,600 units/day × 5 days = <strong>108,000 units</strong></p>
          </div>
          <div className="text-[var(--text-muted)] text-[11px] font-sans pt-1">
            Our interactive Factory Capacity Planner tab above computes this multi-line horizon instantly with customizable shift lengths and scrap adjustments.
          </div>
        </div>
      </div>

      {/* 5 Industry-Proven Strategies */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          5 Industry-Proven Strategies to Increase Manufacturing Productivity
        </h2>
        <ul className="space-y-4 text-sm md:text-base text-[var(--text-secondary)] font-body">
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">01</span>
            <div>
              <strong className="text-white block">Implement SMED (Single-Minute Exchange of Die)</strong>
              Convert internal tooling changeovers into external prep activities. Shrinking product changeover times from 60 minutes to 8 minutes unlocks immediate daily production capacity without adding equipment.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">02</span>
            <div>
              <strong className="text-white block">Eliminate the Six Big Losses of TPM</strong>
              Target equipment breakdowns, lengthy changeovers, minor idling stops, reduced operating speed, startup reject loss, and production scrap to recover lost OEE points.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">03</span>
            <div>
              <strong className="text-white block">Standardize Work Instructions (SOPs)</strong>
              Conduct time-and-motion studies to balance line tasks across operators, preventing line starvation and bottleneck pileups.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">04</span>
            <div>
              <strong className="text-white block">Automate Material Handling & Kanban Feeding</strong>
              Replace manual parts delivery with automated guided vehicles (AGVs) or gravity-fed flow racks to ensure machine operators never leave their station for raw stock.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">05</span>
            <div>
              <strong className="text-white block">Deploy Real-Time IoT Machine Telemetry</strong>
              Monitor cycle times and micro-stoppages automatically via PLC sensors instead of relying on end-of-shift paper logs, catching speed dips before they compound.
            </div>
          </li>
        </ul>
      </div>

      {/* Frequently Asked Questions */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Frequently Asked Questions About Manufacturing Productivity
        </h2>

        <div className="space-y-6">
          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              How is manufacturing productivity calculated?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              Manufacturing productivity is calculated by dividing total usable output by the input resources consumed: <code>Productivity = Finished Good Units ÷ Direct Labor Hours</code> (or machine hours). For whole-line equipment efficiency, factories use Overall Equipment Effectiveness: <code>OEE = Availability × Performance × Quality</code>.
            </p>
          </div>

          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              What is considered a good manufacturing productivity rate?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              In discrete manufacturing, an OEE score of 85% is internationally recognized as World-Class. Typical manufacturing operations operate between 60% and 75% OEE. For direct labor efficiency, maintaining a 95%+ target achievement rate with less than 2% scrap is considered top quartile performance.
            </p>
          </div>

          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              How does scrap and defect rate affect manufacturing productivity?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              Scrap directly penalizes both the Quality factor in OEE and the Net Production Rate. Because labor, machine cycle time, and utility power are consumed producing unusable scrap, high scrap rates artificially inflate the cost per unit while reducing overall plant capacity.
            </p>
          </div>

          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              What is the difference between production volume and productivity?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              Production volume is the raw quantity of goods manufactured over a timeframe (e.g., 50,000 units this month). Productivity is the ratio of that volume to the inputs invested (e.g., units per labor hour or units per dollar). Producing high volume by adding excessive overtime can actually decrease productivity.
            </p>
          </div>

          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              Can this manufacturing calculator handle multiple shifts and assembly lines?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              Yes. Use the &quot;Factory Capacity&quot; tab to set shift lengths (e.g., 8, 10, or 12 hours), the number of shifts per day (1, 2, or 3), parallel production lines, and working days per week to automatically project daily, weekly, monthly, and annual factory capacity.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              How do you calculate labor hours in manufacturing?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              Direct labor hours are calculated by multiplying the number of operators on the line by the shift duration: <code>Direct Labor Hours = Number of Workers × Shift Hours Worked</code>. For example, a 6-person assembly line operating for an 8-hour shift logs 48 direct labor hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
