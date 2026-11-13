/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 totalFactorProductivityFaqs
 * [POS]: src/lib/schemas/faqs/totalFactorProductivity.ts 全要素生产率 TFP 与多要素生产率 MFP 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const totalFactorProductivityFaqs: FAQItem[] = [
    {
        question: "What does a total factor productivity calculator measure?",
        answer: "A total factor productivity calculator solves for Total Factor Productivity (A) in the Cobb-Douglas production function Y = A * K^alpha * L^(1 - alpha). It quantifies how efficiently an economy, factory, or firm converts combined capital and labor into economic output beyond raw input volume.",
    },
    {
        question: "What is the difference between Total Factor Productivity (TFP) and Multifactor Productivity (MFP)?",
        answer: "In economics and BLS/OECD reporting, Total Factor Productivity (TFP) and Multifactor Productivity (MFP) refer to the same core concept: output growth unexplained by measured capital, labor, energy, materials, and purchased services. Many statisticians use a multifactor productivity calculator with KLEMS cost ratios for enterprise operations while economists use Cobb-Douglas TFP.",
    },
    {
        question: "What is the standard alpha capital share parameter in Cobb-Douglas TFP?",
        answer: "Macroeconomic studies such as Penn World Table and Federal Reserve growth accounting typically set capital income share alpha between 0.30 and 0.40 (meaning labor share 1 - alpha sits around 0.60 to 0.70). Capital-intensive sectors like semiconductors or utilities often use 0.40 to 0.50.",
    },
    {
        question: "What is the Solow Residual in growth accounting?",
        answer: "The Solow Residual is the percentage change in Total Factor Productivity: %ΔA = %ΔY - (alpha * %ΔK) - ((1 - alpha) * %ΔL). A positive residual indicates genuine process innovation, software automation, or organizational skill rather than simply hiring more staff or buying extra machinery.",
    },
    {
        question: "How do I calculate multifactor productivity in Excel?",
        answer: "Put Total Real Output in A2, Capital Input in B2, Labor Input in C2, and Capital Share alpha in D2. To compute Cobb-Douglas TFP enter =A2/((B2^D2)*(C2^(1-D2))). For cost-based MFP enter =A2/(B2+C2+E2) where E2 holds materials and energy.",
    },
    {
        question: "Can Total Factor Productivity growth be negative?",
        answer: "Yes. If capital expenditure or payroll costs rise rapidly while real revenue or unit output remains flat or falls—common during ERP migrations, supply chain disruptions, or factory ramp-ups—Solow Residual growth becomes negative until utilization stabilizes.",
    },
];
