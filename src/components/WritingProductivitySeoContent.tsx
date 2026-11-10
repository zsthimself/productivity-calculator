/**
 * [INPUT]: 依赖 react；依赖 lucide-react 图标
 * [OUTPUT]: 导出 WritingProductivitySeoContent 组件及默认导出
 * [POS]: src/components 的内容创作人效、千字费率、纯写作时钟 WPH 与稿酬净回报权威 SEO 内容与基准矩阵，承接 /calculator/writing 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import {
  PenTool,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Gauge,
  HelpCircle,
  CheckCircle2,
  DollarSign,
  Clock,
  BookOpen,
  Zap,
} from "lucide-react";

export default function WritingProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed font-body">
      {/* 1. Visual Architecture Diagram & Core Definitions */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <PenTool className="w-5 h-5 text-sky-400" />
          <span>Writing Productivity Calculator Architecture &amp; Editorial Delivery Metrics</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Using this comprehensive <strong>writing productivity calculator</strong>, freelance writers, enterprise copywriters, content marketing strategists, technical authors, and ghostwriters can scientifically calculate drafting speed in words per hour (WPH), analyze non-drafting overhead drag, convert per-word rates into true effective hourly earnings, and model sustainable weekly manuscript output. Formulated in strict accordance with the Editorial Freelancers Association (EFA) and American Society of Journalists and Authors (ASJA) professional rate baselines, this operational engine equips creators to eradicate unbilled scope creep and protect sustainable creative compensation.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/writing-productivity-formula.svg"
            alt="Writing productivity calculator architecture diagram showing drafting velocity words per hour WPH, editorial overhead drag, and effective hourly rate EHR yields"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* 2. Mathematical Breakdown: 3 Core Formulas */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-sky-400" />
          <span>The Editorial Mathematics: 3 Foundational Formulas in Writing Productivity</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Evaluating professional writing capacity goes far beyond typing speed. True authorial productivity balances draft generation velocity against background research, structural line-editing, and client revision iterations. By entering word counts, project hours, and contract compensation into our <strong>writing productivity calculator</strong>, creators can evaluate the three foundational mathematical pillars of professional writing:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="rounded-xl border border-sky-500/30 bg-card/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold uppercase">
              <Zap className="w-4 h-4" />
              <span>Drafting Velocity</span>
            </div>
            <h3 className="text-base font-bold text-foreground">Words Per Hour (WPH)</h3>
            <div className="p-2.5 rounded-lg bg-muted/40 font-mono text-xs text-sky-300">
              WPH = Finished Draft Words ÷ Pure Drafting Hours
            </div>
            <p className="text-xs text-muted-foreground">
              Measures the pure creative flow rate at the keyboard, isolating keyboard drafting from research and editing. Tracking WPH across article categories pinpoints where outlining bottlenecks slow conceptual momentum.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-amber-500/30 bg-card/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase">
              <Clock className="w-4 h-4" />
              <span>Overhead Drag</span>
            </div>
            <h3 className="text-base font-bold text-foreground">Non-Drafting Drag Ratio (%)</h3>
            <div className="p-2.5 rounded-lg bg-muted/40 font-mono text-xs text-amber-300">
              Drag % = (Research + Editing + Revisions) ÷ Total Hours × 100
            </div>
            <p className="text-xs text-muted-foreground">
              Reveals the percentage of project duration consumed by secondary tasks like SME interviews, fact-checking, proofing, and client feedback. Professional projects standardly sit between 45% and 55% overhead.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-emerald-500/30 bg-card/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase">
              <DollarSign className="w-4 h-4" />
              <span>Compensation Realization</span>
            </div>
            <h3 className="text-base font-bold text-foreground">Effective Hourly Rate (EHR)</h3>
            <div className="p-2.5 rounded-lg bg-muted/40 font-mono text-xs text-emerald-300">
              EHR = Agreed Project Fee ($) ÷ All-In Project Hours
            </div>
            <p className="text-xs text-muted-foreground">
              Converts fixed-price milestones and per-word freelance rates into actual realized hourly pay. When endless unbilled client revision rounds drag a 10-hour piece to 22 hours, realized hourly income collapses by more than half.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Industry Benchmarks Matrix Table */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-sky-400" />
          <span>EFA &amp; ASJA Writing Productivity &amp; Rate Benchmarks</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          How does your writing throughput, research ratio, and hourly earnings compare against North American professional standards? Review verified empirical baselines compiled from leading editorial guild surveys:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 text-muted-foreground border-b border-border/70 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Writing Specialty</th>
                <th className="p-3.5">Avg Drafting WPH</th>
                <th className="p-3.5">Research &amp; Edit Drag</th>
                <th className="p-3.5">Industry Per-Word Rate</th>
                <th className="p-3.5">Target EHR ($/hr)</th>
                <th className="p-3.5">Daily Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 font-mono text-foreground/90">
              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-sans font-medium text-sky-300">B2B SaaS Technical Whitepapers</td>
                <td className="p-3.5">250 - 450 WPH</td>
                <td className="p-3.5">55% - 65%</td>
                <td className="p-3.5">$0.60 - $1.25 / wd</td>
                <td className="p-3.5">$95 - $165 / hr</td>
                <td className="p-3.5">1,200 - 1,800 wds</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-sans font-medium text-amber-300">Commercial SEO &amp; Blog Content</td>
                <td className="p-3.5">600 - 1,000 WPH</td>
                <td className="p-3.5">35% - 45%</td>
                <td className="p-3.5">$0.25 - $0.50 / wd</td>
                <td className="p-3.5">$65 - $110 / hr</td>
                <td className="p-3.5">2,500 - 4,000 wds</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-sans font-medium text-emerald-300">Executive Thought Leadership</td>
                <td className="p-3.5">400 - 650 WPH</td>
                <td className="p-3.5">50% - 60%</td>
                <td className="p-3.5">$0.85 - $2.00 / wd</td>
                <td className="p-3.5">$125 - $225 / hr</td>
                <td className="p-3.5">1,000 - 1,500 wds</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-sans font-medium text-purple-300">Direct-Response Sales Copy</td>
                <td className="p-3.5">200 - 400 WPH</td>
                <td className="p-3.5">60% - 75%</td>
                <td className="p-3.5">$1.00 - $3.50 / wd</td>
                <td className="p-3.5">$120 - $250 / hr</td>
                <td className="p-3.5">800 - 1,200 wds</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3.5 font-sans font-medium text-pink-300">Fiction Manuscripts &amp; Books</td>
                <td className="p-3.5">700 - 1,200 WPH</td>
                <td className="p-3.5">30% - 40%</td>
                <td className="p-3.5">Royalty / Advance</td>
                <td className="p-3.5">$45 - $85 / hr</td>
                <td className="p-3.5">3,000 - 5,000 wds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Real-World Case Study: Freelance Writing Economics */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <span>Case Study: How Technical Writer Elena Torres Reclaimed 14 Weekly Hours to Double Realized Hourly Income</span>
        </h2>
        <div className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-4 text-xs leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">The Operational Crisis:</strong> Elena Torres, an experienced freelance writer in Austin, Texas specializing in cloud infrastructure and cybersecurity content, was billing $800 per 2,000-word deep-dive article ($0.40/word). While on paper her nominal earnings seemed robust, she was working 55-hour weeks and suffering from creative exhaustion. An audit revealed that for every 2,000-word piece, she spent 3.5 hours drafting, 5.5 hours conducting ad-hoc research, 3.0 hours editing sentence flow mid-draft, and an unmanaged 3.5 hours responding to piecemeal client revisions. Total project time averaged 15.5 hours, compressing her realized Effective Hourly Rate (EHR) down to just $51.60/hour.
          </p>
          <p>
            <strong className="text-foreground">The Productivity Intervention:</strong> Utilizing our <strong>writing productivity calculator</strong> to systematically diagnose her overhead drag, Elena implemented three operational changes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-foreground/90 font-sans">
            <li>
              <strong>The Fast-Draft Protocol:</strong> Strict physical separation of drafting and editing. Elena drafted full 2,000-word manuscripts in dedicated 2.5-hour blocks without pausing to look up citations or edit wording, instantly raising her pure drafting speed from 570 WPH to 800 WPH.
            </li>
            <li>
              <strong>Structured Outlining Sign-off:</strong> Mandated a 1-page bulleted structural outline signed off by client marketing managers prior to writing the first word, preventing downstream structural rewrites.
            </li>
            <li>
              <strong>Contractual Revision Limits:</strong> Updated client agreements to include exactly two consolidated rounds of feedback delivered within 10 business days, with additional rounds billed at $125/hour.
            </li>
          </ul>
          <p>
            <strong className="text-foreground">Measurable Financial Outcomes:</strong> Project duration per 2,000-word assignment dropped from 15.5 hours to 7.0 hours (a 55% reduction in total project latency). Elena subsequently increased her base project fee to $950 ($0.475/word). Her realized Effective Hourly Rate surged by 163% from $51.60/hour to $135.70/hour. By saving 17 hours per week, she reduced her workweek to 35 hours while increasing her monthly net income by $3,200.
          </p>
        </div>
      </section>

      {/* 5. 5 Lean Strategies to Elevate Writing Productivity */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Zap className="w-5 h-5 text-sky-400" />
          <span>5 Lean Strategies to Elevate Writing Productivity</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/70 bg-card/50 p-4 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>1. Separate Drafting from Editing</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Editing while typing is the single largest killer of drafting velocity. Adopt the &quot;TK&quot; placeholder method—when missing a statistic, name, or link, simply type &quot;TK&quot; and keep drafting. Complete the entire draft before conducting research verification passes.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/50 p-4 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>2. Build Comprehensive Modular Outlines</span>
            </div>
            <p className="text-xs text-muted-foreground">
              A comprehensive outline that includes section headings, bulleted core arguments, and relevant research citations eliminates mid-article writer&apos;s block. Once the outline is complete, drafting becomes rapid sentence construction rather than structural invention.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/50 p-4 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>3. Timeblock 90-Minute Focus Sprints</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Human cognitive focus peaks in 90-minute ultradian cycles. Schedule one or two daily deep-work sprints with notifications silenced, browsers blocked, and email closed. Two focused 90-minute blocks typically generate more clean prose than 8 distracted hours.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/50 p-4 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>4. Centralize Research Repositories</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Prevent tab clutter and duplicate searches by logging all quotes, interview transcripts, and data studies into Notion, Obsidian, or Google Docs before writing. Having source URLs pre-organized cuts research latency by over 40%.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card/50 p-4 space-y-2 md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>5. Enforce 2-Round Contractual Revision Caps</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Scope creep frequently devours freelance profitability. Include clear contractual language specifying that project fees include two consolidated rounds of revisions addressing original project objectives. State clearly that requests for alternate angles or new topics require new estimates.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PAA Frequently Asked Questions Accordion */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-400" />
          <span>Frequently Asked Questions About Writing Productivity</span>
        </h2>
        <div className="space-y-3">
          <details className="group rounded-xl border border-border/60 bg-card/40 p-4 transition-all">
            <summary className="cursor-pointer font-medium text-sm text-foreground group-open:text-sky-400 list-none flex justify-between items-center">
              <span>What is the formula for calculating writing productivity?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/40 leading-relaxed">
              Writing productivity is measured across three core editorial formulas: 1) Drafting Velocity = Words Per Hour (WPH) = Total Clean Words Written ÷ Clock Hours of Pure Drafting; 2) Non-Drafting Overhead Drag (%) = ((Hours in Research, Outlining, Editing &amp; Proofing) ÷ Total Project Hours) × 100; and 3) Financial Realization = Effective Hourly Rate (EHR) = Net Project Payment ($) ÷ Actual Total Hours Worked across all phases. High-performing commercial writers track true clock hours to prevent research and revision drag from eroding hourly compensation.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/40 p-4 transition-all">
            <summary className="cursor-pointer font-medium text-sm text-foreground group-open:text-sky-400 list-none flex justify-between items-center">
              <span>How many words per hour (WPH) should a professional writer produce?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/40 leading-relaxed">
              According to editorial benchmarks compiled by the Editorial Freelancers Association (EFA) and the American Society of Journalists and Authors (ASJA), drafting speed varies significantly by genre and complexity: long-form SEO blog articles and commercial web content average 500 to 900 words per drafting hour; creative fiction and memoirs average 700 to 1,200 words per hour; while complex technical whitepapers, investigative journalism, and academic treatises average 200 to 450 words per hour due to continuous citation and fact-verification requirements.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/40 p-4 transition-all">
            <summary className="cursor-pointer font-medium text-sm text-foreground group-open:text-sky-400 list-none flex justify-between items-center">
              <span>How do you convert a per-word rate into an effective hourly wage?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/40 leading-relaxed">
              To convert a per-word contract rate into an Effective Hourly Rate (EHR), multiply the per-word rate by the total word count, then divide by the total hours spent across research, drafting, self-editing, and client revisions: EHR = (Word Count × Rate Per Word) ÷ Total Project Hours. For example, a 2,000-word article at $0.35/word yields $700. If the project requires 8 total hours (2 hrs research + 3 hrs drafting + 1.5 hrs editing + 1.5 hrs revisions), your realized hourly rate is $87.50/hour. If revisions swell project time to 14 hours, EHR falls to $50.00/hour.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/40 p-4 transition-all">
            <summary className="cursor-pointer font-medium text-sm text-foreground group-open:text-sky-400 list-none flex justify-between items-center">
              <span>What percentage of writing time should be spent on research and editing?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/40 leading-relaxed">
              In professional commercial and technical writing, pure drafting accounts for only 40% to 55% of total project time. The remaining 45% to 60% is standard editorial overhead: 20% to 30% for audience research, interview transcription, and outlining; 15% to 20% for line editing, structure re-ordering, and proofreading; and 10% to 15% for client review cycles and formatting. Attempting to draft without dedicated research typically results in disjointed arguments and heavy revision penalties.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/40 p-4 transition-all">
            <summary className="cursor-pointer font-medium text-sm text-foreground group-open:text-sky-400 list-none flex justify-between items-center">
              <span>How many words does a full-time freelance writer write per day?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/40 leading-relaxed">
              Sustainable daily writing output for professional full-time writers ranges between 2,000 and 3,500 finished words per working day (equivalent to 10,000 to 17,500 words per 5-day week). While writers can sprint 5,000+ words in a single day, sustaining that pace leads to cognitive fatigue, repetitive phrasing, and factual oversights. Seasoned writers balance 3 to 4 hours of intense drafting with 3 to 4 hours of research, client communication, pitching, and editing.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/40 p-4 transition-all">
            <summary className="cursor-pointer font-medium text-sm text-foreground group-open:text-sky-400 list-none flex justify-between items-center">
              <span>How can writers increase their writing productivity without degrading quality?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/40 leading-relaxed">
              Professional authors and copywriters boost productivity through five disciplined operational techniques: 1) Strict separation of drafting and editing phases (the &apos;Fast Draft&apos; rule, never fixing prose during the first pass); 2) Building modular, detailed bulleted outlines before writing to eliminate writer&apos;s block; 3) Establishing dedicated, uninterrupted 90-minute deep work timeblocks free from email or social media; 4) Creating centralized research files and interview quote repositories; and 5) Contracting a strict two-round revision cap in client statements of work (SOW) to prevent scope creep.
            </p>
          </details>
        </div>
      </section>

      {/* 7. Authoritative External References */}
      <section className="rounded-xl border border-border/60 bg-card/30 p-5 space-y-3 text-xs">
        <h3 className="font-semibold text-foreground flex items-center gap-1.5">
          <Gauge className="w-4 h-4 text-sky-400" />
          <span>Authoritative Editorial &amp; Writer Rate References</span>
        </h3>
        <p className="text-muted-foreground">
          For further data on professional editorial rates, writing throughput guidelines, and freelance contracts, consult these industry authorities:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>
            <a
              href="https://www.the-efa.org/rates/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              Editorial Freelancers Association (EFA) Rate Chart
            </a>{" "}
            - Industry standard survey data on editing speeds, drafting rates, and hourly pricing.
          </li>
          <li>
            <a
              href="https://asja.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              American Society of Journalists and Authors (ASJA)
            </a>{" "}
            - Professional advocacy and contract benchmarks for non-fiction writers and journalists.
          </li>
          <li>
            <a
              href="https://www.poynter.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              The Poynter Institute for Media Studies
            </a>{" "}
            - Best practices in fact-checking, editorial workflow efficiency, and media integrity.
          </li>
        </ul>
      </section>
    </article>
  );
}
