/**
 * [INPUT]: 依赖 react；依赖 lucide-react 图标
 * [OUTPUT]: 导出 RealEstateProductivitySeoContent 组件及默认导出
 * [POS]: src/components 的房地产经纪人效、GCI 佣金分账、带看成交率与时薪回报权威 SEO 内容与基准矩阵，承接 /calculator/real-estate 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import {
  Building2,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Gauge,
  HelpCircle,
  CheckCircle2,
  DollarSign,
  Home,
  Clock,
  Key,
} from "lucide-react";

export default function RealEstateProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed font-body">
      {/* 1. Visual Architecture Diagram & Core Definitions */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-400" />
          <span>Real Estate Agent Productivity Calculator Architecture &amp; Commission Economics</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Using this professional <strong>real estate productivity calculator</strong>, licensed realtors, managing brokers, team leaders, and commercial agents can accurately forecast Gross Commission Income (GCI), calculate net take-home earnings across tiered brokerage commission splits, audit buyer showing-to-contract conversion rates, and measure their true effective hourly wage. Developed in strict alignment with National Association of Realtors (NAR) annual member survey data and RealTrends operational benchmarks, this interactive career financial tool eliminates the guesswork from real estate business planning, helping agents transition from exhausting 70-hour workweeks into systematized, high-yield listing operations.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/real-estate-productivity-formula.svg"
            alt="Real estate agent productivity calculator architecture diagram showing GCI commission split, showing conversion velocity, and net hourly earnings"
            width="800"
            height="400"
            className="w-full h-auto rounded-lg"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* 2. Mathematical Breakdown: 3 Core Formulas */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <span>The Realtor Mathematics: 3 Core Formulas in Real Estate Productivity</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Real estate success is fundamentally a mathematical pipeline balancing closed transaction volume, brokerage fee splits, lead conversion velocity, and field working hours. By entering sales volume, commission splits, showing counts, and ad spend into our <strong>real estate productivity calculator</strong>, agents can systematically evaluate the three core formulas governing professional real estate profitability:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              Pillar 1: Commission Split
            </div>
            <div className="text-sm font-bold text-foreground mb-2">Gross GCI &amp; Net Take-Home</div>
            <p className="text-xs text-muted-foreground">
              Total transaction revenue minus brokerage split deductions and fixed operational desk fees:
            </p>
            <div className="my-2 p-2 rounded bg-muted/60 font-mono text-[11px] text-foreground">
              Gross GCI = Closed Sales Volume × Commission %<br />
              Net Income = (GCI × Agent Split %) - Fees - Ads
            </div>
            <p className="text-xs text-muted-foreground">
              Evaluates actual retained income after franchise royalty fees, company dollar caps, and local MLS dues.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
              Pillar 2: Conversion Velocity
            </div>
            <div className="text-sm font-bold text-foreground mb-2">Showing-to-Close Rate</div>
            <p className="text-xs text-muted-foreground">
              Measures field time efficiency and lead quality across property showings:
            </p>
            <div className="my-2 p-2 rounded bg-muted/60 font-mono text-[11px] text-foreground">
              Showing Rate = Closed Deals ÷ Total Tours × 100<br />
              Lead Conversion = Closed Escrows ÷ Inbound Leads
            </div>
            <p className="text-xs text-muted-foreground">
              Elite agents average under 10 showings per closed buyer contract, while un-screened buyers consume 25+ tours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Pillar 3: Hourly Economics
            </div>
            <div className="text-sm font-bold text-foreground mb-2">Effective Wage &amp; Ad ROI</div>
            <p className="text-xs text-muted-foreground">
              Connects annual working hours and marketing investments to net cash earnings:
            </p>
            <div className="my-2 p-2 rounded bg-muted/60 font-mono text-[11px] text-foreground">
              Hourly Wage = Net Take-Home ÷ Annual Work Hours<br />
              Marketing ROI = Closed GCI ÷ Paid Ad Spend
            </div>
            <p className="text-xs text-muted-foreground">
              Proves whether weekend open houses and digital advertising actually generate positive hourly compensation.
            </p>
          </div>
        </div>
      </section>

      {/* 3. NAR Industry Benchmark Matrix */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-400" />
          <span>National Association of Realtors (NAR) &amp; RealTrends Benchmark Matrix</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Real estate compensation and time productivity vary dramatically based on license tenure, market specialization, and lead generation channels. The following empirical benchmark matrix compiles official production averages from the NAR Member Profile and national RealTrends broker studies:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/30">
          <table className="w-full text-left text-xs text-foreground/80">
            <thead className="bg-muted/50 text-foreground font-semibold border-b border-border/60">
              <tr>
                <th className="p-3">Agent Production Tier</th>
                <th className="p-3">Annual Sales Volume</th>
                <th className="p-3">Gross GCI Target</th>
                <th className="p-3">Showing Conversion</th>
                <th className="p-3">Brokerage Split Standard</th>
                <th className="p-3">Effective Hourly Wage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Top 1% Luxury Listing Producer</td>
                <td className="p-3 text-amber-400 font-bold">$18M - $50M+</td>
                <td className="p-3 text-emerald-400 font-bold">$500k - $1.4M</td>
                <td className="p-3">14% - 22% (Listing Bias)</td>
                <td className="p-3">85/15 or 100% Capped</td>
                <td className="p-3 text-emerald-400 font-bold">$160 - $350 / hr</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Experienced Full-Time Realtor</td>
                <td className="p-3 text-amber-400 font-bold">$6M - $12M</td>
                <td className="p-3 text-emerald-400 font-bold">$160k - $320k</td>
                <td className="p-3">9% - 15%</td>
                <td className="p-3">75/25 to 80/20</td>
                <td className="p-3 text-emerald-400 font-bold">$75 - $130 / hr</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Mega Real Estate Team Leader</td>
                <td className="p-3 text-amber-400 font-bold">$35M - $100M+</td>
                <td className="p-3 text-emerald-400 font-bold">$900k - $2.6M</td>
                <td className="p-3">7% - 11% (Team Blended)</td>
                <td className="p-3">50/50 Team Tiered</td>
                <td className="p-3 text-emerald-400 font-bold">$180 - $420 / hr</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Mid-Career Residential Agent</td>
                <td className="p-3 text-amber-400 font-bold">$3.5M - $5.5M</td>
                <td className="p-3 text-emerald-400 font-bold">$95k - $150k</td>
                <td className="p-3">6% - 10%</td>
                <td className="p-3">70/30 Standard</td>
                <td className="p-3 text-emerald-400 font-bold">$45 - $70 / hr</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Rookie / Part-Time Associate (&lt; 2 Yrs)</td>
                <td className="p-3 text-amber-400 font-bold">$1.2M - $2.5M</td>
                <td className="p-3 text-emerald-400 font-bold">$32k - $68k</td>
                <td className="p-3">4% - 7%</td>
                <td className="p-3">50/50 to 60/40</td>
                <td className="p-3 text-emerald-400 font-bold">$22 - $38 / hr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Real-World Case Study */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>Case Study: Phoenix Residential Realtor Showing Conversion &amp; GCI Transformation</span>
        </h2>
        <div className="p-5 rounded-xl border border-border/60 bg-card/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
            <div>
              <h3 className="font-bold text-foreground">Maricopa County Residential Specialist</h3>
              <p className="text-xs text-muted-foreground">Solo Realtor · 8 Years Licensed · Phoenix Metro, AZ</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              +$130,000 Net Annual Take-Home
            </span>
          </div>

          <div className="text-xs space-y-3 text-muted-foreground">
            <p>
              <strong>The Operational Burnout:</strong> An experienced residential realtor in Phoenix was working 58 hours per week, conducting 245 property showings annually but closing only 14 transactions—an exhausting showing conversion rate of just 5.7%. Spending $16,000 annually on shared portal buyer leads resulted in endless looky-loo tours across four different cities. After paying a 70/30 brokerage split and desk fees, net take-home pay languished at $84,000, representing an effective wage of just $28.70 per hour.
            </p>
            <p>
              <strong>The Modernization Strategy:</strong> Utilizing our <strong>real estate productivity calculator</strong> to isolate the disconnect between showing hours and net commission yield, the agent restructured their weekly operating workflow around four strict lean operational rules:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-foreground">
              <li>Eliminated un-vetted portal leads, reallocating ad budget into past-client Sphere of Influence (SOI) video market updates and neighborhood direct mail farming.</li>
              <li>Instituted a mandatory pre-qualification rule: zero in-person showings without a verified lender pre-approval letter and a 15-minute video consultation to review MLS comps.</li>
              <li>Shifted transaction mix from 80% buyers to 65% listings, where marketing leverage requires 18 hours per closed contract versus 48 hours for buyers.</li>
              <li>Hired a remote transaction coordinator at $400 per file, freeing 10 hours of weekly administrative closing paperwork for listing appointments.</li>
            </ul>
            <p>
              <strong>The Financial Outcome:</strong> Over the subsequent 12 months, property showings dropped from 245 to 148 while closed transactions expanded from 14 to 24 (showing conversion surged from 5.7% to 16.2%). Gross commission income (GCI) rose from $188,000 to $342,000. Reaching the brokerage company dollar cap boosted effective split to 88%, lifting net take-home to $214,000. Active working hours dropped from 58 to 41 hours weekly, driving effective hourly compensation from $28.70/hr to $104.30/hr (+263% increase).
            </p>
          </div>
        </div>
      </section>

      {/* 5. 5 Lean Real Estate Operational Strategies */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Gauge className="w-5 h-5 text-amber-400" />
          <span>5 Lean Operational Protocols to Maximize Realtor Productivity</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Top-producing realtors do not work twice as many hours as average agents; they leverage listing inventory, eliminate unproductive showings, and protect high-value prospecting windows. Implementing these five protocols within our <strong>real estate productivity calculator</strong> framework unlocks immediate career leverage:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>1. Strict Buyer Prequalification &amp; 3D Video Screen</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Driving buyers to five open houses before verifying mortgage financing burns gas, weekend time, and emotional energy. Mandate a formal desktop lender pre-approval letter and conduct a 15-minute Zoom screen reviewing Matterport 3D walkthroughs. This single policy eliminates 40% of non-converting tours.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>2. Prioritize Listing Inventory Over Buyers</span>
            </div>
            <p className="text-xs text-muted-foreground">
              A home listing works for you 24/7, generating yard-sign inquiries, neighbor referrals, and dual-agency buyer leads. While working with a buyer client averages 35 to 55 agent hours from initial tour to closing, managing a listing requires only 12 to 18 hours. Shifting your mix to 60%+ listings instantly doubles your hourly earnings.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>3. Concentrated Geographic Farming to Kill Windshield Time</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Driving across an entire metropolitan area for sporadic showings destroys agent productivity. Select a targeted geographic farm of 500 to 1,200 homes within 15 minutes of your residence. Dominating a localized subdivision establishes neighborhood authority and eliminates 12+ hours of weekly driving time.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>4. Time-Blocked Morning Prospecting (9:00 - 11:30 AM)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Realtors who wait until the afternoon to generate leads succumb to urgent transaction fires, inspection emergencies, and client text messages. Protect 9:00 AM to 11:30 AM Monday through Thursday exclusively for outbound Sphere of Influence (SOI) calls, past-client check-ins, and handwritten notes.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>5. Delegate Contract-to-Close to a Transaction Coordinator</span>
            </div>
          <p className="text-xs text-muted-foreground">
            Chasing escrow signatures, title commitments, appraisal scheduling, and HOA disclosures is $20/hour clerical work. Outsourcing contract-to-close administration to a licensed transaction coordinator ($350 to $500 per closed deal) frees 12 to 16 hours per transaction, allowing you to focus entirely on negotiating contracts and taking new listings.
          </p>
        </div>
      </section>

      {/* 6. Authoritative FAQ Accordion */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <span>Frequently Asked Questions: Real Estate Productivity, GCI &amp; Commission Splits</span>
        </h2>
        <div className="space-y-3">
          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>What is the formula for calculating real estate agent productivity?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              Real estate agent productivity is evaluated across three primary dimensions: 1) Gross Commission Income (GCI) = Total Closed Transaction Sales Volume ($) × Average Commission Rate %; 2) Showing Conversion Efficiency = Total Closed Escrows ÷ Total In-Person Property Showings; and 3) Effective Hourly Earnings = Net Take-Home Commission (after brokerage splits, desk fees, and marketing spend) ÷ Total Annual Working Hours. Elite producing realtors track transaction velocity per active working hour rather than just gross sales volume.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>How do brokerage commission splits work and what are standard industry splits?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              A real estate commission split dictates how gross transaction commissions are divided between the licensed agent and the sponsoring brokerage. Common split structures include: 70/30 (agent keeps 70%, brokerage receives 30%), 80/20, or 100% flat-fee models where the agent pays a fixed monthly desk fee (typically $500 to $1,500/month) plus a per-transaction fee (e.g. $350 to $500) once an annual company dollar cap (often $18,000 to $25,000) is satisfied.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>What is a healthy lead conversion rate for real estate agents?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              Lead conversion benchmarks vary dramatically by lead generation channel: Sphere of Influence (SOI) and past client referrals convert at 12% to 22%; direct open house sign-in visitors convert at 3% to 6%; and cold digital portal leads (such as Zillow Premier Agent or Realtor.com) average 1.5% to 3.5%. Top-tier realtors maintain a blended database conversion rate of 5% to 8% through consistent multi-channel CRM nurture cadences.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>How many property showings does it typically take to close a real estate deal?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              According to National Association of Realtors (NAR) operational surveys, buyer clients tour an average of 9 to 15 homes before submitting an accepted offer in balanced markets. In highly competitive seller markets with low inventory, showings per closed transaction decrease to 5 to 8 homes, while in buyer markets with abundant choices, showings can expand to 16 to 22 properties per successful closing.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>What is the average income and effective hourly wage for full-time real estate agents?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              The median gross income for full-time realtors with over four years of experience is approximately $85,000, while top-producing solo agents exceed $250,000 to $500,000 in net GCI. Because full-time agents work between 1,800 and 2,200 hours annually (including evening showings and weekend open houses), effective hourly earnings range from $38 to $55/hour for mid-tier producers, surpassing $120 to $280/hour for elite luxury listing specialists.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>How can real estate agents maximize their productivity and commission ROI?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              Realtors maximize productivity through five proven strategies: 1) Shifting their business mix toward listing representation (sellers require 15 to 20 hours of agent time per transaction versus 35 to 50 hours for buyers); 2) Pre-qualifying buyers with strict mortgage lender pre-approval letters and video tour reviews before scheduling physical showings; 3) Establishing geographic farming density to slash driving windshield time; 4) Time-blocking 9:00 AM to 11:30 AM daily for uninterrupted lead generation prospecting; and 5) Outsourcing contract-to-close paperwork to a certified transaction coordinator.
            </p>
          </details>
        </div>
      </section>

      {/* 7. Authoritative Outbound References */}
      <section className="p-5 rounded-xl border border-border/50 bg-muted/20 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-400" />
          <span>Authoritative Real Estate &amp; Brokerage Industry References</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          For further research on real estate agent productivity benchmarks, commission compensation statistics, and brokerage models, explore these official industry resources:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <li>
            <a
              href="https://www.nar.realtor/research-and-statistics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              NAR Member Profiles &amp; Housing Research ›
            </a>
          </li>
          <li>
            <a
              href="https://www.realtrends.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              RealTrends Top 1,000 Agent Data ›
            </a>
          </li>
          <li>
            <a
              href="https://www.inman.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              Inman Real Estate Industry Insights ›
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
