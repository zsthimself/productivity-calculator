/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 productivityIndexFaqs 结构化问答数组
 * [POS]: src/lib/schemas/faqs/productivityIndex.ts 为 /calculator/productivity-index 提供 FAQPage Schema 数据
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { FAQItem } from "./types";

export const productivityIndexFaqs: FAQItem[] = [
    {
        question: "What is a productivity index calculator and how does it work?",
        answer: "A productivity index calculator measures how much output efficiency changed between a reference base period (normalized to 100.0) and a current period. It divides current-period productivity (Output ÷ Input) by base-period productivity (Output ÷ Input) and multiplies by 100.",
    },
    {
        question: "What does a productivity index above or below 100 mean?",
        answer: "An index above 100 means your team or facility produces more output per unit of input than in the base period—for example, 112.5 represents a +12.5% productivity gain. An index below 100 (such as 94.0) signals a -6.0% efficiency decline.",
    },
    {
        question: "What is the difference between a labor productivity index and a multifactor productivity index?",
        answer: "A labor productivity index tracks output per labor hour or employee, while a multifactor productivity (MFP) index compares output against a weighted combination of labor, capital, and material inputs so capital investments are not mistaken for pure labor gains.",
    },
    {
        question: "How do I choose a base period for a productivity index?",
        answer: "Select a stable, representative operating period—such as a normal quarter or full prior fiscal year—free from unusual shutdowns or one-off spikes. All subsequent months or quarters are then indexed against that 100.0 baseline.",
    },
    {
        question: "Can I use revenue instead of physical units in a productivity index calculator?",
        answer: "Yes, provided you deflate current-period revenue for price inflation (real output) so price increases do not masquerade as real efficiency improvements.",
    },
];
