/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 healthcareFaqs
 * [POS]: src/lib/schemas/faqs/healthcare.ts 医疗卫生垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const healthcareFaqs: FAQItem[] = [
    {
        question: "How is healthcare productivity calculated?",
        answer: "Healthcare productivity is calculated using different operational metrics depending on care setting: For physicians and clinicians, it is measured in Work Relative Value Units per clinical day or year (wRVU ÷ Time); for hospital inpatient nursing, it is measured in Hours Per Patient Day (HPPD = Total Productive Nursing Hours ÷ Midnight Patient Census); and for outpatient clinics, it is evaluated by patient encounters completed per clinical hour.",
    },
    {
        question: "What is a wRVU in physician productivity?",
        answer: "A Work Relative Value Unit (wRVU) is a standardized numeric weight assigned by the Centers for Medicare & Medicaid Services (CMS) to quantify the clinical skill, physical effort, cognitive complexity, and time required to perform a specific medical service or procedure (CPT code). It excludes practice overhead and malpractice costs, serving as the universal gold standard for measuring doctor productivity and setting incentive compensation.",
    },
    {
        question: "What is HPPD in hospital nursing staffing?",
        answer: "Hours Per Patient Day (HPPD) measures direct nursing hours provided to a patient in an inpatient hospital unit over a 24-hour period. It is calculated by dividing total worked nursing hours (by Registered Nurses, LPNs, and nurse aides) by midnight inpatient census. Standard benchmarks range from 8.0 to 9.5 HPPD on medical-surgical floors to over 18.0 to 24.0 HPPD in intensive care units (ICU).",
    },
    {
        question: "What is the average patient volume for an outpatient clinic doctor?",
        answer: "On average, an outpatient primary care physician (Family Medicine or Internal Medicine) sees between 18 and 24 patients per 8-hour clinical day, equating to roughly 2.2 to 2.8 patient encounters per hour. Specialized surgical and procedural clinics may schedule 12 to 16 patients per day to accommodate complex consultations and minor office procedures.",
    },
    {
        question: "What is the difference between clinical productivity and healthcare efficiency?",
        answer: "Clinical productivity measures volume of output generated per unit of resource input (such as wRVUs generated per clinical day or encounters per hour). Healthcare efficiency is broader, factoring in clinical quality, diagnostic accuracy, 30-day readmission rates, patient safety outcomes, and operating cost per episode of care. High productivity without clinical quality results in downstream medical errors.",
    },
    {
        question: "How can hospitals reduce nurse overtime while maintaining HPPD acuity?",
        answer: "Hospitals reduce nurse overtime while sustaining required HPPD by instituting centralized float pools, leveraging automated shift bidding software, analyzing historical patient census trends to adjust core staffing 4 to 6 weeks in advance, and conducting daily mid-shift acuity balancing rather than relying on mandatory end-of-shift overtime.",
    },
];
