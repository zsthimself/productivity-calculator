/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 manufacturingFaqs
 * [POS]: src/lib/schemas/faqs/manufacturing.ts 工业制造垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const manufacturingFaqs: FAQItem[] = [
    {
        question: "What is an ideal manufacturing productivity rate?",
        answer: "In discrete manufacturing, an OEE score of 85% is internationally recognized as World-Class. Typical manufacturing operations operate between 60% and 75% OEE. For direct labor efficiency, maintaining a 95%+ target achievement rate with less than 2% scrap is considered top quartile performance.",
    },
    {
        question: "How does scrap and defect rate affect manufacturing productivity?",
        answer: "Scrap directly penalizes both the Quality factor in OEE and the Net Production Rate. Because labor, machine cycle time, and utility power are consumed producing unusable scrap, high scrap rates artificially inflate the cost per unit while reducing overall plant capacity.",
    },
    {
        question: "What is the difference between production volume and productivity?",
        answer: "Production volume is the raw quantity of goods manufactured over a timeframe (e.g., 50,000 units this month). Productivity is the ratio of that volume to the inputs invested (e.g., units per labor hour or units per dollar). Producing high volume by adding excessive overtime can actually decrease productivity.",
    },
    {
        question: "Can this manufacturing calculator handle multiple shifts and assembly lines?",
        answer: "Yes. Use the 'Factory Capacity' tab to set shift lengths (e.g., 8, 10, or 12 hours), the number of shifts per day (1, 2, or 3), parallel production lines, and working days per week to automatically project daily, weekly, monthly, and annual factory capacity.",
    },
    {
        question: "How do you calculate labor hours in manufacturing?",
        answer: "Direct labor hours are calculated by multiplying the number of operators on the line by the shift duration: Direct Labor Hours = Number of Workers × Shift Hours Worked. For example, a 6-person assembly line operating for an 8-hour shift logs 48 direct labor hours.",
    },
];
