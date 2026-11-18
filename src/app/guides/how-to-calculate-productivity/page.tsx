/**
 * [INPUT]: Header, Footer, Next/Image, Next/Link
 * [OUTPUT]: 支柱内容指南页 /guides/how-to-calculate-productivity（合并覆盖 how to calculate productivity & productivity formula）
 * [POS]: src/app/guides/how-to-calculate-productivity/page.tsx 为 36 个行业计算器提供权威信息入口与内链权重漏斗
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CANONICAL_URL = "https://productivitycalculator.work/guides/how-to-calculate-productivity";

export const metadata: Metadata = {
  title: "How to Calculate Productivity & Formula Guide (2026)",
  description:
    "Learn how to calculate productivity with the universal productivity formula, worked labor and multifactor TFP examples, Excel equations, and free calculators.",
  keywords: [
    "how to calculate productivity",
    "productivity formula",
    "labor productivity formula",
    "multifactor productivity formula",
    "productivity calculation example",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
};

const GUIDE_FAQS = [
  {
    question: "What is the standard productivity formula?",
    answer:
      "The universal productivity formula is Productivity = Total Output ÷ Total Input. Output can be units produced, billable minutes, or revenue generated, while input is typically labor hours, employees, or combined labor, capital, and material costs.",
  },
  {
    question: "How do you calculate employee productivity as a percentage?",
    answer:
      "Divide actual output (or billable hours) by the expected standard target (or net paid shift hours), then multiply by 100. For example, 390 billable minutes divided by 480 net paid shift minutes equals 81.25% productivity.",
  },
  {
    question: "What is the difference between partial factor and multifactor productivity?",
    answer:
      "Partial factor productivity measures output against a single input, such as output per labor hour. Multifactor productivity (MFP) divides total output value by the combined cost of labor, capital equipment, energy, and materials.",
  },
  {
    question: "How do you calculate productivity in Excel?",
    answer:
      "Place total output in cell A2 and total input hours or cost in cell B2, then enter =A2/B2 for unit productivity or =(A2/B2)*100 for percentage efficiency. Use =IF(B2>0, A2/B2, 0) to prevent divide-by-zero errors.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${CANONICAL_URL}#article`,
      headline: "How to Calculate Productivity: Complete Productivity Formula Guide",
      description:
        "Step-by-step guide to the universal productivity formula, labor productivity, utilization percentages, multifactor TFP ratios, and Excel equations.",
      author: {
        "@type": "Organization",
        name: "Productivity Calculator",
      },
      publisher: {
        "@type": "Organization",
        name: "Productivity Calculator",
        url: "https://productivitycalculator.work",
      },
      mainEntityOfPage: CANONICAL_URL,
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL_URL}#faq`,
      mainEntity: GUIDE_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function HowToCalculateProductivityGuide() {
  return (
    <main className="min-h-screen bg-gradient-radial bg-grid relative overflow-hidden flex flex-col justify-between">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative z-10 pt-28 pb-16 px-4 max-w-4xl mx-auto flex-1 w-full space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--neon-cyan)] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[var(--neon-cyan)]">How to Calculate Productivity</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30">
            Formula &amp; Operations Guide
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            How to Calculate Productivity: Complete <span className="text-gradient">Productivity Formula</span> Guide
          </h1>
          <p className="text-base md:text-lg text-[var(--text-secondary)] font-body leading-relaxed">
            Whether you manage a warehouse floor, a software team, or an outpatient clinic, knowing <strong>how to calculate productivity</strong> starts with one universal equation: dividing measurable output by the resources consumed to produce it. Below are the exact formulas, worked examples, Excel templates, and interactive calculators for every use case.
          </p>

          {/* Fast Calculator Jump Bar */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-[var(--neon-cyan)] text-slate-950 font-mono text-xs font-bold hover:opacity-90 transition"
            >
              ⚡ Open Main Productivity Calculator
            </Link>
            <Link
              href="/calculator/labor"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-slate-200 font-mono text-xs font-semibold hover:border-[var(--neon-cyan)] transition"
            >
              Labor Calculator →
            </Link>
            <Link
              href="/calculator/employee"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-slate-200 font-mono text-xs font-semibold hover:border-[var(--neon-cyan)] transition"
            >
              Employee Calculator →
            </Link>
            <Link
              href="/calculator/physical-therapy"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-slate-200 font-mono text-xs font-semibold hover:border-[var(--neon-cyan)] transition"
            >
              Therapy Calculator →
            </Link>
          </div>
        </header>

        {/* 0-CLS Visual Diagram */}
        <div className="card-neon rounded-2xl p-6 md:p-8">
          <Image
            src="/images/how-to-calculate-productivity-formula.svg"
            alt="How to calculate productivity diagram showing labor, utilization percentage, and multifactor productivity formulas"
            width={800}
            height={400}
            className="rounded-xl border border-white/10 w-full h-auto"
            priority
          />
        </div>

        {/* Section 1: Universal Formula */}
        <section className="card-neon rounded-2xl p-8 md:p-10 space-y-5">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            The Universal Productivity Formula (Output ÷ Input)
          </h2>
          <div className="neon-border rounded-xl p-6 text-center bg-[var(--bg-elevated)]/70">
            <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
              Standard Productivity Formula
            </div>
            <code className="font-display text-lg md:text-2xl text-[var(--neon-cyan)] block">
              Productivity = Total Output ÷ Total Input
            </code>
          </div>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-body leading-relaxed">
            In economics and business operations, the <strong>productivity formula</strong> adapts to whatever unit creates value in your organization. Choosing the wrong denominator is the most common measurement mistake—for example, counting unpaid lunch breaks in clinical shifts or mixing capital equipment costs into pure labor-hour ratios.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-1.5">
              <div className="text-xs font-mono font-bold text-[var(--neon-cyan)]">1. Single-Factor (Labor)</div>
              <div className="font-mono text-sm text-white font-semibold">Units ÷ Paid Hours</div>
              <p className="text-xs text-slate-400">Best for manufacturing lines, warehouses, and hourly shift crews.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-1.5">
              <div className="text-xs font-mono font-bold text-blue-400">2. Service Utilization %</div>
              <div className="font-mono text-sm text-white font-semibold">(Billable ÷ Net Shift) × 100</div>
              <p className="text-xs text-slate-400">Standard for physical therapists, agencies, and legal billers.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-1.5">
              <div className="text-xs font-mono font-bold text-emerald-400">3. Multifactor (MFP / TFP)</div>
              <div className="font-mono text-sm text-white font-semibold">Output ÷ (Labor + Capital + Materials)</div>
              <p className="text-xs text-slate-400">Measures total firm efficiency across automation and human labor.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Worked Examples */}
        <section className="card-neon rounded-2xl p-8 md:p-10 space-y-5">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            3 Worked Examples: Labor, Shift Percentage, and Multifactor Productivity
          </h2>
          <div className="space-y-4 text-sm md:text-base text-[var(--text-secondary)] font-body leading-relaxed">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
              <h3 className="font-display text-lg font-bold text-white">Example 1: Labor Productivity (Units per Hour)</h3>
              <p>
                A packaging team produces <strong>480 finished units</strong> during a combined <strong>40 labor hours</strong>. Applying <code className="text-white font-mono">480 ÷ 40 = 12.0 units/hour</code>. If each worker costs $24/hr, the unit labor cost is <code className="text-white font-mono">$24 ÷ 12 = $2.00/unit</code>. Run your own shift numbers in the{" "}
                <Link href="/calculator/labor" className="text-[var(--neon-cyan)] hover:underline font-semibold">Labor Productivity Calculator</Link>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
              <h3 className="font-display text-lg font-bold text-white">Example 2: Healthcare &amp; Service Utilization (%)</h3>
              <p>
                A therapist works an 8.5-hour shift (510 minutes) with a 30-minute unpaid lunch break, leaving <strong>480 net paid minutes</strong>. Logging <strong>390 billable treatment minutes</strong> gives <code className="text-white font-mono">(390 ÷ 480) × 100 = 81.25%</code>. Calculate clinical targets with our{" "}
                <Link href="/calculator/physical-therapy" className="text-[var(--neon-cyan)] hover:underline font-semibold">Physical Therapy Productivity Calculator</Link>{" "}
                or <Link href="/calculator/productivity-with-lunch-break" className="text-[var(--neon-cyan)] hover:underline font-semibold">Lunch Break Productivity Calculator</Link>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
              <h3 className="font-display text-lg font-bold text-white">Example 3: Multifactor Productivity (MFP / TFP)</h3>
              <p>
                If a plant generates <strong>$120,000</strong> in weekly output using <strong>$45,000</strong> in labor, <strong>$20,000</strong> in machine capital, and <strong>$15,000</strong> in materials ($80,000 total input), multifactor productivity is <code className="text-white font-mono">$120,000 ÷ $80,000 = 1.50</code> ($1.50 generated per $1.00 spent). Model Cobb-Douglas and MFP ratios in our{" "}
                <Link href="/calculator/total-factor-productivity" className="text-[var(--neon-cyan)] hover:underline font-semibold">Total Factor Productivity Calculator</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Excel Formulas */}
        <section className="card-neon rounded-2xl p-8 md:p-10 space-y-5">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Productivity Formula Cheat Sheet for Excel &amp; Google Sheets
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm border border-white/10 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/90 text-slate-200 uppercase text-xs font-mono">
                <tr>
                  <th className="p-3.5 border-b border-white/10">Metric</th>
                  <th className="p-3.5 border-b border-white/10">Excel Formula</th>
                  <th className="p-3.5 border-b border-white/10">Column Mapping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-300 font-mono text-xs">
                <tr>
                  <td className="p-3.5 text-white font-semibold">Output per Hour</td>
                  <td className="p-3.5 text-[var(--neon-cyan)]">=IF(B2&gt;0, A2/B2, 0)</td>
                  <td className="p-3.5 text-slate-400">A2 = Units, B2 = Hours</td>
                </tr>
                <tr>
                  <td className="p-3.5 text-white font-semibold">Productivity % (with Lunch)</td>
                  <td className="p-3.5 text-[var(--neon-cyan)]">=A2/((B2*60)-C2)</td>
                  <td className="p-3.5 text-slate-400">A2 = Billable Min, B2 = Shift Hrs, C2 = Lunch Min</td>
                </tr>
                <tr>
                  <td className="p-3.5 text-white font-semibold">Revenue per Employee</td>
                  <td className="p-3.5 text-[var(--neon-cyan)]">=A2/B2</td>
                  <td className="p-3.5 text-slate-400">A2 = Total Revenue, B2 = Headcount FTE</td>
                </tr>
                <tr>
                  <td className="p-3.5 text-white font-semibold">Time Efficiency %</td>
                  <td className="p-3.5 text-[var(--neon-cyan)]">=(A2/B2)*100</td>
                  <td className="p-3.5 text-slate-400">A2 = Standard Time, B2 = Actual Time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Specialized Calculators Directory */}
        <section className="card-neon rounded-2xl p-8 md:p-10 space-y-5">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Choose a Specialized Productivity Calculator by Industry
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Link href="/calculator/employee" className="p-4 rounded-xl bg-slate-950/70 border border-white/10 hover:border-[var(--neon-cyan)] transition">
              <div className="font-bold text-white">Employee Productivity Calculator</div>
              <div className="text-xs text-slate-400 mt-1">Revenue per employee, utilization %, and team output ratios.</div>
            </Link>
            <Link href="/calculator/time-efficiency" className="p-4 rounded-xl bg-slate-950/70 border border-white/10 hover:border-[var(--neon-cyan)] transition">
              <div className="font-bold text-white">Time Efficiency Calculator</div>
              <div className="text-xs text-slate-400 mt-1">Standard vs. actual cycle time and annual FTE hours saved.</div>
            </Link>
            <Link href="/calculator/manufacturing" className="p-4 rounded-xl bg-slate-950/70 border border-white/10 hover:border-[var(--neon-cyan)] transition">
              <div className="font-bold text-white">Manufacturing Productivity Calculator</div>
              <div className="text-xs text-slate-400 mt-1">OEE, throughput per machine hour, and scrap-adjusted yield.</div>
            </Link>
            <Link href="/calculator/8-minute-rule" className="p-4 rounded-xl bg-slate-950/70 border border-white/10 hover:border-[var(--neon-cyan)] transition">
              <div className="font-bold text-white">8 Minute Rule Calculator</div>
              <div className="text-xs text-slate-400 mt-1">Medicare Part B timed CPT units and multi-code allocator.</div>
            </Link>
          </div>
        </section>

        {/* Section 5: FAQs */}
        <section className="card-neon rounded-2xl p-8 md:p-10 space-y-5">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {GUIDE_FAQS.map((faq) => (
              <div key={faq.question} className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-1.5">
                <h3 className="font-display text-base font-bold text-white">{faq.question}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
