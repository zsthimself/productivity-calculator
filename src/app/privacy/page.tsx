/**
 * @INPUT: 无
 * @OUTPUT: PrivacyPolicyPage - Google AdSense / GDPR / CCPA 严格合规隐私政策页
 * @POS: 核心合规页 - 详细披露 Cookie、Google DART 广告技术与用户数据权利
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 privacy/_META.md。
 */
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Productivity Calculator",
  description:
    "Privacy Policy for Productivity Calculator. Learn about how we handle user data, cookies, third-party advertising partners like Google AdSense, and your GDPR/CCPA privacy rights.",
  alternates: {
    canonical: "https://productivitycalculator.work/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-4 h-4 text-[var(--neon-cyan)]" />
            <span className="font-display text-xs tracking-widest text-[var(--neon-cyan)] uppercase">
              Compliance & Data Protection
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-[var(--text-muted)]">
            Effective Date: January 1, 2026 | Last Updated: October 21, 2026
          </p>
        </div>

        <div className="card-neon rounded-2xl p-8 md:p-12 space-y-8 text-[var(--text-secondary)] font-body text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[var(--neon-cyan)]" />
              1. Overview & Commitment to Privacy
            </h2>
            <p>
              At <strong>Productivity Calculator</strong> (accessible from{" "}
              <a href="https://productivitycalculator.work" className="text-[var(--neon-cyan)] underline">
                https://productivitycalculator.work
              </a>
              ), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the
              types of information that are collected and recorded by Productivity Calculator and how we use it.
            </p>
            <p>
              Our calculators are fundamentally built to perform mathematical calculations entirely on the client side
              within your browser. We do not store, sell, or transmit the specific numerical figures or shift data you input
              into our calculators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-[var(--neon-pink)]" />
              2. Log Files
            </h2>
            <p>
              Productivity Calculator follows a standard procedure of using log files. These files log visitors when they
              visit websites. All hosting services do this as part of hosting services' analytics. The information collected
              by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date
              and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any
              personally identifiable information. The purpose of the information is for analyzing trends, administering
              the site, tracking users' movement on the website, and gathering demographic information.
            </p>
          </section>

          <section className="space-y-3 p-6 rounded-xl bg-[var(--bg-elevated)] border border-[var(--neon-cyan)]/20">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--neon-cyan)]" />
              3. Google AdSense & DoubleClick DART Cookies
            </h2>
            <p>
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads
              to our site visitors based upon their visit to our site and other sites on the internet.
            </p>
            <p>
              Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy
              Policy at the following URL:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--neon-cyan)] underline break-all"
              >
                https://policies.google.com/technologies/ads
              </a>
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Some of our advertising partners may use cookies and web beacons on our site. Each of our advertising partners
              has their own Privacy Policy for their policies on user data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">4. Cookies and Web Beacons</h2>
            <p>
              Like any other website, Productivity Calculator uses "cookies". These cookies are used to store information
              including visitors' preferences (such as your chosen calculation target percentages or preferred language
              settings), and the pages on the website that the visitor accessed or visited. The information is used to
              optimize the users' experience by customizing our web page content based on visitors' browser type and/or
              other information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">
              5. CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p>Under the CCPA, among other rights, California consumers have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Request that a business disclose the categories and specific pieces of personal data collected.</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
            </ul>
            <p>
              We do not sell personal data. If you make a request, we have one month to respond to you. If you would like
              to exercise any of these rights, please contact us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">
              6. GDPR Data Protection Rights
            </h2>
            <p>
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled
              to the following:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The right to access – You have the right to request copies of your personal data.</li>
              <li>The right to rectification – You have the right to request correction of inaccurate information.</li>
              <li>The right to erasure – You have the right to request that we erase your personal data.</li>
              <li>The right to restrict processing – You have the right to request restriction of processing.</li>
              <li>The right to object to processing – You have the right to object to our processing of your data.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">7. Children's Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage
              parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              Productivity Calculator does not knowingly collect any Personal Identifiable Information from children under
              the age of 13.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[var(--border)]">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white">8. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:{" "}
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
