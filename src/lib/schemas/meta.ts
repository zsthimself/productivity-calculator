/**
 * [INPUT]: 接收 slug 字符串及默认回退 title / desc
 * [OUTPUT]: 导出 getIndustryMeta 函数与 IndustryMeta 契约
 * [POS]: src/lib/schemas/meta.ts 维护各垂直行业的结构化数据元信息与标题映射
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export interface IndustryMeta {
    name: string;
    description: string;
}

export function getIndustryMeta(
    slug: string,
    fallbackTitle: string,
    fallbackDesc: string
): IndustryMeta {
    switch (slug) {
        case "physical-therapy":
            return {
                name: "Physical Therapy Productivity Calculator",
                description:
                    "Free clinical physical therapy productivity calculator for PT, OT, and SLP therapists. Calculate daily productivity percentage, reverse clock-out time with lunch break, and Medicare 8-minute rule billing units.",
            };
        case "manufacturing":
            return {
                name: "Manufacturing Productivity Calculator",
                description:
                    "Free industrial manufacturing productivity calculator. Calculate gross and net production rates per hour, factory shift capacity projections, and Overall Equipment Effectiveness (OEE) with standard industry benchmarks.",
            };
        case "labor":
            return {
                name: "Labor Productivity Calculator",
                description:
                    "Free workforce labor productivity calculator. Measure physical output per labor hour, revenue-to-labor cost ratios, blended team hourly rates, and workforce capacity utilization.",
            };
        case "employee":
            return {
                name: "Employee Productivity Calculator",
                description:
                    "Free employee productivity calculator. Measure revenue per employee, net profit per FTE, employee ROI compensation multipliers, and department performance targets.",
            };
        case "video-production":
            return {
                name: "Video Production Calculator",
                description:
                    "Free video production calculator. Estimate cost per finished minute, post-production editing turnaround time, shooting ratio, and crew labor efficiency.",
            };
        case "call-center":
            return {
                name: "Call Center Productivity Calculator",
                description:
                    "Free call center productivity calculator. Measure agent occupancy rate, calls per hour (CPH), average handle time (AHT), and shrinkage-adjusted staffing requirements.",
            };
        case "logistics":
            return {
                name: "Logistics Productivity Calculator",
                description:
                    "Free logistics productivity calculator. Calculate warehouse units per hour (UPH), pick and pack labor velocity, dock-to-stock latency, order fulfillment cycle time, and fleet cost per parcel.",
            };
        case "cleaning-services":
            return {
                name: "Commercial Cleaning Time Calculator",
                description:
                    "Free commercial cleaning time calculator to estimate janitorial labor hours, square footage production rates, and contract bidding costs with ISSA standards.",
            };
        case "healthcare":
            return {
                name: "Healthcare Productivity Calculator",
                description:
                    "Free clinical healthcare productivity calculator. Measure physician wRVU production, inpatient nursing HPPD staffing, and ambulatory patient encounter velocity.",
            };
        case "welding":
            return {
                name: "Welding Productivity Calculator",
                description:
                    "Free welding productivity calculator to measure filler metal deposition rate, arc-on operating factor, joint volume consumption, and fabrication cost per foot.",
            };
        case "technician":
            return {
                name: "Technician Productivity Calculator",
                description:
                    "Free technician productivity calculator to measure automotive flat-rate efficiency, labor productivity, wrench-time utilization, and shop billable gross margin.",
            };
        case "machine":
            return {
                name: "Machine Productivity Calculator",
                description:
                    "Free machine productivity calculator to measure OEE (Availability x Performance x Quality), cycle time vs takt time, throughput, and equipment downtime cost.",
            };
        case "construction":
            return {
                name: "Construction Productivity Calculator",
                description:
                    "Free construction productivity calculator to measure labor output rate, man-hours per unit, crew daily velocity, project duration, and CPI cost efficiency.",
            };
        case "sales":
            return {
                name: "Sales Productivity Calculator",
                description:
                    "Free sales productivity calculator to measure pipeline velocity, quota attainment percentage, sales per hour, revenue per rep, and sales team labor efficiency.",
            };
        case "data-entry":
            return {
                name: "Data Entry Productivity Calculator",
                description:
                    "Free data entry productivity calculator to calculate keystrokes per hour (KPH), Net KPH accuracy, records per hour, batch velocity, and unit cost per 1,000 records.",
            };
        case "marketing":
            return {
                name: "Marketing Productivity Calculator",
                description:
                    "Free marketing productivity calculator to measure marketing ROI, LTV:CAC ratio, pipeline velocity, cost per opportunity, and campaign labor efficiency.",
            };
        case "retail":
            return {
                name: "Retail Productivity Calculator",
                description:
                    "Free retail productivity calculator to measure sales per labor hour (SPLH), sales per square foot (SPSF), payroll cost percentage, GMROI, and store shrinkage.",
            };
        case "agriculture":
            return {
                name: "Agriculture Productivity Calculator",
                description:
                    "Free agriculture productivity calculator. Measure crop yield per acre, machinery effective field capacity (EFC), fuel efficiency, and operating gross margins.",
            };
        case "restaurant":
            return {
                name: "Restaurant Productivity Calculator",
                description:
                    "Free restaurant productivity calculator. Measure RevPASH, table turnover velocity, prime cost ratios, and kitchen ticket output with industry benchmarks.",
            };
        default:
            return {
                name: fallbackTitle,
                description: fallbackDesc,
            };
    }
}
