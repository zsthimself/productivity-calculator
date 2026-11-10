/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 employeeFaqs
 * [POS]: src/lib/schemas/faqs/employee.ts 员工绩效垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const employeeFaqs: FAQItem[] = [
    {
        question: "How is employee productivity calculated?",
        answer: "Employee productivity is calculated using Revenue Per Employee: Total Gross Revenue ÷ Total Full-Time Equivalents (FTEs). In high-performance software and financial firms, Profit Per Employee (Operating Income ÷ FTEs) is also tracked to measure operational leverage.",
    },
    {
        question: "What is a good revenue per employee benchmark?",
        answer: "For S&P 500 public companies, the average revenue per employee is approximately $320,000. Big tech companies frequently achieve $1,200,000 to $2,500,000 per employee. In professional services and agencies, $150,000 to $250,000 per FTE represents a healthy standard.",
    },
    {
        question: "How do you calculate employee ROI and fully loaded labor cost?",
        answer: "Fully loaded cost multiplies base salary by 1.25x to 1.40x to incorporate payroll taxes, medical insurance, retirement matching, software licenses, and office overhead. Employee ROI is calculated as: ((Gross Revenue Attributed - Fully Loaded Cost) ÷ Fully Loaded Cost) × 100.",
    },
    {
        question: "What is the difference between headcount and FTE?",
        answer: "Headcount counts individual employees regardless of hours worked. Full-Time Equivalent (FTE) normalizes part-time and contractor hours into standard 40-hour workweeks (e.g., two 20-hour part-time employees equal 1.0 FTE).",
    },
    {
        question: "How can managers improve team quota attainment rates?",
        answer: "Managers improve attainment rates by eliminating non-core administrative tasks, implementing automated CRM workflows, offering continuous skills enablement, and establishing transparent weekly sprint scorecards.",
    },
    {
        question: "Why can high revenue per employee be misleading?",
        answer: "Revenue per employee can mask profitability if cost of goods sold (COGS) or third-party contractor expenses are high. Always analyze Profit Per Employee alongside Revenue Per Employee to evaluate true productivity.",
    },
];
