/**
 * [INPUT]: industries.json (静态配置), URL slug 参数, 专用计算器组件群, generateIndustrySchema
 * [OUTPUT]: IndustryCalculatorPage - 动态生成行业专属页面，支持 physical-therapy、manufacturing、labor、employee、video-production、call-center、logistics、cleaning-services 专属套件
 * [POS]: pSEO 模板与垂直突围页 - 承接 slug 对应 20+ 行业页面，对高潜力词做专属架构承接
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
import IndustryList from "@/components/IndustryList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import industries from "@/data/industries.json";
import { IndustryData } from "@/types/industry";
import { generateIndustrySchema } from "@/lib/industrySchemas";

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

function buildMeta(
    title: string,
    description: string,
    keywords: string[],
    pageUrl: string,
    slug: string
): Metadata {
    return {
        title: {
            absolute: title,
        },
        description,
        keywords,
        alternates: {
            canonical: pageUrl,
            languages: {
                "x-default": pageUrl,
                en: pageUrl,
                "zh-CN": `${BASE_URL}/zh/calculator/${slug}`,
                es: `${BASE_URL}/es/calculator/${slug}`,
                de: `${BASE_URL}/de/calculator/${slug}`,
                ja: `${BASE_URL}/ja/calculator/${slug}`,
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
                    alt: title,
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
            description:
                "Free physical therapy productivity calculator for PT, OT, and therapists. Calculate clinical productivity percentage, treatment minutes, lunch break, and target hours.",
            alternates: {
                canonical: `${BASE_URL}/calculator/physical-therapy`,
            },
            robots: {
                index: false,
                follow: true,
            },
        };
    }

    if (slug === "physical-therapy") {
        return buildMeta(
            "Physical Therapy Productivity Calculator | PT & OT",
            "Free physical therapy productivity calculator for PT, OT, and therapists. Calculate clinical productivity percentage, treatment minutes, lunch break, and target hours.",
            [
                "physical therapy productivity calculator",
                "pt productivity calculator",
                "occupational therapy productivity calculator",
                "ot productivity calculator",
                "slp productivity calculator",
                "productivity calculator for physical therapy",
                "productivity calculator",
            ],
            pageUrl,
            slug
        );
    }

    if (slug === "manufacturing") {
        return buildMeta(
            "Manufacturing Productivity Calculator | OEE & Labor Rate",
            "Free manufacturing productivity calculator. Measure factory output, labor productivity per hour, machine cycle efficiency, and OEE benchmarks instantly.",
            [
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
            pageUrl,
            slug
        );
    }

    if (slug === "labor") {
        return buildMeta(
            "Labor Productivity Calculator | Units & Output per Hour",
            "Free labor productivity calculator. Measure workforce units per hour, revenue per labor dollar, and team capacity utilization with real-time benchmarks.",
            [
                "labor productivity calculator",
                "labor productivity formula",
                "productivity calculator per hour",
                "labor productivity formula with example",
                "how to calculate labor productivity",
                "calculate labor productivity",
                "workforce productivity calculator",
                "productivity calculator",
            ],
            pageUrl,
            slug
        );
    }

    if (slug === "employee") {
        return buildMeta(
            "Employee Productivity Calculator | Revenue per FTE & Target ROI",
            "Free employee productivity calculator. Measure revenue per employee, net profit per FTE, and employee compensation ROI with industry-level benchmarks.",
            [
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
            pageUrl,
            slug
        );
    }

    if (slug === "video-production") {
        return buildMeta(
            "Video Production Calculator | Cost & Turnaround Estimator",
            "Free video production calculator. Estimate video production costs per minute, editing turnaround time, and crew labor efficiency across all project tiers.",
            [
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
            pageUrl,
            slug
        );
    }

    if (slug === "call-center") {
        return buildMeta(
            "Call Center Productivity Calculator | Agent Occupancy & CPH",
            "Free call center productivity calculator. Measure agent occupancy, calls per hour (CPH), handling velocity (AHT), and shrinkage with WFM benchmarks.",
            [
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
            pageUrl,
            slug
        );
    }

    if (slug === "logistics") {
        return buildMeta(
            "Logistics Productivity Calculator | Warehouse & Pick Rate",
            "Free logistics productivity calculator to measure warehouse units per hour (UPH), picking velocity, order fulfillment cycle time, and labor cost per order.",
            [
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
            pageUrl,
            slug
        );
    }

    if (slug === "cleaning-services") {
        return buildMeta(
            "Commercial Cleaning Time Calculator | ISSA Production Rates",
            "Free commercial cleaning time calculator to estimate janitorial labor hours, square footage production rates, and contract bidding costs with ISSA standards.",
            [
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
            pageUrl,
            slug
        );
    }

    if (slug === "healthcare") {
        return buildMeta(
            "Healthcare Productivity Calculator | wRVU & HPPD Benchmark",
            "Free clinical healthcare productivity calculator. Measure physician wRVU production, inpatient nursing HPPD staffing, and ambulatory patient encounter velocity.",
            [
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
            pageUrl,
            slug
        );
    }

    return buildMeta(
        `${industry.title} 2026 | Free Online Tool`,
        industry.description,
        [
            industry.title.toLowerCase(),
            `${industry.name.toLowerCase()} productivity`,
            `${industry.name.toLowerCase()} efficiency`,
            "productivity calculator",
            "efficiency calculator",
            industry.name.toLowerCase(),
        ],
        pageUrl,
        slug
    );
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
    const isVideoProduction = slug === "video-production";
    const isCallCenter = slug === "call-center";
    const isLogistics = slug === "logistics";
    const isCleaningServices = slug === "cleaning-services";
    const isHealthcare = slug === "healthcare";

    return (
        <main className="min-h-screen bg-gradient-radial bg-grid relative overflow-hidden">
            {/* Header */}
            <Header />

            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateIndustrySchema(industry, BASE_URL)) }}
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
                                    : isVideoProduction
                                    ? "Broadcast & Studio Production Suite"
                                    : isCallCenter
                                    ? "Contact Center Operations Suite"
                                    : isLogistics
                                    ? "Warehouse & Supply Chain Suite"
                                    : isCleaningServices
                                    ? "Commercial Janitorial & ISSA 612 Suite"
                                    : isHealthcare
                                    ? "Clinical Healthcare & Hospital Operations Suite"
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
                                    : isVideoProduction
                                    ? "Video Production"
                                    : isCallCenter
                                    ? "Call Center"
                                    : isLogistics
                                    ? "Logistics"
                                    : isCleaningServices
                                    ? "Commercial Cleaning Time"
                                    : isHealthcare
                                    ? "Healthcare & Clinical"
                                    : industry.name}
                            </span>{" "}
                            <span className="text-white">
                                {isCleaningServices ? "& Productivity Calculator" : "Productivity Calculator"}
                            </span>
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
                                : isVideoProduction
                                ? "Studio video production calculator, cost per finished minute estimator, and post-production turnaround scheduler for filmmakers, agencies & creators."
                                : isCallCenter
                                ? "Contact center productivity calculator, agent occupancy analyzer, and shrinkage-adjusted staffing scheduler for customer support & BPO teams."
                                : isLogistics
                                ? "Warehouse logistics productivity calculator, units per hour (UPH) estimator, dock-to-stock tracker, and fleet unit shipping cost modeler for distribution centers & 3PLs."
                                : isCleaningServices
                                ? "Commercial cleaning time calculator, janitorial square footage production rate analyzer, and contract bidding cost estimator based on official ISSA 612 standards."
                                : isHealthcare
                                ? "Clinical healthcare productivity calculator, physician wRVU production modeler, and hospital inpatient nursing HPPD staffing benchmark analyzer."
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
                    ) : isVideoProduction ? (
                        <VideoProductionCalculator />
                    ) : isCallCenter ? (
                        <CallCenterProductivityCalculator />
                    ) : isLogistics ? (
                        <LogisticsProductivityCalculator />
                    ) : isCleaningServices ? (
                        <CleaningServicesProductivityCalculator />
                    ) : isHealthcare ? (
                        <HealthcareProductivityCalculator />
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
                    ) : isVideoProduction ? (
                        <VideoProductionSeoContent />
                    ) : isCallCenter ? (
                        <CallCenterProductivitySeoContent />
                    ) : isLogistics ? (
                        <LogisticsProductivitySeoContent />
                    ) : isCleaningServices ? (
                        <CleaningServicesProductivitySeoContent />
                    ) : isHealthcare ? (
                        <HealthcareProductivitySeoContent />
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
                                            <span className="text-[var(--neon-cyan)]">⚡</span>
                                            <span>Make data-driven decisions about resource allocation</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* More Calculators */}
                    <div className="mt-24">
                        <IndustryList />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </main>
    );
}
