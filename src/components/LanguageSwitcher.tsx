/**
 * @INPUT: 当前语言 locale
 * @OUTPUT: LanguageSwitcher 组件 - 语言切换器 UI
 * @POS: 导航组件 - 显示在页面顶部或导航栏
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, Locale, LOCALE_NAMES, DEFAULT_LOCALE, getLocalePath } from "@/lib/i18n";

interface LanguageSwitcherProps {
    currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const pathname = usePathname();

    // 从当前路径中移除语言前缀，获取基础路径
    const getBasePath = (): string => {
        if (currentLocale === DEFAULT_LOCALE) {
            return pathname;
        }
        // 移除语言前缀 (/zh, /es, etc.)
        const langPrefix = `/${currentLocale}`;
        if (pathname.startsWith(langPrefix)) {
            return pathname.slice(langPrefix.length) || "/";
        }
        return pathname;
    };

    // 生成目标语言的链接
    const getLanguageHref = (targetLocale: Locale): string => {
        const basePath = getBasePath();
        if (targetLocale === DEFAULT_LOCALE) {
            return basePath;
        }
        return `/${targetLocale}${basePath === "/" ? "" : basePath}`;
    };

    return (
        <div className="flex items-center gap-1">
            {LOCALES.map((locale) => {
                const isActive = locale === currentLocale;
                const href = getLanguageHref(locale);

                return (
                    <Link
                        key={locale}
                        href={href}
                        className={`
                            px-2 py-1 text-xs font-medium rounded transition-all
                            ${isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }
                        `}
                        aria-label={`Switch to ${LOCALE_NAMES[locale]}`}
                    >
                        {locale.toUpperCase()}
                    </Link>
                );
            })}
        </div>
    );
}
