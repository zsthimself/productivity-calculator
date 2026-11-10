/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 agricultureFaqs
 * [POS]: src/lib/schemas/faqs/agriculture.ts 农业耕作、田间农机与农场经营垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const agricultureFaqs: FAQItem[] = [
    {
        question: "What is the formula for calculating agriculture productivity?",
        answer: "Agricultural productivity is evaluated across three core operational dimensions: 1) Land & Biological Yield = Total Harvested Production (bushels, lbs, or tons) ÷ Total Harvested Acreage; 2) Machinery Effective Field Capacity (EFC) = [Implement Width (ft) × Ground Speed (mph) × Field Efficiency (%)] ÷ 8.25; and 3) Economic Operating Margin = (Gross Crop Revenue - Total Operating Costs) ÷ Total Acreage. Modern agribusiness combines biological, mechanical, and financial metrics to optimize total factor productivity.",
    },
    {
        question: "How do you calculate crop yield per acre and agricultural labor productivity?",
        answer: "Crop yield per acre is calculated as total harvested commodity volume divided by harvested land area. For instance, harvesting 240,000 bushels of corn across 1,200 acres results in a crop yield of 200 bushels per acre. Agricultural labor productivity measures physical or monetary output per field labor hour: Labor Efficiency = Total Harvested Production ÷ Total Direct Farm Labor Hours worked during field prep, chemical application, and combine harvesting.",
    },
    {
        question: "What is Effective Field Capacity (EFC) and how does ASABE define it?",
        answer: "Effective Field Capacity (EFC) measures the actual field area an agricultural implement covers per hour under real field conditions, expressed in acres per hour (ac/hr). Defined by the American Society of Agricultural and Biological Engineers (ASABE Standards D497), the formula is EFC = (Width in ft × Speed in mph × Field Efficiency %) ÷ 8.25. Field efficiency typically ranges from 70% to 85% for combines, 65% to 80% for row planters, and 60% to 75% for field sprayers.",
    },
    {
        question: "How do farm managers calculate breakeven yield and operating gross margin per acre?",
        answer: "Breakeven yield determines the minimum commodity production required per acre to cover all direct crop inputs and field operating expenses: Breakeven Yield = Total Operating Cost Per Acre ($) ÷ Expected Market Price Per Unit ($/bu). Operating Gross Margin is calculated as Gross Revenue Per Acre minus Direct Operating Costs (seed, fertilizer, chemical crop protection, diesel fuel, machinery drying, and land rent).",
    },
    {
        question: "What are typical USDA crop yield benchmarks for major commercial crops?",
        answer: "According to USDA Economic Research Service (ERS) and NASS national surveys, commercial US crop yield averages include: Corn (173 - 225 bushels/acre), Soybeans (50 - 64 bushels/acre), Winter Wheat (52 - 82 bushels/acre), Cotton (840 - 1,120 lbs lint/acre), and Commercial Orchard Apples (28,000 - 45,000 lbs/acre). Regional yields fluctuate based on soil organic matter, irrigation access, drainage, and growing degree days.",
    },
    {
        question: "How does precision agriculture technology increase farm productivity and input efficiency?",
        answer: "Precision agriculture enhances farm productivity by eliminating input waste and overlapping passes. Key technologies include: RTK GPS auto-guidance systems that reduce row overlap by 4% to 8%; variable rate technology (VRT) that applies fertilizer and seed based on soil electrical conductivity and historical yield maps; telematics for machinery fleet idling reduction; and optical drone/satellite multispectral imaging that detects crop water stress and pest pressure days before visible symptoms appear.",
    },
];
