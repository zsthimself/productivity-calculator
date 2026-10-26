/**
 * @INPUT: industries.json (静态数据), URL slug 参数, PhysicalTherapyCalculator (专用组件)
 * @OUTPUT: IndustryCalculatorPage - 动态生成的行业专属计算器页面，physical-therapy 享有定制临床高阶引擎
 * @POS: pSEO 模板与垂直突破页 - 基于 slug 批量生成 20+ 行业页面，针对高流量词进行手术刀级定制
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 calculator/[slug]/_META.md。
 */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import PhysicalTherapyCalculator from "@/components/PhysicalTherapyCalculator";
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
    const isPhysicalTherapy = slug === "physical-therapy" || slug === "therapy";

    if (isPhysicalTherapy) {
        const title = "Physical Therapy Productivity Calculator 2026 | Shift & Clock-Out Planner";
        const description = "Free online physical therapy productivity calculator for PT, OT, and SLP clinicians. Calculate daily productivity percentage, reverse clock-out time with lunch break, and Medicare 8-minute rule billing units.";
        return {
            title,
            description,
            keywords: [
                "physical therapy productivity calculator",
                "snf productivity calculator",
                "physical therapy productivity calculator with lunch break",
                "pt productivity calculator",
                "therapy productivity calculator",
                "therapist productivity calculator with lunch break",
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
            },
            twitter: {
                card: "summary",
                title,
                description,
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
        },
        twitter: {
            card: "summary",
            title: industry.title,
            description: industry.description,
        },
    };
}

