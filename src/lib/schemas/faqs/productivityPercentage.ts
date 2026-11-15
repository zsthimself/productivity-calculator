/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 productivityPercentageFaqs 数组
 * [POS]: src/lib/schemas/faqs/productivityPercentage.ts 为 /calculator/productivity-percentage 提供结构化 FAQPage 问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const productivityPercentageFaqs: FAQItem[] = [
    {
        question: "How do you calculate productivity percentage?",
        answer: "Divide your productive or billable time by your net paid shift time, then multiply by 100: Productivity % = (Productive Minutes ÷ Net Paid Shift Minutes) × 100. For output-based roles, divide actual output by target quota and multiply by 100.",
    },
    {
        question: "How do you calculate productivity percentage with a lunch break?",
        answer: "Subtract any unpaid meal break from your total clock-in-to-clock-out shift length before dividing. For example, if you are on site from 8:00 AM to 4:30 PM (510 minutes) with a 30-minute unpaid lunch, your net paid denominator is 480 minutes. Delivering 408 billable minutes equals (408 ÷ 480) × 100 = 85.0%.",
    },
    {
        question: "What is a good productivity percentage benchmark?",
        answer: "Across office, agency, and operations teams, 75% to 85% utilization is considered healthy because it leaves 15% to 25% for documentation, meetings, and transitions. In outpatient physical therapy and SNF rehab clinics, 80% to 88% is typical, while automated manufacturing lines target 85%+ OEE.",
    },
    {
        question: "How do I reverse-calculate my clock-out time for a target productivity percentage?",
        answer: "Divide your completed billable minutes by your target percentage (as a decimal) to find your maximum allowed paid shift minutes, then add your unpaid lunch break to your clock-in time. For instance, 408 billable minutes at an 85% target allows 480 paid minutes (8 hours) plus a 30-minute lunch.",
    },
    {
        question: "Can productivity percentage exceed 100%?",
        answer: "Yes. In quota-based roles (sales, warehouse picking, manufacturing), exceeding your target quota yields over 100%. In healthcare or concurrent/group therapy, billing overlapping patient minutes can also push productivity percentage above 100%.",
    },
    {
        question: "What is the Excel formula for productivity percentage?",
        answer: "If cell A2 holds productive minutes, B2 holds total shift minutes, and C2 holds unpaid lunch minutes, enter =A2/(B2-C2) and format the cell as a Percentage. For quota tracking, use =Actual_Output/Target_Quota formatted as Percentage.",
    },
];
