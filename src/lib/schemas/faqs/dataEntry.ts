/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 dataEntryFaqs
 * [POS]: src/lib/schemas/faqs/dataEntry.ts 数据录入与 BPO 外包服务垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const dataEntryFaqs: FAQItem[] = [
    {
        question: "What is the industry standard keystrokes per hour (KPH) for data entry?",
        answer: "Standard alphanumeric data entry benchmarks require between 8,000 and 10,000 keystrokes per hour (KPH) with a minimum 98% accuracy threshold. For dedicated numeric 10-key data entry (such as accounting ledgers, medical billing, and inventory invoicing), professional speed standards range from 10,000 to 14,000 KPH. Elite BPO data processing operators frequently exceed 15,000 KPH on standardized repetitive formats.",
    },
    {
        question: "How do you calculate Net KPH with error deductions?",
        answer: "Net KPH reflects true billable productivity by penalizing erroneous keystrokes that necessitate manual QA correction: Net KPH = Gross KPH - (Total Errors × Error Penalty Multiplier). In standard BPO quality guidelines, each undetected keystroke error carries a 5x to 10x penalty multiplier to account for downstream audit, rework, and customer verification labor.",
    },
    {
        question: "What is the difference between KPH and Words Per Minute (WPM)?",
        answer: "Words Per Minute (WPM) measures prose typing velocity where a standardized 'word' equals five keystrokes including spaces. Keystrokes Per Hour (KPH) measures raw keyboard or numpad entries over a 60-minute duration. The mathematical relationship is: KPH = WPM × 5 keystrokes × 60 minutes (or KPH = WPM × 300). For example, a typing speed of 40 WPM equates to 12,000 gross KPH.",
    },
    {
        question: "How is data entry productivity measured per 1,000 records?",
        answer: "Enterprise data processing centers quantify unit economics using Cost per 1,000 Records: Unit Cost per 1k = (Total Fully Loaded Labor Cost ÷ Total Records Completed) × 1,000. Measuring batch velocity (records processed per shift hour) alongside unit cost prevents speed gains from masking high error rectification overhead in complex CMS-1500 healthcare or invoice ingestion pipelines.",
    },
    {
        question: "What is the acceptable error rate for professional BPO data entry operations?",
        answer: "World-class business process outsourcing (BPO) and document management operations enforce a 99.5% to 99.9% accuracy rate (0.1% to 0.5% error rate). In mission-critical workflows like medical coding, patient chart indexing, and mortgage deed registration, organizations deploy dual-key verification (blind double-entry) to drive net accuracy above 99.98%.",
    },
    {
        question: "How do data processing centers improve data entry velocity without sacrificing accuracy?",
        answer: "Leading data processing operations enhance productivity by: 1) Deploying OCR/ICR pre-fill models with human-in-the-loop exception handling; 2) Enforcing dual-monitor ergonomic workstations and mechanical 10-key peripherals; 3) Standardizing keyboard shortcut macros to eliminate mouse dependency; and 4) Implementing automated field-level regex validation masks that prevent formatting errors at the keystroke level.",
    },
];
