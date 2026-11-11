/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 billingUnitsFaqs
 * [POS]: src/lib/schemas/faqs/billingUnits.ts 医疗与康复 8 分钟计费单元 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const billingUnitsFaqs: FAQItem[] = [
    {
        question: "How is a billing units calculator used under the Medicare 8-Minute Rule?",
        answer: "A billing units calculator adds up all direct one-on-one timed treatment minutes delivered during a patient visit and applies Medicare's 8-minute threshold: you must provide at least 8 total timed minutes to bill 1 unit, then each additional 15-minute midpoint adds another unit. The exact formula is Units = FLOOR((Minutes + 7) / 15) for any total of 8 minutes or more.",
    },
    {
        question: "How many billing units is 55 minutes or 60 minutes?",
        answer: "Under the Medicare 8-Minute Rule, both 55 minutes and 60 minutes equal 4 billable units because the 4-unit bracket spans 53 through 67 total timed minutes. You only advance to 5 billable units when cumulative direct timed treatment reaches 68 minutes or longer.",
    },
    {
        question: "What is the Medicare 8-minute rule formula for Excel?",
        answer: "To convert total timed minutes in cell A2 into Medicare 8-minute rule billing units in Excel or Google Sheets, enter =IF(A2<8,0,INT((A2+7)/15)). For example, A2 = 7 returns 0 units, A2 = 8 returns 1 unit, A2 = 38 returns 3 units, and A2 = 55 returns 4 units. Multiply units by 0.25 (=B2*0.25) to convert units into decimal billing hours.",
    },
    {
        question: "What is the difference between the Medicare 8-Minute Rule and the AMA rule?",
        answer: "Medicare (CMS) pools all timed CPT minutes together to determine total allowed units first, and can allocate leftover minutes across mixed codes (the remainder rule). Commercial insurers using AMA Substantial Portion Methodology (SPM) evaluate each CPT code separately without pooling small leftovers, though 8 minutes per individual code still meets the threshold for 1 unit.",
    },
    {
        question: "How do remainder minutes work when billing multiple CPT codes?",
        answer: "When you deliver multiple timed services (for example, 20 minutes of 97110 and 18 minutes of 97140), first pool the total (38 minutes = 3 Medicare units). Next, assign 1 full 15-minute unit per service (1 unit 97110 leaving 5 minutes; 1 unit 97140 leaving 3 minutes). Because 5 is the largest remainder, the third unit is billed under 97110 (2 units 97110 + 1 unit 97140).",
    },
    {
        question: "Do untimed evaluation codes count toward timed billing units?",
        answer: "No. Untimed CPT codes such as PT evaluations (97161-97163), OT evaluations (97165-97167), and mechanical traction (97012) are always billed as 1 flat unit regardless of session length. Only timed direct one-on-one procedure codes count toward cumulative 8-minute rule minutes.",
    },
];
