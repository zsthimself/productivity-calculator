/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 weldingFaqs
 * [POS]: src/lib/schemas/faqs/welding.ts 焊接工业制造垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const weldingFaqs: FAQItem[] = [
    {
        question: "How do you calculate welding productivity?",
        answer: "Welding productivity is measured through Effective Deposition Rate (lbs/hr = Gross Rate × Deposition Efficiency × Arc-On Operating Factor) and Labor Velocity (Completed Linear Feet ÷ Total Welder Hours). In structural shops, comparing actual metal deposited against theoretical arc capacity pinpoints production bottlenecks.",
    },
    {
        question: "What is welder productivity per day?",
        answer: "An average welder depositing SMAW stick electrodes deposits 8 to 14 lbs of weld metal per 8-hour shift (20% to 25% arc time). With semi-automatic MIG (GMAW) or flux-cored (FCAW) wire, daily productivity jumps to 25 to 45 lbs per day (35% to 45% arc time). Automated SAW cells deposit over 100 to 180 lbs daily.",
    },
    {
        question: "What is the arc-on operating factor in welding?",
        answer: "Operating factor is the percentage of a welder's scheduled shift where the electric arc is actively melting metal: Operating Factor (%) = (Arc Hours ÷ Total Shift Hours) × 100. The remaining shift time is consumed by tacking, preheating, nozzle cleaning, slag chipping, and joint fit-up.",
    },
    {
        question: "How do you calculate welding deposition rate?",
        answer: "Deposition rate measures the weight of filler metal deposited into the joint per continuous arc hour: Deposition Rate = Wire Feed Speed (in/min) × 60 min/hr × Weight per Inch of Wire × Deposition Efficiency. It can also be verified empirically by weighing test plates before and after 2 minutes of continuous welding.",
    },
    {
        question: "Why does labor represent 80% to 85% of total welding costs?",
        answer: "Welding requires certified skilled labor. While solid wire costs $1.80 to $2.80 per pound and shielding gas adds $0.30 to $0.60 per pound, fully burdened welder labor costs $55 to $85+ per hour. Reducing arc and prep time through higher deposition wires saves substantially more money than buying cheaper electrodes.",
    },
    {
        question: "What is the financial impact of over-welding?",
        answer: "Over-welding occurs when a fillet weld leg size exceeds engineering specifications. Because weld volume scales quadratically with leg size, increasing a fillet from 1/4 inch to 5/16 inch requires 56% more filler metal and 56% more labor hours, adding zero structural strength while causing heat distortion.",
    },
];
