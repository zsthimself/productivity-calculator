/**
 * @INPUT: industries.json (静态数据), locale (可选)
 * @OUTPUT: IndustryList React 组件 - 展示行业卡片网格，提供内链
 * @POS: 内链组件 - 用于页面底部，提升 SEO 和用户导航
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 components/_META.md。
 */
import Link from "next/link";
import industries from "@/data/industries.json";
import { IndustryData } from "@/types/industry";
import { Card, CardContent } from "@/components/ui/card";
import { Locale, DEFAULT_LOCALE, getLocalePath } from "@/lib/i18n";
import { getTranslations, getIndustryTranslation } from "@/lib/translations";

interface IndustryListProps {
    locale?: Locale;
}

export default function IndustryList({ locale = DEFAULT_LOCALE }: IndustryListProps) {
    const industryData = industries as IndustryData[];
    const t = getTranslations(locale);
    const langPath = getLocalePath(locale);

    return (
        <div className="w-full max-w-5xl mx-auto mt-16">
            {/* Section Header */}
            <div className="text-center mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient tracking-wide">
                    {t.nav.exploreIndustries}
                </h2>
                <p className="text-muted-foreground mt-3">
                    {locale === "zh"
                        ? "选择您的领域，获取定制的生产力体验"
                        : locale === "es"
                            ? "Elige tu campo para una experiencia de productividad personalizada"
                            : locale === "de"
                                ? "Wählen Sie Ihr Feld für ein maßgeschneidertes Produktivitätserlebnis"
                                : locale === "ja"
                                    ? "あなたの分野を選んで、カスタマイズされた生産性体験を"
                                    : "Choose your field for a tailored productivity experience"}
                </p>
                {/* Decorative line */}
                <div className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>

            {/* Industry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {industryData
                    .filter((ind) => ind.slug !== "general")
                    .map((industry, index) => {
                        const industryT = getIndustryTranslation(locale, industry.slug);
                        return (
                            <Link
                                key={industry.slug}
                                href={`${langPath}/calculator/${industry.slug}`}
                                className="block group"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Card className="h-full bg-card/50 border-border/30 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                                    <CardContent className="pt-5 pb-4 text-center">
                                        <span className="text-3xl md:text-4xl block mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                                            {industry.icon}
                                        </span>
                                        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                                            {industryT?.name || industry.name}
                                        </span>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}
