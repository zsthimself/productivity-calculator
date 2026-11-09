/**
 * [INPUT]: industries.json (静态配置), URL slug 参数, PhysicalTherapyCalculator, PhysicalTherapySeoContent, ManufacturingCalculator, ManufacturingSeoContent, LaborProductivityCalculator, LaborProductivitySeoContent, EmployeeProductivityCalculator, EmployeeProductivitySeoContent
 * [OUTPUT]: IndustryCalculatorPage - 动态生成行业专属页面，支持 physical-therapy、manufacturing、labor、employee 专属套件，therapy 执行 301 权重合并
 * [POS]: pSEO 模板与垂直突围页 - 承接 slug 对应 20+ 行业页面，对高格式词权重合流
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import PhysicalTherapyCalculator from "@/components/PhysicalTherapyCalculator";
import PhysicalTherapySeoContent from "@/components/PhysicalTherapySeoContent";
import ManufacturingCalculator from "@/components/ManufacturingCalculator";
import ManufacturingSeoContent from "@/components/ManufacturingSeoContent";
import LaborProductivityCalculator from "@/components/LaborProductivityCalculator";
import LaborProductivitySeoContent from "@/components/LaborProductivitySeoContent";
import EmployeeProductivityCalculator from "@/components/EmployeeProductivityCalculator";
import EmployeeProductivitySeoContent from "@/components/EmployeeProductivitySeoContent";
import IndustryList from "@/components/IndustryList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import industries from "@/data/industries.json";
import { IndustryData } from "@/types/industry";

const industryData = industries as IndustryData[];
const BASE_URL = "https://productivitycalculator.work";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return industryData.map((industry) => ({
        slug: industry.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const industry = industryData.find((i) => i.slug === slug);

    if (!industry) {
        return {
            title: "Calculator Not Found",
        };
    }

    const pageUrl = `${BASE_URL}/calculator/${slug}`;

    // 04号站 GSC 权重合流：/calculator/therapy 301 统一汇聚至 /calculator/physical-therapy
    if (slug === "therapy") {
        return {
            title: {
                absolute: "Physical Therapy Productivity Calculator | PT & OT",
            },
            description: "Free physical therapy productivity calculator for PT, OT, and therapists. Calculate clinical productivity percentage, treatment minutes, lunch break, and target hours.",
            alternates: {
                canonical: `${BASE_URL}/calculator/physical-therapy`,
            },
            robots: {
                index: false,
                follow: true,
            },
        };
    }

    const isPhysicalTherapy = slug === "physical-therapy";
    const isManufacturing = slug === "manufacturing";
    const isLabor = slug === "labor";
    const isEmployee = slug === "employee";

    if (isPhysicalTherapy) {
        const title = "Physical Therapy Productivity Calculator | PT & OT";
        const description = "Free physical therapy productivity calculator for PT and OT. Calculate clinical productivity percentage, treatment minutes, lunch break, and target hours.";
        return {
            title: {
                absolute: title,
            },
            description,
            keywords: [
                "physical therapy productivity calculator",
                "physical therapy productivity calculator with lunch break",
                "pt productivity calculator",
                "therapy productivity calculator",
                "therapist productivity calculator with lunch break",
                "snf productivity calculator",
                "pt clock out calculator",
                "medicare 8 minute rule calculator",
                "occupational therapy productivity",
                "slp productivity calculator",
                "productivity calculator for physical therapy",
                "productivity calculator",
            ],
            alternates: {
                canonical: pageUrl,
                languages: {
                    'x-default': pageUrl,
                    'en': pageUrl,
                    'zh-CN': `${BASE_URL}/zh/calculator/${slug}`,
                    'es': `${BASE_URL}/es/calculator/${slug}`,
                    'de': `${BASE_URL}/de/calculator/${slug}`,
                    'ja': `${BASE_URL}/ja/calculator/${slug}`,
                },
            },
            openGraph: {
                title,
                description,
                url: pageUrl,
                type: "website",
                siteName: "Productivity Calculator",
                images: [
                    {
                        url: `${BASE_URL}/og-image.png`,
                        width: 1200,
                        height: 630,
                        alt: "Physical Therapy Productivity Calculator",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [`${BASE_URL}/og-image.png`],
            },
        };
    }

    if (isManufacturing) {
        const title = "Manufacturing Productivity Calculator | OEE & Labor Rate";
        const description = "Free manufacturing productivity calculator. Measure factory output, labor productivity per hour, machine cycle efficiency, and OEE benchmarks instantly.";
        return {
            title: {
                absolute: title,
            },
            description,
            keywords: [
                "manufacturing productivity calculator",
                "manufacturing calculator",
                "factory calculator",
                "plant productivity calculator",
                "oee calculator",
                "labor productivity calculator manufacturing",
                "manufacturing efficiency calculator",
                "machine productivity calculator",
                "production rate calculator",
                "productivity calculator",
            ],
            alternates: {
                canonical: pageUrl,
                languages: {
                    'x-default': pageUrl,
                    'en': pageUrl,
                    'zh-CN': `${BASE_URL}/zh/calculator/${slug}`,
                    'es': `${BASE_URL}/es/calculator/${slug}`,
                    'de': `${BASE_URL}/de/calculator/${slug}`,
                    'ja': `${BASE_URL}/ja/calculator/${slug}`,
                },
            },
            openGraph: {
                title,
                description,
                url: pageUrl,
                type: "website",
                siteName: "Productivity Calculator",
                images: [
                    {
                        url: `${BASE_URL}/og-image.png`,
                        width: 1200,
                        height: 630,
                        alt: "Manufacturing Productivity Calculator",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [`${BASE_URL}/og-image.png`],
            },
        };
    }

    if (isLabor) {
        const title = "Labor Productivity Calculator | Output & Workforce Rate";
        const description = "Free labor productivity calculator. Calculate output per labor hour, workforce revenue efficiency, and labor utilization rates with industry benchmarks.";
        return {
            title: {
                absolute: title,
            },
            description,
            keywords: [
                "labor productivity calculator",
                "labor calculator",
                "calculate productivity rate",
                "how to find labor productivity",
                "calculate labor productivity formula",
                "labor force productivity calculator",
                "productive hours calculation",
                "employee productivity calculator",
                "labor production rate",
                "workforce productivity calculator",
                "productivity calculator",
            ],
            alternates: {
                canonical: pageUrl,
                languages: {
                    'x-default': pageUrl,
                    'en': pageUrl,
                    'zh-CN': `${BASE_URL}/zh/calculator/${slug}`,
                    'es': `${BASE_URL}/es/calculator/${slug}`,
                    'de': `${BASE_URL}/de/calculator/${slug}`,
                    'ja': `${BASE_URL}/ja/calculator/${slug}`,
                },
            },
            openGraph: {
                title,
                description,
                url: pageUrl,
                type: "website",
                siteName: "Productivity Calculator",
                images: [
                    {
                        url: `${BASE_URL}/og-image.png`,
                        width: 1200,
                        height: 630,
                        alt: "Labor Productivity Calculator",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [`${BASE_URL}/og-image.png`],
            },
        };
    }

    if (isEmployee) {
        const title = "Employee Productivity Calculator | Revenue per Employee";
        const description = "Free employee productivity calculator. Measure revenue per employee, profit per FTE, and department workforce performance with industry benchmarks.";
        return {
            title: {
                absolute: title,
            },
            description,
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
            alternates: {
                canonical: pageUrl,
                languages: {
                    'x-default': pageUrl,
                    'en': pageUrl,
                    'zh-CN': `${BASE_URL}/zh/calculator/${slug}`,
                    'es': `${BASE_URL}/es/calculator/${slug}`,
                    'de': `${BASE_URL}/de/calculator/${slug}`,
                    'ja': `${BASE_URL}/ja/calculator/${slug}`,
                },
            },
            openGraph: {
                title,
                description,
                url: pageUrl,
                type: "website",
                siteName: "Productivity Calculator",
                images: [
                    {
                        url: `${BASE_URL}/og-image.png`,
                        width: 1200,
                        height: 630,
                        alt: "Employee Productivity Calculator",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [`${BASE_URL}/og-image.png`],
            },
        };
    }

    return {
        title: `${industry.title} 2026 | Free Online Tool`,
        description: industry.description,
        keywords: [
            industry.title.toLowerCase(),
            `${industry.name.toLowerCase()} productivity`,
            `${industry.name.toLowerCase()} efficiency`,
            "productivity calculator",
            "efficiency calculator",
            industry.name.toLowerCase(),
        ],
        alternates: {
            canonical: pageUrl,
            languages: {
                'x-default': pageUrl,
                'en': pageUrl,
                'zh-CN': `${BASE_URL}/zh/calculator/${slug}`,
                'es': `${BASE_URL}/es/calculator/${slug}`,
                'de': `${BASE_URL}/de/calculator/${slug}`,
                'ja': `${BASE_URL}/ja/calculator/${slug}`,
            },
        },
        openGraph: {
            title: `${industry.title} 2026 | Free Calculator`,
            description: industry.description,
            url: pageUrl,
            type: "website",
            siteName: "Productivity Calculator",
            images: [
                {
                    url: `${BASE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `${industry.title} 2026`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: industry.title,
            description: industry.description,
            images: [`${BASE_URL}/og-image.png`],
        },
    };
}

// 行业特定 Schema 结构化数据
function generateIndustrySchema(industry: IndustryData) {
    const isPhysicalTherapy = industry.slug === "physical-therapy";
    const isManufacturing = industry.slug === "manufacturing";
    const isLabor = industry.slug === "labor";
    const isEmployee = industry.slug === "employee";
    const pageUrl = `${BASE_URL}/calculator/${industry.slug}`;

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
                    item: BASE_URL,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: `${BASE_URL}/#industries`,
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: industry.title,
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
                        text: "Physical therapy productivity is calculated by dividing total billable treatment minutes by paid working minutes: Productivity (%) = (Billable Treatment Minutes ÷ (Total Scheduled Shift Minutes − Unpaid Lunch Minutes)) × 100. For example, 360 treatment minutes during an 8-hour shift with a 30-minute unpaid lunch equals 80.0% productivity (360 ÷ 450 × 100).",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is a normal physical therapy productivity standard?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Standard productivity expectations vary by healthcare setting: Acute Care Hospitals typically expect 70% to 75%; Inpatient Rehabilitation Facilities (IRF) expect 75% to 80%; Skilled Nursing Facilities (SNF) expect 80% to 85%; and Outpatient Orthopedic clinics commonly mandate 85% to 90%.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does lunch break impact physical therapy productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Unpaid meal periods (such as standard 30-minute or 60-minute lunches) must be subtracted from the total scheduled shift time. Doing so reduces the denominator (paid clinical minutes), allowing clinicians to meet their target percentage without needing to treat patients during their personal unpaid break.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does the Medicare 8-minute rule affect billable therapy units?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "The Medicare 8-Minute Rule governs billing for timed CPT codes (e.g., 97110, 97140). A clinician must treat a patient for at least 8 minutes to bill 1 unit. Units accumulate as follows: 1 unit: 8-22 mins; 2 units: 23-37 mins; 3 units: 38-52 mins; 4 units: 53-67 mins; 5 units: 68-82 mins; 6 units: 83-97 mins. Accurately counting every timed minute maximizes billable clinical output.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Does documentation time count towards physical therapy productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Generally, documentation time is non-billable unless performed concurrently with direct skilled patient care (point-of-service documentation) and justifiable as part of clinical instruction and feedback. Dedicated administrative charting after patient departure counts against your productivity percentage.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Can occupational therapists (OT) and speech therapists (SLP) use this productivity calculator?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. Physical Therapy (PT), Occupational Therapy (OT), and Speech-Language Pathology (SLP) operate under identical CMS 8-minute billing thresholds and timecard formulas. OT and SLP practitioners can freely use all features including reverse clock-out planning.",
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
                    name: "How is manufacturing productivity calculated?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Manufacturing productivity is calculated by dividing total usable output by the input resources consumed: Productivity = Finished Good Units ÷ Direct Labor Hours (or machine hours). For whole-line equipment efficiency, factories use Overall Equipment Effectiveness: OEE = Availability × Performance × Quality.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is considered a good manufacturing productivity rate?",
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
                        text: "Employee productivity is primarily calculated by dividing total business revenue by full-time equivalent staff: Revenue per Employee = Total Gross Revenue ÷ Total FTE Headcount. For specific departments, output can also be measured as units, projects, or deals closed divided by team headcount.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is a good revenue per employee benchmark?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Across S&P 500 companies, the overall median revenue per employee is approximately $320,000. In digital technology and software businesses, top-quartile companies generate between $400,000 and $1,000,000+ per employee. In professional services and agencies, $150,000 to $250,000 is considered a sustainable benchmark.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the difference between employee productivity and labor productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Labor productivity typically measures short-term micro output per labor hour (e.g., units made per man-hour in a factory or warehouse). Employee productivity is a broader strategic and executive metric evaluating corporate revenue, operating leverage, and profit generated per full-time headcount annually.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do part-time workers and contractors factor into FTE calculations?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Part-time workers and contractors are converted into Full-Time Equivalents (FTE) based on standard working hours. For example, two part-time employees working 20 hours per week equate to 1.0 FTE (40 hours total). A company with 10 full-time staff and 4 half-time contractors has a total headcount of 12.0 FTEs.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is a good employee ROI ratio?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "A healthy employee ROI multiplier is between 3.0x and 5.0x: an employee should ideally generate $3.00 to $5.00 in gross client value or business revenue for every $1.00 of loaded compensation (salary, medical benefits, taxes, and software) paid by the company. Ratios below 2.0x leave little margin for overhead and profitability.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How can a company increase profit per employee?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "To increase profit per employee, leadership should eliminate low-margin service offerings, automate manual tasks through software tools, establish disciplined hiring standards that prioritize talent density over raw headcount growth, and realign sales incentives around high-margin recurring revenue products.",
                    },
                },
            ],
        });
    }

    if (industry.slug === "video-production") {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "How is video production productivity measured?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Video production and editing productivity is measured by comparing completed video units (or finished runtime minutes) against production time: Video Productivity = Finished Video Output ÷ Total Production Days (or Editing Hours). For solo creators, a standard benchmark is 2 to 4 edited short-form videos per day, or 1 polished long-form YouTube video per 3 to 5 production days.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is an industry standard editing ratio for video editors?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "A standard industry rule of thumb for commercial video editing is a 4:1 to 8:1 ratio: roughly 4 to 8 hours of post-production editing for every 1 minute of finished high-production video. For social media and talking-head content, turnaround is typically faster (1 to 2 hours of editing per 10 minutes of rough footage).",
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

export default async function IndustryCalculatorPage({ params }: PageProps) {
    const { slug } = await params;
    const industry = industryData.find((i) => i.slug === slug);

    if (!industry) {
        notFound();
    }

    // 04号站 GSC 权重合流：/calculator/therapy 静态重定向页
    if (slug === "therapy") {
        return (
            <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="card-neon max-w-lg p-8 rounded-2xl border border-[var(--neon-cyan)]/40 space-y-4">
                    <span className="text-3xl block">🔄</span>
                    <h1 className="font-display text-2xl font-bold text-gradient">
                        Redirecting to Physical Therapy Suite...
                    </h1>
                    <p className="text-sm text-[var(--text-secondary)] font-body">
                        The therapy productivity calculator has been upgraded and merged into our specialized Clinical Physical Therapy Suite.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/calculator/physical-therapy"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--neon-cyan)] text-black font-display font-semibold text-sm hover:shadow-[0_0_15px_rgba(0,255,242,0.4)] transition-all"
                        >
                            Open Physical Therapy Calculator →
                        </Link>
                    </div>
                </div>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `if (typeof window !== 'undefined') { window.location.replace('/calculator/physical-therapy'); }`,
                    }}
                />
            </main>
        );
    }

    const isPhysicalTherapy = slug === "physical-therapy";
    const isManufacturing = slug === "manufacturing";
    const isLabor = slug === "labor";
    const isEmployee = slug === "employee";

    return (
        <main className="min-h-screen bg-gradient-radial bg-grid relative overflow-hidden">
            {/* Header */}
            <Header />

            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateIndustrySchema(industry)) }}
            />

            {/* Scan line effect */}
            <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-[200px] animate-[scan-line_8s_linear_infinite]"></div>
            </div>

            <div className="relative z-10 pt-20 pb-16 md:pt-28 md:pb-24 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-center animate-fade-in">
                        <Link
                            href="/"
                            className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors font-body text-sm"
                        >
                            ← Back to Home
                        </Link>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-10 md:mb-12">
                        {/* Industry Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border mb-6 animate-fade-in">
                            <span className="text-2xl">{industry.icon}</span>
                            <span className="font-display text-xs tracking-widest text-[var(--neon-cyan)] uppercase">
                                {isPhysicalTherapy
                                    ? "Physical Therapy Clinical Suite"
                                    : isManufacturing
                                    ? "Manufacturing Operations Suite"
                                    : isLabor
                                    ? "Workforce Operations Suite"
                                    : isEmployee
                                    ? "Workforce Executive Suite"
                                    : industry.name}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in stagger-1">
                            <span className="text-gradient neon-text-subtle">
                                {isPhysicalTherapy
                                    ? "Physical Therapy"
                                    : isManufacturing
                                    ? "Manufacturing"
                                    : isLabor
                                    ? "Labor"
                                    : isEmployee
                                    ? "Employee"
                                    : industry.name}
                            </span>{" "}
                            <span className="text-white">Productivity Calculator</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-body leading-relaxed animate-fade-in stagger-2">
                            {isPhysicalTherapy
                                ? "Clinical physical therapy productivity calculator, reverse clock-out planner, and Medicare 8-minute rule converter for PT, OT & SLP clinicians."
                                : isManufacturing
                                ? "Industrial manufacturing productivity calculator, machine throughput estimator, and OEE efficiency benchmark analyzer."
                                : isLabor
                                ? "Workforce labor productivity calculator, blended team payroll rate modeler, and employee capacity utilization analyzer."
                                : isEmployee
                                ? "Executive employee productivity calculator, revenue per FTE modeler, and department staff quota performance analyzer."
                                : industry.description}
                        </p>

                        {/* Decorative line */}
                        <div className="mt-10 mx-auto flex items-center justify-center gap-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--neon-pink)]"></div>
                            <div className="w-2 h-2 rounded-full bg-[var(--neon-pink)] animate-pulse"></div>
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--neon-pink)]"></div>
                        </div>
                    </div>

                    {/* Calculator Component */}
                    {isPhysicalTherapy ? (
                        <PhysicalTherapyCalculator />
                    ) : isManufacturing ? (
                        <ManufacturingCalculator />
                    ) : isLabor ? (
                        <LaborProductivityCalculator />
                    ) : isEmployee ? (
                        <EmployeeProductivityCalculator />
                    ) : (
                        <Calculator industry={industry} />
                    )}

                    {/* SEO Content Section */}
                    {isPhysicalTherapy ? (
                        <PhysicalTherapySeoContent />
                    ) : isManufacturing ? (
                        <ManufacturingSeoContent />
                    ) : isLabor ? (
                        <LaborProductivitySeoContent />
                    ) : isEmployee ? (
                        <EmployeeProductivitySeoContent />
                    ) : (
                        <section className="mt-24 max-w-3xl mx-auto">
                            <div className="card-neon rounded-2xl p-8 md:p-12">
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-8">
                                    How to Calculate {industry.name} Productivity
                                </h2>

                                <div className="space-y-6 text-[var(--text-secondary)] font-body leading-relaxed">
                                    <p>
                                        The formula for calculating productivity in {industry.name.toLowerCase()} is straightforward:
                                    </p>

                                    <div className="neon-border rounded-xl p-6 text-center my-8">
                                        <code className="font-display text-lg md:text-xl text-[var(--neon-cyan)]">
                                            {industry.resultLabel} = {industry.inputs.find(i => i.key === "output")?.label} ÷ {industry.inputs.find(i => i.key === "input")?.label}
                                        </code>
                                    </div>

                                    <p>
                                        This gives you a productivity rate measured in <span className="text-[var(--neon-pink)] font-semibold">{industry.resultUnit}</span>,
                                        which helps you understand how efficiently resources are being converted into output.
                                    </p>

                                    <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                                        Why Track {industry.name} Productivity?
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--neon-cyan)]">⚡</span>
                                            <span>Identify bottlenecks and inefficiencies in your {industry.name.toLowerCase()} workflow</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--neon-pink)]">⚡</span>
                                            <span>Set realistic goals and benchmarks for your team</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--neon-purple)]">⚡</span>
                                            <span>Make data-driven decisions for continuous improvement</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--neon-blue)]">⚡</span>
                                            <span>Compare performance across teams or time periods</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Internal Links */}
                    <IndustryList />

                    {/* Global Footer */}
                    <Footer />
                </div>
            </div>

            {/* Background Orbs */}
            <div className="fixed -z-10 top-0 right-1/4 w-[600px] h-[600px] bg-[var(--neon-pink)] rounded-full blur-[200px] opacity-10"></div>
            <div className="fixed -z-10 bottom-0 left-1/4 w-[500px] h-[500px] bg-[var(--neon-blue)] rounded-full blur-[200px] opacity-10"></div>
            <div className="fixed -z-10 top-1/2 left-0 w-[400px] h-[400px] bg-[var(--neon-purple)] rounded-full blur-[200px] opacity-5"></div>
        </main>
    );
}
