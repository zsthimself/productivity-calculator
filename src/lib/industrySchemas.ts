/**
 * [INPUT]: 依赖 @/types/industry 的 IndustryData
 * [OUTPUT]: 导出 generateIndustrySchema 函数，构建 WebApplication、BreadcrumbList 与 FAQPage 结构化数据
 * [POS]: src/lib/industrySchemas.ts 专注于结构化数据构建，将大段 JSON-LD 逻辑从页面渲染器中解耦
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { IndustryData } from "@/types/industry";

export function generateIndustrySchema(industry: IndustryData, baseUrl: string = "https://productivitycalculator.work") {
    const isPhysicalTherapy = industry.slug === "physical-therapy";
    const isManufacturing = industry.slug === "manufacturing";
    const isLabor = industry.slug === "labor";
    const isEmployee = industry.slug === "employee";
    const isVideoProduction = industry.slug === "video-production";
    const isCallCenter = industry.slug === "call-center";
    const isLogistics = industry.slug === "logistics";
    const pageUrl = `${baseUrl}/calculator/${industry.slug}`;

    const schemas: Record<string, unknown>[] = [
        {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: isPhysicalTherapy
                ? "Physical Therapy Productivity Calculator"
                : isManufacturing
                ? "Manufacturing Productivity Calculator"
                : isLabor
                ? "Labor Productivity Calculator"
                : isEmployee
                ? "Employee Productivity Calculator"
                : isVideoProduction
                ? "Video Production Calculator"
                : isCallCenter
                ? "Call Center Productivity Calculator"
                : isLogistics
                ? "Logistics Productivity Calculator"
                : industry.title,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web Browser",
            url: pageUrl,
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
            },
            description: isPhysicalTherapy
                ? "Free clinical physical therapy productivity calculator for PT, OT, and SLP therapists. Calculate daily productivity percentage, reverse clock-out time with lunch break, and Medicare 8-minute rule billing units."
                : isManufacturing
                ? "Free industrial manufacturing productivity calculator. Calculate gross and net production rates per hour, factory shift capacity projections, and Overall Equipment Effectiveness (OEE) with standard industry benchmarks."
                : isLabor
                ? "Free workforce labor productivity calculator. Measure physical output per labor hour, revenue-to-labor cost ratios, blended team hourly rates, and workforce capacity utilization."
                : isEmployee
                ? "Free employee productivity calculator. Measure revenue per employee, net profit per FTE, employee ROI compensation multipliers, and department performance targets."
                : isVideoProduction
                ? "Free video production calculator. Estimate cost per finished minute, post-production editing turnaround time, shooting ratio, and crew labor efficiency."
                : isCallCenter
                ? "Free call center productivity calculator. Measure agent occupancy rate, calls per hour (CPH), average handle time (AHT), and shrinkage-adjusted staffing requirements."
                : isLogistics
                ? "Free logistics productivity calculator. Calculate warehouse units per hour (UPH), pick and pack labor velocity, dock-to-stock latency, order fulfillment cycle time, and fleet cost per parcel."
                : industry.description,
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
                    name: isPhysicalTherapy
                        ? "Physical Therapy Productivity Calculator"
                        : isManufacturing
                        ? "Manufacturing Productivity Calculator"
                        : isLabor
                        ? "Labor Productivity Calculator"
                        : isEmployee
                        ? "Employee Productivity Calculator"
                        : isVideoProduction
                        ? "Video Production Calculator"
                        : isCallCenter
                        ? "Call Center Productivity Calculator"
                        : isLogistics
                        ? "Logistics Productivity Calculator"
                        : industry.title,
                    item: pageUrl,
                },
            ],
        },
    ];

    if (isPhysicalTherapy) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "How is physical therapy productivity calculated?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Physical therapy productivity is typically calculated as: Productivity % = (Billable Time ÷ Total Paid Time) × 100. For example, if you bill 360 minutes (6 hours) in an 8-hour workday (480 minutes), your productivity is (360 ÷ 480) × 100 = 75%. In unit-based clinics, it may also be measured by billable units per day (e.g., 24 units in an 8-hour shift).",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is a reasonable productivity standard for physical therapists?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Target productivity rates vary by setting: Hospital Outpatient clinics generally expect 70% to 80% (3 to 3.5 units/hour); Private Practice Outpatient often expects 80% to 90% (3.5 to 4.2 units/hour); Skilled Nursing Facilities (SNFs) frequently mandate 80% to 88%; Acute Inpatient Rehab typically targets 65% to 75%; and Home Health measures by visit points (usually 28–32 points/week).",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does the Medicare 8-minute rule work?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Under the Medicare 8-minute rule for timed CPT codes (e.g., therapeutic exercise 97110, manual therapy 97140), you must provide at least 8 minutes of direct one-on-one treatment to bill 1 unit. Units are assigned based on cumulative timed minutes: 1 Unit: 8–22 mins; 2 Units: 23–37 mins; 3 Units: 38–52 mins; 4 Units: 53–67 mins; 5 Units: 68–82 mins; 6 Units: 83–97 mins.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Does documentation time count toward clinical productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Point-of-care documentation completed while directly educating the patient or reviewing functional progress can count as part of billable patient care. However, routine charting, administrative desk work, attending team meetings, and writing discharge summaries outside patient contact hours are non-billable and will decrease overall daily productivity percentage.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do cancellations and no-shows affect therapist productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Cancellations directly reduce billable time while your scheduled shift duration remains fixed, lowering your calculated productivity percentage. Many clinics use standby tasks, same-day waitlist slots, or non-clinical time deductions to mitigate the impact of cancellations on staff therapist performance evaluations.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the difference between timed and untimed CPT codes in PT billing?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Timed CPT codes (like 97110 for therapeutic exercise, 97112 for neuromuscular re-education, and 97140 for manual therapy) require direct one-on-one contact and are billed in 15-minute increments governed by the 8-minute rule. Untimed CPT codes (such as 97161–97163 for PT evaluations or 97597 for wound care) are billed as a single unit regardless of whether the procedure took 20, 45, or 60 minutes.",
                    },
                },
            ],
        });
    }

    if (isManufacturing) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "What is an ideal manufacturing productivity rate?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "In discrete manufacturing, an OEE score of 85% is internationally recognized as World-Class. Typical manufacturing operations operate between 60% and 75% OEE. For direct labor efficiency, maintaining a 95%+ target achievement rate with less than 2% scrap is considered top quartile performance.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does scrap and defect rate affect manufacturing productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Scrap directly penalizes both the Quality factor in OEE and the Net Production Rate. Because labor, machine cycle time, and utility power are consumed producing unusable scrap, high scrap rates artificially inflate the cost per unit while reducing overall plant capacity.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the difference between production volume and productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Production volume is the raw quantity of goods manufactured over a timeframe (e.g., 50,000 units this month). Productivity is the ratio of that volume to the inputs invested (e.g., units per labor hour or units per dollar). Producing high volume by adding excessive overtime can actually decrease productivity.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Can this manufacturing calculator handle multiple shifts and assembly lines?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. Use the 'Factory Capacity' tab to set shift lengths (e.g., 8, 10, or 12 hours), the number of shifts per day (1, 2, or 3), parallel production lines, and working days per week to automatically project daily, weekly, monthly, and annual factory capacity.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do you calculate labor hours in manufacturing?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Direct labor hours are calculated by multiplying the number of operators on the line by the shift duration: Direct Labor Hours = Number of Workers × Shift Hours Worked. For example, a 6-person assembly line operating for an 8-hour shift logs 48 direct labor hours.",
                    },
                },
            ],
        });
    }

    if (isLabor) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "How is labor productivity calculated?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Labor productivity is calculated by dividing total output by the labor hours invested: Labor Productivity = Total Output Units (or Revenue) ÷ Total Labor Hours Worked. For example, producing 500 units in 50 labor hours yields a productivity rate of 10 units per labor hour.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is a good labor productivity ratio?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "For financial productivity (Revenue-to-Labor ratio), a healthy target is 2.5x to 4.0x: generating at least $2.50 to $4.00 of gross revenue for every $1.00 spent on labor payroll. In professional services and consulting, a billable workforce utilization rate between 75% and 85% is considered top-tier.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the difference between direct and indirect labor?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Direct labor refers to workers and hours directly involved in producing goods or delivering billable client services (e.g., assembly technicians, developers, treating clinicians). Indirect labor refers to support and administrative functions (e.g., HR, accounting, facility maintenance) that support operations but do not directly generate units of output.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do you calculate labor cost per unit?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Labor cost per unit is calculated by dividing total labor payroll costs by the number of units produced: Labor Cost Per Unit = Total Labor Cost ($) ÷ Total Units Produced. Alternatively, divide the hourly wage by your hourly productivity rate.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What causes low labor productivity in an organization?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "The primary causes of low labor productivity include excessive administrative meetings, inadequate tooling or legacy software, poor onboarding processes, unaddressed process bottlenecks, lack of standardized work procedures, and employee burnout or misalignment with organizational goals.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does employee utilization impact profitability?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Higher utilization directly converts fixed payroll expenses into recognized revenue. For example, increasing a 10-person consultancy's billable utilization from 70% to 80% unlocks 40 additional billable hours per week—generating $300,000+ in pure gross margin annually without adding headcount.",
                    },
                },
            ],
        });
    }

    if (isEmployee) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "How is employee productivity calculated?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Employee productivity is calculated using Revenue Per Employee: Total Gross Revenue ÷ Total Full-Time Equivalents (FTEs). In high-performance software and financial firms, Profit Per Employee (Operating Income ÷ FTEs) is also tracked to measure operational leverage.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is a good revenue per employee benchmark?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "For S&P 500 public companies, the average revenue per employee is approximately $320,000. Big tech companies frequently achieve $1,200,000 to $2,500,000 per employee. In professional services and agencies, $150,000 to $250,000 per FTE represents a healthy standard.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do you calculate employee ROI and fully loaded labor cost?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Fully loaded cost multiplies base salary by 1.25x to 1.40x to incorporate payroll taxes, medical insurance, retirement matching, software licenses, and office overhead. Employee ROI is calculated as: ((Gross Revenue Attributed - Fully Loaded Cost) ÷ Fully Loaded Cost) × 100.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the difference between headcount and FTE?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Headcount counts individual employees regardless of hours worked. Full-Time Equivalent (FTE) normalizes part-time and contractor hours into standard 40-hour workweeks (e.g., two 20-hour part-time employees equal 1.0 FTE).",
                    },
                },
                {
                    "@type": "Question",
                    name: "How can managers improve team quota attainment rates?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Managers improve attainment rates by eliminating non-core administrative tasks, implementing automated CRM workflows, offering continuous skills enablement, and establishing transparent weekly sprint scorecards.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Why can high revenue per employee be misleading?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Revenue per employee can mask profitability if cost of goods sold (COGS) or third-party contractor expenses are high. Always analyze Profit Per Employee alongside Revenue Per Employee to evaluate true productivity.",
                    },
                },
            ],
        });
    }

    if (isVideoProduction) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "How do you calculate productivity in video production?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Video production productivity is calculated by dividing finished video output (minutes or deliverable units) by total production inputs (labor hours or budget): Video Productivity = Delivered Output ÷ Labor Hours (or Total Budget). Key metrics include editing hours per finished minute, shooting ratio, and cost per finished minute.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is a normal cost per minute for video production?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Professional corporate marketing videos average $1,500 to $3,500 per finished minute. Broadcast television commercials typically range from $10,000 to $40,000+ per minute due to specialized crews, studio stages, and visual effects. Agile digital creator content averages $150 to $450 per minute.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is an ideal shooting ratio for commercial video?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "A shooting ratio between 15:1 and 25:1 is ideal for corporate and commercial video: capturing 15 to 25 minutes of raw footage for every 1 minute of finished video. Ratios below 10:1 risk lacking B-roll coverage, while ratios above 40:1 cause post-production logging bottlenecks.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How many hours does it take to edit a 5-minute video?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "A polished 5-minute corporate video typically takes 25 to 40 post-production hours: 6 hours for footage ingestion and assembly, 12 hours for pacing and B-roll placement, 8 hours for motion graphics and color grading, and 6 hours for client feedback revisions.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does crew size affect production turnaround time?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Larger crews accelerate on-set shooting by delegating lighting, audio recording, and camera setup, but do not directly speed up editing. In post-production, adding multiple editors introduces timeline reconciliation overhead; a single dedicated lead editor yields the highest efficiency.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Why do TikTok, Reels, and Shorts require a different productivity model?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Short-form vertical video relies on batch production: measuring cost per asset and daily throughput. A solo creator or two-person team can batch-shoot 15 to 20 videos in half a day, using standardized caption templates to achieve turnaround times under 48 hours.",
                    },
                },
            ],
        });
    }

    if (isCallCenter) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "How is call center agent productivity calculated?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Call center productivity is calculated by measuring agent occupancy: Occupancy % = (Talk Time + Hold Time + Wrap-up ACW) ÷ Logged-in Available Time × 100, alongside throughput KPIs such as Calls Per Hour (CPH), Average Handle Time (AHT), and First Contact Resolution (FCR).",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the difference between occupancy and utilization in a call center?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Occupancy measures how busy an agent is while logged into the queue ready for calls: (Handling Time ÷ Available Time) × 100. Utilization measures how much of the paid scheduled shift was spent logged in: (Logged-in Time ÷ Total Shift Time) × 100. Occupancy reflects call workload, while utilization reflects schedule adherence.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is an ideal occupancy rate for call center agents?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "The industry standard for agent occupancy is 75% to 85%. Below 70% indicates overstaffing and excessive idle waiting time. Above 88% causes back-to-back calls without rest, leading to agent cognitive fatigue and elevated employee churn.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is shrinkage in a call center and what is an acceptable rate?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Shrinkage is the percentage of paid working time when agents are unavailable for customer calls. It includes internal shrinkage (breaks, 1-on-1 coaching, training) and external shrinkage (PTO, vacation, sick leave). Standard contact center shrinkage ranges between 25% and 35%.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do you calculate calls per hour (CPH)?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Calls Per Hour is calculated as: CPH = Total Calls Handled ÷ On-Queue Working Hours. For example, handling 64 calls over an 8-hour shift results in an average throughput of 8.0 CPH.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does average handle time (AHT) impact call center productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Average Handle Time (talk time + hold time + ACW) dictates required headcount. Reducing AHT by 30 seconds across a 50-agent desk handling 2,500 daily calls saves 20 labor hours per day, unlocking extra queue capacity without hiring additional staff.",
                    },
                },
            ],
        });
    }

    if (isLogistics) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "What is a good warehouse picking UPH benchmark?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "In standard ecommerce small-parcel fulfillment, a competitive target pick velocity ranges between 120 and 150 units per hour (UPH) for manual cart piece-picking, and 200+ UPH for goods-to-person automated shuttle systems. For heavy pallet and case-picking in 3PL industrial warehouses, benchmarks typically range from 60 to 90 UPH due to forklift transit and safety protocols.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do you calculate warehouse logistics productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Warehouse logistics productivity is calculated by dividing total output volume (units picked, orders packed, or cartons loaded) by total direct labor hours consumed during the shift: UPH = Total Units Picked ÷ Direct Labor Hours. Economic productivity is evaluated by dividing total loaded payroll by completed shipments to obtain unit labor cost.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the difference between warehouse productivity and fulfillment efficiency?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Warehouse productivity measures operational output rate per resource unit (e.g., units per man-hour UPH or parcels per driver shift). Fulfillment efficiency is a broader measure that includes process quality, order accuracy percentage (e.g., 99.8% perfect order rate), dock-to-stock latency, and SLA compliance within customer delivery promises.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does dock-to-stock time affect overall order cycle time?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Dock-to-stock latency measures the time elapsed from when an inbound shipment arrives at the receiving dock to when goods are scanned and available in inventory bins for picking. If dock-to-stock exceeds 4 hours, inventory replenishment bottlenecks cause stockouts on active pick lines, forcing pickers to wait and drastically reducing overall order cycle velocity.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the standard cost per order (CPO) in 3PL fulfillment?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Standard warehouse handling cost per order (excluding carrier postage) ranges between $2.50 and $4.80 for standard B2C parcels containing 1 to 3 items. Operations with advanced cartonization, automated sortation, and high UPH rates can lower handling costs below $2.00 per order, while fragile, serialized, or cold-chain goods often exceed $6.00 per order.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does wave picking improve warehouse units per hour?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Wave picking groups orders by common criteria—such as shipping carrier cutoff, delivery zone, or shared SKU location—into scheduled execution waves. Instead of individual pickers traversing the entire warehouse for isolated orders, associates pick high-density SKU batches along optimized routes, reducing travel time by up to 40% and elevating UPH.",
                    },
                },
            ],
        });
    }

    if (industry.slug === "sales") {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "What is the best productivity calculator for sales teams?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "The best sales productivity calculator measures revenue generated per full-time sales rep (Revenue per Rep) alongside activity velocity: Sales Productivity = Total Closed Revenue ÷ Total Sales Headcount (or Selling Hours). Leading B2B teams use this calculator to establish realistic rep quotas, evaluate pipeline velocity, and benchmark sales capacity across quarters.",
                    },
                },
            ],
        });
    }

    return schemas;
}
