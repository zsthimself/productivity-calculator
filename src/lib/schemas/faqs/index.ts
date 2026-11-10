/**
 * [INPUT]: 依赖 ./types 的 FAQItem 及各垂直行业 FAQ 模块
 * [OUTPUT]: 导出 getIndustryFaqs 函数
 * [POS]: src/lib/schemas/faqs/index.ts 作为 FAQPage 结构化问答总路由器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";
import { physicalTherapyFaqs } from "./physicalTherapy";
import { manufacturingFaqs } from "./manufacturing";
import { laborFaqs } from "./labor";
import { employeeFaqs } from "./employee";
import { videoProductionFaqs } from "./videoProduction";
import { callCenterFaqs } from "./callCenter";
import { logisticsFaqs } from "./logistics";
import { cleaningServicesFaqs } from "./cleaningServices";
import { healthcareFaqs } from "./healthcare";
import { weldingFaqs } from "./welding";
import { technicianFaqs } from "./technician";
import { machineFaqs } from "./machine";
import { salesFaqs } from "./sales";
import { constructionFaqs } from "./construction";
import { dataEntryFaqs } from "./dataEntry";

export function getIndustryFaqs(slug: string): FAQItem[] {
    switch (slug) {
        case "physical-therapy":
            return physicalTherapyFaqs;
        case "manufacturing":
            return manufacturingFaqs;
        case "labor":
            return laborFaqs;
        case "employee":
            return employeeFaqs;
        case "video-production":
            return videoProductionFaqs;
        case "call-center":
            return callCenterFaqs;
        case "logistics":
            return logisticsFaqs;
        case "cleaning-services":
            return cleaningServicesFaqs;
        case "healthcare":
            return healthcareFaqs;
        case "welding":
            return weldingFaqs;
        case "technician":
            return technicianFaqs;
        case "machine":
            return machineFaqs;
        case "sales":
            return salesFaqs;
        case "construction":
            return constructionFaqs;
        case "data-entry":
            return dataEntryFaqs;
        default:
            return [];
    }
}
