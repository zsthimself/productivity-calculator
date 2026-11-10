/**
 * @INPUT: locale (当前语言)
 * @OUTPUT: Header 导航栏组件（默认英文站点直接提供行业与合规直达链接，仅在非英页展示切换器）
 * @POS: 布局组件 - 顶部统一导航
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
            <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link
                    href={homeHref}
                    className="font-display text-sm md:text-base text-gradient hover:opacity-80 transition-opacity shrink-0"
                >
                    ⚡ Productivity Calculator
                </Link>

                {locale === DEFAULT_LOCALE ? (
                    <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-4 text-xs font-medium text-[var(--text-secondary)]">
                        <Link href="/#industries" className="hover:text-white transition-colors">Industries</Link>
                        <Link href="/calculator/physical-therapy" className="hover:text-white transition-colors">PT Suite</Link>
                        <Link href="/calculator/manufacturing" className="hover:text-white transition-colors">Manufacturing</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </nav>
                ) : (
                    <LanguageSwitcher currentLocale={locale} />
                )}
            </div>
        </header>
    );
}
