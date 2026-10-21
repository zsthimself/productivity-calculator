/**
 * @INPUT: 无
 * @OUTPUT: AboutUsPage - 平台使命、算法方法论与 E-E-A-T 站长背景介绍页
 * @POS: 核心信任页 - 确立计算器专业背景、算法公式来源与非营利/透明运营宗旨
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 about/_META.md。
 */
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Target, Award, Users, Shield, Cpu, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Editorial Methodology | Productivity Calculator",
  description:
    "Learn about Productivity Calculator: our mission to provide free, transparent, and privacy-first efficiency estimation tools across 20+ specialized industries.",
  alternates: {
    canonical: "https://productivitycalculator.work/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-radial bg-grid relative overflow-hidden flex flex-col justify-between">
      <Header />

      <div className="relative z-10 pt-28 pb-16 px-4 max-w-4xl mx-auto flex-1 w-full">
        <nav className="mb-8 text-center">
          <Link
            href="/"
            className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors font-body text-sm"
          >
            ← Back to Home
          </Link>
        </nav>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neon-border mb-4">
            <Sparkles className="w-4 h-4 text-[var(--neon-pink)]" />
            <span className="font-display text-xs tracking-widest text-[var(--neon-pink)] uppercase">
              Mission & Editorial Standards
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            About Productivity Calculator
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto">
            Democratizing workforce efficiency calculations with instant, private, and mathematically transparent tools
            for professionals across 20+ industries.
          </p>
        </div>

        <div className="space-y-8">
          {/* Mission Card */}
          <div className="card-neon rounded-2xl p-8 md:p-12 space-y-4">
            <h2 className="font-display text-2xl font-bold text-white flex items-center gap-3">
              <Target className="w-6 h-6 text-[var(--neon-cyan)]" />
              Our Mission
            </h2>
            <p className="text-[var(--text-secondary)] font-body leading-relaxed">
              In an era dominated by heavy enterprise software, mandatory account registrations, and intrusive paywalls,
              calculating basic daily productivity shouldn't be complicated. We created{" "}
              <strong>Productivity Calculator</strong> with a singular philosophy:{" "}
              <span className="text-white font-semibold">
                give frontline workers, clinicians, estimators, and managers immediate clarity on their work metrics in under 5 seconds.
              </span>
            </p>
            <p className="text-[var(--text-secondary)] font-body leading-relaxed">
              Whether you are a Physical Therapist calculating Medicare 85% quota to leave work on time, a construction
              project manager estimating cubic yard production per crew hour, or a customer service lead evaluating ticket
              resolution velocity, our specialized calculators are tailored to the exact realities of your trade.
            </p>
          </div>

          {/* Three Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-3">
              <Shield className="w-6 h-6 text-[var(--neon-cyan)]" />
              <h3 className="font-display font-bold text-white text-base">100% Client-Side Privacy</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                All calculation algorithms run directly in your local browser JavaScript engine. We never store, log, or
                transmit your personal shift times, patient treatment volumes, or salary figures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-3">
              <Cpu className="w-6 h-6 text-[var(--neon-pink)]" />
              <h3 className="font-display font-bold text-white text-base">Mathematical Rigor</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Our formulas reflect verified industry standards—such as the CMS Part B 8-Minute Billing Rule for therapy,
                FLSA shift duration rounding rules, and classic industrial engineering output/input ratios.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-3">
              <Award className="w-6 h-6 text-[var(--neon-purple)]" />
              <h3 className="font-display font-bold text-white text-base">Always Free & Open</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                We do not gate results behind email collection or credit card trials. Our tools are fully available to
                students, clinical interns, independent contractors, and enterprise teams globally.
              </p>
            </div>
          </div>

          {/* Editorial Methodology */}
          <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
            <h2 className="font-display text-2xl font-bold text-white flex items-center gap-3">
              <Users className="w-6 h-6 text-[var(--neon-purple)]" />
              Editorial & Industry Verification
            </h2>
            <div className="space-y-4 text-sm text-[var(--text-secondary)] font-body leading-relaxed">
              <p>
                Each industry calculator on our platform is built by examining standard operating procedures (SOPs) and
                workforce benchmarks:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white">Healthcare & Therapy:</strong> Formulas incorporate Centers for Medicare
                  & Medicaid Services (CMS) billing rules, separating total shift hours from non-billable lunch breaks to
                  prevent inaccurate productivity audit penalties.
                </li>
                <li>
                  <strong className="text-white">Trade & Construction:</strong> Metrics align with standard square footage,
                  linear measurement, and crew hour formulas utilized by general contractors and estimators.
                </li>
                <li>
                  <strong className="text-white">Knowledge Work:</strong> Incorporates Pomodoro-aligned intervals, task
                  switching penalties, and direct versus indirect labor distinctions.
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[var(--text-muted)]">
                Have an industry formula suggestion or feature request?
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--neon-cyan)] hover:underline"
              >
                <span>Contact our team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
