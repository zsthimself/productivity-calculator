/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 physicalTherapyFaqs
 * [POS]: src/lib/schemas/faqs/physicalTherapy.ts 物理治疗垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const physicalTherapyFaqs: FAQItem[] = [
    {
        question: "How is physical therapy productivity calculated?",
        answer: "Physical therapy productivity is typically calculated as: Productivity % = (Billable Time ÷ Total Paid Time) × 100. For example, if you bill 360 minutes (6 hours) in an 8-hour workday (480 minutes), your productivity is (360 ÷ 480) × 100 = 75%. In unit-based clinics, it may also be measured by billable units per day (e.g., 24 units in an 8-hour shift).",
    },
    {
        question: "What is a reasonable productivity standard for physical therapists?",
        answer: "Target productivity rates vary by setting: Hospital Outpatient clinics generally expect 70% to 80% (3 to 3.5 units/hour); Private Practice Outpatient often expects 80% to 90% (3.5 to 4.2 units/hour); Skilled Nursing Facilities (SNFs) frequently mandate 80% to 88%; Acute Inpatient Rehab typically targets 65% to 75%; and Home Health measures by visit points (usually 28–32 points/week).",
    },
    {
        question: "How does the Medicare 8-minute rule work?",
        answer: "Under the Medicare 8-minute rule for timed CPT codes (e.g., therapeutic exercise 97110, manual therapy 97140), you must provide at least 8 minutes of direct one-on-one treatment to bill 1 unit. Units are assigned based on cumulative timed minutes: 1 Unit: 8–22 mins; 2 Units: 23–37 mins; 3 Units: 38–52 mins; 4 Units: 53–67 mins; 5 Units: 68–82 mins; 6 Units: 83–97 mins.",
    },
    {
        question: "Does documentation time count toward clinical productivity?",
        answer: "Point-of-care documentation completed while directly educating the patient or reviewing functional progress can count as part of billable patient care. However, routine charting, administrative desk work, attending team meetings, and writing discharge summaries outside patient contact hours are non-billable and will decrease overall daily productivity percentage.",
    },
    {
        question: "How do cancellations and no-shows affect therapist productivity?",
        answer: "Cancellations directly reduce billable time while your scheduled shift duration remains fixed, lowering your calculated productivity percentage. Many clinics use standby tasks, same-day waitlist slots, or non-clinical time deductions to mitigate the impact of cancellations on staff therapist performance evaluations.",
    },
    {
        question: "What is the difference between timed and untimed CPT codes in PT billing?",
        answer: "Timed CPT codes (like 97110 for therapeutic exercise, 97112 for neuromuscular re-education, and 97140 for manual therapy) require direct one-on-one contact and are billed in 15-minute increments governed by the 8-minute rule. Untimed CPT codes (such as 97161–97163 for PT evaluations or 97597 for wound care) are billed as a single unit regardless of whether the procedure took 20, 45, or 60 minutes.",
    },
];
