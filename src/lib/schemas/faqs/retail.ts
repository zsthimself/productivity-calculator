/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 retailFaqs
 * [POS]: src/lib/schemas/faqs/retail.ts 零售实体门店与全渠道运营垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const retailFaqs: FAQItem[] = [
    {
        question: "What is the formula for calculating retail store productivity?",
        answer: "Retail store productivity is evaluated through three complementary pillars: 1) Sales Per Labor Hour (SPLH) = Net Store Revenue ÷ Total Employee Labor Hours; 2) Sales Per Square Foot (SPSF) = Net Store Revenue ÷ Selling Floor Square Footage; and 3) Gross Margin Return on Inventory Investment (GMROI) = Gross Margin $ ÷ Average Inventory Cost. Top retail operators evaluate all three to balance labor efficiency, real estate yield, and working capital velocity.",
    },
    {
        question: "What is Sales Per Labor Hour (SPLH) and what are typical industry benchmarks?",
        answer: "Sales Per Labor Hour (SPLH) measures top-line revenue generated for every scheduled staff hour. Typical benchmarks according to the National Retail Federation (NRF) include: Specialty Apparel ($180 - $280/hr), Supermarket & Grocery ($160 - $240/hr), Big-Box General Merchandise ($220 - $340/hr), and Luxury Boutique Goods ($450 - $950+/hr). Store managers maintain labor cost percentage between 9% and 14% of sales to preserve store-level operating margins.",
    },
    {
        question: "How do store managers calculate Sales Per Square Foot (SPSF)?",
        answer: "Sales Per Square Foot (SPSF) is calculated as: SPSF = Net Store Sales ÷ Dedicated Selling Space (sq ft). Backroom inventory staging, stockrooms, breakrooms, and management offices must be excluded to evaluate true retail floor sales density. High-performing specialty apparel retailers target $350 to $550 per square foot annually, while luxury flagships and consumer electronics leaders often exceed $2,500 to $5,500 per square foot.",
    },
    {
        question: "What is GMROI (Gross Margin Return on Investment) in retail inventory management?",
        answer: "GMROI measures inventory capital productivity: GMROI = Gross Margin Dollars ÷ Average Inventory at Cost. For example, if a store generates $450,000 in gross margin on an average inventory holding of $150,000, the GMROI is 3.0x (meaning every dollar invested in shelf stock yields $3.00 in gross profit). Healthy retailers target a GMROI between 2.5x and 3.5x to prevent cash stagnation in slow-moving SKUs.",
    },
    {
        question: "How does retail shrinkage and inventory loss affect productivity metrics?",
        answer: "Retail shrinkage—encompassing shoplifting, internal employee theft, cashier scanning discrepancies, and administrative paperwork errors—averages 1.4% to 1.8% of total retail sales nationally. Shrinkage erodes gross margin directly and artificially depresses SPSF and SPLH metrics by forcing sales staff to redirect selling hours toward passive surveillance and security compliance.",
    },
    {
        question: "What strategies accelerate retail employee and store floor productivity?",
        answer: "High-yield retail operations increase store productivity by: 1) Deploying dynamic scheduling software that matches cashier and floor staffing to hourly foot-traffic sensors; 2) Implementing mobile Point of Sale (mPOS) terminals to eliminate checkout queue abandonment; 3) Reallocating floor layouts using customer dwell-time heatmaps; and 4) Utilizing RFID tagging to accelerate inventory stock verification by over 70%.",
    },
];
