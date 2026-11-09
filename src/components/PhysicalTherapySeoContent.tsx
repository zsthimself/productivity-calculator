/**
 * [INPUT]: None (Static semantic clinical content, images, and benchmark tables)
 * [OUTPUT]: PhysicalTherapySeoContent component for /calculator/physical-therapy
 * [POS]: High-density clinical reference, Medicare 8-minute rule tables, and FAQ section
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import Image from "next/image";

export default function PhysicalTherapySeoContent() {
  return (
    <section className="mt-20 max-w-4xl mx-auto space-y-12 text-left">
      {/* Visual Diagram Card */}
      <div className="card-neon rounded-2xl p-6 md:p-10">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-mono tracking-widest text-[var(--neon-cyan)] block mb-2">
            Visual Guide & Math Architecture
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            How Physical Therapy Productivity is Calculated
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-body max-w-2xl mx-auto mt-2">
            Understand how scheduled shifts, unpaid lunch deductions, and billable treatment minutes interact under standard CMS and hospital guidelines.
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <Image
            src="/images/pt-productivity-formula-diagram.svg"
            alt="Physical therapy productivity calculator formula and lunch break breakdown diagram"
            width={800}
            height={400}
            className="rounded-xl border border-white/10 w-full max-w-2xl h-auto shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Formula & Step-by-Step Lunch Break Guide */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
          Physical Therapy Productivity Calculator with Lunch Break: Step-by-Step Guide
        </h2>

        <div className="space-y-4 text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          <p>
            In modern rehabilitation therapy (including Outpatient Orthopedic, Skilled Nursing Facilities, and Inpatient Rehab), clinical productivity measures the exact proportion of paid working hours dedicated to direct, billable patient care.
          </p>

          <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              The Universal Clinical Formula
            </div>
            <code className="font-display text-base md:text-xl text-[var(--neon-cyan)] block">
              Productivity (%) = [ Direct Billable Treatment Minutes ÷ (Total Scheduled Shift Minutes − Unpaid Lunch Minutes) ] × 100
            </code>
          </div>

          <h3 className="font-display text-lg md:text-xl font-bold text-white mt-6">
            Real-World Shift Calculation Example
          </h3>
          <p>
            Consider a full-time physical therapist scheduled for an 8.0-hour shift with a required 30-minute unpaid meal period:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-mono text-xs md:text-sm text-white/90">
            <li><strong>Total Scheduled Shift:</strong> 8.0 hours = 480 minutes on site.</li>
            <li><strong>Unpaid Lunch Deduction:</strong> 30 minutes (non-working meal time).</li>
            <li><strong>Total Paid Clinical Time:</strong> 480 − 30 = 450 paid minutes (the true calculation denominator).</li>
            <li><strong>Direct Treatment Delivered:</strong> 360 billable minutes (e.g., 24 Medicare 15-minute units).</li>
            <li><strong>Actual Productivity Rate:</strong> (360 ÷ 450) × 100 = <strong>80.0%</strong>.</li>
            <li><strong>Remaining Non-Billable Time:</strong> 450 − 360 = 90 minutes for documentation, interdisciplinary team huddles, and patient transport.</li>
          </ul>
        </div>
      </div>

      {/* Medicare 8-Minute Rule Table */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <div className="border-b border-[var(--border)] pb-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Medicare 8-Minute Rule Table for Physical Therapy Productivity
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-body mt-2">
            The Centers for Medicare & Medicaid Services (CMS) 8-Minute Rule dictates how timed physical therapy CPT codes are converted into billable units.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-body border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Billable Units</th>
                <th className="py-3 px-4">Direct Treatment Range</th>
                <th className="py-3 px-4">Standard Midpoint</th>
                <th className="py-3 px-4">Common Timed CPT Codes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/50 font-mono text-[var(--text-secondary)]">
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">1 Unit</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)]">8 – 22 minutes</td>
                <td className="py-3 px-4">15 mins</td>
                <td className="py-3 px-4">97110 Therapeutic Exercise</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">2 Units</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)]">23 – 37 minutes</td>
                <td className="py-3 px-4">30 mins</td>
                <td className="py-3 px-4">97140 Manual Therapy Techniques</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">3 Units</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)]">38 – 52 minutes</td>
                <td className="py-3 px-4">45 mins</td>
                <td className="py-3 px-4">97112 Neuromuscular Re-education</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">4 Units</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)]">53 – 67 minutes</td>
                <td className="py-3 px-4">60 mins</td>
                <td className="py-3 px-4">97530 Therapeutic Activities</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">5 Units</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)]">68 – 82 minutes</td>
                <td className="py-3 px-4">75 mins</td>
                <td className="py-3 px-4">Combined Modalities / Gait Training (97116)</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">6 Units</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)]">83 – 97 minutes</td>
                <td className="py-3 px-4">90 mins</td>
                <td className="py-3 px-4">Extended Outpatient / Neuro Rehabilitation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-[var(--text-muted)] font-body">
          *Note: Untimed codes (such as PT Evaluation 97161-97163 and Hot/Cold packs 97010) are billed as single untimed service events regardless of exact treatment length, but their actual clinical delivery time still counts towards paid working hours.
        </p>

        {/* Timed vs Untimed and Mixed Remainder Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2">
            <h3 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
              <span className="text-[var(--neon-cyan)] font-mono">01.</span>
              Timed vs. Untimed Physical Therapy Codes
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <strong>Timed CPT codes</strong> (97110 Therapeutic Exercise, 97140 Manual Therapy, 97112 Neuromuscular Re-ed) require direct one-on-one patient contact and are billed in 15-minute increments according to the 8-minute threshold rule. <strong>Untimed codes</strong> (97161 Initial PT Eval, 97164 Re-eval, 97010 Hot/Cold Packs) are billed once per session regardless of duration. Both timed and untimed direct clinical minutes count equally toward your physical therapy productivity denominator.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2">
            <h3 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
              <span className="text-[var(--neon-pink)] font-mono">02.</span>
              The CMS Mixed Remaining Minutes Rule
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              When treating a patient with multiple timed codes, calculate total timed minutes first. For instance, 24 minutes of 97110 (1 unit + 9 remainder minutes) plus 12 minutes of 97140 (0 units + 12 remainder minutes) yields 36 total timed minutes. Because 36 minutes falls into the 2-unit bracket (23-37 mins), you bill 1 unit of 97110 and 1 unit of 97140 (combining 9 + 12 = 21 remainder minutes, which exceeds the 8-minute threshold).
            </p>
          </div>
        </div>
      </div>

      {/* Industry Benchmarks Table */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Physical Therapy Productivity Benchmarks Across Clinical Settings
        </h2>
        <p className="text-sm text-[var(--text-secondary)] font-body">
          Productivity targets vary dramatically depending on patient acuity, documentation friction, and setting requirements:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-body border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Clinical Setting</th>
                <th className="py-3 px-4">Typical Productivity Quota</th>
                <th className="py-3 px-4">Workflow & Documentation Dynamics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/50 font-mono text-[var(--text-secondary)]">
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">Acute Care Hospital</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)] font-semibold">65% – 75%</td>
                <td className="py-3 px-4">Complex chart reviews, ICU lines, discharge conferences, and bedside nurse communications.</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">Inpatient Rehab (IRF)</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)] font-semibold">75% – 80%</td>
                <td className="py-3 px-4">Mandatory 3-hour daily intensive therapy rule, rigorous interdisciplinary team rounds.</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">Skilled Nursing (SNF)</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)] font-semibold">80% – 85%</td>
                <td className="py-3 px-4">Patient-Driven Payment Model (PDPM), concurrent/group therapy tracking, point-of-service notes.</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">Outpatient Orthopedic</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)] font-semibold">85% – 90%+</td>
                <td className="py-3 px-4">Fast-paced 45-to-60 minute patient slots, point-of-service EMR charting, high patient turnover.</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-3 px-4 font-bold text-white">Home Health Care</td>
                <td className="py-3 px-4 text-[var(--neon-cyan)] font-semibold">4 – 6 Visits/Day</td>
                <td className="py-3 px-4">Unit points per OASIS start of care vs routine revisits, windshield driving time between homes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ethical Productivity & Burnout Prevention */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
          Ethical Strategies: How Therapists Hit Productivity Without Unpaid Overtime
        </h2>

        <div className="space-y-4 text-sm md:text-base font-body text-[var(--text-secondary)] leading-relaxed">
          <p>
            Therapist burnout is frequently linked to unrealistic productivity quotas (e.g. 90%+ in nursing homes), which coerce clinicians into "clocking out" before completing EHR documentation. This illegal practice creates severe legal liability and personal exhaustion. Here are three clinical best practices to protect your license and balance:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2">
              <span className="text-xs uppercase font-mono text-[var(--neon-cyan)] font-semibold">Strategy 1</span>
              <h4 className="font-bold text-white text-base">Point-of-Service (POS) Charting</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Document objective metrics (reps, resistance, gait speed, pain levels) alongside the patient during rest intervals instead of postponing everything until shift conclusion.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2">
              <span className="text-xs uppercase font-mono text-[var(--neon-pink)] font-semibold">Strategy 2</span>
              <h4 className="font-bold text-white text-base">Reverse Clock-Out Planning</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Use our reverse clock-out planner: once your day reaches the required billable threshold, clock out promptly without volunteering unpaid administrative labor.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2">
              <span className="text-xs uppercase font-mono text-[var(--neon-purple)] font-semibold">Strategy 3</span>
              <h4 className="font-bold text-white text-base">CMS Group & Concurrent Rules</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                In SNF settings, properly bill concurrent and group therapy under PDPM guidelines up to the 25% combined regulatory cap when clinically appropriate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
        <div className="border-b border-[var(--border)] pb-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Frequently Asked Questions About Physical Therapy Productivity
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-body mt-2">
            Verified answers to common clinical productivity, billing unit, and timecard questions.
          </p>
        </div>

        <div className="space-y-6 text-sm font-body">
          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              How is physical therapy productivity calculated?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Physical therapy productivity is calculated by dividing total billable treatment minutes by paid working minutes: Productivity (%) = (Billable Treatment Minutes ÷ (Total Scheduled Shift Minutes − Unpaid Lunch Minutes)) × 100. For example, 360 treatment minutes during an 8-hour shift with a 30-minute unpaid lunch equals 80.0% productivity (360 ÷ 450 × 100).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              What is a normal physical therapy productivity standard?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Standard productivity expectations vary by healthcare setting: Acute Care Hospitals typically expect 70% to 75%; Inpatient Rehabilitation Facilities (IRF) expect 75% to 80%; Skilled Nursing Facilities (SNF) expect 80% to 85%; and Outpatient Orthopedic clinics commonly mandate 85% to 90%.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              How does lunch break impact physical therapy productivity?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Unpaid meal periods (such as standard 30-minute or 60-minute lunches) must be subtracted from the total scheduled shift time. Doing so reduces the denominator (paid clinical minutes), allowing clinicians to meet their target percentage without needing to treat patients during their personal unpaid break.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              How does the Medicare 8-minute rule affect billable therapy units?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The Medicare 8-Minute Rule governs billing for timed CPT codes (e.g., 97110, 97140). A clinician must treat a patient for at least 8 minutes to bill 1 unit. Units accumulate as follows: 1 unit: 8-22 mins; 2 units: 23-37 mins; 3 units: 38-52 mins; 4 units: 53-67 mins; 5 units: 68-82 mins; 6 units: 83-97 mins. Accurately counting every timed minute maximizes billable clinical output.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              Does documentation time count towards physical therapy productivity?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Generally, documentation time is non-billable unless performed concurrently with direct skilled patient care (point-of-service documentation) and justifiable as part of clinical instruction and feedback. Dedicated administrative charting after patient departure counts against your productivity percentage.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <h3 className="font-bold text-white mb-2 text-base">
              Can occupational therapists (OT) and speech therapists (SLP) use this productivity calculator?
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Yes. Physical Therapy (PT), Occupational Therapy (OT), and Speech-Language Pathology (SLP) operate under identical CMS 8-minute billing thresholds and timecard formulas. OT and SLP practitioners can freely use all features including reverse clock-out planning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
