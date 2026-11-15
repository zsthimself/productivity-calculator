/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 productivityLunchBreakFaqs 数组
 * [POS]: src/lib/schemas/faqs/productivityLunchBreak.ts 为 /calculator/productivity-with-lunch-break 提供结构化 FAQPage 问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const productivityLunchBreakFaqs: FAQItem[] = [
    {
        question: "How does a productivity calculator with lunch break work?",
        answer: "A productivity calculator with lunch break subtracts your unpaid meal period (typically 30, 45, or 60 minutes) from your total clock-in-to-clock-out shift length to find net paid minutes, then divides your billable or productive minutes by that net paid denominator and multiplies by 100.",
    },
    {
        question: "Why must unpaid lunch breaks be deducted from productivity calculations?",
        answer: "Under US Department of Labor (DOL 29 CFR § 785.19) guidance, bona fide meal periods where an employee is completely relieved from duty are unpaid work-free intervals. Including an unpaid 30-minute lunch in the denominator artificially lowers your productivity percentage by 5 to 6 percentage points.",
    },
    {
        question: "How do I calculate my clock-out time with a 30-minute lunch break?",
        answer: "Divide your completed billable minutes by your target productivity percentage (e.g., 408 ÷ 0.85 = 480 net paid minutes), add your 30-minute unpaid lunch (510 gross minutes), and add 510 minutes to your clock-in time. Clocking in at 8:00 AM gives a 4:30 PM target clock-out.",
    },
    {
        question: "What if I take a 45-minute or 60-minute lunch break instead of 30 minutes?",
        answer: "Select 45 min or 60 min in the lunch break preset buttons inside the calculator. Longer unpaid meal breaks extend your gross clock-in-to-clock-out window by 15 or 30 minutes to preserve the same 8.00 net paid hours.",
    },
    {
        question: "What is the Excel formula for productivity with a lunch break?",
        answer: "If A2 is Clock-In, B2 is Clock-Out, C2 is unpaid lunch in minutes, and D2 is productive minutes, use =D2/(((B2-A2)*1440)-C2) and format the result cell as Percentage.",
    },
];
