/**
 * [INPUT]: None (Static semantic workforce labor productivity content, SVG diagram, and benchmark tables)
 * [OUTPUT]: LaborProductivitySeoContent component for /calculator/labor
 * [POS]: High-density workforce reference, industry benchmark matrix, step-by-step examples, and FAQ section
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import Image from "next/image";

export default function LaborProductivitySeoContent() {
  return (
    <section className="mt-20 max-w-4xl mx-auto space-y-12 text-left">
      {/* Visual Diagram Card */}
      <div className="card-neon rounded-2xl p-6 md:p-10">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-mono tracking-widest text-[var(--neon-cyan)] block mb-2">
            Visual Guide &amp; Economic Framework
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            How Labor Productivity is Calculated
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-body max-w-2xl mx-auto mt-2">
            Understand how physical throughput, gross revenue output, labor payroll costs, and workforce utilization rates interact across modern business operations.
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <Image
            src="/images/labor-productivity-formula.svg"
            alt="Labor productivity calculator formula, revenue per employee, and workforce utilization diagram"
            width={800}
            height={400}
            className="rounded-xl border border-white/10 w-full max-w-2xl h-auto shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Core Formulas */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
          Labor Productivity Calculator Formulas: Output, Revenue, and Cost Ratios
        </h2>

        <div className="space-y-4 text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          <p>
            Labor productivity measures the economic or physical volume of goods and services produced per unit of human labor. According to the Bureau of Labor Statistics (BLS) and organizational economists, operations leaders evaluate labor productivity across three primary dimensions:
          </p>

          {/* Formula 1: Physical Labor Productivity */}
          <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              1. Physical Labor Productivity Formula (Output per Hour)
            </div>
            <code className="font-display text-base md:text-xl text-[var(--neon-cyan)] block">
              Physical Labor Productivity = Total Units Produced ÷ Total Direct Labor Hours Worked
            </code>
            <p className="text-xs text-[var(--text-secondary)] font-mono mt-2">
              Primary operational benchmark in manufacturing plants, distribution warehouses, and assembly facilities.
            </p>
          </div>

          {/* Formula 2: Financial Productivity */}
          <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              2. Financial Labor Productivity Formula (Revenue-to-Labor Ratio)
            </div>
            <code className="font-display text-base md:text-xl text-[var(--neon-pink)] block">
              Revenue-to-Labor Ratio = Total Gross Revenue ($) ÷ Total Labor Payroll Cost ($)
            </code>
            <p className="text-xs text-[var(--text-secondary)] font-mono mt-2">
              Measures dollars generated for every dollar spent on workforce wages, benefits, and payroll taxes.
            </p>
          </div>

          {/* Formula 3: Revenue per Employee */}
          <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              3. Revenue per Employee (FTE) Formula
            </div>
            <code className="font-display text-base md:text-xl text-[var(--neon-green)] block">
              Revenue per Employee = Total Annual Revenue ÷ Full-Time Equivalent (FTE) Headcount
            </code>
            <p className="text-xs text-[var(--text-secondary)] font-mono mt-2">
              The universal executive metric used on Wall Street to benchmark operational leverage and corporate efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Direct vs Indirect & Utilization */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Direct vs Indirect Labor &amp; Workforce Utilization Rate Formulas
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)] font-body">
          To accurately diagnose labor efficiency, organizations must distinguish between productive client-facing hours and non-productive administrative overhead:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10 space-y-2">
            <h3 className="font-display text-base font-bold text-white flex items-center justify-between">
              <span>Direct Labor (Billable / Value-Add)</span>
              <span className="text-xs font-mono text-[var(--neon-cyan)]">Target: 75%–85%</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
              Hours spent directly fabricating products, delivering client services, writing code, or performing billable clinical treatments. These hours generate revenue directly.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)]/60 border border-white/10 space-y-2">
            <h3 className="font-display text-base font-bold text-white flex items-center justify-between">
              <span>Indirect Labor (Overhead / Non-Billable)</span>
              <span className="text-xs font-mono text-amber-400">Target: &lt; 20%</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
              Hours allocated to internal company meetings, administrative compliance, tool calibration, travel, and paid breaks. While necessary, excessive indirect time inflates unit cost.
            </p>
          </div>
        </div>

        <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
          <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
            Universal Workforce Utilization Rate Formula
          </div>
          <code className="font-display text-base md:text-xl text-white block">
            Labor Utilization Rate (%) = [ Total Direct (Billable) Hours ÷ Total Paid Scheduled Hours ] × 100
          </code>
          <p className="text-xs text-[var(--text-secondary)] font-mono mt-2">
            Used by consulting firms, digital agencies, and engineering teams to forecast staffing capacity and billing realization.
          </p>
        </div>
      </div>

      {/* Industry Benchmarks Table */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Labor Productivity Benchmarks Across Key Industries
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)] font-body">
          Healthy labor productivity targets vary substantially by sector based on capital intensity, professional billing rates, and automation levels:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left font-body text-xs md:text-sm border border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-white/5 font-mono text-white uppercase text-xs">
              <tr>
                <th className="p-3.5 border-b border-white/10">Industry Sector</th>
                <th className="p-3.5 border-b border-white/10">Revenue per Employee (FTE)</th>
                <th className="p-3.5 border-b border-white/10">Revenue-to-Labor Ratio</th>
                <th className="p-3.5 border-b border-white/10">Target Utilization Rate</th>
                <th className="p-3.5 border-b border-white/10">Primary Productivity Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[var(--text-secondary)]">
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3.5 font-bold text-[var(--neon-green)]">Software &amp; SaaS</td>
                <td className="p-3.5 text-white">$220,000 – $400,000+</td>
                <td className="p-3.5 text-white">3.5x – 5.0x</td>
                <td className="p-3.5 text-white">80% – 85%</td>
                <td className="p-3.5 font-body">Digital distribution leverage and low marginal reproduction cost.</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3.5 font-bold text-[var(--neon-cyan)]">Professional Services &amp; Consulting</td>
                <td className="p-3.5 text-white">$150,000 – $250,000</td>
                <td className="p-3.5 text-white">2.5x – 3.2x</td>
                <td className="p-3.5 text-white">75% – 85%</td>
                <td className="p-3.5 font-body">Billable hourly realization rates and multi-tier team leverage.</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3.5 font-bold text-white">Commercial Construction</td>
                <td className="p-3.5 text-white">$180,000 – $320,000</td>
                <td className="p-3.5 text-white">2.0x – 2.8x</td>
                <td className="p-3.5 text-white">70% – 80%</td>
                <td className="p-3.5 font-body">Crew site coordination, weather downtime management, and material staging.</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3.5 font-bold text-white">Warehousing &amp; Fulfillment</td>
                <td className="p-3.5 text-white">$90,000 – $140,000</td>
                <td className="p-3.5 text-white">1.8x – 2.4x</td>
                <td className="p-3.5 text-white">85% – 90%</td>
                <td className="p-3.5 font-body">Pick-and-pack units per hour, conveyor uptime, and barcode scan velocity.</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="p-3.5 font-bold text-amber-400">Healthcare Clinics &amp; Therapy</td>
                <td className="p-3.5 text-white">$110,000 – $180,000</td>
                <td className="p-3.5 text-white">2.2x – 3.0x</td>
                <td className="p-3.5 text-white">80% – 88%</td>
                <td className="p-3.5 font-body">Direct patient treatment minutes vs EHR documentation time.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Step-by-Step Worked Math Problems */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
          Step-by-Step Workforce Productivity Calculation Examples
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)] font-body">
          Learn how to compute labor efficiency metrics step-by-step for operational audits and management reporting:
        </p>

        {/* Problem 1 */}
        <div className="space-y-4 my-6 font-mono text-xs md:text-sm bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="text-white font-bold text-sm">
            Example 1: Computing Physical Labor Productivity Rate
          </div>
          <p className="text-[var(--text-secondary)] font-sans">
            A manufacturing fulfillment warehouse processes 6,400 orders during a work week. The warehouse employs 8 full-time workers, each logging a standard 40-hour work week:
          </p>
          <div className="text-[var(--neon-cyan)] pt-2 space-y-1">
            <p>Step 1: Calculate total direct labor hours = 8 workers × 40 hours = 320 man-hours</p>
            <p>Step 2: Apply the productivity equation = 6,400 units ÷ 320 labor hours</p>
            <p>Step 3: Physical Labor Productivity = <strong>20.0 units per man-hour</strong></p>
            <p>Step 4: At an average wage of $22/hour, the labor cost per order is $22 ÷ 20 = $1.10 per unit</p>
          </div>
        </div>

        {/* Problem 2 */}
        <div className="space-y-4 my-6 font-mono text-xs md:text-sm bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="text-white font-bold text-sm">
            Example 2: Calculating Extra Work Rate Needed to Match Productivity Benchmarks
          </div>
          <p className="text-[var(--text-secondary)] font-sans">
            An engineering consultancy bills 28 hours per consultant on a 40-hour schedule (70% utilization), but company standards mandate an 80% utilization rate:
          </p>
          <div className="text-[var(--neon-green)] pt-2 space-y-1">
            <p>Step 1: Determine target billable hours = 40 scheduled hours × 80% = 32.0 target billable hours</p>
            <p>Step 2: Identify the performance shortfall = 32.0 target hours − 28.0 actual hours = <strong>4.0 billable hours gap</strong></p>
            <p>Step 3: Required operational adjustment: Reduce non-billable internal meetings by 4 hours per week to achieve the 80% benchmark without overtime</p>
          </div>
        </div>
      </div>

      {/* 5 Proven Strategies */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          5 Industry-Proven Strategies to Increase Workforce Labor Productivity
        </h2>
        <ul className="space-y-4 text-sm md:text-base text-[var(--text-secondary)] font-body">
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">01</span>
            <div>
              <strong className="text-white block">Audit &amp; Eliminate Non-Value-Add Administrative Overhead</strong>
              Studies show knowledge workers spend 28% of their week reading and answering emails and attending redundant syncs. Cutting low-impact meetings immediately reallocates hours into direct billable execution.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">02</span>
            <div>
              <strong className="text-white block">Optimize Workforce Skill Mix (Blended Labor Leveraging)</strong>
              Assign routine tasks to junior associates or automation tools so that senior specialists spend 100% of their time on high-margin, specialized deliverables.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">03</span>
            <div>
              <strong className="text-white block">Implement Standard Operating Procedures (SOPs)</strong>
              Documenting step-by-step best practices eliminates variance across shift workers, reducing training ramp-up time and preventing costly rework cycles.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">04</span>
            <div>
              <strong className="text-white block">Provide Modern Ergonomic Tools &amp; Automation</strong>
              Equipping teams with modern software, barcode scanners, or mechanical lifting aids prevents physical fatigue and reduces cycle times by 15% to 30%.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] mt-0.5">05</span>
            <div>
              <strong className="text-white block">Establish Transparent KPIs &amp; Incentive Alignment</strong>
              When workers have clear visibility into daily targets and share in the financial rewards of exceeding benchmarks, engagement and output velocity surge.
            </div>
          </li>
        </ul>
      </div>

      {/* Frequently Asked Questions */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Frequently Asked Questions About Labor Productivity
        </h2>

        <div className="space-y-6">
          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              How is labor productivity calculated?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              Labor productivity is calculated by dividing total output by the labor hours invested: <code>Labor Productivity = Total Output Units (or Revenue) ÷ Total Labor Hours Worked</code>. For example, producing 500 units in 50 labor hours yields a productivity rate of 10 units per labor hour.
            </p>
          </div>

          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              What is a good labor productivity ratio?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              For financial productivity (Revenue-to-Labor ratio), a healthy target is 2.5x to 4.0x: generating at least $2.50 to $4.00 of gross revenue for every $1.00 spent on labor payroll. In professional services and consulting, a billable workforce utilization rate between 75% and 85% is considered top-tier.
            </p>
          </div>

          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              What is the difference between direct and indirect labor?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              Direct labor refers to workers and hours directly involved in producing goods or delivering billable client services (e.g., assembly technicians, developers, treating clinicians). Indirect labor refers to support and administrative functions (e.g., HR, accounting, facility maintenance) that support operations but do not directly generate units of output.
            </p>
          </div>

          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              How do you calculate labor cost per unit?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              Labor cost per unit is calculated by dividing total labor payroll costs by the number of units produced: <code>Labor Cost Per Unit = Total Labor Cost ($) ÷ Total Units Produced</code>. Alternatively, divide the hourly wage by your hourly productivity rate.
            </p>
          </div>

          <div className="space-y-2 border-b border-white/10 pb-5">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              What causes low labor productivity in an organization?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              The primary causes of low labor productivity include excessive administrative meetings, inadequate tooling or legacy software, poor onboarding processes, unaddressed process bottlenecks, lack of standardized work procedures, and employee burnout or misalignment with organizational goals.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-base md:text-lg font-bold text-[var(--neon-cyan)]">
              How does employee utilization impact profitability?
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              Higher utilization directly converts fixed payroll expenses into recognized revenue. For example, increasing a 10-person consultancy&apos;s billable utilization from 70% to 80% unlocks 40 additional billable hours per week—generating $300,000+ in pure gross margin annually without adding headcount.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
