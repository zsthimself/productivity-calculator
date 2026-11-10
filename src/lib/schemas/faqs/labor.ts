/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 laborFaqs
 * [POS]: src/lib/schemas/faqs/labor.ts 人工工时垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const laborFaqs: FAQItem[] = [
    {
        question: "How is labor productivity calculated?",
        answer: "Labor productivity is calculated by dividing total output by the labor hours invested: Labor Productivity = Total Output Units (or Revenue) ÷ Total Labor Hours Worked. For example, producing 500 units in 50 labor hours yields a productivity rate of 10 units per labor hour.",
    },
    {
        question: "What is a good labor productivity ratio?",
        answer: "For financial productivity (Revenue-to-Labor ratio), a healthy target is 2.5x to 4.0x: generating at least $2.50 to $4.00 of gross revenue for every $1.00 spent on labor payroll. In professional services and consulting, a billable workforce utilization rate between 75% and 85% is considered top-tier.",
    },
    {
        question: "What is the difference between direct and indirect labor?",
        answer: "Direct labor refers to workers and hours directly involved in producing goods or delivering billable client services (e.g., assembly technicians, developers, treating clinicians). Indirect labor refers to support and administrative functions (e.g., HR, accounting, facility maintenance) that support operations but do not directly generate units of output.",
    },
    {
        question: "How do you calculate labor cost per unit?",
        answer: "Labor cost per unit is calculated by dividing total labor payroll costs by the number of units produced: Labor Cost Per Unit = Total Labor Cost ($) ÷ Total Units Produced. Alternatively, divide the hourly wage by your hourly productivity rate.",
    },
    {
        question: "What causes low labor productivity in an organization?",
        answer: "The primary causes of low labor productivity include excessive administrative meetings, inadequate tooling or legacy software, poor onboarding processes, unaddressed process bottlenecks, lack of standardized work procedures, and employee burnout or misalignment with organizational goals.",
    },
    {
        question: "How does employee utilization impact profitability?",
        answer: "Higher utilization directly converts fixed payroll expenses into recognized revenue. For example, increasing a 10-person consultancy's billable utilization from 70% to 80% unlocks 40 additional billable hours per week—generating $300,000+ in pure gross margin annually without adding headcount.",
    },
];
