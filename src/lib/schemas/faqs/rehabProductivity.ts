/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 rehabProductivityFaqs 结构化问答数组
 * [POS]: src/lib/schemas/faqs/rehabProductivity.ts 为 /calculator/rehab-productivity 提供 FAQPage Schema 数据
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { FAQItem } from "./types";

export const rehabProductivityFaqs: FAQItem[] = [
    {
        question: "How is rehab productivity calculated for PT, OT, and SLP therapists?",
        answer: "Rehab productivity equals (Total Billable Treatment Minutes ÷ Net Paid Shift Minutes) × 100. First subtract any unpaid meal break (typically 30 minutes) from the total clock-in to clock-out span to get net paid minutes, then divide billable patient minutes by that denominator.",
    },
    {
        question: "What is a typical rehab productivity benchmark by clinical setting?",
        answer: "Inpatient acute hospitals generally expect 70%–78% due to medical complexity and chart reviews; outpatient clinics typically target 80%–85%; and Skilled Nursing Facilities (SNF) commonly set 85%–90% benchmarks for PT, PTA, OT, COTA, and SLP clinicians.",
    },
    {
        question: "How does unpaid lunch affect a rehab productivity calculator?",
        answer: "If you work 8:00 AM to 4:30 PM (510 minutes) with a 30-minute unpaid lunch, your paid denominator is 480 minutes. Delivering 408 billable minutes equals 85.0% productivity (408 ÷ 480), whereas forgetting to subtract lunch falsely reports 80.0% (408 ÷ 510).",
    },
    {
        question: "How are group and concurrent therapy minutes counted under Medicare PDPM?",
        answer: "Under Medicare Part A PDPM rules, combined group and concurrent therapy minutes are capped at 25% of a patient's total therapy minutes per discipline. Our rehab productivity calculator tracks your group/concurrent share against the 25% threshold automatically.",
    },
    {
        question: "How do I calculate my target clock-out time to hit an 85% rehab productivity goal?",
        answer: "Divide your completed billable minutes by 0.85 to find your allowed paid shift minutes, add your unpaid lunch break minutes, and add that total to your clock-in time.",
    },
];
