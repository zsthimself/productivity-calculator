/**
 * @INPUT: [lang] 参数, [slug] 参数, industries.json
 * @OUTPUT: 多语言行业计算器页面
 * @POS: 多语言 pSEO 页面 - 生成所有语言×行业组合
 */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import IndustryList from "@/components/IndustryList";
import Header from "@/components/Header";
import industries from "@/data/industries.json";
import { IndustryData } from "@/types/industry";
import { LOCALES, Locale, isValidLocale, DEFAULT_LOCALE, LOCALE_HTML_LANG, getLocalePath } from "@/lib/i18n";
import { getTranslations, getIndustryTranslation } from "@/lib/translations";

const industryData = industries as IndustryData[];
const BASE_URL = "https://productivitycalculator.work";

interface PageProps {
    params: Promise<{ lang: string; slug: string }>;
}

// 生成所有 lang × slug 组合（排除英语）
export async function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];

    for (const locale of LOCALES) {
        if (locale === DEFAULT_LOCALE) continue;

        for (const industry of industryData) {
            params.push({
                lang: locale,
                slug: industry.slug,
            });
        }
    }

    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang, slug } = await params;

    if (!isValidLocale(lang) || lang === DEFAULT_LOCALE) {
        return { title: "Not Found" };
    }

    const industry = industryData.find((i) => i.slug === slug);
    if (!industry) {
        return { title: "Calculator Not Found" };
    }

    const locale = lang as Locale;
    const industryT = getIndustryTranslation(locale, slug);
    const pageUrl = `${BASE_URL}/${lang}/calculator/${slug}`;

    // 生成所有语言版本的 alternates
    const languages: Record<string, string> = {
        'x-default': `${BASE_URL}/calculator/${slug}`,
        en: `${BASE_URL}/calculator/${slug}`,
    };
    LOCALES.filter((l) => l !== DEFAULT_LOCALE).forEach((l) => {
        languages[LOCALE_HTML_LANG[l]] = `${BASE_URL}/${l}/calculator/${slug}`;
    });

    return {
        title: industryT?.title || industry.title,
        description: industryT?.description || industry.description,
        keywords: [
            (industryT?.title || industry.title).toLowerCase(),
            `${(industryT?.name || industry.name).toLowerCase()} productivity`,
            "productivity calculator",
        ],
        alternates: {
            canonical: pageUrl,
            languages,
        },
        openGraph: {
            title: `${industryT?.title || industry.title}`,
            description: industryT?.description || industry.description,
            url: pageUrl,
            type: "website",
        },
    };
}

// 生成行业特定的WebApplication Schema
function generateIndustrySchema(industry: IndustryData, locale: Locale) {
    const industryT = getIndustryTranslation(locale, industry.slug);

    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: industryT?.title || industry.title,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        url: `${BASE_URL}/${locale}/calculator/${industry.slug}`,
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description: industryT?.description || industry.description,
        inLanguage: LOCALE_HTML_LANG[locale],
    };
}

export default async function LocalizedIndustryCalculatorPage({ params }: PageProps) {
    const { lang, slug } = await params;

    if (!isValidLocale(lang) || lang === DEFAULT_LOCALE) {
        notFound();
    }

    const industry = industryData.find((i) => i.slug === slug);
    if (!industry) {
        notFound();
    }

    const locale = lang as Locale;
    const t = getTranslations(locale);
    const industryT = getIndustryTranslation(locale, slug);
    const langPath = getLocalePath(locale);

    return (
        <main className="min-h-screen bg-gradient-radial bg-grid relative overflow-hidden">
            {/* Header */}
            <Header locale={locale} />

            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateIndustrySchema(industry, locale)) }}
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
                            href={`${langPath}/`}
                            className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors font-body text-sm"
                        >
                            {t.nav.backToHome}
                        </Link>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-10 md:mb-12">
                        {/* Industry Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border mb-6 animate-fade-in">
                            <span className="text-2xl">{industry.icon}</span>
                            <span className="font-display text-xs tracking-widest text-[var(--neon-cyan)] uppercase">
                                {industryT?.name || industry.name}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in stagger-1">
                            <span className="text-gradient neon-text-subtle">{industryT?.name || industry.name}</span>{" "}
                            <span className="text-white">{t.site.heroTitleSuffix}</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-body leading-relaxed animate-fade-in stagger-2">
                            {industryT?.description || industry.description}
                        </p>

                        {/* Decorative line */}
                        <div className="mt-10 mx-auto flex items-center justify-center gap-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--neon-pink)]"></div>
                            <div className="w-2 h-2 rounded-full bg-[var(--neon-pink)] animate-pulse"></div>
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--neon-pink)]"></div>
                        </div>
                    </div>

                    {/* Calculator */}
                    <Calculator industry={industry} locale={locale} />

                    {/* SEO Content */}
                    <section className="mt-24 max-w-3xl mx-auto">
                        <div className="card-neon rounded-2xl p-8 md:p-12">
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-8">
                                {t.content.howToCalculate} {industryT?.name || industry.name} {t.content.productivityIn}
                            </h2>

                            <div className="space-y-6 text-[var(--text-secondary)] font-body leading-relaxed">
                                <p>
                                    {t.content.formulaIntro} {(industryT?.name || industry.name).toLowerCase()} {t.content.formulaIntroSuffix}
                                </p>

                                <div className="neon-border rounded-xl p-6 text-center my-8">
                                    <code className="font-display text-lg md:text-xl text-[var(--neon-cyan)]">
                                        {industry.resultLabel} = {industry.inputs.find((i) => i.key === "output")?.label} ÷{" "}
                                        {industry.inputs.find((i) => i.key === "input")?.label}
                                    </code>
                                </div>

                                <p>
                                    {t.content.resultExplanation}{" "}
                                    <span className="text-[var(--neon-pink)] font-semibold">{industry.resultUnit}</span>
                                    {t.content.resultExplanationSuffix}
                                </p>

                                <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                                    {t.content.whyTrack} {industryT?.name || industry.name} {t.content.productivityIn}?
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--neon-cyan)]">→</span>
                                        <span>
                                            {t.content.trackReason1} {(industryT?.name || industry.name).toLowerCase()}{" "}
                                            {t.content.trackReason1Suffix}
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--neon-pink)]">→</span>
                                        <span>{t.content.trackReason2}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--neon-purple)]">→</span>
                                        <span>{t.content.trackReason3}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--neon-blue)]">→</span>
                                        <span>{t.content.trackReason4}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Internal Links */}
                    <IndustryList locale={locale} />

                    {/* Footer */}
                    <footer className="mt-24 text-center text-[var(--text-muted)] text-sm font-body">
                        <p>{t.site.footer}</p>
                    </footer>
                </div>
            </div>

            {/* Background Orbs */}
            <div className="fixed -z-10 top-0 right-1/4 w-[600px] h-[600px] bg-[var(--neon-pink)] rounded-full blur-[200px] opacity-10"></div>
            <div className="fixed -z-10 bottom-0 left-1/4 w-[500px] h-[500px] bg-[var(--neon-blue)] rounded-full blur-[200px] opacity-10"></div>
            <div className="fixed -z-10 top-1/2 left-0 w-[400px] h-[400px] bg-[var(--neon-purple)] rounded-full blur-[200px] opacity-5"></div>
        </main>
    );
}
