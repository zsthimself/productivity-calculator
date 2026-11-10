/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 marketingFaqs
 * [POS]: src/lib/schemas/faqs/marketing.ts 市场营销与增长获客垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const marketingFaqs: FAQItem[] = [
    {
        question: "What is the best marketing productivity calculator formula for growth teams?",
        answer: "The most robust marketing productivity calculator evaluates marketing return on investment alongside pipeline velocity: Marketing ROI (%) = ((Attributed Gross Margin - Total Marketing Spend) ÷ Total Marketing Spend) × 100%. Leading B2B and consumer growth organizations pair MROI with Customer Acquisition Cost (CAC) payback periods and the LTV:CAC ratio to ensure campaign velocity generates durable enterprise enterprise valuation rather than unsustainable vanity traffic.",
    },
    {
        question: "What is a healthy LTV to CAC ratio for B2B and B2C organizations?",
        answer: "Across venture-backed SaaS and enterprise technology companies, an LTV:CAC ratio of 3.0x to 5.0x represents the gold standard of capital efficiency. An LTV:CAC below 2.0x signals excessive customer acquisition costs, inefficient ad spend, or high churn that threatens company solvency. Conversely, an LTV:CAC exceeding 6.0x often indicates under-investment in growth marketing, allowing aggressive competitors to capture market share.",
    },
    {
        question: "What is the difference between Marketing ROI (MROI) and Return on Ad Spend (ROAS)?",
        answer: "ROAS evaluates gross top-line revenue generated strictly per advertising dollar: ROAS = Attributed Revenue ÷ Ad Spend. In contrast, Marketing ROI (MROI) incorporates fully loaded marketing expenditures—including creative agency fees, marketing software stack licenses (HubSpot, Marketo, Salesforce), and internal marketing payroll—against net contribution margin. While ROAS guides tactical ad set bidding, MROI informs executive budget allocation.",
    },
    {
        question: "How does Lead Velocity Rate (LVR) measure marketing productivity?",
        answer: "Lead Velocity Rate (LVR) measures month-over-month percentage growth in qualified sales opportunities (MQLs and SQLs): LVR (%) = ((Current Month Qualified Leads - Prior Month Qualified Leads) ÷ Prior Month Qualified Leads) × 100%. Unlike backward-looking closed revenue metrics which suffer from sales cycle latency, LVR provides a real-time, predictive indicator of future revenue trajectory.",
    },
    {
        question: "What is Cost Per Qualified Opportunity (CPQO) and why does it matter?",
        answer: "Cost Per Qualified Opportunity (CPQO) measures the total blended marketing investment required to produce one vetted sales opportunity: CPQO = Total Marketing Budget (Programs + Overhead) ÷ Sales Qualified Opportunities (SQOs). Monitoring CPQO prevents demand generation teams from celebrating low cost-per-click (CPC) or low cost-per-lead (CPL) campaigns that flood SDR queues with low-intent, unqualified prospects.",
    },
    {
        question: "How do top Chief Marketing Officers (CMOs) improve marketing productivity?",
        answer: "High-performing marketing leaders accelerate productivity by: 1) Enforcing strict Ideal Customer Profile (ICP) qualification filters across all paid channels; 2) Consolidating disjointed marketing automation tools to eliminate operational latency; 3) Reallocating budget away from low-intent top-of-funnel content into high-converting bottom-of-funnel customer proof assets; and 4) Aligning SDR compensation directly with Marketing Qualified Pipeline (MQP) creation.",
    },
];
