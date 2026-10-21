/**
 * @INPUT: 无
 * @OUTPUT: TermsOfServicePage - 服务条款与免责声明页
 * @POS: 核心合规页 - 规范工具使用边界，声明计算估算性质与免责条款
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 terms/_META.md。
 */
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileCheck, AlertTriangle, Scale, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Productivity Calculator",
  description:
    "Terms of Service and legal disclaimers for using Productivity Calculator tools across 20+ industries.",
  alternates: {
    canonical: "https://productivitycalculator.work/terms",
  },
};

export default function TermsOfServicePage() {
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
            <Scale className="w-4 h-4 text-[var(--neon-purple)]" />
            <span className="font-display text-xs tracking-widest text-[var(--neon-purple)] uppercase">
              Legal Terms & Disclaimers
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm font-mono text-[var(--text-muted)]">
            Effective Date: January 1, 2026 | Last Updated: October 21, 2026
          </p>
        </div>

        <div className="card-neon rounded-2xl p-8 md:p-12 space-y-8 text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[var(--neon-cyan)]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using <strong>Productivity Calculator</strong> (the "Service"), you accept and agree to be
              bound by the terms and provisions of this agreement. In addition, when using these particular services, you
              shall be subject to any posted guidelines or rules applicable to such services.
            </p>
            <p>
              If you do not agree to abide by the above, please do not use this website.
            </p>
          </section>

          <section className="space-y-3 p-6 rounded-xl bg-[var(--bg-elevated)] border border-amber-500/30 text-amber-200/90">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              2. Professional Disclaimer (Important)
            </h2>
            <p className="text-sm">
              All tools, equations, benchmark figures, and calculators provided on Productivity Calculator are for
              <strong> informational, educational, and general estimation purposes only</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm text-amber-200/80">
              <li>
                <strong>No Clinical Advice:</strong> The Physical Therapy, Therapy, and Healthcare calculators do not
                constitute official CMS billing certification or clinical audits. Always verify billing units with your
                facility's compliance officer or billing specialist.
              </li>
              <li>
                <strong>No Legal or Labor Advice:</strong> Time and labor calculations do not replace official FLSA payroll
                audits, collective bargaining agreements, or official employment contracts.
              </li>
              <li>
                <strong>No Financial Guarantee:</strong> We do not guarantee financial outcomes, bonus payments, or
                workplace performance ratings based on calculations made on this platform.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">3. Use License</h2>
            <p>
              Permission is granted to freely use the calculators for personal, educational, or internal commercial
              evaluation purposes. This is the grant of a license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Modify or copy the underlying site source code or attempt to reverse engineer the web application;</li>
              <li>Use the materials for public commercial resale as a competing standalone calculation product;</li>
              <li>Attempt to decompile or conduct automated scraping attacks that disrupt service availability.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">4. Limitation of Liability</h2>
            <p>
              In no event shall Productivity Calculator or its creators be liable for any damages (including, without
              limitation, damages for loss of data or profit, employment disputes, or business interruption) arising out of
              the use or inability to use the materials on Productivity Calculator's website, even if notified orally or in
              writing of the possibility of such damage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Productivity Calculator could include technical, typographical, or photographic
              errors. We do not warrant that any of the materials on its website are 100% error-free. We may make changes to
              the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[var(--border)]">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">6. Inquiries Regarding Terms</h2>
            <p>
              If you have any questions about these Terms of Service, please reach out to:{" "}
              <a href="mailto:support@productivitycalculator.work" className="text-[var(--neon-cyan)] underline">
                support@productivitycalculator.work
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
