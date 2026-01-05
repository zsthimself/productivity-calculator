/**
 * @INPUT: industries.json (静态数据), URL slug 参数
 * @OUTPUT: IndustryCalculatorPage - 动态生成的行业专属计算器页面
 * @POS: pSEO 模板页 - 基于 slug 批量生成 20+ 行业页面，含 SEO 元数据
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 calculator/[slug]/_META.md。
 */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import IndustryList from "@/components/IndustryList";
import industries from "@/data/industries.json";
import { IndustryData } from "@/types/industry";

const industryData = industries as IndustryData[];

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

    return {
        title: `${industry.title} | Free Online Tool`,
        description: industry.description,
        keywords: [
            industry.title.toLowerCase(),
            `${industry.name.toLowerCase()} productivity`,
            "productivity calculator",
            "efficiency calculator",
            industry.name.toLowerCase(),
        ],
    };
}

export default async function IndustryCalculatorPage({ params }: PageProps) {
    const { slug } = await params;
    const industry = industryData.find((i) => i.slug === slug);

    if (!industry) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gradient-radial bg-grid relative overflow-hidden">
            {/* Scan line effect */}
            <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-[200px] animate-[scan-line_8s_linear_infinite]"></div>
            </div>

            <div className="relative z-10 py-16 md:py-24 px-4">
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
                                {industry.name}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in stagger-1">
                            <span className="text-gradient neon-text-subtle">{industry.name}</span>{" "}
                            <span className="text-white">Productivity Calculator</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-body leading-relaxed animate-fade-in stagger-2">
                            {industry.description}
                        </p>

                        {/* Decorative line */}
                        <div className="mt-10 mx-auto flex items-center justify-center gap-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--neon-pink)]"></div>
                            <div className="w-2 h-2 rounded-full bg-[var(--neon-pink)] animate-pulse"></div>
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--neon-pink)]"></div>
                        </div>
                    </div>

                    {/* Calculator */}
                    <Calculator industry={industry} />

                    {/* SEO Content */}
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

                    {/* Internal Links */}
                    <IndustryList />

                    {/* Footer */}
                    <footer className="mt-24 text-center text-[var(--text-muted)] text-sm font-body">
                        <p>© 2026 Productivity Calculator. Built for efficiency.</p>
                    </footer>
                </div>
            </div>

            {/* Background Orbs - Different colors per page for variety */}
            <div className="fixed -z-10 top-0 right-1/4 w-[600px] h-[600px] bg-[var(--neon-pink)] rounded-full blur-[200px] opacity-10"></div>
            <div className="fixed -z-10 bottom-0 left-1/4 w-[500px] h-[500px] bg-[var(--neon-blue)] rounded-full blur-[200px] opacity-10"></div>
            <div className="fixed -z-10 top-1/2 left-0 w-[400px] h-[400px] bg-[var(--neon-purple)] rounded-full blur-[200px] opacity-5"></div>
        </main>
    );
}
