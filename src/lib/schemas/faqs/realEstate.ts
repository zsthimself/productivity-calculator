/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 realEstateFaqs
 * [POS]: src/lib/schemas/faqs/realEstate.ts 房地产经纪人效、佣金分账与带看成交率垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const realEstateFaqs: FAQItem[] = [
    {
        question: "What is the formula for calculating real estate agent productivity?",
        answer: "Real estate agent productivity is evaluated across three primary dimensions: 1) Gross Commission Income (GCI) = Total Closed Transaction Sales Volume ($) × Average Commission Rate %; 2) Showing Conversion Efficiency = Total Closed Escrows ÷ Total In-Person Property Showings; and 3) Effective Hourly Earnings = Net Take-Home Commission (after brokerage splits, desk fees, and marketing spend) ÷ Total Annual Working Hours. Elite producing realtors track transaction velocity per active working hour rather than just gross sales volume.",
    },
    {
        question: "How do brokerage commission splits work and what are standard industry splits?",
        answer: "A real estate commission split dictates how gross transaction commissions are divided between the licensed agent and the sponsoring brokerage. Common split structures include: 70/30 (agent keeps 70%, brokerage receives 30%), 80/20, or 100% flat-fee models where the agent pays a fixed monthly desk fee (typically $500 to $1,500/month) plus a per-transaction fee (e.g. $350 to $500) once an annual company dollar cap (often $18,000 to $25,000) is satisfied.",
    },
    {
        question: "What is a healthy lead conversion rate for real estate agents?",
        answer: "Lead conversion benchmarks vary dramatically by lead generation channel: Sphere of Influence (SOI) and past client referrals convert at 12% to 22%; direct open house sign-in visitors convert at 3% to 6%; and cold digital portal leads (such as Zillow Premier Agent or Realtor.com) average 1.5% to 3.5%. Top-tier realtors maintain a blended database conversion rate of 5% to 8% through consistent multi-channel CRM nurture cadences.",
    },
    {
        question: "How many property showings does it typically take to close a real estate deal?",
        answer: "According to National Association of Realtors (NAR) operational surveys, buyer clients tour an average of 9 to 15 homes before submitting an accepted offer in balanced markets. In highly competitive seller markets with low inventory, showings per closed transaction decrease to 5 to 8 homes, while in buyer markets with abundant choices, showings can expand to 16 to 22 properties per successful closing.",
    },
    {
        question: "What is the average income and effective hourly wage for full-time real estate agents?",
        answer: "The median gross income for full-time realtors with over four years of experience is approximately $85,000, while top-producing solo agents exceed $250,000 to $500,000 in net GCI. Because full-time agents work between 1,800 and 2,200 hours annually (including evening showings and weekend open houses), effective hourly earnings range from $38 to $55/hour for mid-tier producers, surpassing $120 to $280/hour for elite luxury listing specialists.",
    },
    {
        question: "How can real estate agents maximize their productivity and commission ROI?",
        answer: "Realtors maximize productivity through five proven strategies: 1) Shifting their business mix toward listing representation (sellers require 15 to 20 hours of agent time per transaction versus 35 to 50 hours for buyers); 2) Pre-qualifying buyers with strict mortgage lender pre-approval letters and video tour reviews before scheduling physical showings; 3) Establishing geographic farming density to slash driving windshield time; 4) Time-blocking 9:00 AM to 11:30 AM daily for uninterrupted lead generation prospecting; and 5) Outsourcing contract-to-close paperwork to a certified transaction coordinator.",
    },
];
