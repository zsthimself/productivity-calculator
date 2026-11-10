/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 technicianFaqs
 * [POS]: src/lib/schemas/faqs/technician.ts 技师与汽修外勤垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const technicianFaqs: FAQItem[] = [
    {
        question: "How do you calculate technician productivity?",
        answer: "Technician productivity is calculated by dividing actual clocked hours working on repair orders by total available scheduled shift hours: Productivity (%) = (Clock Hours Worked ÷ Available Shift Hours) × 100. It measures shop schedule and bay utilization.",
    },
    {
        question: "What is the difference between technician efficiency and technician productivity?",
        answer: "Technician efficiency measures job completion speed against flat-rate standards (Billed Hours ÷ Clocked Hours), reflecting technical skill. Technician productivity measures schedule utilization (Clocked Hours ÷ Available Shift Hours), reflecting shop dispatch and absence of idle time.",
    },
    {
        question: "What is a good technician efficiency percentage in automotive repair?",
        answer: "Standard baseline technician efficiency in automotive repair ranges from 100% to 115% for experienced technicians. Master diagnostic technicians frequently achieve 125% to 145%+ efficiency, whereas shop averages below 90% indicate bottlenecks or diagnostic delays.",
    },
    {
        question: "What is wrench time in maintenance and field service?",
        answer: "Wrench time is the percentage of a field or industrial maintenance technician's shift spent physically performing hands-on repairs on equipment, excluding travel time, parts retrieval, and administrative delay. Standard operations average 35% to 45%, while world-class lean fleets reach 55% to 65%.",
    },
    {
        question: "What is technician proficiency (or effective labor utilization)?",
        answer: "Technician proficiency combines efficiency and productivity to measure total revenue-generating performance: Proficiency (%) = (Billed Flat-Rate Hours ÷ Available Shift Hours) × 100. Billing 50 flat-rate hours in a 40-hour work week equals 125% proficiency.",
    },
    {
        question: "How can service managers improve technician billable hours?",
        answer: "Service managers increase billable hours by pre-staging required parts before vehicles enter bays, assigning dedicated porters, utilizing digital vehicle inspections (DVI) for instant customer estimate approval, and structuring tiered flat-rate bonus incentives.",
    },
];
