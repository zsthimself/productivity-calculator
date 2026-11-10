/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 导出 FAQItem 结构化数据类型
 * [POS]: src/lib/schemas/faqs/types.ts 统一定义各行业 FAQPage 的标准输入格式
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export interface FAQItem {
    question: string;
    answer: string;
}
