/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 logisticsFaqs
 * [POS]: src/lib/schemas/faqs/logistics.ts 仓储物流垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const logisticsFaqs: FAQItem[] = [
    {
        question: "What is a good warehouse picking UPH benchmark?",
        answer: "In standard ecommerce small-parcel fulfillment, a competitive target pick velocity ranges between 120 and 150 units per hour (UPH) for manual cart piece-picking, and 200+ UPH for goods-to-person automated shuttle systems. For heavy pallet and case-picking in 3PL industrial warehouses, benchmarks typically range from 60 to 90 UPH due to forklift transit and safety protocols.",
    },
    {
        question: "How do you calculate warehouse logistics productivity?",
        answer: "Warehouse logistics productivity is calculated by dividing total output volume (units picked, orders packed, or cartons loaded) by total direct labor hours consumed during the shift: UPH = Total Units Picked ÷ Direct Labor Hours. Economic productivity is evaluated by dividing total loaded payroll by completed shipments to obtain unit labor cost.",
    },
    {
        question: "What is the difference between warehouse productivity and fulfillment efficiency?",
        answer: "Warehouse productivity measures operational output rate per resource unit (e.g., units per man-hour UPH or parcels per driver shift). Fulfillment efficiency is a broader measure that includes process quality, order accuracy percentage (e.g., 99.8% perfect order rate), dock-to-stock latency, and SLA compliance within customer delivery promises.",
    },
    {
        question: "How does dock-to-stock time affect overall order cycle time?",
        answer: "Dock-to-stock latency measures the time elapsed from when an inbound shipment arrives at the receiving dock to when goods are scanned and available in inventory bins for picking. If dock-to-stock exceeds 4 hours, inventory replenishment bottlenecks cause stockouts on active pick lines, forcing pickers to wait and drastically reducing overall order cycle velocity.",
    },
    {
        question: "What is the standard cost per order (CPO) in 3PL fulfillment?",
        answer: "Standard warehouse handling cost per order (excluding carrier postage) ranges between $2.50 and $4.80 for standard B2C parcels containing 1 to 3 items. Operations with advanced cartonization, automated sortation, and high UPH rates can lower handling costs below $2.00 per order, while fragile, serialized, or cold-chain goods often exceed $6.00 per order.",
    },
    {
        question: "How does wave picking improve warehouse units per hour?",
        answer: "Wave picking groups orders by common criteria—such as shipping carrier cutoff, delivery zone, or shared SKU location—into scheduled execution waves. Instead of individual pickers traversing the entire warehouse for isolated orders, associates pick high-density SKU batches along optimized routes, reducing travel time by up to 40% and elevating UPH.",
    },
];
