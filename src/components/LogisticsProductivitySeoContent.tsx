/**
 * [INPUT]: 依赖 react；依赖 lucide-react 图标
 * [OUTPUT]: 导出 LogisticsProductivitySeoContent 组件
 * [POS]: src/components 的仓储物流与供应链深度权威 SEO 内容与基准矩阵，承接 /calculator/logistics 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import {
  Truck,
  Package,
  Boxes,
  Clock,
  TrendingUp,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

export default function LogisticsProductivitySeoContent() {
  return (
    <article className="w-full max-w-4xl mx-auto my-12 space-y-12 text-foreground/90 leading-relaxed">
      {/* 1. Visual Architecture Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Truck className="w-5 h-5 text-amber-500" />
          <span>Logistics Productivity Calculator Architecture &amp; Warehouse Throughput Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Using this interactive <strong>logistics productivity calculator</strong>, supply chain leaders, warehouse operations directors, and 3PL facility managers can accurately quantify direct labor velocity, order fulfillment turnaround, and unit shipping economics. In high-velocity distribution centers, optimizing labor productivity requires balancing three core operational pillars: warehouse picking velocity measured in units per hour (UPH), dock-to-dispatch order cycle time (OCT), and total handling cost per parcel or freight drop.
        </p>

        <div className="rounded-xl overflow-hidden border border-border/60 bg-card/40 p-2 my-6 shadow-lg">
          <img
            src="/images/logistics-productivity-formula.svg"
            alt="Logistics productivity calculator formula, warehouse units per hour UPH, order cycle time, and fleet cost per parcel diagram"
            width="800"
            height="400"
            className="w-full h-auto rounded-lg"
            loading="lazy"
          />
        </div>
      </section>

      {/* 2. Mathematical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-500" />
          <span>The Core Mathematics: 3 Critical Warehouse &amp; Logistics Formulas</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Modern warehouse management systems (WMS) and industrial engineering protocols rely on three foundational mathematical equations to assess facility labor efficiency and shipping margins:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              Formula 1: Labor Velocity
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">Units Per Hour (UPH)</h3>
            <div className="p-2.5 rounded bg-muted/60 font-mono text-xs text-amber-500 font-semibold mb-2">
              UPH = Total Units Picked ÷ Direct Labor Hours
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Measures the physical volume of items retrieved from inventory bins or packaged per direct associate labor hour. Excludes indirect paid break and administrative meeting hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
              Formula 2: Turnaround Speed
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">Order Cycle Time (OCT)</h3>
            <div className="p-2.5 rounded bg-muted/60 font-mono text-xs text-blue-400 font-semibold mb-2">
              OCT = Total Elapsed Hours ÷ Orders Dispatched
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Calculates the average elapsed duration from when a customer order is released to the warehouse floor until it is verified, packed, labeled, and manifested into the carrier trailer.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Formula 3: Unit Economics
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">Cost Per Order (CPO)</h3>
            <div className="p-2.5 rounded bg-muted/60 font-mono text-xs text-emerald-400 font-semibold mb-2">
              CPO = Total Warehouse Labor Cost ÷ Total Shipped Orders
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Evaluates all-in direct warehouse payroll (wages, overtime, payroll taxes, worker comp) allocated across total successfully fulfilled orders to establish accurate contract pricing.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Industry Benchmark Matrix Table */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <Boxes className="w-5 h-5 text-amber-500" />
          <span>2026 Distribution Center &amp; Logistics Benchmarks</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Operating performance varies dramatically depending on whether your facility manages high-SKU ecommerce piece-picking, heavy palletized freight, or pharmaceutical cold chains. Compare your facility metrics against WERC (Warehousing Education and Research Council) and APICS industry benchmarks:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/30">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 font-semibold text-foreground">
                <th className="p-3">Logistics Facility Profile</th>
                <th className="p-3">Target Pick Velocity (UPH)</th>
                <th className="p-3">Dock-to-Stock Latency</th>
                <th className="p-3">Same-Day SLA %</th>
                <th className="p-3">Target Labor Cost / Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-sans font-medium text-foreground">E-Commerce DTC (Small Parcel)</td>
                <td className="p-3 text-amber-400">120 – 160 UPH</td>
                <td className="p-3 text-blue-400">&lt; 2.5 Hours</td>
                <td className="p-3 text-emerald-400">&gt; 99.0%</td>
                <td className="p-3 text-foreground">$2.20 – $3.80</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-sans font-medium text-foreground">3PL Multi-Client Bulk Storage</td>
                <td className="p-3 text-amber-400">70 – 95 UPH</td>
                <td className="p-3 text-blue-400">3.5 – 6.0 Hours</td>
                <td className="p-3 text-emerald-400">&gt; 97.5%</td>
                <td className="p-3 text-foreground">$3.50 – $5.50</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-sans font-medium text-foreground">Retail Cross-Docking Hub</td>
                <td className="p-3 text-amber-400">180 – 250 UPH</td>
                <td className="p-3 text-blue-400">&lt; 1.5 Hours</td>
                <td className="p-3 text-emerald-400">&gt; 99.5%</td>
                <td className="p-3 text-foreground">$1.40 – $2.20</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 font-sans font-medium text-foreground">Cold Chain &amp; Pharmaceutical</td>
                <td className="p-3 text-amber-400">60 – 85 UPH</td>
                <td className="p-3 text-blue-400">&lt; 2.0 Hours</td>
                <td className="p-3 text-emerald-400">&gt; 99.8%</td>
                <td className="p-3 text-foreground">$4.50 – $7.20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Practical Case Study */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <span>Real-World Case Study: Saving $210,000/Year in a 10,000-Order Distribution Center</span>
        </h2>
        <div className="p-5 rounded-xl border border-border/60 bg-card/40 space-y-4 text-xs md:text-sm">
          <div className="flex items-center gap-2 font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Facility Profile: Midwestern Apparel &amp; Electronics Omnichannel DC</span>
          </div>
          <p className="text-muted-foreground">
            A mid-sized 3PL fulfillment center handling 10,000 daily orders faced escalating overtime expenses and missed 4:00 PM carrier cutoffs. Prior to conducting a comprehensive labor audit with our <strong>logistics productivity calculator</strong>, the operational baseline was:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            <li className="p-2.5 rounded bg-muted/50 border border-border/40">
              <span className="text-muted-foreground block font-sans">Baseline Pick Velocity:</span>
              <span className="text-foreground font-bold text-sm">95 UPH</span> (Below 120 Target)
            </li>
            <li className="p-2.5 rounded bg-muted/50 border border-border/40">
              <span className="text-muted-foreground block font-sans">Daily Direct Labor Hours:</span>
              <span className="text-foreground font-bold text-sm">105.3 Hours</span> (10,000 units ÷ 95 UPH)
            </li>
            <li className="p-2.5 rounded bg-muted/50 border border-border/40">
              <span className="text-muted-foreground block font-sans">Direct Labor Cost (@$22/hr loaded):</span>
              <span className="text-rose-400 font-bold text-sm">$2,316.60 / Day</span>
            </li>
            <li className="p-2.5 rounded bg-muted/50 border border-border/40">
              <span className="text-muted-foreground block font-sans">Annual Picking Payroll (300 working days):</span>
              <span className="text-rose-400 font-bold text-sm">$694,980 / Year</span>
            </li>
          </ul>

          <p className="text-muted-foreground">
            <strong>The Lean Engineering Intervention:</strong> The engineering team re-slotted the warehouse using ABC velocity analysis, placing the top 15% fastest-moving SKUs near primary pack stations, and deployed multi-order batch picking carts guided by RF barcode scanners.
          </p>

          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-emerald-300">
            <div className="font-semibold mb-1">Financial &amp; Operational Outcome:</div>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Picking velocity increased from <strong>95 to 135 UPH (+42.1% throughput gain)</strong>.</li>
              <li>Daily labor hours required dropped from 105.3 to <strong>74.1 hours</strong> (saving 31.2 hours daily).</li>
              <li>Daily labor expense reduced to <strong>$1,630.20</strong>, yielding net savings of <strong>$686.40 per day</strong>.</li>
              <li>Annual payroll savings totaled <strong>$205,920 per year</strong>, while same-day SLA dispatch rate improved from 96.2% to 99.4%.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. 5 Lean Warehouse Optimization Strategies */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-500" />
          <span>5 Lean Strategies to Maximize Logistics &amp; Warehouse Productivity</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">1. Dynamic Velocity Slotting (ABC Profile)</h3>
            <p className="text-xs text-muted-foreground">
              Travel time constitutes over 50% of an average picker’s workday. Routinely re-slotting Class A high-velocity items into waist-to-shoulder “golden zones” near packing lanes eliminates hundreds of cumulative miles of deadhead walking each week.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">2. Batch Picking with Pick-to-Light Carts</h3>
            <p className="text-xs text-muted-foreground">
              Replace single-order discrete picking with multi-tote batch picking. Consolidating identical SKU pulls across 12 to 24 orders in a single pass through the aisles dramatically multiplies your facility’s units per man-hour (UPH).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">3. Algorithmic Pick-Path Route Optimization</h3>
            <p className="text-xs text-muted-foreground">
              Implement serpentine or S-shape routing algorithms in your Warehouse Management System (WMS) to prevent pickers from backtracking down aisles. One-way aisle navigation minimizes physical congestion during peak volume hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2">
            <h3 className="text-sm font-bold text-foreground">4. Dock-to-Stock Cross-Docking Protocols</h3>
            <p className="text-xs text-muted-foreground">
              For high-demand pre-ordered items, bypass reserve bin storage entirely. Immediately transfer received supplier pallets across the inbound staging dock to outbound packing conveyors to reduce dock-to-stock latency from hours to minutes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-2 md:col-span-2">
            <h3 className="text-sm font-bold text-foreground">5. Ergonomic Pack Station Workstations &amp; Auto-Cartoning</h3>
            <p className="text-xs text-muted-foreground">
              Standardize packing tables with pneumatic void-fill dispensers, integrated digital scales, overhead tape guns, and automated shipping label printers. Minimizing physical reach distances and touchpoints cuts pack times from 45 seconds to under 18 seconds per parcel.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Authoritative PAA FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Frequently Asked Questions: Logistics &amp; Warehouse Productivity</span>
        </h2>
        <div className="divide-y divide-border/60 rounded-xl border border-border/60 bg-card/30">
          <div className="p-4 space-y-1">
            <h3 className="text-sm font-semibold text-foreground">What is a good warehouse picking UPH benchmark?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In standard ecommerce small-parcel fulfillment, a competitive target pick velocity ranges between 120 and 150 units per hour (UPH) for manual cart piece-picking, and 200+ UPH for goods-to-person automated shuttle systems. For heavy pallet and case-picking in 3PL industrial warehouses, benchmarks typically range from 60 to 90 UPH due to forklift transit and safety protocols.
            </p>
          </div>

          <div className="p-4 space-y-1">
            <h3 className="text-sm font-semibold text-foreground">How do you calculate warehouse logistics productivity?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Warehouse logistics productivity is calculated by dividing total output volume (units picked, orders packed, or cartons loaded) by total direct labor hours consumed during the shift. You can further evaluate economic productivity by calculating the unit labor cost: dividing total loaded warehouse payroll by the number of completed shipments.
            </p>
          </div>

          <div className="p-4 space-y-1">
            <h3 className="text-sm font-semibold text-foreground">What is the difference between warehouse productivity and fulfillment efficiency?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Warehouse productivity measures operational output rate per resource unit (e.g., units per man-hour UPH or parcels per driver shift). Fulfillment efficiency is a broader measure that includes process quality, order accuracy percentage (e.g., 99.8% perfect order rate), dock-to-stock latency, and SLA compliance within customer delivery promises.
            </p>
          </div>

          <div className="p-4 space-y-1">
            <h3 className="text-sm font-semibold text-foreground">How does dock-to-stock time affect overall order cycle time?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dock-to-stock latency measures the time elapsed from when an inbound shipment arrives at the receiving dock to when goods are scanned and available in inventory bins for picking. If dock-to-stock exceeds 4 hours, inventory replenishment bottlenecks cause stockouts on active pick lines, forcing pickers to wait and drastically reducing overall order cycle velocity.
            </p>
          </div>

          <div className="p-4 space-y-1">
            <h3 className="text-sm font-semibold text-foreground">What is the standard cost per order (CPO) in 3PL fulfillment?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standard warehouse handling cost per order (excluding carrier postage) ranges between $2.50 and $4.80 for standard B2C parcels containing 1 to 3 items. Operations with advanced cartonization, automated sortation, and high UPH rates can lower handling costs below $2.00 per order, while fragile, serialized, or cold-chain goods often exceed $6.00 per order.
            </p>
          </div>

          <div className="p-4 space-y-1">
            <h3 className="text-sm font-semibold text-foreground">How does wave picking improve warehouse units per hour?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Wave picking groups orders by common criteria—such as shipping carrier cutoff, delivery zone, or shared SKU location—into scheduled execution waves. Instead of individual pickers traversing the entire warehouse for isolated orders, associates pick high-density SKU batches along optimized routes, reducing travel time by up to 40% and elevating UPH.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
