/**
 * @INPUT: industries.json (静态数据) - 获取 "general" 通用行业配置
 * @OUTPUT: HomePage React 组件 - 生产力计算器首页
 * @POS: 路由入口 - 网站首页，展示通用版计算器和行业列表
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 app/_META.md。
 */
import { Metadata } from "next";
import Calculator from "@/components/Calculator";
import IndustryList from "@/components/IndustryList";
import industries from "@/data/industries.json";
import { IndustryData } from "@/types/industry";

const industryData = industries as IndustryData[];
const generalIndustry = industryData.find((i) => i.slug === "general")!;

const BASE_URL = "https://productivitycalculator.work";

export const metadata: Metadata = {
  title: "Productivity Calculator | Free Online Tool for Any Industry",
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
    title: "Productivity Calculator | Free Online Tool for Any Industry",
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
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Scan line effect */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-[200px] animate-[scan-line_8s_linear_infinite]"></div>
      </div>

      <div className="relative z-10 py-16 md:py-24 px-4">
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
                    <span><strong className="text-white">Identify inefficiencies:</strong> Find where time or resources are being wasted</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--neon-pink)]">→</span>
                    <span><strong className="text-white">Set goals:</strong> Establish benchmarks to improve over time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--neon-purple)]">→</span>
                    <span><strong className="text-white">Compare performance:</strong> Track teams, projects, or individuals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--neon-blue)]">→</span>
                    <span><strong className="text-white">Make decisions:</strong> Use data to allocate resources effectively</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Internal Links to Industry Calculators */}
          <IndustryList />

          {/* Footer */}
          <footer className="mt-24 text-center text-[var(--text-muted)] text-sm font-body">
            <p>© 2026 Productivity Calculator. Built for efficiency.</p>
          </footer>
        </div>
      </div>

      {/* Background Orbs */}
      <div className="fixed -z-10 top-0 left-1/4 w-[600px] h-[600px] bg-[var(--neon-purple)] rounded-full blur-[200px] opacity-10"></div>
      <div className="fixed -z-10 bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--neon-cyan)] rounded-full blur-[200px] opacity-10"></div>
      <div className="fixed -z-10 top-1/2 right-0 w-[400px] h-[400px] bg-[var(--neon-pink)] rounded-full blur-[200px] opacity-5"></div>
    </main>
  );
}
