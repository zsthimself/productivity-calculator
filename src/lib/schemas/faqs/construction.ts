/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 constructionFaqs
 * [POS]: src/lib/schemas/faqs/construction.ts 建筑工程与施工班组垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const constructionFaqs: FAQItem[] = [
    {
        question: "How do you calculate construction labor productivity?",
        answer: "Construction labor productivity is calculated as the ratio of work units completed to total labor hours expended: Productivity Rate = Output Units ÷ Total Man-Hours worked (e.g., cubic yards of concrete per man-hour, square feet of drywall per hour). Estimators also calculate the inverse Unit Rate: Man-Hours per Unit (mh/unit = Total Labor Hours ÷ Output Units), which directly dictates jobsite labor pricing.",
    },
    {
        question: "What are standard labor productivity rates in construction?",
        answer: "Standard industry benchmarks derived from RSMeans and CII (Construction Industry Institute) include: 1. Concrete Slab Pouring & Finishing: 0.8 to 1.2 man-hours per cubic yard (0.83–1.25 yd³/mh); 2. Brick & Block Masonry: 12 to 16 man-hours per 1,000 standard bricks (62–83 bricks/mh); 3. Structural Steel Erection: 8 to 14 man-hours per ton; 4. Commercial Drywall & Metal Framing: 25 to 35 square feet per man-hour (0.028–0.040 mh/sq ft).",
    },
    {
        question: "How do you measure crew productivity and daily velocity on a jobsite?",
        answer: "Crew daily velocity measures the total physical production a specialized crew completes during one standard shift: Daily Crew Output = Crew Size × Working Shift Hours × Average Productivity Rate (Units/mh). Dividing remaining project scope by daily crew velocity yields the net working days required, enabling project managers to detect schedule slippage before critical path milestones are compromised.",
    },
    {
        question: "What is the Cost Performance Index (CPI) in construction projects?",
        answer: "The Cost Performance Index (CPI) is an Earned Value Management (EVM) metric indicating labor cost efficiency: CPI = Earned Value (EV) ÷ Actual Cost (AC), where Earned Value is budgeted cost of work completed and Actual Cost is incurred payroll. A CPI greater than 1.0 indicates work is completing under budget; a CPI below 1.0 alerts superintendents that labor overruns are eroding project contingency.",
    },
    {
        question: "What are the primary causes of low productivity on construction jobsites?",
        answer: "Research by the Construction Industry Institute (CII) shows the top five productivity drains are: 1. Crew stacking and trade trade congestion (loss of 15%–30% efficiency); 2. Material handling and horizontal/vertical travel delays (up to 40% non-wrench time); 3. Rework due to drawing conflicts or design RFIs; 4. Inadequate supervisor daily planning; and 5. Adverse weather disruptions without staging contingencies.",
    },
    {
        question: "How can general contractors improve construction labor productivity using Lean Construction?",
        answer: "Contractors achieve 20% to 35% productivity gains by adopting Lean Construction principles: 1. Prefabrication and modular sub-assemblies to shift hazardous jobsite work into controlled factory conditions; 2. The Last Planner System (LPS) with daily 15-minute subcontractor huddles; 3. Just-In-Time (JIT) material delivery directly to installation floors; 4. 5S jobsite organization to minimize walking waste; and 5. Digital mobile time-tracking to record production quantities daily.",
    },
];
