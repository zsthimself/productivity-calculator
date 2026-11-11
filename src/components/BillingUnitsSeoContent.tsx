/**
 * [INPUT]: Next/Image, Next/Link
 * [OUTPUT]: BillingUnitsSeoContent component for /calculator/billing-units
 * [POS]: 医疗与物理治疗 8 分钟计费规则深度指南、Excel 公式表、CMS vs AMA 差异及 FAQ 语义正文
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import Image from "next/image";
import Link from "next/link";

const EIGHT_MIN_CHART = [
  { units: 1, range: "8 – 22 minutes", midpoint: "15 mins", hours: "0.25 hrs", note: "Minimum 8-minute threshold to bill 1 unit" },
  { units: 2, range: "23 – 37 minutes", midpoint: "30 mins", hours: "0.50 hrs", note: "Standard half-hour timed therapy session" },
  { units: 3, range: "38 – 52 minutes", midpoint: "45 mins", hours: "0.75 hrs", note: "Common 40–45 minute outpatient follow-up" },
  { units: 4, range: "53 – 67 minutes", midpoint: "60 mins", hours: "1.00 hr", note: "Covers both 55 minutes and 60 minutes (4 units)" },
  { units: 5, range: "68 – 82 minutes", midpoint: "75 mins", hours: "1.25 hrs", note: "Extended dual-modality rehab session" },
  { units: 6, range: "83 – 97 minutes", midpoint: "90 mins", hours: "1.50 hrs", note: "90-minute intensive neurological or post-op visit" },
  { units: 7, range: "98 – 112 minutes", midpoint: "105 mins", hours: "1.75 hrs", note: "Multi-disciplinary or work hardening session" },
  { units: 8, range: "113 – 127 minutes", midpoint: "120 mins", hours: "2.00 hrs", note: "Full two-hour direct timed care episode" },
  { units: 9, range: "128 – 142 minutes", midpoint: "135 mins", hours: "2.25 hrs", note: "Extended outpatient day-rehab block" },
  { units: 10, range: "143 – 157 minutes", midpoint: "150 mins", hours: "2.50 hrs", note: "Upper threshold for extended timed rehab claims" },
];

export default function BillingUnitsSeoContent() {
  return (
    <section className="mt-20 max-w-4xl mx-auto space-y-12 text-left">
      {/* Visual Formula Architecture */}
      <div className="card-neon rounded-2xl p-6 md:p-10">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-mono tracking-widest text-[var(--neon-cyan)] block mb-2">
            Visual Reference &amp; Medicare 8-Minute Thresholds
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            How the Billing Units Calculator Converts Minutes to Units
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-body max-w-2xl mx-auto mt-2">
            A medical unit conversion tool turns total direct one-on-one timed treatment minutes into compliant 15-minute CPT increments without risking audit underbilling or overbilling.
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <Image
            src="/images/billing-units-formula.svg"
            alt="Billing units calculator formula architecture showing Medicare 8-minute rule brackets and multi-CPT allocation"
            width={800}
            height={400}
            className="rounded-xl border border-white/10 w-full max-w-2xl h-auto shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Section 1: Core Mathematical Formula & Overview */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
          Medicare 8-Minute Rule Formula in a Billing Units Calculator
        </h2>

        <div className="space-y-4 text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          <p>
            Whether you work in physical therapy (PT), occupational therapy (OT), speech-language pathology (SLP), behavioral health, or hospital revenue cycle management, accurately converting treatment time into claims starts with the Centers for Medicare &amp; Medicaid Services (CMS) 8-Minute Rule. Because Medicare pays timed procedure codes in 15-minute increments, our <strong className="text-white">billing units calculator</strong> applies the official substantial portion rule: any single unit requires at least 8 cumulative minutes of direct face-to-face clinical care.
          </p>

          <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              Universal CMS Minutes-to-Units Equation
            </div>
            <code className="font-display text-base md:text-xl text-[var(--neon-cyan)] block">
              Billable Units = FLOOR((Total Direct Timed Minutes + 7) ÷ 15) &nbsp;[when Minutes ≥ 8]
            </code>
          </div>

          <p>
            Time intervals of 1 to 7 minutes fall short of the substantial threshold and generate 0 billable timed units when standing alone. At exactly 8 minutes, adding 7 yields 15, which divides cleanly into 1 unit. Each subsequent unit begins precisely 15 minutes higher: 23 minutes unlocks 2 units, 38 minutes unlocks 3 units, and 53 minutes unlocks 4 units. Understanding this bracket structure also explains two of the most searched questions in clinic billing:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
              <div className="text-xs font-mono text-[var(--neon-cyan)] font-bold uppercase mb-1">
                Quick Answer: 55 Minutes
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                How Many Units Is 55 Minutes?
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)]">
                <strong>55 minutes equals 4 billing units.</strong> The 4-unit window spans 53 to 67 minutes. Even though 55 is only 10 minutes past 45 (3 units), those 10 remaining minutes exceed 8 minutes and qualify for a full fourth unit.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
              <div className="text-xs font-mono text-[var(--neon-pink)] font-bold uppercase mb-1">
                Quick Answer: 60 Minutes
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                How Many Units Is 60 Minutes?
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)]">
                <strong>60 minutes also equals 4 billing units.</strong> A full 60-minute session divides evenly into four 15-minute blocks (4 × 15 = 60). You do not reach 5 units until direct timed treatment hits 68 total minutes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Full Minutes-to-Units Reference Table (1 to 10 Units) */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <div className="border-b border-[var(--border)] pb-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Complete Minutes to Units Chart (1 to 10 Units)
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-body mt-2">
            Reference table verified against CMS Medicare Benefit Policy Manual (Pub. 100-02, Chapter 15) plus equivalent decimal hours for payroll and daily timecard audits.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-body border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Billable Units</th>
                <th className="py-3 px-4">CMS Minute Range</th>
                <th className="py-3 px-4">15m Midpoint</th>
                <th className="py-3 px-4">Units to Hours</th>
                <th className="py-3 px-4">Clinical Billing Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/50 font-mono text-[var(--text-secondary)]">
              {EIGHT_MIN_CHART.map((row) => (
                <tr key={row.units} className="hover:bg-white/5">
                  <td className="py-3 px-4 font-bold text-white">
                    {row.units} {row.units === 1 ? "Unit" : "Units"}
                  </td>
                  <td className="py-3 px-4 text-[var(--neon-cyan)]">{row.range}</td>
                  <td className="py-3 px-4">{row.midpoint}</td>
                  <td className="py-3 px-4 text-[var(--neon-pink)]">{row.hours}</td>
                  <td className="py-3 px-4 font-body text-xs">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: CMS 8-Minute Rule vs AMA Rule & Remainder Splitting */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <div className="border-b border-[var(--border)] pb-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Medicare 8-Minute Rule vs. AMA Substantial Portion Rule
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-body mt-2">
            Not every payer follows Medicare pooling rules. Using the wrong calculation mode on a commercial insurance claim is the leading cause of automated payer recoupments.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-body border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Comparison Dimension</th>
                <th className="py-3 px-4 text-[var(--neon-cyan)]">Medicare (CMS 8-Minute Rule)</th>
                <th className="py-3 px-4 text-[var(--neon-pink)]">AMA / Commercial SPM Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/50 text-[var(--text-secondary)]">
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Calculation Scope</td>
                <td className="py-3 px-4">Pools all timed CPT minutes first to establish total visit unit ceiling.</td>
                <td className="py-3 px-4">Evaluates each CPT code independently without pooling leftover minutes.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Handling Short Remainers</td>
                <td className="py-3 px-4">Two 5-min codes combine (10m total) to justify 1 combined remainder unit.</td>
                <td className="py-3 px-4">Codes under 8 minutes standing alone (e.g., 5m or 7m) are unbillable.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">55-Min Mixed Session Example</td>
                <td className="py-3 px-4 font-mono">20m + 18m + 17m = 55m → 4 Units</td>
                <td className="py-3 px-4 font-mono">20m (1U) + 18m (1U) + 17m (1U) = 3 Units</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Primary Payers</td>
                <td className="py-3 px-4">Medicare Part A/B, Medicaid (most states), TRICARE, Workers’ Comp.</td>
                <td className="py-3 px-4">BlueCross/Anthem, UnitedHealthcare, Aetna, Cigna commercial plans.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-6 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-3">
          <h3 className="font-display text-lg font-bold text-white">
            Worked Multi-CPT Remainder Example (55 Minutes Pooled)
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Suppose a therapist performs <strong>20 minutes of 97110</strong> (Therapeutic Exercise), <strong>18 minutes of 97140</strong> (Manual Therapy), and <strong>17 minutes of 97530</strong> (Therapeutic Activities). Notice how the Multi-CPT Splitter tab inside our unit calculator resolves this claim under CMS guidelines:
          </p>
          <ol className="list-decimal pl-6 space-y-1.5 font-mono text-xs md:text-sm text-white/90">
            <li>Pool total direct timed treatment: 20 + 18 + 17 = 55 total minutes.</li>
            <li>Lookup 55 minutes on the CMS chart: falls inside 53–67 minutes = <strong>4 total allowed units</strong>.</li>
            <li>Assign 1 full 15-minute block to each CPT code: 97110 gets 1U (5m left), 97140 gets 1U (3m left), 97530 gets 1U (2m left).</li>
            <li>Allocate the fourth unit to the service with the largest remaining minutes: 97110 has 5m left, so final CMS billing = <strong>2 units 97110 + 1 unit 97140 + 1 unit 97530</strong>. Under strict AMA commercial rules without pooling, each code stays at 1 unit (3 total units).</li>
          </ol>
        </div>
      </div>

      {/* Section 4: Excel & Spreadsheet Formulas */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <div className="border-b border-[var(--border)] pb-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Billing Units Calculator Excel &amp; Google Sheets Formulas
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-body mt-2">
            Need a quick spreadsheet lookup in Excel or Google Sheets for clinic payroll, EHR exports, or daily productivity logs? Copy these tested workbook formulas directly into your sheet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2">
            <span className="text-xs font-mono text-[var(--neon-cyan)] uppercase font-bold">
              Formula 1: Minutes to Medicare Units
            </span>
            <code className="block p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-xs md:text-sm text-emerald-300 select-all">
              =IF(A2&lt;8, 0, INT((A2+7)/15))
            </code>
            <p className="text-xs text-[var(--text-secondary)]">
              Put total timed minutes in cell <code className="text-white">A2</code>. Returns exact integer CMS units (0 for 1–7m, 1 for 8–22m, 4 for 53–67m).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2">
            <span className="text-xs font-mono text-[var(--neon-pink)] uppercase font-bold">
              Formula 2: Billing Units to Decimal Hours
            </span>
            <code className="block p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-xs md:text-sm text-emerald-300 select-all">
              =ROUND(B2 * 0.25, 2)
            </code>
            <p className="text-xs text-[var(--text-secondary)]">
              With calculated billing units in <code className="text-white">B2</code>, multiplies by 0.25 hours per unit for daily clinical productivity and revenue forecasting.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[var(--bg-elevated)]/80 border border-[var(--neon-cyan)]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">
              Tracking Full-Shift Therapist Productivity Percentage?
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Combine your daily unit counts with unpaid lunch deductions and reverse clock-out times in our sibling clinical calculators.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/calculator/physical-therapy"
              className="px-3.5 py-2 rounded-lg bg-[var(--neon-cyan)] text-black font-display text-xs font-bold hover:opacity-90 transition-opacity"
            >
              PT Productivity Suite →
            </Link>
            <Link
              href="/calculator/healthcare"
              className="px-3.5 py-2 rounded-lg border border-[var(--border)] text-white font-display text-xs font-semibold hover:border-[var(--neon-cyan)] transition-colors"
            >
              Healthcare Suite →
            </Link>
          </div>
        </div>
      </div>

      {/* Section 5: Frequently Asked Questions */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <div className="border-b border-[var(--border)] pb-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Frequently Asked Questions About This Billing Units Calculator
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-body mt-2">
            Direct compliance answers for therapy clinics, medical billers, and outpatient rehab auditors.
          </p>
        </div>

        <div className="space-y-4 text-sm font-body">
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              How is a billing units calculator used under the Medicare 8-Minute Rule?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              This billing units calculator sums all direct one-on-one timed treatment minutes from your visit and checks Medicare’s 8-minute substantial portion rule. You need at least 8 total timed minutes to bill 1 unit, and every 15-minute midpoint adds 1 additional unit via <code className="text-white">FLOOR((Minutes + 7) ÷ 15)</code>.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              How many billing units is 55 minutes or 60 minutes?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Both 55 minutes and 60 minutes equal <strong>4 billing units</strong> under Medicare guidelines because the 4-unit bracket covers 53 through 67 timed minutes. A session must reach 68 timed minutes before billing 5 units.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              What is the Medicare 8-minute rule formula for Excel?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Use <code className="text-emerald-300">=IF(A2&lt;8, 0, INT((A2+7)/15))</code> in Excel or Google Sheets with minutes placed in cell <code className="text-white">A2</code>. To convert unit volume back into paid shift hours, multiply units by <code className="text-white">0.25</code>.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              What is the difference between Medicare 8-Minute Rule and AMA billing rules?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Medicare allows providers to pool cumulative timed minutes and assign leftover units to the CPT code with the largest remainder. Many commercial payers following AMA guidelines require each individual CPT code to stand on its own without combining two sub-8-minute remainders.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              What happens if two CPT codes tie for remainder minutes?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              When cumulative timed minutes allow an extra unit and two CPT codes have the exact same remaining minutes (for example, 11 minutes of 97110 and 11 minutes of 97140 totaling 22 minutes = 1 unit), the clinician selects whichever service consumed higher clinical skill or represented the primary treatment goal.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              Do untimed codes like PT evaluations count toward timed billing units?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              No. Untimed service-based codes—including PT evaluations (97161–97163), OT evaluations (97165–97167), attended hot/cold packs (97010), and unattended modalities—are always billed as a single unit per date of service regardless of duration and must be excluded from your timed-minute pool.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
