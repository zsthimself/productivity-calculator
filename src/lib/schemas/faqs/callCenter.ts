/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 callCenterFaqs
 * [POS]: src/lib/schemas/faqs/callCenter.ts 呼叫中心与客户支持垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const callCenterFaqs: FAQItem[] = [
    {
        question: "How is call center agent productivity calculated?",
        answer: "Call center productivity is calculated by measuring agent occupancy: Occupancy % = (Talk Time + Hold Time + Wrap-up ACW) ÷ Logged-in Available Time × 100, alongside throughput KPIs such as Calls Per Hour (CPH), Average Handle Time (AHT), and First Contact Resolution (FCR).",
    },
    {
        question: "What is the difference between occupancy and utilization in a call center?",
        answer: "Occupancy measures how busy an agent is while logged into the queue ready for calls: (Handling Time ÷ Available Time) × 100. Utilization measures how much of the paid scheduled shift was spent logged in: (Logged-in Time ÷ Total Shift Time) × 100. Occupancy reflects call workload, while utilization reflects schedule adherence.",
    },
    {
        question: "What is an ideal occupancy rate for call center agents?",
        answer: "The industry standard for agent occupancy is 75% to 85%. Below 70% indicates overstaffing and excessive idle waiting time. Above 88% causes back-to-back calls without rest, leading to agent cognitive fatigue and elevated employee churn.",
    },
    {
        question: "What is shrinkage in a call center and what is an acceptable rate?",
        answer: "Shrinkage is the percentage of paid working time when agents are unavailable for customer calls. It includes internal shrinkage (breaks, 1-on-1 coaching, training) and external shrinkage (PTO, vacation, sick leave). Standard contact center shrinkage ranges between 25% and 35%.",
    },
    {
        question: "How do you calculate calls per hour (CPH)?",
        answer: "Calls Per Hour is calculated as: CPH = Total Calls Handled ÷ On-Queue Working Hours. For example, handling 64 calls over an 8-hour shift results in an average throughput of 8.0 CPH.",
    },
    {
        question: "How does average handle time (AHT) impact call center productivity?",
        answer: "Average Handle Time (talk time + hold time + ACW) dictates required headcount. Reducing AHT by 30 seconds across a 50-agent desk handling 2,500 daily calls saves 20 labor hours per day, unlocking extra queue capacity without hiring additional staff.",
    },
];
