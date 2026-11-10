/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 writingFaqs
 * [POS]: src/lib/schemas/faqs/writing.ts 内容创作人效、千字费率、纯写作时钟 WPH 与稿酬净回报垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const writingFaqs: FAQItem[] = [
    {
        question: "What is the formula for calculating writing productivity?",
        answer: "Writing productivity is measured across three core editorial formulas: 1) Drafting Velocity = Words Per Hour (WPH) = Total Clean Words Written ÷ Clock Hours of Pure Drafting; 2) Non-Drafting Overhead Drag (%) = ((Hours in Research, Outlining, Editing & Proofing) ÷ Total Project Hours) × 100; and 3) Financial Realization = Effective Hourly Rate (EHR) = Net Project Payment ($) ÷ Actual Total Hours Worked across all phases. High-performing commercial writers track true clock hours to prevent research and revision drag from eroding hourly compensation.",
    },
    {
        question: "How many words per hour (WPH) should a professional writer produce?",
        answer: "According to editorial benchmarks compiled by the Editorial Freelancers Association (EFA) and the American Society of Journalists and Authors (ASJA), drafting speed varies significantly by genre and complexity: long-form SEO blog articles and commercial web content average 500 to 900 words per drafting hour; creative fiction and memoirs average 700 to 1,200 words per hour; while complex technical whitepapers, investigative journalism, and academic treatises average 200 to 450 words per hour due to continuous citation and fact-verification requirements.",
    },
    {
        question: "How do you convert a per-word rate into an effective hourly wage?",
        answer: "To convert a per-word contract rate into an Effective Hourly Rate (EHR), multiply the per-word rate by the total word count, then divide by the total hours spent across research, drafting, self-editing, and client revisions: EHR = (Word Count × Rate Per Word) ÷ Total Project Hours. For example, a 2,000-word article at $0.35/word yields $700. If the project requires 8 total hours (2 hrs research + 3 hrs drafting + 1.5 hrs editing + 1.5 hrs revisions), your realized hourly rate is $87.50/hour. If revisions swell project time to 14 hours, EHR falls to $50.00/hour.",
    },
    {
        question: "What percentage of writing time should be spent on research and editing?",
        answer: "In professional commercial and technical writing, pure drafting accounts for only 40% to 55% of total project time. The remaining 45% to 60% is standard editorial overhead: 20% to 30% for audience research, interview transcription, and outlining; 15% to 20% for line editing, structure re-ordering, and proofreading; and 10% to 15% for client review cycles and formatting. Attempting to draft without dedicated research typically results in disjointed arguments and heavy revision penalties.",
    },
    {
        question: "How many words does a full-time freelance writer write per day?",
        answer: "Sustainable daily writing output for professional full-time writers ranges between 2,000 and 3,500 finished words per working day (equivalent to 10,000 to 17,500 words per 5-day week). While writers can sprint 5,000+ words in a single day, sustaining that pace leads to cognitive fatigue, repetitive phrasing, and factual oversights. Seasoned writers balance 3 to 4 hours of intense drafting with 3 to 4 hours of research, client communication, pitching, and editing.",
    },
    {
        question: "How can writers increase their writing productivity without degrading quality?",
        answer: "Professional authors and copywriters boost productivity through five disciplined operational techniques: 1) Strict separation of drafting and editing phases (the 'Fast Draft' rule, never fixing prose during the first pass); 2) Building modular, detailed bulleted outlines before writing to eliminate writer's block; 3) Establishing dedicated, uninterrupted 90-minute deep work timeblocks free from email or social media; 4) Creating centralized research files and interview quote repositories; and 5) Contracting a strict two-round revision cap in client statements of work (SOW) to prevent scope creep.",
    },
];
