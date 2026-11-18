/**
 * [INPUT]: Next/Image, Next/Link
 * [OUTPUT]: EightMinuteRuleSeoContent component for /calculator/8-minute-rule
 * [POS]: src/components/EightMinuteRuleSeoContent.tsx 提供 Medicare 8 分钟计费法则对照表、余数分配规范、8/15/23 分钟算例与内链
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import Image from "next/image";
import Link from "next/link";

const UNIT_BRACKETS = [
  { units: "0 Units", range: "0 – 7 minutes", note: "Below minimum 8-minute threshold; not separately billable under CMS timed rules." },
  { units: "1 Unit", range: "8 – 22 minutes", note: "Entry threshold at 8 minutes; covers standard 15-minute single-code sessions." },
  { units: "2 Units", range: "23 – 37 minutes", note: "Triggered at 23 total timed minutes (15 + 8 remainder)." },
  { units: "3 Units", range: "38 – 52 minutes", note: "Triggered at 38 total timed minutes (30 + 8 remainder)." },
  { units: "4 Units", range: "53 – 67 minutes", note: "Common 60-minute outpatient therapy session bracket." },
  { units: "5 Units", range: "68 – 82 minutes", note: "Triggered at 68 total timed minutes (60 + 8 remainder)." },
  { units: "6 Units", range: "83 – 97 minutes", note: "90-minute intensive rehabilitation or multi-discipline block." },
  { units: "7 Units", range: "98 – 112 minutes", note: "Triggered at 98 total timed minutes (90 + 8 remainder)." },
  { units: "8 Units", range: "113 – 127 minutes", note: "Two-hour extended outpatient or home-health therapy block." },
];

export default function EightMinuteRuleSeoContent() {
  return (
    <section className="mt-20 max-w-4xl mx-auto space-y-12 text-left">
      {/* Visual Formula Diagram */}
      <div className="card-neon rounded-2xl p-6 md:p-10">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-mono tracking-widest text-[var(--neon-cyan)] block mb-2">
            CMS Medicare Part B Timed Billing Standard
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            How the 8 Minute Rule Calculator Converts Minutes to Units
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-body max-w-2xl mx-auto mt-2">
            Our <strong>8 minute rule calculator</strong> applies Centers for Medicare &amp; Medicaid Services (CMS) timed-code rounding brackets so physical therapists, occupational therapists, and speech-language pathologists bill exact allowable units.
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <Image
            src="/images/eight-minute-rule-formula.svg"
            alt="Medicare 8 minute rule calculator chart showing 8, 23, 38, and 53 minute billing unit thresholds"
            width={800}
            height={400}
            className="rounded-xl border border-white/10 w-full max-w-2xl h-auto shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Complete Reference Chart */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
          Medicare 8-Minute Rule Units Chart (0 to 127 Minutes)
        </h2>
        <p className="text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          Under Medicare Part B guidelines, a therapist must deliver at least <strong>8 minutes</strong> of direct one-on-one skilled intervention to bill 1 unit of a 15-minute timed CPT code (such as 97110, 97140, or 97530). Each subsequent unit unlocks every 15 minutes at the exact <strong>+8 remainder boundary</strong> (23, 38, 53, 68 minutes).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm border border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-slate-900/90 text-slate-200 uppercase text-xs font-mono">
              <tr>
                <th className="p-3.5 border-b border-white/10">Billable Units</th>
                <th className="p-3.5 border-b border-white/10">Total Timed Minutes</th>
                <th className="p-3.5 border-b border-white/10">CMS Billing Rule Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-300">
              {UNIT_BRACKETS.map((row) => (
                <tr key={row.units} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[var(--neon-cyan)]">{row.units}</td>
                  <td className="p-3.5 font-mono font-semibold text-white">{row.range}</td>
                  <td className="p-3.5 text-xs sm:text-sm text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-CPT Remainder & 8/15/23 Examples */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          8, 15, and 23-Minute Examples &amp; Multi-CPT Remainder Allocation
        </h2>
        <div className="space-y-4 text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          <p>
            When a session includes two or more timed CPT codes, you do <strong>not</strong> round each code separately first. Instead, CMS requires summing all timed minutes across the entire visit to determine the maximum total billable units, then assigning remaining units to the services with the largest leftover minute remainders.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Example A (8 vs. 7 Minutes):</strong> 8 minutes of 97110 Therapeutic Exercise qualifies for <strong>1 unit</strong>. 7 minutes of 97140 Manual Therapy alone yields <strong>0 units</strong>, unless combined with another timed code in the same visit.
            </li>
            <li>
              <strong>Example B (22 + 15 + 10 = 47 Minutes):</strong> Total timed minutes equal 47, which falls in the <strong>38–52 minute bracket (3 total units)</strong>. 97110 gets 1 full unit (7m remainder), 97140 gets 1 full unit (0m remainder), and 97530 has the largest remainder (10m) so 97530 receives the 3rd unit.
            </li>
            <li>
              <strong>Example C (Untimed Evaluation Codes):</strong> Untimed codes such as PT Evaluation (97161–97163) or Hot/Cold Packs (97010) always count as 1 flat unit regardless of duration and are excluded from the 8-minute timed sum.
            </li>
          </ul>
          <p className="pt-2">
            Need to compare CMS Medicare rounding against commercial AMA Rule of Eights or convert units back into decimal shift hours? Open our{" "}
            <Link href="/calculator/billing-units" className="text-[var(--neon-cyan)] hover:underline font-semibold">
              Billing Units Calculator
            </Link>{" "}
            or measure clinician shift utilization with our{" "}
            <Link href="/calculator/physical-therapy" className="text-[var(--neon-cyan)] hover:underline font-semibold">
              Physical Therapy Productivity Calculator
            </Link>
            .
          </p>
        </div>
      </div>

      {/* CMS vs AMA */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-5">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          CMS Medicare 8-Minute Rule vs. AMA Substantial Portion (Rule of Eights)
        </h2>
        <p className="text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          Commercial payers and Workers&apos; Compensation plans often follow the <strong>AMA CPT Rule of Eights</strong> rather than CMS total-time pooling. Under AMA rules, each individual CPT code is evaluated independently: a 10-minute 97110 + 10-minute 97140 visit can bill 2 separate units under AMA rules (each ≥ 8 minutes), whereas Medicare pools them to 20 total minutes and caps the visit at <strong>1 total unit</strong> (since 20 &lt; 23 minutes). Always verify payer policy before submitting mixed-code claims.
        </p>
      </div>
    </section>
  );
}