// 生成行业特定的 Schema 结构化数据
function generateIndustrySchema(industry: IndustryData) {
    const isPhysicalTherapy = industry.slug === "physical-therapy" || industry.slug === "therapy";
    const pageUrl = `${BASE_URL}/calculator/${industry.slug}`;

    const schemas: Record<string, unknown>[] = [
        {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: isPhysicalTherapy ? "Physical Therapy Productivity & Clock-Out Planner" : industry.title,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web Browser",
            url: pageUrl,
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
            },
            description: isPhysicalTherapy
                ? "Free clinical productivity calculator for physical, occupational, and speech therapists. Calculate daily productivity quota, plan earliest clock-out time, and convert Medicare 8-minute rule billing units."
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
                    name: "What is a normal productivity standard for physical therapists in 2026?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Standard productivity expectations vary by healthcare setting: Acute Care Hospitals typically expect 70% to 75%; Inpatient Rehabilitation Facilities (IRF) expect 75% to 80%; Skilled Nursing Facilities (SNF) expect 80% to 85%; and Outpatient Orthopedic clinics commonly mandate 85% to 90%.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do I calculate what time to clock out based on therapy minutes?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "To determine your earliest safe clock-out time: 1. Divide your completed treatment minutes by your target productivity percentage to get required paid minutes (e.g., 340 mins ÷ 0.85 = 400 paid minutes). 2. Add your unpaid lunch duration (e.g., 400 + 30 = 430 total minutes on site). 3. Add these minutes to your morning clock-in time to find your exact departure time.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the Medicare 8-Minute Rule for therapy billing?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "The Medicare 8-Minute Rule governs billing for timed CPT codes (e.g., 97110, 97140). A clinician must treat a patient for at least 8 minutes to bill 1 unit. Units accumulate as follows: 1 unit: 8-22 mins; 2 units: 23-37 mins; 3 units: 38-52 mins; 4 units: 53-67 mins; 5 units: 68-82 mins; 6 units: 83-97 mins.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Does documentation time count toward therapy productivity?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Generally, documentation time is considered non-billable unless performed concurrently with direct patient care (point-of-service documentation) and justifiable as part of the clinical service. Point-of-service documentation is the primary method therapists use to maintain high productivity without working off-the-clock.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the standard productivity expectation in a Skilled Nursing Facility (SNF)?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "In Skilled Nursing Facilities (SNF), corporate physical therapy productivity targets typically range between 80% and 85% (and up to 88% in high-volume subacute rehab units). Meeting SNF productivity requires disciplined point-of-service documentation and accurate group/concurrent therapy tracking under PDPM guidelines without taking uncompensated work home.",
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

    const isPhysicalTherapy = slug === "physical-therapy" || slug === "therapy";

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
                                {isPhysicalTherapy ? "Physical Therapy Clinical Suite" : industry.name}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in stagger-1">
                            <span className="text-gradient neon-text-subtle">
                                {isPhysicalTherapy ? "Physical Therapy" : industry.name}
                            </span>{" "}
                            <span className="text-white">Productivity Calculator</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-body leading-relaxed animate-fade-in stagger-2">
                            {isPhysicalTherapy
                                ? "Clinical-grade productivity calculator, reverse clock-out planner, and Medicare 8-minute rule converter for PT, OT & SLP clinicians."
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
                    ) : (
                        <Calculator industry={industry} />
                    )}

                    {/* SEO Content Section */}
                    {isPhysicalTherapy ? (
                        <section className="mt-20 max-w-4xl mx-auto space-y-12">
                            {/* Clinical Math & Formula Card */}
                            <div className="card-neon rounded-2xl p-8 md:p-12">
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-6">
                                    How Physical Therapy Productivity is Calculated in 2026
                                </h2>

                                <div className="space-y-6 text-[var(--text-secondary)] font-body leading-relaxed text-sm md:text-base">
                                    <p>
                                        In modern rehabilitation environments (including Outpatient Orthopedic, Skilled Nursing Facilities, and Inpatient Rehab), physical therapist productivity measures the proportion of paid clinical working time spent providing direct, billable patient care.
                                    </p>

                                    <div className="neon-border rounded-xl p-6 text-center my-6 bg-[var(--bg-elevated)]/60">
                                        <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-2">
                                            The Standard Clinical Formula
                                        </div>
                                        <code className="font-display text-base md:text-xl text-[var(--neon-cyan)] block">
                                            Productivity % = [ Billable Tx Minutes ÷ (Total Shift Minutes − Unpaid Lunch) ] × 100
                                        </code>
                                    </div>

                                    <p>
                                        For example, if you are scheduled for an 8.0-hour shift (480 minutes) with a mandatory 30-minute unpaid lunch break, your <strong>total paid working time is 450 minutes</strong>. If you provide 360 minutes of direct, billable treatment:
                                    </p>
                                    <p className="font-mono text-xs md:text-sm text-white bg-black/30 p-3 rounded-lg border border-white/5">
                                        Productivity = (360 ÷ 450) × 100 = 80.0%
                                    </p>
                                </div>
                            </div>

                            {/* Industry Benchmarks Table */}
                            <div className="card-neon rounded-2xl p-8 md:p-12">
                                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-6">
                                    2026 Productivity Benchmarks by Clinical Setting
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs md:text-sm font-body border-collapse">
                                        <thead>
                                            <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-display uppercase tracking-wider text-[11px]">
                                                <th className="py-3 px-4">Clinical Setting</th>
                                                <th className="py-3 px-4">Typical Quota</th>
                                                <th className="py-3 px-4">Documentation Dynamics</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--border)]/50 font-mono text-[var(--text-secondary)]">
                                            <tr className="hover:bg-white/5">
                                                <td className="py-3 px-4 font-bold text-white">Acute Care Hospital</td>
                                                <td className="py-3 px-4 text-[var(--neon-cyan)] font-semibold">65% – 75%</td>
                                                <td className="py-3 px-4">Chart review, nurse coordination, discharge planning</td>
                                            </tr>
                                            <tr className="hover:bg-white/5">
                                                <td className="py-3 px-4 font-bold text-white">Inpatient Rehab (IRF)</td>
                                                <td className="py-3 px-4 text-[var(--neon-cyan)] font-semibold">75% – 80%</td>
                                                <td className="py-3 px-4">Strict 3-hour rule adherence, interdisciplinary rounds</td>
                                            </tr>
                                            <tr className="hover:bg-white/5">
                                                <td className="py-3 px-4 font-bold text-white">Skilled Nursing (SNF)</td>
                                                <td className="py-3 px-4 text-[var(--neon-cyan)] font-semibold">80% – 85%</td>
                                                <td className="py-3 px-4">Concurrent/group therapy tracking, PDPM compliance</td>
                                            </tr>
                                            <tr className="hover:bg-white/5">
                                                <td className="py-3 px-4 font-bold text-white">Outpatient Ortho (Private)</td>
                                                <td className="py-3 px-4 text-[var(--neon-cyan)] font-semibold">85% – 90%+</td>
                                                <td className="py-3 px-4">Point-of-service charting, 1-on-1 vs double-booking</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Clinical FAQ Accordion / Cards */}
                            <div className="card-neon rounded-2xl p-8 md:p-12 space-y-6">
                                <h3 className="font-display text-xl md:text-2xl font-bold text-gradient mb-6">
                                    Frequently Asked Questions for Physical Therapists
                                </h3>

                                <div className="space-y-6 text-sm font-body">
                                    <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                                        <h4 className="font-bold text-white mb-2 text-base">
                                            How does the Clock-Out Planner prevent off-the-clock documentation?
                                        </h4>
                                        <p className="text-[var(--text-secondary)] leading-relaxed">
                                            Many therapists fall into the trap of clocking out early to artificially inflate their productivity percentage, then finishing notes unpaid. The Clock-Out Planner computes the true math in reverse: by knowing your exact required paid minutes, you can plan your day honestly and establish transparent boundaries with management.
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                                        <h4 className="font-bold text-white mb-2 text-base">
                                            How does the Medicare 8-Minute Rule interact with productivity?
                                        </h4>
                                        <p className="text-[var(--text-secondary)] leading-relaxed">
                                            Under CMS guidelines, direct timed codes require a minimum of 8 minutes of skilled intervention. If a patient session lasts 38 minutes, that equals 3 units (each unit counting ~15 minutes). Accurately recording every billable minute ensures all skilled patient care is captured in your daily productivity totals.
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                                        <h4 className="font-bold text-white mb-2 text-base">
                                            Can Occupational Therapists (OT) and Speech Pathologists (SLP) use this tool?
                                        </h4>
                                        <p className="text-[var(--text-secondary)] leading-relaxed">
                                            Yes. Physical Therapy, Occupational Therapy, and Speech-Language Pathology operate under the exact same CMS and private insurance productivity formulas and 8-Minute billing thresholds.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
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
                                            <span className="text-[var(--neon-cyan)]">→</span>
                                            <span>Identify bottlenecks and inefficiencies in your {industry.name.toLowerCase()} workflow</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--neon-pink)]">→</span>
                                            <span>Set realistic goals and benchmarks for your team</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--neon-purple)]">→</span>
                                            <span>Make data-driven decisions for continuous improvement</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--neon-blue)]">→</span>
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
