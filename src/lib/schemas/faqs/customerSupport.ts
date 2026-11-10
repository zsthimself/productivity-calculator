/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 customerSupportFaqs
 * [POS]: src/lib/schemas/faqs/customerSupport.ts 客服人效、工单解决流速、FCR 与 CSAT 满意度垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const customerSupportFaqs: FAQItem[] = [
    {
        question: "What is the formula for calculating customer support productivity?",
        answer: "Customer support productivity is measured across three core operational dimensions: 1) Throughput Velocity = Total Resolved Support Tickets ÷ Total Active Working Hours Worked (Tickets Per Agent Hour); 2) Resolution Efficiency = First Contact Resolution (FCR) % = (Tickets Solved on First Touch ÷ Total Inbound Inquiries) × 100; and 3) Financial Efficiency = Cost Per Ticket = Total Department Operating Budget ($) ÷ Total Resolved Ticket Volume. High-performing helpdesks balance ticket volume with Customer Satisfaction (CSAT) scores.",
    },
    {
        question: "How many support tickets should a customer service agent resolve per day?",
        answer: "According to HDI (Help Desk Institute) and Zendesk benchmark surveys, daily agent resolution capacity depends heavily on the support channel: Tier 1 Email and Web Form agents average 28 to 42 resolved tickets per 8-hour shift (4 to 6 tickets/hour); Live Chat and messaging specialists resolve 40 to 65 chats per day by handling 2 to 3 concurrent conversations; and Inbound Phone representatives manage 30 to 45 calls per day (average handle time of 6 to 9 minutes). Complex B2B SaaS technical support tickets average 12 to 20 resolutions daily.",
    },
    {
        question: "What is First Contact Resolution (FCR) and why is it critical for support productivity?",
        answer: "First Contact Resolution (FCR) measures the percentage of customer inquiries resolved satisfactorily during the initial interaction, without requiring subsequent follow-up replies or escalations. Industry research from MetricNet and Service Quality Measurement (SQM) Group shows that for every 1% increase in FCR, customer satisfaction (CSAT) increases by 1%, operating costs drop, and agent morale improves. A healthy global FCR benchmark across SaaS and consumer helpdesks is 70% to 78%.",
    },
    {
        question: "What is Average Handle Time (AHT) and how does it relate to ticket backlog?",
        answer: "Average Handle Time (AHT) calculates the total average duration an agent spends actively working on a single customer ticket: AHT = (Total Talk/Chat Time + Total Customer Hold Time + Post-Interaction Wrap-Up Documentation Time) ÷ Total Inquiries Handled. When AHT balloons unexpectedly—due to poor internal knowledge bases, software bugs, or slow CRM software—queue backlog escalates exponentially, driving up customer wait times and triggering duplicate ticket submissions.",
    },
    {
        question: "What is the average cost per support ticket in SaaS and e-commerce companies?",
        answer: "Cost per ticket varies significantly by complexity tier: self-service deflection (AI chatbots and knowledge base articles) costs less than $0.20 per resolution; Tier 1 general consumer support ranges from $5.50 to $12.00 per ticket; while Tier 2 and Tier 3 complex technical engineering support escalations range from $25.00 to over $65.00 per ticket. Measuring cost per ticket reveals whether automated deflection workflows are successfully protecting human agent capacity for high-value interactions.",
    },
    {
        question: "How can support leaders boost agent productivity without degrading CSAT scores?",
        answer: "Support executives elevate productivity while protecting customer sentiment through five lean service strategies: 1) Deploying unified knowledge base macros with auto-populated customer CRM fields to save 2 to 3 minutes per ticket; 2) Implementing AI tier-0 deflectors that resolve routine password resets and order lookups instantly; 3) Setting strict chat concurrency limits (2 to 3 concurrent active sessions) to prevent agent cognitive overload; 4) Creating cross-functional engineering escalation SLAs; and 5) Reviewing weekly CSAT negative ratings to fix underlying product usability bugs at the source.",
    },
];
