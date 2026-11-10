/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 salesFaqs
 * [POS]: src/lib/schemas/faqs/sales.ts 销售与业务拓展垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const salesFaqs: FAQItem[] = [
    {
        question: "What is the best productivity calculator for sales teams?",
        answer: "The best sales productivity calculator measures revenue generated per full-time sales rep (Revenue per Rep) alongside activity velocity: Sales Productivity = Total Closed Revenue ÷ Total Sales Headcount (or Selling Hours). Leading B2B teams use this calculator to establish realistic rep quotas, evaluate pipeline velocity, and benchmark sales capacity across quarters.",
    },
];
