/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 timeEfficiencyFaqs
 * [POS]: src/lib/schemas/faqs/timeEfficiency.ts 时间效率与工时利用率 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const timeEfficiencyFaqs: FAQItem[] = [
    {
        question: "How is a time efficiency calculator used to measure work performance?",
        answer: "A time efficiency calculator divides the standard or budgeted time for a task by the actual time required to complete it, then multiplies by 100. For instance, if a task budgeted at 45 minutes takes 36 minutes, time efficiency is (45 / 36) x 100 = 125%.",
    },
    {
        question: "What is the general efficiency calculator formula?",
        answer: "The standard time efficiency formula is Efficiency (%) = (Standard Time / Actual Time) x 100. When evaluating a full workday or shift instead of an isolated task, the utilization formula is (Productive Hours / Scheduled Paid Hours) x 100.",
    },
    {
        question: "Can time efficiency be over 100%?",
        answer: "Yes. Standard-to-actual task efficiency exceeds 100% whenever work is completed faster than the engineered or historical baseline without compromising quality. By contrast, shift time utilization cannot exceed 100% because productive hours cannot exceed total elapsed shift hours.",
    },
    {
        question: "What is a good time efficiency percentage for an operations team?",
        answer: "Most high-performing teams operate between 95% and 110% on standard cycle benchmarks and between 80% and 88% on daily shift time utilization after accounting for breaks, safety huddles, and handoffs.",
    },
    {
        question: "What is the Excel formula for time efficiency?",
        answer: "Put standard minutes in cell A2 and actual minutes in cell B2, then enter =IF(B2>0,(A2/B2)*100,0). To compute daily shift utilization percentage, subtract break and overhead hours from total paid hours and divide by total paid hours: =((A2-(B2+C2))/A2)*100.",
    },
    {
        question: "How do I convert saved minutes into annual FTE capacity?",
        answer: "Multiply minutes saved per task by daily task volume and team headcount, divide by 60 to get daily hours saved, multiply by annual workdays (typically 250), and divide by 2,000 hours to estimate Full-Time Equivalent (FTE) capacity unlocked.",
    },
];
