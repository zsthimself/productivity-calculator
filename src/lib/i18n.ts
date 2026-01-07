/**
 * @INPUT: 语言代码 (locale)
 * @OUTPUT: i18n 工具函数和配置
 * @POS: 国际化基础架构 - 提供多语言支持
 */

// 支持的语言列表
export const LOCALES = ['en', 'zh', 'es', 'de', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];

// 默认语言
export const DEFAULT_LOCALE: Locale = 'en';

// 语言显示名称
export const LOCALE_NAMES: Record<Locale, string> = {
    en: 'English',
    zh: '中文',
    es: 'Español',
    de: 'Deutsch',
    ja: '日本語',
};

// 语言标识（用于 HTML lang 属性）
export const LOCALE_HTML_LANG: Record<Locale, string> = {
    en: 'en',
    zh: 'zh-CN',
    es: 'es',
    de: 'de',
    ja: 'ja',
};

// 检查是否为有效语言
export function isValidLocale(locale: string): locale is Locale {
    return LOCALES.includes(locale as Locale);
}

// 获取语言（如果无效则返回默认语言）
export function getLocale(locale?: string): Locale {
    if (locale && isValidLocale(locale)) {
        return locale;
    }
    return DEFAULT_LOCALE;
}

// 生成语言路径前缀
export function getLocalePath(locale: Locale): string {
    return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

// 生成完整 URL
export function getLocaleUrl(locale: Locale, path: string = ''): string {
    const prefix = getLocalePath(locale);
    return `${prefix}${path}`;
}
