/**
 * @INPUT: locale (当前语言)
 * @OUTPUT: Header 导航栏组件
 * @POS: 布局组件 - 包含语言切换器
 */
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, DEFAULT_LOCALE, getLocalePath } from "@/lib/i18n";

interface HeaderProps {
    locale?: Locale;
}

export default function Header({ locale = DEFAULT_LOCALE }: HeaderProps) {
    const homeHref = getLocalePath(locale) || "/";

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30">
            <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href={homeHref}
                    className="font-display text-sm md:text-base text-gradient hover:opacity-80 transition-opacity"
                >
                    ⚡ Productivity Calculator
                </Link>

                {/* Language Switcher */}
                <LanguageSwitcher currentLocale={locale} />
            </div>
        </header>
    );
}
