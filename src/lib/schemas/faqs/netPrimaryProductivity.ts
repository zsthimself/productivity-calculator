/**
 * [INPUT]: 依赖 ./types 的 FAQItem 接口
 * [OUTPUT]: 导出 netPrimaryProductivityFaqs 问答数组
 * [POS]: src/lib/schemas/faqs/netPrimaryProductivity.ts 为 /calculator/net-primary-productivity 提供 FAQPage 结构化数据
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { FAQItem } from "./types";

export const netPrimaryProductivityFaqs: FAQItem[] = [
    {
        question: "What is the formula for Net Primary Productivity (NPP)?",
        answer: "Net Primary Productivity is calculated as NPP = GPP - R, where GPP is Gross Primary Productivity (total photosynthetic carbon or energy fixed) and R is autotrophic cellular respiration expended by producers."
    },
    {
        question: "What is the difference between GPP and NPP?",
        answer: "GPP (Gross Primary Productivity) measures total organic matter or energy captured by plants during photosynthesis, whereas NPP (Net Primary Productivity) subtracts the energy plants burn for respiration, leaving only the new biomass available to consumers."
    },
    {
        question: "How do you calculate NPP using the light and dark bottle method?",
        answer: "In aquatic dissolved oxygen labs, NPP = Light Bottle DO - Initial Bottle DO, Respiration (R) = Initial DO - Dark Bottle DO, and GPP = Light Bottle DO - Dark Bottle DO. Multiplying mg O2/L by 0.375 converts oxygen production to approximate carbon fixed (mg C/L)."
    },
    {
        question: "Which biome has the highest Net Primary Productivity?",
        answer: "Tropical rainforests and estuarine coral reefs exhibit the highest NPP per square meter (typically 1,500 to 2,200+ g/m²/yr) due to year-round warm temperatures, abundant moisture or nutrients, and high solar radiation."
    },
    {
        question: "Can Net Primary Productivity be negative?",
        answer: "Yes. During winter dormancy, extreme drought, or heavy cloud cover in aquatic samples, autotrophic respiration (R) can temporarily exceed photosynthesis (GPP), resulting in negative NPP until light or temperature conditions recover."
    }
];
