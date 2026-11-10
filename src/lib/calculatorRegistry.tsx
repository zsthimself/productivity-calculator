/**
 * [INPUT]: 依赖各垂直行业专用的交互式计算器与深度 SEO 内容组件
 * [OUTPUT]: 导出 IndustrySuiteDefinition 接口与 getIndustrySuite 路由注册表函数
 * [POS]: src/lib/calculatorRegistry.tsx 解耦 slug 路由与组件/元数据绑定，严格控制 page.tsx < 300 行
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from "react";
import PhysicalTherapyCalculator from "@/components/PhysicalTherapyCalculator";
import PhysicalTherapySeoContent from "@/components/PhysicalTherapySeoContent";
import ManufacturingCalculator from "@/components/ManufacturingCalculator";
import ManufacturingSeoContent from "@/components/ManufacturingSeoContent";
import LaborProductivityCalculator from "@/components/LaborProductivityCalculator";
import LaborProductivitySeoContent from "@/components/LaborProductivitySeoContent";
import EmployeeProductivityCalculator from "@/components/EmployeeProductivityCalculator";
import EmployeeProductivitySeoContent from "@/components/EmployeeProductivitySeoContent";
import VideoProductionCalculator from "@/components/VideoProductionCalculator";
import VideoProductionSeoContent from "@/components/VideoProductionSeoContent";
import CallCenterProductivityCalculator from "@/components/CallCenterProductivityCalculator";
import CallCenterProductivitySeoContent from "@/components/CallCenterProductivitySeoContent";
import { LogisticsProductivityCalculator } from "@/components/LogisticsProductivityCalculator";
import LogisticsProductivitySeoContent from "@/components/LogisticsProductivitySeoContent";
import { CleaningServicesProductivityCalculator } from "@/components/CleaningServicesProductivityCalculator";
import CleaningServicesProductivitySeoContent from "@/components/CleaningServicesProductivitySeoContent";
import { HealthcareProductivityCalculator } from "@/components/HealthcareProductivityCalculator";
import HealthcareProductivitySeoContent from "@/components/HealthcareProductivitySeoContent";
import WeldingProductivityCalculator from "@/components/WeldingProductivityCalculator";
import WeldingProductivitySeoContent from "@/components/WeldingProductivitySeoContent";
import TechnicianProductivityCalculator from "@/components/TechnicianProductivityCalculator";
import TechnicianProductivitySeoContent from "@/components/TechnicianProductivitySeoContent";
import MachineProductivityCalculator from "@/components/MachineProductivityCalculator";
import MachineProductivitySeoContent from "@/components/MachineProductivitySeoContent";
import ConstructionProductivityCalculator from "@/components/ConstructionProductivityCalculator";
import ConstructionProductivitySeoContent from "@/components/ConstructionProductivitySeoContent";
import SalesProductivityCalculator from "@/components/SalesProductivityCalculator";
import SalesProductivitySeoContent from "@/components/SalesProductivitySeoContent";
import DataEntryProductivityCalculator from "@/components/DataEntryProductivityCalculator";
import DataEntryProductivitySeoContent from "@/components/DataEntryProductivitySeoContent";
import MarketingProductivityCalculator from "@/components/MarketingProductivityCalculator";
import MarketingProductivitySeoContent from "@/components/MarketingProductivitySeoContent";
import RetailProductivityCalculator from "@/components/RetailProductivityCalculator";
import RetailProductivitySeoContent from "@/components/RetailProductivitySeoContent";
import AgricultureProductivityCalculator from "@/components/AgricultureProductivityCalculator";
import AgricultureProductivitySeoContent from "@/components/AgricultureProductivitySeoContent";
import RestaurantProductivityCalculator from "@/components/RestaurantProductivityCalculator";
import RestaurantProductivitySeoContent from "@/components/RestaurantProductivitySeoContent";
import SoftwareDevelopmentProductivityCalculator from "@/components/SoftwareDevelopmentProductivityCalculator";
import SoftwareDevelopmentSeoContent from "@/components/SoftwareDevelopmentSeoContent";
import RealEstateProductivityCalculator from "@/components/RealEstateProductivityCalculator";
import RealEstateProductivitySeoContent from "@/components/RealEstateProductivitySeoContent";

export interface IndustrySuiteDefinition {
    badgeText: string;
    titlePrefix: string;
    titleSuffix?: string;
    subtitle: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    Calculator: React.ComponentType;
    SeoContent: React.ComponentType;
}

const REGISTRY: Record<string, IndustrySuiteDefinition> = {
    "physical-therapy": {
        badgeText: "Physical Therapy Clinical Suite",
        titlePrefix: "Physical Therapy",
        subtitle: "Clinical physical therapy productivity calculator, reverse clock-out planner, and Medicare 8-minute rule converter for PT, OT & SLP clinicians.",
        metaTitle: "Physical Therapy Productivity Calculator | PT & OT",
        metaDescription: "Free physical therapy productivity calculator for PT, OT, and therapists. Calculate clinical productivity percentage, treatment minutes, lunch break, and target hours.",
        keywords: [
            "physical therapy productivity calculator",
            "pt productivity calculator",
            "occupational therapy productivity calculator",
            "ot productivity calculator",
            "slp productivity calculator",
            "productivity calculator for physical therapy",
            "productivity calculator",
        ],
        Calculator: PhysicalTherapyCalculator,
        SeoContent: PhysicalTherapySeoContent,
    },
    manufacturing: {
        badgeText: "Manufacturing Operations Suite",
        titlePrefix: "Manufacturing",
        subtitle: "Industrial manufacturing productivity calculator, machine throughput estimator, and OEE efficiency benchmark analyzer.",
        metaTitle: "Manufacturing Productivity Calculator | OEE & Labor Rate",
        metaDescription: "Free manufacturing productivity calculator. Measure factory output, labor productivity per hour, machine cycle efficiency, and OEE benchmarks instantly.",
        keywords: [
            "manufacturing productivity calculator",
            "manufacturing calculator",
            "factory calculator",
            "calculate manufacturing productivity",
            "manufacturing efficiency calculator",
            "production productivity calculator",
            "overall equipment effectiveness calculator",
            "oee calculator",
            "productivity calculator",
        ],
        Calculator: ManufacturingCalculator,
        SeoContent: ManufacturingSeoContent,
    },
    labor: {
        badgeText: "Workforce Operations Suite",
        titlePrefix: "Labor",
        subtitle: "Workforce labor productivity calculator, blended team payroll rate modeler, and employee capacity utilization analyzer.",
        metaTitle: "Labor Productivity Calculator | Units & Output per Hour",
        metaDescription: "Free labor productivity calculator. Measure workforce units per hour, revenue per labor dollar, and team capacity utilization with real-time benchmarks.",
        keywords: [
            "labor productivity calculator",
            "labor productivity formula",
            "productivity calculator per hour",
            "labor productivity formula with example",
            "how to calculate labor productivity",
            "calculate labor productivity",
            "workforce productivity calculator",
            "productivity calculator",
        ],
        Calculator: LaborProductivityCalculator,
        SeoContent: LaborProductivitySeoContent,
    },
    employee: {
        badgeText: "Workforce Executive Suite",
        titlePrefix: "Employee",
        subtitle: "Executive employee productivity calculator, revenue per FTE modeler, and department staff quota performance analyzer.",
        metaTitle: "Employee Productivity Calculator | Revenue per FTE & Target ROI",
        metaDescription: "Free employee productivity calculator. Measure revenue per employee, net profit per FTE, and employee compensation ROI with industry-level benchmarks.",
        keywords: [
            "employee productivity calculator",
            "how to calculate productivity per employee",
            "calculate productivity per employee",
            "revenue per employee calculator",
            "profit per employee",
            "workforce productivity calculator",
            "employee performance calculator",
            "productivity calculator",
            "employee efficiency",
        ],
        Calculator: EmployeeProductivityCalculator,
        SeoContent: EmployeeProductivitySeoContent,
    },
    "video-production": {
        badgeText: "Broadcast & Studio Production Suite",
        titlePrefix: "Video Production",
        subtitle: "Studio video production calculator, cost per finished minute estimator, and post-production turnaround scheduler for filmmakers, agencies & creators.",
        metaTitle: "Video Production Calculator | Cost & Turnaround Estimator",
        metaDescription: "Free video production calculator. Estimate video production costs per minute, editing turnaround time, and crew labor efficiency across all project tiers.",
        keywords: [
            "video production calculator",
            "video production cost estimator",
            "video production costs estimator",
            "video editing time calculator",
            "cost per minute video production",
            "video turnaround time calculator",
            "video editor productivity calculator",
            "shooting ratio calculator",
            "video production efficiency",
            "productivity calculator",
        ],
        Calculator: VideoProductionCalculator,
        SeoContent: VideoProductionSeoContent,
    },
    "call-center": {
        badgeText: "Contact Center Operations Suite",
        titlePrefix: "Call Center",
        subtitle: "Contact center productivity calculator, agent occupancy analyzer, and shrinkage-adjusted staffing scheduler for customer support & BPO teams.",
        metaTitle: "Call Center Productivity Calculator | Agent Occupancy & CPH",
        metaDescription: "Free call center productivity calculator. Measure agent occupancy, calls per hour (CPH), handling velocity (AHT), and shrinkage with WFM benchmarks.",
        keywords: [
            "call center productivity calculator",
            "call center productivity",
            "agent productivity calculator",
            "call center metrics calculator",
            "calls per hour calculator",
            "call center occupancy calculator",
            "call center shrinkage calculator",
            "bpo productivity calculator",
            "average handle time calculator",
            "productivity calculator",
        ],
        Calculator: CallCenterProductivityCalculator,
        SeoContent: CallCenterProductivitySeoContent,
    },
    logistics: {
        badgeText: "Warehouse & Supply Chain Suite",
        titlePrefix: "Logistics",
        subtitle: "Warehouse logistics productivity calculator, units per hour (UPH) estimator, dock-to-stock tracker, and fleet unit shipping cost modeler for distribution centers & 3PLs.",
        metaTitle: "Logistics Productivity Calculator | Warehouse & Pick Rate",
        metaDescription: "Free logistics productivity calculator to measure warehouse units per hour (UPH), picking velocity, order fulfillment cycle time, and labor cost per order.",
        keywords: [
            "logistics productivity calculator",
            "warehouse productivity calculator",
            "warehouse productivity calculation",
            "units per hour uph",
            "warehouse pick rate calculator",
            "order fulfillment cycle time",
            "warehouse labor productivity",
            "dock to stock calculator",
            "3pl productivity calculator",
            "productivity calculator",
        ],
        Calculator: LogisticsProductivityCalculator,
        SeoContent: LogisticsProductivitySeoContent,
    },
    "cleaning-services": {
        badgeText: "Commercial Janitorial & ISSA 612 Suite",
        titlePrefix: "Commercial Cleaning Time",
        titleSuffix: "& Productivity Calculator",
        subtitle: "Commercial cleaning time calculator, janitorial square footage production rate analyzer, and contract bidding cost estimator based on official ISSA 612 standards.",
        metaTitle: "Commercial Cleaning Time Calculator | ISSA Production Rates",
        metaDescription: "Free commercial cleaning time calculator to estimate janitorial labor hours, square footage production rates, and contract bidding costs with ISSA standards.",
        keywords: [
            "commercial cleaning time calculator",
            "cleaning time calculator",
            "cleaning times calculator",
            "how to calculate cleaning times",
            "cleaning productivity calculator",
            "commercial cleaning productivity calculator",
            "janitorial bidding calculator",
            "issa 612 cleaning times",
            "cleaning square footage calculator",
            "productivity calculator",
        ],
        Calculator: CleaningServicesProductivityCalculator,
        SeoContent: CleaningServicesProductivitySeoContent,
    },
    healthcare: {
        badgeText: "Clinical Healthcare & Hospital Operations Suite",
        titlePrefix: "Healthcare & Clinical",
        subtitle: "Clinical healthcare productivity calculator, physician wRVU production modeler, and hospital inpatient nursing HPPD staffing benchmark analyzer.",
        metaTitle: "Healthcare Productivity Calculator | wRVU & HPPD Benchmark",
        metaDescription: "Free clinical healthcare productivity calculator. Measure physician wRVU production, inpatient nursing HPPD staffing, and ambulatory patient encounter velocity.",
        keywords: [
            "healthcare productivity calculator",
            "healthcare productivity",
            "physician productivity calculator",
            "productivity in healthcare",
            "wrvu calculator",
            "nursing hppd calculator",
            "hours per patient day calculator",
            "clinical productivity calculator",
            "hospital productivity calculator",
            "productivity calculator",
        ],
        Calculator: HealthcareProductivityCalculator,
        SeoContent: HealthcareProductivitySeoContent,
    },
    welding: {
        badgeText: "Structural Welding & AWS D1.1 Suite",
        titlePrefix: "Welding & Fabrication",
        subtitle: "Industrial welding productivity calculator, AWS filler metal deposition rate estimator, arc-on operating factor analyzer, and joint fabrication cost modeler.",
        metaTitle: "Welding Productivity Calculator | Deposition Rate & AWS",
        metaDescription: "Free welding productivity calculator to measure filler metal deposition rate, arc-on operating factor, joint volume consumption, and fabrication cost per foot.",
        keywords: [
            "welding productivity calculator",
            "welding productivity",
            "welder productivity per day",
            "welding deposition rate calculator",
            "welding cost per foot",
            "welding operating factor",
            "welding joint volume calculator",
            "welder efficiency calculator",
            "aws welding calculator",
            "productivity calculator",
        ],
        Calculator: WeldingProductivityCalculator,
        SeoContent: WeldingProductivitySeoContent,
    },
    technician: {
        badgeText: "Automotive & Field Service Operations Suite",
        titlePrefix: "Technician & Field Service",
        subtitle: "Industrial technician productivity calculator, automotive flat-rate efficiency modeler, and field service wrench-time analyzer.",
        metaTitle: "Technician Productivity Calculator | Efficiency & Hours",
        metaDescription: "Free technician productivity calculator to measure automotive flat-rate efficiency, labor productivity, wrench-time utilization, and shop billable gross margin.",
        keywords: [
            "technician productivity calculator",
            "technician efficiency calculator",
            "service technician productivity",
            "how to calculate technician efficiency",
            "technician proficiency formula",
            "automotive technician productivity",
            "wrench time calculator",
            "flat rate technician calculator",
            "mechanic efficiency calculator",
            "productivity calculator",
        ],
        Calculator: TechnicianProductivityCalculator,
        SeoContent: TechnicianProductivitySeoContent,
    },
    machine: {
        badgeText: "Automated Machinery & TPM Efficiency Suite",
        titlePrefix: "Machine & Equipment OEE",
        subtitle: "Industrial machine productivity calculator, Overall Equipment Effectiveness (OEE) analyzer, and cycle time vs takt capacity modeler.",
        metaTitle: "Machine Productivity Calculator | OEE & Cycle Time",
        metaDescription: "Free machine productivity calculator to measure OEE (Availability x Performance x Quality), cycle time vs takt time, throughput, and equipment downtime cost.",
        keywords: [
            "machine productivity calculator",
            "productivity machine",
            "how to calculate machine productivity",
            "machine productivity formula",
            "machine efficiency calculator",
            "overall equipment effectiveness calculator",
            "oee calculator",
            "machine capacity calculator",
            "cycle time calculator",
            "productivity calculator",
        ],
        Calculator: MachineProductivityCalculator,
        SeoContent: MachineProductivitySeoContent,
    },
    construction: {
        badgeText: "Heavy Civil & Commercial Construction Suite",
        titlePrefix: "Construction & Crew Labor",
        subtitle: "Industrial construction productivity calculator, trade man-hours per unit estimator, crew daily velocity forecaster, and Earned Value CPI analyzer.",
        metaTitle: "Construction Productivity Calculator | Labor & Crew Rate",
        metaDescription: "Free construction productivity calculator to measure labor output rate, man-hours per unit, crew daily velocity, project duration, and CPI cost efficiency.",
        keywords: [
            "construction productivity calculator",
            "construction labor productivity",
            "construction productivity rates",
            "calculate labor productivity in construction",
            "construction productivity calculation",
            "how to measure construction productivity",
            "standard labor productivity rates in construction",
            "crew productivity calculator",
            "construction time calculator",
            "productivity calculator",
        ],
        Calculator: ConstructionProductivityCalculator,
        SeoContent: ConstructionProductivitySeoContent,
    },
    sales: {
        badgeText: "Revenue Operations & B2B Sales Suite",
        titlePrefix: "Sales Pipeline & Quota",
        subtitle: "Professional B2B sales productivity calculator, sales pipeline velocity forecaster, quota attainment analyzer, and sales per hour labor efficiency modeler.",
        metaTitle: "Sales Productivity Calculator | Velocity & Quota Rate",
        metaDescription: "Free sales productivity calculator to measure pipeline velocity, quota attainment percentage, sales per hour, revenue per rep, and sales team labor efficiency.",
        keywords: [
            "sales productivity calculator",
            "sales per hour calculator",
            "sales per hour",
            "sales velocity formula",
            "how to calculate sales productivity",
            "sales rep productivity",
            "quota attainment calculator",
            "revenue per rep calculator",
            "sales capacity calculator",
            "productivity calculator",
        ],
        Calculator: SalesProductivityCalculator,
        SeoContent: SalesProductivitySeoContent,
    },
    "data-entry": {
        badgeText: "Back-Office Operations & BPO Data Entry Suite",
        titlePrefix: "Data Entry Speed & Accuracy",
        subtitle: "Free data entry productivity calculator, keystrokes per hour (KPH) analyzer, Net KPH accuracy modeler, and batch unit cost estimator for BPO operations.",
        metaTitle: "Data Entry Productivity Calculator | KPH & WPM Rate",
        metaDescription: "Free data entry productivity calculator to calculate keystrokes per hour (KPH), Net KPH accuracy, records per hour, batch velocity, and unit cost per 1,000 records.",
        keywords: [
            "data entry productivity calculator",
            "data entry speed calculator",
            "keystrokes per hour calculator",
            "kph calculator",
            "net kph formula",
            "data entry accuracy calculator",
            "data entry cost per 1000 records",
            "data entry words per minute",
            "data entry production rate",
            "productivity calculator",
        ],
        Calculator: DataEntryProductivityCalculator,
        SeoContent: DataEntryProductivitySeoContent,
    },
    marketing: {
        badgeText: "Growth Marketing & Demand Generation Suite",
        titlePrefix: "Marketing ROI & Pipeline Velocity",
        subtitle: "Enterprise marketing productivity calculator, CAC-to-LTV ratio analyzer, MQL pipeline velocity forecaster, and campaign labor efficiency modeler.",
        metaTitle: "Marketing Productivity Calculator | ROI & CAC Rate",
        metaDescription: "Free marketing productivity calculator to measure marketing ROI, LTV:CAC ratio, pipeline velocity, cost per opportunity, and campaign labor efficiency.",
        keywords: [
            "marketing productivity calculator",
            "marketing roi calculator",
            "marketing efficiency calculator",
            "cac to ltv calculator",
            "marketing velocity formula",
            "marketing labor productivity",
            "how to calculate marketing productivity",
            "cost per qualified opportunity",
            "marketing capacity calculator",
            "productivity calculator",
        ],
        Calculator: MarketingProductivityCalculator,
        SeoContent: MarketingProductivitySeoContent,
    },
    retail: {
        badgeText: "Store Performance & Retail Operations Suite",
        titlePrefix: "Retail Store Sales & Space",
        subtitle: "Free retail productivity calculator to measure sales per labor hour (SPLH), floor space density (SPSF), store labor cost percentage, GMROI, and shrinkage loss.",
        metaTitle: "Retail Productivity Calculator | SPLH & Space Density",
        metaDescription: "Free retail productivity calculator to measure sales per labor hour (SPLH), sales per square foot (SPSF), payroll cost percentage, GMROI, and store shrinkage.",
        keywords: [
            "retail productivity calculator",
            "retail store productivity",
            "sales per labor hour calculator",
            "splh calculator",
            "sales per square foot calculator",
            "spsf calculator",
            "gmroi calculator",
            "retail labor cost percentage",
            "retail shrinkage formula",
            "how to calculate retail productivity",
            "productivity calculator",
        ],
        Calculator: RetailProductivityCalculator,
        SeoContent: RetailProductivitySeoContent,
    },
    agriculture: {
        badgeText: "Agronomic Operations & Field Logistics Suite",
        titlePrefix: "Agriculture Yield & Field Capacity",
        subtitle: "Free agriculture productivity calculator to measure crop yield per acre, ASABE effective field capacity (EFC), tractor fuel rate, and per-acre breakeven margin.",
        metaTitle: "Agriculture Productivity Calculator | Yield & Field Capacity",
        metaDescription: "Free agriculture productivity calculator. Measure crop yield per acre, machinery effective field capacity (EFC), fuel efficiency, and operating gross margins.",
        keywords: [
            "agriculture productivity calculator",
            "agricultural productivity calculator",
            "farm productivity calculator",
            "crop yield calculator",
            "effective field capacity calculator",
            "efc calculator",
            "machinery field capacity calculator",
            "breakeven yield calculator",
            "farm operating margin calculator",
            "usda crop yield benchmarks",
            "productivity calculator",
        ],
        Calculator: AgricultureProductivityCalculator,
        SeoContent: AgricultureProductivitySeoContent,
    },
    restaurant: {
        badgeText: "Hospitality & Dining Operations Suite",
        titlePrefix: "Restaurant RevPASH & Labor Cost",
        subtitle: "Professional restaurant productivity calculator, Cornell RevPASH analyzer, prime cost modeler, and kitchen ticket velocity engine.",
        metaTitle: "Restaurant Productivity Calculator | RevPASH & Labor Cost",
        metaDescription: "Free restaurant productivity calculator. Measure RevPASH, table turnover velocity, prime cost ratios, and kitchen ticket output with industry benchmarks.",
        keywords: [
            "restaurant productivity calculator",
            "revpash calculator",
            "restaurant labor cost calculator",
            "how to calculate restaurant productivity",
            "restaurant productivity formula",
            "restaurant prime cost calculator",
            "table turn rate calculator",
            "productivity calculator",
        ],
        Calculator: RestaurantProductivityCalculator,
        SeoContent: RestaurantProductivitySeoContent,
    },
    "software-development": {
        badgeText: "DevOps & Engineering Velocity Suite",
        titlePrefix: "Software Development",
        subtitle: "Professional developer productivity calculator, Google DORA release metrics, agile sprint story throughput, and ARR per engineer model.",
        metaTitle: "Software Development Productivity Calculator | DORA Velocity",
        metaDescription: "Free software development productivity calculator. Measure DORA cycle velocity, sprint point throughput, and developer revenue ROI with industry benchmarks.",
        keywords: [
            "software development productivity calculator",
            "developer productivity calculator",
            "engineering productivity calculator",
            "how to measure developer productivity",
            "software developer productivity metrics",
            "dora metrics calculator",
            "software engineering productivity",
            "productivity calculator",
        ],
        Calculator: SoftwareDevelopmentProductivityCalculator,
        SeoContent: SoftwareDevelopmentSeoContent,
    },
    "real-estate": {
        badgeText: "Realty & Brokerage Operations Suite",
        titlePrefix: "Real Estate Agent Commission &",
        subtitle: "Professional realtor productivity calculator, GCI commission split modeler, showing conversion analyzer, and effective hourly wage engine.",
        metaTitle: "Real Estate Productivity Calculator | Realtor Commission ROI",
        metaDescription: "Free real estate productivity calculator. Measure realtor commission splits, buyer showing conversion rates, and annual GCI per working hour with NAR benchmarks.",
        keywords: [
            "real estate productivity calculator",
            "realtor productivity calculator",
            "real estate agent productivity",
            "real estate agent commission calculator",
            "real estate lead conversion rate",
            "realtor income calculator",
            "productivity calculator",
        ],
        Calculator: RealEstateProductivityCalculator,
        SeoContent: RealEstateProductivitySeoContent,
    },
};

export function getIndustrySuite(slug: string): IndustrySuiteDefinition | undefined {
    return REGISTRY[slug];
}
