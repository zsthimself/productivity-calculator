/**
 * @INPUT: locale (可选当前语言)
 * @OUTPUT: Footer 全局页脚组件 - 提供关于、联系、隐私协议与行业导航闭环
 * @POS: 布局组件 - 满足 Google AdSense / GDPR 审核硬性指标与全站死链防御
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 components/_META.md。
 */
import Link from "next/link";
import { Locale, DEFAULT_LOCALE, getLocalePath } from "@/lib/i18n";
import { ShieldCheck, Heart, Mail, ExternalLink } from "lucide-react";

interface FooterProps {
  locale?: Locale;
}

export default function Footer({ locale = DEFAULT_LOCALE }: FooterProps) {
  const basePath = getLocalePath(locale);

  return (
    <footer className="mt-28 border-t border-[var(--border)]/40 bg-[var(--bg-surface)]/80 backdrop-blur-md pt-16 pb-12 text-[var(--text-secondary)] font-body text-sm relative z-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href={basePath || "/"}
              className="font-display text-lg font-bold text-gradient inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span>⚡ Productivity Calculator</span>
            </Link>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Free, instantaneous, and privacy-first productivity estimation tools for professionals across 20+ industries. Built to calculate output, shift quotas, and reverse clock-out times without intrusive paywalls.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] pt-1">
              <ShieldCheck className="w-4 h-4 text-[var(--neon-cyan)]" />
              <span>100% Client-Side Calculations. Zero Data Stored.</span>
            </div>
          </div>

          {/* Quick Calculators */}
          <div className="space-y-3">
            <div className="font-display text-xs uppercase tracking-widest text-white font-semibold">
              Popular Tools
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href={`${basePath}/calculator/physical-therapy`}
                  className="hover:text-[var(--neon-cyan)] transition-colors inline-flex items-center gap-1"
                >
                  <span>Physical Therapy Suite</span>
                  <span className="text-[10px] text-[var(--neon-pink)] font-mono font-bold">HOT</span>
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/calculator/construction`} className="hover:text-[var(--neon-cyan)] transition-colors">
                  Construction Calculator
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/calculator/sales`} className="hover:text-[var(--neon-cyan)] transition-colors">
                  Sales Efficiency Tool
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/calculator/software-development`} className="hover:text-[var(--neon-cyan)] transition-colors">
                  Software Engineering
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/calculator/customer-support`} className="hover:text-[var(--neon-cyan)] transition-colors">
                  Customer Support Quota
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <div className="font-display text-xs uppercase tracking-widest text-white font-semibold">
              Trust & Legal
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[var(--neon-cyan)] transition-colors">
                  About Us & Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--neon-cyan)] transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--neon-cyan)] transition-colors">
                  Privacy Policy (GDPR / CCPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--neon-cyan)] transition-colors">
                  Terms of Service & Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="border-t border-[var(--border)]/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Productivity Calculator. All rights reserved. Disclaimer: Calculations are estimates provided for planning purposes only and do not constitute formal legal, clinical, or financial advice.
          </p>
          <div className="flex items-center gap-1 text-[var(--text-muted)] shrink-0">
            <span>Built for human efficiency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
