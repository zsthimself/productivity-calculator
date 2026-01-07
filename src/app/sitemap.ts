/**
 * @OUTPUT: sitemap.xml - 动态生成的网站地图
 * @POS: SEO基础设施 - 帮助搜索引擎发现所有页面
 *
 * @SYNC: industries.json 变更时需确保本文件仍能正确生成所有行业页面
 */
import { MetadataRoute } from "next";
import industries from "@/data/industries.json";
import { IndustryData } from "@/types/industry";

const BASE_URL = "https://productivitycalculator.work";

export default function sitemap(): MetadataRoute.Sitemap {
    const industryData = industries as IndustryData[];

    // 首页
    const homepage: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
    ];

    // 行业页面
    const industryPages: MetadataRoute.Sitemap = industryData
        .filter((industry) => industry.slug !== "general")
        .map((industry) => ({
            url: `${BASE_URL}/calculator/${industry.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }));

    return [...homepage, ...industryPages];
}
