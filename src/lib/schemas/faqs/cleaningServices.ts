/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 cleaningServicesFaqs
 * [POS]: src/lib/schemas/faqs/cleaningServices.ts 商业保洁垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const cleaningServicesFaqs: FAQItem[] = [
    {
        question: "How do you calculate commercial cleaning time?",
        answer: "To calculate commercial cleaning time, determine cleanable square footage for each area type and divide by its standard production rate (such as ISSA 612 benchmarks). Add non-cleaning operational allowances for trash haulage, equipment setup, and chemical preparation (typically 10% to 15% of gross time). Finally, divide total hours by crew size to establish shift duration.",
    },
    {
        question: "What is the ISSA 612 cleaning standard?",
        answer: "The ISSA 612 Cleaning Times is the globally recognized custodial industry compendium published by ISSA (The Worldwide Cleaning Industry Association). It compiles thousands of verified time-and-motion studies detailing exactly how many minutes and seconds it takes to perform specific cleaning tasks (e.g., damp mopping, backpack vacuuming, porcelain sanitizing) across various facility settings.",
    },
    {
        question: "How many square feet can one commercial cleaner clean per hour?",
        answer: "On average, a commercial cleaner can maintain between 2,500 and 4,500 square feet per hour in a standard office building using modern backpack vacuums and microfiber tools. In complex medical or cleanroom environments, this drops to 1,000 to 1,500 sq ft/hour due to sterilization protocols. In open warehouse facilities with ride-on equipment, rates can exceed 10,000 to 20,000 sq ft/hour.",
    },
    {
        question: "How do janitorial contractors calculate bidding prices per square foot?",
        answer: "Janitorial contractors calculate commercial bid prices by multiplying estimated monthly labor hours by fully loaded custodial wages (including payroll taxes, workers comp, and benefits). They then add 3% to 7% for cleaning chemicals and trash liners, 2% to 4% for equipment depreciation, plus general overhead (15% to 25%) and profit margin (10% to 20%). Dividing total monthly fee by square footage gives the monthly rate per square foot ($0.08 to $0.25/sq ft).",
    },
    {
        question: "What is the difference between team cleaning and zone cleaning?",
        answer: "In zone cleaning, an individual cleaner is responsible for all cleaning tasks (emptying trash, dusting, vacuuming, restrooms) within an assigned physical zone or floor. In team cleaning, specialists rotate through the entire facility performing dedicated functions (e.g., one vacuum specialist followed by one restroom specialist). Team cleaning typically yields 20% to 30% higher productivity and lower equipment duplication costs.",
    },
    {
        question: "What factors cause commercial cleaning productivity to decrease?",
        answer: "Commercial cleaning velocity drops significantly due to high furniture clutter and cable congestion, inadequate electrical outlet spacing requiring frequent cord repositioning, heavy restroom fixture densities, obsolete upright vacuum cleaners, manual mop-bucket water changes, and lack of clear standardized cleaning route mapping.",
    },
];
