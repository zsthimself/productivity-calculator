/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 graphicDesignFaqs
 * [POS]: src/lib/schemas/faqs/graphicDesign.ts 设计工坊工效、工单周期、改稿损耗率与设计师产值垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const graphicDesignFaqs: FAQItem[] = [
    {
        question: "What is the formula for calculating graphic design productivity?",
        answer: "Graphic design productivity is evaluated across three core operational formulas: 1) Turnaround Time (TAT) = Total Project Working Hours ÷ Total Delivered Design Assets; 2) Revision Drag Ratio (%) = (Hours Spent on Revisions & Scope Changes ÷ Total Project Hours) × 100; and 3) Financial Realization = Effective Hourly Rate (EHR) = Net Project Compensation ($) ÷ Actual Total Hours Invested (including concepting, production, and revisions). A high-performing design team maintains a low revision ratio while preserving creative quality and high billable utilization.",
    },
    {
        question: "How long should typical graphic design tasks take to complete?",
        answer: "According to benchmarks compiled by AIGA (American Institute of Graphic Arts) and leading design management studios, average production timelines vary by asset complexity: static social media ads and marketing banners average 1.5 to 3.5 hours; presentation slide decks average 45 to 90 minutes per polished slide; full brand identity systems (logo, palette, typography guidelines) require 25 to 45 hours; complex digital UI/UX multi-screen flows take 35 to 60 hours; and multi-page print editorial catalogs average 2.5 to 5.0 hours per spread.",
    },
    {
        question: "What is an acceptable revision rate in graphic design and creative agencies?",
        answer: "A healthy revision drag ratio for professional design agencies and freelance practitioners sits between 10% and 18% of total project hours, typically covering two structured rounds of iterative client feedback. When revision time exceeds 25% to 30%, it indicates severe scope creep, ambiguous initial briefs, or misaligned stakeholder expectations, which erodes project profitability and creates creative burnout.",
    },
    {
        question: "How do you calculate a freelance graphic designer's effective hourly rate?",
        answer: "To calculate effective hourly rate (EHR) on flat-fee or milestone projects, divide total net client payment by all hours logged on the assignment: EHR = Total Project Fee ($) ÷ (Briefing Hours + Exploration Hours + Production Hours + Revision Hours + File Hand-off Hours). For example, a $2,400 brand project requiring 32 total hours yields an effective hourly rate of $75.00/hour. If uncontrolled revisions stretch total hours to 48, realized EHR collapses by 33% to $50.00/hour.",
    },
    {
        question: "What is a healthy billable utilization rate for designers in creative studios?",
        answer: "In professional design firms and creative studios, target billable utilization typically ranges from 70% to 82% for production and senior designers (28 to 33 billable hours per 40-hour workweek). Creative directors and design leads operate at lower billable targets of 50% to 65% to accommodate business development, client strategy, and team mentorship, while internal non-billable overhead covers internal meetings, training, and portfolio curation.",
    },
    {
        question: "How can design leads improve designer productivity and curb revision loss?",
        answer: "Creative directors optimize studio productivity through five disciplined operational practices: 1) Enforcing standardized creative brief questionnaires before kicking off production to prevent vague requirements; 2) Contracting strict 2-round revision limits with documented change fees for subsequent scope additions; 3) Building reusable Figma design systems and component token libraries to eliminate redundant layout work; 4) Scheduling structured asynchronous Loom or Figma video walkthroughs to reduce feedback turnaround latency; and 5) Tracking weekly project hour actuals against original estimates to continuously refine studio pricing.",
    },
];
