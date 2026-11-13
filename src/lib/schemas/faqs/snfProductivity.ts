/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 snfProductivityFaqs
 * [POS]: src/lib/schemas/faqs/snfProductivity.ts 专业护理机构(SNF)康复治疗效率与 CMS PDPM 25%上限结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const snfProductivityFaqs: FAQItem[] = [
    {
        question: "How is SNF therapy productivity calculated?",
        answer: "An SNF productivity calculator divides total direct patient treatment minutes (or PDPM-adjusted minutes) by net paid facility minutes on the clock (total shift minutes minus unpaid lunch break), then multiplies by 100. For example, 408 treatment minutes across a paid 480-minute shift yields (408 / 480) x 100 = 85.0%.",
    },
    {
        question: "What is a typical productivity target for PT, PTA, OT, COTA, and SLP in a skilled nursing facility?",
        answer: "Most SNF rehab contracts set productivity expectations at 85% to 88% for evaluating Physical Therapists (PT) and Occupational Therapists (OT), 90% to 92% for Physical Therapist Assistants (PTA) and Certified Occupational Therapy Assistants (COTA), and 80% to 85% for Speech-Language Pathologists (SLP).",
    },
    {
        question: "How do concurrent and group therapy affect SNF productivity under CMS PDPM?",
        answer: "Under CMS Patient-Driven Payment Model (PDPM) rules for Medicare Part A SNF stays, concurrent and group therapy minutes count toward total patient minutes delivered, lifting clinician efficiency above single-patient pace. However, combined concurrent and group therapy may not exceed 25% of total therapy minutes per discipline across a resident stay.",
    },
    {
        question: "How do I find my target clock-out time using an SNF productivity calculator?",
        answer: "Divide your completed billable patient minutes by your decimal productivity goal (e.g., 380 minutes divided by 0.85 = 447 paid minutes), add your unpaid meal break (typically 30 minutes = 477 minutes), and add that duration to your morning punch-in timestamp.",
    },
    {
        question: "Does unpaid lunch count toward SNF paid hours?",
        answer: "No. Bona fide unpaid meal periods of 30 minutes or longer are subtracted from total elapsed shift time before calculating SNF productivity, provided the clinician is completely relieved of clinical and documentation duties during lunch.",
    },
    {
        question: "What happens if an SNF resident exceeds the 25% PDPM concurrent and group cap?",
        answer: "Medicare Part A claims receive a non-fatal warning edit on Minimum Data Set (MDS) assessments when concurrent plus group minutes exceed 25% of total minutes in a discipline, triggering heightened ADR audit scrutiny if a facility shows systematic overuse.",
    },
];
