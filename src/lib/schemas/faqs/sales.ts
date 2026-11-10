/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 salesFaqs
 * [POS]: src/lib/schemas/faqs/sales.ts 销售与业务拓展垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const salesFaqs: FAQItem[] = [
    {
        question: "What is the best productivity calculator for sales teams?",
        answer: "The best sales productivity calculator measures revenue generated per full-time sales rep (Revenue per Rep) alongside activity velocity: Sales Productivity = Total Closed Revenue ÷ Total Sales Headcount (or Selling Hours). Leading B2B SaaS and enterprise revenue teams use this calculator to establish realistic rep quotas, evaluate pipeline velocity, and benchmark sales capacity across quarters.",
    },
    {
        question: "What is Sales Velocity and why is it superior to static quota attainment?",
        answer: "Sales Velocity measures how quickly qualified opportunities move through your pipeline into closed-won revenue: Sales Velocity ($/Day) = (Number of Qualified Opportunities × Overall Win Rate % × Average Deal Size in $) ÷ Sales Cycle Length in Days. Unlike lagging quota metrics, sales velocity provides a predictive, real-time formula that highlights whether adjusting deal size, win rates, or sales cycle duration will yield the highest incremental ARR.",
    },
    {
        question: "How do you calculate sales per hour and sales labor efficiency?",
        answer: "Sales per hour evaluates the direct revenue productivity of rep selling time: Sales Per Hour ($/hr) = Total Closed Revenue ($) ÷ Total Active Selling Hours Worked. Because typical B2B account executives spend only 33% to 36% of their week on live selling activities (the remainder lost to CRM data entry, prospecting, and internal meetings), measuring sales per hour reveals whether automation or SDR support can unlock higher rep capacity.",
    },
    {
        question: "What is a healthy quota attainment percentage for B2B sales organizations?",
        answer: "According to standard SaaS benchmarks from the Bridge Group and Pavilion, a healthy sales organization targets 65% to 75% of sales reps meeting or exceeding 100% of their annual quota. If over 85% of reps hit quota, targets are likely set too low, capping enterprise potential; if fewer than 50% hit quota, territory design, lead qualification, or pricing structures are misaligned.",
    },
    {
        question: "How does sales rep ramp time impact quarterly productivity calculations?",
        answer: "Ramp time—the months required for a new sales hire to reach 100% quota capacity—typically averages 3.2 months for SMB inside sales, 4.8 months for Mid-Market reps, and 6 to 9 months for Enterprise AEs. During ramp periods, RevOps calculations must discount headcount capacity (e.g., month 1 at 0%, month 2 at 25%, month 3 at 50%, month 4 at 75%) to prevent inflated quota targets and unrealistic revenue forecasting.",
    },
    {
        question: "How do top revenue operations teams increase sales productivity without burning out reps?",
        answer: "Top RevOps leaders boost sales productivity by: 1) Streamlining CRM administrative overhead through automated logging and AI meeting summaries to expand active selling time beyond 40%; 2) Implementing strict ICP qualification gates to avoid wasting time on low-probability deals; 3) Standardizing playbooks and collateral for mid-stage pipeline velocity; and 4) Aligning compensation accelerators with high-margin multi-year contracts.",
    },
];
