/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 generalFaqs
 * [POS]: src/lib/schemas/faqs/general.ts 全行业通用生产力基准、全要素生产率 TFP、多维投入产出基线模型 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const generalFaqs: FAQItem[] = [
    {
        question: "What is the universal formula for calculating business productivity?",
        answer: "The universal baseline formula for productivity is: Productivity = Total Output ÷ Total Input. Output can be measured in physical units produced, customer deliverables completed, or dollar revenue generated ($). Input is commonly measured in labor hours worked, full-time equivalent (FTE) headcount, or monetary production expenses. Measuring output per unit of input provides a standardized benchmark to track operational efficiency gains across quarterly operating cycles.",
    },
    {
        question: "What is the difference between single-factor and total factor productivity (TFP)?",
        answer: "Single-factor productivity isolates one specific operational resource—most commonly labor hours (Output ÷ Labor Hours) or machine runtime (Output ÷ Machine Hours). In contrast, Total Factor Productivity (TFP), often calculated via the Cobb-Douglas production function, measures output generated relative to the joint bundle of all physical inputs (Labor, Capital equipment, Software, and Materials). TFP represents the 'Solow residual'—capturing technological innovation, organizational design, and managerial efficiency.",
    },
    {
        question: "How does the Bureau of Labor Statistics (BLS) measure labor productivity?",
        answer: "The US Bureau of Labor Statistics (BLS) measures labor productivity by comparing real output (measured as inflation-adjusted value-added gross domestic product or business sector revenue) to the total sum of hours worked by all employed persons: Labor Productivity Index = Real Output Index ÷ Labor Hours Index. Across the US nonfarm business sector, labor productivity has historically grown at an annualized rate of 1.4% to 2.1% over multi-decade business cycles.",
    },
    {
        question: "What is a healthy productivity growth rate for commercial enterprises?",
        answer: "While macroeconomic GDP productivity growth averages 1.2% to 2.0% annually, high-performing commercial enterprises and growth-stage companies target 4.0% to 8.0% annual productivity gains. Modern software, automated logistics, and technology-enabled services often achieve 10% to 15%+ annual productivity gains through workflow automation, eliminating manual data entry, and improving organizational communication loops.",
    },
    {
        question: "How do you calculate multifactor productivity (MFP) across labor and capital?",
        answer: "Multifactor Productivity (MFP) is calculated by dividing total enterprise value-added output by the weighted combination of labor compensation and capital services costs: MFP = Net Value Added ($) ÷ ((Labor Share × Total Labor Cost) + (Capital Share × Capital Depreciation & Software Expenses)). An MFP ratio greater than 1.0 indicates that an enterprise generates more economic value than the combined cost of its workforce and physical asset base.",
    },
    {
        question: "What are the most effective strategies for improving enterprise productivity?",
        answer: "Executive leadership optimizes cross-departmental productivity through five evidence-based managerial levers: 1) Deploying asynchronous documentation and knowledge repositories to eliminate low-value recurring status meetings; 2) Automating repetitive data transfers between CRM, ERP, and billing platforms; 3) Establishing transparent, measurable KPIs tied to customer value rather than vanity activity metrics; 4) Investing in employee upskilling and modern tooling; and 5) Conducting quarterly post-mortems to identify and dismantle organizational bureaucracy.",
    },
];
