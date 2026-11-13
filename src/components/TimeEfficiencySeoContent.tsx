/**
 * [INPUT]: Next/Image, Next/Link
 * [OUTPUT]: TimeEfficiencySeoContent component for /calculator/time-efficiency
 * [POS]: 时间效率计算器权威语义内容、公式体系、Excel模板、行业标杆表及 FAQ 展示区
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import Image from "next/image";
import Link from "next/link";

const BENCHMARKS = [
  {
    sector: "Software & Knowledge Work",
    metric: "Focus Time Utilization",
    average: "62% – 72%",
    elite: "82% – 88%",
    note: "Calendar fragmentation and context switching drive primary time loss.",
  },
  {
    sector: "Manufacturing & CNC Shops",
    metric: "Standard vs. Actual Cycle",
    average: "85% – 94%",
    elite: "100% – 115%",
    note: "SMED quick changeovers raise both time efficiency and machine OEE.",
  },
  {
    sector: "Healthcare & PT Clinics",
    metric: "Billable Direct Time Ratio",
    average: "75% – 82%",
    elite: "88% – 93%",
    note: "Best paired with our Medicare 8-minute billing units conversion workflow.",
  },
  {
    sector: "Warehouse & Logistics Ops",
    metric: "Engineered Labor Standard",
    average: "88% – 96%",
    elite: "105% – 118%",
    note: "Pick-path optimization removes walking waste between SKU zones.",
  },
  {
    sector: "Support & BPO Desks",
    metric: "Handle Time vs. SLA Target",
    average: "80% – 90%",
    elite: "96% – 108%",
    note: "Macro templates cut average handle time without hurting resolution quality.",
  },
];

const EXCEL_ROWS = [
  {
    goal: "Task Time Efficiency %",
    formula: "=IF(B2>0, (A2/B2)*100, 0)",
    inputs: "A2 = Standard Minutes, B2 = Actual Minutes",
    output: "125.0%",
  },
  {
    goal: "Shift Time Utilization %",
    formula: "=((A2-(B2+C2))/A2)*100",
    inputs: "A2 = Paid Shift Hrs, B2 = Breaks, C2 = Overhead",
    output: "83.3%",
  },
  {
    goal: "Cycle Speedup Percentage",
    formula: "=((A2-B2)/A2)*100",
    inputs: "A2 = Old Cycle Time, B2 = New Cycle Time",
    output: "32.1%",
  },
  {
    goal: "FTE Equivalent Reclaimed",
    formula: "=(((A2-B2)*C2*D2)/60)/2000",
    inputs: "Min Saved × Tasks/Day × Days ÷ 2,000 hrs",
    output: "1.50 FTE",
  },
];

export default function TimeEfficiencySeoContent() {
  return (
    <section className="mt-20 max-w-4xl mx-auto space-y-12 text-left">
      {/* Visual Formula Diagram */}
      <div className="card-neon rounded-2xl p-6 md:p-10">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-mono tracking-widest text-[var(--neon-cyan)] block mb-2">
            Visual Reference &amp; Time Efficiency Equations
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            How Our Time Efficiency Calculator Measures Speed and Utilization
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-body max-w-2xl mx-auto mt-2">
            An accurate efficiency calculator separates two distinct questions: how fast a specific deliverable was completed against an engineered standard, and what share of a paid workday produced value.
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <Image
            src="/images/time-efficiency-formula.svg"
            alt="Time efficiency calculator formula diagram comparing task cycle efficiency and shift utilization percentage"
            width={800}
            height={400}
            className="rounded-xl border border-white/10 w-full max-w-2xl h-auto shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Section 1: Core Formulas */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
          Time Efficiency Formula: Standard Time vs. Actual Time
        </h2>

        <div className="space-y-4 text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          <p>
            In industrial engineering, agile software planning, and corporate operations, the classic{" "}
            <strong className="text-white">time efficiency calculator</strong> compares an expected time budget
            (standard time) against real execution duration (actual time). Because finishing faster represents
            stronger performance, standard time sits in the numerator while actual time sits in the denominator.
          </p>

          <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              Standard Task Time Efficiency Equation
            </div>
            <code className="font-display text-base md:text-xl text-[var(--neon-cyan)] block">
              Time Efficiency (%) = (Standard Time ÷ Actual Time) × 100%
            </code>
          </div>

          <p>
            For example, if an engineering standard budgets 45 minutes to assemble a sub-unit or QA a release
            ticket, and a specialist finishes the work cleanly in 36 minutes, your{" "}
            <strong className="text-white">time efficiency calculator</strong> returns{" "}
            <code className="text-white font-mono">45 ÷ 36 × 100 = 125.0%</code>. Conversely, if interruptions
            or tooling friction stretch that same task to 54 minutes, time efficiency falls to{" "}
            <code className="text-white font-mono">83.3%</code>, indicating a 9-minute variance per repetition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
              <div className="text-xs font-mono text-[var(--neon-cyan)] font-bold uppercase mb-1">
                Metric A · Execution Pace
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Can Time Efficiency Exceed 100%?
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)]">
                Yes. Task efficiency routinely exceeds 100% whenever a worker, automation script, or machine cell
                completes a deliverable in fewer minutes than the baseline standard without raising defect rates.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
              <div className="text-xs font-mono text-[var(--neon-pink)] font-bold uppercase mb-1">
                Metric B · Calendar Utilization
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Why Shift Utilization Caps at 100%
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)]">
                Shift utilization divides productive focus hours by total scheduled shift hours. Because breaks,
                standups, and setup delays consume part of the clock, most teams target 80%–90% utilization.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Difference Between Productivity & Time Efficiency */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Efficiency Calculator vs. Productivity Calculator: Key Differences
        </h2>
        <div className="space-y-4 text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          <p>
            Managers frequently confuse general output productivity with time efficiency. A standard{" "}
            <Link href="/calculator/labor" className="text-[var(--neon-cyan)] hover:underline">
              labor productivity calculator
            </Link>{" "}
            measures units or revenue produced per hour (for example, 14 orders packed per hour). By contrast, an{" "}
            <strong className="text-white">efficiency calculator</strong> is a dimensionless benchmark ratio that
            measures actual resource consumption against an ideal or budgeted standard.
          </p>
          <p>
            Combining both perspectives prevents silent operational failures. A department might boost raw hourly
            volume by working unscheduled overtime while time efficiency drops below 80% due to rework. Using a
            dedicated <strong className="text-white">time efficiency calculator</strong> alongside shift utilization
            tracks whether each process step is genuinely becoming leaner or merely consuming more payroll.
          </p>
        </div>

        {/* Benchmark Table */}
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--bg-elevated)] text-[var(--neon-cyan)] font-mono text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Industry / Function</th>
                <th className="px-4 py-3">Primary Time KPI</th>
                <th className="px-4 py-3">Typical Avg</th>
                <th className="px-4 py-3">Top Quartile</th>
                <th className="px-4 py-3">Main Efficiency Lever</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--bg-surface)]/50">
              {BENCHMARKS.map((row) => (
                <tr key={row.sector} className="hover:bg-[var(--bg-elevated)]/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-white">{row.sector}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.metric}</td>
                  <td className="px-4 py-3 font-mono text-amber-300">{row.average}</td>
                  <td className="px-4 py-3 font-mono text-emerald-300 font-semibold">{row.elite}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Excel & Sheets Formulas + Worked Example */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Excel Time Efficiency Calculator Formulas &amp; Worked Team Case
        </h2>

        <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
          If you maintain weekly operations scorecards in Excel or Google Sheets, copy the four spreadsheet
          formulas below to audit task variance, workday leakage, and full-time equivalent (FTE) capacity gains.
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--bg-elevated)] text-[var(--neon-pink)] font-mono text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Calculation</th>
                <th className="px-4 py-3">Excel / Sheets Formula</th>
                <th className="px-4 py-3">Cell Mapping</th>
                <th className="px-4 py-3">Sample Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--bg-surface)]/50">
              {EXCEL_ROWS.map((row) => (
                <tr key={row.goal}>
                  <td className="px-4 py-3 font-semibold text-white">{row.goal}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--neon-cyan)]">{row.formula}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">{row.inputs}</td>
                  <td className="px-4 py-3 font-mono text-emerald-300">{row.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-3">
          <h3 className="font-display text-lg font-bold text-white">
            Real-World Case: 6-Person Claims &amp; Billing Team
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Suppose a 6-person back-office operations team processes 40 verification tickets per analyst per day.
            Standardized form templates cut average handling duration from 28 minutes down to 19 minutes per task:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm text-[var(--text-secondary)] list-disc pl-5">
            <li><strong className="text-white">Speed Ratio:</strong> 28 ÷ 19 = 147.4% relative task efficiency</li>
            <li><strong className="text-white">Daily Hours Saved:</strong> (9 mins × 40 × 6) ÷ 60 = 36.0 team hrs/day</li>
            <li><strong className="text-white">Annual Reclaimed Hours:</strong> 36.0 × 250 workdays = 9,000 hrs/year</li>
            <li><strong className="text-white">Labor Value (@ $42/hr):</strong> $378,000 in annual capacity unlocked</li>
          </ul>
          <p className="text-xs text-[var(--text-muted)] pt-1">
            Tip: Healthcare clinics running mixed timed procedures can pair this workflow audit with our{" "}
            <Link href="/calculator/billing-units" className="text-[var(--neon-cyan)] hover:underline">
              Medicare 8-minute billing units calculator
            </Link>{" "}
            or check{" "}
            <Link href="/calculator/manufacturing" className="text-[var(--neon-cyan)] hover:underline">
              manufacturing OEE capacity
            </Link>.
          </p>
        </div>
      </div>

      {/* Section 4: Visible FAQ Accordion Cards matching JSON-LD */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Frequently Asked Questions About Time Efficiency
        </h2>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white text-base mb-1.5">
              How do I calculate time efficiency percentage?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Divide the standard (expected or budgeted) duration by the actual time spent, then multiply by 100:
              Time Efficiency (%) = (Standard Time ÷ Actual Time) × 100. For example, completing a 60-minute task in
              48 minutes yields (60 ÷ 48) × 100 = 125% time efficiency.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white text-base mb-1.5">
              What is a good time efficiency rate for employees and teams?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              For standard-vs-actual task execution, 95% to 105% indicates accurate planning and consistent speed.
              For shift time utilization (productive hours divided by paid hours), 80% to 88% is considered strong
              across office, healthcare, and industrial teams because mandatory breaks and coordination exist.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white text-base mb-1.5">
              How do you calculate efficiency in hours vs. minutes?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Always keep numerator and denominator in the same unit before dividing. Convert hours and minutes to
              decimal hours (e.g., 1h 15m = 1.25 hours) or convert both values into total minutes. The unit toggle in
              this time efficiency calculator supports both minutes and hours automatically.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white text-base mb-1.5">
              What is the difference between cycle time efficiency and shift utilization?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Cycle time efficiency measures speed on a unit of work (Standard Time ÷ Actual Time) and can exceed
              100%. Shift utilization measures how much of your scheduled paid workday goes toward value-adding work
              (Productive Hours ÷ Paid Hours) and always stays at or below 100%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
