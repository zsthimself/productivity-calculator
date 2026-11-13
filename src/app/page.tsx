/**
 * @INPUT: industries.json (静态数据) - 获取 "general" 通用行业配置
 * @OUTPUT: HomePage React 组件 - 生产力计算器首页
 * @POS: 路由入口 - 网站首页，展示通用版计算器和行业列表
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 app/_META.md。
 */
import { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import IndustryList from "@/components/IndustryList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import industries from "@/data/industries.json";
import { IndustryData } from "@/types/industry";

const industryData = industries as IndustryData[];
const generalIndustry = industryData.find((i) => i.slug === "general")!;

const BASE_URL = "https://productivitycalculator.work";

export const metadata: Metadata = {
  title: "Productivity Calculator 2026: Free Tool for 20+ Industries",
  description:
    "Calculate your productivity instantly with our free online calculator. Measure output vs input efficiency for construction, sales, writing, and 20+ industries.",
  keywords: [
    "productivity calculator",
    "efficiency calculator",
    "output input calculator",
    "work productivity",
    "labor productivity",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Productivity Calculator 2026: Free Tool for 20+ Industries",
    description:
      "Calculate your productivity instantly. Measure output vs input efficiency for construction, sales, writing, and 20+ industries.",
    url: BASE_URL,
    type: "website",
  },
};

// SoftwareApplication Schema for home page
const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Productivity Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online productivity calculator for measuring output vs input efficiency across 20+ industries including construction, sales, writing, and more.",
  featureList: [
    "Calculate productivity rate",
    "Calculate required output",
    "Calculate required input",
    "Industry benchmarks comparison",
    "Calculation history tracking",
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-radial bg-grid relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Scan line effect */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-[200px] animate-[scan-line_8s_linear_infinite]"></div>
      </div>

      <div className="relative z-10 pt-20 pb-16 md:pt-28 md:pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-10 md:mb-12">
            {/* Tagline */}
            <p className="font-display text-xs md:text-sm tracking-[0.3em] text-[var(--neon-cyan)] uppercase mb-6 animate-fade-in">
              Measure • Optimize • Excel
            </p>

            {/* Main Title */}
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in stagger-1">
              <span className="text-gradient neon-text-subtle">Productivity</span>{" "}
              <span className="text-white">Calculator</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-body leading-relaxed animate-fade-in stagger-2">
              Measure your efficiency by comparing output to input.
              <span className="text-[var(--neon-pink)]"> Works for any industry, any role.</span>
            </p>

            {/* Decorative line */}
            <div className="mt-10 mx-auto flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--neon-cyan)]"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] animate-pulse"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--neon-cyan)]"></div>
            </div>
          </div>

                    {/* Trending High-Intent Vertical Suites (Cannibalization Relief) */}
          <div className="mb-10 p-5 md:p-6 rounded-2xl neon-border bg-[var(--bg-card)]/80 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] text-xl">⚡</span>
                <div>
                  <h3 className="font-display text-sm md:text-base font-bold text-white tracking-wide">
                    Popular Industry Productivity Calculators
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-body mt-0.5">
                    Focused formulas for daily clinical, production, and revenue workflows:
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link
                href="/calculator/physical-therapy"
                className="group p-3.5 rounded-xl border border-white/10 hover:border-[var(--neon-cyan)] bg-white/5 hover:bg-[var(--neon-cyan)]/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🩺</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[var(--neon-cyan)] transition-colors">
                      Physical Therapy &amp; Rehab
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      Billable utilization &amp; clock-out pacing
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[var(--neon-cyan)] group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/calculator/billing-units"
                className="group p-3.5 rounded-xl border border-white/10 hover:border-emerald-400 bg-white/5 hover:bg-emerald-500/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🧾</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      Billing Units Calculator
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      CMS 8-min rule &amp; multi-CPT split
                    </div>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/calculator/time-efficiency"
                className="group p-3.5 rounded-xl border border-white/10 hover:border-[var(--neon-cyan)] bg-white/5 hover:bg-[var(--neon-cyan)]/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">⏱️</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[var(--neon-cyan)] transition-colors">
                      Time Efficiency Calculator
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      Standard vs. actual time &amp; utilization
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[var(--neon-cyan)] group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/calculator/total-factor-productivity"
                className="group p-3.5 rounded-xl border border-white/10 hover:border-purple-400 bg-white/5 hover:bg-purple-500/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">⚖️</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                      Total Factor Productivity (TFP)
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      Cobb-Douglas TFP &amp; KLEMS MFP index
                    </div>
                  </div>
                </div>
                <span className="text-xs text-purple-300 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/calculator/snf-productivity"
                className="group p-3.5 rounded-xl border border-white/10 hover:border-teal-400 bg-white/5 hover:bg-teal-500/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🏥</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                      SNF Productivity Calculator
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      SNF rehab % &amp; PDPM 25% cap
                    </div>
                  </div>
                </div>
                <span className="text-xs text-teal-300 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/calculator/video-production"
                className="group p-3.5 rounded-xl border border-white/10 hover:border-[var(--neon-pink)] bg-white/5 hover:bg-[var(--neon-pink)]/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🎬</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[var(--neon-pink)] transition-colors">
                      Video Production &amp; Editing
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      Editing hours vs delivered minutes
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[var(--neon-pink)] group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/calculator/sales"
                className="group p-3.5 rounded-xl border border-white/10 hover:border-[var(--neon-purple)] bg-white/5 hover:bg-[var(--neon-purple)]/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💼</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[var(--neon-purple)] transition-colors">
                      Sales Teams &amp; Reps
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      Quota attainment &amp; revenue per hour
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[var(--neon-purple)] group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Calculator */}
          <Calculator industry={generalIndustry} />

          {/* SEO Content */}
          <section className="mt-12 max-w-3xl mx-auto">
            <div className="card-neon rounded-2xl p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-8">
                What is Productivity?
              </h2>

              <div className="space-y-6 text-[var(--text-secondary)] font-body leading-relaxed text-left mx-auto max-w-2xl">
                <p>
                  Productivity is the ratio of output to input. It measures how efficiently resources
                  (time, labor, money) are converted into goods, services, or results.
                </p>

                <div className="neon-border rounded-xl p-6 text-center my-8">
                  <code className="font-display text-xl md:text-2xl text-[var(--neon-cyan)]">
                    Productivity = Total Output ÷ Total Input
                  </code>
                </div>

                <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                  How to Use This Calculator
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-[var(--text-secondary)]">
                  <li>Enter your <span className="text-[var(--neon-cyan)]">Total Output</span> (units produced, revenue earned, tasks completed)</li>
                  <li>Enter your <span className="text-[var(--neon-pink)]">Total Input</span> (hours worked, people employed, resources used)</li>
                  <li>Click <span className="font-display text-white">CALCULATE</span> to see your productivity rate</li>
                </ol>

                <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                  Why Measure Productivity?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--neon-cyan)]">→</span>
                    <span><strong className="text-white">Identify bottlenecks early:</strong> Spot where non-billable administrative overhead, rework loops, or machine downtime silently erode total shift output.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--neon-pink)]">→</span>
                    <span><strong className="text-white">Set realistic staffing targets:</strong> Ground shift quotas and project timelines in historical empirical averages instead of guesswork.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--neon-purple)]">→</span>
                    <span><strong className="text-white">Compare teams fairly:</strong> Normalize raw output by actual worked hours so small crews and enterprise departments share one objective yardstick.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--neon-blue)]">→</span>
                    <span><strong className="text-white">Protect sustainable margins:</strong> Track whether revenue per labor hour grows faster than overtime, materials, and software costs.</span>
                  </li>
                </ul>

                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30 p-3 my-8">
                  <img
                    src="/images/general-productivity-formula.svg"
                    alt="Productivity formula comparison across single-factor labor output, Total Factor Productivity TFP, and multifactor efficiency"
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                  Single-Factor Labor vs. Multi-Factor &amp; Total Factor Productivity (TFP)
                </h3>
                <p>
                  Following U.S. Bureau of Labor Statistics (BLS) and OECD productivity accounting standards, no single ratio captures every operational trade-off. Single-factor labor productivity measures units produced, revenue, or patients treated per paid hour worked. It excels at daily shift scheduling and overtime audits, yet it misses capital equipment costs or outsourced software expenses.
                </p>
                <p>
                  Multi-factor productivity (MFP) evaluates total economic output against combined labor, capital depreciation, energy, and material inputs. Meanwhile, the Solow Total Factor Productivity model isolates process efficiency and technical progress that cannot be explained purely by adding more staff or longer machine hours. Comparing both lenses prevents a common management trap: boosting output per employee simply by purchasing expensive automation that destroys net return on capital.
                </p>

                <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                  Input Scope Traps: Gross Paid Hours vs. Net Productive Time
                </h3>
                <p>
                  Consistent input definitions matter more than spreadsheet complexity. When entering Total Input into this productivity calculator, decide upfront whether your denominator reflects gross scheduled payroll hours (including paid rest breaks, training, and team huddles) or net direct production hours. Mixing the two across quarters creates phantom efficiency spikes. For client-billing fields such as physical therapy, legal consulting, or field maintenance, always track unbillable documentation time separately from billable treatment or wrench time so capacity models remain honest.
                </p>

                <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                  2026 Cross-Industry Productivity Benchmark Reference
                </h3>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/25">
                  <table className="w-full text-xs sm:text-sm text-left border-collapse">
                    <thead className="bg-white/5 text-white font-display uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-3 border-b border-white/10">Industry Sector</th>
                        <th className="p-3 border-b border-white/10">Primary Metric</th>
                        <th className="p-3 border-b border-white/10">Healthy Target Range</th>
                        <th className="p-3 border-b border-white/10">Primary Drag Factor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-[var(--text-secondary)]">
                      <tr>
                        <td className="p-3 font-semibold text-white">Physical Therapy &amp; Rehab</td>
                        <td className="p-3">Billable Utilization %</td>
                        <td className="p-3 font-mono text-[var(--neon-cyan)]">80% – 85%</td>
                        <td className="p-3">Patient cancellations &amp; SOAP notes</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">Manufacturing &amp; Assembly</td>
                        <td className="p-3">Overall Equipment Effectiveness</td>
                        <td className="p-3 font-mono text-[var(--neon-cyan)]">75% – 85% OEE</td>
                        <td className="p-3">Unplanned changeovers &amp; scrap</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">Customer Support Centers</td>
                        <td className="p-3">Tickets Resolved / Hour</td>
                        <td className="p-3 font-mono text-[var(--neon-cyan)]">8 – 14 TPH</td>
                        <td className="p-3">Reopened escalations &amp; low FCR</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">Commercial Copywriting</td>
                        <td className="p-3">Edited Words / Hour</td>
                        <td className="p-3 font-mono text-[var(--neon-cyan)]">600 – 1,000 WPH</td>
                        <td className="p-3">Research scope creep &amp; revisions</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">Retail Store Operations</td>
                        <td className="p-3">Sales Per Labor Hour (SPLH)</td>
                        <td className="p-3 font-mono text-[var(--neon-cyan)]">$180 – $300 / hr</td>
                        <td className="p-3">Off-peak overstaffing &amp; stockouts</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">Logistics &amp; Fulfillment</td>
                        <td className="p-3">Units Picked / Paid Hour</td>
                        <td className="p-3 font-mono text-[var(--neon-cyan)]">120 – 180 UPH</td>
                        <td className="p-3">Aisle travel congestion &amp; mispicks</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                  Worked Calculation Examples
                </h3>
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h4 className="font-display text-sm font-bold text-[var(--neon-cyan)] mb-2">
                      Example 1: Small Operations Team Output &amp; Overtime Check
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      Suppose a 4-person fulfillment crew processes <strong>2,240 packaged orders</strong> during a 40-hour workweek (160 total paid hours). Dividing output by input yields <strong>14.0 orders per labor hour</strong>. If order volume rises to 2,800 packages the following week and the crew logs 20 overtime hours (180 total hours), output climbs 25% while hourly productivity increases to <strong>15.56 orders per hour (+11.1%)</strong>—confirming genuine process improvement rather than simple overtime padding.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h4 className="font-display text-sm font-bold text-[var(--neon-pink)] mb-2">
                      Example 2: Service Agency Utilization &amp; Effective Hourly Yield
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      A design consultancy bills $6,000 for a web sprint requiring 40 direct production hours, 8 client review calls, and 4 hours of rework (52 total hours). Looking only at billable scope suggests $150/hour, whereas true total-input productivity is <strong>$115.38 per hour</strong> ($6,000 &divide; 52). Tracking total hours exposes the 23% margin drag from unbilled revision cycles.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--neon-cyan)]/25 bg-[var(--neon-cyan)]/5 p-5 mt-8 text-xs text-[var(--text-secondary)] leading-relaxed">
                  <strong className="text-white">Editorial &amp; Privacy Standard:</strong> All mathematical formulas on ProductivityCalculator.work reference standard economic definitions published by the BLS and OECD. Calculations run 100% client-side inside your browser; shift inputs, payroll assumptions, and business figures are never uploaded to external servers. For deep single-sector benchmarks, explore our dedicated 26 industry calculators listed below.
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-12 max-w-3xl mx-auto">
            <div className="card-neon rounded-2xl p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {/* FAQ 1 */}
                <details className="group neon-border rounded-xl p-4 cursor-pointer">
                  <summary className="font-display text-lg font-semibold text-white list-none flex justify-between items-center">
                    What is the formula for calculating productivity?
                    <span className="text-[var(--neon-cyan)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[var(--text-secondary)] font-body leading-relaxed">
                    The basic productivity formula is <strong className="text-[var(--neon-cyan)]">Productivity = Total Output ÷ Total Input</strong>. 
                    Output can be measured as units produced, revenue earned, tasks completed, or any other measurable result. 
                    Input typically includes hours worked, number of employees, or resources invested.
                  </p>
                </details>

                {/* FAQ 2 */}
                <details className="group neon-border rounded-xl p-4 cursor-pointer">
                  <summary className="font-display text-lg font-semibold text-white list-none flex justify-between items-center">
                    How do I improve my productivity rate?
                    <span className="text-[var(--neon-pink)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-4 text-[var(--text-secondary)] font-body leading-relaxed">
                    <p className="mb-3">To improve productivity:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li>Identify bottlenecks by measuring current performance</li>
                      <li>Eliminate time-wasting activities</li>
                      <li>Automate repetitive tasks</li>
                      <li>Set clear goals and deadlines</li>
                      <li>Take regular breaks to maintain focus</li>
                      <li>Use tools like this calculator to track progress over time</li>
                    </ol>
                  </div>
                </details>

                {/* FAQ 3 */}
                <details className="group neon-border rounded-xl p-4 cursor-pointer">
                  <summary className="font-display text-lg font-semibold text-white list-none flex justify-between items-center">
                    What is a good productivity rate?
                    <span className="text-[var(--neon-purple)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[var(--text-secondary)] font-body leading-relaxed">
                    A "good" productivity rate varies by industry. For example, in writing, 500-800 words per hour is average while 
                    1200+ is excellent. In manufacturing, it depends on the product complexity. Use our industry-specific calculators 
                    to compare your rate against benchmarks for your field.
                  </p>
                </details>

                {/* FAQ 4 */}
                <details className="group neon-border rounded-xl p-4 cursor-pointer">
                  <summary className="font-display text-lg font-semibold text-white list-none flex justify-between items-center">
                    Can I use this calculator for team productivity?
                    <span className="text-[var(--neon-blue)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[var(--text-secondary)] font-body leading-relaxed">
                    Yes! For team productivity, enter the total output of the team and the total input (such as combined hours worked 
                    or number of team members). This gives you the average productivity per person or per hour, which is useful for 
                    comparing team performance over time.
                  </p>
                </details>

                {/* FAQ 5 */}
                <details className="group neon-border rounded-xl p-4 cursor-pointer">
                  <summary className="font-display text-lg font-semibold text-white list-none flex justify-between items-center">
                    Is productivity the same as efficiency?
                    <span className="text-[var(--neon-cyan)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[var(--text-secondary)] font-body leading-relaxed">
                    While related, they are different. <strong className="text-white">Productivity</strong> measures the quantity of output 
                    relative to input. <strong className="text-white">Efficiency</strong> measures how well resources are used to achieve 
                    a goal, often considering quality and waste. High productivity with low efficiency means producing a lot but wasting resources.
                  </p>
                </details>

                {/* FAQ 6 */}
                <details className="group neon-border rounded-xl p-4 cursor-pointer">
                  <summary className="font-display text-lg font-semibold text-white list-none flex justify-between items-center">
                    How often should I measure productivity?
                    <span className="text-[var(--neon-pink)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[var(--text-secondary)] font-body leading-relaxed">
                    It depends on your goals. For personal productivity, weekly tracking helps identify patterns. For teams, monthly 
                    reviews work well. For manufacturing or sales, daily or shift-based tracking may be necessary. The key is consistency—choose 
                    a frequency you can maintain.
                  </p>
                </details>
              </div>
            </div>

            {/* FAQ Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What is the formula for calculating productivity?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The basic productivity formula is Productivity = Total Output ÷ Total Input. Output can be measured as units produced, revenue earned, tasks completed, or any other measurable result. Input typically includes hours worked, number of employees, or resources invested.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How do I improve my productivity rate?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "To improve productivity: (1) Identify bottlenecks by measuring current performance, (2) Eliminate time-wasting activities, (3) Automate repetitive tasks, (4) Set clear goals and deadlines, (5) Take regular breaks to maintain focus, and (6) Use tools like this calculator to track progress over time.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is a good productivity rate?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "A good productivity rate varies by industry. For example, in writing, 500-800 words per hour is average while 1200+ is excellent. In manufacturing, it depends on the product complexity. Use industry-specific calculators to compare your rate against benchmarks.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can I use this calculator for team productivity?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes! For team productivity, enter the total output of the team and the total input (such as combined hours worked or number of team members). This gives you the average productivity per person or per hour.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Is productivity the same as efficiency?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "While related, they are different. Productivity measures the quantity of output relative to input. Efficiency measures how well resources are used to achieve a goal, often considering quality and waste.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How often should I measure productivity?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "It depends on your goals. For personal productivity, weekly tracking helps identify patterns. For teams, monthly reviews work well. For manufacturing or sales, daily or shift-based tracking may be necessary.",
                      },
                    },
                  ],
                }),
              }}
            />
          </section>

          {/* Internal Links to Industry Calculators */}
          <IndustryList />

          {/* Global Footer */}
                    <Footer />
        </div>
      </div>

      {/* Background Orbs */}
      <div className="fixed -z-10 top-0 left-1/4 w-[600px] h-[600px] bg-[var(--neon-purple)] rounded-full blur-[200px] opacity-10"></div>
      <div className="fixed -z-10 bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--neon-cyan)] rounded-full blur-[200px] opacity-10"></div>
      <div className="fixed -z-10 top-1/2 right-0 w-[400px] h-[400px] bg-[var(--neon-pink)] rounded-full blur-[200px] opacity-5"></div>
    </main>
  );
}
