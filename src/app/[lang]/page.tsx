/**
 * @INPUT: [lang] 参数 (语言代码), industries.json (静态数据)
 * @OUTPUT: 多语言首页 React 组件
 * @POS: 多语言路由 - 生成中文、西班牙语、德语、日语首页
 */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import IndustryList from "@/components/IndustryList";
import Header from "@/components/Header";
import industries from "@/data/industries.json";
import { IndustryData } from "@/types/industry";
import { LOCALES, Locale, isValidLocale, DEFAULT_LOCALE, LOCALE_HTML_LANG } from "@/lib/i18n";
import { getTranslations, getIndustryTranslation } from "@/lib/translations";

const industryData = industries as IndustryData[];
const generalIndustry = industryData.find((i) => i.slug === "general")!;

const BASE_URL = "https://productivitycalculator.work";

interface PageProps {
    params: Promise<{ lang: string }>;
}

// 只生成非英语语言的页面（英语在根路径）
export async function generateStaticParams() {
    return LOCALES
        .filter((locale) => locale !== DEFAULT_LOCALE)
        .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;

    if (!isValidLocale(lang) || lang === DEFAULT_LOCALE) {
        return { title: "Not Found" };
    }

    const t = getTranslations(lang);
    const pageUrl = `${BASE_URL}/${lang}`;

    // 生成所有语言版本的 alternates
    const languages: Record<string, string> = {
        'x-default': BASE_URL,
        en: BASE_URL,
    };
    LOCALES.filter((l) => l !== DEFAULT_LOCALE).forEach((l) => {
        languages[LOCALE_HTML_LANG[l]] = `${BASE_URL}/${l}`;
    });

    return {
        title: t.site.title,
        description: t.site.description,
        keywords: [
            t.site.title.toLowerCase(),
            "productivity calculator",
            "efficiency calculator",
        ],
        alternates: {
            canonical: pageUrl,
            languages,
        },
        openGraph: {
            title: t.site.title,
            description: t.site.description,
            url: pageUrl,
            type: "website",
        },
    };
}

// SoftwareApplication Schema
function generateAppSchema(locale: Locale) {
    const t = getTranslations(locale);
    const industryT = getIndustryTranslation(locale, "general");

    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: t.site.title,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description: industryT?.description || t.site.description,
        inLanguage: LOCALE_HTML_LANG[locale],
    };
}

export default async function LocalizedHomePage({ params }: PageProps) {
    const { lang } = await params;

    if (!isValidLocale(lang) || lang === DEFAULT_LOCALE) {
        notFound();
    }

    const locale = lang as Locale;
    const t = getTranslations(locale);
    const industryT = getIndustryTranslation(locale, "general");

    return (
        <main className="min-h-screen bg-gradient-radial bg-grid relative overflow-hidden">
            {/* Header */}
            <Header locale={locale} />

            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAppSchema(locale)) }}
            />

            {/* Scan line effect */}
            <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-[200px] animate-[scan-line_8s_linear_infinite]"></div>
            </div>

            <div className="relative z-10 pt-20 pb-16 md:pt-28 md:pb-24 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Header */}
                    <div className="text-center mb-10 md:mb-12">
                        {/* Tagline */}
                        <p className="font-display text-xs md:text-sm tracking-[0.3em] text-[var(--neon-cyan)] uppercase mb-6 animate-fade-in">
                            {t.site.tagline}
                        </p>

                        {/* Main Title */}
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in stagger-1">
                            <span className="text-gradient neon-text-subtle">{t.site.heroTitle}</span>{" "}
                            <span className="text-white">{t.site.heroTitleSuffix}</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-body leading-relaxed animate-fade-in stagger-2">
                            {t.site.heroDescription}
                            <span className="text-[var(--neon-pink)]"> {t.site.heroHighlight}</span>
                        </p>

                        {/* Decorative line */}
                        <div className="mt-10 mx-auto flex items-center justify-center gap-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--neon-cyan)]"></div>
                            <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] animate-pulse"></div>
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--neon-cyan)]"></div>
                        </div>
                    </div>

                    {/* Calculator */}
                    <Calculator industry={generalIndustry} locale={locale} />

                    {/* SEO Content */}
                    <section className="mt-12 max-w-3xl mx-auto">
                        <div className="card-neon rounded-2xl p-8 md:p-12 text-center">
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-8">
                                {t.content.whatIsProductivity}
                            </h2>

                            <div className="space-y-6 text-[var(--text-secondary)] font-body leading-relaxed text-left mx-auto max-w-2xl">
                                <p>{t.content.productivityDefinition}</p>

                                <div className="neon-border rounded-xl p-6 text-center my-8">
                                    <code className="font-display text-xl md:text-2xl text-[var(--neon-cyan)]">
                                        {t.content.formula}
                                    </code>
                                </div>

                                <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                                    {t.content.howToUse}
                                </h3>
                                <ol className="list-decimal list-inside space-y-3 text-[var(--text-secondary)]">
                                    <li>
                                        {t.content.step1}{" "}
                                        <span className="text-[var(--neon-cyan)]">{t.content.step1Highlight}</span>{" "}
                                        {t.content.step1Detail}
                                    </li>
                                    <li>
                                        {t.content.step2}{" "}
                                        <span className="text-[var(--neon-pink)]">{t.content.step2Highlight}</span>{" "}
                                        {t.content.step2Detail}
                                    </li>
                                    <li>
                                        {t.content.step3}{" "}
                                        <span className="font-display text-white">{t.content.step3Highlight}</span>{" "}
                                        {t.content.step3Detail}
                                    </li>
                                </ol>

                                <h3 className="font-display text-xl font-semibold text-white mt-10 mb-4">
                                    {t.content.whyMeasure}
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--neon-cyan)]">→</span>
                                        <span>
                                            <strong className="text-white">{t.content.reason1Title}</strong> {t.content.reason1}
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--neon-pink)]">→</span>
                                        <span>
                                            <strong className="text-white">{t.content.reason2Title}</strong> {t.content.reason2}
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--neon-purple)]">→</span>
                                        <span>
                                            <strong className="text-white">{t.content.reason3Title}</strong> {t.content.reason3}
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[var(--neon-blue)]">→</span>
                                        <span>
                                            <strong className="text-white">{t.content.reason4Title}</strong> {t.content.reason4}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Internal Links to Industry Calculators */}
                    <IndustryList locale={locale} />

                    {/* Footer */}
                    <footer className="mt-24 text-center text-[var(--text-muted)] text-sm font-body">
                        <p>{t.site.footer}</p>
                    </footer>
                </div>
            </div>

            {/* Background Orbs */}
            <div className="fixed -z-10 top-0 left-1/4 w-[600px] h-[600px] bg-[var(--neon-purple)] rounded-full blur-[200px] opacity-10"></div>
            <div className="fixed -z-10 bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--neon-cyan)] rounded-full blur-[200px] opacity-10"></div>
            <div className="fixed -z-10 top-1/2 right-0 w-[400px] h-[400px] bg-[var(--neon-pink)] rounded-full blur-[200px] opacity-5"></div>
        </main>
    );
}
