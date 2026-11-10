/**
 * [INPUT]: 依赖 @/types/industry 的 IndustryData, 依赖 ./schemas/meta 与 ./schemas/faqs
 * [OUTPUT]: 导出 generateIndustrySchema 函数，构建 WebApplication、BreadcrumbList 与 FAQPage 结构化数据
 * [POS]: src/lib/industrySchemas.ts 专注于结构化数据构建入口，通过微模块解耦保持单文件精炼（<100行）
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { IndustryData } from "@/types/industry";
import { getIndustryMeta } from "./schemas/meta";
import { getIndustryFaqs } from "./schemas/faqs";

export function generateIndustrySchema(
    industry: IndustryData,
    baseUrl: string = "https://productivitycalculator.work"
) {
    const pageUrl = `${baseUrl}/calculator/${industry.slug}`;
    const meta = getIndustryMeta(industry.slug, industry.title, industry.description);
    const faqs = getIndustryFaqs(industry.slug);

    const schemas: Record<string, unknown>[] = [
        {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: meta.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web Browser",
            url: pageUrl,
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
            },
            description: meta.description,
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: baseUrl,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: `${baseUrl}/#industries`,
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: meta.name,
                    item: pageUrl,
                },
            ],
        },
    ];

    if (faqs.length > 0) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            })),
        });
    }

    return schemas;
}
