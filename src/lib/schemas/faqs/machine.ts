/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 machineFaqs
 * [POS]: src/lib/schemas/faqs/machine.ts 机器设备与自动化生产线垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const machineFaqs: FAQItem[] = [
    {
        question: "How do you calculate machine productivity?",
        answer: "Machine productivity is calculated by dividing actual good output units by the total operating machine hours invested: Machine Productivity = Total Good Units Produced ÷ Operating Machine Hours. In industrial manufacturing, it is comprehensively quantified through Overall Equipment Effectiveness: OEE (%) = Availability × Performance × Quality.",
    },
    {
        question: "What is the difference between machine productivity and machine efficiency?",
        answer: "Machine productivity measures total volume of good output generated per equipment running hour (units/hr). Machine efficiency measures how closely the machine operates compared to its theoretical design speed and rated nameplate capacity: Efficiency (%) = (Actual Production Rate ÷ Nameplate Maximum Rate) × 100.",
    },
    {
        question: "What is a good Overall Equipment Effectiveness (OEE) benchmark for industrial machines?",
        answer: "In discrete manufacturing and precision machining, an OEE of 85% is internationally recognized as World-Class (typically 90% Availability, 95% Performance, and 99.9% Quality). Typical manufacturing plants operate between 60% and 70% OEE. Operations below 50% OEE indicate substantial hidden capacity trapped by chronic downtime and micro-stops.",
    },
    {
        question: "How do you calculate cycle time vs takt time on a production machine?",
        answer: "Cycle Time is the actual time required for a machine to complete one full part cycle (Seconds per Part = Available Operating Seconds ÷ Total Parts Produced). Takt Time is the customer demand pace (Available Production Time ÷ Customer Order Demand). If machine cycle time exceeds takt time, the equipment cannot satisfy customer shipments without overtime.",
    },
    {
        question: "What are the Six Big Losses in machine productivity?",
        answer: "Under Total Productive Maintenance (TPM), the Six Big Losses are: 1. Equipment Breakdown (unplanned downtime), 2. Setup and Tool Adjustments, 3. Micro-stops and Idling (under 5 minutes), 4. Reduced Operating Speed, 5. Startup and Warm-up Rejects, and 6. In-process Quality Scrap. Eliminating these losses directly drives OEE from 60% to 85%+.",
    },
    {
        question: "How does unplanned machine downtime impact unit production cost?",
        answer: "Unplanned downtime reduces total output volume across fixed overhead costs (equipment depreciation, facility leasing, operator standby payroll). For a precision CNC machine burdened at $120/hr, two hours of unplanned spindle downtime not only wastes $240 in unabsorbed machine cost, but also sacrifices 40 finished parts valued at $2,000+ in lost billing margin.",
    },
];
