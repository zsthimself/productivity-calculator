/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 restaurantFaqs
 * [POS]: src/lib/schemas/faqs/restaurant.ts 餐饮门店经营、RevPASH 与餐厅人工成本垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const restaurantFaqs: FAQItem[] = [
    {
        question: "What is the formula for calculating restaurant productivity and RevPASH?",
        answer: "Restaurant productivity is fundamentally measured through Revenue Per Available Seat Hour (RevPASH): RevPASH = Total Food & Beverage Revenue ($) ÷ Available Seat Hours, where Available Seat Hours equals Total Dining Seats multiplied by Operating Service Hours. For example, generating $4,800 across 80 seats over a 4-hour dinner service yields a RevPASH of $15.00 ($4,800 ÷ 320 seat-hours). Complementary metrics include Sales Per Labor Hour (SPLH = Gross Sales ÷ Total Labor Hours) and Table Turnover Rate (Total Covers ÷ Total Dining Seats).",
    },
    {
        question: "How do you calculate restaurant labor cost percentage and prime cost?",
        answer: "Restaurant Labor Cost Percentage is calculated by dividing total labor expenses (hourly wages, salaried management, overtime, payroll taxes, employee benefits, and workers' compensation) by total gross food and beverage sales: Labor Cost % = Total Payroll & Benefits ($) ÷ Gross Sales ($) × 100. Prime Cost combines labor costs with Cost of Goods Sold (COGS): Prime Cost = Total Labor ($) + Food & Beverage COGS ($). Prime cost percentage should strictly remain below 55% to 60% of gross revenue for profitable restaurant operations.",
    },
    {
        question: "What is RevPASH and what is a good restaurant benchmark?",
        answer: "RevPASH (Revenue Per Available Seat Hour), developed by the Cornell University School of Hotel Administration, integrates seat occupancy with dining duration and average guest spend. Healthy RevPASH benchmarks vary by restaurant concept: Fast-Casual restaurants target $22 to $45/seat-hour due to rapid 20-minute transactions; Casual Dining concepts aim for $16 to $28/seat-hour with 45-to-60-minute meal durations; and Fine Dining bistros average $12 to $22/seat-hour driven by high average check sizes despite 90-to-120-minute table turn times.",
    },
    {
        question: "How do table turn times affect restaurant seating productivity and daily covers?",
        answer: "Table turn time represents the complete cycle duration from guest seating to table clearing and sanitization. Reducing average table turn time by just 12 minutes during peak dinner service (e.g. from 75 minutes down to 63 minutes) can unlock an additional 0.4 to 0.7 turns per table per evening. In an 80-seat restaurant with a $35 average guest check, a 0.5 turn increase generates 40 additional covers per night—producing $1,400 in incremental daily gross revenue or over $42,000 monthly with zero added square footage.",
    },
    {
        question: "What are standard restaurant labor cost benchmarks for front-of-house and back-of-house staff?",
        answer: "According to National Restaurant Association (NRA) industry surveys, standard restaurant labor cost benchmarks range between 28% and 34% of total sales. Typically, Back-of-House (BOH kitchen staff, dishwashers, and prep cooks) accounts for 14% to 18%, Front-of-House (FOH servers, hosts, and bartenders) represents 10% to 13% (varying by tip-credit state legislation), and salaried restaurant management consumes 4% to 6%. Operating above 35% labor cost indicates staffing overcapacity, prep scheduling inefficiencies, or low sales volume.",
    },
    {
        question: "How can restaurant operators increase kitchen ticket throughput and reduce food waste?",
        answer: "Operators optimize kitchen velocity and curb waste through five lean hospitality protocols: 1) Deploying kitchen display systems (KDS) with color-coded ticket firing timers to maintain cook times under 10 to 14 minutes; 2) Implementing prep batch sheets tied to POS historical sales forecasts; 3) Cross-training line cooks on sauté, grill, and expo stations to absorb peak ticket surges; 4) Auditing trim waste and plate scrapings weekly to keep food waste below 3% to 4% of food purchases; and 5) Standardizing portion scoops and digital scales across line stations.",
    },
];
