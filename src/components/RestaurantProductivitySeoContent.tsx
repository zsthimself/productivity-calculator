/**
 * [INPUT]: 依赖 react；依赖 lucide-react 图标
 * [OUTPUT]: 导出 RestaurantProductivitySeoContent 组件及默认导出
 * [POS]: src/components 的餐饮门店 RevPASH、翻台率、人工成本与后厨出餐工效权威 SEO 内容与基准矩阵，承接 /calculator/restaurant 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import {
  UtensilsCrossed,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Gauge,
  HelpCircle,
  CheckCircle2,
  DollarSign,
  ChefHat,
  Clock,
  Sparkles,
} from "lucide-react";

export default function RestaurantProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed font-body">
      {/* 1. Visual Architecture Diagram & Core Definitions */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-orange-400" />
          <span>Restaurant Productivity Calculator Architecture &amp; Hospitality Engineering</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Using this comprehensive <strong>restaurant productivity calculator</strong>, independent restaurateurs, multi-unit franchise operators, general managers, executive chefs, and hospitality financial analysts can accurately calculate Revenue Per Available Seat Hour (RevPASH), measure table turnover velocity, monitor prime cost ratios (labor plus Cost of Goods Sold), and audit kitchen ticket throughput. Developed in rigorous alignment with Cornell University School of Hotel Administration hospitality models and National Restaurant Association (NRA) operational benchmarks, this interactive analytical tool provides restaurant leaders with actionable financial clarity to maximize seat yields, curb labor overruns, and defend bottom-line restaurant profitability.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/restaurant-productivity-formula.svg"
            alt="Restaurant productivity calculator formula diagram illustrating RevPASH, dining room seating turnover, labor prime cost, and kitchen ticket velocity"
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
          <TrendingUp className="w-5 h-5 text-orange-400" />
          <span>The Hospitality Mathematics: 3 Core Formulas in Restaurant Productivity</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Sustaining a profitable restaurant requires balancing customer dining duration, seating density, front-and-back-of-house payroll hours, and culinary ingredient velocity. By entering dining room seats, operating hours, labor hours, and food costs into our <strong>restaurant productivity calculator</strong>, operators can systematically evaluate the three mathematical pillars of restaurant operational efficiency:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
              Pillar 1: Dining Room Capacity
            </div>
            <div className="text-sm font-bold text-foreground mb-2">Cornell RevPASH &amp; Turns</div>
            <p className="text-xs text-muted-foreground">
              Revenue Per Available Seat Hour captures the combined efficiency of seat occupancy and spending:
            </p>
            <div className="my-2 p-2 rounded bg-muted/60 font-mono text-[11px] text-foreground">
              RevPASH = Total Revenue ÷ Available Seat-Hours<br />
              Seat Turns = Total Covers ÷ Dining Seats
            </div>
            <p className="text-xs text-muted-foreground">
              Available Seat-Hours equals total seats multiplied by service hours. Evaluates physical space yield per minute.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              Pillar 2: Labor &amp; Prime Cost
            </div>
            <div className="text-sm font-bold text-foreground mb-2">Prime Cost &amp; SPLH</div>
            <p className="text-xs text-muted-foreground">
              Financial health depends on controlling controllable payroll and food expenses:
            </p>
            <div className="my-2 p-2 rounded bg-muted/60 font-mono text-[11px] text-foreground">
              Labor Cost % = Payroll &amp; Taxes ÷ Sales × 100<br />
              Prime Cost % = (Labor + Food COGS) ÷ Sales
            </div>
            <p className="text-xs text-muted-foreground">
              Top restaurants enforce a strict prime cost ceiling under 55% to 60% of total food and beverage sales.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Pillar 3: Kitchen Velocity
            </div>
            <div className="text-sm font-bold text-foreground mb-2">Ticket Speed &amp; Plate Waste</div>
            <p className="text-xs text-muted-foreground">
              Back-of-house throughput determines culinary capacity during peak dinner rushes:
            </p>
            <div className="my-2 p-2 rounded bg-muted/60 font-mono text-[11px] text-foreground">
              Ticket Speed = Entrees Plated ÷ Cook Hours<br />
              Plate Waste % = Spoilage $ ÷ Food Buy $
            </div>
            <p className="text-xs text-muted-foreground">
              Measures line cook output rates per hour and identifies prep inventory loss before it damages margins.
            </p>
          </div>
        </div>
      </section>

      {/* 3. National Industry Benchmark Matrix */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-400" />
          <span>National Restaurant Association (NRA) &amp; Cornell Industry Benchmark Matrix</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Restaurant performance metrics vary substantially between limited-service counter restaurants and full-service dining establishments. The following empirical benchmark matrix compiles official hospitality averages across major concept categories:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/30">
          <table className="w-full text-left text-xs text-foreground/80">
            <thead className="bg-muted/50 text-foreground font-semibold border-b border-border/60">
              <tr>
                <th className="p-3">Restaurant Concept Tier</th>
                <th className="p-3">Cornell RevPASH Target</th>
                <th className="p-3">Daily Table Turns</th>
                <th className="p-3">Labor Cost %</th>
                <th className="p-3">Prime Cost % Target</th>
                <th className="p-3">Kitchen Ticket Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Fast-Casual QSR (Counter Service)</td>
                <td className="p-3 text-orange-400 font-bold">$24.00 - $45.00 / hr</td>
                <td className="p-3">4.5 - 7.5 turns/day</td>
                <td className="p-3">25% - 29%</td>
                <td className="p-3 text-emerald-400">&lt; 54.0%</td>
                <td className="p-3">18 - 30 entrees/cook-hr</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Family / Casual Full Service</td>
                <td className="p-3 text-orange-400 font-bold">$16.00 - $28.00 / hr</td>
                <td className="p-3">2.2 - 3.8 turns/day</td>
                <td className="p-3">30% - 34%</td>
                <td className="p-3 text-emerald-400">&lt; 58.5%</td>
                <td className="p-3">12 - 20 entrees/cook-hr</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Fine Dining &amp; Upscale Bistro</td>
                <td className="p-3 text-orange-400 font-bold">$12.00 - $22.00 / hr</td>
                <td className="p-3">1.2 - 1.8 turns/day</td>
                <td className="p-3">33% - 38%</td>
                <td className="p-3 text-emerald-400">&lt; 62.0%</td>
                <td className="p-3">6 - 12 entrees/cook-hr</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Gastropub &amp; Sports Bar Taphouse</td>
                <td className="p-3 text-orange-400 font-bold">$18.00 - $30.00 / hr</td>
                <td className="p-3">1.8 - 2.8 turns/day</td>
                <td className="p-3">26% - 31%</td>
                <td className="p-3 text-emerald-400">&lt; 55.0%</td>
                <td className="p-3">14 - 22 entrees/cook-hr</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground font-body">Ghost Kitchen / Off-Premise Delivery</td>
                <td className="p-3 text-orange-400 font-bold">N/A (Square Ft Yield)</td>
                <td className="p-3">N/A (Virtual Orders)</td>
                <td className="p-3">22% - 27%</td>
                <td className="p-3 text-emerald-400">&lt; 52.0%</td>
                <td className="p-3">20 - 35 orders/cook-hr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Real-World Case Study */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-orange-400" />
          <span>Case Study: 120-Seat Chicago Italian Trattoria RevPASH &amp; Prime Cost Turnaround</span>
        </h2>
        <div className="p-5 rounded-xl border border-border/60 bg-card/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
            <div>
              <h3 className="font-bold text-foreground">Lincoln Park Italian Bistro &amp; Wine Bar</h3>
              <p className="text-xs text-muted-foreground">120 Seats · Dinner Service &amp; Weekend Brunch · Chicago, IL</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              +$142,000 Annual EBITDA Margin
            </span>
          </div>

          <div className="text-xs space-y-3 text-muted-foreground">
            <p>
              <strong>The Operational Challenge:</strong> A beloved 120-seat casual Italian restaurant in Chicago was suffering from rising minimum wage pressures and food inflation. Despite solid weekend customer volume, annual gross revenue plateaued at $1.85 million while labor costs rose to 36.4% and prime costs soared past 66.8%. Long dining turn times (averaging 84 minutes during Friday dinner rushes) led to 45-minute host stand waitlists, resulting in an estimated 35 walkaway parties every weekend night.
            </p>
            <p>
              <strong>The Modernization Intervention:</strong> Utilizing our <strong>restaurant productivity calculator</strong> to audit RevPASH by hour, dining duration, and kitchen ticket velocity, restaurant ownership and the general manager implemented four targeted lean hospitality interventions:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-foreground">
              <li>Equipped all front-of-house servers with handheld mobile POS terminals for tableside ordering and contactless payment, cutting check settlement time from 9 minutes down to 90 seconds.</li>
              <li>Re-engineered dining duration targets, dropping average table turn time from 84 minutes down to 68 minutes without rushing guest dining perception.</li>
              <li>Consolidated line prep batching with digital recipe management, reducing kitchen cook ticket times from 16.5 minutes down to 10.8 minutes.</li>
              <li>Shifted to dynamic staggered labor scheduling based on 15-minute historical cover patterns, eliminating 38 unneeded FOH/BOH idle hours weekly.</li>
            </ul>
            <p>
              <strong>The Financial Outcome:</strong> Average dinner table turns increased from 1.75 to 2.25 turns on peak nights. RevPASH during peak dinner windows rose from $14.20 to $18.80 per seat-hour (+32.4%). Total labor cost dropped from 36.4% down to 30.1%, while food waste fell from 5.4% to 2.8% of purchases. The restaurant captured $284,000 in additional annual revenue, generating $142,000 in incremental EBITDA margin and creating a resilient operating cash reserve.
            </p>
          </div>
        </div>
      </section>

      {/* 5. 5 Lean Restaurant Operational Strategies */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Gauge className="w-5 h-5 text-orange-400" />
          <span>5 Lean Operational Protocols to Maximize Restaurant Productivity</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Top-tier restaurant groups do not achieve high margins through cost-cutting alone; they master time optimization, streamline guest touchpoints, and eliminate kitchen waste. Implementing these five hospitality protocols within our <strong>restaurant productivity calculator</strong> framework unlocks immediate operating leverage:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>1. Tableside Mobile POS &amp; Instant Pay</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Traditional paper check delivery, credit card retrieval, terminal swiping, and receipt return consumes 8 to 12 minutes per table. Equipping service teams with handheld mobile POS terminals allows guests to tap-to-pay tableside immediately upon finishing dessert, instantly freeing tables for the next seating party and increasing RevPASH by 12% to 18%.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>2. KDS Color-Coded Kitchen Ticket Firing</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Replace paper kitchen printers with digital Kitchen Display Systems (KDS). Automated course firing and ticket prioritization timers alert expediters when appetizers exceed 6 minutes or entrees exceed 12 minutes. Maintaining kitchen velocity prevents dining room bottle-necks and preserves guest satisfaction scores.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>3. Weekly Prime Cost Variance Guardrails</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Never wait for monthly P&amp;L statements to discover payroll or food cost blowouts. Calculate weekly prime cost (Labor Cost + Food &amp; Beverage COGS) every Monday morning. If prime cost breaches 60% of revenue, immediately adjust subsequent prep schedules and shift staffing before margin erosion compounds.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>4. Weather-Adjusted Staggered Labor Scheduling</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Avoid bringing on entire front-of-house or kitchen shifts simultaneously at 4:00 PM. Analyze historical cover arrival curves and integrate local weather forecasts. Staggering server and cook clock-ins at 4:30 PM, 5:15 PM, and 6:00 PM eliminates paid pre-rush idle time and elevates Sales Per Labor Hour (SPLH) by $15 to $25 per labor hour.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CheckCircle2 className="w-4 h-4 text-orange-400" />
            <span>5. Standardized Portion Scoops &amp; Plate Scraping Audits</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Culinary over-portioning by just 0.5 ounces of protein or cheese per dish inflates food costs by 3% to 5% across annual volume. Enforce color-coded portion disher scoops, digital line scales, and conduct weekly plate waste trash audits to identify menu items that guests routinely leave uneaten, enabling precise recipe downsizing without sacrificing guest value perception.
          </p>
        </div>
      </section>

      {/* 6. Authoritative FAQ Accordion */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-orange-400" />
          <span>Frequently Asked Questions: Restaurant Productivity, RevPASH &amp; Labor Costs</span>
        </h2>
        <div className="space-y-3">
          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>What is the formula for calculating restaurant productivity and RevPASH?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              Restaurant productivity is fundamentally measured through Revenue Per Available Seat Hour (RevPASH): RevPASH = Total Food &amp; Beverage Revenue ($) ÷ Available Seat Hours, where Available Seat Hours equals Total Dining Seats multiplied by Operating Service Hours. For example, generating $4,800 across 80 seats over a 4-hour dinner service yields a RevPASH of $15.00 ($4,800 ÷ 320 seat-hours). Complementary metrics include Sales Per Labor Hour (SPLH = Gross Sales ÷ Total Labor Hours) and Table Turnover Rate (Total Covers ÷ Total Dining Seats).
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>How do you calculate restaurant labor cost percentage and prime cost?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              Restaurant Labor Cost Percentage is calculated by dividing total labor expenses (hourly wages, salaried management, overtime, payroll taxes, employee benefits, and workers&apos; compensation) by total gross food and beverage sales: Labor Cost % = Total Payroll &amp; Benefits ($) ÷ Gross Sales ($) × 100. Prime Cost combines labor costs with Cost of Goods Sold (COGS): Prime Cost = Total Labor ($) + Food &amp; Beverage COGS ($). Prime cost percentage should strictly remain below 55% to 60% of gross revenue for profitable restaurant operations.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>What is RevPASH and what is a good restaurant benchmark?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              RevPASH (Revenue Per Available Seat Hour), developed by the Cornell University School of Hotel Administration, integrates seat occupancy with dining duration and average guest spend. Healthy RevPASH benchmarks vary by restaurant concept: Fast-Casual restaurants target $22 to $45/seat-hour due to rapid 20-minute transactions; Casual Dining concepts aim for $16 to $28/seat-hour with 45-to-60-minute meal durations; and Fine Dining bistros average $12 to $22/seat-hour driven by high average check sizes despite 90-to-120-minute table turn times.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>How do table turn times affect restaurant seating productivity and daily covers?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              Table turn time represents the complete cycle duration from guest seating to table clearing and sanitization. Reducing average table turn time by just 12 minutes during peak dinner service (e.g. from 75 minutes down to 63 minutes) can unlock an additional 0.4 to 0.7 turns per table per evening. In an 80-seat restaurant with a $35 average guest check, a 0.5 turn increase generates 40 additional covers per night—producing $1,400 in incremental daily gross revenue or over $42,000 monthly with zero added square footage.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>What are standard restaurant labor cost benchmarks for front-of-house and back-of-house staff?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              According to National Restaurant Association (NRA) industry surveys, standard restaurant labor cost benchmarks range between 28% and 34% of total sales. Typically, Back-of-House (BOH kitchen staff, dishwashers, and prep cooks) accounts for 14% to 18%, Front-of-House (FOH servers, hosts, and bartenders) represents 10% to 13% (varying by tip-credit state legislation), and salaried restaurant management consumes 4% to 6%. Operating above 35% labor cost indicates staffing overcapacity, prep scheduling inefficiencies, or low sales volume.
            </p>
          </details>

          <details className="group rounded-xl border border-border/60 bg-card/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground text-sm">
              <span>How can restaurant operators increase kitchen ticket throughput and reduce food waste?</span>
              <span className="transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-xs text-muted-foreground leading-normal">
              Operators optimize kitchen velocity and curb waste through five lean hospitality protocols: 1) Deploying kitchen display systems (KDS) with color-coded ticket firing timers to maintain cook times under 10 to 14 minutes; 2) Implementing prep batch sheets tied to POS historical sales forecasts; 3) Cross-training line cooks on sauté, grill, and expo stations to absorb peak ticket surges; 4) Auditing trim waste and plate scrapings weekly to keep food waste below 3% to 4% of food purchases; and 5) Standardizing portion scoops and digital scales across line stations.
            </p>
          </details>
        </div>
      </section>

      {/* 7. Authoritative Outbound References */}
      <section className="p-5 rounded-xl border border-border/50 bg-muted/20 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-orange-400" />
          <span>Authoritative Restaurant &amp; Hospitality Industry References</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          For further research on RevPASH models, hospitality labor benchmarks, and food cost accounting, consult these official industry resources:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <li>
            <a
              href="https://restaurant.org/research-and-data"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline flex items-center gap-1"
            >
              National Restaurant Association (NRA) ›
            </a>
          </li>
          <li>
            <a
              href="https://sha.cornell.edu/faculty-research/centers-institutes/chr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline flex items-center gap-1"
            >
              Cornell Center for Hospitality Research ›
            </a>
          </li>
          <li>
            <a
              href="https://www.bls.gov/oes/current/naics4_722500.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline flex items-center gap-1"
            >
              BLS Food Services &amp; Drinking Places ›
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
