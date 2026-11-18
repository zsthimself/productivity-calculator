/**
 * [INPUT]: FAQItem 类型
 * [OUTPUT]: 导出 eightMinuteRuleFaqs 问答数组
 * [POS]: src/lib/schemas/faqs/eightMinuteRule.ts 为 /calculator/8-minute-rule 提供 FAQPage 结构化数据
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { FAQItem } from "./types";

export const eightMinuteRuleFaqs: FAQItem[] = [
  {
    question: "How does the Medicare 8 minute rule calculator determine billable units?",
    answer:
      "Under CMS Medicare Part B rules, you must provide at least 8 minutes of direct one-on-one timed service to bill 1 unit. Each additional 15-minute unit unlocks at 23 minutes (2 units), 38 minutes (3 units), 53 minutes (4 units), and 68 minutes (5 units).",
  },
  {
    question: "What happens if I provide 7 minutes of a timed CPT code?",
    answer:
      "If 7 minutes is the only timed service delivered in the entire visit, 0 units are billable. However, if you also delivered another timed code (such as 16 minutes of 97110), CMS sums all timed minutes (7 + 16 = 23 minutes), unlocking 2 total allowable units.",
  },
  {
    question: "How do I allocate units when billing multiple CPT codes under the 8-minute rule?",
    answer:
      "First sum all timed minutes to find the total allowable units for the visit. Assign 1 unit for every full 15-minute block of each code, then award any remaining allowable units to the CPT codes with the largest leftover minute remainders.",
  },
  {
    question: "Do untimed evaluation codes count toward 8-minute rule minutes?",
    answer:
      "No. Untimed CPT codes such as Physical Therapy Evaluation (97161–97163), Re-evaluation (97164), or Hot/Cold Packs (97010) are billed as 1 flat unit per visit and are excluded from your timed-minute total.",
  },
  {
    question: "What is the difference between the CMS 8-minute rule and AMA Rule of Eights?",
    answer:
      "Medicare pools all timed minutes together across CPT codes before rounding, whereas the AMA CPT Rule of Eights evaluates each timed code independently. For example, two separate 10-minute codes equal 1 total unit under Medicare (20 min < 23 min) but 2 units under AMA rules.",
  },
  {
    question: "How many units is 45 minutes under the 8-minute rule?",
    answer:
      "45 total timed minutes falls in the 38 to 52-minute bracket, which equals 3 billable Medicare units.",
  },
];
